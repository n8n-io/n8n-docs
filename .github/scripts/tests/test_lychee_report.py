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
check("payload: totals map lychee 'excludes' to 'excluded'; errors = delivered rows (incl. timeouts), lychee's own counter kept",
      payload["totals"] == {"total": 120, "successful": 100, "excluded": 16, "timeouts": 1,
                            "errors": 3, "blocked": 1, "lychee_errors": 3})
check("payload: failures included and not truncated",
      len(payload["failures"]) == 3 and payload["failures_truncated"] is False)

# 401/403/407/429 are the host refusing a bot, not a dead link. They are split out so
# they stay visible without inflating the broken count (DOC-2396); before this they sat
# in lychee.toml `accept` and were reported as healthy.
check("payload: blocked statuses are split out of failures",
      [f["url"] for f in payload["blocked"]] == ["https://www.npmjs.com/package/pg"])
check("payload: blocked links are not in failures",
      all(f["status"] not in lr.BLOCKED_STATUSES for f in payload["failures"]))
check("payload: blocked truncation flag present",
      payload["blocked_truncated"] is False)
rate_limited = lr.build_payload(
    {"error_map": {"./docs/a.md": [{"url": "https://x/1", "status": {"code": 429, "text": "Too Many Requests"}}]}}, ctx)
check("payload: 429 counts as blocked, not broken",
      rate_limited["totals"]["errors"] == 0 and rate_limited["totals"]["blocked"] == 1)
check("payload: exit code passed through", payload["lychee_exit_code"] == 2)

# fallback to fail_map (older lychee) and errors derived from the map when the counter is absent
old = {"total": 5, "fail_map": {"./docs/a.md": [{"url": "https://x/1", "status": "500 Internal Server Error"}]}}
old_payload = lr.build_payload(old, ctx)
check("payload: fail_map fallback is read", old_payload["failures"][0]["url"] == "https://x/1")
check("payload: errors equal delivered rows even when lychee has no counter",
      old_payload["totals"]["errors"] == 1 and old_payload["totals"]["lychee_errors"] == 0)

# missing report -> empty totals, still a valid payload
missing = lr.build_payload(None, dict(ctx, report_found=False, exit_code=1))
check("payload: missing report yields zero totals and report_found False",
      missing["totals"]["total"] == 0 and missing["failures"] == [] and missing["report_found"] is False)

# truncation cap
big = {"error_map": {"./docs/big.md": [{"url": f"https://x/{i}", "status": "404"} for i in range(lr.MAX_FAILURES + 7)]}}
big_payload = lr.build_payload(big, ctx)
check("payload: caps failures at MAX_FAILURES and flags truncation",
      len(big_payload["failures"]) == lr.MAX_FAILURES and big_payload["failures_truncated"] is True)

# --- merge_quality ----------------------------------------------------------------
# The second pass (link_second_pass.py) rides along in the same payload: one POST, one
# run_id, one Slack message. Findings lychee already reported are dropped so a reader is
# told once (DOC-2396).
quality = {
    "totals": {"checked": 4118, "soft_404": 1, "redirect_reliant": 60, "dead": 2},
    "collapsed_redirects": [{"final_url": "https://docs.langchain.com/overview",
                             "count": 60, "urls": ["https://js.langchain.com/docs/p0"],
                             "pages": ["docs/p0.md"]}],
    "findings": [
        {"page": "docs/integrations/builtin/credentials/airtable.md",
         "url": "https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference",
         "kind": "dead", "detail": "already reported by lychee"},
        {"page": "docs/integrations/builtin/credentials/airtable.md",
         "url": "https://www.npmjs.com/package/pg", "kind": "blocked",
         "detail": "already in the blocked bucket"},
        {"page": "docs/a.md", "url": "https://js.langchain.com/docs/p0",
         "kind": "redirect-reliant", "detail": "only resolves via a redirect"},
    ],
}
merged = lr.merge_quality(lr.build_payload(stats, ctx), quality)
check("merge: a finding lychee already reported is dropped",
      all(f["url"] != "https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference"
          for f in merged["quality"]))
check("merge: a finding already in the blocked bucket is dropped",
      all(f["url"] != "https://www.npmjs.com/package/pg" for f in merged["quality"]))
check("merge: a genuinely new finding is kept",
      [f["url"] for f in merged["quality"]] == ["https://js.langchain.com/docs/p0"])
check("merge: second-pass totals are folded in",
      merged["totals"]["soft_404"] == 1 and merged["totals"]["redirect_reliant"] == 60
      and merged["totals"]["quality_checked"] == 4118)
check("merge: the collapse group is carried through",
      merged["collapsed_redirects"][0]["count"] == 60)
check("merge: lychee's own counts are untouched",
      merged["totals"]["errors"] == 3 and merged["totals"]["blocked"] == 1)
check("merge: no second-pass report leaves the payload alone",
      "quality" not in lr.merge_quality(lr.build_payload(stats, ctx), None))
# A URL lychee could only call `blocked` is the case the second pass exists for: lychee
# never got past the WAF. If the second pass proves it dead, that must not be swallowed.
promote = {
    "totals": {"checked": 10, "dead": 1},
    "findings": [
        {"page": "docs/integrations/builtin/credentials/airtable.md",
         "url": "https://www.npmjs.com/package/pg", "kind": "dead",
         "detail": "returns 404 to a browser user agent"},
    ],
}
promoted = lr.merge_quality(lr.build_payload(stats, ctx), promote)
check("merge: a second-pass 'dead' beats lychee's 'blocked' instead of being dropped",
      [f["url"] for f in promoted["quality"]] == ["https://www.npmjs.com/package/pg"])
check("merge: the superseded blocked row is withdrawn, so one url carries one answer",
      all(f["url"] != "https://www.npmjs.com/package/pg" for f in promoted["blocked"]))
check("merge: the blocked total follows the withdrawal",
      promoted["totals"]["blocked"] == len(promoted["blocked"]) == 0)
check("merge: a promoted finding keeps its own verdict rather than lychee's",
      [f["kind"] for f in promoted["quality"]] == ["dead"])

# The second pass deduplicates by URL and sets `page` to the first of its `pages`, while
# lychee emits one row per occurrence. Matching the pair only ever lined up on that first
# page, so the other blocked rows survived and the same URL was reported twice with two
# different verdicts. Three pages, one of which is NOT the one the second pass names.
multi = {
    "error_map": {
        "docs/a.md": [{"url": "https://waf.example/x", "status": {"code": 403, "text": "Forbidden"}}],
        "docs/b.md": [{"url": "https://waf.example/x", "status": {"code": 403, "text": "Forbidden"}}],
        "docs/c.md": [{"url": "https://waf.example/x", "status": {"code": 403, "text": "Forbidden"}}],
    },
    "total": 3, "successful": 0, "errors": 3,
}
multi_quality = {"totals": {"checked": 1, "dead": 1}, "findings": [
    {"page": "docs/b.md", "pages": ["docs/b.md", "docs/a.md", "docs/c.md"],
     "url": "https://waf.example/x", "kind": "dead", "detail": "404 to a browser"}]}
m = lr.merge_quality(lr.build_payload(multi, ctx), multi_quality)
check("merge: every blocked row for a promoted url is withdrawn, not just its first page",
      m["blocked"] == [])
check("merge: the blocked total drops by all three rows, not by one",
      m["totals"]["blocked"] == 0)

# Same shape, but lychee already called it broken. The reader is told once, and the page
# lychee happened to list it under must not decide that.
multi_reported = {
    "error_map": {"docs/b.md": [{"url": "https://gone.example/x",
                                 "status": {"code": 404, "text": "Not Found"}}]},
    "total": 1, "successful": 0, "errors": 1,
}
dupe = {"totals": {}, "findings": [
    {"page": "docs/a.md", "pages": ["docs/a.md", "docs/b.md"],
     "url": "https://gone.example/x", "kind": "soft-404", "detail": ""}]}
check("merge: a url lychee already reported is dropped whichever page the second pass names",
      lr.merge_quality(lr.build_payload(multi_reported, ctx), dupe)["quality"] == [])

# `blocked` is capped at MAX_FAILURES before delivery, so recounting the delivered list
# reported 500 whenever more than 500 links were blocked -- and only when a second pass
# ran, which is what made it easy to miss.
many = {
    "error_map": {f"docs/p{i}.md": [{"url": f"https://waf.example/{i}",
                                     "status": {"code": 403, "text": "Forbidden"}}]
                  for i in range(lr.MAX_FAILURES + 40)},
    "total": lr.MAX_FAILURES + 40, "successful": 0, "errors": lr.MAX_FAILURES + 40,
}
big = lr.build_payload(many, ctx)
check("build: the blocked total is the real count, not the delivered slice",
      big["totals"]["blocked"] == lr.MAX_FAILURES + 40 and big["blocked_truncated"])
merged_big = lr.merge_quality(lr.build_payload(many, ctx), {"totals": {}, "findings": []})
check("merge: a second pass that promotes nothing leaves the blocked total alone",
      merged_big["totals"]["blocked"] == lr.MAX_FAILURES + 40)

same_verdict = {"totals": {}, "findings": [
    {"page": "docs/integrations/builtin/credentials/airtable.md",
     "url": "https://www.npmjs.com/package/pg", "kind": "blocked", "detail": "403"}]}
kept_same = lr.merge_quality(lr.build_payload(stats, ctx), same_verdict)
check("merge: a second-pass 'blocked' adds nothing and is dropped",
      kept_same["quality"] == [] and len(kept_same["blocked"]) == 1)

# The second pass caps per class before sending, so our own slice is not the signal.
pre_capped = {"totals": {}, "findings_truncated": True,
              "findings": [{"page": "docs/a.md", "url": "https://x/1", "kind": "redirect-reliant", "detail": ""}]}
check("merge: the second pass's own truncation flag is preserved",
      lr.merge_quality(lr.build_payload(stats, ctx), pre_capped)["quality_truncated"] is True)

merged_summary = lr.summary_markdown(merged)
check("merge: the summary names the collapse", "all land on" in merged_summary
      and "docs.langchain.com/overview" in merged_summary)
check("merge: the summary keeps the second-pass counts",
      "Second pass" in merged_summary and "redirect-reliant: 60" in merged_summary)

# --- summary_markdown -------------------------------------------------------------
summary = lr.summary_markdown(payload)
check("summary: mentions counts (Broken = rows in the table)", "Checked: 120" in summary and "Broken: 3" in summary)
check("summary: lists pages with counts", "airtable.md` | 1" in summary)
check("summary: reports the blocked bucket separately", "Blocked by the host" in summary and "not verifiable): 1" in summary)
check("summary: missing report explained", "did not produce a report" in lr.summary_markdown(missing))

# --- BLOCKED_STATUSES, which exists twice -------------------------------------------
# link_second_pass.py keeps its own copy, because the two scripts run as separate jobs
# and neither imports the other. Two copies drift silently: a status added to one would
# be bucketed as blocked by that script and as broken by the other, in the same report.
# Read it out of the source rather than importing, so this stays network- and import-free.
_lsp_src = (HERE.parent / "link_second_pass.py").read_text(encoding="utf-8")
_m = __import__("re").search(r"BLOCKED_STATUSES = frozenset\(\{([0-9,\s]+)\}\)", _lsp_src)
check("blocked statuses: link_second_pass.py still declares the set where we can read it", bool(_m))
check("blocked statuses: the two copies have not drifted",
      bool(_m) and {int(x) for x in _m.group(1).replace(" ", "").strip(",").split(",")}
      == set(lr.BLOCKED_STATUSES))

# --- report ------------------------------------------------------------------------
failed = [name for name, ok in checks if not ok]
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"\n{len(checks) - len(failed)}/{len(checks)} checks passed")
raise SystemExit(1 if failed else 0)
