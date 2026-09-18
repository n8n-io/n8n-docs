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

Resolution is offline and therefore exact on anchors, which is the point: the
bug that raised this (n8n-io/n8n#38992, a Slack credential notice pointing at
`#using-oauth` when the heading id is `using-oauth2`) is invisible to any
checker that only looks at HTTP status. Anchors are resolved with
`check_internal_links.heading_ids`, so this checker and the in-repo one agree
on slugs by construction.

Each URL lands in one of these buckets:
  ok              path resolves to a docs file, and the anchor (if any) matches.
  broken-anchor   page exists, no heading carries that id. Actionable now.
  empty-anchor    link ends in a bare '#'.
  unresolved-path no file backs the path. Either genuinely dead or alive only
                  because a GitBook redirect catches it -- this script cannot
                  tell which, so n8n live-checks these and splits them into
                  `dead` and `redirect-reliant`.
  templated       URL is built at runtime (`${...}`); not checkable. Counted
                  only, never reported as a finding.

Exit codes: 0 = report delivered; 1 = the n8n checkout is missing, the webhook
URL is not configured, or the POST failed. Broken links alone never fail the
job: n8n owns the alerting, same contract as lychee_report.py.

Config comes from the environment (see the workflow):
  N8N_SRC (path to the n8n checkout, default `n8n-src`), N8N_SHA, RUN_URL,
  WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD, plus GITHUB_REPOSITORY /
  GITHUB_RUN_ID / GITHUB_STEP_SUMMARY set by Actions.
"""

from __future__ import annotations

import base64
import json
import os
import re
import sys
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


def classify(url, docs_root=None):
    """Return (kind, detail) for one extracted URL."""
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
                f"no page in n8n-docs backs /{path}; live check decides dead vs redirect")
    if not has_fragment:
        return "ok", ""
    if anchor == "":
        return "empty-anchor", "link ends in a bare '#' with no anchor"
    explicit, slugs, resolved = heading_ids(page)
    if anchor in explicit or anchor in slugs or not resolved:
        # Unresolved includes or a heading with no explicit id: stay quiet
        # rather than guess, same policy as check_internal_links.
        return "ok", ""
    rel = page.relative_to(REPO_ROOT).as_posix() if page.is_relative_to(REPO_ROOT) else str(page)
    near = sorted(a for a in explicit if anchor.split("-")[0] and a.startswith(anchor.split("-")[0]))
    hint = f"; did you mean #{near[0]}?" if near else ""
    return "broken-anchor", f"no heading with id '{anchor}' on {rel}{hint}"


def build_payload(findings, totals, ctx):
    """The contract between this Action and the n8n webhook."""
    ordered = sorted(
        findings,
        key=lambda f: ({"broken-anchor": 0, "empty-anchor": 1, "unresolved-path": 2}.get(f["kind"], 9),
                       -f["occurrences"], f["url"]),
    )
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
    lines.append(f"- Broken anchors: {t['broken_anchor']}")
    lines.append(f"- Unresolved paths (n8n decides dead vs redirect-reliant): {t['unresolved_path']}")
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

def scan(src_root):
    """Walk the n8n checkout and return (findings, totals)."""
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
                entry = seen.setdefault(url, {"url": url, "occurrences": 0, "locations": []})
                entry["occurrences"] += 1
                if len(entry["locations"]) < MAX_LOCATIONS:
                    entry["locations"].append(f"{rel}:{lineno}")

    totals = {"files_scanned": files_scanned, "occurrences": occurrences,
              "unique_urls": len(seen), "ok": 0, "broken_anchor": 0,
              "unresolved_path": 0, "empty_anchor": 0, "templated": 0,
              "generated": 0}
    findings = []
    for entry in seen.values():
        kind, detail = classify(entry["url"])
        totals[kind.replace("-", "_")] += 1
        if kind in ("ok", "templated", "generated"):
            continue
        path, anchor, _ = split_url(entry["url"])
        findings.append({**entry, "path": path, "anchor": anchor,
                         "kind": kind, "detail": detail})
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

    findings, totals = scan(src)
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
    print(f"Report sent to n8n: {totals['broken_anchor']} broken anchor(s), "
          f"{totals['unresolved_path']} unresolved path(s), {len(payload['findings'])} rows.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
