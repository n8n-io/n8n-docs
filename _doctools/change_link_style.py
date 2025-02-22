#!/usr/bin/env python3
from pathlib import Path
import argparse
import re

def find_markdown_files(directory):
	"""Return a list of path objects for all markdown files in the given directory."""
	return list(Path(directory).rglob("*.[mM][dD]"))

def map_urls_to_files(path_list, root_dir):
	"""Return a dictionary mapping URL link targets to file targets."""
	path_maps = dict()
	for path in path_list:
		# Here, we convert file paths to absolute paths from the root_dir
		md_link_target = "/" / path.relative_to(root_dir)
		url_link_target = get_url_path_from_file_path(md_link_target)
		path_maps[url_link_target] = str(md_link_target)

	return path_maps

def get_url_path_from_file_path(file_path):
	"""Return the URL path for a given file path."""
	if file_path.name == "index.md":
		return str(file_path.parent)
	else:
		return str(file_path.parent / file_path.stem)

def main(directory):
	"""
	Finds Markdown files, calculates URL paths associated with them, then finds and
	replaces URL paths with file paths in links throughout the repo.
	"""
	markdown_files = find_markdown_files(directory)
	snippet_files = find_markdown_files("../_snippets")
	link_maps = map_urls_to_files(markdown_files, directory)

	for file in markdown_files + snippet_files:
		text = file.read_text()

		for url_target, file_target in link_maps.items():
			find_pattern = fr"]\({url_target}/?(#[0-9A-Za-z-]+)?\)"
			replace_pattern = fr"]({file_target}\1)"
			text = re.sub(find_pattern, replace_pattern, text)

		file.write_text(text)


if __name__ == "__main__":
	parser = argparse.ArgumentParser(description="Replace URL style link targets with markdown file targets")
	parser.add_argument("--dir", type=str, default="../docs", help="Directory to scan (default: '../docs')")

	args = parser.parse_args()
	main(args.dir)

