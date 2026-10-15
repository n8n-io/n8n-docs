#!/usr/bin/env python3
"""Send the weekly site-wide internal-link sweep to the DocOps n8n webhook (DOC-2396).

`internal-links.yml` only ever sees the markdown changed in a PR, and lychee cannot
cover the gap: `lychee.toml` sets `base = "https://docs.n8n.io"`, which rewrites every
relative link into a docs.n8n.io URL, and then excludes that host. So nothing checked
internal links across the whole site on a schedule. A broken link that landed on main
stayed invisible until some PR happened to touch its page again.

That is how PR #5557 found three internal-link breakages that had been sitting on main:
it touched 1,318 pages at once, which was the first site-wide scan the repo had ever run.

Same split as lychee: `check_internal_links.py --json` finds, this script delivers.
Called by .github/workflows/internal-links-sweep.yml.

Exit codes: 0 = report delivered; 1 = the report file is missing (the checker crashed),
the webhook URL is not configured, or the POST failed. Broken links alone never fail the
job: n8n owns the alerting, same contract as lychee_report.py and product_links_report.py.

Config comes from the environment (see the workflow):
  REPORT (path to the checker JSON, default internal-links/out.json), RUN_URL,
  WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD, plus GITHUB_REPOSITORY /
  GITHUB_RUN_ID / GITHUB_SHA / GITHUB_STEP_SUMMARY set by Actions.
"""

import base64
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

MAX_FINDINGS = 500

# Report order. The categories that are a dead link today come first; the ones that
# still render but will break on the next rename come last. Mirrors the SEVERITY idea
# in product_links_report.py so the two reports read the same way.
SEVERITY = {
    "cross-space-broken": 0,
    "missing-target": 1,
    "absolute-path": 2,
    "same-space-absolute": 3,
    "missing-asset": 4,
    "no-md-extension": 5,
    "cross-space-relative": 6,
    "broken-anchor": 7,
    "empty-anchor": 8,
}

# --------------------------------------------------------------------- pure helpers
# No I/O here so the tests can cover them.


def _int(value):
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def order_findings(findings):
    """Most actionable first, then stable by page and line so two runs diff cleanly."""
    return sorted(
        findings or [],
        key=lambda f: (
            0 if f.get("severity") == "error" else 1,
            SEVERITY.get(f.get("category", ""), 99),
            str(f.get("page", "")),
            _int(f.get("line")),
        ),
    )


def build_payload(report, ctx):
    """The contract between this Action and the n8n webhook. `report` is the parsed
    checker JSON (or {} when it is missing); `ctx` carries run metadata."""
    report = report or {}
    findings = order_findings(report.get("findings"))
    totals = {
        "files_scanned": _int(report.get("files_scanned")),
        "errors": _int(report.get("errors")),
        "warnings": _int(report.get("warnings")),
        "findings": len(findings),
        "by_category": dict(report.get("counts") or {}),
    }
    return {
        "source": "internal-links-weekly",
        "repo": ctx.get("repo", ""),
        "run_id": ctx.get("run_id", ""),
        "run_url": ctx.get("run_url", ""),
        "sha": ctx.get("sha", ""),
        "checked_at": ctx.get("checked_at", ""),
        "strict_anchors": bool(report.get("strict_anchors")),
        "report_found": bool(ctx.get("report_found", True)),
        "totals": totals,
        "findings": findings[:MAX_FINDINGS],
        "findings_truncated": len(findings) > MAX_FINDINGS,
    }


def summary_markdown(payload):
    """Short job summary so the run page is readable without opening n8n."""
    t = payload["totals"]
    lines = ["## Internal links (site-wide sweep)", ""]
    if not payload.get("report_found", True):
        lines.append("The checker did not produce a report.")
        return "\n".join(lines) + "\n"
    lines.append(f"- Scanned: {t['files_scanned']} page(s)")
    lines.append(f"- **Broken: {t['errors']}** | warnings: {t['warnings']}")
    if t["by_category"]:
        lines.append("- By category: " + ", ".join(
            f"{k}={v}" for k, v in sorted(t["by_category"].items())))
    if payload["findings"]:
        lines += ["", "| Page | Line | Category | Detail |", "|---|---|---|---|"]
        for f in payload["findings"][:25]:
            detail = str(f.get("message", "")).replace("|", "\\|")
            lines.append(f"| `{f.get('page', '')}` | {f.get('line', '')} | "
                         f"{f.get('category', '')} | {detail} |")
    if payload.get("findings_truncated"):
        lines += ["", f"Only the first {MAX_FINDINGS} findings were sent to n8n."]
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------- I/O

def post(url, payload, user, password):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data,
                                 headers={"content-type": "application/json"})
    if user or password:
        token = base64.b64encode(f"{user or ''}:{password or ''}".encode()).decode()
        req.add_header("Authorization", f"Basic {token}")
    urllib.request.urlopen(req, timeout=30).read()


def main():
    report_path = Path(os.environ.get("REPORT", "internal-links/out.json"))
    report = None
    if report_path.is_file():
        try:
            report = json.loads(report_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            print(f"::error::internal-link report at {report_path} is not valid JSON: {e}")
    else:
        print(f"::error::internal-link report not found at {report_path} "
              "(did check_internal_links.py crash?)")

    ctx = {
        "repo": os.environ.get("GITHUB_REPOSITORY", ""),
        "run_id": os.environ.get("GITHUB_RUN_ID", ""),
        "run_url": os.environ.get("RUN_URL", ""),
        "sha": os.environ.get("GITHUB_SHA", ""),
        "checked_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "report_found": report is not None,
    }
    payload = build_payload(report, ctx)

    summary = summary_markdown(payload)
    print(summary)
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write(summary)

    url = os.environ.get("WEBHOOK_URL")
    if not url:
        # Same contract as lychee_report.py: a missing secret must go red, not quietly
        # pass, because delivering the report is the whole point of the job.
        print("::error::WEBHOOK_URL is not set (secret DOCOPS_INTERNAL_LINKS_WEBHOOK_URL); "
              "report not sent to n8n.")
        return 1

    try:
        post(url, payload, os.environ.get("WEBHOOK_USER"), os.environ.get("WEBHOOK_PASSWORD"))
    except Exception as e:  # noqa: BLE001 - any delivery failure must go red
        print(f"::error::POST to the DocOps webhook failed: {e}")
        return 1
    print(f"Report sent to n8n: {payload['totals']['errors']} broken internal link(s), "
          f"{len(payload['findings'])} rows.")
    return 0 if report is not None else 1


if __name__ == "__main__":
    sys.exit(main())
