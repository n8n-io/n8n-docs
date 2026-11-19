#!/usr/bin/env python3
"""Decide what to do with an automated reusable-content-index PR.

The DocFather "Reusable Content Index" flow (n8n tDhbJYHQGrLe5U5N) walks every
docs/**/*.md file, collects the GitBook reusable blocks they include, enriches each
block from the GitBook API and renders REUSABLE_CONTENT_INDEX.md at the repo root.
It opens a PR when that table changes. This script decides whether the PR is safe to
merge unattended.

As with the space index, GitBook is the authoritative source and a GitHub runner
cannot cheaply re-derive it, so this is a STRUCTURAL verdict: it proves the proposed
table is well-formed and did not lose or degrade rows.

The specific thing it exists to catch is the failure mode of
https://github.com/n8n-io/n8n-docs/pull/5154 (DOC-2183): a transient GitBook API miss
produced a row named after its own block ID with an empty preview. That PR sat open
for 20 days and would have DEGRADED the index if a human had merged it - and because
the flow skips while one of its own PRs is open, it also stalled every run for three
weeks. The flow was hardened in 2026-08-24 to hard-fail instead, and these checks are
the second line of that defence.

Parsing note: the Preview column is free text lifted from GitBook and regularly
contains unescaped `|` characters (12 of 110 live rows do), so rows CANNOT be split
on pipes into a fixed cell count. The first four cells are well-formed and are matched
positionally; everything after them is treated as "preview | used-in", split from the
right.

Verdicts:
  merge     head parses as a well-formed index, no degraded rows, no duplicate block
            IDs, and the block count did not collapse relative to base
  escalate  anything else

`close_outdated` has no meaning here: when nothing changed the flow opens no PR.

Usage:
    check_reusable_index_pr.py --base FILE --head FILE

Stdlib only, no network. Mirrors .github/scripts/check_version_snippet_pr.py.
"""

import argparse
import json
import re
import sys

# | `blockId` | name | `parentSpaceId` | `{% include ... %}` | preview... | used in |
# Only the first four cells are matched positionally; the remainder is free text.
ROW_RE = re.compile(
    r"^\|\s*`([A-Za-z0-9_-]+)`\s*\|\s*([^|]*?)\s*\|\s*`([A-Za-z0-9]+)`\s*\|\s*`([^`]*)`\s*\|(.*)$"
)
SEPARATOR_CELL_RE = re.compile(r"^:?-{3,}:?$")
# What the CONSUMERS see, which is BROADER than the table grammar above.
# gitbook_preview_links.load_reusable_index accepts any line starting with "| `" that
# splits into at least 3 cells - no character class on the ID at all, so IDs with
# hyphens or underscores count. check_internal_links.reusable_blocks is stricter.
# Take the broader of the two: a row only one consumer reads is still a row that
# reaches production, and both scan every line in the file rather than a scoped table.
def is_consumer_row(line):
    """True if any downstream reader would treat this line as a block row."""
    if not line.startswith("| `"):
        return False
    return len([c.strip() for c in line.strip().strip("|").split("|")]) >= 3
# Exact header, not a prefix: matching only "| ID" would let a table with arbitrary
# column labels through to a merge verdict.
HEADER = ["ID", "Name", "Parent space", "Include snippet", "Preview", "Used in"]
INCLUDE_HINT = "{% include"


def _cells(line):
    """Cells of a Markdown table row, without the leading/trailing empties."""
    return [c.strip() for c in line.strip().split("|")[1:-1]]


def _table_lines(text):
    """The header, separator and contiguous body rows of the first pipe table.

    Rows are taken only while they stay contiguous: a blank or prose line ends the
    table. Collecting every pipe-prefixed line in the file instead would let an
    unrelated table further down contribute rows.
    """
    lines = (text or "").split("\n")
    start = next((i for i, l in enumerate(lines) if l.strip().startswith("|")), None)
    if start is None:
        return 0, []
    out = []
    for line in lines[start:]:
        if not line.strip().startswith("|"):
            break
        out.append(line)
    return start, out


def stray_consumer_rows(text, start, count):
    """Lines outside the parsed table that the consumers would still read as rows."""
    lines = (text or "").split("\n")
    outside = lines[:start] + lines[start + count:]
    return [l for l in outside if is_consumer_row(l)]


def parse_table(text):
    """Parse a reusable-content-index table.

    Returns (rows, error). `rows` is a list of dicts with block_id / name /
    space_id / include / preview / used_in. `error` is None on success.
    """
    start, lines = _table_lines(text)
    if len(lines) < 3:
        return [], "no index table found (need a header, a separator and a row)"

    stray = stray_consumer_rows(text, start, len(lines))
    if stray:
        return [], (f"{len(stray)} row(s) outside the table that the index consumers "
                    f"would still read: {stray[0].strip()[:80]}")

    header, separator, body = lines[0], lines[1], lines[2:]
    header_cells = _cells(header)
    if header_cells != HEADER:
        return [], f"unexpected table header {header_cells} (expected {HEADER})"

    sep_cells = _cells(separator)
    if (len(sep_cells) != len(HEADER)
            or not all(SEPARATOR_CELL_RE.match(c) for c in sep_cells)):
        return [], "second table line is not a valid separator row"

    rows = []
    for line in body:
        m = ROW_RE.match(line)
        if not m:
            return [], f"malformed row: {line.strip()[:80]}"
        block_id, name, space_id, include, rest = m.groups()
        # `rest` is "preview | used-in |". Split from the right so pipes inside the
        # preview text stay with the preview.
        parts = rest.rsplit("|", 2)
        if len(parts) != 3:
            return [], f"row '{block_id}' is missing the preview or used-in column"
        rows.append({
            "block_id": block_id,
            "name": name,
            "space_id": space_id,
            "include": include,
            "preview": parts[0].strip(),
            "used_in": parts[1].strip(),
        })
    if not rows:
        return [], "index table has no rows"
    return rows, None


def degraded_rows(rows):
    """Rows showing the DOC-2183 corruption signature, as (block_id, why) pairs."""
    bad = []
    for r in rows:
        if not r["name"]:
            bad.append((r["block_id"], "empty name"))
        elif r["name"] == r["block_id"]:
            # The GitBook title was unavailable, so the renderer fell back to the ID.
            bad.append((r["block_id"], "name is the block ID (GitBook title missing)"))
        if not r["preview"]:
            bad.append((r["block_id"], "empty preview"))
        if INCLUDE_HINT not in r["include"]:
            bad.append((r["block_id"], "include snippet is not an include block"))
    return bad


def evaluate(base_text, head_text):
    """Decide the verdict for a reusable-content-index PR. Pure, no I/O."""
    out = {"verdict": "escalate", "reason": "", "base": {}, "head": {}}

    head_rows, err = parse_table(head_text)
    if err:
        out["reason"] = f"proposed REUSABLE_CONTENT_INDEX.md is not a valid index: {err}"
        return out

    base_rows, base_err = parse_table(base_text)
    out["base"] = {"blocks": len(base_rows), "parse_error": base_err or ""}
    out["head"] = {"blocks": len(head_rows)}

    bad = degraded_rows(head_rows)
    if bad:
        shown = ", ".join(f"{b} ({why})" for b, why in bad[:3])
        more = f" and {len(bad) - 3} more" if len(bad) > 3 else ""
        out["reason"] = f"degraded rows in the proposed index: {shown}{more}"
        return out

    ids = [r["block_id"] for r in head_rows]
    dupe = next((i for i in ids if ids.count(i) > 1), None)
    if dupe:
        out["reason"] = f"duplicate block ID '{dupe}' in the proposed index"
        return out

    if base_err:
        out["reason"] = (f"could not parse the current REUSABLE_CONTENT_INDEX.md on "
                         f"main ({base_err}), so the block count cannot be compared")
        return out
    # Mirrors the flow's own collapse guard.
    if len(head_rows) * 2 < len(base_rows):
        out["reason"] = (f"block count collapsed from {len(base_rows)} to "
                         f"{len(head_rows)}")
        return out

    if base_text.strip() == head_text.strip():
        out["reason"] = "proposed index is identical to main"
        return out

    out["verdict"] = "merge"
    out["reason"] = (f"well-formed index, {len(head_rows)} blocks "
                     f"(was {len(base_rows)})")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Decide a reusable-content-index PR verdict.")
    ap.add_argument("--base", required=True,
                    help="path to REUSABLE_CONTENT_INDEX.md on main")
    ap.add_argument("--head", required=True,
                    help="path to REUSABLE_CONTENT_INDEX.md on the PR head")
    args = ap.parse_args()

    try:
        base_text = open(args.base, encoding="utf-8").read()
        head_text = open(args.head, encoding="utf-8").read()
    except OSError as e:
        sys.stderr.write(f"cannot read reusable content index file: {e}\n")
        return 2

    print(json.dumps(evaluate(base_text, head_text)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
