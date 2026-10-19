#!/usr/bin/env python3
"""Network-free tests for the pure helpers in docops_auto_merge.py.

The orchestrator's I/O (gh, npm, webhook) is not exercised here; these cover the
decision logic that decides whether a PR is even a candidate and what to do with it,
plus the automation profiles that drive it.

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

    # --- only_expected_files_changed ---
    check("exactly the snippet -> true",
          dam.only_expected_files_changed([SNIPPET], [SNIPPET]))
    check("snippet + another file -> false",
          not dam.only_expected_files_changed([SNIPPET, "docs/other.md"], [SNIPPET]))
    check("a different single file -> false",
          not dam.only_expected_files_changed(["docs/other.md"], [SNIPPET]))
    check("no files -> false", not dam.only_expected_files_changed([], [SNIPPET]))
    check("blank entries are ignored",
          dam.only_expected_files_changed([SNIPPET, "  "], [SNIPPET]))
    check("order does not matter",
          dam.only_expected_files_changed(["b.md", "a.md"], ["a.md", "b.md"]))

    # --- action_for_verdict ---
    check("merge -> arm", dam.action_for_verdict("merge") == "arm")
    check("close_outdated -> close", dam.action_for_verdict("close_outdated") == "close")
    check("escalate -> escalate", dam.action_for_verdict("escalate") == "escalate")
    check("unknown verdict -> escalate", dam.action_for_verdict("weird") == "escalate")

    # --- branch -> linear key, body -> slack ts ---
    # Both live branch shapes must parse. The DocFather index flows use Linear's own
    # branch name (`docfather/doc-2456`, no trailing slug); if that stops resolving,
    # the outcome webhook silently stops closing tickets.
    check("linear key from snippet branch",
          dam.linear_key_from_branch("doc-2269-update-version-snippet") == "DOC-2269")
    check("linear key from docfather branch",
          dam.linear_key_from_branch("docfather/doc-2456") == "DOC-2456")
    check("linear key is upper-cased",
          dam.linear_key_from_branch("DocFather/DOC-2456") == "DOC-2456")
    check("linear key empty when no match", dam.linear_key_from_branch("feature/x") == "")
    check("linear key empty on None", dam.linear_key_from_branch(None) == "")
    check("slack ts parsed",
          dam.slack_ts_from_body("x <!-- docops:slack-ts=1788340471.047 --> y") == "1788340471.047")
    check("slack ts empty when absent", dam.slack_ts_from_body("no ts here") == "")

    # --- automation profiles ---
    profiles = dam.PROFILES
    check("three automations are registered", len(profiles) == 3)
    check("every profile has the required keys",
          all({"paths", "content_path", "marker", "branch_re", "merged_title_search",
               "check_name", "approve_body", "supports_close", "verdict",
               "merged_extra"} <= set(p) for p in profiles.values()))
    names = [p["check_name"] for p in profiles.values()]
    # Two automations sharing a check-run name would overwrite each other's result
    # when both report on the same head SHA.
    check("check-run names are unique per automation", len(set(names)) == len(names))
    markers = [p["marker"] for p in profiles.values()]
    check("markers are unique per automation", len(set(markers)) == len(markers))
    check("only the version snippet can close_outdated",
          [k for k, v in profiles.items() if v["supports_close"]] == ["version-snippet"])

    # The two index flows share a branch pattern; the marker is what tells them apart.
    space, reusable = profiles["space-index"], profiles["reusable-content-index"]
    check("index branches match docfather/doc-<n>",
          bool(space["branch_re"].match("docfather/doc-2456")))
    check("index branches reject a slugged branch",
          not space["branch_re"].match("docfather/doc-2456-something"))
    check("space and reusable markers differ",
          space["marker"] != reusable["marker"])

    # --- load_cfg ---
    # Clear the overrides first: inheriting ALLOWED_AUTHORS or REQUIRED_CHECKS from the
    # caller's shell would make these assertions test the environment, not the defaults.
    saved = {k: os.environ.pop(k, None) for k in ("ALLOWED_AUTHORS", "REQUIRED_CHECKS")}
    try:
        cfg = dam.load_cfg("space-index")
        check("load_cfg resolves the profile",
              cfg["content_path"] == "SPACE_INDEX.md" and cfg["flow"] == "space-index")
        check("load_cfg defaults the allowed authors", cfg["allowed"] == {"its-imad"})
        check("load_cfg defaults the required checks", "runner / vale" in cfg["required"])

        os.environ["ALLOWED_AUTHORS"] = "someone-else"
        check("load_cfg honours an ALLOWED_AUTHORS override",
              dam.load_cfg("space-index")["allowed"] == {"someone-else"})
    finally:
        os.environ.pop("ALLOWED_AUTHORS", None)
        for k, v in saved.items():
            if v is not None:
                os.environ[k] = v

    # --- verdicts reachable through the profiles ---
    space_index = (
        "# Space index\n\n"
        "| Folder | Space ID | Title | Visibility |\n"
        "|--------|----------|-------|------------|\n"
        "| `build` | `rPN1zU5jaYNvwH7RzxqA` | Build | public |\n"
    )
    v = dam.PROFILES["space-index"]["verdict"](space_index, space_index, {})
    check("identical space index does not merge", v["verdict"] == "escalate")
    changed = space_index + "| `deploy` | `jm0ZYRpZIPWge2ZSiDYO` | Deploy | public |\n"
    check("a changed space index merges through the profile",
          dam.PROFILES["space-index"]["verdict"](space_index, changed, {})["verdict"]
          == "merge")

    reusable_index = (
        "# Reusable content index\n\n"
        "| ID | Name | Parent space | Include snippet | Preview | Used in |\n"
        "|----|------|--------------|-----------------|---------|---------|\n"
        "| `KbKP88R2IFii1k97togq` | agent-search-endpoint | `GixZThfitWP21x2gQFpD` "
        "| `{% include \"x\" %}` | preview text | docs/a.md |\n"
    )
    rv = dam.PROFILES["reusable-content-index"]["verdict"]
    check("identical reusable index does not merge",
          rv(reusable_index, reusable_index, {})["verdict"] == "escalate")
    check("a changed reusable index merges through the profile",
          rv(reusable_index,
             reusable_index.replace("preview text", "edited preview"), {})["verdict"]
          == "merge")


if __name__ == "__main__":
    main()
    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(("PASS" if ok else "FAIL"), "-", n)
    print("=" * 70)
    print(f"{len(checks) - len(failed)}/{len(checks)} passed")
    raise SystemExit(1 if failed else 0)
