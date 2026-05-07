# n8n docs writing style

## Quickstart

n8n uses the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

### Text formatting

* Headings: sentence case ([more info](https://docs.microsoft.com/en-us/style-guide/scannable-content/headings#formatting-headings))
* UI elements: bold ([more info](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions))
* User input: code formatted. Placeholders as hyphenated words in angle brackets. For example `<your-root-directory>`.
* File names, directory names, and paths: code formatted.
* Make sure you match brand names precisely. For example: "GitHub", not "Github".

### Numbers

Write zero to nine in letters, 10 and above in numerals.

[More info](https://docs.microsoft.com/en-us/style-guide/numbers)

### Links

All external links open in new tab. Use the following syntax:

```
[commits](https://github.com/n8n-io/n8n/compare/n8n@0.176.0...n8n@0.177.0){:target="_blank" .external-link}
```

Note that the `.external-link` class currently doesn't do anything. However, it effectively tags all external links, making them easy to find - and to re-style in future if we want to.

## Code examples

Use tabs not spaces. This is important because:

* The n8n node linter enforces this convention. Any code samples in the 'Creating nodes' section could be copied into a user's node, then cause a linter fail if they use spaces.
* To accommodate the node linter, we've configured MkDocs to use the preserved_tabs option in the SuperFences extension (more details [here](https://facelessuser.github.io/pymdown-extensions/extensions/superfences/#preserve-tabs)), along with some custom CSS to make the tabs a sensible width. Spaces _should_ still display ok, but tabs are safer.

## Admonitions

We have access to all the [admonitions styles](https://squidfunk.github.io/mkdocs-material/reference/admonitions/) provided by the Material theme. Use them as follows:

* `note` for general notes, information you want to stand out.
* `warning` if something has risks or unexpected behaviours.
* `danger` if something is a high security risk (such as opening a tunnel to your local n8n instance), or destructive (the user can permanently lose data if they do this wrong)
* `info` for feature restriction boxes (features limited to certain platforms or pricing tiers)

**Don't over-use admonitions. They lose their effectiveness if they're used a lot.**

We use an experimental syntax:

```
/// note | Admonition title
Some admonition content.
///
```


## Collapsible admonition blocks

Similar to admonitions, but are collapsed. The user clicks to expand. 

For details we use the main [Material theme syntax](https://squidfunk.github.io/mkdocs-material/reference/admonitions/#collapsible-blocks):

```
??? note "Admonition title"
    Some admonition content.
```

Note the indentation.

We have a custom collapsible admonition, "Details". You can see an example in the [Google Credentials docs](https://docs.n8n.io/integrations/builtin/credentials/google/oauth-generic/).

## Tabbed content

When a block of content is different due to external considerations (platform, coding language etc) it **can** be useful to separate it using tabs, so the user sees only the content relevant to them. Using the material theme, tabbed content is denoted like this:

```
=== "First tab"

    Content should be indented to match the " in the line above (four blank characters)
    The indented content will be rendered following the normal Markdown syntax. To add a list:

    * Item one
    * Another item
    * Still more items

=== "Second tab"

    1. Use tabbed sections sparingly as they could impact discoverability
    2. The tabbed section ends when it is no longer indented

```
See the [material docs](https://squidfunk.github.io/mkdocs-material/reference/content-tabs) for more detail

## Plain language

* Clearly explain each step of the process you are documenting.
* Use present tense, active voice, and "you"-form to address the readers.
* Keep your writing as concise as possible. [Hemingway](https://hemingwayapp.com/) is a free browser app to measure language complexity. There is no fixed rule about what grade to aim for, but the lower the reading grade, the better.

## Linting

n8n uses [Vale](https://docs.errata.ai/) and [Lexi](https://github.com/Rebilly/lexi/tree/main) to lint documentation. Linting supports writing quality, and helps writers use the style guide.

The setup comprises:

- A `.vale.ini` file in the root of the repo, containing the configuration
- A `styles` directory, containing the style definitions. This includes off-the-shelf style libraries for Microsoft, write-good, and alex.
- Two GitHub Actions: one to run Vale and one to run Lexi.

### Vale

Vale is a text linter that checks for spelling, grammar, and style guide adherence. Vale can be run locally (on your machine) or remotely (as part of a CI process) We use the GitHub Action, but we don't currently allow it to fail pull requests, because Vale is detecting some false positives.

#### Running Vale locally

1. Follow the Vale docs to [install Vale CLI](https://vale.sh/docs/vale-cli/installation/).
2. Choose whether to lint from the command line, or install a text editor plugin:
    1. Running `vale --glob="*.md" docs` will lint all Markdown files in the `docs` directory
    2. Or install a plugin and view problems automatically in your text editor. If using VS Code, install [vale-vscode](https://github.com/chrischinchilla/vale-vscode) by ChrisChinchilla.

#### View the GitHub Action linting output

https://github.com/n8n-io/n8n-docs/assets/10284570/c15d45bb-4c7c-4bca-878c-c8fab919fd0c

#### Create custom rules and configure Vale

Vale supports complex rule setups. The [Vale docs](https://vale.sh/docs/) are a good starting point. There is a [playground to help you create rules](https://studio.vale.sh/). The #testthedocs channel in the [Write the Docs Slack](https://www.writethedocs.org/slack/) is a source of support.

In the n8n docs:

* `/styles` contains the dictionaries, style libraries, and most custom rules (some ignore patterns are defined in `.vale.ini`, which is in the root of the project)
* `/styles/config/vocabularies/default` contains the two files to add vocabulary to if you want Vale to accept or reject it. For example, you will often need to add brand names to `accept.txt`.
* `/styles/n8n-styles` is the directory for custom rules.

## Using AI to write and review docs

n8n-docs includes an AI agent skill at `skills/n8n-docs-author/SKILL.md`. It's a distillation of this style guide for use with AI. This style guide is the source of truth — the skill is a convenience, not a replacement for reading it.

### How it works

If you use an AI coding agent from within this repo, the skill can load automatically. For example, the `CLAUDE.md` file at the repo root points Claude Code at the skill, so you don't need to do anything extra.

### How to use it

Ask Claude to write or review docs as you normally would. To be explicit about the mode:

- **Write:** "Write a trigger node page for X."
- **Edit:** "Edit this page to fix style guide violations."
- **Review:** "Review this page against the style guide."

For a review, Claude returns a table of issues grouped by severity, with suggested fixes.

### Lexi

Lexi measures the complexity of writing in Markdown files. It's the product of extensive research and testing (more info here: https://youtu.be/BRZqQ6AjPc0?si=UZOBUpotnDs-bL0n) It applies several different ways of measuring complexity, to come up with a combined readability score.

The team behind Lexi recommend an ideal combined readability score of 60 or higher. I would suggest this is an absolute minimum: many pages should be far better. For example, the docs homepage (which has a chattier style and some custom formatting that Lexi fails to ignore) is still ~64. Most pages should be better than this.

These are the targets for each individual measure:

> Metric | Range | Ideal score
> --- | --- | ---
> Flesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60
> Gunning Fog | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
> Auto. Read. Index | 6 (very easy read) to 14 (extremely difficult read) | 8 or less
> Coleman Liau Index | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
> Dale-Chall Readability | 4.9 (very easy read) to 9.9 (extremely difficult read) | 6.9 or less

Lexi adds the report to the conversation on your pull request. If you make changes, Lexi runs again. You can see reports for different commits by clicking **edited**.

https://github.com/n8n-io/n8n-docs/assets/10284570/75844191-2baf-4893-9474-e74994caa367

