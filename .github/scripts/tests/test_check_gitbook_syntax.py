#!/usr/bin/env python3
"""Network-free tests for check_gitbook_syntax.py.

Drives each rule with in-memory Markdown strings (no fixture tree needed for a
line-based rule) and locks in the behaviour that matters: the endhint-glued
heading is flagged, a properly spaced heading isn't, a heading glued to a
`{% hint %}` opening tag isn't (endhint-only scope), and the style guide's own
fenced examples of this syntax don't false-positive.

Run: python3 .github/scripts/tests/test_check_gitbook_syntax.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "check_gitbook_syntax.py"

spec = importlib.util.spec_from_file_location("cgs", SCRIPT)
cgs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cgs)

checks = []


def check(name, cond):
    checks.append((name, bool(cond)))


def endhint_findings(text):
    """Run the endhint rule over a Markdown string; return (line, name, msg) list."""
    lines = text.split("\n")
    in_code = cgs.code_line_mask(lines)
    return list(cgs.rule_heading_after_endhint("test.md", lines, in_code))


def main():
    # --- Passing: blank line between endhint and heading ----------------------
    ok = "{% hint style=\"info\" %}\nNote.\n{% endhint %}\n\n## Heading\n"
    check("spaced heading after endhint is not flagged", endhint_findings(ok) == [])

    # --- Failing: heading glued directly below endhint ------------------------
    bad = "{% hint style=\"info\" %}\nNote.\n{% endhint %}\n## Heading\n"
    bad_findings = endhint_findings(bad)
    check("glued heading after endhint is flagged", len(bad_findings) == 1)
    check("finding points at the heading line", bad_findings and bad_findings[0][0] == 4)
    check("finding uses the rule name", bad_findings and bad_findings[0][1] == "heading-after-endhint")

    # --- Inside a code fence: illustrative example must not fire --------------
    fenced = (
        "Example of the bug:\n\n"
        "```md\n"
        "{% endhint %}\n"
        "## Heading\n"
        "```\n"
    )
    check("glued heading inside a code fence is not flagged", endhint_findings(fenced) == [])

    # A longer outer fence wrapping an inner ``` example still counts as code.
    nested = (
        "````md\n"
        "```\n"
        "{% endhint %}\n"
        "## Heading\n"
        "```\n"
        "````\n"
    )
    check("glued heading inside a nested code fence is not flagged", endhint_findings(nested) == [])

    # Tilde fences get the same masking as backtick fences.
    tilde = (
        "Example of the bug:\n\n"
        "~~~md\n"
        "{% endhint %}\n"
        "## Heading\n"
        "~~~\n"
    )
    check("glued heading inside a tilde code fence is not flagged", endhint_findings(tilde) == [])

    # A backtick run inside a tilde fence doesn't close it (different char).
    tilde_nested = (
        "~~~md\n"
        "```\n"
        "{% endhint %}\n"
        "## Heading\n"
        "```\n"
        "~~~\n"
    )
    check("glued heading inside a tilde fence wrapping backticks is not flagged", endhint_findings(tilde_nested) == [])

    # --- Guards ---------------------------------------------------------------
    # A heading glued to a `{% hint %}` OPENING tag renders as the hint title.
    hint_title = "{% hint style=\"info\" %}\n## This is the hint title\nBody.\n{% endhint %}\n"
    check("heading glued to a hint opening tag is not flagged", endhint_findings(hint_title) == [])

    # A heading on line 1 has no line above it.
    check("heading on line 1 is not flagged", endhint_findings("## Heading\n") == [])

    # Inner whitespace variants of the tag are still matched.
    spaced_tag = "{%  endhint  %}\n## Heading\n"
    check("endhint tag with extra inner spaces is matched", len(endhint_findings(spaced_tag)) == 1)

    failed = [n for n, ok in checks if not ok]
    for n, ok in checks:
        print(f"  {'PASS' if ok else 'FAIL'}  {n}")
    if failed:
        print(f"\n{len(failed)} FAILED")
        return 1
    print(f"\nAll {len(checks)} checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
