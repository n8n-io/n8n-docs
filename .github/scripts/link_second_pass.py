#!/usr/bin/env python3
"""Second pass over the outbound links lychee just called healthy (DOC-2396).

lychee judges a link by its status code alone. Two real failure modes survive that:

  redirect-reliant  The link only resolves because the vendor still runs a redirect.
                    It works today and 404s the day they prune it, with no warning in
                    between. `https://docs.citrix.com/en-us/citrix-adc/current-release/`
                    was 301 -> live for three consecutive sweeps, then 301 -> 404.

                    The worse version is a vendor docs migration with a catch-all
                    redirect. On 2026-10-12 all 60 `js.langchain.com` links in this repo
                    resolved 200 -- every single one to the same generic page,
                    `docs.langchain.com/oss/javascript/langchain/overview`. Readers
                    clicking "Chroma vector store" land on a LangChain overview. lychee
                    called all 60 healthy. `collapse_redirects` below reports that as
                    one finding instead of 60 rows, because the fix is one decision.

  soft-404          The vendor retired the page and serves a "not found" page that
                    answers 200. Measured over the 20 most-linked hosts on 2026-10-12:
                    18 return an honest 404, `core.telegram.org` (39 links here) serves
                    a soft 404 the title check catches, and `js.langchain.com` answers
                    200 for anything with no detectable not-found marker. So this class
                    is real but narrow, and SPA hosts will still slip through.

Neither is visible to a status check. This pass re-requests each outbound URL, follows
the redirects, and reports those classes. Hard 404s stay lychee's job; anything this pass
finds that lychee already reported is dropped at merge time in lychee_report.py.

Scope and cost. One GET per URL, following redirects, reading at most BODY_BYTES of the
body. An earlier version sent HEAD first and only fetched a body when the URL had moved.
That was wrong twice over: HEAD lies on several large hosts (see probe()), and a soft 404
can answer 200 at its own URL with no redirect at all, which a HEAD can never show.

The change is made for detection, not for cost. Against a healthy URL it is one request
either way, and this one reads a body where HEAD did not; it saves the second request
only where HEAD-then-GET would have made one, which is a URL that moved. Request count
was never the reason to switch.

The soft-404 heuristic is deliberately narrow: `<title>` and the first `<h1>` only, never
the whole body. DOC-2310 shipped a loose offline heuristic for redirect chains, got 1,421
false positives, and had to remove it. A link checker nobody trusts gets ignored, so the
bar here is "no false positives" rather than "catch everything".

Writes its findings as JSON for lychee_report.py to merge into the one weekly payload.
Called by .github/workflows/lychee.yml. Never fails the job: it exits 0 even when it
cannot reach a single host, because the lychee report must still be delivered.

Config comes from the environment (see the workflow):
  OUTPUT (path to write, default lychee/quality.json), DOCS_DIR (default docs),
  LYCHEE_CONFIG (default lychee.toml), MAX_WORKERS, REQUEST_TIMEOUT, SKIP_LIVE.
"""

from __future__ import annotations

import json
import os
import re
import sys
import tomllib
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_internal_links import blank_gitbook_native, strip_code  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]

MAX_FINDINGS = 500

# Per-class caps, because the classes are not equally actionable. The first full run
# (2026-10-12) produced 719 redirect-reliant links against 23 dead ones; a flat cap of
# 500 sorted by severity would still have pushed every blocked and error row out of the
# report. Everything somebody can act on today is kept in full; the long tail is capped
# and the sheet keeps the rest.
CLASS_CAPS = {"dead": None, "soft-404": None, "redirect-reliant": 300,
              "blocked": 100, "error": 100}
BODY_BYTES = 65536
DEFAULT_WORKERS = 8
DEFAULT_TIMEOUT = 20

# A browser UA, unlike lychee's `lychee/0.18.1`. Some vendors serve a different page to
# an obvious bot, and the point of this pass is to see what a reader sees.
USER_AGENT = ("Mozilla/5.0 (compatible; DocOps-LinkQuality/1.0; "
              "+https://github.com/n8n-io/n8n-docs)")

# Stop characters as in product_links_report.py (whitespace, quotes, backtick, and the
# brackets that wrap a URL in markdown) with one addition: a balanced pair of
# parentheses is part of the URL, exactly as CommonMark treats a link destination.
#
# Stopping at the first ")" turns `[HAR file](https://en.wikipedia.org/wiki/HAR_(file_format))`
# into `.../HAR_(file_format`, which 404s. The first full run reported that as a dead
# link; the page is fine and the markdown is fine, the regex was wrong.
_URL_CHAR = r"""[^\s"'`\\()\[\]{}<>]"""
# Two levels of balanced parentheses. A regex cannot match arbitrary nesting; two covers
# every real case in these docs (Wikipedia-style disambiguation suffixes). Deeper nesting
# truncates, which at worst probes a shorter URL and reports it, rather than passing a
# broken link silently.
URL_RE = re.compile(
    r"https?://(?:" + _URL_CHAR + r"|\((?:" + _URL_CHAR + r"|\(" + _URL_CHAR + r"*\))*\))*")
TRAILING_RE = re.compile(r"[.,;:!?\\]+$")

# Checked against <title> and the first <h1> only. Anchored phrases, not a bare "404"
# anywhere in the markup, which would match analytics snippets and nav links.
# Page-level phrases only. A bare "not found" would flag a real page titled "Node not
# found" or "Credential not found", and a bare "oops" flags half the web. The bar for
# this check is no false positives, not maximum recall: the three real soft 404s we have
# seen are titled "Page not found" (telegram), "404" (peekalink) and "Sorry, we can't
# find that page" (Google), and all three still match.
NOT_FOUND_RE = re.compile(
    r"(^|\W)(404|page not found|page does ?n[o']?t exist|"
    r"page (is )?(no longer|not) available|page unavailable|"
    r"we can'?t find (that |this )?page|couldn'?t find (that |this )?page)(\W|$)", re.I)
TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.I | re.S)
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.I | re.S)
TAG_RE = re.compile(r"<[^>]+>")

BLOCKED_STATUSES = frozenset({401, 403, 407, 429})

SEVERITY = {"dead": 0, "soft-404": 1, "redirect-reliant": 2, "blocked": 3, "error": 4}

# --------------------------------------------------------------------- pure helpers
# No I/O here so the tests can cover them.


def clean_url(raw: str) -> str:
    return TRAILING_RE.sub("", raw).rstrip("#")


def load_excludes(config_path: Path) -> list[re.Pattern]:
    """The `exclude` regexes from lychee.toml, so this pass skips exactly what lychee
    skips. Keeping one source of truth matters: otherwise every bot-blocked host that
    somebody already triaged into lychee.toml comes straight back in this report."""
    try:
        data = tomllib.loads(config_path.read_text(encoding="utf-8"))
    except (OSError, tomllib.TOMLDecodeError) as e:
        print(f"::warning::could not read {config_path} ({e}); no URLs will be excluded")
        return []
    patterns = []
    for raw in data.get("exclude", []) or []:
        try:
            patterns.append(re.compile(raw))
        except re.error:
            print(f"::warning::skipping unparsable exclude pattern: {raw}")
    return patterns


def is_excluded(url: str, patterns) -> bool:
    return any(p.search(url) for p in patterns)


def normalize(url: str) -> str:
    """Comparable form of a URL, for deciding whether a redirect actually went anywhere.

    Scheme upgrades, a `www.` prefix, a trailing slash, a fragment and an empty query are
    all noise: treating them as redirects would flag thousands of links that are
    completely fine and bury the handful that matter.
    """
    try:
        parts = urllib.parse.urlsplit(url)
    except ValueError:
        return url
    host = parts.netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    path = parts.path or "/"
    if len(path) > 1:
        path = path.rstrip("/")
    return urllib.parse.urlunsplit(("https", host, path, parts.query, ""))


def extract_title_and_h1(body: str) -> tuple[str, str]:
    def text(match):
        return TAG_RE.sub(" ", match.group(1)).strip() if match else ""
    return text(TITLE_RE.search(body)), text(H1_RE.search(body))


def looks_like_not_found(body: str, url: str) -> tuple[bool, str]:
    """Narrow soft-404 test: the page's own title or heading says it is missing."""
    # A page legitimately about 404s (an error-handling guide) would trip this, so a URL
    # that is itself about 404s is never judged by its title.
    if "404" in url:
        return False, ""
    title, h1 = extract_title_and_h1(body or "")
    for label, value in (("title", title), ("h1", h1)):
        if value and NOT_FOUND_RE.search(value):
            return True, f'{label} reads "{value[:80]}"'
    return False, ""


def classify(url: str, status, final_url: str, body: str | None):
    """Return (kind, detail) or (None, '') when the link is fine.

    Only called for links lychee already accepted, so a 404 here means the two passes
    disagree -- usually because this one sends a browser user agent.
    """
    if status is None:
        return "error", "no response to the second pass"
    if status in BLOCKED_STATUSES:
        return "blocked", f"host returns {status} to automated checks"
    if status in (404, 410):
        return "dead", f"returns {status} to a browser user agent"
    if not 200 <= status < 400:
        return "error", f"unexpected status {status}"

    redirected = final_url and normalize(final_url) != normalize(url)
    if body is not None:
        missing, why = looks_like_not_found(body, url)
        if missing:
            where = f" at {final_url}" if redirected else ""
            return "soft-404", f"answers {status}{where} but the page says it is gone; {why}"
    if redirected:
        return "redirect-reliant", f"only resolves via a redirect to {final_url}"
    return None, ""


def order_findings(findings):
    return sorted(findings or [],
                  key=lambda f: (SEVERITY.get(f["kind"], 9), f["page"], f["url"]))


def cap_findings(ordered):
    """Trim the long tail per class. Returns (kept, dropped_by_class)."""
    kept, used, dropped = [], {}, {}
    for f in ordered:
        kind = f.get("kind", "")
        cap = CLASS_CAPS.get(kind, 100)
        n = used.get(kind, 0)
        if cap is not None and n >= cap:
            dropped[kind] = dropped.get(kind, 0) + 1
            continue
        used[kind] = n + 1
        kept.append(f)
    # The overall cap can still bite after the per-class ones. Count what it removes,
    # or the report claims completeness it does not have.
    for f in kept[MAX_FINDINGS:]:
        kind = f.get("kind", "")
        dropped[kind] = dropped.get(kind, 0) + 1
    return kept[:MAX_FINDINGS], dropped


# Three distinct source URLs landing on one target is no longer a coincidence; it is a
# vendor docs migration with a catch-all redirect. Below that, treat them as individual
# links so a shared "/docs" landing page doesn't read as a migration.
COLLAPSE_MIN = 3


def collapse_redirects(findings):
    """Group redirect-reliant links by where they land.

    Without this the LangChain migration reads as 60 separate rows and gets skimmed.
    As one row -- "60 links now land on .../langchain/overview" -- it is obviously one
    decision to make, and obviously worth making.
    """
    groups: dict[str, dict] = {}
    for f in findings or []:
        if f.get("kind") != "redirect-reliant" or not f.get("final_url"):
            continue
        g = groups.setdefault(f["final_url"], {
            "final_url": f["final_url"], "count": 0, "urls": [], "pages": []})
        g["count"] += 1
        if len(g["urls"]) < 10:
            g["urls"].append(f["url"])
        for page in f.get("pages", [f.get("page")]):
            if page and page not in g["pages"] and len(g["pages"]) < 10:
                g["pages"].append(page)
    return sorted((g for g in groups.values() if g["count"] >= COLLAPSE_MIN),
                  key=lambda g: -g["count"])


def summary_markdown(report):
    t = report["totals"]
    lines = ["## Outbound link quality (second pass)", ""]
    lines.append(f"- Re-checked: {t['checked']} URL(s) "
                 f"({t['excluded']} excluded, {t['skipped']} skipped)")
    lines.append(f"- **Soft 404s: {t.get('soft_404', 0)}** | "
                 f"dead to a browser: {t.get('dead', 0)} | "
                 f"redirect-reliant: {t.get('redirect_reliant', 0)}")
    unverified = t.get("blocked", 0) + t.get("error", 0)
    if unverified:
        lines.append(f"- Could not verify: {unverified}")

    collapsed = report.get("collapsed_redirects") or []
    if collapsed:
        lines += ["", "### Links that now all land on the same page", "",
                  "A vendor moved their docs and catch-all-redirected the old URLs. "
                  "Every one of these answers 200, so lychee sees nothing wrong, but "
                  "the reader no longer reaches the page we meant.", "",
                  "| Links | They now all land on | Example source |", "|---|---|---|"]
        for g in collapsed[:10]:
            lines.append(f"| {g['count']} | `{g['final_url']}` | `{g['urls'][0]}` |")

    reportable = [f for f in report["findings"] if f["kind"] != "redirect-reliant"]
    if reportable:
        lines += ["", "| Kind | Page | URL | Detail |", "|---|---|---|---|"]
        for f in reportable[:25]:
            detail = f["detail"].replace("|", "\\|")
            lines.append(f"| {f['kind']} | `{f['page']}` | `{f['url']}` | {detail} |")
    if report.get("findings_truncated"):
        dropped = report.get("findings_dropped") or {}
        detail = ", ".join(f"{v} {k}" for k, v in sorted(dropped.items()))
        lines += ["", f"Long tail trimmed ({detail}). These rows are not in the "
                      "report, the sheet or Supabase: raise CLASS_CAPS if you need them."]
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------- I/O

def collect_urls(docs_dir: Path, patterns):
    """Every outbound URL under docs/, with the pages it appears on.

    Mirrors what lychee sees after the DOC-2396 change: hidden directories included
    (`--hidden`, which brings in docs/reusable-content/.gitbook/includes), code blocks
    skipped (`include_verbatim = false`), and the lychee.toml `exclude` list applied.
    """
    urls: dict[str, dict] = {}
    excluded = 0
    for md in sorted(Path(docs_dir).resolve().rglob("*.md")):
        try:
            rel = md.relative_to(REPO_ROOT).as_posix()
        except ValueError:
            rel = md.name
        raw = md.read_text(encoding="utf-8", errors="replace")
        text = strip_code(blank_gitbook_native(raw))
        for raw_url in URL_RE.findall(text):
            url = clean_url(raw_url)
            if not url:
                continue
            # Compare the host, not a string prefix: "docs.n8n.io.evil.example" starts
            # with the same characters and is a different site entirely.
            try:
                host = urllib.parse.urlsplit(url).netloc.lower().split("@")[-1].split(":")[0]
            except ValueError:
                continue
            if host == "docs.n8n.io":
                continue
            # Cross-space GitBook links are internal, not outbound. They sit behind a
            # login, so a live probe only ever learns "redirected to sign-in".
            # check_internal_links.py resolves them against the filesystem, which is
            # the authoritative answer.
            if host == "app.gitbook.com":
                continue
            if is_excluded(url, patterns):
                excluded += 1
                continue
            entry = urls.setdefault(url, {"url": url, "pages": []})
            if rel not in entry["pages"]:
                entry["pages"].append(rel)
    return urls, excluded


def probe(url, timeout=DEFAULT_TIMEOUT):
    """(status, final_url, body). One GET, following redirects, body capped.

    GET rather than HEAD, for two reasons learned the hard way on 2026-10-12.

    HEAD lies. The first full run reported 23 dead links; 4 of the 5 spot-checked were
    wrong, because marketplace.visualstudio.com, support.google.com, figma.com and
    reddit.com all answer 404 to a HEAD and 200 to a GET. Falling back to GET on a bad
    HEAD fixed that but meant two requests for every real failure.

    And the body is the whole point. A soft 404 answers 200 at its own URL with no
    redirect at all -- cloud.google.com/resource-manager/reference/rest/v3/projects/search
    does exactly that, with an h1 reading "Sorry, we can't find that page". Only the
    body shows it. HEAD would never have caught it.

    So: one request per URL instead of one-or-two, and strictly better detection. The
    cost is bytes, capped at BODY_BYTES, on a job that runs once a week.
    """
    req = urllib.request.Request(url, method="GET",
                                 headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.geturl(), resp.read(BODY_BYTES).decode(
                "utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        # The error page body is not worth reading: the status already decided it.
        return e.code, e.geturl(), None
    except Exception:  # noqa: BLE001 - DNS, TLS, timeout: all "no verdict"
        return None, url, None


def run(docs_dir, config_path, workers, timeout, prober=None):
    patterns = load_excludes(config_path)
    urls, excluded = collect_urls(docs_dir, patterns)
    probe_one = prober or (lambda u: probe(u, timeout))

    totals = {"checked": len(urls), "excluded": excluded, "skipped": 0,
              "ok": 0, "dead": 0, "soft_404": 0, "redirect_reliant": 0,
              "blocked": 0, "error": 0}
    findings = []

    ordered = sorted(urls.values(), key=lambda e: e["url"])
    with ThreadPoolExecutor(max_workers=workers) as pool:
        results = pool.map(lambda e: (e, probe_one(e["url"])), ordered)
        for entry, (status, final_url, body) in results:
            kind, detail = classify(entry["url"], status, final_url, body)
            if kind is None:
                totals["ok"] += 1
                continue
            totals[kind.replace("-", "_")] += 1
            findings.append({
                "page": entry["pages"][0],
                "pages": entry["pages"][:5],
                "url": entry["url"],
                "kind": kind,
                "detail": detail,
                "http_status": status,
                "final_url": final_url,
            })

    ordered_findings = order_findings(findings)
    # Group before capping, so a 60-link migration is still reported as 60 even if the
    # individual rows are trimmed.
    groups = collapse_redirects(ordered_findings)
    kept, dropped = cap_findings(ordered_findings)
    return {
        "source": "link-second-pass",
        "checked_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "totals": totals,
        "collapsed_redirects": groups,
        "findings": kept,
        "findings_truncated": len(kept) < len(ordered_findings),
        "findings_dropped": dropped,
    }


def main():
    out = Path(os.environ.get("OUTPUT", "lychee/quality.json"))
    docs_dir = REPO_ROOT / os.environ.get("DOCS_DIR", "docs")
    config_path = REPO_ROOT / os.environ.get("LYCHEE_CONFIG", "lychee.toml")
    workers = int(os.environ.get("MAX_WORKERS", DEFAULT_WORKERS))
    timeout = int(os.environ.get("REQUEST_TIMEOUT", DEFAULT_TIMEOUT))

    if os.environ.get("SKIP_LIVE"):
        print("SKIP_LIVE set; second pass not run.")
        return 0
    if not docs_dir.is_dir():
        print(f"::warning::docs directory not found at {docs_dir}; second pass skipped.")
        return 0

    report = run(docs_dir, config_path, workers, timeout)

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")

    summary = summary_markdown(report)
    print(summary)
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write(summary)
    # Always 0. The lychee report is the deliverable; this pass must never be the reason
    # the weekly job goes red.
    return 0


if __name__ == "__main__":
    sys.exit(main())
