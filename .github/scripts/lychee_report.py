#!/usr/bin/env python3
"""Send the weekly lychee external-link sweep to the DocOps n8n webhook.

Called by .github/workflows/lychee.yml after lycheeverse/lychee-action has written its
JSON report. lychee itself no longer fails that job (`fail: false`); this script turns the
report into one payload for n8n, which alerts Slack, adds a dated tab to the
"DocOps - Outbound Links" Google Sheet and stores the rows in Supabase (DOC-2307).

Exit codes: 0 = report delivered (or no webhook configured); 1 = the report file is
missing (lychee crashed) or the POST failed. Broken links alone never fail the job: n8n
owns the alerting.

Config comes from the environment (see the workflow):
  REPORT (path to lychee JSON, default lychee/out.json), EXIT_CODE (lychee-action
  exit_code output), RUN_URL, WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD,
  plus GITHUB_REPOSITORY / GITHUB_RUN_ID / GITHUB_SHA / GITHUB_STEP_SUMMARY set by Actions.
"""

import base64
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# lychee renamed its failure map across versions; read every spelling we know.
MAP_KEYS = ("error_map", "fail_map", "timeout_map")
MAX_FAILURES = 500

# --------------------------------------------------------------------- pure helpers
# No I/O here so the tests can cover them.


def parse_status(entry):
    """Return (code or None, message) from a lychee failure entry.

    lychee writes `status` either as an object ({"text": "...", "code": 404}) or, in
    older versions, as a plain string like "404 Not Found"."""
    status = entry.get("status") if isinstance(entry, dict) else None
    if isinstance(status, dict):
        code = status.get("code")
        try:
            code = int(code) if code is not None else None
        except (TypeError, ValueError):
            code = None
        text = status.get("text") or status.get("details") or ""
        return code, str(text)
    if isinstance(status, str):
        parts = status.split()
        code = int(parts[0]) if parts and parts[0].isdigit() else None
        return code, status
    return None, ""


def flatten_failures(stats):
    """One flat, de-duplicated, sorted list of {page, url, status, message}."""
    seen = set()
    out = []
    for key in MAP_KEYS:
        failure_map = (stats or {}).get(key) or {}
        if not isinstance(failure_map, dict):
            continue
        for page, entries in failure_map.items():
            page = str(page)
            if page.startswith("./"):
                page = page[2:]
            for entry in entries or []:
                url = entry.get("url") if isinstance(entry, dict) else str(entry)
                if not url or (page, url) in seen:
                    continue
                seen.add((page, url))
                code, message = parse_status(entry)
                out.append({"page": page, "url": url, "status": code, "message": message})
    out.sort(key=lambda f: (f["page"], f["url"]))
    return out


def _int(value):
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def build_payload(stats, ctx):
    """The contract between this Action and the n8n webhook. `stats` is the parsed
    lychee JSON (or {} when the report is missing); `ctx` carries run metadata."""
    stats = stats or {}
    failures = flatten_failures(stats)
    errors = stats.get("errors")
    totals = {
        "total": _int(stats.get("total")),
        "successful": _int(stats.get("successful")),
        "excluded": _int(stats.get("excludes", stats.get("excluded"))),
        "timeouts": _int(stats.get("timeouts")),
        "errors": _int(errors) if errors is not None else len(failures),
    }
    return {
        "source": "lychee-weekly",
        "repo": ctx.get("repo", ""),
        "run_id": ctx.get("run_id", ""),
        "run_url": ctx.get("run_url", ""),
        "sha": ctx.get("sha", ""),
        "checked_at": ctx.get("checked_at", ""),
        "lychee_exit_code": ctx.get("exit_code"),
        "report_found": bool(ctx.get("report_found", True)),
        "totals": totals,
        "failures": failures[:MAX_FAILURES],
        "failures_truncated": len(failures) > MAX_FAILURES,
    }


def summary_markdown(payload):
    """Short job summary so the run page is readable without opening n8n."""
    t = payload["totals"]
    lines = ["## Lychee external links", ""]
    if not payload.get("report_found", True):
        lines.append("Lychee did not produce a report "
                     f"(exit code {payload.get('lychee_exit_code')}).")
        return "\n".join(lines) + "\n"
    lines.append(f"- Checked: {t['total']} (excluded {t['excluded']}, "
                 f"successful {t['successful']}, timeouts {t['timeouts']})")
    lines.append(f"- Broken: {t['errors']}")
    pages = {}
    for f in payload["failures"]:
        pages[f["page"]] = pages.get(f["page"], 0) + 1
    if pages:
        lines.append("")
        lines.append("| Page | Broken links |")
        lines.append("|---|---|")
        for page, count in sorted(pages.items(), key=lambda kv: (-kv[1], kv[0]))[:20]:
            lines.append(f"| `{page}` | {count} |")
    if payload.get("failures_truncated"):
        lines.append("")
        lines.append(f"Only the first {MAX_FAILURES} broken links were sent to n8n.")
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
    report = Path(os.environ.get("REPORT", "lychee/out.json"))
    stats = None
    if report.is_file():
        try:
            stats = json.loads(report.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            print(f"::error::lychee report at {report} is not valid JSON: {e}")
    else:
        print(f"::error::lychee report not found at {report} (did lychee crash?)")

    exit_code = os.environ.get("EXIT_CODE", "")
    ctx = {
        "repo": os.environ.get("GITHUB_REPOSITORY", ""),
        "run_id": os.environ.get("GITHUB_RUN_ID", ""),
        "run_url": os.environ.get("RUN_URL", ""),
        "sha": os.environ.get("GITHUB_SHA", ""),
        "checked_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "exit_code": int(exit_code) if exit_code.isdigit() else None,
        "report_found": stats is not None,
    }
    payload = build_payload(stats, ctx)

    summary = summary_markdown(payload)
    print(summary)
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write(summary)

    url = os.environ.get("WEBHOOK_URL")
    if not url:
        print("::warning::WEBHOOK_URL not set; report not sent to n8n.")
        return 0 if stats is not None else 1

    try:
        post(url, payload, os.environ.get("WEBHOOK_USER"), os.environ.get("WEBHOOK_PASSWORD"))
    except Exception as e:  # noqa: BLE001 - any delivery failure must go red
        print(f"::error::POST to the DocOps webhook failed: {e}")
        return 1
    print(f"Report sent to n8n: {payload['totals']['errors']} broken link(s), "
          f"{len(payload['failures'])} rows.")
    return 0 if stats is not None else 1


if __name__ == "__main__":
    sys.exit(main())
