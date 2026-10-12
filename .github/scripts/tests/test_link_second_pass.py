#!/usr/bin/env python3
"""Network-free tests for the pure helpers in link_second_pass.py.

No HTTP here: `classify` is fed the (status, final_url, body) a probe would have
returned. The cases are the real ones from DOC-2396, recorded on 2026-10-12, so a
future change that reintroduces the blind spot fails here instead of in production.

Run: python3 .github/scripts/tests/test_link_second_pass.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "link_second_pass.py"

spec = importlib.util.spec_from_file_location("link_second_pass", SCRIPT)
lsp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lsp)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


# --- normalize --------------------------------------------------------------------
# These are all "the redirect went nowhere". Treating any of them as a finding would
# bury the real ones, which is how a link report stops being read.
check("normalize: trailing slash is not a redirect",
      lsp.normalize("https://x.com/a") == lsp.normalize("https://x.com/a/"))
check("normalize: scheme upgrade is not a redirect",
      lsp.normalize("http://x.com/a") == lsp.normalize("https://x.com/a"))
check("normalize: www prefix is not a redirect",
      lsp.normalize("https://www.x.com/a") == lsp.normalize("https://x.com/a"))
check("normalize: fragment is not a redirect",
      lsp.normalize("https://x.com/a#frag") == lsp.normalize("https://x.com/a"))
check("normalize: host case is not a redirect",
      lsp.normalize("https://X.COM/a") == lsp.normalize("https://x.com/a"))
check("normalize: a different path IS a redirect",
      lsp.normalize("https://x.com/a") != lsp.normalize("https://x.com/b"))
check("normalize: a different host IS a redirect",
      lsp.normalize("https://x.com/a") != lsp.normalize("https://y.com/a"))
check("normalize: the query string still counts",
      lsp.normalize("https://x.com/a?v=1") != lsp.normalize("https://x.com/a?v=2"))

# --- looks_like_not_found ----------------------------------------------------------
soft = "<html><head><title>Page not found</title></head><body>hi</body></html>"
check("soft-404: a not-found <title> is caught", lsp.looks_like_not_found(soft, "https://x.com/a")[0])
check("soft-404: a not-found <h1> is caught",
      lsp.looks_like_not_found("<h1>404 - Not Found</h1>", "https://x.com/a")[0])
check("soft-404: the reason names what matched",
      "title" in lsp.looks_like_not_found(soft, "https://x.com/a")[1])
# The body is never searched as a whole. A real page mentioning 404 in its nav, its
# analytics snippet or its prose is not a soft 404, and matching on it produced the
# false-positive pile DOC-2310 had to delete.
check("soft-404: '404' in the body alone is NOT enough",
      not lsp.looks_like_not_found(
          "<title>Error handling</title><body>return a 404 status code</body>",
          "https://x.com/a")[0])
check("soft-404: a page legitimately about 404s is exempt by its URL",
      not lsp.looks_like_not_found(soft, "https://x.com/guide/404-pages")[0])
check("soft-404: an ordinary page is clean",
      not lsp.looks_like_not_found("<title>Vector stores</title>", "https://x.com/a")[0])
check("soft-404: empty body is clean", not lsp.looks_like_not_found("", "https://x.com/a")[0])

# --- classify ----------------------------------------------------------------------
# docs.citrix.com/en-us/citrix-adc/current-release/ : 301 for three sweeps, then 301->404.
check("classify: 404 to a browser is dead",
      lsp.classify("https://docs.citrix.com/en-us/citrix-adc/current-release/", 404,
                   "https://docs.netscaler.com/x", None)[0] == "dead")
check("classify: 410 is dead", lsp.classify("https://x.com/a", 410, "https://x.com/a", None)[0] == "dead")

# js.langchain.com: 200, but every link lands on one generic overview page.
lk = lsp.classify("https://js.langchain.com/docs/integrations/vectorstores/chroma", 200,
                  "https://docs.langchain.com/oss/javascript/langchain/overview", "<title>Overview</title>")
check("classify: a 200 that moved elsewhere is redirect-reliant", lk[0] == "redirect-reliant")
check("classify: the detail names the destination", "docs.langchain.com" in lk[1])

check("classify: a clean 200 that did not move is not reported",
      lsp.classify("https://n8n.io/integrations/code/", 200,
                   "https://n8n.io/integrations/code/", None)[0] is None)
check("classify: a trailing-slash-only difference is not reported",
      lsp.classify("https://n8n.io/a", 200, "https://n8n.io/a/", None)[0] is None)

# A soft 404 outranks redirect-reliant: the page is gone, not merely moved.
check("classify: soft-404 wins over redirect-reliant",
      lsp.classify("https://x.com/old", 200, "https://x.com/new", soft)[0] == "soft-404")
check("classify: soft-404 detail names the final url",
      "https://x.com/new" in lsp.classify("https://x.com/old", 200, "https://x.com/new", soft)[1])

check("classify: 403 is blocked, not dead",
      lsp.classify("https://x.com/a", 403, "https://x.com/a", None)[0] == "blocked")
check("classify: 429 is blocked",
      lsp.classify("https://x.com/a", 429, "https://x.com/a", None)[0] == "blocked")
check("classify: no response is an error",
      lsp.classify("https://x.com/a", None, "https://x.com/a", None)[0] == "error")
check("classify: an odd status is an error",
      lsp.classify("https://x.com/a", 500, "https://x.com/a", None)[0] == "error")

# --- collapse_redirects --------------------------------------------------------------
many = [{"kind": "redirect-reliant", "url": f"https://js.langchain.com/docs/p{i}",
         "final_url": "https://docs.langchain.com/overview",
         "page": f"docs/p{i}.md", "pages": [f"docs/p{i}.md"]} for i in range(60)]
groups = lsp.collapse_redirects(many)
check("collapse: 60 links to one target become one group", len(groups) == 1 and groups[0]["count"] == 60)
check("collapse: the group names the shared destination",
      groups[0]["final_url"] == "https://docs.langchain.com/overview")
check("collapse: examples are capped", len(groups[0]["urls"]) <= 10 and len(groups[0]["pages"]) <= 10)

few = [{"kind": "redirect-reliant", "url": f"https://x.com/{i}",
        "final_url": "https://x.com/landing", "page": "docs/a.md", "pages": ["docs/a.md"]}
       for i in range(lsp.COLLAPSE_MIN - 1)]
check("collapse: below the threshold nothing is grouped", lsp.collapse_redirects(few) == [])
check("collapse: non-redirect findings are ignored",
      lsp.collapse_redirects([{"kind": "dead", "url": "https://x.com/a",
                               "final_url": "https://x.com/b", "page": "docs/a.md"}]) == [])

# --- URL_RE -----------------------------------------------------------------------------
# CommonMark allows balanced parentheses in a link destination. Stopping at the first
# ")" turned the Wikipedia HAR link into a 404 and the first full run reported it as a
# dead link, when both the page and the markdown were fine.
def extracted(text):
    return [lsp.clean_url(u) for u in lsp.URL_RE.findall(text)]


check("URL_RE: balanced parens stay in the URL, and the markdown paren does not",
      extracted("[HAR file](https://en.wikipedia.org/wiki/HAR_(file_format)) in your message")
      == ["https://en.wikipedia.org/wiki/HAR_(file_format)"])
check("URL_RE: two levels of nesting survive",
      extracted("[a](https://example.com/a_(b_(c))) x") == ["https://example.com/a_(b_(c))"])
check("URL_RE: the closing paren of a markdown link is not swallowed",
      extracted("see [docs](https://example.com/a) here") == ["https://example.com/a"])
check("URL_RE: query strings survive",
      extracted("[x](https://example.com/a?b=1&c=2)") == ["https://example.com/a?b=1&c=2"])
check("URL_RE: angle-bracket autolinks",
      extracted("<https://example.com/a>") == ["https://example.com/a"])
check("URL_RE: a trailing sentence period is not part of the URL",
      extracted("bare https://example.com/a. end") == ["https://example.com/a"])

# The bar is no false positives. These are the three real soft 404s we have seen, and
# the page titles that must not be mistaken for them.
for _title in ["Page not found", "404", "Sorry, we can't find that page"]:
    check("soft-404: still catches " + repr(_title),
          lsp.looks_like_not_found("<title>" + _title + "</title>", "https://x.com/a")[0])
for _title in ["Node not found", "Credential not found error", "Oops, an n8n guide",
               "Handling not found errors", "Vector stores"]:
    check("soft-404: does not flag " + repr(_title),
          not lsp.looks_like_not_found("<title>" + _title + "</title>", "https://x.com/a")[0])

# --- collect_urls host handling ---------------------------------------------------------
# A prefix test would skip this: it starts with the same characters and is another site.
import types as _types
_pats = []
_tmp = Path(__file__).resolve().parent / "_hosttest"
_tmp.mkdir(exist_ok=True)
(_tmp / "p.md").write_text(
    "a https://docs.n8n.io/real b https://docs.n8n.io.evil.example/x "
    "c https://app.gitbook.com/s/ABC/page d https://ok.example/y\n", encoding="utf-8")
_urls, _ = lsp.collect_urls(_tmp, _pats)
check("collect_urls: our own docs host is skipped", "https://docs.n8n.io/real" not in _urls)
check("collect_urls: a lookalike host is NOT skipped",
      "https://docs.n8n.io.evil.example/x" in _urls)
check("collect_urls: cross-space gitbook links are skipped",
      "https://app.gitbook.com/s/ABC/page" not in _urls)
check("collect_urls: an ordinary host is kept", "https://ok.example/y" in _urls)
import shutil as _shutil
_shutil.rmtree(_tmp, ignore_errors=True)

# --- cap_findings -------------------------------------------------------------------------
# First full run: 719 redirect-reliant against 23 dead. A flat cap sorted by severity
# would have pushed every blocked and error row out of the report entirely.
mk = lambda kind, i: {"kind": kind, "page": f"docs/p{i}.md", "url": f"https://x/{i}", "detail": ""}
mixed = ([mk("redirect-reliant", i) for i in range(719)] + [mk("dead", i) for i in range(23)]
         + [mk("blocked", i) for i in range(129)] + [mk("error", i) for i in range(20)])
kept, dropped = lsp.cap_findings(lsp.order_findings(mixed))
kept_by = {}
for f in kept:
    kept_by[f["kind"]] = kept_by.get(f["kind"], 0) + 1
check("cap: every dead link is kept, none capped away", kept_by.get("dead") == 23)
check("cap: the redirect-reliant tail is trimmed to its cap",
      kept_by.get("redirect-reliant") == lsp.CLASS_CAPS["redirect-reliant"])
check("cap: blocked still gets its share instead of being squeezed out",
      kept_by.get("blocked") == lsp.CLASS_CAPS["blocked"])
check("cap: errors are kept when under the cap", kept_by.get("error") == 20)
check("cap: what was dropped is reported, not silently lost",
      dropped.get("redirect-reliant") == 719 - lsp.CLASS_CAPS["redirect-reliant"]
      and dropped.get("blocked") == 129 - lsp.CLASS_CAPS["blocked"])
check("cap: nothing dropped when everything fits",
      lsp.cap_findings([mk("dead", 1)])[1] == {})
# `dead` has no per-class cap, so only the overall MAX_FINDINGS slice can trim it. That
# slice used to drop rows without recording them, so the report looked complete.
_many_dead = [mk("dead", i) for i in range(lsp.MAX_FINDINGS + 7)]
_kept, _dropped = lsp.cap_findings(lsp.order_findings(_many_dead))
check("cap: the overall MAX_FINDINGS slice is counted, not silent",
      len(_kept) == lsp.MAX_FINDINGS and _dropped.get("dead") == 7)

# --- excludes -------------------------------------------------------------------------
# One source of truth with lychee: a host someone already triaged into lychee.toml must
# not come straight back through this report.
pats = lsp.load_excludes(Path(__file__).resolve().parents[3] / "lychee.toml")
check("excludes: lychee.toml parses into patterns", len(pats) > 10)
check("excludes: an excluded host is skipped",
      lsp.is_excluded("https://www.linkedin.com/company/n8n", pats))
check("excludes: an ordinary host is not skipped",
      not lsp.is_excluded("https://js.langchain.com/docs/x", pats))
check("excludes: a missing config degrades to no excludes, not a crash",
      lsp.load_excludes(Path("/nonexistent/lychee.toml")) == [])

# --- clean_url --------------------------------------------------------------------------
check("clean_url: trailing sentence punctuation is dropped",
      lsp.clean_url("https://x.com/a.") == "https://x.com/a")
check("clean_url: a bare trailing # is dropped",
      lsp.clean_url("https://x.com/a#") == "https://x.com/a")

# --- summary ------------------------------------------------------------------------------
report = {
    "totals": {"checked": 4118, "excluded": 1689, "skipped": 0, "ok": 4000,
               "dead": 1, "soft_404": 2, "redirect_reliant": 60, "blocked": 3, "error": 1},
    "findings": [{"kind": "soft-404", "page": "docs/a.md", "url": "https://x.com/a",
                  "detail": 'title reads "Page not found"'}],
    "collapsed_redirects": [{"final_url": "https://docs.langchain.com/overview", "count": 60,
                             "urls": ["https://js.langchain.com/docs/p0"], "pages": ["docs/p0.md"]}],
}
summary = lsp.summary_markdown(report)
check("summary: reports the headline counts", "Soft 404s: 2" in summary and "redirect-reliant: 60" in summary)
check("summary: calls out the collapse group", "all land on the same page" in summary and "| 60 |" in summary)
check("summary: lists individual findings", "soft-404" in summary and "docs/a.md" in summary)
check("summary: does not list the 60 redirect rows individually",
      summary.count("js.langchain.com") <= 1)

# --- report ------------------------------------------------------------------------
failed = [name for name, ok in checks if not ok]
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"\n{len(checks) - len(failed)}/{len(checks)} checks passed")
raise SystemExit(1 if failed else 0)
