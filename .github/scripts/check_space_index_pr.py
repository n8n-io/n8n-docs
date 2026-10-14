#!/usr/bin/env python3
"""Decide what to do with an automated GitBook space-index PR.

The DocFather "Space Index" flow (n8n YVFpoJbEmGspsZte) regenerates SPACE_INDEX.md
at the repo root from each GitBook space's Git Sync config, and opens a PR when the
rendered table changes. This script decides whether that PR is safe to merge
unattended.

The authoritative source is GitBook, which a GitHub runner cannot cheaply re-derive
(it would need the GitBook API token and would duplicate the flow's own guards). So
this is a STRUCTURAL verdict: it proves the proposed table is a well-formed space
index that did not lose rows, not that each row matches GitBook. The flow already
aborts rather than write a partial index (pagination cut short, duplicate folder,
unreadable current file, row count collapsing by half).

What we actually protect against is a mangled or truncated render reaching main,
because SPACE_INDEX.md feeds check_internal_links.py's cross-space link resolution
and an unknown space ID there is SILENTLY SKIPPED, never failed. A corrupted index
would quietly stop checking a whole space's inbound links.

Verdicts:
  merge     head parses as a well-formed space table, every row is structurally
            sound, no duplicate folder or space ID, and the row count did not
            collapse relative to base
  escalate  anything else

`close_outdated` has no meaning here: when nothing changed the flow opens no PR at
all, so there is no stale PR to close.

Usage:
    check_space_index_pr.py --base FILE --head FILE [--docs-root DIR]

Stdlib only, no network. Mirrors .github/scripts/check_version_snippet_pr.py.
"""

import argparse
import json
import re
import sys
from pathlib import Path

# Row form: | `folder` | `SpaceId` | Title | visibility | [optional extra column]
# The first two cells are the load-bearing pair: check_internal_links.py's
# SPACE_ID_ROW_RE reads exactly those and ignores the rest, so they are what a
# corrupted render would break. A space ID is a 20-char GitBook object ID.
ROW_RE = re.compile(r"^\|\s*`([a-z0-9-]+)`\s*\|\s*`([A-Za-z0-9]{20})`\s*\|(.*)\|\s*$")
SEPARATOR_CELL_RE = re.compile(r"^:?-{3,}:?$")
VISIBILITIES = {"public", "private", "unlisted", "share-link", "visitor-auth"}

# The table is currently 5 columns and drops to 4 when the volatile "Last synced"
# column goes (DOC-2461). Accept either exact header, nothing else - matching only a
# prefix would let a table with arbitrary column labels through to a merge verdict.
HEADER_4 = ["Folder", "Space ID", "Title", "Visibility"]
HEADER_5 = HEADER_4 + ["Last synced"]
ALLOWED_HEADERS = (HEADER_4, HEADER_5)


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
        return []
    out = []
    for line in lines[start:]:
        if not line.strip().startswith("|"):
            break
        out.append(line)
    return out


def parse_table(text):
    """Parse a space-index table.

    Returns (rows, error). `rows` is a list of (folder, space_id, cell_count).
    `error` is None on success, else a short human-readable reason.
    """
    lines = _table_lines(text)
    if len(lines) < 3:
        return [], "no space table found (need a header, a separator and a row)"

    header, separator, body = lines[0], lines[1], lines[2:]
    header_cells = _cells(header)
    if header_cells not in ALLOWED_HEADERS:
        return [], (f"unexpected table header {header_cells} (expected {HEADER_4} "
                    f"or {HEADER_5})")

    width = len(header_cells)
    sep_cells = _cells(separator)
    if len(sep_cells) != width or not all(SEPARATOR_CELL_RE.match(c) for c in sep_cells):
        return [], "second table line is not a valid separator row"

    rows = []
    for line in body:
        m = ROW_RE.match(line)
        if not m:
            return [], f"malformed row: {line.strip()[:80]}"
        cells = _cells(line)
        if len(cells) != width:
            return [], (f"row '{m.group(1)}' has {len(cells)} cells but the header "
                        f"has {width}")
        visibility = cells[3].lower()
        if visibility not in VISIBILITIES:
            return [], f"row '{m.group(1)}' has an unknown visibility '{cells[3]}'"
        if not cells[2]:
            return [], f"row '{m.group(1)}' has an empty title"
        rows.append((m.group(1), m.group(2), len(cells)))
    if not rows:
        return [], "space table has no rows"
    return rows, None


def evaluate(base_text, head_text, docs_root=None):
    """Decide the verdict for a space-index PR. Pure; no I/O beyond an optional
    existence check under `docs_root`."""
    out = {"verdict": "escalate", "reason": "", "base": {}, "head": {}}

    head_rows, err = parse_table(head_text)
    if err:
        out["reason"] = f"proposed SPACE_INDEX.md is not a valid space table: {err}"
        return out

    base_rows, base_err = parse_table(base_text)
    out["base"] = {"spaces": len(base_rows), "parse_error": base_err or ""}
    out["head"] = {"spaces": len(head_rows)}

    folders = [r[0] for r in head_rows]
    space_ids = [r[1] for r in head_rows]

    dupe_folder = next((f for f in folders if folders.count(f) > 1), None)
    if dupe_folder:
        out["reason"] = f"duplicate folder '{dupe_folder}' in the proposed index"
        return out
    dupe_id = next((s for s in space_ids if space_ids.count(s) > 1), None)
    if dupe_id:
        out["reason"] = f"duplicate space ID '{dupe_id}' in the proposed index"
        return out

    if docs_root is not None:
        missing = [f for f in folders if not (Path(docs_root) / f).is_dir()]
        if missing:
            # A genuinely new space is rare (a few a year) and is exactly when a
            # human should confirm the mapping, so this escalates rather than merges.
            out["reason"] = ("rows point at folders that do not exist under docs/: "
                             + ", ".join(sorted(missing)))
            return out

    # Mirrors the flow's own collapse guard: never let the index lose half its spaces.
    if base_err:
        out["reason"] = (f"could not parse the current SPACE_INDEX.md on main "
                         f"({base_err}), so the row count cannot be compared")
        return out
    if len(head_rows) * 2 < len(base_rows):
        out["reason"] = (f"space count collapsed from {len(base_rows)} to "
                         f"{len(head_rows)}")
        return out

    if base_text.strip() == head_text.strip():
        out["reason"] = "proposed index is identical to main"
        return out

    out["verdict"] = "merge"
    out["reason"] = (f"well-formed space table, {len(head_rows)} spaces "
                     f"(was {len(base_rows)})")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Decide a space-index PR verdict.")
    ap.add_argument("--base", required=True, help="path to SPACE_INDEX.md on main")
    ap.add_argument("--head", required=True, help="path to SPACE_INDEX.md on the PR head")
    ap.add_argument("--docs-root", help="docs/ directory to check folders against")
    args = ap.parse_args()

    try:
        base_text = open(args.base, encoding="utf-8").read()
        head_text = open(args.head, encoding="utf-8").read()
    except OSError as e:
        sys.stderr.write(f"cannot read space index file: {e}\n")
        return 2

    print(json.dumps(evaluate(base_text, head_text, args.docs_root)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
