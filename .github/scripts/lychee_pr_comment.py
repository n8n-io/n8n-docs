#!/usr/bin/env python3
"""Render the PR comment for the external link check (.github/workflows/lychee-pr-check.yml).

lychee's own markdown output was posted as-is: a bare `# Summary` heading, a stats table,
repo file paths, and redirect URLs full of Google bot-check tokens as the reason. This
reads lychee's JSON report instead and writes a comment a contributor can act on: a title,
one summary line, a fix hint, and the broken links grouped under each page's title and live
URL with a short reason (DOC-2526).

Cosmetic only: it does not decide pass/fail. The workflow still fails on lychee's exit code.

Config comes from the environment:
  REPORT (lychee JSON, default lychee/out.json), OUTPUT (default lychee/comment.md),
  RUN_URL (link to the Actions run), plus GITHUB_STEP_SUMMARY set by Actions.

Run from the repo root: page titles are read from the checked-out docs.
"""

import http.client
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from gitbook_preview_links import md_escape, page_title  # noqa: E402
from lychee_report import flatten_failures  # noqa: E402

PROD_BASE = "https://docs.n8n.io/"
# GitBook publishes this space at the site root (docs.n8n.io/), every other space under
# its folder name. Reusable content is a private space with no pages of its own.
ROOT_SPACE = "get-started"
PRIVATE_SPACES = frozenset({"reusable-content"})
COLLAPSE_AFTER = 10  # links; past this the page list goes in a <details> block

GOOGLE_WALL_RE = re.compile(r"google\.com/sorry|google_abuse=", re.I)
GOOGLE_WALL = "Blocked by Google's bot check"


# --------------------------------------------------------------------- pure helpers


def live_url(page):
    """Live docs URL for a repo path, or None when the page isn't published on its own."""
    parts = page.split("/")
    if len(parts) < 3 or parts[0] != "docs" or parts[1] in PRIVATE_SPACES:
        return None
    if any(p.startswith(".") for p in parts):  # .gitbook/includes and friends
        return None
    space = parts[1]
    rel = re.sub(r"\.md$", "", "/".join(parts[2:]))
    rel = re.sub(r"(^|/)README$", "", rel).strip("/")
    base = PROD_BASE if space == ROOT_SPACE else f"{PROD_BASE}{space}/"
    return base + rel


def short_reason(code, message):
    """One short, plain reason instead of lychee's raw error text."""
    message = message or ""
    if GOOGLE_WALL_RE.search(message):
        return GOOGLE_WALL
    if code:
        phrase = http.client.responses.get(code)
        return f"{code} {phrase}" if phrase else str(code)
    low = message.lower()
    if "too many redirects" in low:
        return "Too many redirects"
    if "timeout" in low or "timed out" in low:
        return "Timed out"
    if "dns" in low or "failed to lookup" in low or "connect" in low:
        return "Could not connect"
    if "certificate" in low or "tls" in low or "ssl" in low:
        return "TLS certificate error"
    # Drop any URL lychee quoted in the message: the link itself is already shown.
    text = re.sub(r"\s*\(?https?://\S+\)?", "", message).strip(" :|")
    text = re.sub(r"\s+", " ", text)
    if not text or text.lower().endswith("(cached)"):
        return "Error"
    return text if len(text) <= 80 else text[:77] + "..."


def classify(failures):
    """Add a `reason` to each failure. lychee reports a URL it already failed once as
    "Error (cached)"; give it the reason from the first sighting instead."""
    by_url = {}
    for f in failures:
        reason = short_reason(f["status"], f["message"])
        if reason != "Error":
            by_url.setdefault(f["url"], reason)
    out = []
    for f in failures:
        reason = short_reason(f["status"], f["message"])
        if reason == "Error":
            reason = by_url.get(f["url"], reason)
        out.append({**f, "reason": reason})
    return out


def safe_url(url):
    """Keep a PR-controlled URL from closing the autolink it sits in."""
    return url.replace("<", "%3C").replace(">", "%3E").replace(" ", "%20")


def _plural(n, word):
    return f"{n} {word}" if n == 1 else f"{n} {word}s"


def render(failures, titles, run_url="", lychee_failed=True):
    """The comment body. `titles` maps repo path -> page title; missing paths fall back
    to the file name."""
    if not failures:
        if not lychee_failed:
            return ""
        # lychee exited non-zero but reported no broken link: it crashed or hit a config
        # problem. Say so instead of posting an empty list.
        lines = ["## 🔗 External link check", "",
                 "The link checker failed before it could report any broken links."]
        if run_url:
            lines += ["", f"See the [Actions log]({run_url}) for the error."]
        return "\n".join(lines) + "\n"

    failures = classify(failures)
    pages = {}
    for f in failures:
        pages.setdefault(f["page"], []).append(f)

    counts = {}
    for f in failures:
        counts[f["reason"]] = counts.get(f["reason"], 0) + 1
    breakdown = ", ".join(f"{n} × {reason}"
                          for reason, n in sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])))

    lines = [
        f"## 🔗 External link check: {_plural(len(failures), 'broken link')} "
        f"on {_plural(len(pages), 'page')}",
        "",
        "This check reads every external link on the pages this PR changes, so some of "
        "these links may have been broken before this PR.",
        "",
        f"**Reasons:** {breakdown}",
        "",
        "**How to fix:** update or remove each link. If a link opens fine in a browser, the "
        "host is blocking automated checks: add it to `exclude` in `lychee.toml` with a "
        "dated note.",
        "",
    ]

    collapse = len(failures) > COLLAPSE_AFTER
    if collapse:
        lines += [f"<details><summary>Show the {_plural(len(failures), 'link')}</summary>", ""]
    # Pages with a real failure first, so a 404 isn't buried under a run of bot blocks.
    def only_walls(page):
        return all(f["reason"] == GOOGLE_WALL for f in pages[page])

    for page in sorted(pages, key=lambda p: (only_walls(p), p)):
        title = md_escape(titles.get(page) or Path(page).stem)
        url = live_url(page)
        heading = f"[{title}]({url})" if url else title
        lines += [f"#### {heading}", f"`{page}`", ""]
        for f in sorted(pages[page], key=lambda f: (f["reason"], f["url"])):
            lines.append(f"- <{safe_url(f['url'])}> · {f['reason']}")
        lines.append("")
    if collapse:
        lines += ["</details>", ""]
    if run_url:
        lines.append(f"[Full lychee output]({run_url})")
    return "\n".join(lines).rstrip() + "\n"


# --------------------------------------------------------------------- I/O


def title_for(page):
    path = Path(page)
    parts = page.split("/")
    rel = re.sub(r"\.md$", "", "/".join(parts[2:])) if len(parts) > 2 else path.stem
    return page_title(path, rel)


def main():
    report = Path(os.environ.get("REPORT", "lychee/out.json"))
    output = Path(os.environ.get("OUTPUT", "lychee/comment.md"))
    run_url = os.environ.get("RUN_URL", "")
    lychee_failed = os.environ.get("EXIT_CODE", "1") != "0"

    try:
        stats = json.loads(report.read_text(encoding="utf-8"))
    except (OSError, ValueError) as err:
        print(f"Could not read the lychee report at {report}: {err}", file=sys.stderr)
        stats = {}

    failures = flatten_failures(stats)
    titles = {f["page"]: title_for(f["page"]) for f in failures}
    body = render(failures, titles, run_url, lychee_failed)

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(body, encoding="utf-8")
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary and body:
        with open(summary, "a", encoding="utf-8") as fh:
            fh.write(body)
    print(body or "No broken links.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
