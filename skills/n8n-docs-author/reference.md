# n8n docs author — formatting reference

Full syntax examples for the GitBook constructs used in n8n-docs. The n8n Docs
site is built with [GitBook](https://www.gitbook.com/): pages are Markdown plus
GitBook-specific blocks. For the Markdown representation of every block type,
see the [GitBook blocks documentation](https://gitbook.com/docs/creating-content/blocks).

## Links

### External links

Use standard Markdown link syntax. External links automatically open in a new tab, so you don't need extra attributes or classes:

```markdown
[Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/)
```

### Internal links

Use standard Markdown link syntax and link to the relative path of the target
file, including its `.md` extension. Link to the file rather than typing a raw
URL path, so the reference stays valid when pages move or are renamed.

The relative path depends on where the target sits in relation to the page
you're editing:

```markdown
[same folder](another-page.md)
[parent (the folder's README.md)](./)
[different subfolder, same space](../manage-workflows/export-import.md)
[different space](../../deploy-n8n/hosting/environment-variables.md)
```

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
