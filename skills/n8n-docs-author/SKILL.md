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
- **Placeholders:** `<hyphenated-words>` inside code spans, lowercase by default or uppercase to match a convention such as environment variables (for example `<YOUR-API-KEY>`).
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
- **Self-contained sections:** retrieved on its own, a section that leans on
  surrounding context arrives stripped of it and the agent guesses. Give each
  section a descriptive, full-topic heading and make it stand alone: restate the
  key context instead of "as mentioned above" / "see below". Restate, don't
  duplicate — repeat a fact or two, not whole paragraphs (sections that need the
  same long explanation belong under one heading).
- **Cross-references:** link every page to its prerequisites and its next step,
  link parents and children both ways (an overview lists all its child pages;
  each child links back with `./`), and aim for each page to sit in a cluster of
  5+ interlinked pages on the same topic (AI search cites connected clusters far
  more than standalone pages). Put
  links in the body at the first meaningful mention, with descriptive anchor text
  naming the target ([Configure the Schedule Trigger](...), never "click here").
  Links point to separate topics; they don't replace context a section needs, so
  restate that instead.

## Feature availability

Reference plan/platform limits, n8n versions, and Preview status consistently.
See [reference.md](reference.md) for full examples and rules.

- **Two version types:** instance version (the n8n release, three-part semver
  like `2.30.0`) and node version (a node's version, usually two parts like
  `4.7`). Qualify a bare number in prose ("n8n 2.30.0", "node version 4.7"),
  never just "version 2".
- **Format:** product name plus numerals: `n8n 2.30.0`. No `v` prefix, don't
  write "version" after "n8n", and don't add "or later"; "available from"
  already means "and onward". Don't wrap the version in inline code formatting
  in running text (write "n8n 2.30.0", not "n8n `2.30.0`"). Only use code
  formatting when the version is part of an actual code snippet, command, or
  file path (`n8n@2.30.0`, a Docker tag, a `package.json` value).
- **Placement:** match the scope. Whole page or section → an `info` hint titled
  `**Feature availability**` under the page title or heading. Mentioned in
  passing with no heading of its own → fold it into the sentence ("The Data
  table node (available from n8n 2.17.0) stores data between executions"). A
  table row → description cell, or a dedicated column when many rows differ.
- **Name the subject in the body, always.** The hint title is the fixed string
  `**Feature availability**`; it never says what's available, so the sentence
  underneath must ("Canvas Groups are available from n8n 2.28.0.", not
  "Available from n8n 2.28.0."). Same for inline mentions: never "this feature"
  or "this option".
- **Plan/platform bullets:** `<subject> is/are available on:` then
  `- **n8n Cloud:** ...` / `- **Self-hosted:** ...`, tiers low to high. Name
  both platforms. Add an absence line ("It isn't available on n8n Cloud.") or
  caveat line if it's on one only. Skip the bullets entirely for a version-only,
  deprecation, or removal hint.
- **Preview:** an `info` hint titled `**Preview status**` — never
  `**Feature availability**`, and never folded into the same hint as one.
  Preview answers a different question (how stable is this?) than
  availability (where/when does this exist?), so it always gets its own
  title and box, even when it sits right next to an availability hint for the
  same feature. Name the feature or node in the sentence below it, not
  the title (never "this feature"), saying it may change and isn't for
  production. Use "Preview", not "beta", for a feature's status — capitalize
  it wherever it names the status ("is in Preview", "a Preview feature"), same
  as "Deprecated"/"Archived". Frontmatter and tag values stay lowercase
  (`status: preview`, `tag: preview`) since they're literal identifiers, not
  prose. Whole page → also set `status: preview` plus a primary `preview` tag
  (see Frontmatter's `tags` field, below).
- **Deprecation and removal:** a `warning` hint, same `**Feature availability**`
  title, using "from" for both ("deprecated from n8n 2.0", "removed from n8n 3.0";
  never "removed in"). Name the replacement and removal version if known.
  Always name a version, never a vague timeframe. Whole page → also add a
  primary `deprecated` tag (label "Deprecated", color red), no `status:` field.
- **Node status** (deprecated, removed, versioned): link to the Deprecated and
  versioned nodes page rather than restating per node. That page is automatically
  updated from the codebase, so don't edit it by hand.

## Frontmatter

Every page opens with valid YAML frontmatter. Fields n8n Docs uses:

- `description`: short summary of the page. May appear in search results and link previews.
- `layout.description.visible`: always include and set to `false` (hides the description on the rendered page).
- `hidden`: set to `true` to remove the page from the side menu. Omit for normal pages (most pages appear in the menu).
- `generated`: `true` marks the page as fully automation-managed. Don't edit these by hand.
- `tags`: a **visual tag** renders as a label on the page and side menu, but
  only if it's defined in the space's `.gitbook/tags.yaml` first. An
  unregistered plain string in the array is inert and renders nothing. Use
  `- tag: <name>, primary: true` for the main visual label. Only three visual
  tags are allowed docs-wide: **Deprecated**, **Preview**, and **Archived**.
  See [reference.md](reference.md) for the full format.

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

**Worked examples:** for any code, expression, or config surface, include an
example — readers and agents rely on examples more than prose. Cover the common
case, then edge cases and failures (the error and the fix). Favour diverse
examples over near-identical ones, comment each example's intent inline, label
placeholders as `<hyphenated-words>`, and put parameters, defaults, and limits in
a table or schema block, not a paragraph. If you show a wrong example, pair it
with the correct one beside it.

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