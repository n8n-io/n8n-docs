#!/usr/bin/env python3
"""Network-free tests for check_reusable_index_pr.py.

Table-driven, no pytest, same harness as the sibling script tests.

Run: python3 .github/scripts/tests/test_check_reusable_index_pr.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "check_reusable_index_pr.py"
REPO_ROOT = HERE.parents[2]

spec = importlib.util.spec_from_file_location("cri", SCRIPT)
cri = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cri)

SPACE = "GixZThfitWP21x2gQFpD"
HEADER = ("| ID | Name | Parent space | Include snippet | Preview | Used in |\n"
          "|----|------|--------------|-----------------|---------|---------|")


def row(block_id, name=None, preview="Some preview text", used_in="docs/a.md"):
    name = block_id if name is None else name
    include = f'{{% include "https://app.gitbook.com/s/{SPACE}/~/reusable/{block_id}/" %}}'
    return f"| `{block_id}` | {name} | `{SPACE}` | `{include}` | {preview} | {used_in} |"


ROWS = [
    row("KbKP88R2IFii1k97togq", "agent-search-endpoint"),
    row("1MYzyKWyHTaQMU44vlTt", "ai-how-to"),
    row("6vuTxJwns2nA8U7V56ij", "ai-tools"),
]


def index(rows=None, header=HEADER, preamble="# Reusable content index\n\n"):
    rows = ROWS if rows is None else rows
    return preamble + header + "\n" + "\n".join(rows) + "\n"


checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def verdict(base, head):
    return cri.evaluate(base, head)["verdict"]


def main():
    base = index()

    # --- the shapes that must merge ---
    check("a new block merges",
          verdict(base, index(ROWS + [row("PlbR0ntmBBE0DgjKiavq", "app-unauthorized")]))
          == "merge")
    check("an edited preview merges",
          verdict(base, index([row("KbKP88R2IFii1k97togq", "agent-search-endpoint",
                                   preview="Edited preview")] + ROWS[1:])) == "merge")
    check("an edited used-in list merges",
          verdict(base, index([row("KbKP88R2IFii1k97togq", "agent-search-endpoint",
                                   used_in="docs/a.md, docs/b.md")] + ROWS[1:]))
          == "merge")

    # The Preview column is free text from GitBook and regularly contains unescaped
    # pipes (12 of 110 live rows do), so rows cannot be split into a fixed cell count.
    piped = row("KbKP88R2IFii1k97togq", "agent-search-endpoint",
                preview="{% tabs %} a | b | c {% endtabs %}")
    check("a preview containing pipes still parses",
          verdict(base, index([piped] + ROWS[1:])) == "merge")

    # --- no-ops are not merges ---
    check("an identical index does not merge", verdict(base, base) == "escalate")

    # --- the DOC-2183 / PR #5154 corruption signature ---
    # A transient GitBook API miss produced a row named after its own block ID with an
    # empty preview. That PR sat open 20 days and would have degraded the index.
    check("a row named after its own block ID escalates",
          verdict(base, index([row("Yl56nEscwQQAbBUeWfvp")] + ROWS[1:])) == "escalate")
    check("an empty preview escalates",
          verdict(base, index([row("KbKP88R2IFii1k97togq", "agent-search-endpoint",
                                   preview="  ")] + ROWS[1:])) == "escalate")
    check("an empty name escalates",
          verdict(base, index([row("KbKP88R2IFii1k97togq", "")] + ROWS[1:])) == "escalate")
    check("an include snippet that is not an include escalates",
          verdict(base, index([
              f"| `KbKP88R2IFii1k97togq` | agent-search-endpoint | `{SPACE}` | `nope` "
              f"| preview | docs/a.md |"] + ROWS[1:])) == "escalate")

    # --- structural corruption escalates ---
    check("a missing header escalates", verdict(base, "\n".join(ROWS)) == "escalate")
    check("a malformed row escalates",
          verdict(base, index(ROWS + ["| not a real row |"])) == "escalate")
    check("a row missing the used-in column escalates",
          verdict(base, index([
              f"| `KbKP88R2IFii1k97togq` | agent-search-endpoint | `{SPACE}` "
              f"| `{{% include \"x\" %}}` |"] + ROWS[1:])) == "escalate")
    check("an empty table escalates", verdict(base, index(rows=[])) == "escalate")
    check("empty text escalates", verdict(base, "") == "escalate")
    check("a duplicate block ID escalates",
          verdict(base, index(ROWS + [ROWS[0]])) == "escalate")

    # --- the collapse guard ---
    many = [row(f"BLOCK{i:015d}", f"name-{i}") for i in range(20)]
    check("losing more than half the blocks escalates",
          verdict(index(many), index(many[:9])) == "escalate")
    check("losing a few blocks is allowed",
          verdict(index(many), index(many[:15])) == "merge")

    # --- an unparseable base cannot be compared against ---
    check("an unreadable base escalates",
          verdict("not a table at all", index()) == "escalate")

    # --- header and separator must be exact, not prefix-matched ---
    check("a renamed column escalates",
          verdict(base, index(header="| ID | Name | Parent space | Include snippet "
                                     "| Preview | Banana |\n|---|---|---|---|---|---|"))
          == "escalate")
    check("a missing header column escalates",
          verdict(base, index(header="| ID | Name | Parent space | Include snippet "
                                     "| Preview |\n|---|---|---|---|---|")) == "escalate")
    check("a pipes-only separator escalates",
          verdict(base, index(header=HEADER.split("\n")[0] + "\n|||||||")) == "escalate")
    # A stray table further down the file must not contribute rows.
    check("rows stop at the first non-table line",
          verdict(base, index() + "\nsome prose\n\n| junk |\n") == "merge")

    # --- collapse-guard boundary ---
    check("exactly half the blocks surviving still merges",
          verdict(index(many), index(many[:10])) == "merge")
    check("one below half escalates",
          verdict(index(many), index(many[:9])) == "escalate")

    # --- the real file in this repo still parses cleanly ---
    live = (REPO_ROOT / "REUSABLE_CONTENT_INDEX.md").read_text(encoding="utf-8")
    rows, err = cri.parse_table(live)
    check("the live REUSABLE_CONTENT_INDEX.md parses", err is None and len(rows) > 0)
    check("no live row is degraded", cri.degraded_rows(rows) == [])


if __name__ == "__main__":
    main()
    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(("PASS" if ok else "FAIL"), "-", n)
    print("=" * 70)
    print(f"{len(checks) - len(failed)}/{len(checks)} passed")
    raise SystemExit(1 if failed else 0)
