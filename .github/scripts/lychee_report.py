#!/usr/bin/env python3
"""Send the weekly lychee external-link sweep to the DocOps n8n webhook.

Called by .github/workflows/lychee.yml after lycheeverse/lychee-action has written its
JSON report. lychee itself no longer fails that job (`fail: false`); this script turns the
report into one payload for n8n, which alerts Slack, adds a dated tab to the
"DocOps - Outbound Links" Google Sheet and stores the rows in Supabase (DOC-2307).

Exit codes: 0 = report delivered; 1 = the report file is missing (lychee crashed), the
webhook URL is not configured, or the POST failed. Broken links alone never fail the job:
n8n owns the alerting.

Config comes from the environment (see the workflow):
  REPORT (path to lychee JSON, default lychee/out.json), EXIT_CODE (lychee-action
  exit_code output), RUN_URL, WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD,
  PAYLOAD_OUT (optional: also write the payload to this path), DRY_RUN ("true" = build
  and print the report, never POST it),
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

# Statuses that mean "the host refused to answer a bot", not "this link is dead".
#
# 403 used to sit in `accept` in lychee.toml, which scored it as healthy and hid it
# completely: the 2026-10-05 sweep passed 64 such links without a word. For 403 this
# bucket is a gain in visibility.
#
# 401 and 407 were never in `accept`, so they already counted as broken. Putting them
# here deliberately takes them OUT of the broken count, because an auth challenge is not
# evidence that a page is gone. The second pass can still prove one dead, and
# `merge_quality` promotes that verdict over this bucket when it does.
#
# 429 is UNREACHABLE today and is kept as a guard, not as live behaviour: `accept` in
# lychee.toml is still `["200", "429"]`, so lychee scores a rate-limited link as healthy
# and it never reaches a failure map. Whether a 429 should be hidden that way is the same
# question 403 already lost, but changing `accept` changes what the weekly sweep reports
# and is not a review fix. Listed here so that removing it from `accept` needs no second
# edit. Keep in step with the copy in link_second_pass.py; a test asserts they match.
BLOCKED_STATUSES = frozenset({401, 403, 407, 429})

# Gateway and availability errors: the host, or a proxy in front of it, failed to answer.
# That says nothing about whether the page exists, so these go in the same not-verifiable
# bucket as BLOCKED_STATUSES instead of counting as broken (DOC-2568). On 2026-11-09 a
# GitHub incident returned 504 to anonymous requests for three hours. The sweep ran
# inside it and reported 181 github.com links as broken. All of them answered 200 that
# afternoon. 500 stays broken: it usually means the page itself is failing.
#
# Kept apart from BLOCKED_STATUSES on purpose. link_second_pass.py has its own copy of
# that set, and there a 5xx is already an `error` (no verdict), which is right.
SERVER_ERROR_STATUSES = frozenset({502, 503, 504})
UNVERIFIABLE_STATUSES = BLOCKED_STATUSES | SERVER_ERROR_STATUSES

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
    all_failures = flatten_failures(stats)
    failures = [f for f in all_failures if f["status"] not in UNVERIFIABLE_STATUSES]
    blocked = [f for f in all_failures if f["status"] in UNVERIFIABLE_STATUSES]
    # `errors` = the rows we actually deliver (errors AND timeouts), so counts shown in
    # Slack/DocFather always match the sheet/Supabase rows. lychee's own counter, which
    # excludes timeouts, is kept separately as `lychee_errors`.
    totals = {
        "total": _int(stats.get("total")),
        "successful": _int(stats.get("successful")),
        "excluded": _int(stats.get("excludes", stats.get("excluded"))),
        "timeouts": _int(stats.get("timeouts")),
        "errors": len(failures),
        "blocked": len(blocked),
        # The 502/503/504 share of `blocked`, counted before the MAX_FAILURES cap so
        # the summary can say how much of the bucket was a host outage.
        "server_errors": sum(1 for f in blocked if f["status"] in SERVER_ERROR_STATUSES),
        "lychee_errors": _int(stats.get("errors")),
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
        "blocked": blocked[:MAX_FAILURES],
        "blocked_truncated": len(blocked) > MAX_FAILURES,
    }


def merge_quality(payload, quality):
    """Fold the second pass (link_second_pass.py) into the one weekly payload.

    One POST, one run_id, one Slack message, one sheet tab. A finding the second pass
    made about a link lychee already reported is dropped: lychee saw it first and the
    reader only needs to be told once.
    """
    if not quality:
        return payload

    # Both lookups are keyed by URL alone, NOT by (page, url). The second pass
    # deduplicates by URL and emits one finding per URL, carrying `pages` but setting
    # `page` to the first of them. lychee reports one row per occurrence. Matching on
    # the pair therefore only ever lines up on whichever page happened to sort first,
    # so a URL blocked on three pages had one row withdrawn and two left behind, and the
    # same URL appeared as "dead" in `quality` and "blocked" elsewhere in the same report.
    reported = {f["url"] for f in payload.get("failures", [])}
    blocked_urls = {f["url"] for f in payload.get("blocked", [])}

    # A URL lychee could only call `blocked` is exactly the case the second pass exists
    # for: lychee never got past the WAF, so it learned nothing about the page. If the
    # second pass reached it with a browser user agent and found it dead or gone, that
    # verdict wins and the `blocked` rows are withdrawn, so one URL carries one answer.
    # Dropping it here instead would report a dead page as merely "not verifiable".
    kept, promoted = [], set()
    for f in quality.get("findings", []):
        url = f.get("url")
        if url in reported:
            continue
        if url in blocked_urls:
            # `blocked` is the same verdict and `error` is no verdict at all (the second
            # pass got no answer either). Neither may withdraw the lychee row: during a
            # host outage the second pass hits the same 504s, and promoting its `error`
            # moved those links out of the not-verifiable count (DOC-2568).
            if f.get("kind") in ("blocked", "error"):
                continue
            promoted.add(url)
        kept.append(f)

    withdrawn = withdrawn_server = 0
    if promoted:
        gone = [f for f in payload["blocked"] if f["url"] in promoted]
        payload["blocked"] = [f for f in payload["blocked"] if f["url"] not in promoted]
        withdrawn = len(gone)
        withdrawn_server = sum(1 for f in gone if f["status"] in SERVER_ERROR_STATUSES)

    q_totals = quality.get("totals") or {}
    payload["quality"] = kept[:MAX_FAILURES]
    # The second pass caps its own findings per class before sending, so its flag is the
    # only honest signal; our slice almost never bites.
    payload["quality_truncated"] = (bool(quality.get("findings_truncated"))
                                    or len(kept) > MAX_FAILURES)
    payload["collapsed_redirects"] = quality.get("collapsed_redirects") or []
    # Subtract what was actually withdrawn rather than recounting the list. `blocked` is
    # already capped at MAX_FAILURES, so recounting it silently reported 500 whenever
    # more than 500 links were blocked, and only when a quality report existed.
    # The one case this still cannot see is a promoted URL whose other rows fall beyond
    # the cap; those stay counted, which overstates rather than hides. `blocked_truncated`
    # remains the flag that the list is partial.
    payload["totals"]["blocked"] = max(0, _int(payload["totals"].get("blocked")) - withdrawn)
    payload["totals"]["server_errors"] = max(
        0, _int(payload["totals"].get("server_errors")) - withdrawn_server)
    payload["totals"].update({
        "quality_checked": _int(q_totals.get("checked")),
        "soft_404": _int(q_totals.get("soft_404")),
        "redirect_reliant": _int(q_totals.get("redirect_reliant")),
        "dead_to_browser": _int(q_totals.get("dead")),
    })
    return payload


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
    if t.get("blocked"):
        lines.append(f"- Blocked by the host or server error "
                     f"(401/403/407/429/502/503/504, not verifiable): {t['blocked']}")
        # From the totals, not the delivered rows: those are capped at MAX_FAILURES.
        server = _int(t.get("server_errors"))
        if server:
            lines.append(f"  - of which server errors (502/503/504), usually a host "
                         f"outage: {server}")
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

    # The second pass: the two things a status code cannot tell you (DOC-2396).
    if "quality_checked" in payload["totals"]:
        lines += ["", "### Second pass", "",
                  f"- Soft 404s: {t.get('soft_404', 0)} | "
                  f"redirect-reliant: {t.get('redirect_reliant', 0)} | "
                  f"dead to a browser user agent: {t.get('dead_to_browser', 0)}"]
        for g in (payload.get("collapsed_redirects") or [])[:5]:
            lines.append(f"- **{g['count']} links now all land on** `{g['final_url']}`")
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

    quality_path = Path(os.environ.get("QUALITY_REPORT", "lychee/quality.json"))
    if quality_path.is_file():
        try:
            payload = merge_quality(payload, json.loads(
                quality_path.read_text(encoding="utf-8")))
        except json.JSONDecodeError as e:
            # The second pass is an add-on. A bad file must not cost us the lychee report.
            print(f"::warning::second-pass report at {quality_path} is not valid JSON: {e}")

    summary = summary_markdown(payload)
    print(summary)
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write(summary)

    # Keep the exact payload next to the lychee report, so the run artifact shows what
    # n8n received (or would have received). It holds no secrets.
    payload_path = os.environ.get("PAYLOAD_OUT")
    if payload_path:
        Path(payload_path).parent.mkdir(parents=True, exist_ok=True)
        Path(payload_path).write_text(json.dumps(payload, indent=2), encoding="utf-8")

    # A manual run with send_report=false (lychee.yml): check everything, post nothing.
    # Nothing reaches the webhook, so no Slack message, sheet tab, Supabase or Notion row.
    if os.environ.get("DRY_RUN", "").lower() == "true":
        print(f"Dry run: report NOT sent to n8n ({payload['totals']['errors']} broken "
              f"link(s), {len(payload['failures'])} rows).")
        return 0 if stats is not None else 1

    url = os.environ.get("WEBHOOK_URL")
    if not url:
        # Not delivering the report is a failure: the whole point of this job is the
        # alert in n8n. A missing secret must go red, not quietly pass.
        print("::error::WEBHOOK_URL is not set (secret DOCOPS_LYCHEE_WEBHOOK_URL); "
              "report not sent to n8n.")
        return 1

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
