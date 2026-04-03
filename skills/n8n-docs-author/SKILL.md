---
name: n8n-docs-author
description: >-
  Authors and reviews n8n documentation pages following the n8n docs style
  guide. Use when writing new doc pages, editing existing docs, reviewing doc
  PRs, or checking content against the style guide. Covers writing style,
  MkDocs formatting syntax, admonitions, code blocks, and linting guidance.
  Use when asked to write or edit docs, or to review content against the style guide.
---

# n8n docs author

You write and review documentation for the n8n-docs repo.
All content must follow the style guide at `STYLE_GUIDE.md` (repo root).

## Modes

Determine what the user needs and work accordingly:

1. **Write** — draft a new page or section. Read nearby existing pages first
   to match structure and tone. Use the correct template from
   `document-templates/` for the page type (app node, core node, credentials,
   feature, tutorial, release notes).

2. **Edit** — improve existing content. Read the file first. Fix style
   violations without changing meaning. Preserve admonition syntax, link
   format, and code block indentation exactly.

3. **Review** — check content against the style guide. Return a table:

   | Location | Current text | Issue | Suggested fix |
   |----------|-------------|-------|---------------|

   Group by: terminology / structure first, then style, then grammar.

---

## Writing rules (non-negotiable)

- **Base guide:** Microsoft Writing Style Guide.
- **Voice:** present tense, active voice, second-person ("you"). Be direct.
- **Headings:** sentence case only. Never title case.
- **Numbers:** spell out zero–nine; numerals for 10 and above.
- **UI elements:** **bold**.
- **User input, file names, paths, commands:** `code formatted`.
- **Placeholders:** `<hyphenated-words>` inside code spans.
- **Brand names:** match exactly — "GitHub" not "Github", "n8n" never "N8n".
- **Concise:** cut filler words. Short sentences. No Latin abbreviations
  (use "for example" not "e.g.", "that is" not "i.e.").
- **Tabs, not spaces** in all code blocks (node linter requirement).

## MkDocs formatting syntax

See [reference.md](reference.md) for full examples. Quick reference:

| Element | Syntax |
|---------|--------|
| External link | `[text](url){:target="_blank" .external-link}` |
| Admonition | `/// note \| Title` … `///` |
| Collapsible block | `??? note "Title"` (indented content) |
| Tabbed content | `=== "Tab name"` (four-space indent) |

### Admonition types

Use sparingly — overuse dilutes impact.

| Type | When to use |
|------|-------------|
| `note` | General information to highlight |
| `warning` | Risks or unexpected behaviours |
| `danger` | High security risk or permanent data loss |
| `info` | Feature restrictions (platform or pricing tier) |

---

## Checklist before finishing

- [ ] Headings in sentence case
- [ ] UI elements bold, user input code-formatted
- [ ] Placeholders use `<hyphenated-angle-bracket>` style
- [ ] External links include `{:target="_blank" .external-link}`
- [ ] Code blocks use tabs, not spaces
- [ ] Numbers zero–nine spelled out
- [ ] Active voice, present tense, "you"-form
- [ ] No Latin abbreviations
- [ ] Admonitions used sparingly and correct type chosen
- [ ] Brand names spelled correctly
- [ ] Run Vale on every file you wrote or edited: `vale <file>`. Fix all errors and warnings before finishing.

## More detail

See [reference.md](reference.md) for full syntax examples (admonitions,
collapsibles, tabs, link format) and linting guidance (Vale + Lexi targets).
