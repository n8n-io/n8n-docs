#!/usr/bin/env python3
"""Network-free tests for the pure helpers in docops_auto_merge.py.

The orchestrator's I/O (gh, npm, webhook) is not exercised here; these cover the
decision logic that decides whether a PR is even a candidate and what to do with it.

Run: python3 .github/scripts/tests/test_docops_auto_merge.py
"""
import importlib.util
import os
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "docops_auto_merge.py"

os.environ.setdefault("GH_REPO", "n8n-io/n8n-docs")

spec = importlib.util.spec_from_file_location("dam", SCRIPT)
dam = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dam)

MARKER = "<!-- docops:automation=version-snippet -->"
BRANCH_RE = re.compile(r"^doc-[0-9]+-update-version-snippet$")
ALLOWED = {"its-imad"}
SNIPPET = "docs/reusable-content/.gitbook/includes/self-hosting/installation/latest-next-version.md"

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def pr(**kw):
    """A minimal PR object with sane, passing defaults; override per test."""
    base = {
        "state": "open",
        "body": MARKER,
        "user": {"login": "its-imad"},
        "head": {"ref": "doc-2269-update-version-snippet",
                 "repo": {"full_name": "n8n-io/n8n-docs"}},
        "draft": False,
        "labels": [],
    }
    base.update(kw)
    return base


def gate(p):
    return dam.gate_reason(p, MARKER, ALLOWED, BRANCH_RE)


def main():
    # --- gate: the happy path passes ---
    check("valid PR passes the gate", gate(pr()) is None)

    # --- gate: each rejection reason ---
    check("closed PR is skipped", gate(pr(state="closed")) is not None)
    check("missing marker is skipped", gate(pr(body="just a normal PR")) is not None)
    check("disallowed author is skipped", gate(pr(user={"login": "randouser"})) is not None)
    check("wrong branch is skipped",
          gate(pr(head={"ref": "feature/x", "repo": {"full_name": "n8n-io/n8n-docs"}})) is not None)
    check("fork head is skipped",
          gate(pr(head={"ref": "doc-1-update-version-snippet",
                        "repo": {"full_name": "fork/n8n-docs"}})) is not None)
    check("draft is skipped", gate(pr(draft=True)) is not None)
    check("kill-switch label is skipped",
          gate(pr(labels=[{"name": "status:do-not-merge"}])) is not None)

    # --- only_snippet_changed ---
    check("exactly the snippet -> true", dam.only_snippet_changed([SNIPPET], SNIPPET))
    check("snippet + another file -> false",
          not dam.only_snippet_changed([SNIPPET, "docs/other.md"], SNIPPET))
    check("a different single file -> false",
          not dam.only_snippet_changed(["docs/other.md"], SNIPPET))
    check("no files -> false", not dam.only_snippet_changed([], SNIPPET))

    # --- action_for_verdict ---
    check("merge -> arm", dam.action_for_verdict("merge") == "arm")
    check("close_outdated -> close", dam.action_for_verdict("close_outdated") == "close")
    check("escalate -> escalate", dam.action_for_verdict("escalate") == "escalate")
    check("unknown verdict -> escalate", dam.action_for_verdict("weird") == "escalate")

    # --- branch -> linear key, body -> slack ts ---
    check("linear key from branch", dam.linear_key_from_branch("doc-2269-update-version-snippet") == "DOC-2269")
    check("linear key empty when no match", dam.linear_key_from_branch("feature/x") == "")
    check("slack ts parsed",
          dam.slack_ts_from_body("x <!-- docops:slack-ts=1788340471.047 --> y") == "1788340471.047")
    check("slack ts empty when absent", dam.slack_ts_from_body("no ts here") == "")


if __name__ == "__main__":
    main()
    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(("PASS" if ok else "FAIL"), "-", n)
    print("=" * 70)
    print(f"{len(checks) - len(failed)}/{len(checks)} passed")
    raise SystemExit(1 if failed else 0)
