---
description: The writing style, formatting conventions, and GitBook block syntax to follow when contributing to n8n Docs
contentType: howto
---

# Style guide for n8n Docs

## Writing style

n8n uses the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/). This page highlights the elements that matter most for n8n Docs and adds our custom style choices.

### Plain language

* Clearly explain each step of the process you are documenting.
* Use present tense.
* Keep your writing as concise as possible. Two free browser apps to help:
    * [Hemingway](https://hemingwayapp.com/) measures language complexity. There's no fixed rule about what grade to aim for, but the lower the reading grade, the better.
    * [Lexi](https://rebilly.github.io/lexi/) measures writing complexity in Markdown text, combining several measures into one readability score. The ideal combined readability score of 60 should be regarded as a minimum — most pages should score higher.

Watch for these common patterns and prefer the plainer version:

| Avoid | Use instead |
| --- | --- |
| utilize, leverage | use |
| in order to | to |
| functionality, capabilities | features, what it does |
| It's important to note that X | X |
| n8n provides a powerful, seamless way to... | n8n lets you... |

A few rules of thumb:

* **Cut filler.** Drop openers like "It's important to note that" or "Simply".
* **Avoid marketing language.** Skip "powerful", "robust", "seamless". State what the feature does.
* **Cut vague qualifiers.** Drop "very", "quite", "several", or give a specific figure.
* **Keep sentences short.** Under 30 words, one idea each. Split anything held together by a semicolon or a second "and".
* **Lead with the action, not "There is".** "To schedule a workflow, add a Schedule Trigger", not "There is a node that can schedule workflows".

### Voice and person

Write as if you're speaking directly to the reader.

* **Use active voice.** "n8n sends the request", not "the request is sent by n8n".
* **Address the reader as "you".** "You can add a node", not "Users can add a node".
* **Avoid first person.** Name n8n instead of "I", "we", or "our". "n8n recommends", not "we recommend".
* **Use contractions.** "Don't" and "you'll", not "do not" and "you will".

### Inclusive language

Write for everyone.

* **Use "they" for an unknown person.** "Every user can configure their settings", not "his settings".
* **Choose gender-neutral terms.** "Chair", not "chairman". "Main", not "master".

### Text formatting

* Headings: sentence case ([more info](https://docs.microsoft.com/en-us/style-guide/scannable-content/headings#formatting-headings))
* UI elements: bold ([more info](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions))
* User input: code formatted. Placeholders as hyphenated words in angle brackets. For example `<your-root-directory>`.
* File names, directory names, and paths: code formatted.
* Make sure you match brand names precisely. For example: "GitHub", not "Github".

### Numbers, dates, and times

Write zero to nine in letters, 10 and above in numerals.

Obvious exceptions:
- **Decimals**: always use numerals, even under 10 (e.g. 3.5, not three point five)
- **Percentages**: use numerals (e.g. 5%, not five percent)
- **Versions and other technical strings**: use numerals (e.g. n8n 2.1, step 3)
- **Units of measurement**: use numerals (e.g. 5px, 3MB)

**Dates and times**

- Spell out the month and don't use ordinals: "July 31, 2016", not "31/07/2016" or "July 31st".
- Use "AM"/"PM" with a space: "9 AM", not "9am".

**Ranges**

- Use "from X to Y" or "X through Y" in prose: "from 5 to 10 nodes".
- Use an en dash (–), not a hyphen, for numeric ranges in tables or labels: "5–10".
- For times, use "to": "9 AM to 5 PM", not "9 AM–5 PM".

[More info](https://docs.microsoft.com/en-us/style-guide/numbers)

### Punctuation and spacing

* **One space between sentences**, not two.
* **Punctuation goes inside quotes.** "Select Save," not "Select Save".
* **Use the Oxford comma.** "triggers, nodes, and credentials".
* **Avoid em dashes** (—). Use a comma or a new sentence. "Add a node, then save", not "Add a node — then save".
* **Avoid ellipses** (…). "Configure the settings, then continue", not "Configure the settings...".

## Vale linting
 
n8n uses [Vale](https://docs.errata.ai/) to lint documentation. Linting enforces the rules defined in this guide and supports writing quality.

The setup comprises:

- A `.vale.ini` file in the root of the repo, containing the configuration.
- A `styles` directory, containing the style definitions. This includes off-the-shelf style libraries and n8n-specific styles.
- A GitHub Action. This runs Vale when a PR is opened or modified, and reports any contraventions directly on the PR.

You can run Vale locally on your machine as follows:

1. Follow the Vale docs to [install Vale CLI](https://vale.sh/docs/vale-cli/installation/).
2. Choose whether to lint from the command line, or install a text editor plugin:
    1. Running `vale --glob="*.md" docs` will lint all Markdown files in the `docs` directory
    2. Or install a plugin and view problems automatically in your text editor. If using VS Code, install [vale-vscode](https://github.com/chrischinchilla/vale-vscode) by ChrisChinchilla.

## Markdown and GitBook blocks

The site is generated with [GitBook](https://www.gitbook.com/). Pages are written in [Markdown](https://commonmark.org/), plus GitBook-specific components like callouts, tabs, and structured page elements. GitBook calls these components **blocks**, and the sections below cover the ones you'll use most often.

{% hint style="info" %}
For the Markdown representation of every available block type, see the [GitBook documentation](https://gitbook.com/docs/creating-content/blocks).
{% endhint %}

### Links

### External links

Use standard Markdown link syntax:

```
[commits](https://github.com/n8n-io/n8n/compare/n8n@0.176.0...n8n@0.177.0)
```

External links automatically open in a new tab.

### Internal links

Use standard Markdown link syntax and link to the relative path of the target file, including its `.md` extension. Link to the target file rather than typing a raw path, as these references are automatically kept up to date when pages move or are renamed.

The relative path depends on where the target sits in relation to the page you're editing. The examples below all assume you're editing `current-page.md` in this file tree:

```
docs/                                     # docs root
├── build-workflows/                      # current space
│   ├── README.md                         # space landing page
│   ├── understand-workflows/             # subfolder (section) in the space
│   │   ├── README.md                     # section landing page (parent of current-page.md)
│   │   ├── current-page.md               # <- you're editing this page
│   │   └── another-page.md               # sibling page, same level
│   └── manage-workflows/                 # another subfolder in the same space
│       ├── README.md                     # section landing page
│       └── export-import.md              # page in a different subfolder
├── deploy-n8n/                           # another space
│   ├── README.md                         # space landing page
│   └── hosting/                          # subfolder in another space
│       ├── environment-variables.md      # page in a different space
│       └── configure.md                  # another page in that subfolder
└── administer/                           # another space
```

**Link to a page in the same subfolder in the same space**

Use the file name on its own:

```
[link text](another-page.md)
```

**Link to the current page's parent page**

Use `./`, which points at the parent page — the `README.md` landing page of the current folder (`understand-workflows`):

```
[link to a parent page](./)
```

**Link to a page in a different subfolder in the same space**

Step up out of the current folder with `../` for each level, then down into the target folder:

```
[link to a page](../manage-workflows/export-import.md)
```

**Link to a page in a different space**

Spaces share the same `docs/` root, so step up to the root with `../`, then down through the target space and its subfolders:

```
[link to a page](../../deploy-n8n/hosting/environment-variables.md)
```

### Code examples

Use tabs not spaces. This is important because the n8n node linter enforces this convention. Any code samples in the 'Creating nodes' section could be copied into a user's node, then cause a linter fail if they use spaces.

Use fenced code blocks with a language identifier for syntax highlighting:

````
```typescript
// Your code here
```
````

```typescript
// Your code here
```

GitBook supports [optional code block settings](https://gitbook.com/docs/creating-content/blocks/code-block). Add a title, wrapping, or line numbers when they help the reader:

````
{% code title="MyNode.node.ts" overflow="wrap" lineNumbers="true" %}
```typescript
// Your code here
```
{% endcode %}
````

{% code title="MyNode.node.ts" overflow="wrap" lineNumbers="true" %}
```typescript
// Your code here
```
{% endcode %}

### Hints

Hints (also known as admonitions or callouts) draw readers' attention to specific pieces of important information. There are four styles of hint: `info`, `warning`, `danger`, and `success`. Use them as follows:

* `info` for general notes, information you want to stand out, and feature restriction boxes (features limited to certain platforms or pricing tiers).
* `warning` if something has risks or unexpected behaviours.
* `danger` if something is a high security risk (such as opening a tunnel to your local n8n instance), or destructive (the user can permanently lose data if they do this wrong).
* `success` for positive confirmations or tips. Use sparingly.

**Don't over-use hints. They lose their effectiveness if they're used a lot.**

Use the following [hint syntax](https://gitbook.com/docs/creating-content/blocks/hint):

```
{% hint style="info" %}
Some hint content.
{% endhint %}
```

{% hint style="info" %}
Some hint content.
{% endhint %}


If you want to add a header block, or title, to your hint, add a header block as the first line of the hint:

```
{% hint style="info" %}
## This is the hint title/heading

Some hint content

{% endhint %}
```

{% hint style="info" %}
## This is the hint title/heading

Some hint content

{% endhint %}

### Collapsible blocks

Similar to hints, but collapsed. The user clicks to expand. Use them for supplementary detail that would otherwise clutter the page.

Collapsible content is rendered from a standard HTML `<details>` block:

```
<details>

<summary>Summary text the user clicks</summary>

Some collapsible content. Standard Markdown works inside the block.

</details>
```

<details>

<summary>Summary text the user clicks</summary>

Some collapsible content. Standard Markdown works inside the block.

</details>

### Tabbed content

When a block of content is different due to external considerations (platform, coding language etc) it **can** be useful to separate it using tabs, so the user sees only the content relevant to them. Use tabbed sections sparingly as they could impact discoverability.

Denote tabbed content like this:

```
{% tabs %}
{% tab title="First tab" %}
The content is rendered following the normal Markdown syntax. To add a list:

* Item one
* Another item
* Still more items
{% endtab %}

{% tab title="Second tab" %}
1. Content for the second tab.
2. No indentation is required.
{% endtab %}
{% endtabs %}
```

{% tabs %}
{% tab title="First tab" %}
The content is rendered following the normal Markdown syntax. To add a list:

* Item one
* Another item
* Still more items
{% endtab %}

{% tab title="Second tab" %}
1. Content for the second tab.
2. No indentation is required.
{% endtab %}
{% endtabs %}