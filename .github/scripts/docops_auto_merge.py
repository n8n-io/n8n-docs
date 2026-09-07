#!/usr/bin/env python3
"""DocOps auto-merge orchestrator (native auto-merge edition).

Gate -> verdict -> arm GitHub's native auto-merge, or close / escalate. Called by
.github/workflows/docops-auto-merge.yml, which runs from the trusted default branch
(no `pull_request` trigger) and passes a token minted for the **n8n-assistant GitHub
App** in GH_TOKEN, so the approval and merge act as the App - not github-actions[bot].

What GitHub owns now (so this script doesn't): waiting for required checks, the
branch-up-to-date requirement, and the merge itself. We only decide, approve (as the
App), and `gh pr merge --auto`. The async merge is reported back later by the sweep.

Never runs PR-head code: PR file contents are read through the API as data, and the
verdict is a pure function imported from check_version_snippet_pr.py.

Exit codes: 0 = handled (armed / closed / ignored); 3 = escalated (visibly red).

Config comes from the environment (see the workflow):
  GH_REPO, SNIPPET_PATH, MARKER, BRANCH_RE, ALLOWED_AUTHORS,
  REQUIRED_CHECKS (comma-sep, only these failing escalate),
  WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD (optional outcome POST), RUN_URL.
GH_TOKEN is consumed by `gh` from the environment.
"""

import argparse
import base64
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

# Import the pure verdict function directly (same directory).
sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_version_snippet_pr import evaluate, STABLE_RE, BETA_RE  # noqa: E402

NPM_DIST_TAGS = "https://registry.npmjs.org/-/package/n8n/dist-tags"

LABEL_OUTDATED = "status:outdated"
LABEL_BLOCKED = "status:do-not-merge"
# Merged-sweep idempotency is a hidden PR comment, not a label, so we don't add any
# DocOps-specific labels to the repo (only the pre-existing status:* ones are reused).
OUTCOME_MARKER = "<!-- docops:outcome-sent -->"

APPROVE_BODY = (
    "Automated version-snippet update: the two version numbers were verified against "
    "npm dist-tags. Auto-merges once all required checks pass."
)

# --------------------------------------------------------------------- pure helpers
# These are deliberately free of I/O so they can be unit-tested.

def gate_reason(pr, marker, allowed_authors, branch_re):
    """Return None if the PR passes every gate, else a short skip reason.
    `pr` is the GitHub PR object; `allowed_authors` a set; `branch_re` compiled."""
    if pr.get("state") != "open":
        return "not open"
    if marker not in (pr.get("body") or ""):
        return "no marker (v1 or unrelated PR)"
    author = (pr.get("user") or {}).get("login", "")
    if author not in allowed_authors:
        return f"author '{author}' not allowed"
    head = pr.get("head") or {}
    ref = head.get("ref", "")
    if not branch_re.match(ref):
        return f"branch '{ref}' is not a snippet branch"
    if (head.get("repo") or {}).get("full_name") != os.environ.get("GH_REPO"):
        return "head is a fork"
    if pr.get("draft"):
        return "draft"
    if any(l.get("name") == LABEL_BLOCKED for l in pr.get("labels", [])):
        return "kill-switch label present"
    return None


def only_snippet_changed(files, snippet_path):
    """True iff the change touches exactly the snippet file and nothing else."""
    return files == [snippet_path]


def action_for_verdict(verdict):
    """Map a verdict string to one of: 'arm', 'close', 'escalate'."""
    if verdict == "merge":
        return "arm"
    if verdict == "close_outdated":
        return "close"
    return "escalate"


def linear_key_from_branch(ref):
    m = re.match(r"(doc-[0-9]+)-", ref or "")
    return m.group(1).upper() if m else ""


def slack_ts_from_body(body):
    m = re.search(r"docops:slack-ts=([0-9.]+)", body or "")
    return m.group(1) if m else ""


def value_from_snippet(text, regex):
    """The version value on a snippet line, or '' (reuses the verdict script's regexes)."""
    m = regex.search(text or "")
    return m.group(2) if m else ""


# --------------------------------------------------------------------- gh / http I/O

def gh(args, check=True):
    """Run `gh <args>`; return CompletedProcess. Never leaks the token to logs."""
    return subprocess.run(["gh", *args], capture_output=True, text=True, check=check)


def gh_json(args):
    return json.loads(gh(args).stdout or "null")


def get_pr(repo, pr):
    return gh_json(["api", f"repos/{repo}/pulls/{pr}"])


def changed_files(repo, pr):
    out = gh(["api", f"repos/{repo}/pulls/{pr}/files", "--paginate",
              "--jq", ".[].filename"]).stdout
    return [l for l in out.splitlines() if l.strip()]


def get_snippet(repo, path, ref):
    """Return the decoded snippet at `ref`, or None on any failure."""
    r = gh(["api", f"repos/{repo}/contents/{path}?ref={ref}", "--jq", ".content"],
           check=False)
    if r.returncode != 0 or not r.stdout.strip():
        return None
    try:
        return base64.b64decode(r.stdout.replace("\n", "")).decode("utf-8")
    except Exception:
        return None


def npm_dist_tags():
    """Return (stable, beta) from npm, or (None, None) on failure."""
    try:
        with urllib.request.urlopen(NPM_DIST_TAGS, timeout=20) as resp:
            d = json.loads(resp.read().decode("utf-8"))
        return d.get("stable") or d.get("latest"), d.get("beta") or d.get("next")
    except Exception:
        return None, None


def failed_required_checks(repo, pr, required):
    """Names of REQUIRED checks that concluded failure on the PR head (via rollup)."""
    roll = gh_json(["pr", "view", str(pr), "-R", repo, "--json", "statusCheckRollup"])
    failed = []
    for c in (roll or {}).get("statusCheckRollup", []) or []:
        if c.get("__typename") == "CheckRun":
            name, bad = c.get("name"), c.get("conclusion") in (
                "FAILURE", "CANCELLED", "TIMED_OUT", "STARTUP_FAILURE", "ACTION_REQUIRED")
        else:  # StatusContext
            name, bad = c.get("context"), c.get("state") in ("FAILURE", "ERROR")
        if bad and name in required:
            failed.append(name)
    return failed


def already_approved(repo, pr):
    revs = gh_json(["api", f"repos/{repo}/pulls/{pr}/reviews"]) or []
    return any(r.get("state") == "APPROVED" for r in revs)


# --------------------------------------------------------------------- mutating ops

def add_label(repo, pr, name):
    gh(["pr", "edit", str(pr), "-R", repo, "--add-label", name], check=False)


def comment(repo, pr, body):
    gh(["pr", "comment", str(pr), "-R", repo, "-b", body], check=False)


def report_check(repo, head_sha, conclusion, title, summary):
    gh(["api", "-X", "POST", f"repos/{repo}/check-runs",
        "-f", "name=DocOps / auto-merge", "-f", f"head_sha={head_sha}",
        "-f", "status=completed", "-f", f"conclusion={conclusion}",
        "-f", f"output[title]={title}", "-f", f"output[summary]={summary}"], check=False)


def post_outcome(ctx, verdict, reason="", failing=""):
    """POST the outcome to the n8n webhook. Failures are non-fatal to the run, but the
    return value says whether it was delivered, so callers only record a dedupe marker
    for outcomes that actually landed. True also when no webhook is configured (there is
    nothing to deliver, so there is nothing to retry)."""
    url = os.environ.get("WEBHOOK_URL")
    if not url:
        return True
    payload = {
        "pr": ctx["pr"], "head_sha": ctx.get("head_sha", ""), "verdict": verdict,
        "reason": reason, "branch": ctx.get("branch", ""),
        "linear_key": ctx.get("linear_key", ""), "slack_ts": ctx.get("slack_ts", ""),
        "failing_check": failing, "run_url": os.environ.get("RUN_URL", ""),
        "base": ctx.get("base", {"stable": "", "beta": ""}),
        "head": ctx.get("head", {"stable": "", "beta": ""}),
        "npm": ctx.get("npm", {"stable": "", "beta": ""}),
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data,
                                 headers={"content-type": "application/json"})
    user, pw = os.environ.get("WEBHOOK_USER"), os.environ.get("WEBHOOK_PASSWORD")
    if user or pw:
        token = base64.b64encode(f"{user or ''}:{pw or ''}".encode()).decode()
        req.add_header("Authorization", f"Basic {token}")
    try:
        urllib.request.urlopen(req, timeout=20).read()
        return True
    except Exception as e:
        log(ctx["pr"], f"outcome POST failed (non-fatal, will retry next sweep): {e}")
        return False


def escalate(repo, ctx, verdict, reason, failing=""):
    report_check(repo, ctx.get("head_sha", ""), "failure", verdict, reason)
    add_label(repo, ctx["pr"], LABEL_BLOCKED)
    comment(repo, ctx["pr"],
            f"\U0001F6D1 DocOps auto-merge: **{verdict}** - {reason}. "
            f"Left for a human; `{LABEL_BLOCKED}` set.")
    post_outcome(ctx, verdict, reason, failing)
    log(ctx["pr"], f"escalated ({verdict}): {reason}")


def log(pr, msg):
    print(f"PR #{pr}: {msg}", flush=True)


# --------------------------------------------------------------------- per-PR flow

def handle_pr(repo, cfg, pr):
    """Process one PR. Returns True if it escalated (caller turns the run red)."""
    obj = get_pr(repo, pr)
    reason = gate_reason(obj, cfg["marker"], cfg["allowed"], cfg["branch_re"])
    if reason:
        log(pr, f"skip: {reason}")
        return False

    head = obj["head"]
    ctx = {
        "pr": pr, "head_sha": head["sha"], "branch": head["ref"],
        "linear_key": linear_key_from_branch(head["ref"]),
        "slack_ts": slack_ts_from_body(obj.get("body")),
    }

    files = changed_files(repo, pr)
    if not only_snippet_changed(files, cfg["snippet_path"]):
        escalate(repo, ctx, "escalate",
                 f"changed files are not exactly the version snippet ({' '.join(files)})")
        return True

    base_text = get_snippet(repo, cfg["snippet_path"], "main")
    head_text = get_snippet(repo, cfg["snippet_path"], head["sha"])
    if base_text is None or head_text is None:
        escalate(repo, ctx, "escalate", "could not fetch/decode the snippet (base or head)")
        return True

    npm_stable, npm_beta = npm_dist_tags()
    if not npm_stable or not npm_beta:
        escalate(repo, ctx, "escalate", "could not read npm dist-tags (stable/beta)")
        return True

    v = evaluate(base_text, head_text, npm_stable, npm_beta)
    ctx["base"], ctx["head"], ctx["npm"] = v["base"], v["head"], v["npm"]
    verdict, vreason = v["verdict"], v["reason"]
    log(pr, f"verdict={verdict} ({vreason}) base={v['base']} head={v['head']} npm={v['npm']}")

    action = action_for_verdict(verdict)
    if action == "close":
        report_check(repo, ctx["head_sha"], "neutral", "close_outdated", vreason)
        comment(repo, pr,
                f"\U0001F5D1️ Closing: docs already at stable "
                f"`{v['base']['stable']}` / beta `{v['base']['beta']}`. "
                f"A fresh PR opens automatically if npm moves.")
        add_label(repo, pr, LABEL_OUTDATED)
        gh(["pr", "close", str(pr), "-R", repo, "--delete-branch"], check=False)
        post_outcome(ctx, "closed_outdated", vreason)
        log(pr, "closed_outdated")
        return False

    if action == "escalate":
        escalate(repo, ctx, "escalate", vreason)
        return True

    # action == "arm": a failing REQUIRED check means a human should look, not auto-merge.
    failing = failed_required_checks(repo, pr, cfg["required"])
    if failing:
        escalate(repo, ctx, "checks_failed",
                 f"required check failed: {', '.join(failing)}", failing=failing[0])
        return True

    arm_auto_merge(repo, ctx)
    return False


def arm_auto_merge(repo, ctx):
    """Approve as the App and enable native auto-merge. Idempotent.
    No label is added: the merged-sweep finds these PRs by branch + marker, not a label."""
    pr = ctx["pr"]
    if not already_approved(repo, pr):
        r = gh(["pr", "review", str(pr), "-R", repo, "--approve", "-b", APPROVE_BODY],
               check=False)
        if r.returncode != 0:
            escalate(repo, ctx, "escalate",
                     "App approval failed - check the n8n-assistant token/permissions")
            return
    # Enable auto-merge; tolerate "already enabled". GitHub merges when green + up to date.
    r = gh(["pr", "merge", str(pr), "-R", repo, "--auto", "--squash", "--delete-branch"],
           check=False)
    if r.returncode != 0 and "already" not in (r.stderr or "").lower():
        log(pr, f"enable auto-merge returned nonzero: {r.stderr.strip()}")
    # Ruleset is strict (branch must be up to date): nudge if behind. 422 when not behind -> ignore.
    gh(["api", "-X", "PUT", f"repos/{repo}/pulls/{pr}/update-branch"], check=False)
    log(pr, "armed: approved as App + native auto-merge enabled")


# --------------------------------------------------------------------- sweeps

def open_candidates(repo, cfg):
    """Open PRs that pass the cheap marker/author/branch pre-filter (usually 0-1)."""
    prs = gh_json(["pr", "list", "-R", repo, "--state", "open", "--limit", "100",
                   "--json", "number,author,headRefName,body,labels,isDraft"]) or []
    out = []
    for p in prs:
        body = p.get("body") or ""
        author = (p.get("author") or {}).get("login", "")
        if (cfg["marker"] in body and author in cfg["allowed"]
                and cfg["branch_re"].match(p.get("headRefName", ""))):
            out.append(p["number"])
    return out


def outcome_already_sent(repo, pr):
    """True if we've already reported this PR's merge (hidden comment marker)."""
    view = gh_json(["pr", "view", str(pr), "-R", repo, "--json", "comments"]) or {}
    return any(OUTCOME_MARKER in (c.get("body") or "") for c in view.get("comments", []))


def announce_merged(repo, cfg):
    """Report snippet PRs that native auto-merge already merged, so the outcome webhook
    fires (Slack success + Supabase; Linear usually already closed via its own GitHub
    integration). Detection = fixed title + branch + body marker; dedupe = a hidden PR
    comment. No repo labels are used, created, or required."""
    # The search is already narrowed to snippet PRs by their fixed title (~1/day), and
    # `gh pr list --limit` paginates internally up to the cap. 500 keeps well over a year
    # of them retryable, so an undelivered outcome cannot age out of the window in
    # practice (that would need the webhook down for hundreds of snippet PRs).
    merged = gh_json(["pr", "list", "-R", repo, "--state", "merged",
                      "--search", "in:title Update latest and next version numbers",
                      "--limit", "500",
                      "--json", "number,headRefName,body,mergeCommit"]) or []
    for p in merged:
        if not cfg["branch_re"].match(p.get("headRefName", "")):
            continue
        if cfg["marker"] not in (p.get("body") or ""):
            continue
        if outcome_already_sent(repo, p["number"]):
            continue
        head_main = get_snippet(repo, cfg["snippet_path"], "main") or ""
        ctx = {
            "pr": p["number"], "head_sha": (p.get("mergeCommit") or {}).get("oid", ""),
            "branch": p.get("headRefName", ""),
            "linear_key": linear_key_from_branch(p.get("headRefName", "")),
            "slack_ts": slack_ts_from_body(p.get("body")),
            "head": {"stable": value_from_snippet(head_main, STABLE_RE),
                     "beta": value_from_snippet(head_main, BETA_RE)},
        }
        if not post_outcome(ctx, "merged",
                            "auto-merged by GitHub once required checks passed"):
            # Not delivered: leave no marker so the next sweep retries this PR.
            continue
        # Delivered. Write the dedupe marker; if THIS fails we would repost next sweep,
        # so make the failure visible rather than silent (worst case: a duplicate ping).
        r = gh(["pr", "comment", str(p["number"]), "-R", repo,
                "-b", OUTCOME_MARKER + "\nDocOps: auto-merge outcome reported."],
               check=False)
        if r.returncode != 0:
            log(p["number"],
                f"WARNING: outcome sent but dedupe marker failed to write ({r.stderr.strip()}); "
                "a later sweep may repost this outcome")
        log(p["number"], "reported merged")


# --------------------------------------------------------------------- entrypoint

def load_cfg():
    return {
        "snippet_path": os.environ["SNIPPET_PATH"],
        "marker": os.environ["MARKER"],
        "branch_re": re.compile(os.environ["BRANCH_RE"]),
        "allowed": {a.strip() for a in os.environ["ALLOWED_AUTHORS"].split(",") if a.strip()},
        "required": {c.strip() for c in os.environ.get("REQUIRED_CHECKS", "").split(",") if c.strip()},
    }


def main():
    ap = argparse.ArgumentParser(description="DocOps version-snippet auto-merge.")
    ap.add_argument("--pr", help="evaluate a single PR number (else sweep open PRs)")
    args = ap.parse_args()

    repo = os.environ["GH_REPO"]
    cfg = load_cfg()

    escalated = False
    if args.pr:
        escalated = handle_pr(repo, cfg, int(args.pr))
    else:
        for pr in open_candidates(repo, cfg):
            if handle_pr(repo, cfg, pr):
                escalated = True

    # Always report freshly-merged PRs (native auto-merge completes asynchronously).
    announce_merged(repo, cfg)

    return 3 if escalated else 0


if __name__ == "__main__":
    raise SystemExit(main())
