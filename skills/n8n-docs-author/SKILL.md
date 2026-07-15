---
name: n8n-docs-author
description: >-
  Authors and reviews n8n documentation pages following the n8n docs style and
  contribution guides. Use when writing new doc pages, editing existing docs,
  reviewing doc PRs, or checking content against the style guide. Covers writing
  style, GitBook formatting syntax (hints, collapsibles, tabs, code blocks),
  internal and external links, and linting guidance. Use when asked to write or
  edit docs, or to review content against the style guide.
---

# n8n docs author

You write and review documentation for the n8n-docs repo.

The definitive guides live in the repo and are the source of truth. This skill
distills them so you can act quickly, but defer to the guides when in doubt:

- **Style guide:** `docs/contribute/style-guide-for-n8n-docs.md` — writing style, frontmatter, and GitBook formatting.
- **Contribution guide:** `docs/contribute/contribution-guide-for-n8n-docs.md` — content types, templates, PR process, and what not to submit.
- **Terminology:** `docs/contribute/terminology.md` — official product terms to use, and the non-official ones to avoid.

The n8n Docs site is built with [GitBook](https://www.gitbook.com/). Pages are
written in Markdown plus GitBook-specific blocks (hints, tabs, collapsibles,
code blocks). Use GitBook syntax, not MkDocs/Material syntax.

## Modes

Determine what the user needs and work accordingly:

1. **Write**: Draft a new page or section. Read nearby existing pages first
   to match structure and tone. Use the correct template from
   `document-templates/` for the page type (see Content types below). Add any
   new page to its space's `SUMMARY.md` so it appears in the navigation (see
   [reference.md](reference.md) for the format).

2. **Edit**: Improve existing content. Read the file first. Fix style
   violations without changing meaning. Preserve GitBook block syntax, link
   format, code block indentation, and existing heading anchor tags exactly.

3. **Review**: Check content against the style guide. Return a table:

   | Location | Current text | Issue | Suggested fix |
   |----------|-------------|-------|---------------|

   Group by: terminology / structure first, then style, then grammar.

## Content types

Each type has a template in the `document-templates/` folder. Match the page
type to its template:

- **Integration nodes**: reference docs for a node. Use the template matching
  the node type — `app-nodes.md`, `core-nodes.md`, `trigger-nodes.md`, or `cluster-nodes.md`.
- **Credentials**: how to authenticate an integration (`credentials.md`).
- **Common issues**: known problems and fixes for a node (`common-issues.md`).
- **Feature**: how-to and reference docs for an n8n feature (`feature.md`).
- **Tutorial**: step-by-step guide to build something (`tutorial.md`).

Don't edit **fully-generated pages** (those with `generated: true` in their
frontmatter) or **course** content (frozen). See the contribution guide's
"What not to submit" section.

---

## Writing rules (non-negotiable)

- **Base guide:** Microsoft Writing Style Guide.
- **Voice:** present tense, active voice (not passive), second-person ("you"). Be direct.
- **Avoid first person:** name n8n instead of "we" or "our". "n8n recommends", not "we recommend".
- **Headings:** sentence case only. Never title case. Write plain Markdown headings; GitBook generates anchors automatically. Don't add `<a href ...></a>` anchor markup to new headings, and don't strip the migration anchors on existing ones.
- **Numbers:** spell out zero–nine; numerals for 10 and above. Exceptions
  (always numerals): decimals, percentages, versions and technical strings, units.
- **Dates and times:** spell out the month, no ordinals ("July 31, 2016"). "AM"/"PM" with a space ("9 AM").
- **Ranges:** "from X to Y" in prose; en dash (–) for numeric ranges in tables/labels.
- **UI elements:** **bold**.
- **User input, file names, paths, commands:** `code formatted`.
- **Placeholders:** `<hyphenated-words>` inside code spans.
- **Brand names:** match exactly — "GitHub" not "Github", "n8n" never "N8n".
- **Concise:** cut filler words. Short sentences. No Latin abbreviations
  (use "for example" not "e.g.", "that is" not "i.e.").
- **Contractions:** always use contractions. "Don't", not "do not".
- **No em dashes:** use a comma for elaborations, or start a new sentence.
- **No ellipses:** rephrase as a complete sentence.
- **Punctuation:** one space between sentences; punctuation inside quotes; use the Oxford comma.
- **Tabs, not spaces** in all code blocks (node linter requirement).

## Plain language

Write simply. AI drafts tend to inflate vocabulary, add filler, and reach for
marketing words. Prefer the plainer version:

| Avoid | Use instead |
|-------|-------------|
| utilize, leverage | use |
| in order to | to |
| functionality, capabilities | features, what it does |
| It's important to note that X | X |
| powerful, robust, seamless, effortless | cut it; state what the feature does |
| allows you to, enables you to | lets you, or rephrase around the action |

- Cut filler openers ("It's important to note that", "Simply").
- One idea per sentence. Split on extra "and"s or comma splices.
- Lead with the action: "To schedule a workflow, add a Schedule Trigger" beats
  "There is a node available that can be used to schedule workflows."

## Terminology and naming

Use one term per concept, and prefer the official product term over a synonym.
Full do/don't list: `docs/contribute/terminology.md`. Highest-value rules:

- **"publish a workflow"**, not "activate".
- **`n8n`** lowercase always; node and UI names in **bold** with exact casing.
- Common fixes: workflow (not flow/automation/scenario), node (not step/block),
  sub-workflow (not subworkflow), self-hosted, community node (not custom node).

## Page length and granularity

One focused page per concept, task, or reference category. Aim for a band, not
the shortest possible page. Pages are the unit humans scan and AI tools (search,
docs assistant) chunk on `##`/`###` headings.

- **Healthy range:** ~1,500–20,000 characters (~250–3,000 words).
- **Merge** pages or sections under ~1,500 characters — too small to retrieve
  well; fold stubs into a parent or sibling.
- **Split** when over ~25,000 characters, when a page mixes content types
  (concept + how-to + reference), or when one section grows without bound
  (per-client examples).
- **Hard limit ~50,000 characters:** agents truncate longer pages.
- **Split by type or task, not by length.** Keep related facts together (all env
  vars for a category, all parameters for a node).
- **Self-contained sections:** AI search and agents retrieve one `##`/`###`
  section at a time, without its neighbours, so a section that leans on
  surrounding context arrives stripped of it and the agent guesses. Give each
  section a descriptive, full-topic heading and make it stand alone: restate the
  key context instead of "as mentioned above" / "see below". Restate, don't
  duplicate — repeat a fact or two, not whole paragraphs (sections that need the
  same long explanation belong under one heading).

## Versioning and release status

Reference n8n versions and status (available, preview, deprecated) consistently.
See [reference.md](reference.md) for full examples and the marker formats.

- **Two version types:** instance version (the n8n release, three-part semver
  like `2.30.0`) and node version (a node's version, usually two parts like
  `4.7`). Qualify a bare number in prose ("n8n 2.30.0", "node version 4.7"),
  never just "version 2".
- **Format:** product name plus numerals: `n8n 2.30.0`. No `v` prefix, and don't
  write "version" after "n8n".
- **Placement (both markers):** match the scope. Whole page → a hint under the
  page title. A section → a hint under its heading. Mentioned in passing → fold
  it into the sentence ("The Data table node (available from n8n 2.17.0) stores
  data between executions"). A table row → description cell, or an **Available
  from** column when many rows differ.
- **Availability:** an `info` hint containing `**Available from n8n 2.17.0**`.
  State the fallback for older versions when there is one.
- **Preview:** an `info` hint saying the feature may change and isn't for
  production. Use "preview" for a feature's status; reserve "beta" for release
  channels, version tracks, and access programs (a beta release, a closed beta).
- **Deprecation:** a `warning` hint with `**Deprecated from n8n 2.0**`, then name
  the replacement and the removal version if known ("n8n removes it in 3.0").
  Always name a version, never a vague timeframe.
- **Tier vs version:** plan or platform limits (Cloud, Enterprise, self-hosted)
  go in their own `info` hint, separate from the version marker.
- **Node status** (deprecated, removed, versioned): link to the Deprecated and
  versioned nodes page rather than restating per node. That page is automatically
  updated from the codebase, so don't edit it by hand.

## Frontmatter

Every page opens with valid YAML frontmatter. Fields n8n Docs uses:

- `description`: short summary of the page. May appear in search results and link previews.
- `layout.description.visible`: always include and set to `false` (hides the description on the rendered page).
- `hidden`: set to `true` to remove the page from the side menu. Omit for normal pages (most pages appear in the menu).
- `generated`: `true` marks the page as fully automation-managed. Don't edit these by hand.

Minimal frontmatter for a new page:

```yaml
---
description: Learn how to merge data streams in your n8n workflows.
layout:
  description:
    visible: false
---
```

Don't add migration-support fields (`contentType`, `nodeTitle`, `originalFilePath`, `originalUrl`, `url`) to new pages, even though existing pages may carry them.

## GitBook formatting syntax

See [reference.md](reference.md) for full examples. Quick reference:

| Element | Syntax |
|---------|--------|
| External link | standard Markdown `[text](url)` (opens in a new tab automatically) |
| Internal link (same space) | relative path including `.md`: `[text](../folder/page.md)`; `[text](./)` for the parent `README.md` |
| Internal link (different space) | GitBook page URL, no `.md`: `[text](https://app.gitbook.com/s/<spaceId>/page-path)`. Each top-level `docs/` folder is a separate space, so relative paths don't cross spaces. See [reference.md](reference.md) for the space ID table |
| Image | `![Alt text](../.gitbook/assets/file.png)` — stored in the space's `.gitbook/assets/` folder |
| Video | `{% embed url="..." %}` — host externally; can't go inside a hint |
| Hint / callout | `{% hint style="info" %}` … `{% endhint %}` |
| Collapsible block | `<details>` … `<summary>Title</summary>` … `</details>` |
| Tabbed content | `{% tabs %}{% tab title="Name" %}` … `{% endtab %}{% endtabs %}` |
| Code block (with options) | `{% code title="File.ts" %}` ```` ``` ```` … `{% endcode %}` |
| Embedded workflow | `{% @n8n-blocks/n8n-workflow-demo content="" url="..." %}` |

**Tabs:** short parallel snippets only (block under ~3,000 chars). AI tools serialize every variant. For long or 4+ variants, use a
heading per variant instead of tabs; split to a page per variant only if the page
would exceed the length guidance. Keep shared content outside the tabs.

**Images:** supplementary only. Agents and screen readers get the alt text and
file path, not the picture, so every instruction, value, and menu path must be in
the prose. Don't screenshot text (code, commands, errors, config); use a code
block or table. Screenshots confirm or orient; they never carry a step on their
own. See [reference.md](reference.md).

### Hint types

Use sparingly — overuse dilutes impact.

| Type | When to use |
|------|-------------|
| `info` | General notes, information to highlight, and feature restrictions (platform or pricing tier) |
| `warning` | Risks or unexpected behaviours |
| `danger` | High security risk or permanent data loss |
| `success` | Positive confirmations or tips. Use sparingly |

---

## More detail

See [reference.md](reference.md) for full syntax examples (hints, collapsibles,
tabs, code blocks, link format) and linting guidance (Vale + Lexi targets).