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
    {"status": "modified", "filename": "docs/spacea/custom.md"},         # custom slug
    {"status": "modified", "filename": "docs/spacea/nested/README.md"},  # stale-root url
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
    check("spacea section", "### 📂 spacea" in out)
    check("spaceb section", "### 📂 spaceb" in out)
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
    check("reusable section", "### ♻️ Reusable content" in out)
    check("block-one resolved by basename to 12 pages", "renders on 12 page(s)" in out)
    check("reusable cap at 10 + remainder", "Show 10 of 12 pages" in out and "…and 2 more" in out)
    check("reusable pages use LIVE production URLs",
          "(https://docs.n8n.io/spacea/bulk/p01)" in out)
    check("tricky resolved via H2 heading fallback", "**`tricky`** — renders on 1 page(s)" in out)
    check("reusable diff link uses reusable-content editor revision",
          "app.gitbook.com/s/RS/~/diff/~/revisions/RREV/" in out)
    check("no unresolved reusable", "couldn't be mapped" not in out)

    # non-pages: orphan + SUMMARY + asset; NOT the removed file
    check("orphan (unlisted .md) is flagged as not-in-nav", "orphan.md" in out and "aren't in the nav" in out)
    check("SUMMARY.md file is NOT reported (expected non-page)", "docs/spacea/SUMMARY.md" not in out)
    check("asset is NOT reported (expected non-page)", "x.png" not in out)
    check("removed file never appears", "deleted.md" not in out)

    # Frontmatter `url:` is stale in this repo (pre-migration); URLs must be
    # PATH-derived. These pages carry a misleading `url:` and must ignore it.
    check("stale frontmatter url ignored (custom.md -> path slug)",
          "https://docs.n8n.io/spacea/~/revisions/REVA/custom" in out
          and "real/custom-slug" not in out)
    check("stale space-root url ignored (nested README -> path)",
          "https://docs.n8n.io/spacea/~/revisions/REVA/nested" in out)

    # unit-level checks on the slug/URL helpers (path derivation only)
    check("rel_path custom.md is path-derived", gb.rel_path("docs/spacea/custom.md", "spacea") == "custom")
    check("rel_path nested README -> folder", gb.rel_path("docs/spacea/nested/README.md", "spacea") == "nested")
    check("rel_path space README -> empty", gb.rel_path("docs/spacea/README.md", "spacea") == "")
    check("production_url is path-derived (folder == segment)",
          gb.production_url("docs/spaceb/custom-live.md") == "https://docs.n8n.io/spaceb/custom-live")

    # markdown injection in title is escaped
    check("title markdown escaped (no raw ']( ' breakout)",
          "Weird \\]\\( title \\[x\\]" in out and "[Weird ](" not in out)
    check("md_escape neutralizes link breakout",
          gb.md_escape("a](http://evil) b") == r"a\]\(http://evil\) b")

    # Removed reusable index (workflow deletes it from the checkout): the script
    # must degrade gracefully to an empty index -> reusable changes go unresolved
    # rather than reporting stale affected pages.
    saved = gb.REPO
    try:
        gb.REPO = HERE  # a dir with no REUSABLE_CONTENT_INDEX.md
        empty_idx = gb.load_reusable_index()
        out_no_idx = gb.render(
            [{"status": "modified",
              "filename": "docs/reusable-content/.gitbook/includes/block-one.md"}],
            spaces, empty_idx)
    finally:
        gb.REPO = saved
    check("missing index -> empty mapping", empty_idx == {})
    check("missing index -> reusable unresolved (no stale pages)",
          "couldn't be mapped" in out_no_idx)

    # A page whose space is still BUILDING (pending GitBook status) must be shown
    # as pending, not misreported as a non-page.
    pend_status = {"statuses": [
        {"context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
        {"context": "GitBook (./docs/spacea)", "state": "success",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
        {"context": "GitBook (./docs/spaceb) - docs.n8n.io/spaceb/", "state": "pending",
         "target_url": "https://docs.n8n.io/spaceb/~/revisions/REVB/"},
        {"context": "GitBook (./docs/spaceb)", "state": "pending",
         "target_url": "https://app.gitbook.com/s/SB/~/diff/~/revisions/REVB/"},
    ]}
    pend_spaces = gb.load_spaces(pend_status)
    pend_pending = gb.gitbook_spaces(pend_status) - set(pend_spaces)
    out_pend = gb.render(
        [{"status": "modified", "filename": "docs/spaceb/other.md"}],
        pend_spaces, gb.load_reusable_index(), pend_pending)
    check("pending space detected", pend_pending == {"spaceb"})
    check("page in a building space shown as pending, not non-page",
          "still building the preview for `spaceb`" in out_pend
          and "aren't in the nav" not in out_pend)

    # A FAILED build must not be treated as pending (would promise a never-coming
    # update); the space just isn't available.
    fail_status = {"statuses": [
        {"context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "failure",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/X/"},
        {"context": "GitBook (./docs/spacea)", "state": "failure",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/X/"},
    ]}
    check("failed build not counted as pending", gb.gitbook_spaces(fail_status) == set())

    # All-pending (no space succeeded yet): main() must still be able to render a
    # building note rather than exit empty. Exercise via render with empty spaces.
    out_allpend = gb.render(
        [{"status": "modified", "filename": "docs/spaceb/other.md"}],
        {}, gb.load_reusable_index(), {"spaceb"})
    check("all-pending still yields a building note",
          "still building the preview for `spaceb`" in out_allpend)

    # Regression (DOC-2188): a changed .md file OUTSIDE docs/ (e.g. a skill file
    # or top-level README) has no space. render() must skip it silently, never
    # feeding a None space into in_summary() (which would raise TypeError).
    check("space_of outside docs/ is None", gb.space_of("skills/n8n-docs-author/SKILL.md") is None)
    out_nondocs = gb.render(
        [{"status": "modified", "filename": "skills/n8n-docs-author/SKILL.md"},
         {"status": "modified", "filename": "README.md"},
         {"status": "modified", "filename": "docs/spacea/page-one.md"}],
        spaces, gb.load_reusable_index())
    check("non-docs .md doesn't crash and isn't reported",
          "SKILL.md" not in out_nondocs
          and "README.md" not in out_nondocs
          and "aren't in the nav" not in out_nondocs)
    check("a real docs page alongside it still renders",
          "https://docs.n8n.io/spacea/~/revisions/REVA/page-one" in out_nondocs)

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
