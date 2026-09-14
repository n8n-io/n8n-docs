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


def md_escape(s: str) -> str:
    """Neutralize Markdown/HTML in PR-controlled text (page titles) before
    embedding it in the trusted comment, so a crafted title can't inject links
    or markup."""
    s = re.sub(r"\s+", " ", s).strip()
    return re.sub(r"([\\`*_\[\]()<>|])", r"\\\1", s)


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


def gitbook_spaces(status_json) -> set:
    """Spaces whose GitBook build is success or pending (in progress). Used to
    tell 'this space's preview is still building' apart from 'not a page'. Failed
    builds are excluded — a page there shouldn't promise an update that never
    lands (it falls through to the non-page footnote instead)."""
    statuses = status_json.get("statuses", status_json) if isinstance(status_json, dict) else status_json
    out = set()
    for s in statuses:
        if s.get("state") not in ("success", "pending"):
            continue
        m = LIVE_RE.match(s.get("context", "")) or EDIT_RE.match(s.get("context", ""))
        if m:
            out.add(m.group(1))
    return out


# --------------------------------------------------------------------------- #
# Path -> URL mapping
# --------------------------------------------------------------------------- #
PROD_BASE = "https://docs.n8n.io/"


def space_of(filename: str):
    parts = filename.split("/")
    return parts[1] if len(parts) >= 3 and parts[0] == "docs" else None


def _rel(filename: str, prefix: str) -> str:
    rel = re.sub(r"\.md$", "", filename[len(prefix):])
    rel = re.sub(r"(^|/)README$", "", rel)
    return rel.strip("/")


# NOTE: URLs are derived from the file path (top folder == URL segment), which is
# how GitBook Git Sync publishes. Frontmatter `url:` is deliberately NOT used: in
# this repo it holds the pre-migration URL and is stale. Verified against the live
# site — path-derived URLs return 200 while `url:`-derived ones 404 or redirect:
#   changelog/release-notes-2.x        -> 200   (url: release-notes/release-notes -> 404)
#   changelog/release-notes-1.x        -> 200   (url: release-notes/1.x -> 301 to canonical)
#   build/manage-workflows/n8n-packages-> 200   (url: manage-workflows/export-and-import/... -> 404)
#   contribute                          -> 200   (url: contribute-to-n8n -> 404)
def rel_path(filename: str, space: str) -> str:
    """Space-relative slug (no space segment, no domain), from the file path."""
    return _rel(filename, f"docs/{space}/")


def deep_link(space_info: dict, rel: str) -> str:
    base = space_info["live_base"]
    return base + rel if rel else base


def production_url(filename: str) -> str:
    """Live docs URL for a page GitBook doesn't build a preview for (reusable
    fan-out), path-derived (top folder == URL segment)."""
    return PROD_BASE + _rel(filename, "docs/")


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
    safe_title = md_escape(page_title(REPO / filename, rel))  # PR-controlled -> escaped
    url = deep_link(space_info, rel)
    edit = space_info.get("editor_url")
    edit_md = f" · [edit]({edit})" if edit else ""
    shown = rel or "(home)"
    return f"- **[{safe_title}]({url})** — `{shown}`{edit_md}"


def render(changed, spaces, index, pending_spaces=frozenset()) -> str:
    direct: dict = {}          # space -> [file]  (pages with a real preview)
    pending: dict = {}         # space -> [file]  (page whose space is still building)
    reusable_blocks = []       # (name, [affected page paths], total)
    non_pages = []             # files that aren't pages
    unresolved_reusable = []   # include files we couldn't map

    for f in changed:
        filename = f.get("filename", "")
        # Skip removals and non-page artifacts entirely. Assets (images, etc.),
        # nav (SUMMARY.md), and GitBook config are *expected* not to be pages, so
        # listing them under "not published as pages" is noise. The non-page note
        # is reserved for real content pages a contributor forgot to add to nav.
        if f.get("status") == "removed" or not filename.endswith(".md"):
            continue
        is_gitbook_config = "/.gitbook/" in filename and "/.gitbook/includes/" not in filename
        if Path(filename).name == "SUMMARY.md" or is_gitbook_config:
            continue

        if "/.gitbook/includes/" in filename:
            name, pages = resolve_reusable(filename, index)
            if not pages:
                unresolved_reusable.append(filename)
                continue
            reusable_blocks.append((name, pages, len(pages)))
            continue

        space = space_of(filename)
        if space is None:
            # A .md file outside docs/ (e.g. skills/*.md, a top-level README).
            # It isn't a docs-space page, so there's no preview to link — and
            # in_summary() would choke on the None space. Nothing to do.
            continue
        if not in_summary(space, filename):
            # A real content .md that isn't in the space's SUMMARY.md — the one
            # actionable case: GitBook won't publish it until it's added to nav.
            non_pages.append(filename)
        elif space in spaces:
            direct.setdefault(space, []).append(filename)
        elif space in pending_spaces:
            # It IS a page; its space's GitBook build just hasn't finished yet.
            pending.setdefault(space, []).append(filename)
        else:
            non_pages.append(filename)

    out = [MARKER, "## 🔗 GitBook page previews", ""]

    if not direct and not reusable_blocks and not pending:
        out.append("No page previews to show for this PR's changes yet.")
        _append_extras(out, spaces, non_pages, unresolved_reusable)
        return "\n".join(out).rstrip() + "\n"

    # Pages changed directly — deep-linked into this PR's GitBook revision.
    if direct:
        out.append("> 👉 **Jump straight to each page you changed** in this PR's GitBook preview:")
        out.append("")
        for space in sorted(direct):
            info = spaces[space]
            out.append(f"### 📂 {space}")
            lines = [page_line(info, f) for f in sorted(direct[space])]
            if len(lines) > SPACE_COLLAPSE_AFTER:
                out.append(f"<details><summary>{len(lines)} pages changed</summary>")
                out.append("")
                out.extend(lines)
                out.append("</details>")
            else:
                out.extend(lines)
            out.append("")

    # Reusable content: GitBook builds a preview for the reusable-content space
    # only — NOT for the pages that embed the block. So we link the block's diff
    # (the actual change) and list the live pages it renders on (blast radius).
    if reusable_blocks:
        diff = spaces.get("reusable-content", {}).get("editor_url")
        out.append("### ♻️ Reusable content")
        out.append("GitBook previews the reusable block itself, not the pages that "
                   "embed it. Links below are the block diff plus the **live** pages "
                   "it renders on.")
        out.append("")
        for name, pages, total in reusable_blocks:
            diff_md = f" · [view diff]({diff})" if diff else ""
            out.append(f"**`{name}`** — renders on {total} page(s){diff_md}")
            shown = pages[:REUSABLE_CAP]
            out.append(f"<details><summary>Show {len(shown)} of {total} pages</summary>")
            out.append("")
            for p in shown:
                safe_title = md_escape(page_title(REPO / p, p))  # PR-controlled -> escaped
                out.append(f"- [{safe_title}]({production_url(p)}) — `{p[len('docs/'):]}`")
            if total > len(shown):
                out.append(f"- …and {total - len(shown)} more")
            out.append("</details>")
            out.append("")

    # Pages whose space is still building — not links yet. The comment updates on
    # each push / status event, so these become deep links once the build lands.
    if pending:
        total_pending = sum(len(v) for v in pending.values())
        spaces_list = ", ".join(f"`{s}`" for s in sorted(pending))
        out.append(f"> ⏳ GitBook is still building the preview for {spaces_list} — "
                   f"{total_pending} changed page(s). This comment updates when the "
                   f"build finishes.")
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
        out.append(f"> ⚠️ **{len(non_pages)} changed page(s) aren't in the nav** — "
                   f"not listed in the space's `SUMMARY.md`, so GitBook won't publish "
                   f"them until they're added there: "
                   + ", ".join(f"`{p}`" for p in sorted(non_pages)[:10])
                   + (" …" if len(non_pages) > 10 else ""))
    out.append("")
    out.append("<sub>🔄 Links follow this PR's GitBook revision · this comment updates on every push</sub>")


def main() -> int:
    if len(sys.argv) != 3:
        sys.stderr.write(__doc__)
        return 2
    changed = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    status_json = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))
    spaces = load_spaces(status_json)
    pending_spaces = gitbook_spaces(status_json) - set(spaces)
    if not spaces and not pending_spaces:
        # No GitBook build in progress or done yet: emit nothing so the
        # workflow skips (nothing to preview or promise).
        return 0
    index = load_reusable_index()
    sys.stdout.write(render(changed, spaces, index, pending_spaces))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
