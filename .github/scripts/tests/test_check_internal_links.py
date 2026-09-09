#!/usr/bin/env python3
"""Network-free tests for check_internal_links.py, run against a checked-in fake
repo tree under tests/fixtures/links. Locks in all five link rules (same-space
absolute, cross-space relative, cross-space broken, .md extension, target
exists), asset and absolute-path handling, and the parsing helpers that decide
what counts as a link at all.

Also asserts that the space-ID table still parses out of the real style guide.
That table is scraped from Markdown with a regex, so reformatting it would
silently empty the map and make every cross-space link unverifiable while the
job still exits 0 -- the one failure mode this checker can't self-report.

Run: python3 .github/scripts/tests/test_check_internal_links.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "check_internal_links.py"
FIXTURE_REPO = HERE / "fixtures" / "links"

spec = importlib.util.spec_from_file_location("cil", SCRIPT)
cil = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cil)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def classify(src_rel, target):
    """Run classify() for a link written in fixture file `src_rel`."""
    return cil.classify(FIXTURE_REPO / src_rel, src_rel, target)


def category(src_rel, target):
    result = classify(src_rel, target)
    return result[0] if result else None


def main():
    # --- Real style guide: the space table must still parse -------------------
    # Run before the fixture overrides below, while the module still points at
    # the real repo.
    real_spaces = cil.load_space_ids()
    check("space-ID table parses out of the real style guide", len(real_spaces) == 9)
    check("space table maps integrations", real_spaces.get("BKcbOzIWja8NfqKDcqHc") == "integrations")
    check("space table maps deploy", real_spaces.get("jm0ZYRpZIPWge2ZSiDYO") == "deploy")

    # --- Point the module at the fixture tree ---------------------------------
    # Functions read these globals at call time.
    cil.REPO_ROOT = FIXTURE_REPO
    cil.DOCS_ROOT = FIXTURE_REPO / "docs"
    cil.SPACE_ID_TO_FOLDER = {"SA": "spacea", "SB": "spaceb"}

    A = "docs/spacea/page-one.md"          # a page in space A
    A_SUB = "docs/spacea/sub/page-two.md"  # a page one level deeper

    # --- Rule 4 (new): app.gitbook.com URL into the page's own space ----------
    check("same-space app.gitbook.com link is flagged",
          category(A, "https://app.gitbook.com/s/SA/sub/page-two") == "same-space-absolute")
    check("same-space flagged even when the target exists",
          category(A, "https://app.gitbook.com/s/SA/README") == "same-space-absolute")
    check("same-space flagged from a nested page",
          category(A_SUB, "https://app.gitbook.com/s/SA/page-one") == "same-space-absolute")
    check("same-space flagged with an anchor",
          category(A, "https://app.gitbook.com/s/SA/page-one#some-heading") == "same-space-absolute")
    same_space = classify(A, "https://app.gitbook.com/s/SA/page-one")
    check("same-space message names the space and the fix",
          same_space is not None
          and "own space 'spacea'" in same_space[1]
          and "relative .md link" in same_space[1])

    # --- Rule 3: genuine cross-space links still behave -----------------------
    check("valid cross-space link passes",
          category(A, "https://app.gitbook.com/s/SB/other") is None)
    check("broken cross-space link is flagged",
          category(A, "https://app.gitbook.com/s/SB/nope") == "cross-space-broken")
    check("cross-space link to a space root passes",
          category(A, "https://app.gitbook.com/s/SB") is None)
    check("cross-space traversal out of the space is flagged",
          category(A, "https://app.gitbook.com/s/SB/../spacea/page-one") == "cross-space-broken")
    check("unknown space ID is skipped, not flagged",
          category(A, "https://app.gitbook.com/s/UNKNOWN/whatever") is None)
    check("relative link crossing spaces is flagged",
          category(A, "../spaceb/other.md") == "cross-space-relative")

    # --- Rules 1 and 2: extension and existence -------------------------------
    check("same-space relative link passes", category(A, "sub/page-two.md") is None)
    check("relative link up and back down passes", category(A_SUB, "../page-one.md") is None)
    check("link without .md is flagged", category(A, "sub/page-two") == "no-md-extension")
    check("trailing-slash link is flagged", category(A, "sub/") == "no-md-extension")
    check("missing .md target is flagged", category(A, "gone.md") == "missing-target")
    check("absolute path is flagged", category(A, "/spacea/page-one.md") == "absolute-path")

    # --- Assets ---------------------------------------------------------------
    check("existing asset passes", category(A, ".gitbook/assets/img.png") is None)
    check("missing asset is flagged", category(A, ".gitbook/assets/nope.png") == "missing-asset")

    # --- Non-links ------------------------------------------------------------
    check("external URL is ignored", category(A, "https://example.com/page") is None)
    check("mailto is ignored", category(A, "mailto:help@n8n.io") is None)
    check("templating is ignored", category(A, "{{ variable }}") is None)

    # --- Rule 5: anchor validation ------------------------------------------
    cil._REUSABLE_BLOCKS = None   # rebuild the block map against the fixtures
    cil._HEADING_IDS = {}

    check("in-page anchor matching an explicit id passes",
          category(A, "#section-one") is None)
    check("in-page anchor matching nothing is flagged",
          category(A, "#no-such-heading") == "broken-anchor")
    check("cross-file anchor matching an explicit id passes",
          category(A, "sub/page-two.md#target-section") is None)
    check("cross-file anchor matching nothing is flagged",
          category(A, "sub/page-two.md#no-such-heading") == "broken-anchor")
    check("bare '#' with no anchor is its own category",
          category(A, "sub/page-two.md#") == "empty-anchor")
    check("footnote anchors are always accepted",
          category(A, "#user-content-fn-1") is None)
    broken = classify(A, "#no-such-heading")
    check("broken-anchor message names the missing id",
          broken is not None and "no heading with id 'no-such-heading'" in broken[1])

    # Suppression: never assert on what we can't verify.
    check("anchor on a heading with no explicit id is left unchecked",
          category(A, "#plain-heading-with-no-explicit-id") is None)
    check("headings from a resolvable include count",
          category("docs/spacea/with-include.md", "#shared-heading") is None)
    check("a page with an unresolvable include has anchors left unchecked",
          category("docs/spacea/bad-include.md", "#anything-at-all") is None)

    # A missing page is reported as missing, not as a broken anchor.
    check("anchor on a missing target reports the target, not the anchor",
          category(A, "gone.md#whatever") == "missing-target")
    check("cross-space relative wins over anchor checking",
          category(A, "../spaceb/other.md#nope") == "cross-space-relative")

    # --- Include resolution -------------------------------------------------
    check("reusable block index resolves BLOCK1 by name",
          "BLOCK1" in cil.reusable_blocks())
    check("unindexed block stays unresolved",
          "NOTINDEXED" not in cil.reusable_blocks())
    exp, slugs, resolved = cil.heading_ids(FIXTURE_REPO / "docs/spacea/bad-include.md")
    check("unresolvable include sets resolved=False", resolved is False)
    exp2, _, resolved2 = cil.heading_ids(FIXTURE_REPO / "docs/spacea/with-include.md")
    check("resolvable include sets resolved=True and pulls in its ids",
          resolved2 is True and "shared-heading" in exp2)

    # --- Regressions caught in review (cubic on PR #5280) -------------------
    # strip_code() used to delete inline code from heading lines too, so a
    # heading's guessed slug lost its code span and stopped suppressing the
    # matching anchor -- the exact false positive rule 5 exists to avoid.
    check("heading extraction keeps inline code spans",
          cil.strip_code("### Using `$if()` (advanced)", inline=False)
          == "### Using `$if()` (advanced)")
    check("strip_code still drops inline code by default",
          cil.strip_code("text `code` more") == "text  more")
    check("a heading with inline code slugs the same via the pipeline as raw",
          cil.anchor_slug(cil.strip_code("Using `$if()` (advanced)", inline=False))
          == cil.anchor_slug("Using `$if()` (advanced)"))
    check("an anchor on an inline-code heading is suppressed, not flagged",
          category("docs/spacea/code-heading.md", "#using-if-advanced") is None)

    # An unreadable page must be treated as unverifiable, not as "verified with
    # no ids" (which would flag every anchor on it).
    _, _, missing_resolved = cil.heading_ids(FIXTURE_REPO / "docs/spacea/does-not-exist.md")
    check("an unreadable page is marked unresolved", missing_resolved is False)

    check("non-numeric user-content-fn anchors are not waved through",
          category(A, "#user-content-fn-not-a-footnote") == "broken-anchor")
    check("numeric footnote anchors still pass",
          category(A, "#user-content-fn-12") is None)

    # An id= or {% include %} shown as an example inside backticks must not be
    # mistaken for real markup, or it would invent ids and suppress real warnings.
    check("an id= documented inside inline code is not treated as a real anchor",
          category("docs/spacea/documents-markup.md", "#example") == "broken-anchor")
    check("a real heading id on the same page still resolves",
          category("docs/spacea/documents-markup.md", "#real-heading") is None)
    check("an include shown inside inline code doesn't pull in its headings",
          category("docs/spacea/documents-markup.md", "#shared-heading") == "broken-anchor")

    # An <a id> inside backticks on a heading line must not count as that
    # heading's explicit id, or the heading gets neither an id nor a slug and
    # its real anchor is falsely reported broken.
    check("an <a id> in a heading's inline code doesn't suppress its slug",
          category("docs/spacea/id-in-code-heading.md",
                   "#write-to-pin-an-anchor") is None)
    check("and that documented id isn't treated as a real anchor",
          category("docs/spacea/id-in-code-heading.md", "#example") == "broken-anchor")

    check("a block whose index Name is only in frontmatter resolves",
          cil.reusable_blocks().get("BLOCK2") is not None)

    # --- anchor_slug --------------------------------------------------------
    check("anchor_slug lowercases and hyphenates",
          cil.anchor_slug("Section One") == "section-one")
    check("anchor_slug drops backticks and parens",
          cil.anchor_slug("Using `$if()` (advanced)") == "using-if-advanced")
    check("anchor_slug keeps a link's text",
          cil.anchor_slug("See [the guide](x.md)") == "see-the-guide")

    # --- Parsing helpers: what counts as a link -------------------------------
    fenced = "```\n[x](broken.md)\n```\n[y](page-one.md)\n"
    check("links inside fenced code are dropped",
          [t for _, t in cil.iter_targets(cil.strip_code(fenced))] == ["page-one.md"])
    check("links inside inline code are dropped",
          [t for _, t in cil.iter_targets(cil.strip_code("`[x](broken.md)` text"))] == [])
    check("strip_code preserves line numbers",
          cil.strip_code(fenced).count("\n") == fenced.count("\n"))

    card = '<table data-view="cards"><tr><td><a href="no-md-here/">x</a></td></tr></table>\n'
    check("GitBook card-table links are dropped",
          [t for _, t in cil.iter_targets(cil.blank_gitbook_native(card))] == [])
    button = '<a href="no-md-here/" class="button primary">Go</a>\n'
    check("GitBook button links are dropped",
          [t for _, t in cil.iter_targets(cil.blank_gitbook_native(button))] == [])

    check("footnote definitions aren't treated as links",
          [t for _, t in cil.iter_targets("[^1]: some explanatory text\n")] == [])
    check("reference definitions are treated as links",
          [t for _, t in cil.iter_targets("[ref]: page-one.md\n")] == ["page-one.md"])
    check("filenames with parens are captured whole",
          [t for _, t in cil.iter_targets("[x]((node-name).all.md)")] == ["(node-name).all.md"])

    # --- space_of -------------------------------------------------------------
    check("space_of reads the top-level folder", cil.space_of(A) == "spacea")
    check("space_of is None for a file directly under docs/",
          cil.space_of("docs/loose.md") is None)
    check("space_of is None outside docs/", cil.space_of("skills/SKILL.md") is None)

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
