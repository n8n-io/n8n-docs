#!/usr/bin/env python3
"""Check the docs.n8n.io links hardcoded in the n8n product repo (DOC-2318).

Node notices, credential hints and error messages in `n8n-io/n8n` link to
docs.n8n.io pages and anchors. When a page moves or a heading is renamed the
link dies silently: no CI in either repo looks at it. `lychee.toml` excludes
`^https://docs\\.n8n\\.io/.*`, and `check_internal_links.py` only sees markdown
changed in an n8n-docs PR.

Called by .github/workflows/product-links.yml, which checks out both repos.
This script extracts every docs.n8n.io URL from the n8n source tree, resolves
each one against the n8n-docs working tree, and POSTs the findings to the
DocOps n8n webhook, which live-checks the unresolved paths, stores the rows in
Supabase, adds a dated Google Sheet tab and alerts Slack.

Anchors are resolved against the markdown, never against the rendered page:
GitBook serves React-generated ids (`id="_R_1al39bsnqj6iv5ubsnpfivb_"`) next to
the real ones, so scraping HTML is a trap. The explicit `id="..."` that git-sync
writes into the `.md` on main is authoritative. Heading ids come from
`check_internal_links.heading_ids`, so this checker and the in-repo one agree on
slugs by construction.

Two passes, because neither alone is enough:

  1. Offline. Resolve the URL path to a docs file and check the anchor against
     it. Exact, and free.
  2. Live, only for paths with no file behind them. A moved page still answers
     200 through a GitBook redirect, so a status check alone finds nothing --
     the fragment is what died. Follow the redirects, map the FINAL url back to
     a docs file, and check the anchor there. This is the only way to see a dead
     anchor on a page whose old path is redirect-served.

Each URL lands in one of these buckets:
  ok               path resolves and the anchor (if any) matches.
  broken-anchor    page exists, no heading carries that id. Actionable now.
  case-mismatch    the id exists but differs in case.
  empty-anchor     link ends in a bare '#'.
  redirect-reliant only resolves because a GitBook redirect catches it. Works
                   today, 404s the day someone prunes the redirect.
  dead             404/410 after following redirects.
  no-source-file   live, but no markdown backs the final url (a page authored in
                   the GitBook UI); the anchor can't be verified.
  blocked / error  the live check could not reach a verdict.
  templated        URL is built at runtime (`${...}`); not checkable.
  generated        GitBook-generated subtree (the OpenAPI API reference).

Exit codes: 0 = report delivered; 1 = the n8n checkout is missing, the webhook
URL is not configured, or the POST failed. Broken links alone never fail the
job: n8n owns the alerting, same contract as lychee_report.py.

Config comes from the environment (see the workflow):
  N8N_SRC (path to the n8n checkout, default `n8n-src`), N8N_SHA, RUN_URL,
  WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD, SKIP_LIVE (set to skip pass 2),
  plus GITHUB_REPOSITORY / GITHUB_RUN_ID / GITHUB_STEP_SUMMARY set by Actions.

The reference implementation this is derived from, with its first-run numbers
and the gotchas above, is in n8n-io/DocOps under
prototypes/doc-2318-code-link-checker/.
"""

from __future__ import annotations

import base64
import difflib
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_internal_links import DOCS_ROOT, heading_ids, is_generated_page  # noqa: E402

# Repo root = two levels up from .github/scripts/
REPO_ROOT = Path(__file__).resolve().parents[2]

# The space that GitBook publishes at the site root, so docs.n8n.io/foo is
# docs/get-started/foo.md. Every other space is served under its folder name.
ROOT_SPACE = "get-started"

# Product code only. n8n's own markdown isn't shown to users inside the app.
SOURCE_SUFFIXES = (".ts", ".tsx", ".js", ".mjs", ".cjs", ".vue", ".json")

# Directories that never ship to a user's screen. Test files matter here: the
# first trial run of this checker reported https://docs.n8n.io/not-in-registry/
# as dead, which is a fixture in n8n-docs.tool.test.ts, not a real link.
SKIP_DIRS = frozenset({
    "node_modules", "dist", "build", "coverage", ".git", ".turbo", ".nx",
    "__tests__", "__mocks__", "__snapshots__", "test", "tests", "e2e",
    "cypress", "fixtures", "__fixtures__",
    # n8n's Playwright/E2E tooling package; dev-only, never on a user's screen.
    "testing",
})
SKIP_FILE_RE = re.compile(r"(\.test\.|\.spec\.|\.snap$|-lock\.json$|^package-lock\.json$)")

# Stop at whitespace, quote/backtick, and the bracket/paren characters that
# wrap a URL in code and markdown.
URL_RE = re.compile(r"https?://docs\.n8n\.io[^\s\"'`\\)\]}<>]*")
# Trailing punctuation that belongs to the sentence, not the URL. A trailing
# backslash is a line continuation in a wrapped string literal.
TRAILING_RE = re.compile(r"[.,;:!?\\]+$")
TEMPLATE_RE = re.compile(r"\$\{|\{\{|<%|%s|\{[0-9]+\}")

MAX_FINDINGS = 500
MAX_LOCATIONS = 5

# Report order. Dead first, then the anchors someone can fix today. The
# redirect-reliant pile is last: it is the biggest and the least urgent, but it
# is every link that 404s the day a redirect is pruned.
SEVERITY = {
    "dead": 0, "broken-anchor": 1, "case-mismatch": 2, "empty-anchor": 3,
    "no-source-file": 4, "error": 5, "blocked": 6, "unresolved-path": 7,
    "redirect-reliant": 8,
}

# --------------------------------------------------------------------- pure helpers
# No I/O except the docs tree lookups, so the tests can cover them.


def clean_url(raw):
    """Strip sentence punctuation and line-continuation slashes off a match."""
    url = TRAILING_RE.sub("", (raw or "").strip())
    # A wrapped literal can leave the continuation mid-URL: ".../page/\ntext".
    return url.replace("\\", "")


def split_url(url):
    """Return (path, anchor, has_fragment) for a docs.n8n.io URL.

    `path` is normalized the way the docs tree is laid out: no host, no leading
    or trailing slash, no query string, and no `.md` suffix (GitBook serves a
    `.md` twin of every page for LLMs; both map to the same source file).
    """
    rest = re.sub(r"^https?://docs\.n8n\.io", "", url, flags=re.IGNORECASE)
    anchor, has_fragment = "", "#" in rest
    if has_fragment:
        rest, anchor = rest.split("#", 1)
    rest = rest.split("?", 1)[0]
    path = rest.strip("/")
    if path.lower().endswith(".md"):
        path = path[: -len(".md")]
    return path, anchor, has_fragment


def is_templated(url):
    return bool(TEMPLATE_RE.search(url or ""))


def resolve_path(path, docs_root=None):
    """Return the docs file backing a URL path, or None.

    Tries the page and its folder README, first as a top-level space and then
    under the root space. Mirrors how GitBook derives a URL from a file path
    (the path is the URL; frontmatter never renames it).
    """
    root = Path(docs_root) if docs_root else DOCS_ROOT
    if not path:
        candidates = [root / ROOT_SPACE / "README.md"]
    else:
        candidates = [
            root / f"{path}.md",
            root / path / "README.md",
            root / ROOT_SPACE / f"{path}.md",
            root / ROOT_SPACE / path / "README.md",
        ]
    for c in candidates:
        if c.is_file():
            return c
    return None


def should_scan(rel_path):
    """True for a product source file worth reading."""
    parts = Path(rel_path).parts
    if any(p in SKIP_DIRS for p in parts):
        return False
    name = Path(rel_path).name
    if SKIP_FILE_RE.search(name):
        return False
    return name.endswith(SOURCE_SUFFIXES)


def rel_to_repo(page):
    return (page.relative_to(REPO_ROOT).as_posix()
            if page.is_relative_to(REPO_ROOT) else str(page))


def check_anchor(page, anchor):
    """Match an anchor against a page's heading ids.

    Returns (kind, detail). `ok` covers three quiet cases beyond an exact hit:
    a heading with no explicit `id=` (we only guessed its slug), an include we
    couldn't resolve, and GitBook's `id-` prefix on headings that start with a
    digit (`## 1. Create an app` -> `#id-1.-create-an-app`).
    """
    explicit, slugs, resolved = heading_ids(page)
    known = explicit | slugs
    if anchor in known or not resolved:
        return "ok", ""
    # GitBook only adds the `id-` prefix when the slug would otherwise start
    # with a digit, so accepting it for any suffix would swallow a genuinely
    # broken `#id-foo` on a page that has `#foo`.
    suffix = anchor[len("id-"):]
    if anchor.startswith("id-") and suffix[:1].isdigit() and suffix in known:
        return "ok", ""
    lowered = {i.lower(): i for i in known}
    if anchor.lower() in lowered:
        return ("case-mismatch",
                f"id on {rel_to_repo(page)} is '{lowered[anchor.lower()]}', link says '{anchor}'")
    # Fuzzy, not prefix: the real fixes are things like
    # `remove-queue_worker_max_stalled_count` -> `remove-queueworkermaxstalledcount`,
    # where a prefix match just returns whichever id sorts first.
    near = difflib.get_close_matches(anchor, sorted(explicit), n=1, cutoff=0.6)
    hint = f"; did you mean #{near[0]}?" if near else ""
    return "broken-anchor", f"no heading with id '{anchor}' on {rel_to_repo(page)}{hint}"


def classify(url, docs_root=None):
    """Pass 1: resolve a URL offline. Returns (kind, detail)."""
    if is_templated(url):
        return "templated", "URL is built at runtime; not checkable"
    path, anchor, has_fragment = split_url(url)
    page = resolve_path(path, docs_root)
    if page is None:
        # GitBook-generated subtrees (the OpenAPI-rendered API reference) have
        # no .md source to resolve against, so treat them as unverifiable
        # rather than dead -- same exemption check_internal_links makes.
        head, _, rest = path.partition("/")
        if is_generated_page(head, rest):
            return "generated", "GitBook-generated page with no markdown source"
        return ("unresolved-path",
                f"no page in n8n-docs backs /{path}; needs a live check")
    if not has_fragment:
        return "ok", ""
    if anchor == "":
        return "empty-anchor", "link ends in a bare '#' with no anchor"
    return check_anchor(page, anchor)


def classify_live(url, resolver=None, docs_root=None):
    """Pass 2: follow the redirects and judge the URL at its destination.

    Only called for `unresolved-path` URLs. A moved page answers 200 via a
    GitBook redirect, so the status alone proves nothing -- what matters is
    whether the final page still carries the anchor.
    """
    resolve_live = resolver or http_resolve
    _, anchor, has_fragment = split_url(url)
    status, final_url = resolve_live(url.split("#", 1)[0])
    if status in (404, 410):
        return "dead", f"returns {status} after following redirects", status, final_url
    if status in (401, 403, 429):
        return "blocked", f"returns {status} to automated checks", status, final_url
    if status is None or not (200 <= status < 400):
        return "error", f"live check returned {status}", status, final_url
    final_path, _, _ = split_url(final_url)
    page = resolve_path(final_path, docs_root)
    if page is None:
        # A GitBook-generated subtree has no markdown by design, so the live
        # status is the only verdict available -- and the only one it can get,
        # which is why generated URLs are live-checked rather than assumed fine.
        head, _, rest = final_path.partition("/")
        if is_generated_page(head, rest):
            return ("generated", "GitBook-generated page; live, anchor not verifiable",
                    status, final_url)
        return ("no-source-file",
                f"live at /{final_path} but no markdown backs it; anchor not verified",
                status, final_url)
    detail_suffix = f"; redirects to /{final_path}"
    if not has_fragment or anchor == "":
        return ("redirect-reliant",
                f"only resolves via a redirect{detail_suffix}", status, final_url)
    kind, detail = check_anchor(page, anchor)
    if kind == "ok":
        return ("redirect-reliant",
                f"only resolves via a redirect{detail_suffix}", status, final_url)
    # A dead anchor on a redirect-served page: the case a status check misses.
    return kind, f"{detail}{detail_suffix}", status, final_url


def build_payload(findings, totals, ctx):
    """The contract between this Action and the n8n webhook."""
    ordered = sorted(findings, key=lambda f: (SEVERITY.get(f["kind"], 9),
                                              -f["occurrences"], f["url"]))
    return {
        "source": "product-links-weekly",
        "repo": ctx.get("repo", ""),
        "scanned_repo": ctx.get("scanned_repo", "n8n-io/n8n"),
        "scanned_sha": ctx.get("scanned_sha", ""),
        "run_id": ctx.get("run_id", ""),
        "run_url": ctx.get("run_url", ""),
        "checked_at": ctx.get("checked_at", ""),
        "totals": totals,
        "findings": ordered[:MAX_FINDINGS],
        "findings_truncated": len(ordered) > MAX_FINDINGS,
    }


def summary_markdown(payload):
    """Short job summary so the run page is readable without opening n8n."""
    t = payload["totals"]
    lines = ["## docs.n8n.io links in n8n-io/n8n", ""]
    lines.append(f"- Scanned: {t['files_scanned']} files, {t['occurrences']} link occurrences")
    lines.append(f"- Unique URLs: {t['unique_urls']} ({t['ok']} resolve cleanly, "
                 f"{t['templated']} built at runtime, {t.get('generated', 0)} generated)")
    lines.append(f"- **Dead: {t.get('dead', 0)}** | "
                 f"**broken anchors: {t['broken_anchor']}** | "
                 f"case mismatches: {t.get('case_mismatch', 0)}")
    lines.append(f"- Redirect-reliant: {t.get('redirect_reliant', 0)} "
                 f"(work today, 404 the day the redirect is pruned)")
    unverified = t.get("no_source_file", 0) + t.get("blocked", 0) + t.get("error", 0)
    if unverified:
        lines.append(f"- Could not verify: {unverified}")
    reportable = [f for f in payload["findings"] if f["kind"] != "templated"]
    if reportable:
        lines += ["", "| Kind | URL | Uses | Detail |", "|---|---|---|---|"]
        for f in reportable[:25]:
            detail = f["detail"].replace("|", "\\|")
            lines.append(f"| {f['kind']} | `{f['url']}` | {f['occurrences']} | {detail} |")
    if payload.get("findings_truncated"):
        lines += ["", f"Only the first {MAX_FINDINGS} findings were sent to n8n."]
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------- I/O

def http_resolve(url, timeout=30):
    """Follow redirects. Returns (status or None, final url)."""
    # HEAD is enough: the anchor is read from markdown, never from the page.
    req = urllib.request.Request(url, method="HEAD", headers={
        "User-Agent": "Mozilla/5.0 (compatible; DocOps-ProductLinks/1.0)"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.geturl()
    except urllib.error.HTTPError as e:
        return e.code, e.geturl()
    except Exception:  # noqa: BLE001 - DNS, TLS, timeout: all "no verdict"
        return None, url


def scan(src_root, live=True, resolver=None, docs_root=None):
    """Walk the n8n checkout and return (findings, totals).

    `live=False` skips pass 2 (the network), which keeps the unit tests and any
    offline run honest: unresolved paths simply stay `unresolved-path`.

    `docs_root` overrides the docs tree the URLs resolve against. Production
    leaves it None and gets this repo's `docs/`; the tests pass a fixture so a
    verdict never depends on which real pages happen to exist today.
    """
    src_root = Path(src_root)
    seen = {}
    files_scanned = 0
    occurrences = 0
    for path in src_root.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(src_root).as_posix()
        if not should_scan(rel):
            continue
        files_scanned += 1
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        if "docs.n8n.io" not in text:
            continue
        for lineno, line in enumerate(text.split("\n"), 1):
            for raw in URL_RE.findall(line):
                url = clean_url(raw)
                if not url:
                    continue
                occurrences += 1
                # Key on the normalized page+anchor, not the raw string, so
                # variants that resolve identically (a query string, the `.md`
                # twin) are one finding instead of several with the same verdict.
                kpath, kanchor, _ = split_url(url)
                key = f"{kpath}#{kanchor}"
                entry = seen.setdefault(key, {"url": url, "occurrences": 0, "locations": []})
                entry["occurrences"] += 1
                if len(entry["locations"]) < MAX_LOCATIONS:
                    entry["locations"].append(f"{rel}:{lineno}")

    totals = {"files_scanned": files_scanned, "occurrences": occurrences,
              "unique_urls": len(seen), "ok": 0, "broken_anchor": 0,
              "case_mismatch": 0, "unresolved_path": 0, "empty_anchor": 0,
              "templated": 0, "generated": 0, "dead": 0, "redirect_reliant": 0,
              "no_source_file": 0, "blocked": 0, "error": 0}
    findings = []
    for entry in seen.values():
        url = entry["url"]
        kind, detail = classify(url, docs_root)
        status, final_url = None, None
        # `generated` goes to the live pass too: it has no markdown to resolve
        # against, so without a live status it would be silently assumed fine.
        if kind in ("unresolved-path", "generated") and live:
            kind, detail, status, final_url = classify_live(url, resolver, docs_root)
        totals[kind.replace("-", "_")] += 1
        if kind in ("ok", "templated", "generated"):
            continue
        path, anchor, _ = split_url(url)
        findings.append({**entry, "path": path, "anchor": anchor, "kind": kind,
                         "detail": detail, "http_status": status,
                         "final_url": final_url})
    return findings, totals


def post(url, payload, user, password):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data,
                                 headers={"content-type": "application/json"})
    if user or password:
        token = base64.b64encode(f"{user or ''}:{password or ''}".encode()).decode()
        req.add_header("Authorization", f"Basic {token}")
    urllib.request.urlopen(req, timeout=30).read()


def main():
    src = Path(os.environ.get("N8N_SRC", "n8n-src"))
    if not src.is_dir():
        print(f"::error::n8n checkout not found at {src}")
        return 1

    findings, totals = scan(src, live=not os.environ.get("SKIP_LIVE"))
    ctx = {
        "repo": os.environ.get("GITHUB_REPOSITORY", ""),
        "scanned_repo": os.environ.get("N8N_REPO", "n8n-io/n8n"),
        "scanned_sha": os.environ.get("N8N_SHA", ""),
        "run_id": os.environ.get("GITHUB_RUN_ID", ""),
        "run_url": os.environ.get("RUN_URL", ""),
        "checked_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    payload = build_payload(findings, totals, ctx)

    summary = summary_markdown(payload)
    print(summary)
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write(summary)

    url = os.environ.get("WEBHOOK_URL")
    if not url:
        # Same contract as lychee_report.py: a missing secret must go red, not
        # quietly pass, because delivering the report is the point of the job.
        print("::error::WEBHOOK_URL is not set (secret DOCOPS_PRODUCT_LINKS_WEBHOOK_URL); "
              "report not sent to n8n.")
        return 1
    try:
        post(url, payload, os.environ.get("WEBHOOK_USER"), os.environ.get("WEBHOOK_PASSWORD"))
    except Exception as e:  # noqa: BLE001 - any delivery failure must go red
        print(f"::error::POST to the DocOps webhook failed: {e}")
        return 1
    print(f"Report sent to n8n: {totals.get('dead', 0)} dead, "
          f"{totals['broken_anchor']} broken anchor(s), "
          f"{totals.get('redirect_reliant', 0)} redirect-reliant, "
          f"{len(payload['findings'])} rows.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
