#!/usr/bin/env python3
"""Network-free tests for check_space_index_pr.py.

Table-driven, no pytest, same harness as the sibling script tests.

Run: python3 .github/scripts/tests/test_check_space_index_pr.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "check_space_index_pr.py"
REPO_ROOT = HERE.parents[2]

spec = importlib.util.spec_from_file_location("csi", SCRIPT)
csi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(csi)

HEADER_4 = ("| Folder | Space ID | Title | Visibility |\n"
            "|--------|----------|-------|------------|")
HEADER_5 = ("| Folder | Space ID | Title | Visibility | Last synced |\n"
            "|--------|----------|-------|------------|-------------|")

# Real folders, so the docs_root existence check passes where it is exercised.
ROWS_4 = [
    "| `build` | `rPN1zU5jaYNvwH7RzxqA` | Build | public |",
    "| `deploy` | `jm0ZYRpZIPWge2ZSiDYO` | Deploy | public |",
    "| `integrations` | `BKcbOzIWja8NfqKDcqHc` | Integrations (Nodes) | public |",
]
ROWS_5 = [r + " 2026-10-13 |" for r in ROWS_4]


def index(header=HEADER_4, rows=None, preamble="# Space index\n\n"):
    rows = ROWS_4 if rows is None else rows
    return preamble + header + "\n" + "\n".join(rows) + "\n"


checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def verdict(base, head, docs_root=None):
    return csi.evaluate(base, head, docs_root)["verdict"]


def main():
    base4 = index()
    base5 = index(HEADER_5, ROWS_5)

    # --- the shapes that must merge ---
    changed = index(rows=ROWS_4[:2] + [
        "| `connect` | `r7wKI4I1BgdBCuq5Cvcx` | Connect | public |"])
    check("a real space change merges", verdict(base4, changed) == "merge")
    check("the 5-column shape still parses (pre-DOC-2461)",
          verdict(base5, index(HEADER_5, [r.replace("2026-10-13", "2026-10-14")
                                          for r in ROWS_5])) == "merge")
    check("dropping the Last synced column merges",
          verdict(base5, base4) == "merge")
    check("folders that really exist pass the docs/ check",
          verdict(base4, changed, REPO_ROOT / "docs") == "merge")

    # --- no-ops are not merges ---
    check("an identical index does not merge", verdict(base4, base4) == "escalate")

    # --- structural corruption escalates ---
    check("a truncated table escalates",
          verdict(base4, index(rows=ROWS_4[:1])) == "escalate")
    check("a missing header escalates",
          verdict(base4, "\n".join(ROWS_4)) == "escalate")
    check("a mangled space ID escalates",
          verdict(base4, index(rows=[ROWS_4[0].replace("rPN1zU5jaYNvwH7RzxqA", "SHORT")]
                               + ROWS_4[1:])) == "escalate")
    check("a short space ID escalates",
          verdict(base4, index(rows=[ROWS_4[0].replace("rPN1zU5jaYNvwH7RzxqA",
                                                       "rPN1zU5jaYNvwH7Rzxq")]
                               + ROWS_4[1:])) == "escalate")
    check("an unknown visibility escalates",
          verdict(base4, index(rows=[ROWS_4[0].replace("public", "banana")]
                               + ROWS_4[1:])) == "escalate")
    check("an empty title escalates",
          verdict(base4, index(rows=["| `build` | `rPN1zU5jaYNvwH7RzxqA` |  | public |"]
                               + ROWS_4[1:])) == "escalate")
    check("a row with more cells than the header escalates",
          verdict(base4, index(rows=[ROWS_4[0] + " extra |"] + ROWS_4[1:]))
          == "escalate")
    check("an empty table escalates", verdict(base4, index(rows=[])) == "escalate")
    check("empty text escalates", verdict(base4, "") == "escalate")

    # --- integrity of the set of rows ---
    check("a duplicate folder escalates",
          verdict(base4, index(rows=ROWS_4 + [ROWS_4[0]])) == "escalate")
    check("a duplicate space ID escalates",
          verdict(base4, index(rows=ROWS_4 + [
              "| `connect` | `rPN1zU5jaYNvwH7RzxqA` | Connect | public |"]))
          == "escalate")
    check("a folder missing from docs/ escalates",
          verdict(base4, index(rows=ROWS_4 + [
              "| `not-a-real-space` | `AAAAAAAAAAAAAAAAAAAA` | Nope | public |"]),
              REPO_ROOT / "docs") == "escalate")

    # --- the collapse guard ---
    many = [f"| `s{i:02d}` | `{'A' * 18}{i:02d}` | S{i} | public |" for i in range(20)]
    check("losing more than half the spaces escalates",
          verdict(index(rows=many), index(rows=many[:9])) == "escalate")
    check("losing a few spaces is allowed",
          verdict(index(rows=many), index(rows=many[:15])) == "merge")

    # --- an unparseable base cannot be compared against ---
    check("an unreadable base escalates",
          verdict("not a table at all", index(rows=ROWS_4)) == "escalate")

    # --- header and separator must be exact, not prefix-matched ---
    check("a renamed column escalates",
          verdict(base4, index(header="| Folder | Space ID | Title | Banana |\n"
                                      "|---|---|---|---|")) == "escalate")
    check("an extra header column escalates",
          verdict(base4, index(header="| Folder | Space ID | Title | Visibility | X |\n"
                                      "|---|---|---|---|---|")) == "escalate")
    check("a pipes-only separator escalates",
          verdict(base4, index(header=HEADER_4.split("\n")[0] + "\n||||||")) == "escalate")
    check("a separator with the wrong cell count escalates",
          verdict(base4, index(header=HEADER_4.split("\n")[0] + "\n|---|---|")) == "escalate")
    # A row below the table is NOT ignorable: check_internal_links.load_space_ids
    # scans every line in the file, so it would feed link resolution unvalidated.
    check("a stray row below the table escalates",
          verdict(base4, index() + "\nsome prose\n\n| `build` | `rPN1zU5jaYNvwH7RzxqA` | B | public |\n")
          == "escalate")
    check("a stray row with a short space ID escalates",
          verdict(base4, index() + "\n\n| `x` | `SHORT` | z | public |\n") == "escalate")
    check("prose below the table is fine",
          verdict(base4, index(rows=ROWS_4[:2]) + "\nsome closing prose\n") == "merge")

    # --- collapse-guard boundary ---
    half = [f"| `h{i:02d}` | `{'B' * 18}{i:02d}` | H{i} | public |" for i in range(20)]
    check("exactly half the spaces surviving still merges",
          verdict(index(rows=half), index(rows=half[:10])) == "merge")
    check("one below half escalates",
          verdict(index(rows=half), index(rows=half[:9])) == "escalate")

    # --- the real file in this repo still parses ---
    rows, err = csi.parse_table((REPO_ROOT / "SPACE_INDEX.md").read_text(encoding="utf-8"))
    check("the live SPACE_INDEX.md parses", err is None and len(rows) > 0)
    check("every live space folder exists under docs/",
          all((REPO_ROOT / "docs" / f).is_dir() for f, _, _ in rows))


if __name__ == "__main__":
    main()
    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(("PASS" if ok else "FAIL"), "-", n)
    print("=" * 70)
    print(f"{len(checks) - len(failed)}/{len(checks)} passed")
    raise SystemExit(1 if failed else 0)
