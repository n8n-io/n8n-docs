#!/usr/bin/env python3
"""Check internal (relative) Markdown links in the n8n docs.

The external link checker (lychee) can't see internal links: `base` rewrites
relative `.md` links to docs.n8n.io URLs, which the `exclude` list then drops.
This script covers the gap by resolving each relative link as a local file.

GitBook rules enforced (see docs/contribute + the internal-linking guide):
  1. An internal link must end in `.md` (a folder page ends in `/README.md`).
     A trailing slash or a bare path does NOT resolve — GitBook falls back to
     the raw GitHub source URL and the link 404s on the live site.
  2. A relative `.md` link must point at a file that exists.
  3. Relative `../` links can't cross GitBook spaces (top-level folders under
     docs/). Cross-space links must use an app.gitbook.com URL, so a relative
     link resolving into another space is reported.

External URLs (http/https), mailto:, in-page anchors (#...), and links inside
code blocks are ignored. See EXCLUDE_FILES for intentional example links.

Usage:
    python3 .github/scripts/check_internal_links.py [files...]

With no arguments it scans every docs/**/*.md file. Pass specific files (e.g.
the changed files in a PR) to check only those. Exits 1 if any error is found.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

# Repo root = two levels up from .github/scripts/
REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "docs"

# Files whose links are intentional examples, not real navigation.
EXCLUDE_FILES = {
    "docs/contribute/style-guide-for-n8n-docs.md",
}

# Hidden/utility spaces: include mechanisms, not real link targets.
HIDDEN_SPACES = {"_workflows", "reusable-content"}

# Asset extensions we don't treat as doc-link violations (checked for existence
# only, not for the .md rule).
ASSET_EXTS = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".pdf",
    ".json", ".yml", ".yaml", ".zip", ".mp4", ".mov", ".csv", ".txt",
}

# Markdown inline links [text](target) and HTML href/src attributes.
# The target allows one level of balanced parens so filenames like
# `(node-name).all.md` are captured whole instead of truncated at the inner `)`.
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(\s*(<[^>]+>|(?:[^()\s]+|\([^()]*\))+)")
HTML_ATTR_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
# Reference definitions: [id]: target. The label's first char must not be `^`,
# so Markdown footnote definitions ([^1]: some text) aren't treated as links.
REF_DEF_RE = re.compile(r"^\s{0,3}\[(?:[^^\]][^\]]*)\]:\s*(\S+)")


def blank_gitbook_native(text: str) -> str:
    """Blank out GitBook-native link blocks, preserving line numbers.

    GitBook serializes some links as trailing-slash directory refs (no `.md`)
    and resolves them natively at render time, so they aren't hand-authored
    broken links. Two forms:
      * content-ref cards: `<table data-view="cards">` ... `</table>`
      * button components: `<a ... class="...button...">`
    (Verified: these render to real GitBook page targets, not GitHub-source 404s.)
    """
    def _blank(match: re.Match) -> str:
        return "\n" * match.group(0).count("\n")

    text = re.sub(
        r'<table\b[^>]*data-view="cards".*?</table>',
        _blank,
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )
    # Blank the opening <a ...> tag of button components (the href lives here).
    text = re.sub(
        r'<a\b[^>]*class="[^"]*\bbutton\b[^"]*"[^>]*>',
        _blank,
        text,
        flags=re.IGNORECASE,
    )
    return text


def strip_code(text: str) -> str:
    """Blank out fenced code blocks and inline code so their example links
    aren't parsed, while preserving line numbers."""
    lines = text.split("\n")
    out = []
    fence = None  # active fence marker (``` or ~~~)
    for line in lines:
        stripped = line.lstrip()
        marker = None
        if stripped.startswith("```"):
            marker = "```"
        elif stripped.startswith("~~~"):
            marker = "~~~"
        if marker:
            if fence is None:
                fence = marker
            elif fence == marker:
                fence = None
            out.append("")
            continue
        if fence is not None:
            out.append("")
            continue
        # Drop inline code spans on the line.
        out.append(re.sub(r"`[^`]*`", "", line))
    return "\n".join(out)


def space_of(rel_path: str) -> str | None:
    """Top-level docs space (folder) for a repo-relative path, or None."""
    parts = Path(rel_path).parts
    if len(parts) >= 2 and parts[0] == "docs":
        return parts[1]
    return None


def iter_targets(text: str):
    """Yield (line_number, raw_target) for every link in the (code-stripped) text."""
    for i, line in enumerate(text.split("\n"), start=1):
        for m in MD_LINK_RE.finditer(line):
            target = m.group(1).strip()
            if target.startswith("<") and target.endswith(">"):
                target = target[1:-1].strip()
            yield i, target
        for m in HTML_ATTR_RE.finditer(line):
            yield i, m.group(1).strip()
        m = REF_DEF_RE.match(line)
        if m:
            yield i, m.group(1).strip()


def classify(md_file: Path, line: int, target: str):
    """Return (category, message) for a broken link, or None if the link is fine."""
    # Strip anchor and query.
    path_part = target.split("#", 1)[0].split("?", 1)[0].strip()

    # Skip: external, mailto/other schemes, protocol-relative, pure anchors,
    # templating/liquid, and empty (pure-anchor) targets.
    if not path_part:
        return None
    if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", path_part):  # scheme: http:, mailto:, tel:
        return None
    if path_part.startswith("//"):  # protocol-relative
        return None
    if path_part.startswith("{"):  # liquid/templating
        return None

    src_dir = md_file.parent
    ext = os.path.splitext(path_part)[1].lower()

    # Leading-slash absolute paths aren't relative links. GitBook doesn't resolve
    # them the way the guide expects, so it falls back to the GitHub source (404).
    # Always flag them; note whether the target would even exist under docs/.
    if path_part.startswith("/"):
        resolved = (DOCS_ROOT / path_part.lstrip("/")).resolve()
        hint = "target exists under docs/" if resolved.exists() else "target missing"
        return (
            "absolute-path",
            f"absolute path won't resolve in GitBook, use a relative .md link "
            f"({hint}): {target}",
        )

    # Assets: only check existence, skip the .md rule.
    if ext in ASSET_EXTS:
        resolved = (src_dir / path_part).resolve()
        if not resolved.exists():
            rel = os.path.relpath(resolved, REPO_ROOT)
            return ("missing-asset", f"asset not found: {target} -> {rel}")
        return None

    # Rule 1: internal doc links must end in .md.
    if not path_part.endswith(".md"):
        return ("no-md-extension", f"internal link must end in .md: {target}")

    # Rule 2: target file must exist.
    resolved = (src_dir / path_part).resolve()
    if not resolved.exists():
        rel = os.path.relpath(resolved, REPO_ROOT)
        return ("missing-target", f"target not found: {target} -> {rel}")

    # Rule 3: relative links can't cross spaces.
    try:
        resolved_rel = resolved.relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return None
    src_rel = md_file.relative_to(REPO_ROOT).as_posix()
    src_space, dst_space = space_of(src_rel), space_of(resolved_rel)
    if src_space and dst_space and src_space != dst_space:
        return (
            "cross-space-relative",
            f"relative link crosses space {src_space} -> {dst_space} "
            f"(use an app.gitbook.com URL): {target}",
        )
    return None


def discover_files() -> list[Path]:
    return sorted(DOCS_ROOT.rglob("*.md"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("files", nargs="*", help="Markdown files to check (default: all docs)")
    ap.add_argument(
        "--warn-cross-space",
        action="store_true",
        help="Treat cross-space relative links as warnings, not errors.",
    )
    args = ap.parse_args()

    if args.files:
        files = [Path(f).resolve() for f in args.files]
    else:
        files = discover_files()

    warn_categories = {"cross-space-relative"} if args.warn_cross_space else set()

    errors: list[str] = []
    warnings: list[str] = []
    counts: dict[str, int] = {}

    for md_file in files:
        if not md_file.exists() or md_file.suffix != ".md":
            continue
        try:
            rel = md_file.relative_to(REPO_ROOT).as_posix()
        except ValueError:
            continue
        if rel in EXCLUDE_FILES:
            continue
        if space_of(rel) in HIDDEN_SPACES:
            continue

        raw = md_file.read_text(encoding="utf-8", errors="replace")
        text = strip_code(blank_gitbook_native(raw))
        for line, target in iter_targets(text):
            result = classify(md_file, line, target)
            if result is None:
                continue
            category, message = result
            counts[category] = counts.get(category, 0) + 1
            entry = f"{rel}:{line}  [{category}]  {message}"
            if category in warn_categories:
                warnings.append(entry)
            else:
                errors.append(entry)

    if warnings:
        print(f"⚠️  {len(warnings)} warning(s):\n")
        for w in sorted(warnings):
            print(f"  {w}")
        print()

    if errors:
        print(f"❌ {len(errors)} broken internal link(s):\n")
        for e in sorted(errors):
            print(f"  {e}")
        print("\nBy category: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))
        print(
            "\nAdd intentional example files to EXCLUDE_FILES in "
            ".github/scripts/check_internal_links.py if they are false positives."
        )
        return 1

    print(f"✅ No broken internal links found ({len(files)} file(s) scanned).")
    if warnings:
        print(f"   ({len(warnings)} warning(s) above — not failing the build.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
