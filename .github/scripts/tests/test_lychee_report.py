#!/usr/bin/env python3
"""Network-free tests for the pure helpers in lychee_report.py.

The POST and the GitHub environment are not exercised here; these cover how a lychee
JSON report is flattened into the payload the n8n webhook expects.

Run: python3 .github/scripts/tests/test_lychee_report.py
"""
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "lychee_report.py"
FIXTURE = HERE / "fixtures" / "lychee" / "out.json"

spec = importlib.util.spec_from_file_location("lychee_report", SCRIPT)
lr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lr)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


stats = json.loads(FIXTURE.read_text(encoding="utf-8"))
ctx = {
    "repo": "n8n-io/n8n-docs", "run_id": "123", "run_url": "https://github.com/x/y/actions/runs/123",
    "sha": "abc", "checked_at": "2026-09-14T07:20:00Z", "exit_code": 2, "report_found": True,
}

# --- flatten_failures -------------------------------------------------------------
failures = lr.flatten_failures(stats)
check("flatten: de-duplicates the same page+url across maps", len(failures) == 4)
check("flatten: strips the leading ./ from pages",
      all(not f["page"].startswith("./") for f in failures))
check("flatten: sorted by page then url",
      [f["page"] for f in failures] == sorted(f["page"] for f in failures))
airtable = [f for f in failures if f["page"].endswith("airtable.md")]
check("flatten: object status gives numeric code and text",
      airtable[0]["status"] == 404 and "Not Found" in airtable[0]["message"])
wise = [f for f in failures if f["page"].endswith("wise.md")][0]
check("flatten: string status is parsed into a code", wise["status"] == 404 and wise["message"] == "404 Not Found")
timeout = [f for f in failures if f["url"].startswith("https://slow.")][0]
check("flatten: timeout without a code keeps status None", timeout["status"] is None and timeout["message"] == "Timeout")

# --- parse_status -----------------------------------------------------------------
check("parse_status: non-numeric code becomes None", lr.parse_status({"status": {"code": "x", "text": "?"}}) == (None, "?"))
check("parse_status: missing status", lr.parse_status({}) == (None, ""))

# --- build_payload ----------------------------------------------------------------
payload = lr.build_payload(stats, ctx)
check("payload: source and run metadata",
      payload["source"] == "lychee-weekly" and payload["run_id"] == "123" and payload["sha"] == "abc")
check("payload: totals map lychee 'excludes' to 'excluded'",
      payload["totals"] == {"total": 120, "successful": 100, "excluded": 16, "timeouts": 1, "errors": 3})
check("payload: failures included and not truncated",
      len(payload["failures"]) == 4 and payload["failures_truncated"] is False)
check("payload: exit code passed through", payload["lychee_exit_code"] == 2)

# fallback to fail_map (older lychee) and errors derived from the map when the counter is absent
old = {"total": 5, "fail_map": {"./docs/a.md": [{"url": "https://x/1", "status": "500 Internal Server Error"}]}}
old_payload = lr.build_payload(old, ctx)
check("payload: fail_map fallback is read", old_payload["failures"][0]["url"] == "https://x/1")
check("payload: errors derived from failures when lychee has no counter", old_payload["totals"]["errors"] == 1)

# missing report -> empty totals, still a valid payload
missing = lr.build_payload(None, dict(ctx, report_found=False, exit_code=1))
check("payload: missing report yields zero totals and report_found False",
      missing["totals"]["total"] == 0 and missing["failures"] == [] and missing["report_found"] is False)

# truncation cap
big = {"error_map": {"./docs/big.md": [{"url": f"https://x/{i}", "status": "404"} for i in range(lr.MAX_FAILURES + 7)]}}
big_payload = lr.build_payload(big, ctx)
check("payload: caps failures at MAX_FAILURES and flags truncation",
      len(big_payload["failures"]) == lr.MAX_FAILURES and big_payload["failures_truncated"] is True)

# --- summary_markdown -------------------------------------------------------------
summary = lr.summary_markdown(payload)
check("summary: mentions counts", "Checked: 120" in summary and "Broken: 3" in summary)
check("summary: lists pages with counts", "airtable.md` | 2" in summary)
check("summary: missing report explained", "did not produce a report" in lr.summary_markdown(missing))

# --- report ------------------------------------------------------------------------
failed = [name for name, ok in checks if not ok]
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"\n{len(checks) - len(failed)}/{len(checks)} checks passed")
raise SystemExit(1 if failed else 0)
