#!/usr/bin/env python3
"""Build a Markdown comment that deep-links each page a PR changed into its
GitBook preview revision.

GitBook posts a commit status per space whose target_url points at the revision
*root* (the space landing page), not the changed page. This script takes the
PR's changed files plus those statuses and produces per-page deep links, so
reviewers land on the exact page. See .github/workflows/gitbook-preview-links.yml.

Usage:
    gitbook_preview_links.py <changed_files.json> <combined_status.json>

- changed_files.json: output of `gh api repos/:repo/pulls/:n/files --paginate`
  (a JSON array of {filename, status, previous_filename?}).
- combined_status.json: output of `gh api repos/:repo/commits/:sha/status`
  (one latest entry per context under `.statuses`).

Reads the checked-out repo (CWD = repo root) for SUMMARY.md membership, page
frontmatter/titles, and REUSABLE_CONTENT_INDEX.md. Stdlib only. Prints the
comment body to stdout; the marker on the first line makes it a sticky comment.
"""

import json
import re
import sys
from pathlib import Path

MARKER = "<!-- gitbook-preview-links -->"
REUSABLE_CAP = 10          # max pages listed for a single reusable block
SPACE_COLLAPSE_AFTER = 15  # collapse a space's direct-page list past this many

REPO = Path.cwd()


# --------------------------------------------------------------------------- #
# Frontmatter / title helpers
# --------------------------------------------------------------------------- #
def read_frontmatter(path: Path) -> dict:
    """Parse the minimal set of frontmatter keys we need (title, nodeTitle,
    url). Handles simple `key: value` and folded `key: >-` blocks. No YAML dep."""
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return {}
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    block = text[3:end].splitlines()
    fm: dict = {}
    i = 0
    wanted = ("title", "nodeTitle", "url")
    while i < len(block):
        line = block[i]
        m = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
        if not m:
            i += 1
            continue
        key, val = m.group(1), m.group(2).strip()
        if key in wanted:
            if val in (">-", ">", "|", "|-", ""):
                # folded/empty: gather following indented lines
                parts = []
                j = i + 1
                while j < len(block) and (block[j].startswith((" ", "\t")) or block[j] == ""):
                    if block[j].strip():
                        parts.append(block[j].strip())
                    j += 1
                fm[key] = " ".join(parts).strip().strip("'\"")
                i = j
                continue
            fm[key] = val.strip("'\"")
        i += 1
    return fm


def first_heading(path: Path) -> str:
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^#{1,3}\s+(.*)$", line)
            if m:
                h = re.sub(r"<a\b[^>]*></a>", "", m.group(1))  # strip anchor tags
                return h.strip()
    except (OSError, UnicodeDecodeError):
        pass
    return ""


def humanize(slug: str) -> str:
    last = slug.rstrip("/").split("/")[-1] or slug
    return last.replace("-", " ").replace("_", " ").strip().capitalize()


def page_title(path: Path, rel: str) -> str:
    fm = read_frontmatter(path)
    return fm.get("title") or fm.get("nodeTitle") or first_heading(path) or humanize(rel)


# --------------------------------------------------------------------------- #
# GitBook statuses
# --------------------------------------------------------------------------- #
LIVE_RE = re.compile(r"^GitBook \(\./docs/([^)]+)\) - ")
EDIT_RE = re.compile(r"^GitBook \(\./docs/([^)]+)\)$")


def load_spaces(status_json) -> dict:
    """space -> {live_base, site_prefix, editor_url}. Only successful builds."""
    statuses = status_json.get("statuses", status_json) if isinstance(status_json, dict) else status_json
    spaces: dict = {}
    for s in statuses:
        if s.get("state") != "success":
            continue
        ctx, url = s.get("context", ""), (s.get("target_url") or "").strip()
        m = LIVE_RE.match(ctx)
        if m:
            base = url if url.endswith("/") else url + "/"
            spaces.setdefault(m.group(1), {})["live_base"] = base
            spaces[m.group(1)]["site_prefix"] = base.split("/~/revisions/")[0] + "/"
            continue
        m = EDIT_RE.match(ctx)
        if m:
            spaces.setdefault(m.group(1), {})["editor_url"] = url
    return spaces


# --------------------------------------------------------------------------- #
# Path -> URL mapping
# --------------------------------------------------------------------------- #
def space_of(filename: str):
    parts = filename.split("/")
    return parts[1] if len(parts) >= 3 and parts[0] == "docs" else None


def rel_path(filename: str, space: str) -> str:
    """Space-relative slug, derived from the file path — which is how GitBook
    Git Sync builds page URLs. (Frontmatter `url:` exists but is unreliable
    migration residue: some pages point it at the space root.) README maps to
    the folder index."""
    rel = filename[len(f"docs/{space}/"):]
    rel = re.sub(r"\.md$", "", rel)
    rel = re.sub(r"(^|/)README$", "", rel)
    return rel.strip("/")


def deep_link(space_info: dict, rel: str) -> str:
    base = space_info["live_base"]
    return base + rel if rel else base


def in_summary(space: str, filename: str) -> bool:
    summary = REPO / "docs" / space / "SUMMARY.md"
    try:
        text = summary.read_text(encoding="utf-8")
    except OSError:
        return False
    rel_md = filename[len(f"docs/{space}/"):]
    return f"]({rel_md})" in text


# --------------------------------------------------------------------------- #
# Reusable content index
# --------------------------------------------------------------------------- #
def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def load_reusable_index() -> dict:
    """Return {normalized-key: [used_in paths]} keyed by both the index Name and
    each block's rendered heading, so include files whose basename differs from
    the Name still resolve."""
    idx = REPO / "REUSABLE_CONTENT_INDEX.md"
    out: dict = {}
    try:
        lines = idx.read_text(encoding="utf-8").splitlines()
    except OSError:
        return out
    for line in lines:
        if not line.startswith("| `"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 3:
            continue
        name = cells[1].strip("` ").strip()
        used_in = [p.strip() for p in cells[-1].split(",") if p.strip().endswith(".md")]
        if not used_in:
            continue
        out.setdefault(norm(name), used_in)
    return out


def resolve_reusable(filename: str, index: dict):
    """Map a changed include file to its including pages. Try normalized
    basename, then the file's own first heading/title. Returns (name, pages) or
    (None, None) if unresolved."""
    path = REPO / filename
    base_key = norm(Path(filename).stem)
    if base_key in index:
        return Path(filename).stem, index[base_key]
    heading = first_heading(path) or read_frontmatter(path).get("title", "")
    if heading and norm(heading) in index:
        return Path(filename).stem, index[norm(heading)]
    return None, None


# --------------------------------------------------------------------------- #
# Rendering
# --------------------------------------------------------------------------- #
def page_line(space_info: dict, filename: str) -> str:
    space = space_of(filename)
    rel = rel_path(filename, space)
    title = page_title(REPO / filename, rel)
    url = deep_link(space_info, rel)
    edit = space_info.get("editor_url")
    edit_md = f" · [edit]({edit})" if edit else ""
    shown = rel or "(home)"
    return f"- **[{title}]({url})** — `{shown}`{edit_md}"


def render(changed, spaces, index) -> str:
    direct: dict = {}          # space -> [file]
    reusable: dict = {}        # space -> [(name, [pages], total)]
    non_pages = []             # files that aren't pages
    unresolved_reusable = []   # include files we couldn't map

    for f in changed:
        filename = f.get("filename", "")
        if f.get("status") == "removed" or not filename.endswith(".md"):
            if f.get("status") != "removed" and filename:
                non_pages.append(filename)
            continue

        if "/.gitbook/includes/" in filename:
            name, pages = resolve_reusable(filename, index)
            if not pages:
                unresolved_reusable.append(filename)
                continue
            # group resolved pages by the space that actually built a preview
            by_space: dict = {}
            for p in pages:
                sp = space_of(p)
                if sp in spaces and (REPO / p).exists():
                    by_space.setdefault(sp, []).append(p)
            if not by_space:
                unresolved_reusable.append(filename)
                continue
            for sp, pgs in by_space.items():
                reusable.setdefault(sp, []).append((name, pgs, len(pages)))
            continue

        if Path(filename).name == "SUMMARY.md" or "/.gitbook/" in filename:
            non_pages.append(filename)
            continue

        space = space_of(filename)
        if space not in spaces or not in_summary(space, filename):
            non_pages.append(filename)
            continue
        direct.setdefault(space, []).append(filename)

    out = [MARKER, "## 📖 GitBook preview for this PR", ""]

    if not direct and not reusable:
        out.append("No standalone page previews for this PR's changes.")
        _append_extras(out, spaces, non_pages, unresolved_reusable)
        return "\n".join(out).rstrip() + "\n"

    out.append("Pages you changed, deep-linked into this PR's GitBook revision:")
    out.append("")

    for space in sorted(set(direct) | set(reusable)):
        info = spaces[space]
        out.append(f"### {space}")

        lines = [page_line(info, f) for f in sorted(direct.get(space, []))]
        if len(lines) > SPACE_COLLAPSE_AFTER:
            out.append(f"<details><summary>{len(lines)} pages changed</summary>")
            out.append("")
            out.extend(lines)
            out.append("</details>")
        else:
            out.extend(lines)

        for name, pages, total in reusable.get(space, []):
            shown = pages[:REUSABLE_CAP]
            out.append(f"_Reusable block **`{name}`** changed — rendered on "
                       f"{total} page(s):_")
            out.append(f"<details><summary>Show {len(shown)} of {total} affected pages</summary>")
            out.append("")
            for p in shown:
                out.append(page_line(info, p))
            if total > len(shown) and info.get("editor_url"):
                out.append(f"- …and {total - len(shown)} more — see the "
                           f"[space diff]({info['editor_url']})")
            out.append("</details>")
        out.append("")

    _append_extras(out, spaces, non_pages, unresolved_reusable)
    return "\n".join(out).rstrip() + "\n"


def _append_extras(out, spaces, non_pages, unresolved_reusable):
    if unresolved_reusable:
        out.append("")
        out.append(f"> ⚠️ {len(unresolved_reusable)} reusable block(s) changed but "
                   f"couldn't be mapped to pages — check "
                   f"[`REUSABLE_CONTENT_INDEX.md`](../blob/main/REUSABLE_CONTENT_INDEX.md): "
                   + ", ".join(f"`{p}`" for p in sorted(unresolved_reusable)))
    if non_pages:
        out.append("")
        out.append(f"<sub>{len(non_pages)} other changed file(s) aren't standalone "
                   f"pages (nav, assets, or unlisted): "
                   + ", ".join(f"`{p}`" for p in sorted(non_pages)[:10])
                   + (" …" if len(non_pages) > 10 else "") + "</sub>")
    out.append("")
    out.append("<sub>Links point to this PR's GitBook revision · comment updates on each push</sub>")


def main() -> int:
    if len(sys.argv) != 3:
        sys.stderr.write(__doc__)
        return 2
    changed = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    status_json = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))
    spaces = load_spaces(status_json)
    if not spaces:
        # No successful GitBook build yet: emit nothing so the workflow skips.
        return 0
    index = load_reusable_index()
    sys.stdout.write(render(changed, spaces, index))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
