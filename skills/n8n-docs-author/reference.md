# n8n docs author — formatting reference

Full syntax examples for MkDocs constructs used in n8n-docs.

## External links

All external links must open in a new tab and carry the `.external-link` class:

```markdown
[Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/){:target="_blank" .external-link}
```

## Admonitions

Use the experimental `///` syntax (not the `!!!` Material default):

```markdown
/// note | Note title
Content here.
///

/// warning | Warning title
Content here.
///

/// danger | Danger title
Content here.
///

/// info | Info title
Content here — typically used for feature restrictions (pricing tier, platform).
///
```

**Don't over-use admonitions.** They lose their effectiveness if used frequently.

## Collapsible admonition blocks

Uses standard Material theme syntax with `???`:

```markdown
??? note "Collapsible title"
    Content must be indented four spaces.

    You can include lists, code blocks, and other Markdown here.
```

## Tabbed content

Use tabs when content differs by platform, language, or configuration. Use sparingly — they can hide content from users.

```markdown
=== "First tab"

    Content indented four spaces.

    - List item one
    - List item two

=== "Second tab"

    1. Numbered list
    2. Another item
```

See the [Material docs](https://squidfunk.github.io/mkdocs-material/reference/content-tabs){:target="_blank" .external-link} for more detail.

## Code blocks

Always use **tabs, not spaces** for indentation inside code blocks. This matches the n8n node linter convention and prevents linter failures if users copy the code.

````markdown
```typescript
function example() {
	const value = 'uses a tab here';
	return value;
}
```
````

## Placeholders in code

Placeholders inside code spans or blocks use hyphenated words in angle brackets:

```markdown
Run `n8n start --tunnel` from `<your-project-directory>`.
```

---

## Linting

### Vale

Vale checks spelling, grammar, and style guide adherence. Run locally:

```bash
vale --glob="*.md" docs
```

Or install the [vale-vscode](https://github.com/chrischinchilla/vale-vscode){:target="_blank" .external-link} extension to see issues inline.

Custom rules live in `styles/n8n-styles/`. Add accepted brand names to
`styles/config/vocabularies/default/accept.txt`.

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

To improve a Lexi score: shorten sentences, replace multi-syllable words with
simpler alternatives, and break up dense paragraphs.
