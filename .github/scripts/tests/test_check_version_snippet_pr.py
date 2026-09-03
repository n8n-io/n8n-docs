#!/usr/bin/env python3
"""Network-free, table-driven tests for check_version_snippet_pr.py.

Covers every verdict row plus single-tag bump, head between base and npm,
head == base, and the structural failures (extra line, missing line, malformed
semver, unrelated prose edited).

Run: python3 .github/scripts/tests/test_check_version_snippet_pr.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "check_version_snippet_pr.py"

spec = importlib.util.spec_from_file_location("cvs", SCRIPT)
cvs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cvs)


def snippet(stable: str, beta: str, extra: str = "", prose: str = "production use") -> str:
    """The real file shape (see the include), parametrized on the two numbers.
    `extra` injects a duplicate line; `prose` lets a test edit unrelated text."""
    return (
        "---\n"
        "title: latest-next-version\n"
        "---\n"
        "{% hint style=\"info\" %}\n"
        "**Stable and Beta versions**\n"
        "\n"
        f"n8n releases a new minor version most weeks. The `stable` version is for {prose}.\n"
        "\n"
        f"Current `stable`: {stable}\n"
        f"Current `beta`: {beta}\n"
        f"{extra}"
        "{% endhint %}\n"
    )


checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def verdict(base_s, base_b, head_s, head_b, npm_s, npm_b, **kw):
    return cvs.evaluate(
        snippet(base_s, base_b, prose=kw.get("base_prose", "production use")),
        snippet(head_s, head_b, extra=kw.get("head_extra", ""), prose=kw.get("head_prose", "production use")),
        npm_s, npm_b,
    )["verdict"]


def main():
    # --- merge rows ---
    check("both tags bump, head == npm -> merge",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.4", "2.36.8", "2.37.4") == "merge")
    check("single-tag bump (stable only) -> merge",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.3", "2.36.8", "2.37.4") == "merge")
    check("head between base and npm (npm moved past) -> merge",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.3", "2.36.9", "2.37.4") == "merge")

    # --- close_outdated rows ---
    check("head == base (improves nothing), base <= npm -> close_outdated",
          verdict("2.36.7", "2.37.3", "2.36.7", "2.37.3", "2.36.8", "2.37.4") == "close_outdated")
    check("head older than base -> close_outdated",
          verdict("2.36.8", "2.37.4", "2.36.7", "2.37.3", "2.36.8", "2.37.4") == "close_outdated")

    # --- escalate rows ---
    check("any head > npm -> escalate",
          verdict("2.36.7", "2.37.3", "2.36.9", "2.37.3", "2.36.8", "2.37.4") == "escalate")
    check("base > npm (docs ahead / rollback), head <= npm -> escalate",
          verdict("2.36.9", "2.37.3", "2.36.7", "2.37.3", "2.36.7", "2.37.3") == "escalate")
    check("mixed: stable improves, beta regresses below base -> escalate",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.2", "2.36.9", "2.37.4") == "escalate")
    check("npm dist-tag malformed -> escalate",
          cvs.evaluate(snippet("2.36.7", "2.37.3"), snippet("2.36.8", "2.37.4"),
                       "2.36", "2.37.4")["verdict"] == "escalate")

    # --- structural failures -> escalate ---
    check("extra duplicate stable line -> escalate",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.4", "2.36.8", "2.37.4",
                  head_extra="Current `stable`: 2.36.8\n") == "escalate")
    check("malformed head semver -> escalate",
          cvs.evaluate(snippet("2.36.7", "2.37.3"), snippet("2.36", "2.37.4"),
                       "2.36.8", "2.37.4")["verdict"] == "escalate")
    check("unrelated prose edited -> escalate",
          verdict("2.36.7", "2.37.3", "2.36.8", "2.37.4", "2.36.8", "2.37.4",
                  head_prose="something else entirely") == "escalate")

    # whitespace changed on a version line (not just the number) -> escalate
    head_ws = snippet("2.36.8", "2.37.4").replace("Current `stable`: 2.36.8", "Current `stable`:  2.36.8")
    check("extra whitespace on the stable line -> escalate",
          cvs.evaluate(snippet("2.36.7", "2.37.3"), head_ws, "2.36.8", "2.37.4")["verdict"] == "escalate")

    # non-canonical semver (leading zero) -> escalate
    check("leading-zero head semver -> escalate",
          cvs.evaluate(snippet("2.36.7", "2.37.3"), snippet("2.36.08", "2.37.4"),
                       "2.36.8", "2.37.4")["verdict"] == "escalate")

    # missing beta line -> escalate (build a head with the beta line removed)
    head_no_beta = snippet("2.36.8", "2.37.4").replace("Current `beta`: 2.37.4\n", "")
    check("missing beta line -> escalate",
          cvs.evaluate(snippet("2.36.7", "2.37.3"), head_no_beta, "2.36.8", "2.37.4")["verdict"] == "escalate")

    # --- reason plumbing sanity ---
    r = cvs.evaluate(snippet("2.36.7", "2.37.3"), snippet("2.36.8", "2.37.4"), "2.36.8", "2.37.4")
    check("merge verdict carries base/head/npm", r["base"]["stable"] == "2.36.7"
          and r["head"]["stable"] == "2.36.8" and r["npm"]["beta"] == "2.37.4")


if __name__ == "__main__":
    main()
    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(("PASS" if ok else "FAIL"), "-", n)
    print("=" * 70)
    print(f"{len(checks) - len(failed)}/{len(checks)} passed")
    raise SystemExit(1 if failed else 0)
