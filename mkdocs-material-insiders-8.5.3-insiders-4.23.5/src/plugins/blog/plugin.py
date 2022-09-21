# Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

import logging
import os
import paginate
import posixpath
import re
import readtime
import sys

from babel.dates import format_date
from datetime import date
from markdown.extensions.toc import slugify
from mkdocs import utils
from mkdocs.utils.meta import get_data
from mkdocs.commands.build import DuplicateFilter, _populate_page
from mkdocs.config.config_options import Choice, Type
from mkdocs.contrib.search import SearchIndex
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File
from mkdocs.structure.nav import Link, Section
from mkdocs.structure.pages import Page
from tempfile import gettempdir
from yaml import SafeLoader, load

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Blog plugin
class BlogPlugin(BasePlugin):

    # Configuration scheme
    config_scheme = (
        ("enabled", Type(bool, default = True)),

        # Options for blog
        ("blog_dir", Type(str, default = "blog")),
        ("blog_custom_dir", Type(str)), # Do not use, internal option

        # Options for posts
        ("post_date_format", Type(str, default = "long")),
        ("post_url_date_format", Type(str, default = "YYYY/MM/dd")),
        ("post_url_format", Type(str, default = "{date}/{slug}")),
        ("post_slugify", Type(type(slugify), default = slugify)),
        ("post_slugify_separator", Type(str, default = "-")),
        ("post_excerpt", Choice(["optional", "required"], default = "optional")),
        ("post_excerpt_separator", Type(str, default = "<!-- more -->")),
        ("post_readtime", Type(bool, default = True)),
        ("post_readtime_words_per_minute", Type(int, default = 265)),

        # Options for archive
        ("archive", Type(bool, default = True)),
        ("archive_name", Type(str, default = "blog.archive")),
        ("archive_date_format", Type(str, default = "YYYY")),
        ("archive_url_date_format", Type(str, default = "YYYY")),
        ("archive_url_format", Type(str, default = "archive/{date}")),

        # Options for categories
        ("categories", Type(bool, default = True)),
        ("categories_name", Type(str, default = "blog.categories")),
        ("categories_url_format", Type(str, default = "category/{slug}")),
        ("categories_slugify", Type(type(slugify), default = slugify)),
        ("categories_slugify_separator", Type(str, default = "-")),
        ("categories_allowed", Type(list, default = [])),

        # Options for pagination
        ("pagination", Type(bool, default = True)),
        ("pagination_per_page", Type(int, default = 10)),
        ("pagination_url_format", Type(str, default = "page/{page}")),
        ("pagination_template", Type(str, default = "~2~")),

        # Options for authors
        ("authors", Type(bool, default = True)),
        ("authors_file", Type(str, default = ".authors.yml")),
        ("authors_in_excerpt", Type(int, default = 1)),

        # Options for drafts
        ("draft", Type(bool, default = False)),
        ("draft_on_serve", Type(bool, default = True)),
        ("draft_if_future_date", Type(bool, default = False)),
    )

    # Initialize plugin
    def on_config(self, config):
        if not self.config["enabled"]:
            return

        # Resolve and convert path to file system path
        self.post_dir = os.path.join(self.config["blog_dir"], "posts")
        self.post_dir = os.path.normpath(self.post_dir)

        # Initialize posts
        self.post_map = dict()
        self.post_meta_map = dict()
        self.post_pages = []
        self.post_pager_pages = []

        # Initialize archive
        if self.config["archive"]:
            self.archive_map = dict()
            self.archive_post_map = dict()

        # Initialize categories
        if self.config["categories"]:
            self.category_map = dict()
            self.category_name_map = dict()
            self.category_post_map = dict()

        # Initialize authors
        if self.config["authors"]:
            self.authors_map = {}

            # Resolve and convert path to file system path
            path = os.path.normpath(os.path.join(
                config["docs_dir"],
                self.config["blog_dir"],
                self.config["authors_file"]
            ))

            # Load authors map, if it exists
            if os.path.exists(path):
                with open(path, encoding = "utf-8") as f:
                    self.authors_map = load(f, SafeLoader) or {}

        # Ensure that format strings have no trailing slashes
        for option in [
            "post_url_format",
            "archive_url_format",
            "categories_url_format",
            "pagination_url_format"
        ]:
            if self.config[option].endswith("/"):
                log.error(f"Option '{option}' must not contain trailing slash.")
                sys.exit()

        # If pagination should not be used, set to large value
        if not self.config["pagination"]:
            self.config["pagination_per_page"] = 1e7

        # Hack: by default, drafts are rendered when the documentation is
        # served, but not when it is built. This should nicely align with the
        # expected user experience when authoring documentation, but sadly
        # the on_serve event is triggered too late (after the build). For this
        # reason we make use of MkDocs internals to detect whether the site
        # directory is set to a temporary directory.
        self.temp_dir = os.path.join(gettempdir(), "mkdocs")
        if self.temp_dir in config["site_dir"]:
            if self.config["draft_on_serve"]:
                self.config["draft"] = True

    # Adjust paths to assets in the posts directory and preprocess posts
    def on_files(self, files, config):
        if not self.config["enabled"]:
            return

        # Adjust destination paths for assets
        for file in files.media_files():
            if self.post_dir not in file.src_path:
                continue

            # Resolve and convert path to file system path
            path = os.path.join(self.config["blog_dir"], "assets")
            path = os.path.normpath(path)

            # Compute destination file system path
            file.dest_path = file.dest_path.replace(self.post_dir, path)
            file.abs_dest_path = os.path.join(
                config["site_dir"],
                file.dest_path
            )

            # Compute destination URL
            file.url = file.url.replace(
                self.post_dir.replace(os.path.sep, "/"),
                posixpath.join(self.config["blog_dir"], "assets")
            )

        # Hack: as post URLs are dynamically computed and can be configured by
        # the author, we need to compute them before we process the contents of
        # any other page or post. If we wouldn't do that, URLs would be invalid
        # and we would need to patch them afterwards. The only way to do this
        # correctly is to first extract the metadata of all posts. Additionally,
        # while we're at it, generate all archive and category pages as we have
        # the post metadata on our hands. This ensures that we can safely link
        # from anywhere to all pages that are generated as part of the blog.
        for file in files.documentation_pages():
            if self.post_dir not in file.src_path:
                continue

            # Read and preprocess post
            with open(file.abs_src_path, encoding = "utf-8-sig") as f:
                markdown, meta = get_data(f.read())

                # Ensure post has a date set
                if not meta.get("date"):
                    log.error(f"Blog post '{file.src_path}' has no date set.")
                    sys.exit()

                # Compute slug from metadata, content or file name
                headline = utils.get_markdown_title(markdown)
                slug = meta.get("title", headline or file.name)

                # Front matter can be defind in YAML, guarded by two lines with
                # `---` markers, or MultiMarkdown, separated by an empty line.
                # If the author chooses to use MultiMarkdown syntax, date is
                # returned as a string, which is different from YAML behavior,
                # which returns a date. Thus, we must check for its type, and
                # parse the date for normalization purposes.
                if isinstance(meta["date"], str):
                    meta["date"] = date.fromisoformat(meta["date"])

                # Compute path from format string
                date_format = self.config["post_url_date_format"]
                path = self.config["post_url_format"].format(
                    date = self._format_date(meta["date"], date_format, config),
                    slug = meta.get("slug", self.config["post_slugify"](
                        slug, self.config["post_slugify_separator"]
                    ))
                )

                # Compute destination URL according to settings
                file.url = posixpath.join(self.config["blog_dir"], path, "")
                if not config["use_directory_urls"]:
                    file.url = re.sub(r"\/$", ".html", file.url)

                # Resolve and convert path to file system path
                path = re.sub(r"(?<=\/)$", "index.html", file.url)
                path = os.path.normpath(path)

                # Compute destination file system path
                file.dest_path = path
                file.abs_dest_path = os.path.join(
                    config["site_dir"],
                    file.dest_path
                )

                # Add post metadata
                self.post_meta_map[file.src_path] = meta

        # Sort post metadata by date (descending)
        self.post_meta_map = dict(sorted(
            self.post_meta_map.items(),
            key = lambda item: item[1]["date"], reverse = True
        ))

        # Find and extract the section hosting the blog
        path = posixpath.join(self.config["blog_dir"], "index.md")
        root = _host(config["nav"], posixpath.normpath(path))

        # Ensure blog root exists
        file = files.get_file_from_path(path)
        if not file:
            log.error(f"Blog root '{os.path.normpath(path)}' does not exist.")
            sys.exit()

        # Generate and register files for archive
        if self.config["archive"]:
            name = self._translate(config, self.config["archive_name"])
            data = self._generate_files_for_archive(config, files)
            if data:
                root.append({ name: data })

        # Generate and register files for categories
        if self.config["categories"]:
            name = self._translate(config, self.config["categories_name"])
            data = self._generate_files_for_categories(config, files)
            if data:
                root.append({ name: data })

        # Hack: add posts temporarily, so MkDocs doesn't complain
        root.append({ "__posts": list(self.post_meta_map.keys()) })

    # Cleanup navigation before proceeding
    def on_nav(self, nav, config, files):
        if not self.config["enabled"]:
            return

        # Find and resolve index for cleanup
        path = posixpath.join(self.config["blog_dir"], "index.md")
        file = files.get_file_from_path(path)

        # Determine blog root section
        self.main = file.page
        if self.main.parent:
            root = self.main.parent.children
        else:
            root = nav.items

        # Hack: remove temporarily added posts from the navigation
        for item in root:
            if not item.is_section or item.title != "__posts":
                continue

            # Detach previous and next links of posts
            if item.children:
                head = item.children[+0]
                tail = item.children[-1]

                # Link page prior to posts to page after posts
                if head.previous_page:
                    head.previous_page.next_page = tail.next_page

                # Link page after posts to page prior to posts
                if tail.next_page:
                    tail.next_page.previous_page = head.previous_page

                # Contain previous and next links inside posts
                head.previous_page = None
                tail.next_page     = None

            # Set blog as parent page
            for page in item.children:
                page.parent = self.main

            # Remove posts from navigation
            root.remove(item)
            break

    # Prepare post for rendering
    def on_page_markdown(self, markdown, page, config, files):
        if not self.config["enabled"]:
            return

        # Only process posts
        if self.post_dir not in page.file.src_path:
            return

        # Skip processing of drafts
        if self._is_draft(page.file.src_path):
            return

        # Ensure a template is set or use default
        if "template" not in page.meta:
            page.meta["template"] = self._template("blog-post.html")

        # Ensure use of previously normalized value
        if isinstance(page.meta["date"], str):
            page.meta["date"] = self.post_meta_map[page.file.src_path]["date"]

        # Ensure navigation is hidden
        page.meta["hide"] = page.meta.get("hide", [])
        if "navigation" not in page.meta["hide"]:
            page.meta["hide"].append("navigation")

        # Format date for rendering
        date_format = self.config["post_date_format"]
        page.meta["date_format"] = self._format_date(
            page.meta["date"], date_format, config
        )

        # Compute readtime if desired and not explicitly set
        if self.config["post_readtime"]:
            if "readtime" not in page.meta:
                rate = self.config["post_readtime_words_per_minute"]
                read = readtime.of_markdown(markdown, rate)
                page.meta["readtime"] = read.minutes

        # Compute post categories
        page.categories = []
        if self.config["categories"]:
            for name in page.meta.get("categories", []):
                file = files.get_file_from_path(self.category_name_map[name])
                page.categories.append(file.page)

        # Compute post authors
        page.authors = []
        if self.config["authors"]:
            for name in page.meta.get("authors", []):
                if name not in self.authors_map:
                    log.error(
                        f"Blog post '{page.file.src_path}' author '{name}' "
                        f"unknown, not listed in .authors.yml"
                    )
                    sys.exit()

                # Add author to page
                page.authors.append(self.authors_map[name])

        # Fix stale link if previous post is a draft
        prev = page.previous_page
        while prev and self._is_draft(prev.file.src_path):
            page.previous_page = prev.previous_page
            prev = prev.previous_page

        # Fix stale link if next post is a draft
        next = page.next_page
        while next and self._is_draft(next.file.src_path):
            page.next_page = next.next_page
            next = next.next_page

    # Filter posts and generate excerpts for generated pages
    def on_env(self, env, config, files):
        if not self.config["enabled"]:
            return

        # Skip post excerpts on dirty reload to save time
        if dirtyreload:
            return

        # Remove 'toc' to disable permalinks for post excerpts
        key = "markdown_extensions"
        config = { **config, key: [*config[key]] }
        if "toc" in config["markdown_extensions"]:
            config["markdown_extensions"].remove("toc")

        # Filter posts that should not be published
        for file in files.documentation_pages():
            if self.post_dir in file.src_path:
                if self._is_draft(file.src_path):
                    files.remove(file)

                # Compute navigation for post links
                file.page.links = _data_to_navigation(
                    file.page.meta.get("links", []),
                    config, files
                )

        # Populate archive
        if self.config["archive"]:
            for path in self.archive_map:
                self.archive_post_map[path] = []

                # Generate post excerpts for archive
                base = files.get_file_from_path(path)
                for file in self.archive_map[path]:
                    self.archive_post_map[path].append(
                        self._generate_excerpt(file, base, config, files)
                    )

        # Populate categories
        if self.config["categories"]:
            for path in self.category_map:
                self.category_post_map[path] = []

                # Generate post excerpts for categories
                base = files.get_file_from_path(path)
                for file in self.category_map[path]:
                    self.category_post_map[path].append(
                        self._generate_excerpt(file, base, config, files)
                    )

        # Ensure a template is set
        self.main.meta["template"] = self._template("blog.html")

        # Resolve and convert path to file system path
        curr = os.path.join(self.config["blog_dir"], "index.md")
        curr = os.path.normpath(curr)

        # Initialize index
        self.post_map[curr] = []
        self.post_pager_pages.append(self.main)

        # Generate indexes by paginating through posts
        base = self.main.file
        for path in self.post_meta_map.keys():
            file = files.get_file_from_path(path)
            if not self._is_draft(path):
                self.post_pages.append(file.page)
            else:
                continue

            # Generate new index when the current is full
            per_page = self.config["pagination_per_page"]
            if len(self.post_map[curr]) == per_page:
                curr = self.config["pagination_url_format"].format(
                    page = 1 + len(self.post_map)
                )

                # Convert path to file system path
                curr = os.path.join(self.config["blog_dir"], curr)
                curr = os.path.normpath(curr + ".md")

                # Generate and register file and page
                self._generate_file(curr, "blog", self.main.content)
                base = self._register_file(curr, config, files, True)
                page = self._register_page(base, config, files)

                # Inherit page title and position
                page.title         = self.main.title
                page.parent        = self.main
                page.previous_page = self.main.previous_page
                page.next_page     = self.main.next_page

                # Initialize next index
                self.post_map[curr] = []
                self.post_pager_pages.append(page)

            # Assign post excerpt to current index
            self.post_map[curr].append(
                self._generate_excerpt(file, base, config, files)
            )

    # Populate generated pages
    def on_page_context(self, context, page, config, nav):
        if not self.config["enabled"]:
            return

        # Provide posts excerpts for index
        path = page.file.src_path
        if path in self.post_map:
            context["posts"] = self.post_map[path]

            # Create pagination
            pagination = paginate.Page(
                self.post_pages,
                page = list(self.post_map.keys()).index(path) + 1,
                items_per_page = self.config["pagination_per_page"],
                url_maker = lambda n: utils.get_relative_url(
                    self.post_pager_pages[n - 1].url,
                    page.url
                )
            )

            # Create pagination pager
            context["pagination"] = lambda args: pagination.pager(
                format = self.config["pagination_template"],
                show_if_single_page = False,
                **args
            )

        # Provide post excerpts for archive
        if self.config["archive"]:
            if path in self.archive_post_map:
                context["posts"] = self.archive_post_map[path]

        # Provide post excerpts for categories
        if self.config["categories"]:
            if path in self.category_post_map:
                context["posts"] = self.category_post_map[path]

    # Determine whether we're running under dirty reload
    def on_serve(self, server, config, builder):
        global dirtyreload
        dirtyreload = "--dirtyreload" in sys.argv

    # -------------------------------------------------------------------------

    # Generate and register files for archive
    def _generate_files_for_archive(self, config, files):
        for path, meta in self.post_meta_map.items():
            file = files.get_file_from_path(path)
            if self._is_draft(path):
                continue

            # Compute name from format string
            date_format = self.config["archive_date_format"]
            name = self._format_date(meta["date"], date_format, config)

            # Compute path from format string
            date_format = self.config["archive_url_date_format"]
            path = self.config["archive_url_format"].format(
                date = self._format_date(meta["date"], date_format, config)
            )

            # Resolve and convert path to file system path
            path = os.path.join(self.config["blog_dir"], path)
            path = os.path.normpath(path + ".md")

            # Create file for archive if it doesn't exist
            if path not in self.archive_map:
                self.archive_map[path] = []

                # Generate and register file for archive
                self._generate_file(path, "blog-archive", f"# {name}"),
                self._register_file(path, config, files, True)

            # Assign current post to archive
            self.archive_map[path].append(file)

        # Return generated archive files
        return list(self.archive_map.keys())

    # Generate and register files for categories
    def _generate_files_for_categories(self, config, files):
        allowed = set(self.config["categories_allowed"])
        for path, meta in self.post_meta_map.items():
            file = files.get_file_from_path(path)
            if self._is_draft(path):
                continue

            # Ensure category is in (non-empty) allow list
            categories = set(meta.get("categories", []))
            if allowed:
                for name in categories - allowed:
                    log.error(
                        f"Blog post '{file.src_path}' uses category '{name}' "
                        f"which is not in allow list."
                    )
                    sys.exit()

            # Traverse all categories of the post
            for name in categories:
                path = self.config["categories_url_format"].format(
                    slug = self.config["categories_slugify"](
                        name, self.config["categories_slugify_separator"]
                    )
                )

                # Resolve and convert path to file system path
                path = os.path.join(self.config["blog_dir"], path)
                path = os.path.normpath(path + ".md")

                # Create file for category if it doesn't exist
                if path not in self.category_map:
                    self.category_map[path] = []

                    # Generate and register file for category
                    self._generate_file(path, "blog-category", f"# {name}"),
                    self._register_file(path, config, files, True)

                    # Link category path to name
                    self.category_name_map[name] = path

                # Assign current post to category
                self.category_map[path].append(file)

        # Sort categories alphabetically (ascending)
        self.category_map = dict(sorted(self.category_map.items()))

        # Return generated category files
        return list(self.category_map.keys())

    # -------------------------------------------------------------------------

    # Check if a post is a draft
    def _is_draft(self, path):
        meta = self.post_meta_map[path]
        if not self.config["draft"]:

            # Check if post date is in the future
            future = False
            if self.config["draft_if_future_date"]:
                future = meta["date"] > date.today()

            # Check if post is marked as draft
            return meta.get("draft", future)

        # Post is not a draft
        return False

    # Resolve template
    def _template(self, path):
        if self.config.get("blog_custom_dir"):
            path = os.path.join(self.config["blog_custom_dir"], path)
            return os.path.normpath(path)
        else:
            return path

    # Generate a post excerpt relative to base
    def _generate_excerpt(self, file, base, config, files):
        page = file.page

        # Generate temporary file and page for post excerpt
        temp = self._register_file(file.src_path, config, [])
        excerpt = Page(page.title, temp, config)

        # Check for separator, if post excerpt is required
        separator = self.config["post_excerpt_separator"]
        if self.config["post_excerpt"] == "required":
            if separator not in page.markdown:
                log.error(f"Blog post '{temp.src_path}' has no excerpt.")
                sys.exit()

        # Increase level of h1-h5 headlines for excerpts
        markdown = page.markdown
        markdown = re.sub(
            r"(^#{1,5})", "#\\1",
            markdown, flags = re.MULTILINE
        )

        # Extract content and metadata from original post
        excerpt.file.url = base.url
        excerpt.markdown = markdown
        excerpt.meta     = page.meta

        # Render post
        excerpt.render(config, files)

        # Extract excerpt and revert page URL
        excerpt.file.url = page.url
        excerpt.content  = excerpt.content.split(separator)[0]

        # Obtain computed metadata from original post
        excerpt.categories = page.categories
        excerpt.authors    = page.authors[:self.config["authors_in_excerpt"]]

        # Return post excerpt
        return excerpt

    # Generate a file with the given template and content
    def _generate_file(self, path, template, content):
        template = self._template(f"{template}.html")

        # Generate front matter
        yaml = "\n".join([
            f"template: {template}",
            f"search:\n  exclude: true"
        ])

        # Generate and write template
        content = f"---\n{yaml}\n---\n\n{content}"
        utils.write_file(
            bytes(content, "utf-8"),
            os.path.join(self.temp_dir, path)
        )

    # Register a file
    def _register_file(self, path, config, files, temp = False):
        base = self.temp_dir if temp else config["docs_dir"]
        file = File(path, base, config["site_dir"], config["use_directory_urls"])
        files.append(file)
        return file

    # Register and populate a page
    def _register_page(self, file, config, files):
        page = Page(None, file, config)
        _populate_page(page, config, files)
        return page

    # Translate the given placeholder value
    def _translate(self, config, value):
        env = config["theme"].get_env()

        # Load language template and return translation for placeholder
        language = "partials/language.html"
        template = env.get_template(language, None, { "config": config })
        return template.module.t(value)

    # Format date according to locale
    def _format_date(self, date, format, config):
        return format_date(
            date,
            format = format,
            locale = config["theme"]["language"]
        )

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Search the given navigation section (from the configuration) recursively to
# find the section to host all generated pages (archive, categories, etc.)
def _host(nav, path):

    # Search navigation dictionary
    if isinstance(nav, dict):
        for _, item in nav.items():
            result = _host(item, path)
            if result:
                return result

    # Search navigation list
    elif isinstance(nav, list):
        if path in nav:
            return nav

        # Search each list item
        for item in nav:
            if isinstance(item, dict) and path in item.values():
                if path in item.values():
                    return nav
            else:
                result = _host(item, path)
                if result:
                    return result

# Copied and adapted from MkDocs, because we need to return existing pages and
# support anchor names as subtitles, which is pretty fucking cool.
def _data_to_navigation(nav, config, files):

    # Search navigation dictionary
    if isinstance(nav, dict):
        return [
            _data_to_navigation((key, value), config, files)
            if isinstance(value, str) else
            Section(
                title = key,
                children = _data_to_navigation(value, config, files)
            )
                for key, value in nav.items()
        ]

    # Search navigation list
    elif isinstance(nav, list):
        return [
            _data_to_navigation(item, config, files)[0]
            if isinstance(item, dict) and len(item) == 1 else
            _data_to_navigation(item, config, files)
                for item in nav
        ]

    # Extract navigation title and path and split anchors
    title, path = nav if isinstance(nav, tuple) else (None, nav)
    path, _, anchor = path.partition("#")

    # Try to load existing file
    file = files.get_file_from_path(path)
    if not file:
        return Link(title, path)

    # Generate temporary file as for post excerpts
    else:
        base = config["docs_dir"]
        link = File(path, base, config["site_dir"], config["use_directory_urls"])
        page = Page(title or file.page.title, link, config)

        # Set destination file system path and URL from original file
        link.dest_path     = file.dest_path
        link.abs_dest_path = file.abs_dest_path
        link.url           = file.url

        # Retrieve name of anchor by misusing the search index
        if anchor:
            item = SearchIndex()._find_toc_by_id(file.page.toc, anchor)

            # Set anchor name as subtitle
            page.meta["subtitle"] = item.title
            link.url += f"#{anchor}"

        # Return navigation item
        return page

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
log.addFilter(DuplicateFilter())

# Reload state, must be global, as there's no way to detect whether the plugin
# performs its initial run, or a repeated build. If there's a better way, PR!
dirtyreload = False
