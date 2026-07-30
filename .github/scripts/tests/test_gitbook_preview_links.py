#!/usr/bin/env python3
"""Network-free tests for gitbook_preview_links.py, run against a checked-in
fake repo tree under tests/fixtures/repo. Locks in path->URL mapping, SUMMARY
membership, per-space revisions, title extraction, reusable resolution
(basename + heading), the fan-out cap, and non-page classification.

Run: python3 .github/scripts/tests/test_gitbook_preview_links.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "gitbook_preview_links.py"
FIXTURE_REPO = HERE / "fixtures" / "repo"

spec = importlib.util.spec_from_file_location("gb", SCRIPT)
gb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gb)
gb.REPO = FIXTURE_REPO  # functions read the module global at call time

STATUS = {"statuses": [
    {"context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
     "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
    {"context": "GitBook (./docs/spacea)", "state": "success",
     "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
    {"context": "GitBook (./docs/spaceb) - docs.n8n.io/spaceb/", "state": "success",
     "target_url": "https://docs.n8n.io/spaceb/~/revisions/REVB/"},
    {"context": "GitBook (./docs/spaceb)", "state": "success",
     "target_url": "https://app.gitbook.com/s/SB/~/diff/~/revisions/REVB/"},
    {"context": "GitBook (./docs/reusable-content)", "state": "success",
     "target_url": "https://app.gitbook.com/s/RS/~/diff/~/revisions/RREV/"},
    # A non-GitBook and a still-pending status must be ignored:
    {"context": "cubic", "state": "success", "target_url": "https://x"},
    {"context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "pending",
     "target_url": "https://docs.n8n.io/spacea/~/revisions/OLD/"},
]}

CHANGED = [
    {"status": "modified", "filename": "docs/spacea/README.md"},
    {"status": "modified", "filename": "docs/spacea/page-one.md"},
    {"status": "added", "filename": "docs/spacea/sub/page-two.md"},
    {"status": "modified", "filename": "docs/spacea/orphan.md"},      # not in SUMMARY
    {"status": "modified", "filename": "docs/spacea/SUMMARY.md"},     # nav
    {"status": "modified", "filename": "docs/spaceb/other.md"},
    {"status": "modified", "filename": "docs/spacea/.gitbook/assets/x.png"},  # asset
    {"status": "removed", "filename": "docs/spacea/deleted.md"},      # gone
    {"status": "modified", "filename": "docs/reusable-content/.gitbook/includes/block-one.md"},
    {"status": "modified", "filename": "docs/reusable-content/.gitbook/includes/tricky.md"},
]

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def main():
    spaces = gb.load_spaces(STATUS)
    check("only successful GitBook spaces loaded", set(spaces) == {"spacea", "spaceb", "reusable-content"})
    check("pending status ignored (REVA not OLD)", "OLD" not in spaces["spacea"]["live_base"])

    out = gb.render(CHANGED, spaces, gb.load_reusable_index())
    print(out)
    print("=" * 70)

    # section grouping + per-space revisions
    check("spacea section", "### spacea" in out)
    check("spaceb section", "### spaceb" in out)
    check("spacea uses REVA", "/spacea/~/revisions/REVA/" in out)
    check("spaceb uses REVB (distinct per-space revision)", "/spaceb/~/revisions/REVB/" in out)

    # titles + slugs
    check("page-one title from frontmatter",
          "[Page one](https://docs.n8n.io/spacea/~/revisions/REVA/page-one)" in out)
    check("page-two title from H1 (anchor stripped)",
          "[Page two heading](https://docs.n8n.io/spacea/~/revisions/REVA/sub/page-two)" in out)
    check("README maps to space home",
          "[Space A home](https://docs.n8n.io/spacea/~/revisions/REVA/)" in out and "`(home)`" in out)
    check("spaceb other page linked",
          "[Other page](https://docs.n8n.io/spaceb/~/revisions/REVB/other)" in out)

    # reusable: basename match + cap, heading-fallback match, diff link
    check("reusable section", "### Reusable content" in out)
    check("block-one resolved by basename to 12 pages", "renders on 12 page(s)" in out)
    check("reusable cap at 10 + remainder", "Show 10 of 12 pages" in out and "…and 2 more" in out)
    check("reusable pages use LIVE production URLs",
          "(https://docs.n8n.io/spacea/bulk/p01)" in out)
    check("tricky resolved via H2 heading fallback", "**`tricky`** — renders on 1 page(s)" in out)
    check("reusable diff link uses reusable-content editor revision",
          "app.gitbook.com/s/RS/~/diff/~/revisions/RREV/" in out)
    check("no unresolved reusable", "couldn't be mapped" not in out)

    # non-pages: orphan + SUMMARY + asset; NOT the removed file
    check("orphan (unlisted) is a non-page", "orphan.md" in out and "aren't standalone pages" in out)
    check("SUMMARY.md is a non-page", "SUMMARY.md" in out)
    check("asset is a non-page", "x.png" in out)
    check("removed file never appears", "deleted.md" not in out)

    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(f"  {'PASS' if ok else 'FAIL'}  {n}")
    if failed:
        print(f"\n{len(failed)} FAILED")
        return 1
    print(f"\nAll {len(checks)} checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
