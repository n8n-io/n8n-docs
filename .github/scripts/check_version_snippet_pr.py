#!/usr/bin/env python3
"""Decide what to do with an automated version-snippet PR.

The DocOps version-snippet automation opens PRs that change only the two semver
strings in
docs/reusable-content/.gitbook/includes/self-hosting/installation/latest-next-version.md:

    Current `stable`: 2.36.7
    Current `beta`: 2.37.3

This script compares, per tag (stable and beta independently):
  base = the version on main (the GitBook Git Sync source, so authoritative)
  head = the version the PR proposes
  npm  = the current npm dist-tag
and prints a JSON verdict the auto-merge workflow branches on. It never merges or
closes anything itself; it only decides. It always exits 0 (the workflow reads
the JSON); a usage error exits 2.

Verdicts (see .github/workflows/docops-auto-merge.yml):
  merge          both tags base <= head <= npm, and at least one head > base
  close_outdated both tags head <= base, and base <= npm (PR improves nothing)
  escalate       structural check fails, OR any head > npm, OR any base > npm,
                 OR one tag improves while the other regresses below base

checks_failed / checks_timeout are decided by the workflow from CI, not here.

Usage:
    check_version_snippet_pr.py --base FILE --head FILE --npm-stable X --npm-beta Y

Stdlib only, no network. Mirrors .github/scripts/check_internal_links.py /
gitbook_preview_links.py conventions.
"""

import argparse
import json
import re
import sys

# Three groups: prefix (kept), value (blanked for the structural compare),
# trailing whitespace (kept). Keeping prefix + trailing exact means ANY change
# beyond the number itself - including whitespace on these lines - is detected.
STABLE_RE = re.compile(r"^(Current `stable`:[ \t]+)(.+?)([ \t]*)$", re.MULTILINE)
BETA_RE = re.compile(r"^(Current `beta`:[ \t]+)(.+?)([ \t]*)$", re.MULTILINE)
# ASCII-only, no leading zeros: a plain canonical X.Y.Z. `[0-9]` (not `\d`)
# excludes Unicode digits.
SEMVER_RE = re.compile(r"\A(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\Z")


def _semver(v: str):
    """('2.36.7') -> (2, 36, 7). None if not a plain canonical X.Y.Z."""
    if not SEMVER_RE.match(v or ""):
        return None
    try:
        return tuple(int(p) for p in v.split("."))
    except ValueError:  # pathologically large component
        return None


def _parse_one(text: str, regex: re.Pattern, tag: str):
    """Return (value, error). Requires exactly one occurrence with a valid
    plain semver; otherwise (None, reason)."""
    matches = list(regex.finditer(text or ""))
    if len(matches) == 0:
        return None, f"no `{tag}` version line found"
    if len(matches) > 1:
        return None, f"expected exactly one `{tag}` line, found {len(matches)}"
    val = matches[0].group(2)
    if _semver(val) is None:
        return None, f"`{tag}` value {val!r} is not a plain X.Y.Z semver"
    return val, None


def _blanked(text: str) -> str:
    """The file with only the two version *values* replaced by a sentinel,
    preserving all surrounding bytes, so two files that differ ONLY in the two
    numbers compare identical - and any other change (prose, spacing) does not.
    Deliberately avoids holding a second copy of the template (nothing to drift)."""
    text = STABLE_RE.sub(r"\1<VER>\3", text)
    text = BETA_RE.sub(r"\1<VER>\3", text)
    return text


def _structural(base_text: str, head_text: str):
    """Return (ok, reason, parsed) where parsed = {bs,bb,hs,hb} on success."""
    bs, e = _parse_one(base_text, STABLE_RE, "stable")
    if e:
        return False, f"base file: {e}", None
    bb, e = _parse_one(base_text, BETA_RE, "beta")
    if e:
        return False, f"base file: {e}", None
    hs, e = _parse_one(head_text, STABLE_RE, "stable")
    if e:
        return False, f"head file: {e}", None
    hb, e = _parse_one(head_text, BETA_RE, "beta")
    if e:
        return False, f"head file: {e}", None
    if _blanked(base_text) != _blanked(head_text):
        return False, "the PR changes more than the two version numbers", None
    return True, None, {"bs": bs, "bb": bb, "hs": hs, "hb": hb}


def evaluate(base_text: str, head_text: str, npm_stable: str, npm_beta: str) -> dict:
    """Pure verdict function. Returns {verdict, reason, base, head, npm}."""
    ns_ok, nb_ok = _semver(npm_stable), _semver(npm_beta)
    out = {
        "verdict": "escalate",
        "reason": "",
        "base": {"stable": None, "beta": None},
        "head": {"stable": None, "beta": None},
        "npm": {"stable": npm_stable, "beta": npm_beta},
    }

    if ns_ok is None or nb_ok is None:
        out["reason"] = "npm dist-tag is not a plain X.Y.Z semver (stable/beta)"
        return out

    ok, reason, p = _structural(base_text, head_text)
    if not ok:
        out["reason"] = f"structural: {reason}"
        return out

    bs, bb = _semver(p["bs"]), _semver(p["bb"])
    hs, hb = _semver(p["hs"]), _semver(p["hb"])
    ns, nb = ns_ok, nb_ok
    out["base"] = {"stable": p["bs"], "beta": p["bb"]}
    out["head"] = {"stable": p["hs"], "beta": p["hb"]}

    # A wrong number reaching docs, or npm moving backwards -> escalate.
    if hs > ns or hb > nb:
        out["reason"] = "head proposes a version npm does not publish (head > npm)"
        return out
    if bs > ns or bb > nb:
        out["reason"] = "docs are ahead of npm (base > npm) - possible rollback/unpublish"
        return out

    # One tag improves while the other regresses below base -> escalate.
    stable_improves, beta_improves = hs > bs, hb > bb
    stable_regresses, beta_regresses = hs < bs, hb < bb
    if (stable_improves and beta_regresses) or (beta_improves and stable_regresses):
        out["reason"] = "mixed change: one tag improves while the other regresses below base"
        return out

    # merge: both within [base, npm], at least one strictly improves.
    if bs <= hs <= ns and bb <= hb <= nb and (stable_improves or beta_improves):
        out["verdict"] = "merge"
        out["reason"] = "improves at least one tag toward npm; nothing regresses"
        return out

    # close_outdated: improves nothing and base is not ahead of npm.
    if hs <= bs and hb <= bb and bs <= ns and bb <= nb:
        out["verdict"] = "close_outdated"
        out["reason"] = "PR improves nothing over what is already on main"
        return out

    out["reason"] = "no verdict rule matched"
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Decide a version-snippet PR verdict.")
    ap.add_argument("--base", required=True, help="path to the snippet file on main")
    ap.add_argument("--head", required=True, help="path to the snippet file on the PR head")
    ap.add_argument("--npm-stable", required=True)
    ap.add_argument("--npm-beta", required=True)
    args = ap.parse_args()

    try:
        base_text = open(args.base, encoding="utf-8").read()
        head_text = open(args.head, encoding="utf-8").read()
    except OSError as e:
        sys.stderr.write(f"cannot read snippet file: {e}\n")
        return 2

    print(json.dumps(evaluate(base_text, head_text, args.npm_stable, args.npm_beta)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
