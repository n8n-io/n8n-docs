#!/usr/bin/env python3
"""Network-free tests for the pure helpers in internal_links_report.py.

The fixture is the real shape check_internal_links.py --json emits, built from the
findings PR #5557 surfaced plus the reusable-content one that had been invisible until
DOC-2396 brought that space into scope.

Run: python3 .github/scripts/tests/test_internal_links_report.py
"""
import ast
import importlib.util
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "internal_links_report.py"
CHECKER = HERE.parent / "check_internal_links.py"
FIXTURE = HERE / "fixtures" / "internal_links" / "out.json"

spec = importlib.util.spec_from_file_location("internal_links_report", SCRIPT)
ilr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ilr)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


report = json.loads(FIXTURE.read_text(encoding="utf-8"))
ctx = {
    "repo": "n8n-io/n8n-docs", "run_id": "321",
    "run_url": "https://github.com/x/y/actions/runs/321",
    "sha": "def", "checked_at": "2026-10-12T08:18:00Z", "report_found": True,
}

# --- every category the checker can emit must have a severity ----------------------
# Without this, a new category added to check_internal_links.py silently sorts to the
# bottom of every report and nobody notices it is being de-prioritised.
src = CHECKER.read_text(encoding="utf-8")
emitted = {
    n.value.elts[0].value
    for n in ast.walk(ast.parse(src))
    if isinstance(n, ast.Return) and isinstance(n.value, ast.Tuple) and n.value.elts
    and isinstance(n.value.elts[0], ast.Constant) and isinstance(n.value.elts[0].value, str)
}
emitted |= set(re.findall(r'\("(cross-space-broken)"', src))
check("severity table covers every category the checker emits",
      not (emitted - set(ilr.SEVERITY)))
check("severity table has no stale entries", not (set(ilr.SEVERITY) - emitted))

# --- order_findings ----------------------------------------------------------------
ordered = ilr.order_findings(report["findings"])
check("order: errors come before warnings",
      [f["severity"] for f in ordered] == ["error"] * 4 + ["warning"])
check("order: the dead cross-space link is first",
      ordered[0]["category"] == "cross-space-broken")
check("order: ties are stable by page then line",
      [f["line"] for f in ordered if f["category"] == "same-space-absolute"] == [89, 91])
check("order: an unknown category sorts last rather than crashing",
      ilr.order_findings([{"category": "brand-new", "severity": "error", "page": "a", "line": 1},
                          {"category": "missing-target", "severity": "error", "page": "a", "line": 2}]
                         )[0]["category"] == "missing-target")

# --- build_payload ------------------------------------------------------------------
payload = ilr.build_payload(report, ctx)
check("payload: source and run metadata",
      payload["source"] == "internal-links-weekly" and payload["run_id"] == "321"
      and payload["sha"] == "def")
check("payload: totals carry scan size, errors and warnings",
      payload["totals"]["files_scanned"] == 1464
      and payload["totals"]["errors"] == 4
      and payload["totals"]["warnings"] == 1
      and payload["totals"]["findings"] == 5)
check("payload: category breakdown passed through",
      payload["totals"]["by_category"]["same-space-absolute"] == 2)
check("payload: strict_anchors reflected", payload["strict_anchors"] is False)
check("payload: findings not truncated", payload["findings_truncated"] is False)

big = {"files_scanned": 1, "errors": ilr.MAX_FINDINGS + 5, "warnings": 0, "counts": {},
       "findings": [{"page": "docs/a.md", "line": i, "category": "missing-target",
                     "message": "x", "severity": "error"}
                    for i in range(ilr.MAX_FINDINGS + 5)]}
big_payload = ilr.build_payload(big, ctx)
check("payload: caps findings and flags truncation",
      len(big_payload["findings"]) == ilr.MAX_FINDINGS
      and big_payload["findings_truncated"] is True)

missing = ilr.build_payload(None, dict(ctx, report_found=False))
check("payload: missing report yields zero totals and report_found False",
      missing["totals"]["files_scanned"] == 0 and missing["findings"] == []
      and missing["report_found"] is False)

# --- summary_markdown ----------------------------------------------------------------
summary = ilr.summary_markdown(payload)
check("summary: reports scan size and counts",
      "Scanned: 1464" in summary and "Broken: 4" in summary and "warnings: 1" in summary)
check("summary: breaks down by category", "same-space-absolute=2" in summary)
check("summary: tabulates the findings",
      "| Page | Line | Category | Detail |" in summary and "workflow-development.md" in summary)
check("summary: a pipe in a message does not break the table",
      "\\|" in ilr.summary_markdown(ilr.build_payload(
          {"files_scanned": 1, "errors": 1, "warnings": 0, "counts": {},
           "findings": [{"page": "docs/a.md", "line": 1, "category": "missing-target",
                         "message": "a | b", "severity": "error"}]}, ctx)))
check("summary: missing report explained",
      "did not produce a report" in ilr.summary_markdown(missing))

# --- report ------------------------------------------------------------------------
failed = [name for name, ok in checks if not ok]
for name, ok in checks:
    print(("PASS " if ok else "FAIL ") + name)
print(f"\n{len(checks) - len(failed)}/{len(checks)} checks passed")
raise SystemExit(1 if failed else 0)
