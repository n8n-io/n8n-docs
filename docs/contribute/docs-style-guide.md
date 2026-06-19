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

## Frontmatter

Frontmatter sits at the top of a page and must be valid YAML. n8n Docs uses the following frontmatter fields:

- `description`: A short summary of the page content. n8n may display it in search results and link previews.
- `hidden`: When set to `true`, removes the page from the site's side menu. Omit this field if the page should appear in the menu (most pages do).
- `layout.description.visible`: When set to `false`, hides the frontmatter description on the rendered page. Always include this field and set it to `false`.
- `generated`: When set to `true`, marks the page as fully managed by an automation. Don't update these pages manually.

Frontmatter example:

```
---
description: Learn how to merge data streams in your n8n workflows.
layout:
  description:
    visible: false
---
```

{% hint style="info" %}
You may see other frontmatter fields on existing n8n Docs pages, such as `contentType`, `nodeTitle`, `originalFilePath`, `originalUrl`, and `url`. These support migration management on pre-existing pages. Don't add them to new pages.
{% endhint %}

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

### Images

Each space has a single folder for all its images, at `.gitbook/assets/` in the root of that space:

​```
docs/
├── build-workflows/                      # space root
│   ├── .gitbook/
│   │   └── assets/                       # all images for this space live here
│   │       └── workflow-overview.png
│   ├── understand-workflows/
│   │   └── current-page.md
│   └── manage-workflows/
│       └── export-import.md
├── deploy-n8n/
│   ├── .gitbook/
│   │   └── assets/                       # all images for this space live here
│   │       └── hosting-diagram.png
​```

Images must be stored in the `.gitbook/assets/` folder of the space where they're used. You can't reference an image from another space's assets folder.

Reference images using a path relative to the page you're editing. From any page within the space, step up to the space root first, then into `.gitbook/assets/`:

**From a page one level deep** (e.g. `build-workflows/manage-workflows/export-import.md`):

​```
![Alt text](../.gitbook/assets/workflow-overview.png)
​```

**From a page two levels deep** (e.g. `build-workflows/understand-workflows/current-page.md`):

​```
![Alt text](../../.gitbook/assets/workflow-overview.png)
​```

**Alt text**

Always write descriptive alt text. It supports accessibility and is displayed if the image fails to load.

- Describe what the image shows, not what it is. "Workflow canvas with a Schedule Trigger connected to an HTTP Request node", not "screenshot".
- Keep it under 125 characters.
- Don't start with "Image of" or "Screenshot of".

**Image files**

- Use PNG for screenshots and diagrams.
- Use SVG for icons and simple illustrations where available.
- Keep file sizes reasonable — compress PNGs before committing. [Squoosh](https://squoosh.app/) is a free browser tool.
- Use lowercase, hyphenated file names: `workflow-overview.png`, not `WorkflowOverview.PNG`.

### Videos

Don't store video files in the n8n-docs repository. Host videos externally — for example on YouTube, Loom or another [supported domain](https://iframely.com/domains) — and embed them in the page.

To embed a video, paste the URL inside embed tags as follows:

```
{% embed url="https://www.youtube.com/embed/your-video-id" %}
````

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

### Reusable content

Reusable content lets you store a block of content once and reference it across multiple pages and spaces. When you edit the source, the change propagates to every page that references it, so you don't have to find and update duplicate copies.

Create reusable content in the `.gitbook/includes` space at the root of the repository. Add a file containing the content you want to reuse, and give it a title:

{% code title="reusable-content-descriptor.md" %}
```
---
title: reusable-content-descriptor
---
Content that will be reused.

You can display it on multiple pages.

When you edit this source file, the changes propagate to every page that references it.
```
{% endcode %}

Reference the content with the `include` syntax to display it on any page or space. Point to the path of your reusable content file. Make the path relative to the file containing the reference.

```
{% include "../gitbook/includes/reusable-content-descriptor.md" %}
```

### Embedded workflows

You can embed an n8n workflow in a page so readers can view and interact with it directly in the docs. There are two ways to reference the workflow.

Reference a published template by its template API URL:

```
{% @n8n-blocks/n8n-workflow-demo content="" url="https://api.n8n.io/workflows/templates/1747" %}
```

Reference a workflow JSON file stored in the docs repository, using a relative path:

```
{% @n8n-blocks/n8n-workflow-demo content="" url="../let_your_ai_call_an_api.json" %}
```
