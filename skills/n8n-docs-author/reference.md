# n8n docs author — formatting reference

Full syntax examples for the GitBook constructs used in n8n-docs. The n8n Docs
site is built with [GitBook](https://www.gitbook.com/): pages are Markdown plus
GitBook-specific blocks. For the Markdown representation of every block type,
see the [GitBook blocks documentation](https://gitbook.com/docs/creating-content/blocks).

## Frontmatter

Every page opens with valid YAML frontmatter. Fields n8n Docs uses:

| Field | Use |
|-------|-----|
| `description` | Short summary of the page. May appear in search results and link previews. |
| `layout.description.visible` | Always include and set to `false`. Hides the description on the rendered page. |
| `hidden` | Set to `true` to remove the page from the side menu. Omit for normal pages (most pages appear in the menu). |
| `generated` | `true` marks the page as fully automation-managed. Don't edit these by hand. |

```yaml
---
description: Learn how to merge data streams in your n8n workflows.
layout:
  description:
    visible: false
---
```

Existing pages may carry migration-support fields (`contentType`, `nodeTitle`, `originalFilePath`, `originalUrl`, `url`). Don't add these to new pages.

### Tags

A **visual tag** renders as a label on the page and, if `primary: true`, in
the side menu too. It only renders if it's defined in the space's
`.gitbook/tags.yaml` (label and color). Add it as an object in the `tags` array:

```yaml
---
tags:
  - release
  - tag: preview
    primary: true
---
```

Only `tag: preview` above is a visual tag. `release` is a plain string with no
matching `.gitbook/tags.yaml` entry, so it renders nothing. The `tags` array
can carry inert strings like this alongside a real visual tag; they're a
different thing, not a second visual tag.

- A visual tag must already be defined in the space's `.gitbook/tags.yaml`
  before you can apply it: check it exists, add it if missing.
- A visual tag is a label only. It doesn't replace the explanatory hint on the
  page. The hint explains what the status means; the tag just flags it in the UI.
- Only `preview` and `beta` are verified values for the separate `status:`
  field in this codebase. Don't assume every visual tag has a matching
  `status:`; `deprecated` doesn't (see Feature availability, in the style guide).
- The current set of visual tags allowed in docs is: **Deprecated** (a whole
  page about a deprecated feature), **Preview** (a whole page about a feature
  in Preview), and **Archived** (a page no longer updated). Don't create or
  use any visual tag other than these three.

## Page navigation (SUMMARY.md)

Each space has a `SUMMARY.md` at its root. GitBook builds the sidebar from it, so
a new page won't appear in the navigation until you add it. Creating the `.md`
file isn't enough.

`SUMMARY.md` is a nested Markdown list. Each entry links to a page by its path
relative to the space root (where `SUMMARY.md` lives), including `.md`. A
`README.md` is the landing page for the space or a section, and indentation nests
pages under it. Entry order sets sidebar order.

```markdown
# Summary

* [Administer](README.md)
* [Manage credentials](manage-credentials/README.md)
  * [Share credentials securely](manage-credentials/share-credentials-securely.md)
  * [Credential overwrites](manage-credentials/credential-overwrites.md)
```

When you add a page, add a matching entry in the correct `SUMMARY.md`. When you
move, rename, or delete a page, update its entry.

## Headings

Write headings as plain Markdown (`## Heading text`) in sentence case. GitBook
generates a clickable anchor from the heading text automatically, so don't add
anchor markup yourself.

Existing pages carry explicit anchor tags the migration added to pin a stable
anchor:

```markdown
## Heading text <a href="#heading-text" id="heading-text"></a>
```

Don't add these to new headings. Leave existing ones in place, and keep a
heading's anchor tag if you reword it, so existing links don't break.

## Links

### External links

Use standard Markdown link syntax. External links open in a new tab automatically, with no extra attributes needed:

```markdown
[Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/)
```

### Internal links

Each top-level folder under `docs/` (such as `build/`, `deploy/`, `administer/`)
is a separate GitBook space. How you link depends on whether the target is in the
same space or a different one.

**Same space:** use standard Markdown link syntax and link to the relative path of
the target file, including its `.md` extension. Link to the file rather than
typing a raw URL path, so the reference stays valid when pages move or are
renamed. The relative path depends on where the target sits in relation to the
page you're editing:

```markdown
[same folder](another-page.md)
[parent (the folder's README.md)](./)
[different subfolder, same space](../manage-workflows/export-import.md)
```

Ending a same-space link with a trailing slash (`page/`) or with no extension
(`page`) **breaks it**: GitBook can't resolve the link, and on the live site it
404s to a GitHub URL. This is the most common internal-link mistake.

**Different space:** relative file paths don't resolve across spaces. GitBook
resolves cross-space links as page references, not file paths. Link to the target
page's GitBook URL, built from the target space's ID and the page's path within
its space folder (drop the `.md` extension; a `README.md` becomes its folder path):

```markdown
[different space](https://app.gitbook.com/s/<spaceId>/<page-path>)
```

For example, linking from an `administer` page to
`docs/deploy/host-n8n/configure-n8n/user-management.md`:

```markdown
[different space](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/user-management)
```

Each top-level folder under `docs/` is a separate space:

| Space folder | Space ID |
|------------------------|------------------------|
| `get-started`          | `CxSeOtVxqqhfxMSac0AV` |
| `build`                | `rPN1zU5jaYNvwH7RzxqA` |
| `connect`              | `r7wKI4I1BgdBCuq5Cvcx` |
| `integrations`         | `BKcbOzIWja8NfqKDcqHc` |
| `deploy`               | `jm0ZYRpZIPWge2ZSiDYO` |
| `administer`           | `wMJrGrimpx3PxCJpUswm` |
| `privacy-and-security` | `ukPPOMQ6NId4gpAIkPXa` |
| `changelog`            | `hhM8Cox90Piiv0u0EgHM` |
| `contribute`           | `6OmLnmci5kZDzdkzKREn` |

Alternatively, copy the page's link in GitBook, or use its published
`https://docs.n8n.io/...` address if you don't have GitBook access.

<!-- Keep this table in sync with the one in
docs/contribute/style-guide-for-n8n-docs.md (the canonical source). Update it if a
space is added, removed, or recreated. IDs are stable while a space exists; a
recreated space gets a new ID. -->

### Section anchors

To link to a section within a page, add `#section-id` after the path (after the
`.md` for a same-space link). GitBook generates the anchor from the heading text,
lowercased with spaces replaced by hyphens:

```markdown
[same space](../host-n8n/configure-n8n/manage-settings-using-environment-variables.md#mcp)
[different space](https://app.gitbook.com/s/<spaceId>/<page-path>#response-mode)
```

### Utility folders (not link targets)

Only top-level folders with a `SUMMARY.md` are GitBook spaces and valid
cross-space link targets. Four top-level folders under `docs/` are utility
folders, not spaces, and aren't in the table above:

- `_images`, `_video` — shared media assets
- `_workflows` — workflow assets
- `reusable-content` — shared includes

Don't hand-author cross-space page links to these. For reusable content, use the
GitBook include mechanism instead of a page link.

## Hints (callouts)

Hints draw attention to important information. There are four styles: `info`,
`warning`, `danger`, and `success`.

```markdown
{% hint style="info" %}
General notes, information to highlight, and feature restrictions (pricing tier, platform).
{% endhint %}

{% hint style="warning" %}
Something has risks or unexpected behaviours.
{% endhint %}

{% hint style="danger" %}
High security risk, or destructive (the user can permanently lose data).
{% endhint %}

{% hint style="success" %}
Positive confirmations or tips. Use sparingly.
{% endhint %}
```

To add a title, make a heading the first line of the hint:

```markdown
{% hint style="info" %}
## This is the hint title

Some hint content.
{% endhint %}
```

**Don't over-use hints.** They lose their effectiveness if used frequently.

## Collapsible blocks

Similar to hints, but collapsed until the user clicks to expand. Use them for
supplementary detail that would otherwise clutter the page. Rendered from a
standard HTML `<details>` block:

```markdown
<details>

<summary>Summary text the user clicks</summary>

Some collapsible content. Standard Markdown works inside the block.

</details>
```

## Tabbed content

Use tabs when content differs by platform, language, or configuration. Use
sparingly, as they can hide content from users and hurt discoverability.

Use tabs only for **short** parallel variants. AI tools serialize all tabs inline,
so a reader sees one variant but an agent reads every variant in sequence. Keep
the block under ~3,000 characters combined, and label each variant so the
serialized content stays legible. For long
parallel content (a full procedure per variant, or 4+ variants), replace the tabs
with a heading per variant on the same page. Split into a page per variant only
when the combined page would exceed the page length guidance, or the variant set
is open-ended. Keep shared content outside the tabs.

```markdown
{% tabs %}
{% tab title="First tab" %}
Content rendered with normal Markdown syntax:

- List item one
- List item two
{% endtab %}

{% tab title="Second tab" %}
1. Numbered list
2. Another item
{% endtab %}
{% endtabs %}
```

## Code blocks

Always use **tabs, not spaces** for indentation inside code blocks. This matches
the n8n node linter convention and prevents linter failures if users copy the code.

Use fenced code blocks with a language identifier for syntax highlighting:

````markdown
```typescript
function example() {
	const value = 'uses a tab here';
	return value;
}
```
````

GitBook supports [optional code block settings](https://gitbook.com/docs/creating-content/blocks/code-block).
Add a title, wrapping, or line numbers when they help the reader:

````markdown
{% code title="MyNode.node.ts" overflow="wrap" lineNumbers="true" %}
```typescript
// Your code here
```
{% endcode %}
````

## Placeholders in code

Placeholders inside code spans or blocks use hyphenated words in angle brackets:

```markdown
Run `n8n start --tunnel` from `<your-project-directory>`.
```

## Images

Images are supplementary. AI search, the docs assistant, coding agents, and
screen readers read the page as text, so all they receive from an image is its
alt text and file path, not the picture itself. Multimodal image reading exists
but is rare in docs pipelines, and too slow and costly to rely on. So:

- **Write every instruction in text.** A screenshot can show what a screen looks
  like, but the step must be written out ("Select **Add trigger**, then **On
  schedule**"). Never leave the only copy of a setting, value, menu path, or
  click target inside an image.
- **Don't screenshot text.** Put code, commands, error messages, and config
  values in code blocks or tables, so readers can copy them and agents can read
  them.
- **Screenshots confirm, they don't instruct.** Use them to orient the reader
  alongside the written steps, not instead of them.

Each space keeps all its images in one folder, `.gitbook/assets/` at the space
root. You can't reference an image from another space's assets folder.

Reference images with a path relative to the page: step up to the space root,
then into `.gitbook/assets/`:

```markdown
![Alt text](../.gitbook/assets/workflow-overview.png)
![Alt text](../../.gitbook/assets/workflow-overview.png)
```

**Alt text:** always descriptive. Describe what the image shows, not that it's a
screenshot. Keep it under 125 characters. Don't start with "Image of" or
"Screenshot of".

**Files:** PNG for screenshots and diagrams, SVG for icons and simple
illustrations. Compress before committing. Use lowercase, hyphenated names
(`workflow-overview.png`, not `WorkflowOverview.PNG`).

## Videos

Don't commit video files to the repo. Host externally (YouTube, Loom, or another
supported domain) and embed the URL:

```markdown
{% embed url="https://www.youtube.com/embed/your-video-id" %}
```

## Embedded workflows

Embed an n8n workflow so readers can view and interact with it in the page.
Reference a published template by its template API URL (the template ID appended
to `https://api.n8n.io/workflows/templates/`):

```markdown
{% @n8n-blocks/n8n-workflow-demo content="" url="https://api.n8n.io/workflows/templates/1747" %}
```

## Feature availability

A feature's availability can be limited by plan/platform, by n8n version
(introduced, deprecated, removed), or by Preview status. Reference all three
consistently so readers can tell whether their install supports a feature, and
so automated tools (search, docs assistants, chunk-based retrieval) can extract
the facts reliably even without the surrounding page for context.

### Two version types

Never leave the reader guessing which one you mean:

- **Instance version**: the n8n release, three-part semver (`2.30.0`). Use for
  features, environment variables, APIs, CLI commands, and hooks.
- **Node version**: a node's version number, usually two parts (`4.7`). Use
  only for node-specific facts.

In prose, qualify a bare number: "n8n 2.30.0" or "node version 4.7", not "version 2".

**Writing the number.** Product name plus numerals: `n8n 2.30.0`. No `v` prefix
(`n8n 2.30.0`, not `n8n v2.30.0`), don't write "version" after "n8n", and don't
add "or later"; "available from" already means "and onward". Don't wrap the
version in inline code formatting in running text ("n8n 2.30.0", not
"n8n `2.30.0`") — reserve code formatting for when the version is part of an
actual code snippet, command, or file path (`n8n@2.30.0`, a Docker tag, a
`package.json` value).

### Plan, platform, and version limits

**Where to put it.** Match the scope of what it describes:

- **A whole page or section:** an `info` hint titled **Feature availability**,
  directly below the page title or that section's heading.
- **Mentioned in passing**, with no heading of its own: fold it into the
  sentence, not a hint: "The Data table node (available from n8n 2.17.0)
  stores data between executions".
- **A single table row** (one environment variable, one hook): the description
  cell, or a dedicated **Available on** / **Available from** column when many
  rows differ.

**Name the subject in the body, every time.** The hint's title is always the
generic literal string `**Feature availability**`; it never says what's
available, so the sentence underneath must. Don't rely on the page or section
heading to carry that meaning; hints get skimmed or retrieved independently of
surrounding prose:

```markdown
{% hint style="info" %}
**Feature availability**

Canvas Groups are available from n8n 2.28.0.
{% endhint %}
```

```markdown
{% hint style="info" %}
**Feature availability**

Single sign-on is available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Enterprise
{% endhint %}
```

Rules for the `Available on:` bullets:

- Lead with "`<subject>` is/are available on:". Name both platforms, never
  by omission. On one platform only, add an absence line below the bullet
  ("It isn't available on n8n Cloud.") or, if available elsewhere on request,
  a caveat line in its place ("On n8n Cloud Enterprise, contact n8n to enable it.").
- Tiers list low to high, comma-separated, never "and": Cloud order Starter,
  Pro, Enterprise; self-hosted order Community, Registered Community, Business,
  Enterprise. Use the exact capitalized names; spell out "Registered Community" in full.
- Write "n8n Cloud", not bare "Cloud".
- Whole platform: write `All plans` or `All editions` instead of listing every
  tier. "All plans" already includes the free trial. Never list the trial itself.
- Below the bullets, in order: the absence/caveat line, then the version
  sentence, then any other feature-specific caveat.
- Version-only, deprecation, or removal: skip the bullets, just the title and
  the sentence.
- **Don't link to "Compare plans and editions" or the release notes** from
  inside the hint. State the fact in the sentence and let the reader search
  for the source if they need it.

**Deprecation and removal.** Same `**Feature availability**` title, but a
`warning` hint, and use "from" for both, never "removed in":

```markdown
{% hint style="warning" %}
**Feature availability**

`N8N_RUNNERS_ENABLED` is deprecated from n8n 2.0.
{% endhint %}
```

- Always name a version. Never write "soon" or "in the near future"; if
  removal isn't scheduled, say so.
- Name the replacement, and the removal version if known, as a second sentence
  (for example, "Use `publish:workflow` instead. Removed from n8n 3.0.").
- For a deprecated table entry, tag the identifier with `(deprecated)` and
  state the version in the description:

  ```markdown
  | `N8N_RUNNERS_ENABLED` (deprecated) | Boolean | `false` | Whether task runners are enabled. Deprecated from n8n 2.0; you no longer need to set it. |
  ```

- Link to the matching [breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v20-breaking-changes)
  or migration guide entry.

If the whole page is about the deprecated or removed feature, also add a
primary `deprecated` tag (label "Deprecated", color red; see
[Tags](#tags) for how tags work). No `status:` field; `deprecated` isn't a
verified value for it:

```yaml
---
tags:
  - tag: deprecated
    primary: true
---
```

**Inline or passing mention**: a small control, option, field, role, or a
whole feature/node with no heading of its own. One full sentence, naming the
specific thing (never "this feature" or "this option"; the sentence must
stand on its own out of context):

```markdown
The **Scopes** option is available on n8n Cloud Pro, Enterprise, and self-hosted Enterprise.
```

```markdown
The **Legacy format** field is deprecated from n8n 2.30.0.
```

Two sentences max, plan/platform first. More than two sentences, or both
platform bullets: promote it to a scoped hint instead.

**Node status.** Deprecated, removed, and versioned nodes are tracked on one page:
[Deprecated and versioned nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/deprecated-nodes).
Link to it rather than scattering version notes across node pages. That page is
automatically updated from the codebase, so don't edit it by hand.

### Preview status

A feature in Preview works but isn't complete or stable, and may change. "Preview"
is a feature's maturity label, capitalized wherever it names that status ("is in
Preview", "a Preview feature"), same as "Deprecated"/"Archived". Use "Preview",
not "beta". Frontmatter and tag values stay lowercase (`status: preview`,
`tag: preview`) since they're literal identifiers, not prose.

**Page or section:** a `**Preview status**` title, not `**Feature
availability**`. Preview answers a different question than availability (how
stable is this? vs. where/when does this exist?), so it always gets its own
title and box — never a second hint titled "Feature availability" sitting
next to the availability one. Name the node or feature in the sentence below
it, not in the title. Hints get skimmed independently of the surrounding
heading, so the sentence must carry the naming:

```markdown
{% hint style="info" %}
**Preview status**

The Data table node is in Preview and may change in future releases. Avoid
relying on it in production workflows.
{% endhint %}
```

If the whole page is about the feature in Preview, also set `status: preview` and
add a primary `preview` tag (see [Tags](#tags) for how tags work):

```yaml
---
status: preview
tags:
  - tag: preview
    primary: true
---
```

**Inline or passing mention:**

```markdown
The **Streaming response** option is in Preview and may change in future releases.
```

- Tie it to a version when it helps: "In Preview from n8n 2.20.0".
- Keep it in a separate sentence (or a separate hint titled "Preview status")
  from any plan/version availability note — don't fold Preview wording into
  the availability sentence, and don't title a Preview-only hint "Feature
  availability".
- If an inline Preview note needs more than one sentence, promote it to a
  page- or section-level hint instead.

---

## Linting

### Vale

Vale checks spelling, grammar, and style guide adherence. The style rules ship
with the repo, so no extra setup is needed. Run it from the repo root:

```bash
vale docs/                 # lint a directory
vale docs/path/to/file.md  # lint a single file
```

Or install the [vale-vscode](https://github.com/chrischinchilla/vale-vscode)
extension to see issues inline. Fix any errors and warnings before submitting a PR.

Custom rules live in the `styles/` directory. Add accepted brand names to the
Vale vocabulary accept list.

One custom rule enforces the versioning conventions above:

- `n8n-styles.version-format` flags `v`-prefixed version numbers (write
  `n8n 2.17.0`, not `n8n v2.17.0`). It's disabled on `changelog/` pages,
  which use `vX.Y` shorthand and reference many external versions. It can't tell
  an n8n version from an external service's version, so dismiss the occasional
  match on a third-party API version.

The hint's bold title is always the fixed string `**Feature availability**` —
the version number lives in the plain-text sentence below it (for example,
"Canvas Groups are available from n8n 2.28.0"), so `version-format` does check
it. Get the format right regardless; don't rely on linting alone to catch it.

### Lexi

Lexi measures readability. Target scores:

| Metric | Ideal |
|--------|-------|
| Combined readability | 60 or higher |
| Flesch Reading Ease | 60 or higher |
| Gunning Fog | 8 or less |
| Automated Readability Index | 8 or less |
| Coleman Liau Index | 8 or less |
| Dale-Chall Readability | 6.9 or less |

To improve a Lexi score: shorten sentences, replace multi-syllable words with simpler alternatives, and break up dense paragraphs.