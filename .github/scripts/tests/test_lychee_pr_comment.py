#!/usr/bin/env python3
"""Network-free tests for lychee_pr_comment.py, the external link check PR comment.

The fixture pr-5661.json holds the 15 errors lychee reported on n8n-io/n8n-docs#5661:
14 Google bot-check redirects (one of them "Error (cached)") and one real 404.

Run: python3 .github/scripts/tests/test_lychee_pr_comment.py
"""
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "lychee_pr_comment.py"
FIXTURE = HERE / "fixtures" / "lychee_pr" / "pr-5661.json"

spec = importlib.util.spec_from_file_location("lychee_pr_comment", SCRIPT)
lpc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lpc)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


# --- live_url ---------------------------------------------------------------------
check("live_url: space folder is the URL segment",
      lpc.live_url("docs/integrations/builtin/credentials/halopsa.md")
      == "https://docs.n8n.io/integrations/builtin/credentials/halopsa")
check("live_url: get-started publishes at the site root",
      lpc.live_url("docs/get-started/choose-how-to-use-n8n.md")
      == "https://docs.n8n.io/choose-how-to-use-n8n")
check("live_url: README is the folder URL",
      lpc.live_url("docs/administer/manage-credentials/README.md")
      == "https://docs.n8n.io/administer/manage-credentials")
check("live_url: a space home page", lpc.live_url("docs/build/README.md") == "https://docs.n8n.io/build/")
check("live_url: reusable content has no page of its own",
      lpc.live_url("docs/reusable-content/.gitbook/includes/foo.md") is None)
check("live_url: no URL for a file outside docs/", lpc.live_url("README.md") is None)

# --- short_reason -----------------------------------------------------------------
wall = ("Too many redirects: error following redirect for url (https://www.google.com/sorry/"
        "index?continue=https://docs.cloud.google.com/x&q=abc)")
check("short_reason: google.com/sorry is a bot wall", lpc.short_reason(None, wall) == lpc.GOOGLE_WALL)
check("short_reason: google_abuse token is a bot wall",
      lpc.short_reason(None, "Too many redirects: (https://developers.google.com/x?google_abuse=GOOGLE)")
      == lpc.GOOGLE_WALL)
check("short_reason: status code gets its phrase", lpc.short_reason(404, "Network error: Not Found")
      == "404 Not Found")
check("short_reason: other redirect loops", lpc.short_reason(None, "Too many redirects: (https://a.b/c)")
      == "Too many redirects")
check("short_reason: timeout", lpc.short_reason(None, "Timeout") == "Timed out")
check("short_reason: cached error has no reason of its own", lpc.short_reason(None, "Error (cached)") == "Error")
check("short_reason: quoted URLs are stripped from free text",
      "http" not in lpc.short_reason(None, "Something odd happened (https://x.y/z)"))
check("short_reason: long text is cut", len(lpc.short_reason(None, "x " * 100)) <= 80)

# --- render: the #5661 report ------------------------------------------------------
stats = json.loads(FIXTURE.read_text(encoding="utf-8"))
failures = lpc.flatten_failures(stats)
titles = {"docs/integrations/builtin/credentials/halopsa.md": "HaloPSA credentials",
          "docs/integrations/builtin/credentials/googleai.md": "Google Gemini(PaLM) credentials"}
body = lpc.render(failures, titles, "https://github.com/x/y/actions/runs/1")

check("render: titled, with counts", body.startswith("## 🔗 External link check: 15 broken links on 7 pages"))
check("render: reason breakdown", "14 × Blocked by Google's bot check, 1 × 404 Not Found" in body)
check("render: has a fix hint", "**How to fix:**" in body and "`lychee.toml`" in body)
check("render: no lychee stats table", "Total" not in body and "Excluded" not in body)
check("render: no bot-check tokens leak into the comment",
      "google_abuse" not in body and "google.com/sorry" not in body)
check("render: cached error borrows the first sighting's reason", "Error (cached)" not in body
      and "· Error\n" not in body)
check("render: page heading links the live page",
      "#### [HaloPSA credentials](https://docs.n8n.io/integrations/builtin/credentials/halopsa)" in body)
check("render: titles are escaped", "Google Gemini\\(PaLM\\) credentials" in body)
check("render: missing title falls back to the file name", "#### [googlevertexai](" in body)
check("render: page with a real failure comes first",
      body.index("halopsa.md") < body.index("embeddingsgooglevertex.md"))
check("render: long list is collapsed", "<details><summary>Show the 15 links</summary>" in body)
check("render: links to the run", body.rstrip().endswith("[Full lychee output](https://github.com/x/y/actions/runs/1)"))

# --- render: small and edge cases --------------------------------------------------
one = [{"page": "docs/build/a.md", "url": "https://x.y/a", "status": 404, "message": "Not Found"}]
small = lpc.render(one, {"docs/build/a.md": "A"})
check("render: singular wording", "1 broken link on 1 page" in small)
check("render: short list is not collapsed", "<details>" not in small)
check("render: no run link without RUN_URL", "Full lychee output" not in small)
check("render: autolinks can't be closed by the URL",
      "<https://x.y/a%3Eb>" in lpc.render([{**one[0], "url": "https://x.y/a>b"}], {}))
check("render: nothing to say when lychee passed", lpc.render([], {}, lychee_failed=False) == "")
crash = lpc.render([], {}, "https://run", lychee_failed=True)
check("render: lychee failed with no broken links points at the log",
      "failed before it could report" in crash and "(https://run)" in crash)

failed = [name for name, ok in checks if not ok]
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"\n{len(checks) - len(failed)}/{len(checks)} passed")
raise SystemExit(1 if failed else 0)
