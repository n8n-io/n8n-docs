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