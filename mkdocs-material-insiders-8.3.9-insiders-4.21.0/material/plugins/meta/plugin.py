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

from glob import glob
from mkdocs.commands.build import DuplicateFilter
from mkdocs.config.config_options import Type
from mkdocs.plugins import BasePlugin
from yaml import SafeLoader, load

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Meta plugin
class MetaPlugin(BasePlugin):

    # Configuration scheme
    config_scheme = (
        ("meta_file", Type(str, default = "**/.meta.yml")),
    )

    # Initialize meta mapping
    def on_config(self, config):
        self.meta = {}

    # Find all meta files and add to mapping
    def on_pre_build(self, config, **kwargs):
        path = os.path.join(config["docs_dir"], self.config["meta_file"])
        for file in glob(path, recursive = True):
            with open(file, encoding = "utf-8") as f:
                self.meta[file] = load(f, SafeLoader) or {}

    # Set defaults for file, if applicable
    def on_page_markdown(self, markdown, page, config, **kwargs):
        path = os.path.join(config["docs_dir"], page.file.src_path)
        for file, defaults in self.meta.items():
            if path.startswith(os.path.dirname(file)):
                file = file[len(config["docs_dir"]) + 1:]
                merge(page.meta, defaults, file)

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Recursively merge a dictionary
def merge(meta, defaults, file):
    for key, value in defaults.items():
        if key in meta:

            # Merge dictionaries
            if isinstance(meta[key], dict):
                if isinstance(value, dict):
                    merge(meta[key], value, file)
                else:
                    log.warning(
                        f"Format error in metadata of '{file}': "
                        f"'{key}' is not a dictionary. Skipped."
                    )

            # Merge lists
            elif isinstance(meta[key], list):
                if isinstance(value, list):
                    for item in value:
                        if item not in meta[key]:
                            meta[key].append(item)
                else:
                    log.warning(
                        f"Format error in metadata of '{file}': "
                        f"'{key}' is not a list. Skipped."
                    )

        # Set scalar value
        else:
            meta[key] = value

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
log.addFilter(DuplicateFilter())
