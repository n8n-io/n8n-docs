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
import sys

from collections import defaultdict
from functools import partial
from markdown.extensions.toc import slugify
from mkdocs import utils
from mkdocs.commands.build import DuplicateFilter
from mkdocs.config import config_options as opt
from mkdocs.config.base import Config
from mkdocs.plugins import BasePlugin

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Tags plugin configuration scheme
class TagsPluginConfig(Config):
    enabled = opt.Type(bool, default = True)

    # Options for tags
    tags_file = opt.Optional(opt.Type(str))
    tags_extra_files = opt.Type(dict, default = dict())
    tags_slugify = opt.Type((type(slugify), partial), default = slugify)
    tags_slugify_separator = opt.Type(str, default = "-")
    tags_allowed = opt.Type(list, default = [])

# -----------------------------------------------------------------------------

# Tags plugin
class TagsPlugin(BasePlugin[TagsPluginConfig]):

    # Initialize plugin
    def on_config(self, config):
        if not self.config.enabled:
            return

        # Initialize tags
        self.tags_map = defaultdict(list)
        self.tags_type_map = config.extra.get("tags")

        # Initialize tags index pages
        self.tags_file = None
        self.tags_extra_files = []

    # Resolve index pages (and extra files)
    def on_nav(self, nav, *, config, files):
        if not self.config.enabled:
            return

        # Resolve tags index page
        file = self.config.tags_file
        if file:
            self.tags_file = self._get_tags_file(files, file)

        # Resolve extra tags index pages, if given
        for file, _ in self.config.tags_extra_files.items():
            self.tags_extra_files.append(
                self._get_tags_file(files, file)
            )

    # Build and render tags index(es) and link pages
    def on_page_markdown(self, markdown, *, page, config, files):
        if not self.config.enabled:
            return

        # Render tags index page
        if page.file == self.tags_file:
            return self._render_tag_index(markdown, page)

        # Render extra tags index pages
        if page.file in self.tags_extra_files:
            return self._render_tag_index(
                markdown, page,
                self.config.tags_extra_files.get(
                    page.file.src_uri
                )
            )

        # Link page to each tag
        for tag in page.meta.get("tags", []):
            self.tags_map[tag].append(page)

            # Ensure tag is in (non-empty) allow list
            if self.config.tags_allowed:
                if tag not in self.config.tags_allowed:
                    log.error(
                        f"Page '{page.file.src_uri}' uses tag '{tag}' "
                        f"which is not in allow list."
                    )
                    sys.exit()

    # Inject tags into page (after search and before minification)
    def on_page_context(self, context, *, page, config, nav):
        if not self.config.enabled:
            return

        # Provide tags for page
        if "tags" in page.meta:
            context["tags"] = [
                self._render_tag(tag)
                    for tag in page.meta["tags"]
            ]

    # -------------------------------------------------------------------------

    # Obtain tags file (and extra files)
    def _get_tags_file(self, files, path):
        file = files.get_file_from_path(path)
        if not file:
            log.error(f"Tags file '{path}' does not exist.")
            sys.exit()

        # Hack: 2nd pass for tags index page(s)
        files.append(file)
        return file

    # Render tags index
    def _render_tag_index(self, markdown, tags_index, included = None):
        if not "[TAGS]" in markdown:
            markdown += "\n[TAGS]"

        # Filter tags against inclusion list, if given
        tags = []
        if included:
            for key, value in self.tags_map.items():
                if self.tags_type_map.get(key) in included:
                    tags.append((key, value))

        # Replace placeholder in Markdown with rendered tags index
        return markdown.replace("[TAGS]", "\n".join([
            self._render_tag_links(tags_index, *args)
                for args in sorted(tags or self.tags_map.items())
        ]))

    # Render the given tag and links to all pages with occurrences
    def _render_tag_links(self, tags_index, name, pages):
        classes = ["md-tag"]
        if isinstance(self.tags_type_map, dict):
            classes.append("md-tag-icon")
            type = self.tags_type_map.get(name)
            if type:
                classes.append(f"md-tag-icon--{type}")

        # Render section for tag and a link to each page
        classes = " ".join(classes)
        content = [f"## <span class=\"{classes}\">{name}</span>", ""]
        for page in pages:
            url = utils.get_relative_url(
                page.file.src_uri,
                tags_index.file.src_uri
            )

            # Render link to page
            title = page.meta.get("title", page.title)
            content.append(f"- [{title}]({url})")

        # Return rendered tag links
        return "\n".join(content)

    # Render the given tag
    def _render_tag(self, name):
        tag = dict(name = name)

        # Add tag type, if given
        if self.tags_type_map:
            tag["type"] = self.tags_type_map.get(name)

        # Add tag URL, if tags index is enabled
        if self.tags_file:
            tag["url"] = "#".join([
                self.tags_file.url,
                self.config.tags_slugify(
                    name, self.config.tags_slugify_separator
                )
            ])

        # Return tag
        return tag

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
log.addFilter(DuplicateFilter())
