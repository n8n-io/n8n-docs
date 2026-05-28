#!/usr/bin/env python3
"""
Maps URLs from nav.yml to their new URLs as dictated by latestNav.yml.

Old URL  = derived from the file path as it appears in nav.yml.
New URL  = derived from the nav HIERARCHY in latestNav.yml:
           slugify each parent section title, append the original filename stem.
           e.g. try-it-out/quickstart.md under "Get started > Build your first workflow"
                -> https://docs.n8n.io/get-started/build-your-first-workflow/quickstart

Matching strategy (to find where each old page lands in the new nav):
  1. Exact file path match (or index.md == README.md equivalence)
  2. Title match (unique)  -> TITLE_MATCH
  3. Title match (multiple) -> AMBIGUOUS
  4. No match              -> REMOVED
"""

import csv
import re
import sys
from collections import defaultdict
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(1)


BASE = "https://docs.n8n.io"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    """Convert a nav section title to a URL-safe slug."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)   # drop special chars
    text = re.sub(r"\s+", "-", text)             # spaces -> hyphens
    text = re.sub(r"-+", "-", text)              # collapse runs
    return text.strip("-")


def normalise_path(file_path: str) -> str:
    """Return the file path unchanged — match only on exact paths."""
    return file_path


def path_has_dots(file_path: str) -> bool:
    """True if the file path (excluding the .md extension) contains dots.

    Integration node files use dots in their names/directories
    (e.g. n8n-nodes-base.code/common-issues.md).  For these files the
    existing file path already encodes the correct URL structure, so we
    use it directly rather than reconstructing from slugified nav titles.
    """
    return "." in re.sub(r"\.md$", "", file_path)


def old_url_from_file_path(file_path: str) -> str:
    """Current URL derived from the file path in nav.yml."""
    if file_path.startswith("http"):
        return file_path
    path = re.sub(r"\.md$", "", file_path)
    parts = path.split("/")
    if parts[-1] in ("index", "README"):
        parts = parts[:-1]
        suffix = "/".join(parts)
        return BASE + "/" + suffix + "/" if suffix else BASE + "/"
    return BASE + "/" + path


def new_url_from_nav_hierarchy(
    parent_sections: list, file_path: str, is_section_root: bool = False
) -> tuple[str, str]:
    """
    Build (new_file_path, new_url) from the nav hierarchy and original filename.

    parent_sections:  section titles leading to (but not including) the leaf.
    file_path:        the original file path stored in the YAML leaf entry.
    is_section_root:  True when this is the first untitled item in its section,
                      i.e. the section overview page. Its URL is just the section
                      path — no filename appended, no trailing slash.
                      (index.md / README.md are always treated as section roots
                      with a trailing slash regardless of this flag.)
    """
    if file_path.startswith("http"):
        return file_path, file_path

    basename = file_path.split("/")[-1]          # e.g. "quickstart.md"
    stem = re.sub(r"\.md$", "", basename)         # e.g. "quickstart"
    slug_parts = [slugify(s) for s in parent_sections]

    if stem in ("index", "README"):
        # Directory index — URL is the section path with trailing slash
        new_file_path = "/".join(slug_parts + ["index.md"]) if slug_parts else "index.md"
        new_url = BASE + "/" + "/".join(slug_parts) + "/" if slug_parts else BASE + "/"
    elif is_section_root:
        # First untitled item in a section — URL is just the section path
        new_file_path = "/".join(slug_parts + [basename]) if slug_parts else basename
        new_url = BASE + "/" + "/".join(slug_parts) if slug_parts else BASE + "/"
    else:
        new_file_path = "/".join(slug_parts + [basename]) if slug_parts else basename
        new_url = (
            BASE + "/" + "/".join(slug_parts + [stem]) if slug_parts else BASE + "/" + stem
        )

    return new_file_path, new_url


# ---------------------------------------------------------------------------
# Nav parsing
# ---------------------------------------------------------------------------

def extract_entries(nav_node, parent_sections=None):
    """
    Recursively walk a MkDocs nav structure.
    Yields (title, file_path, parent_sections_list, is_section_root) for every leaf.

    parent_sections_list: ancestor section titles, NOT including the leaf's own title.
    is_section_root:      True when the item is the first untitled entry in its section
                          (i.e. the section overview page).
    """
    if parent_sections is None:
        parent_sections = []

    if isinstance(nav_node, str):
        yield (None, nav_node, parent_sections[:], False)

    elif isinstance(nav_node, dict):
        for key, value in nav_node.items():
            if isinstance(value, str):
                yield (key, value, parent_sections[:], False)
            elif isinstance(value, list):
                new_parent = parent_sections + [key]
                for i, item in enumerate(value):
                    # First bare string in a section = section root page
                    if i == 0 and isinstance(item, str):
                        yield (None, item, new_parent[:], True)
                    else:
                        yield from extract_entries(item, new_parent)

    elif isinstance(nav_node, list):
        for item in nav_node:
            yield from extract_entries(item, parent_sections)


def load_entries(nav_path: str):
    with open(nav_path, encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return list(extract_entries(data.get("nav", [])))


def build_new_nav_lookups(entries):
    """
    Build lookup structures from latestNav.yml entries.
    Returns:
      by_norm_path: norm_path -> list of (title, file_path, parent_sections, is_section_root)
      by_title:     title     -> list of (title, file_path, parent_sections, is_section_root)
    """
    by_norm_path = defaultdict(list)
    by_title = defaultdict(list)
    for title, file_path, parent_sections, is_section_root in entries:
        if not file_path or file_path.startswith("http"):
            continue
        entry = (title, file_path, parent_sections, is_section_root)
        by_norm_path[normalise_path(file_path)].append(entry)
        if title:
            by_title[title].append(entry)
    return by_norm_path, by_title


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    script_dir = Path(__file__).parent
    old_nav_path = script_dir / "nav.yml"
    new_nav_path = script_dir / "latestNav.yml"
    output_path  = script_dir / "url_mapping.csv"

    print(f"Reading {old_nav_path} ...")
    old_entries = load_entries(str(old_nav_path))
    print(f"Reading {new_nav_path} ...")
    new_entries = load_entries(str(new_nav_path))

    new_by_norm_path, new_by_title = build_new_nav_lookups(new_entries)

    rows = []
    for old_title, file_path, old_parent_sections, old_is_section_root in old_entries:
        if not file_path or file_path.startswith("http"):
            continue

        old_url  = old_url_from_file_path(file_path)
        norm     = normalise_path(file_path)

        # --- Find match in new nav ---
        match = None
        status = None

        # 1. Exact file path match
        if norm in new_by_norm_path:
            candidates = new_by_norm_path[norm]
            if len(candidates) == 1:
                match = candidates[0]
                status = "MATCHED"
            else:
                new_file_path_out = " | ".join(c[1] for c in candidates)
                new_url_parts = [
                    new_url_from_nav_hierarchy(c[2], c[1], c[3])[1] for c in candidates
                ]
                new_url_out = " | ".join(new_url_parts)
                status = "AMBIGUOUS"

        # 2. Title match — only when exactly one candidate exists
        # Multiple matches mean the title is too generic to be reliable
        elif old_title and old_title in new_by_title:
            candidates = new_by_title[old_title]
            if len(candidates) == 1:
                match = candidates[0]
                status = "MATCHED"
            else:
                status = "REMOVED"

        # 3. No match
        else:
            status = "REMOVED"

        # --- Build new URL from nav hierarchy (or file path for dot-named files) ---
        new_site_title = ""
        if status == "MATCHED":
            matched_title, matched_file_path, matched_parent_sections, matched_is_root = match
            new_site_title = matched_title or ""
            if path_has_dots(matched_file_path):
                # Integration nodes: file path encodes the real URL structure
                new_file_path_out = matched_file_path
                new_url_out = old_url_from_file_path(matched_file_path)
            else:
                new_file_path_out, new_url_out = new_url_from_nav_hierarchy(
                    matched_parent_sections, matched_file_path, matched_is_root
                )
            if matched_is_root:
                section_path = new_url_out[len(BASE):].strip("/")
                new_site_title = f"SECTION ROOT OF {section_path}"
            status = "UNCHANGED" if old_url == new_url_out else "MOVED"

        elif status == "REMOVED":
            new_file_path_out = ""
            new_url_out = ""

        new_site_filename_old = new_file_path_out.split("/")[-1] if new_file_path_out and "|" not in new_file_path_out else ""

        rows.append({
            "old_file_path":         file_path,
            "old_url":               old_url,
            "new_file_path":         new_file_path_out,
            "new_url":               new_url_out,
            "status":                status,
            "new_site_filename_old": new_site_filename_old,
            "new_site_title":        new_site_title,
        })

    fieldnames = [
        "old_file_path",
        "old_url",
        "new_file_path",
        "new_url",
        "status",
        "new_site_filename_old",
        "new_site_title",
    ]

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    total     = len(rows)
    unchanged = sum(1 for r in rows if r["status"] == "UNCHANGED")
    moved     = sum(1 for r in rows if r["status"] == "MOVED")
    ambiguous = sum(1 for r in rows if r["status"] == "AMBIGUOUS")
    removed   = sum(1 for r in rows if r["status"] == "REMOVED")

    print(f"\nDone. Written to {output_path}")
    print(f"  Total     : {total}")
    print(f"  UNCHANGED : {unchanged}  (URL is identical, no redirect needed)")
    print(f"  MOVED     : {moved}  (URL changed, redirect needed)")
    print(f"  AMBIGUOUS : {ambiguous}  (multiple matches, review manually)")
    print(f"  REMOVED   : {removed}  (not found in new nav)")


if __name__ == "__main__":
    main()
