#!/usr/bin/env python3
"""Check GitBook block syntax in the n8n docs that silently breaks rendering.

GitBook's `{% ... %}` blocks have a few authoring gotchas that pass a normal
Markdown review but render wrong (or not at all) on the live site. Vale and the
Markdown linters don't know about them, so this script encodes them as CI rules.

Each entry in RULES scans the Markdown files changed in a PR (or all of docs/
when run with no arguments) and reports a finding. The rules are line-based and
stdlib-only; there is no Markdown dependency in CI.

Rules enforced:
  1. heading-after-endhint
     A heading placed on the line immediately after `{% endhint %}`, with no
     blank line between them, fails to render on the live site -- the raw `##`
     leaks through as literal text. This is scoped to `{% endhint %}` ONLY, on
     purpose. The opening tags `{% hint %}`, `{% step %}`, and `{% column %}`
     treat a glued heading as the block's styled title and render it correctly
     (the style guide documents the hint-title pattern), so those must not be
     flagged. Headings inside fenced code blocks (e.g. the style guide's own
     examples of this exact syntax) are excluded via the code-fence mask.

Usage:
    python3 .github/scripts/check_gitbook_syntax.py [files...]

With no arguments it scans every docs/**/*.md file. Pass specific files (e.g.
the changed files in a PR) to check only those. Exits 1 if any finding is found.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Iterable

# Repo root = two levels up from .github/scripts/
REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "docs"

# A real ATX heading: 1-6 `#` followed by a space or end of line. (`#foo` with
# no space is not a heading in CommonMark, so it isn't matched.)
ATX_RE = re.compile(r"^#{1,6}(?:\s|$)")
# The whole (trimmed) line is exactly the endhint tag, tolerant of inner spaces.
ENDHINT_RE = re.compile(r"^\{%\s*endhint\s*%\}$")
# Opening of a fenced code block: 3+ backticks or 3+ tildes.
FENCE_RE = re.compile(r"^(`{3,}|~{3,})")


def code_line_mask(lines: list[str]) -> list[bool]:
    """Return a per-line mask where True means the line is a fenced code block
    delimiter or sits inside one.

    A fence opens on 3+ backticks/tildes and closes only on a delimiter of the
    same character that is at least as long and carries no info string -- so a
    longer outer fence can wrap an inner ```` ``` ```` example without the inner
    delimiter ending the outer block. This mirrors how GitBook (and CommonMark)
    parse nested fences, so illustrative examples don't get misread as headings.
    """
    mask = [False] * len(lines)
    fence: tuple[str, int] | None = None  # (char, length) of the open fence
    for i, line in enumerate(lines):
        stripped = line.lstrip()
        m = FENCE_RE.match(stripped)
        if m:
            run = m.group(1)
            char, length = run[0], len(run)
            rest = stripped[length:].strip()
            if fence is None:
                fence = (char, length)
                mask[i] = True
                continue
            # A closing fence matches the char, is at least as long, and has no
            # trailing info string.
            if char == fence[0] and length >= fence[1] and not rest:
                fence = None
                mask[i] = True
                continue
        if fence is not None:
            mask[i] = True
    return mask


def rule_heading_after_endhint(
    rel: str, lines: list[str], in_code: list[bool]
) -> Iterable[tuple[int, str, str]]:
    """Flag a heading glued directly below `{% endhint %}` (rule 1)."""
    name = "heading-after-endhint"
    for i, line in enumerate(lines):
        if i == 0 or in_code[i]:
            continue
        if ATX_RE.match(line) and ENDHINT_RE.match(lines[i - 1].strip()):
            yield (
                i + 1,
                name,
                "heading is glued to the preceding {% endhint %}; add a blank "
                "line above it or it won't render on the live site",
            )


# Registry of GitBook-syntax rules. Add the next rule here.
RULES = [rule_heading_after_endhint]


def discover_files() -> list[Path]:
    return sorted(DOCS_ROOT.rglob("*.md"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("files", nargs="*", help="Markdown files to check (default: all docs)")
    args = ap.parse_args()

    if args.files:
        files = [Path(f).resolve() for f in args.files]
    else:
        files = discover_files()

    findings: list[str] = []

    for md_file in files:
        if not md_file.exists() or md_file.suffix != ".md":
            continue
        try:
            rel = md_file.relative_to(REPO_ROOT).as_posix()
        except ValueError:
            continue

        lines = md_file.read_text(encoding="utf-8", errors="replace").split("\n")
        in_code = code_line_mask(lines)
        for rule in RULES:
            for line, name, message in rule(rel, lines, in_code):
                findings.append(f"{rel}:{line}  [{name}]  {message}")

    if findings:
        print(f"❌ {len(findings)} GitBook syntax issue(s):\n")
        for f in sorted(findings):
            print(f"  {f}")
        print(
            "\nRun locally with python3 .github/scripts/check_gitbook_syntax.py <file>"
        )
        return 1

    print(f"✅ No GitBook syntax issues found ({len(files)} file(s) scanned).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
