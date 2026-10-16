#!/usr/bin/env python3
"""Per-automation profiles for the DocOps auto-merge orchestrator.

One entry per class of mechanical PR that opens, verifies and merges itself. The
orchestrator (docops_auto_merge.py) is generic; everything that differs between
automations lives here, so adding a fourth is a dict entry plus a verdict module
rather than a fork of the orchestrator.

A profile is:
  paths               files the PR is allowed to touch; anything else escalates
  content_path        the file the verdict reads (base vs head)
  marker              HTML comment the n8n flow writes into the PR body. This is
                      the primary gate: no marker, no action, so the automation is
                      dormant until a flow opts in and there is never a flag day
  branch_re           compiled branch-name guard
  merged_title_search `gh pr list --search` term used by the merged-sweep
  check_name          check-run name; MUST differ per automation, or two flows
                      reporting on the same head SHA overwrite each other
  approve_body        review body posted when arming
  supports_close      whether the `close_outdated` verdict is reachable
  verdict             fn(base_text, head_text, io) -> {verdict, reason, ...}
  merged_extra        optional fn(get_file) -> dict merged into the sweep's ctx

`io` carries the orchestrator's I/O helpers (currently just npm_dist_tags) so the
verdict modules themselves stay pure and network-free.

Stdlib only.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import check_reusable_index_pr as _reusable  # noqa: E402
import check_space_index_pr as _space  # noqa: E402
from check_version_snippet_pr import BETA_RE, STABLE_RE  # noqa: E402
from check_version_snippet_pr import evaluate as _snippet_evaluate  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "docs"

SNIPPET_PATH = ("docs/reusable-content/.gitbook/includes/self-hosting/installation/"
                "latest-next-version.md")
SPACE_INDEX_PATH = "SPACE_INDEX.md"
REUSABLE_INDEX_PATH = "REUSABLE_CONTENT_INDEX.md"

# Both index flows branch as `docfather/doc-<n>`; the version-snippet flow builds its
# own branch name. The marker, not the branch, is what tells the automations apart.
DOCFATHER_BRANCH_RE = re.compile(r"^docfather/doc-[0-9]+$")

DEFAULT_ALLOWED_AUTHORS = {"its-imad"}
# Only these failing escalate. They are the repo ruleset's required checks; a failing
# non-required check is GitHub's problem, not ours (native auto-merge just waits).
DEFAULT_REQUIRED_CHECKS = {
    "runner / vale",
    "link-check",
    "cubic · AI code reviewer",
    "CLA Check",
}


def _value_from_snippet(text, regex):
    m = regex.search(text or "")
    return m.group(2) if m else ""


def _version_snippet_verdict(base_text, head_text, io):
    npm_stable, npm_beta = io["npm_dist_tags"]()
    if not npm_stable or not npm_beta:
        return {"verdict": "escalate",
                "reason": "could not read npm dist-tags (stable/beta)"}
    return _snippet_evaluate(base_text, head_text, npm_stable, npm_beta)


def _version_snippet_merged_extra(get_file):
    """The versions now on main, for the merged-sweep's outcome payload."""
    main_text = get_file(SNIPPET_PATH, "main") or ""
    return {"head": {"stable": _value_from_snippet(main_text, STABLE_RE),
                     "beta": _value_from_snippet(main_text, BETA_RE)}}


def _space_index_verdict(base_text, head_text, io):
    return _space.evaluate(base_text, head_text, DOCS_ROOT)


def _reusable_index_verdict(base_text, head_text, io):
    return _reusable.evaluate(base_text, head_text)


PROFILES = {
    "version-snippet": {
        "paths": [SNIPPET_PATH],
        "content_path": SNIPPET_PATH,
        "marker": "<!-- docops:automation=version-snippet -->",
        "branch_re": re.compile(r"^doc-[0-9]+-update-version-snippet$"),
        "merged_title_search": "in:title Update latest and next version numbers",
        "check_name": "DocOps / auto-merge",
        "approve_body": (
            "Automated version-snippet update: the two version numbers were verified "
            "against npm dist-tags. Auto-merges once all required checks pass."),
        "supports_close": True,
        "verdict": _version_snippet_verdict,
        "merged_extra": _version_snippet_merged_extra,
    },
    "space-index": {
        "paths": [SPACE_INDEX_PATH],
        "content_path": SPACE_INDEX_PATH,
        "marker": "<!-- docops:automation=space-index -->",
        "branch_re": DOCFATHER_BRANCH_RE,
        "merged_title_search": "in:title update GitBook space index",
        "check_name": "DocOps / auto-merge (space index)",
        "approve_body": (
            "Automated space-index update: SPACE_INDEX.md parses as a well-formed "
            "space table, every folder resolves under docs/, no folder or space ID is "
            "duplicated, and the space count did not collapse. "
            "Auto-merges once all required checks pass."),
        "supports_close": False,
        "verdict": _space_index_verdict,
        "merged_extra": None,
    },
    "reusable-content-index": {
        "paths": [REUSABLE_INDEX_PATH],
        "content_path": REUSABLE_INDEX_PATH,
        "marker": "<!-- docops:automation=reusable-content-index -->",
        "branch_re": DOCFATHER_BRANCH_RE,
        "merged_title_search": "in:title update reusable content index",
        "check_name": "DocOps / auto-merge (reusable content index)",
        "approve_body": (
            "Automated reusable-content-index update: the index parses with the "
            "expected header, no degraded rows (empty name/preview, or a name equal to "
            "its own block ID), no duplicate block IDs, and no collapse in block count. "
            "Auto-merges once all required checks pass."),
        "supports_close": False,
        "verdict": _reusable_index_verdict,
        "merged_extra": None,
    },
}


def get_profile(name):
    """Return the profile for `name`, or raise with the list of valid names."""
    try:
        return PROFILES[name]
    except KeyError:
        raise SystemExit(
            f"unknown automation '{name}'; expected one of: {', '.join(sorted(PROFILES))}")
