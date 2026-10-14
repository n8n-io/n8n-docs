#!/usr/bin/env python3
"""DocOps auto-merge orchestrator (native auto-merge edition).

Gate -> verdict -> arm GitHub's native auto-merge, or close / escalate. Called by
.github/workflows/docops-auto-merge.yml, which runs from the trusted default branch
(no `pull_request` trigger) and passes a token minted for the **n8n-assistant GitHub
App** in GH_TOKEN, so the approval and merge act as the App - not github-actions[bot].

Generic across automations: pick one with `--flow <name>`. Everything that differs
between them (marker, branch pattern, files, verdict function, check-run name) lives
in docops_automations.py, so this file never needs to know which flow it is running.

What GitHub owns now (so this script doesn't): waiting for required checks, the
branch-up-to-date requirement, and the merge itself. We only decide, approve (as the
App), and `gh pr merge --auto`. The async merge is reported back later by the sweep.

Never runs PR-head code: PR file contents are read through the API as data, and each
verdict is a pure function from a check_*_pr.py module.

Exit codes: 0 = handled (armed / closed / ignored); 3 = escalated (visibly red).

Config comes from the profile, with optional environment overrides (see the workflow):
  GH_REPO (required), ALLOWED_AUTHORS, REQUIRED_CHECKS (comma-sep, only these
  failing escalate), WEBHOOK_URL / WEBHOOK_USER / WEBHOOK_PASSWORD (optional
  outcome POST), RUN_URL.
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

# Import the automation profiles (same directory). Each profile carries its own pure
# verdict function; nothing version-snippet-specific is imported here.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from docops_automations import (  # noqa: E402
    DEFAULT_ALLOWED_AUTHORS, DEFAULT_REQUIRED_CHECKS, PROFILES, get_profile)

NPM_DIST_TAGS = "https://registry.npmjs.org/-/package/n8n/dist-tags"

LABEL_OUTDATED = "status:outdated"
LABEL_BLOCKED = "status:do-not-merge"
# Merged-sweep idempotency is a hidden PR comment, not a label, so we don't add any
# DocOps-specific labels to the repo (only the pre-existing status:* ones are reused).
OUTCOME_MARKER = "<!-- docops:outcome-sent -->"

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
        return f"branch '{ref}' does not match this automation's branch pattern"
    if (head.get("repo") or {}).get("full_name") != os.environ.get("GH_REPO"):
        return "head is a fork"
    if pr.get("draft"):
        return "draft"
    if any(l.get("name") == LABEL_BLOCKED for l in pr.get("labels", [])):
        return "kill-switch label present"
    return None


def only_expected_files_changed(files, paths):
    """True iff the change touches exactly the automation's files and nothing else."""
    return sorted(f for f in files if f.strip()) == sorted(paths)


def action_for_verdict(verdict):
    """Map a verdict string to one of: 'arm', 'close', 'escalate'."""
    if verdict == "merge":
        return "arm"
    if verdict == "close_outdated":
        return "close"
    return "escalate"


def linear_key_from_branch(ref):
    """DOC key from a branch name.

    Two shapes are in use and both must parse, or the outcome webhook silently stops
    closing Linear tickets: the version-snippet flow builds `doc-2269-update-version-
    snippet`, while the DocFather index flows take Linear's own branch name,
    `docfather/doc-2456` (no trailing slug).
    """
    m = re.search(r"\b(doc-[0-9]+)\b", ref or "", re.IGNORECASE)
    return m.group(1).upper() if m else ""


def slack_ts_from_body(body):
    m = re.search(r"docops:slack-ts=([0-9.]+)", body or "")
    return m.group(1) if m else ""


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


def get_file(repo, path, ref):
    """Return the decoded file contents at `ref`, or None on any failure."""
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


def report_check(repo, cfg, head_sha, conclusion, title, summary):
    # The name must be unique per automation: two flows reporting on the same head
    # SHA under one name would overwrite each other's result.
    gh(["api", "-X", "POST", f"repos/{repo}/check-runs",
        "-f", f"name={cfg['check_name']}", "-f", f"head_sha={head_sha}",
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


def escalate(repo, cfg, ctx, verdict, reason, failing=""):
    report_check(repo, cfg, ctx.get("head_sha", ""), "failure", verdict, reason)
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
    if not only_expected_files_changed(files, cfg["paths"]):
        escalate(repo, cfg, ctx, "escalate",
                 f"changed files are not exactly {', '.join(cfg['paths'])} "
                 f"({' '.join(files)})")
        return True

    path = cfg["content_path"]
    base_text = get_file(repo, path, "main")
    head_text = get_file(repo, path, head["sha"])
    if base_text is None or head_text is None:
        escalate(repo, cfg, ctx, "escalate",
                 f"could not fetch/decode {path} (base or head)")
        return True

    v = cfg["verdict"](base_text, head_text, {"npm_dist_tags": npm_dist_tags})
    for key in ("base", "head", "npm"):
        if key in v:
            ctx[key] = v[key]
    verdict, vreason = v["verdict"], v["reason"]
    log(pr, f"verdict={verdict} ({vreason})")

    action = action_for_verdict(verdict)
    if action == "close":
        if not cfg["supports_close"]:
            # No automation but the version snippet has a meaningful "this PR improves
            # nothing" state; reaching it elsewhere means the verdict is wrong.
            escalate(repo, cfg, ctx, "escalate",
                     f"verdict '{verdict}' is not supported by this automation")
            return True
        report_check(repo, cfg, ctx["head_sha"], "neutral", "close_outdated", vreason)
        comment(repo, pr,
                f"\U0001F5D1\ufe0f Closing: docs already at stable "
                f"`{v['base']['stable']}` / beta `{v['base']['beta']}`. "
                f"A fresh PR opens automatically if npm moves.")
        add_label(repo, pr, LABEL_OUTDATED)
        gh(["pr", "close", str(pr), "-R", repo, "--delete-branch"], check=False)
        post_outcome(ctx, "closed_outdated", vreason)
        log(pr, "closed_outdated")
        return False

    if action == "escalate":
        escalate(repo, cfg, ctx, "escalate", vreason)
        return True

    # action == "arm": a failing REQUIRED check means a human should look, not auto-merge.
    failing = failed_required_checks(repo, pr, cfg["required"])
    if failing:
        escalate(repo, cfg, ctx, "checks_failed",
                 f"required check failed: {', '.join(failing)}", failing=failing[0])
        return True

    arm_auto_merge(repo, cfg, ctx)
    return False


def arm_auto_merge(repo, cfg, ctx):
    """Approve as the App and enable native auto-merge. Idempotent.
    No label is added: the merged-sweep finds these PRs by branch + marker, not a label."""
    pr = ctx["pr"]
    if not already_approved(repo, pr):
        r = gh(["pr", "review", str(pr), "-R", repo, "--approve",
                "-b", cfg["approve_body"]], check=False)
        if r.returncode != 0:
            escalate(repo, cfg, ctx, "escalate",
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
    """Report PRs that native auto-merge already merged, so the outcome webhook fires
    (Slack success + Supabase; Linear usually already closed via its own GitHub
    integration). Detection = fixed title + branch + body marker; dedupe = a hidden PR
    comment. No repo labels are used, created, or required."""
    # The search is already narrowed to this automation's PRs by their fixed title
    # (~1/day), and `gh pr list --limit` paginates internally up to the cap. 500 keeps
    # well over a year of them retryable, so an undelivered outcome cannot age out of
    # the window in practice (that would need the webhook down for hundreds of PRs).
    merged = gh_json(["pr", "list", "-R", repo, "--state", "merged",
                      "--search", cfg["merged_title_search"],
                      "--limit", "500",
                      "--json", "number,headRefName,body,mergeCommit"]) or []
    for p in merged:
        if not cfg["branch_re"].match(p.get("headRefName", "")):
            continue
        if cfg["marker"] not in (p.get("body") or ""):
            continue
        if outcome_already_sent(repo, p["number"]):
            continue
        ctx = {
            "pr": p["number"], "head_sha": (p.get("mergeCommit") or {}).get("oid", ""),
            "branch": p.get("headRefName", ""),
            "linear_key": linear_key_from_branch(p.get("headRefName", "")),
            "slack_ts": slack_ts_from_body(p.get("body")),
        }
        if cfg["merged_extra"]:
            ctx.update(cfg["merged_extra"](lambda path, ref: get_file(repo, path, ref)))
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

def load_cfg(flow):
    """Profile for `flow`, with environment overrides for the two deployment-specific
    values. Everything else is a property of the automation, not of where it runs."""
    profile = get_profile(flow)
    env_authors = os.environ.get("ALLOWED_AUTHORS", "")
    env_checks = os.environ.get("REQUIRED_CHECKS", "")
    cfg = dict(profile)
    cfg["flow"] = flow
    cfg["allowed"] = ({a.strip() for a in env_authors.split(",") if a.strip()}
                      or set(DEFAULT_ALLOWED_AUTHORS))
    cfg["required"] = ({c.strip() for c in env_checks.split(",") if c.strip()}
                       or set(DEFAULT_REQUIRED_CHECKS))
    return cfg


def main():
    ap = argparse.ArgumentParser(description="DocOps auto-merge orchestrator.")
    ap.add_argument("--flow", required=True, choices=sorted(PROFILES),
                    help="which automation to run")
    ap.add_argument("--pr", help="evaluate a single PR number (else sweep open PRs)")
    args = ap.parse_args()

    repo = os.environ["GH_REPO"]
    cfg = load_cfg(args.flow)
    print(f"flow={args.flow} marker={cfg['marker']}", flush=True)

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
