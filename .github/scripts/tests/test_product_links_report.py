#!/usr/bin/env python3
"""Network-free unit tests for product_links_report.py (DOC-2318).

Run: python3 .github/scripts/tests/test_product_links_report.py
"""

import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import product_links_report as plr  # noqa: E402


class TestCleanUrl(unittest.TestCase):
    def test_strips_sentence_punctuation(self):
        self.assertEqual(plr.clean_url("https://docs.n8n.io/code/."),
                         "https://docs.n8n.io/code/")
        self.assertEqual(plr.clean_url("https://docs.n8n.io/code/,"),
                         "https://docs.n8n.io/code/")

    def test_strips_line_continuation_backslash(self):
        # Wrapped string literals in n8n leave a trailing backslash on the URL.
        self.assertEqual(plr.clean_url("https://docs.n8n.io/code/variables/\\"),
                         "https://docs.n8n.io/code/variables/")

    def test_keeps_a_clean_url_intact(self):
        url = "https://docs.n8n.io/integrations/builtin/credentials/slack/"
        self.assertEqual(plr.clean_url(url), url)


class TestSplitUrl(unittest.TestCase):
    def test_path_and_anchor(self):
        self.assertEqual(
            plr.split_url("https://docs.n8n.io/code/variables/#scope"),
            ("code/variables", "scope", True))

    def test_no_fragment(self):
        self.assertEqual(plr.split_url("https://docs.n8n.io/code/variables/"),
                         ("code/variables", "", False))

    def test_bare_hash_is_a_fragment(self):
        self.assertEqual(plr.split_url("https://docs.n8n.io/code/#"),
                         ("code", "", True))

    def test_drops_query_string(self):
        self.assertEqual(plr.split_url("https://docs.n8n.io/code/?utm=x"),
                         ("code", "", False))

    def test_drops_md_twin_suffix(self):
        # GitBook serves a .md twin of every page for LLMs; same source file.
        self.assertEqual(
            plr.split_url("https://docs.n8n.io/integrations/builtin/credentials/slack.md"),
            ("integrations/builtin/credentials/slack", "", False))

    def test_bare_host_is_the_root_page(self):
        self.assertEqual(plr.split_url("https://docs.n8n.io"), ("", "", False))


class TestIsTemplated(unittest.TestCase):
    def test_detects_runtime_interpolation(self):
        self.assertTrue(plr.is_templated("https://docs.n8n.io/${path}"))
        self.assertTrue(plr.is_templated("https://docs.n8n.io/{{ page }}"))

    def test_plain_url_is_not_templated(self):
        self.assertFalse(plr.is_templated("https://docs.n8n.io/code/variables/"))


class TestShouldScan(unittest.TestCase):
    def test_accepts_product_source(self):
        self.assertTrue(plr.should_scan("packages/nodes-base/nodes/Slack/Slack.node.ts"))
        self.assertTrue(plr.should_scan("packages/frontend/editor-ui/src/App.vue"))

    def test_rejects_tests_and_fixtures(self):
        # The first trial run reported a URL that only exists in a test fixture.
        self.assertFalse(plr.should_scan(
            "packages/@n8n/instance-ai/src/tools/__tests__/n8n-docs.tool.test.ts"))
        self.assertFalse(plr.should_scan("packages/cli/src/foo.test.ts"))
        self.assertFalse(plr.should_scan("packages/cli/src/foo.spec.ts"))
        self.assertFalse(plr.should_scan("cypress/e2e/a.ts"))

    def test_rejects_build_output_and_lockfiles(self):
        self.assertFalse(plr.should_scan("packages/cli/dist/index.js"))
        self.assertFalse(plr.should_scan("node_modules/x/index.js"))
        self.assertFalse(plr.should_scan("package-lock.json"))

    def test_rejects_markdown(self):
        # n8n's own markdown is never shown to a user inside the app.
        self.assertFalse(plr.should_scan("packages/cli/README.md"))


class TestResolvePath(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.docs = Path(self.tmp.name)
        (self.docs / "build" / "understand").mkdir(parents=True)
        (self.docs / "build" / "understand" / "creds.md").write_text("# Creds\n")
        (self.docs / "integrations" / "code").mkdir(parents=True)
        (self.docs / "integrations" / "code" / "README.md").write_text("# Code\n")
        (self.docs / plr.ROOT_SPACE).mkdir()
        (self.docs / plr.ROOT_SPACE / "README.md").write_text("# n8n Docs\n")
        (self.docs / plr.ROOT_SPACE / "glossary.md").write_text("# Glossary\n")

    def tearDown(self):
        self.tmp.cleanup()

    def test_resolves_a_page_file(self):
        self.assertEqual(plr.resolve_path("build/understand/creds", self.docs).name,
                         "creds.md")

    def test_resolves_a_folder_readme(self):
        self.assertEqual(plr.resolve_path("integrations/code", self.docs).name,
                         "README.md")

    def test_resolves_through_the_root_space(self):
        # get-started publishes at the site root: docs.n8n.io/glossary.
        self.assertEqual(plr.resolve_path("glossary", self.docs).name, "glossary.md")

    def test_empty_path_is_the_site_home(self):
        self.assertIsNotNone(plr.resolve_path("", self.docs))

    def test_unknown_path_is_unresolved(self):
        self.assertIsNone(plr.resolve_path("code/variables", self.docs))


class TestClassify(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.docs = Path(self.tmp.name)
        (self.docs / "guide").mkdir(parents=True)
        (self.docs / "guide" / "page.md").write_text(
            '# Title\n\n## Python native <a id="python-native"></a>\n\nBody\n')
        (self.docs / plr.ROOT_SPACE).mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def test_good_link_is_ok(self):
        kind, _ = plr.classify("https://docs.n8n.io/guide/page/", self.docs)
        self.assertEqual(kind, "ok")

    def test_matching_anchor_is_ok(self):
        kind, _ = plr.classify("https://docs.n8n.io/guide/page/#python-native", self.docs)
        self.assertEqual(kind, "ok")

    def test_anchor_matching_a_plain_heading_slug_is_ok(self):
        # Most headings carry an explicit id, but not all. When only the
        # derived slug matches we stay quiet rather than guess, so a
        # regression in heading_ids slug handling must not pass unnoticed.
        (self.docs / "guide" / "plain.md").write_text(
            "# Title\n\n## Set up queue mode\n\nBody\n")
        kind, _ = plr.classify(
            "https://docs.n8n.io/guide/plain/#set-up-queue-mode", self.docs)
        self.assertEqual(kind, "ok")

    def test_broken_anchor_is_reported_with_a_hint(self):
        # The real bug this checker exists for: the page is fine, the anchor is not.
        kind, detail = plr.classify(
            "https://docs.n8n.io/guide/page/#python-native-beta", self.docs)
        self.assertEqual(kind, "broken-anchor")
        self.assertIn("python-native", detail)

    def test_empty_anchor_is_reported(self):
        kind, _ = plr.classify("https://docs.n8n.io/guide/page/#", self.docs)
        self.assertEqual(kind, "empty-anchor")

    def test_missing_page_is_unresolved(self):
        kind, _ = plr.classify("https://docs.n8n.io/old/path/", self.docs)
        self.assertEqual(kind, "unresolved-path")

    def test_templated_url_is_not_checked(self):
        kind, _ = plr.classify("https://docs.n8n.io/${nodeType}/", self.docs)
        self.assertEqual(kind, "templated")

    def test_generated_api_reference_is_exempt(self):
        # The OpenAPI-rendered reference has no .md source to resolve against.
        kind, _ = plr.classify("https://docs.n8n.io/connect/n8n-api/users/", self.docs)
        self.assertEqual(kind, "generated")


class TestCheckAnchorEdgeCases(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.docs = Path(self.tmp.name)
        (self.docs / "guide").mkdir(parents=True)
        (self.docs / "guide" / "page.md").write_text(
            '# Title\n\n'
            '## Step one <a id="1.-create-an-app"></a>\n\n'
            '## Scopes <a id="usingOAuth2"></a>\n')
        (self.docs / plr.ROOT_SPACE).mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def test_gitbook_id_prefix_on_numeric_heading(self):
        # GitBook prefixes an id that would otherwise start with a digit.
        page = self.docs / "guide" / "page.md"
        kind, _ = plr.check_anchor(page, "id-1.-create-an-app")
        self.assertEqual(kind, "ok")

    def test_id_prefix_is_not_a_blanket_escape_hatch(self):
        # `#id-usingOAuth2` is broken even though `#usingOAuth2` exists:
        # GitBook only prefixes slugs that would start with a digit.
        page = self.docs / "guide" / "page.md"
        kind, _ = plr.check_anchor(page, "id-usingOAuth2")
        self.assertEqual(kind, "broken-anchor")

    def test_case_mismatch_is_its_own_verdict(self):
        page = self.docs / "guide" / "page.md"
        kind, detail = plr.check_anchor(page, "usingoauth2")
        self.assertEqual(kind, "case-mismatch")
        self.assertIn("usingOAuth2", detail)


class TestClassifyLive(unittest.TestCase):
    """Pass 2 with a stub resolver: no network in the tests."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.docs = Path(self.tmp.name)
        (self.docs / "changelog").mkdir(parents=True)
        (self.docs / "changelog" / "v20-breaking-changes.md").write_text(
            '# Breaking changes\n\n## Remove the thing <a id="remove-the-thing"></a>\n')
        (self.docs / plr.ROOT_SPACE).mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def stub(self, status, final):
        return lambda url: (status, final)

    def test_404_is_dead(self):
        kind, _, status, _ = plr.classify_live(
            "https://docs.n8n.io/gone/",
            self.stub(404, "https://docs.n8n.io/gone/"), self.docs)
        self.assertEqual(kind, "dead")
        self.assertEqual(status, 404)

    def test_redirect_to_a_live_page_with_a_good_anchor(self):
        kind, detail, _, _ = plr.classify_live(
            "https://docs.n8n.io/2-0-breaking-changes/#remove-the-thing",
            self.stub(200, "https://docs.n8n.io/changelog/v20-breaking-changes"),
            self.docs)
        self.assertEqual(kind, "redirect-reliant")
        self.assertIn("changelog/v20-breaking-changes", detail)

    def test_dead_anchor_behind_a_200_redirect(self):
        # The case a status check cannot see: page 200s, fragment is dead.
        kind, _, status, _ = plr.classify_live(
            "https://docs.n8n.io/2-0-breaking-changes/#remove-queue_worker_max_stalled_count",
            self.stub(200, "https://docs.n8n.io/changelog/v20-breaking-changes"),
            self.docs)
        self.assertEqual(kind, "broken-anchor")
        self.assertEqual(status, 200)

    def test_live_page_with_no_markdown_is_unverifiable(self):
        kind, _, _, _ = plr.classify_live(
            "https://docs.n8n.io/ui-authored/#x",
            self.stub(200, "https://docs.n8n.io/ui-authored"), self.docs)
        self.assertEqual(kind, "no-source-file")

    def test_403_is_blocked_not_dead(self):
        kind, _, _, _ = plr.classify_live(
            "https://docs.n8n.io/x/", self.stub(403, "https://docs.n8n.io/x/"),
            self.docs)
        self.assertEqual(kind, "blocked")

    def test_unreachable_is_error(self):
        kind, _, _, _ = plr.classify_live(
            "https://docs.n8n.io/x/", self.stub(None, "https://docs.n8n.io/x/"),
            self.docs)
        self.assertEqual(kind, "error")


class TestScan(unittest.TestCase):
    def test_collects_occurrences_and_skips_tests(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp)
            (src / "packages" / "cli" / "src").mkdir(parents=True)
            (src / "packages" / "cli" / "src" / "a.ts").write_text(
                "const a = 'https://docs.n8n.io/old/one/';\n"
                "const b = 'https://docs.n8n.io/old/one/';\n")
            (src / "packages" / "cli" / "__tests__").mkdir(parents=True)
            (src / "packages" / "cli" / "__tests__" / "b.ts").write_text(
                "const c = 'https://docs.n8n.io/fixture-only/';\n")
            findings, totals = plr.scan(src, live=False)
        self.assertEqual(totals["unique_urls"], 1)
        self.assertEqual(totals["occurrences"], 2)
        self.assertEqual(findings[0]["occurrences"], 2)
        self.assertEqual(findings[0]["locations"][0], "packages/cli/src/a.ts:1")

    def test_extracts_the_fragment_and_cleans_the_url(self):
        # Guards URL_RE and clean_url end to end: a regression there could
        # drop every anchor while the helper tests still pass.
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp)
            (src / "pkg").mkdir(parents=True)
            (src / "pkg" / "a.ts").write_text(
                "throw new Error('see https://docs.n8n.io/old/page/#some-anchor.');\n")
            findings, totals = plr.scan(src, live=False)
        self.assertEqual(totals["unique_urls"], 1)
        self.assertEqual(findings[0]["url"],
                         "https://docs.n8n.io/old/page/#some-anchor")
        self.assertEqual(findings[0]["anchor"], "some-anchor")

    def test_query_string_variants_are_one_finding(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp)
            (src / "pkg").mkdir(parents=True)
            (src / "pkg" / "a.ts").write_text(
                "const a = 'https://docs.n8n.io/old/page/';\n"
                "const b = 'https://docs.n8n.io/old/page/?utm_source=app';\n")
            findings, totals = plr.scan(src, live=False)
        self.assertEqual(totals["unique_urls"], 1)
        self.assertEqual(findings[0]["occurrences"], 2)

    def test_generated_pages_are_live_checked_not_assumed_fine(self):
        # A GitBook-generated page has no markdown to resolve against, so the
        # live status is the only verdict it can ever get.
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp)
            (src / "pkg").mkdir(parents=True)
            (src / "pkg" / "a.ts").write_text(
                "const a = 'https://docs.n8n.io/connect/n8n-api/users/';\n")
            findings, totals = plr.scan(src, live=True,
                                        resolver=lambda u: (404, u))
        self.assertEqual(totals["dead"], 1)
        self.assertEqual(findings[0]["kind"], "dead")

    def test_live_pass_upgrades_unresolved_paths(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp)
            (src / "pkg").mkdir(parents=True)
            (src / "pkg" / "a.ts").write_text(
                "const a = 'https://docs.n8n.io/gone/';\n")
            findings, totals = plr.scan(src, live=True,
                                        resolver=lambda u: (404, u))
        self.assertEqual(totals["dead"], 1)
        self.assertEqual(totals["unresolved_path"], 0)
        self.assertEqual(findings[0]["kind"], "dead")
        self.assertEqual(findings[0]["http_status"], 404)


class TestBuildPayload(unittest.TestCase):
    def test_orders_broken_anchors_first(self):
        findings = [
            {"url": "u1", "kind": "unresolved-path", "occurrences": 9, "detail": ""},
            {"url": "u2", "kind": "broken-anchor", "occurrences": 1, "detail": ""},
        ]
        totals = {"files_scanned": 1, "occurrences": 10, "unique_urls": 2, "ok": 0,
                  "broken_anchor": 1, "unresolved_path": 1, "empty_anchor": 0,
                  "templated": 0, "generated": 0}
        payload = plr.build_payload(findings, totals, {"run_id": "7"})
        self.assertEqual(payload["findings"][0]["url"], "u2")
        self.assertEqual(payload["run_id"], "7")
        self.assertFalse(payload["findings_truncated"])

    def test_truncates_past_the_cap(self):
        findings = [{"url": f"u{i}", "kind": "unresolved-path",
                     "occurrences": 1, "detail": ""}
                    for i in range(plr.MAX_FINDINGS + 5)]
        totals = {"files_scanned": 1, "occurrences": 1, "unique_urls": 1, "ok": 0,
                  "broken_anchor": 0, "unresolved_path": 1, "empty_anchor": 0,
                  "templated": 0, "generated": 0}
        payload = plr.build_payload(findings, totals, {})
        self.assertEqual(len(payload["findings"]), plr.MAX_FINDINGS)
        self.assertTrue(payload["findings_truncated"])


class TestDeliveryContract(unittest.TestCase):
    """A run that does not deliver its report must go red.

    The whole point of the job is the alert in n8n. If a missing secret or a
    failed POST could exit 0, the weekly check would look healthy while
    reporting to nobody -- the one failure mode that hides every other one.
    """

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        src = Path(self.tmp.name)
        (src / "pkg").mkdir(parents=True)
        (src / "pkg" / "a.ts").write_text("// no links here\n")
        self.saved = dict(os.environ)
        # Isolate: a real WEBHOOK_URL in the caller's environment must not
        # make this pass.
        for k in ("WEBHOOK_URL", "WEBHOOK_USER", "WEBHOOK_PASSWORD",
                  "GITHUB_STEP_SUMMARY"):
            os.environ.pop(k, None)
        os.environ["N8N_SRC"] = str(src)
        os.environ["SKIP_LIVE"] = "1"

    def tearDown(self):
        os.environ.clear()
        os.environ.update(self.saved)
        self.tmp.cleanup()

    def test_missing_webhook_url_exits_nonzero(self):
        self.assertEqual(plr.main(), 1)

    def test_failed_post_exits_nonzero(self):
        os.environ["WEBHOOK_URL"] = "https://example.invalid/hook"
        original = plr.post

        def boom(*a, **kw):
            raise OSError("connection refused")

        plr.post = boom
        try:
            self.assertEqual(plr.main(), 1)
        finally:
            plr.post = original

    def test_successful_delivery_exits_zero(self):
        os.environ["WEBHOOK_URL"] = "https://example.invalid/hook"
        original = plr.post
        sent = []
        plr.post = lambda url, payload, user, password: sent.append(payload)
        try:
            self.assertEqual(plr.main(), 0)
        finally:
            plr.post = original
        self.assertEqual(len(sent), 1)
        self.assertEqual(sent[0]["source"], "product-links-weekly")

    def test_missing_checkout_exits_nonzero(self):
        os.environ["N8N_SRC"] = str(Path(self.tmp.name) / "does-not-exist")
        os.environ["WEBHOOK_URL"] = "https://example.invalid/hook"
        self.assertEqual(plr.main(), 1)


class TestSummary(unittest.TestCase):
    def test_renders_without_findings(self):
        totals = {"files_scanned": 3, "occurrences": 0, "unique_urls": 0, "ok": 0,
                  "broken_anchor": 0, "unresolved_path": 0, "empty_anchor": 0,
                  "templated": 0, "generated": 0}
        out = plr.summary_markdown(plr.build_payload([], totals, {}))
        self.assertIn("docs.n8n.io links in n8n-io/n8n", out)


if __name__ == "__main__":
    unittest.main(verbosity=2)
