#!/usr/bin/env python3
"""Check internal (relative) Markdown links in the n8n docs.

The external link checker (lychee) can't see internal links: `base` rewrites
relative `.md` links to docs.n8n.io URLs, which the `exclude` list then drops.
This script covers the gap by resolving each relative link as a local file.

GitBook rules enforced (see docs/contribute + the internal-linking guide):
  1. An internal link must end in `.md` (a folder page ends in `/README.md`).
     A trailing slash or a bare path does NOT resolve — GitBook falls back to
     the raw GitHub source URL and the link 404s on the live site. The sole
     documented exception is a bare `./`, which GitBook resolves natively to
     the current folder's own README.md (see the style guide's "Link to the
     current page's parent page" section).
  2. A relative `.md` link must point at a file that exists.
  3. Relative `../` links can't cross GitBook spaces (top-level folders under
     docs/). Cross-space links must use an app.gitbook.com URL, so a relative
     link resolving into another space is reported. An app.gitbook.com link's
     page path is checked against a `.md` file in the target space, EXCEPT for
     GitBook-generated subtrees (see GENERATED_PATH_PREFIXES) that have no `.md`
     source to resolve against, e.g. the OpenAPI-rendered API reference.
  4. The inverse of rule 3: an app.gitbook.com URL must NOT target the space the
     linking page already lives in. Such a link renders fine (GitBook rewrites it
     to an in-site href on the published site), but it opts out of GitBook's
     rename tracking -- relative `.md` links are kept up to date when a page
     moves, a hardcoded space-ID URL isn't -- so it rots silently. It's also
     unverifiable in a GitBook preview, since it resolves against published
     content instead of the revision under review.
  5. A `#anchor` must match a heading on the target page. Checked against the
     explicit `id="..."` markup that 93% of headings carry, following
     `{% include %}` blocks so headings from reusable content count. Reported as
     a WARNING, not an error: where the target heading has no explicit id, or an
     include can't be resolved, the anchor is left unchecked rather than guessed
     at, so a miss costs coverage instead of a false alarm. A bare `#` with no
     anchor is reported separately as `empty-anchor`. Both warn until the repo's
     existing broken anchors are fixed; `--strict-anchors` fails on them now.

External URLs (http/https), mailto:, and links inside code blocks are ignored.
See EXCLUDE_FILES for intentional example links.

Usage:
    python3 .github/scripts/check_internal_links.py [files...]

With no arguments it scans every docs/**/*.md file. Pass specific files (e.g.
the changed files in a PR) to check only those. Exits 1 if any error is found.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

# Repo root = two levels up from .github/scripts/
REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "docs"

# Files whose links are intentional examples, not real navigation.
EXCLUDE_FILES = {
    "docs/contribute/style-guide-for-n8n-docs.md",
}

# The style guide holds the canonical `space folder -> space ID` table used for
# cross-space (app.gitbook.com/s/<id>/...) links. Parsed at runtime so there's a
# single source of truth the team already maintains.
SPACE_ID_TABLE_FILE = REPO_ROOT / "docs" / "contribute" / "style-guide-for-n8n-docs.md"
# Row form: | `space-folder` | `SpaceId` |
SPACE_ID_ROW_RE = re.compile(r"^\|\s*`([a-z0-9-]+)`\s*\|\s*`([A-Za-z0-9]+)`\s*\|")
APP_GITBOOK_RE = re.compile(
    r"^https?://app\.gitbook\.com/s/([A-Za-z0-9]+)(?:/([^#?\s]*))?", re.IGNORECASE
)


def load_space_ids() -> dict[str, str]:
    """Parse the style-guide table into {space_id: folder}. Empty on failure."""
    id_to_folder: dict[str, str] = {}
    try:
        for line in SPACE_ID_TABLE_FILE.read_text(encoding="utf-8").split("\n"):
            m = SPACE_ID_ROW_RE.match(line)
            if m and (DOCS_ROOT / m.group(1)).is_dir():
                id_to_folder[m.group(2)] = m.group(1)
    except OSError:
        pass
    return id_to_folder


SPACE_ID_TO_FOLDER = load_space_ids()

# Run-level stats for coverage transparency (not errors).
_STATS = {"unknown_space_ids": set(), "unknown_space_links": 0, "generated_links": 0}

# Hidden/utility spaces: include mechanisms, not real link targets.
HIDDEN_SPACES = {"_workflows", "reusable-content"}

# Sub-trees inside a space whose pages GitBook generates (e.g. the public API
# reference, rendered from an OpenAPI spec) rather than backing them with a `.md`
# file in this repo. A cross-space link into one of these paths has no source
# file to resolve against, so we accept it instead of reporting a false positive.
# Keyed by space folder; values are path prefixes relative to the space root.
GENERATED_PATH_PREFIXES: dict[str, tuple[str, ...]] = {
    "connect": ("n8n-api",),  # public REST API reference, generated from OpenAPI
}


def is_generated_page(folder: str, page_path: str) -> bool:
    """True if page_path falls under a GitBook-generated subtree of the space."""
    return any(
        page_path == prefix or page_path.startswith(prefix + "/")
        for prefix in GENERATED_PATH_PREFIXES.get(folder, ())
    )

# Asset extensions we don't treat as doc-link violations (checked for existence
# only, not for the .md rule).
ASSET_EXTS = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".pdf",
    ".json", ".yml", ".yaml", ".zip", ".mp4", ".mov", ".csv", ".txt",
}

# Markdown inline links [text](target) and HTML href/src attributes.
# The target allows one level of balanced parens so filenames like
# `(node-name).all.md` are captured whole instead of truncated at the inner `)`.
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(\s*(<[^>]+>|(?:[^()\s]+|\([^()]*\))+)")
HTML_ATTR_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
# Reference definitions: [id]: target. The label's first char must not be `^`,
# so Markdown footnote definitions ([^1]: some text) aren't treated as links.
REF_DEF_RE = re.compile(r"^\s{0,3}\[(?:[^^\]][^\]]*)\]:\s*(\S+)")


def blank_gitbook_native(text: str) -> str:
    """Blank out GitBook-native link blocks, preserving line numbers.

    GitBook serializes some links as trailing-slash directory refs (no `.md`)
    and resolves them natively at render time, so they aren't hand-authored
    broken links. Two forms:
      * content-ref cards: `<table data-view="cards">` ... `</table>`
      * button components: `<a ... class="...button...">`
    (Verified: these render to real GitBook page targets, not GitHub-source 404s.)
    """
    def _blank(match: re.Match) -> str:
        return "\n" * match.group(0).count("\n")

    text = re.sub(
        r'<table\b[^>]*data-view="cards".*?</table>',
        _blank,
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )
    # Blank the opening <a ...> tag of button components (the href lives here).
    text = re.sub(
        r'<a\b[^>]*class="[^"]*\bbutton\b[^"]*"[^>]*>',
        _blank,
        text,
        flags=re.IGNORECASE,
    )
    return text


def strip_code(text: str, inline: bool = True) -> str:
    """Blank out fenced code blocks and inline code so their example links
    aren't parsed, while preserving line numbers.

    Pass inline=False to keep inline code spans. Heading extraction needs that:
    GitBook slugifies a heading including its inline code, so dropping the span
    would compute the wrong slug (`### Using `$if()` (advanced)` -> "using-advanced"
    instead of "using-if-advanced").
    """
    lines = text.split("\n")
    out = []
    fence = None  # active fence marker (``` or ~~~)
    for line in lines:
        stripped = line.lstrip()
        marker = None
        if stripped.startswith("```"):
            marker = "```"
        elif stripped.startswith("~~~"):
            marker = "~~~"
        if marker:
            if fence is None:
                fence = marker
            elif fence == marker:
                fence = None
            out.append("")
            continue
        if fence is not None:
            out.append("")
            continue
        # Drop inline code spans on the line.
        out.append(re.sub(r"`[^`]*`", "", line) if inline else line)
    return "\n".join(out)


def space_of(rel_path: str) -> str | None:
    """Top-level docs space (folder) for a repo-relative path, or None.

    Requires at least 3 parts (docs/<space>/<file...>) so a file directly under
    docs/ has no space, rather than mistaking its filename for a space name.
    """
    parts = Path(rel_path).parts
    if len(parts) >= 3 and parts[0] == "docs":
        return parts[1]
    return None


def iter_targets(text: str):
    """Yield (line_number, raw_target) for every link in the (code-stripped) text."""
    for i, line in enumerate(text.split("\n"), start=1):
        for m in MD_LINK_RE.finditer(line):
            target = m.group(1).strip()
            if target.startswith("<") and target.endswith(">"):
                target = target[1:-1].strip()
            yield i, target
        for m in HTML_ATTR_RE.finditer(line):
            yield i, m.group(1).strip()
        m = REF_DEF_RE.match(line)
        if m:
            yield i, m.group(1).strip()


def classify_cross_space(target: str, src_rel: str):
    """Validate an app.gitbook.com/s/<id>/<path> cross-space link.

    `src_rel` is the repo-relative path of the file holding the link, used to
    reject a URL pointing back into that file's own space (rule 4).

    Returns (category, message) if broken, "unknown" if the space ID isn't in
    the table (can't verify — e.g. the reusable-content utility space), or None
    if it resolves. Reconstructs docs/<folder>/<page-path> and accepts either a
    matching `.md` file or a directory (folder page, whatever its index file).
    """
    m = APP_GITBOOK_RE.match(target)
    if not m:
        return None
    space_id, page_path = m.group(1), (m.group(2) or "")
    folder = SPACE_ID_TO_FOLDER.get(space_id)
    if folder is None:
        # Space ID not in the table (e.g. the reusable-content utility space);
        # we can't map it to a folder, so we don't verify it. Track for transparency.
        _STATS["unknown_space_ids"].add(space_id)
        _STATS["unknown_space_links"] += 1
        return "unknown"
    # Rule 4: the cross-space form aimed at the linking page's own space. Checked
    # before the path lookups below so the message names the wrong link form
    # rather than reporting a (possibly valid) target as missing.
    if space_of(src_rel) == folder:
        return (
            "same-space-absolute",
            f"app.gitbook.com URL targets this page's own space '{folder}'; "
            f"use a relative .md link so GitBook keeps it updated on rename: {target}",
        )
    page_path = page_path.strip("/")
    base = DOCS_ROOT / folder
    if page_path == "":
        return None  # link to space root always resolves
    broken = ("cross-space-broken", f"cross-space target not found in space '{folder}': {target}")
    # A valid GitBook page path is relative to the space root and never contains
    # `.`/`..` segments. Reject them so the filesystem check below can't resolve
    # `..` at the OS level and escape the mapped space folder (false negative).
    segments = page_path.split("/")
    if any(seg in ("", ".", "..") for seg in segments):
        return broken
    if (base / (page_path + ".md")).is_file() or (base / page_path).is_dir():
        return None
    if is_generated_page(folder, page_path):
        # No `.md` source in the repo, but GitBook generates this page (e.g. the
        # OpenAPI-rendered API reference), so there's nothing to verify against.
        _STATS["generated_links"] += 1
        return None
    return broken


# --------------------------------------------------------------------------- #
# Anchor validation (rule 5)
# --------------------------------------------------------------------------- #

# GitBook generates these from `[^1]` footnote markers; there's no heading to
# match them against, so they're always accepted. Anchored to the numeric form
# GitBook actually emits, so a hand-written `#user-content-fn-something` isn't
# waved through.
FOOTNOTE_ANCHOR_RE = re.compile(r"^user-content-fn-\d+$")
EXPLICIT_ID_RE = re.compile(r'id="([^"]+)"')
HEADING_RE = re.compile(r"^#{1,6}\s+(.*?)\s*$")
# `{% include %}` in both forms GitBook emits: a reusable block URL, and a path
# relative to the reusable-content space root.
INCLUDE_URL_RE = re.compile(
    r'\{%\s*include\s+"https?://app\.gitbook\.com/s/[^/]+/~/reusable/([A-Za-z0-9]+)/?"\s*%\}'
)
INCLUDE_REL_RE = re.compile(r'\{%\s*include\s+"(\.gitbook/includes/[^"]+)"\s*%\}')


def _norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def _first_heading(path: Path) -> str:
    try:
        for line in path.read_text(encoding="utf-8", errors="replace").split("\n"):
            m = HEADING_RE.match(line)
            if m:
                return re.sub(r"<a\b[^>]*>.*?</a>", "", m.group(1)).strip()
    except OSError:
        pass
    return ""


def _frontmatter_title(path: Path) -> str:
    """The `title:` value from a file's YAML frontmatter, or "".

    Some include files carry the index's Name here rather than in the filename
    or first heading (for example vector-store-mode.md is "Operation Mode").
    """
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
    except OSError:
        return ""
    if not lines or lines[0].strip() != "---":
        return ""
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if line.startswith("title:"):
            return line[len("title:"):].strip().strip("'\"")
    return ""


_REUSABLE_BLOCKS: dict | None = None


def reusable_blocks() -> dict:
    """Map reusable block ID -> include file, parsed from REUSABLE_CONTENT_INDEX.md.

    That index is generated externally and runs stale, so a block ID missing here
    isn't an error: the page that includes it is simply treated as unverifiable
    (see heading_ids). Matches the index's Name against include filenames four
    ways -- exact stem, normalized stem, normalized first heading, normalized
    frontmatter title -- which resolves every block in the index today.
    """
    global _REUSABLE_BLOCKS
    if _REUSABLE_BLOCKS is not None:
        return _REUSABLE_BLOCKS
    blocks: dict = {}
    incl_root = DOCS_ROOT / "reusable-content" / ".gitbook" / "includes"
    files = list(incl_root.rglob("*.md")) if incl_root.is_dir() else []
    by_stem = {p.stem: p for p in files}
    by_norm = {_norm(p.stem): p for p in files}
    by_heading: dict = {}
    by_title: dict = {}
    for p in files:
        h = _first_heading(p)
        if h:
            by_heading.setdefault(_norm(h), p)
        t = _frontmatter_title(p)
        if t:
            by_title.setdefault(_norm(t), p)
    row = re.compile(r"^\|\s*`([A-Za-z0-9]+)`\s*\|\s*([^|]+?)\s*\|")
    try:
        text = (REPO_ROOT / "REUSABLE_CONTENT_INDEX.md").read_text(encoding="utf-8")
    except OSError:
        text = ""
    for line in text.split("\n"):
        m = row.match(line)
        if not m:
            continue
        bid, name = m.group(1), m.group(2)
        hit = (
            by_stem.get(name)
            or by_norm.get(_norm(name))
            or by_heading.get(_norm(name))
            or by_title.get(_norm(name))
        )
        if hit:
            blocks[bid] = hit
    _REUSABLE_BLOCKS = blocks
    return blocks


def anchor_slug(heading: str) -> str:
    """Approximate GitBook's heading slug.

    Used ONLY to suppress anchors that may point at a heading with no explicit
    `id=`, never to assert one is broken. A wrong guess therefore costs a missed
    detection, not a false positive.
    """
    h = re.sub(r"<a\b[^>]*>.*?</a>", "", heading)
    h = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", h)  # link -> its text
    h = h.strip().lower().replace("`", "")
    h = re.sub(r"[*_]", "", h)
    h = re.sub(r"[^a-z0-9\s.-]", "", h)
    return re.sub(r"\s+", "-", h.strip())


_HEADING_IDS: dict = {}


def heading_ids(path: Path) -> tuple:
    """Return (explicit_ids, slug_ids, resolved) for a page, following includes.

    `explicit_ids` come from `id="..."` markup and are authoritative -- 93% of
    headings carry it. `slug_ids` are guessed for headings that don't, and are
    only used to stay quiet. `resolved` is False when an `{% include %}` couldn't
    be resolved, in which case the page's anchors aren't checked at all.
    """
    key = str(path)
    if key in _HEADING_IDS:
        return _HEADING_IDS[key]
    _HEADING_IDS[key] = (set(), set(), True)  # cycle guard
    try:
        raw = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        # Unreadable: mark unresolved so the page's anchors are skipped rather
        # than every one of them reported missing.
        _HEADING_IDS[key] = (set(), set(), False)
        return _HEADING_IDS[key]
    # Two views of the page. `markup` drops inline code, so an `id="..."` or an
    # `{% include %}` shown as an example inside backticks isn't mistaken for the
    # real thing (which would invent ids and silently suppress real warnings).
    # `headings` keeps inline code, because GitBook slugifies a heading including
    # its code spans.
    markup = strip_code(raw)
    headings = strip_code(raw, inline=False)
    explicit = set(EXPLICIT_ID_RE.findall(markup))
    slugs = set()
    # Walk both views in step: judge id-presence on the markup line (so an
    # `<a id="...">` shown inside backticks doesn't count as a real anchor) while
    # slugging the heading line (which keeps its code spans).
    for line, line_markup in zip(headings.split("\n"), markup.split("\n")):
        m = HEADING_RE.match(line)
        if m and not re.search(r'<a\b[^>]*\bid="', line_markup):
            s = anchor_slug(m.group(1))
            if s:
                slugs.add(s)
    resolved = True
    blocks = reusable_blocks()
    for bid in INCLUDE_URL_RE.findall(markup):
        inc = blocks.get(bid)
        if inc is None:
            resolved = False
            continue
        e, s, r = heading_ids(inc)
        explicit |= e
        slugs |= s
        resolved = resolved and r
    for rel in INCLUDE_REL_RE.findall(markup):
        inc = DOCS_ROOT / "reusable-content" / rel
        if not inc.is_file():
            resolved = False
            continue
        e, s, r = heading_ids(inc)
        explicit |= e
        slugs |= s
        resolved = resolved and r
    _HEADING_IDS[key] = (explicit, slugs, resolved)
    return _HEADING_IDS[key]


def classify_anchor(target_page: Path, anchor: str, target: str):
    """Validate a `#fragment` against the target page's heading IDs."""
    if anchor == "":
        return ("empty-anchor", f"link ends in a bare '#' with no anchor: {target}")
    if FOOTNOTE_ANCHOR_RE.match(anchor):
        return None
    explicit, slugs, resolved = heading_ids(target_page)
    if anchor in explicit:
        return None
    if not resolved:
        return None  # unresolvable include on the target page: can't verify
    if anchor in slugs:
        return None  # heading has no explicit id: unverifiable, stay quiet
    return (
        "broken-anchor",
        f"no heading with id '{anchor}' on the target page: {target}",
    )


def classify(md_file: Path, src_rel: str, target: str):
    """Return (category, message) for a broken link, or None if the link is fine.

    `src_rel` is md_file as a repo-relative posix path (the caller already has it).
    """
    # Cross-space app.gitbook.com links: validate against the space-ID table
    # before the generic http scheme is skipped below.
    if APP_GITBOOK_RE.match(target):
        result = classify_cross_space(target, src_rel)
        return None if result == "unknown" else result

    # Strip anchor and query.
    path_part = target.split("#", 1)[0].split("?", 1)[0].strip()
    anchor = target.split("#", 1)[1].strip() if "#" in target else None

    # Skip: external, mailto/other schemes, protocol-relative, pure anchors,
    # templating/liquid, and empty (pure-anchor) targets.
    if not path_part:
        # In-page anchor: validate against this file's own headings.
        if anchor is not None:
            return classify_anchor(md_file, anchor, target)
        return None
    if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", path_part):  # scheme: http:, mailto:, tel:
        return None
    if path_part.startswith("//"):  # protocol-relative
        return None
    if path_part.startswith("{"):  # liquid/templating
        return None

    src_dir = md_file.parent
    ext = os.path.splitext(path_part)[1].lower()

    # Leading-slash absolute paths aren't relative links. GitBook doesn't resolve
    # them the way the guide expects, so it falls back to the GitHub source (404).
    # Always flag them; note whether the target would even exist under docs/.
    if path_part.startswith("/"):
        resolved = (DOCS_ROOT / path_part.lstrip("/")).resolve()
        hint = "target exists under docs/" if resolved.exists() else "target missing"
        return (
            "absolute-path",
            f"absolute path won't resolve in GitBook, use a relative .md link "
            f"({hint}): {target}",
        )

    # Assets: only check existence, skip the .md rule.
    if ext in ASSET_EXTS:
        resolved = (src_dir / path_part).resolve()
        if not resolved.exists():
            rel = os.path.relpath(resolved, REPO_ROOT)
            return ("missing-asset", f"asset not found: {target} -> {rel}")
        return None

    # Rule 1 exception: `./` is the documented way to link to the current
    # folder's own parent page (its README.md) -- see the style guide's
    # "Link to the current page's parent page" section. GitBook resolves this
    # bare directory-self-reference natively, unlike other trailing-slash
    # folder links, so it doesn't 404 the way Rule 1 assumes.
    if path_part == "./":
        resolved = (src_dir / "README.md").resolve()
        if not resolved.exists():
            rel = os.path.relpath(resolved, REPO_ROOT)
            return ("missing-target", f"target not found: {target} -> {rel}")
        if anchor is not None:
            return classify_anchor(resolved, anchor, target)
        return None

    # Rule 1: internal doc links must end in .md.
    if not path_part.endswith(".md"):
        return ("no-md-extension", f"internal link must end in .md: {target}")

    # Rule 2: target file must exist.
    resolved = (src_dir / path_part).resolve()
    if not resolved.exists():
        rel = os.path.relpath(resolved, REPO_ROOT)
        return ("missing-target", f"target not found: {target} -> {rel}")

    # Rule 3: relative links can't cross spaces.
    try:
        resolved_rel = resolved.relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return None
    src_space, dst_space = space_of(src_rel), space_of(resolved_rel)
    if src_space and dst_space and src_space != dst_space:
        return (
            "cross-space-relative",
            f"relative link crosses space {src_space} -> {dst_space} "
            f"(use an app.gitbook.com URL): {target}",
        )

    # Rule 5: the target page exists, so check the anchor resolves on it.
    if anchor is not None:
        return classify_anchor(resolved, anchor, target)
    return None


def discover_files() -> list[Path]:
    return sorted(DOCS_ROOT.rglob("*.md"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("files", nargs="*", help="Markdown files to check (default: all docs)")
    ap.add_argument(
        "--warn-cross-space",
        action="store_true",
        help="Treat cross-space relative links as warnings, not errors.",
    )
    ap.add_argument(
        "--strict-anchors",
        action="store_true",
        help="Fail on broken anchors instead of warning (see rule 5).",
    )
    args = ap.parse_args()

    if args.files:
        files = [Path(f).resolve() for f in args.files]
    else:
        files = discover_files()

    warn_categories = {"cross-space-relative"} if args.warn_cross_space else set()
    if not args.strict_anchors:
        # Phase 1: every rule-5 finding warns. Promote once the existing backlog
        # of broken anchors is cleared, so the check starts from a clean repo.
        warn_categories |= {"broken-anchor", "empty-anchor"}

    errors: list[str] = []
    warnings: list[str] = []
    counts: dict[str, int] = {}

    for md_file in files:
        if not md_file.exists() or md_file.suffix != ".md":
            continue
        try:
            rel = md_file.relative_to(REPO_ROOT).as_posix()
        except ValueError:
            continue
        if rel in EXCLUDE_FILES:
            continue
        if space_of(rel) in HIDDEN_SPACES:
            continue

        raw = md_file.read_text(encoding="utf-8", errors="replace")
        text = strip_code(blank_gitbook_native(raw))
        for line, target in iter_targets(text):
            result = classify(md_file, rel, target)
            if result is None:
                continue
            category, message = result
            counts[category] = counts.get(category, 0) + 1
            entry = f"{rel}:{line}  [{category}]  {message}"
            if category in warn_categories:
                warnings.append(entry)
            else:
                errors.append(entry)

    if warnings:
        print(f"⚠️  {len(warnings)} warning(s):\n")
        for w in sorted(warnings):
            print(f"  {w}")
        print()

    if _STATS["unknown_space_links"]:
        n_links = _STATS["unknown_space_links"]
        n_ids = len(_STATS["unknown_space_ids"])
        print(
            f"ℹ️  Skipped {n_links} cross-space link(s) to {n_ids} space ID(s) not in "
            f"the style-guide table (e.g. the reusable-content utility space); "
            f"can't verify these.\n"
        )

    if _STATS["generated_links"]:
        print(
            f"ℹ️  Accepted {_STATS['generated_links']} cross-space link(s) to "
            f"GitBook-generated pages (e.g. the OpenAPI API reference) that have "
            f"no .md source to verify.\n"
        )

    if errors:
        print(f"❌ {len(errors)} broken internal link(s):\n")
        for e in sorted(errors):
            print(f"  {e}")
        print("\nBy category: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))
        print(
            "\nAdd intentional example files to EXCLUDE_FILES in "
            ".github/scripts/check_internal_links.py if they are false positives."
        )
        return 1

    print(f"✅ No broken internal links found ({len(files)} file(s) scanned).")
    if warnings:
        print(f"   ({len(warnings)} warning(s) above — not failing the build.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
