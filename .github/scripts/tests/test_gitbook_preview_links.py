#!/usr/bin/env python3
"""Network-free tests for gitbook_preview_links.py, run against a checked-in
fake repo tree under tests/fixtures/repo. Locks in path->URL mapping, SUMMARY
membership, per-space revisions, title extraction, reusable resolution
(basename + heading), the fan-out cap, and non-page classification.

Run: python3 .github/scripts/tests/test_gitbook_preview_links.py
"""
import importlib.util
import sys
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

    # Regression (DOC-2352): a page in a FAILED space used to fall through to
    # the "aren't in the nav" footnote, blaming the author for a SUMMARY entry
    # that was never broken. It must be reported as a failed build instead.
    fail_spaces = gb.failed_spaces(fail_status, gb.load_spaces(fail_status), set())
    check("failed space detected", fail_spaces == {"spacea"})
    out_fail = gb.render([{"status": "modified", "filename": "docs/spacea/page-one.md"}],
                         {}, gb.load_reusable_index(), set(), fail_spaces)
    check("page in a failed space blames the build, not the nav",
          "couldn't build the preview for `spacea`" in out_fail
          and "aren't in the nav" not in out_fail)

    check("failed note doesn't promise an update that isn't coming",
          "still building" not in out_fail)

    # The all-failed emission decision lives in main()'s guard, not in render(),
    # so exercise the real entry point: drop `not failed` from that guard and
    # main() prints nothing, has_body stays unset, the upsert is skipped, and a
    # stale comment survives. A render()-only check can't catch that.
    def run_main(changed, statuses):
        import contextlib, io, json, tempfile
        with tempfile.TemporaryDirectory() as d:
            cf, sf = Path(d) / "c.json", Path(d) / "s.json"
            cf.write_text(json.dumps(changed), encoding="utf-8")
            sf.write_text(json.dumps(statuses), encoding="utf-8")
            buf = io.StringIO()
            argv = sys.argv
            sys.argv = ["gitbook_preview_links.py", str(cf), str(sf)]
            try:
                with contextlib.redirect_stdout(buf):
                    rc = gb.main()
            finally:
                sys.argv = argv
            return rc, buf.getvalue()

    rc, body = run_main([{"status": "modified", "filename": "docs/spacea/page-one.md"}],
                        fail_status["statuses"])
    check("main() exits 0 on an all-failed build", rc == 0)
    check("main() emits a body for an all-failed build so the upsert runs",
          body.strip() != "" and "couldn't build the preview" in body)

    # And the opposite: no GitBook statuses at all must stay silent, or we'd
    # post preview comments on PRs that have no preview.
    rc_q, body_q = run_main([{"status": "modified", "filename": "docs/spacea/page-one.md"}],
                            [{"id": 1, "context": "cubic", "state": "failure"}])
    check("main() stays silent when there's no GitBook build at all",
          rc_q == 0 and body_q == "")

    # Regression: an editor-only success (live context FAILED) left a space
    # record with no `live_base`. render() treated it as linkable and
    # deep_link() blew up with KeyError, taking the whole run down instead of
    # reporting the failed build.
    editor_only = [
        {"id": 20, "context": "GitBook (./docs/spacea)", "state": "success",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
        {"id": 10, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "failure",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
    ]
    eo_spaces = gb.load_spaces(editor_only)
    check("editor-only success isn't linkable", gb.linkable_spaces(eo_spaces) == set())
    eo_failed = gb.failed_spaces(editor_only, gb.linkable_spaces(eo_spaces), set())
    check("editor-only success counts as a failed space", eo_failed == {"spacea"})
    rc_eo, body_eo = run_main([{"status": "modified", "filename": "docs/spacea/page-one.md"}],
                              editor_only)
    check("editor-only success renders the failure note instead of crashing",
          rc_eo == 0 and "couldn't build the preview" in body_eo)

    # A space that failed but ALSO has a successful context isn't "failed":
    # the successful build is what we link, so it must not be double-reported.
    mixed = [
        {"id": 20, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
        {"id": 10, "context": "GitBook (./docs/spacea)", "state": "failure",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
    ]
    mixed_spaces = gb.load_spaces(mixed)
    check("a space with one good context isn't reported as failed",
          gb.failed_spaces(mixed, mixed_spaces, set()) == set())

    # Likewise a space still building somewhere else shouldn't be called failed.
    building = [
        {"id": 20, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "pending",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
        {"id": 10, "context": "GitBook (./docs/spacea)", "state": "failure",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
    ]
    b_spaces = gb.load_spaces(building)
    b_pending = gb.gitbook_spaces(building) - set(b_spaces)
    check("pending beats failed for the same space",
          gb.failed_spaces(building, b_spaces, b_pending) == set())

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

    # Regression (DOC-2350): the workflow now feeds the full status HISTORY
    # (`/commits/:sha/statuses`, newest first) instead of the collapsed
    # `/status`. GitBook posted #5461's `success` and `pending` in the same
    # second with `success` FIRST, so latest-row-wins read a finished build as
    # pending forever. Collapsing must treat pending as a non-verdict.
    ooo_status = [
        {"id": 884, "context": "GitBook (./docs/spacea)", "state": "pending",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
        {"id": 797, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "pending",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
        {"id": 428, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/REVA/"},
        {"id": 167, "context": "GitBook (./docs/spacea)", "state": "success",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/REVA/"},
    ]
    ooo_spaces = gb.load_spaces(ooo_status)
    check("success posted before pending still counts as built",
          set(ooo_spaces) == {"spacea"})
    check("out-of-order build isn't reported as still pending",
          gb.gitbook_spaces(ooo_status) - set(ooo_spaces) == set())
    out_ooo = gb.render([{"status": "modified", "filename": "docs/spacea/page-one.md"}],
                        ooo_spaces, gb.load_reusable_index())
    check("out-of-order build renders a real link, not the building note",
          "https://docs.n8n.io/spacea/~/revisions/REVA/page-one" in out_ooo
          and "still building" not in out_ooo)

    # Ordering comes from the status id, not the position in the array.
    shuffled = list(reversed(ooo_status))
    check("id ordering beats array order", gb.load_spaces(shuffled) == ooo_spaces)

    # History keeps every row, so pending->failure now arrives with the pending
    # row still present. Failure is terminal, so the space must not look pending.
    pend_then_fail = [
        {"id": 20, "context": "GitBook (./docs/spacea)", "state": "failure",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/X/"},
        {"id": 10, "context": "GitBook (./docs/spacea)", "state": "pending",
         "target_url": "https://app.gitbook.com/s/SA/~/diff/~/revisions/X/"},
    ]
    check("pending in history doesn't resurrect a failed build",
          gb.gitbook_spaces(pend_then_fail) == set())

    # A rebuild that regressed: the newest terminal row wins, so we don't link a
    # revision GitBook has since failed on.
    succ_then_fail = [
        {"id": 20, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "failure",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/NEW/"},
        {"id": 10, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/OLD/"},
    ]
    check("later failure supersedes an earlier success", gb.load_spaces(succ_then_fail) == {})

    # `error` is terminal too, not just success/failure.
    succ_then_error = [
        {"id": 20, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "error",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/NEW/"},
        {"id": 10, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/OLD/"},
    ]
    check("later error supersedes an earlier success", gb.load_spaces(succ_then_error) == {})
    check("errored build not counted as pending", gb.gitbook_spaces(succ_then_error) == set())

    # Two successful builds of the same sha: the newest revision wins.
    two_success = [
        {"id": 20, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/NEW/"},
        {"id": 10, "context": "GitBook (./docs/spacea) - docs.n8n.io/spacea/", "state": "success",
         "target_url": "https://docs.n8n.io/spacea/~/revisions/OLD/"},
    ]
    check("newest success revision wins over an older one",
          "NEW" in gb.load_spaces(two_success)["spacea"]["live_base"])

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
