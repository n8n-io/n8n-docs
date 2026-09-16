---
nodeTitle: Style guide for n8n Docs
originalFilePath: dummy1.md
originalUrl: https://docs.n8n.io/dummy1
url: https://docs.n8n.io/contribute/style-guide-for-n8n-docs
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
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

| Avoid                                       | Use instead            |
| ------------------------------------------- | ---------------------- |
| utilize, leverage                           | use                    |
| in order to                                 | to                     |
| functionality, capabilities                 | features, what it does |
| It's important to note that X               | X                      |
| n8n provides a powerful, seamless way to... | n8n lets you...        |

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

### Terminology and naming

Use the same term for the same concept everywhere, and prefer the official product term over a plausible synonym (for example, "publish a workflow", not "activate a workflow"). In prose, use sentence case; for a literal UI label or node name, use bold with the product's exact casing. Write the product name as "n8n", lowercase, even at the start of a sentence.

See the [Terminology and naming](terminology.md) word list for the full set of terms to use and avoid.

### Text formatting

* Headings: sentence case ([more info](https://docs.microsoft.com/en-us/style-guide/scannable-content/headings#formatting-headings))
* UI elements: bold ([more info](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions))
* User input: code formatted. Placeholders as hyphenated words in angle brackets, lowercase by default or uppercase to match a convention such as environment variables. For example `<your-root-directory>` or `<YOUR-API-KEY>`.
* File names, directory names, and paths: code formatted.
* Make sure you match brand names precisely. For example: "GitHub", not "Github".

### Numbers, dates, and times

Write zero to nine in letters, 10 and above in numerals.

Obvious exceptions:

* **Decimals**: always use numerals, even under 10 (e.g. 3.5, not three point five)
* **Percentages**: use numerals (e.g. 5%, not five percent)
* **Versions and other technical strings**: use numerals (e.g. n8n 2.1, step 3)
* **Units of measurement**: use numerals (e.g. 5px, 3MB)

**Dates and times**

* Spell out the month and don't use ordinals: "July 31, 2016", not "31/07/2016" or "July 31st".
* Use "AM"/"PM" with a space: "9 AM", not "9am".

**Ranges**

* Use "from X to Y" or "X through Y" in prose: "from 5 to 10 nodes".
* Use an en dash (–), not a hyphen, for numeric ranges in tables or labels: "5–10".
* For times, use "to": "9 AM to 5 PM", not "9 AM–5 PM".

[More info](https://docs.microsoft.com/en-us/style-guide/numbers)

### Punctuation and spacing

* **One space between sentences**, not two.
* **Punctuation goes inside quotes.** "Select Save," not "Select Save".
* **Use the Oxford comma.** "triggers, nodes, and credentials".
* **Avoid em dashes** (—). Use a comma or a new sentence. "Add a node, then save", not "Add a node — then save".
* **Avoid ellipses** (…). "Configure the settings, then continue", not "Configure the settings...".

## Page length and granularity

Split content into focused pages, each covering a single concept, task, or reference category. Aim for a middle band: neither one monolithic page nor scattered fragments. Human readers and AI tools both do best with self-contained, heading-structured pages: the AI tools that power search and the docs assistant chunk content on `##` and `###` headings, retrieving one section at a time.

### Length

* **Healthy range:** about 1,500 to 20,000 characters (250 to 3,000 words). This reads as scannable sections for people, and as clean retrievable chunks for AI tools.
* **Merge if under ~1,500 characters.** A page or section that small sits below the useful chunk size: AI search merges it with unrelated neighbours, and over-splitting a topic across small pages measurably lowers answer quality. Fold stubs into a parent or sibling page.
* **Split if over ~25,000 characters**, if the page mixes content types (concept, how-to, and reference together), or if one section grows without bound (such as a list of per-client examples).
* **Never exceed ~50,000 characters.** Agents truncate longer pages, so anything past the limit is invisible to them.

### How to split

* Split along **type or task** boundaries (concept, how-to, reference, examples), not arbitrarily by length. This matches how readers navigate and keeps each chunk about one thing.
* Keep related facts **on one page** (all environment variables for a category, all parameters for a node). AI search keeps adjacent content together, so proximity preserves context.

### Keep each section self-contained

Retrieved on its own, a section that leans on its neighbours arrives stripped of that context, so the agent fills the gap by guessing. Write each section so a reader who lands on it alone can understand it:

* **Write descriptive, sentence-case headings.** The heading is the unit AI search retrieves, often without the rest of the page, so name the section's topic in full: "Configure the Schedule Trigger", not "Configuration".
* **Make each section understandable on its own.** Restate the key context a reader needs instead of pointing back to it. Avoid "as mentioned above", "as described in the previous section", and "see below". An agent that retrieves this section out of order, or a reader who arrives from search, can't follow those references.
* **Restate, don't duplicate.** Repeat the one or two facts the section needs, not whole paragraphs. If two sections need the same long explanation, that's a sign they belong together under one heading. Keep restatements short so the page stays concise (see [Plain language](#plain-language)).

### Link to related pages, prerequisites, and next steps

Connect each page to the others on its topic. Explicit, descriptive links let an agent follow a path directly instead of guessing a URL, and they group your pages into a topic cluster that AI search reads as a signal of depth.

* **Always link the prerequisites and the next step**, at minimum.
* **Link parents and children both ways.** An overview or section landing page lists and links to every child page; each child links back to its parent.
* **Aim for a cluster of five or more interlinked pages** on the same topic. AI search cites connected clusters far more than standalone pages.
* **Link in the body, at the first meaningful mention**, with descriptive anchor text that names the target: [Configure the Schedule Trigger](configure-schedule-trigger.md), not "click here". Link the first mention, not every mention.
* **Link to separate topics; don't link for missing context.** A link can't stand in for context this section needs. If a section can't be understood without the linked page, restate the key fact instead (see [Keep each section self-contained](#keep-each-section-self-contained)).

## Feature availability

A feature's availability can be limited in three ways:

* **Plan or platform**: which n8n Cloud plan or self-hosted edition it's on.
* **Version**: which n8n version introduced, deprecated, or removed it.
* **Preview status**: whether it's still stabilizing, may change, or isn't rolled out to everyone yet.

Plan/platform and version limits share one documentation system, covered first below. Preview status works differently and is always documented separately, see [Preview status](#preview-status), further down.

### Plan, platform, and version limits

Document these at one of three scopes:

* **Page or section:** an `info` hint titled **Feature availability**, under the page title or the relevant heading. See Feature availability hints, below.
* **Inline or passing mention:** a short note next to a small option, field, role, or behavior within a larger feature, or a whole feature or node named in prose with no heading of its own - fold the limit into the sentence. See [Inline and passing mentions](#inline-and-passing-mentions), below.
* **Table row:** one row among many, put the limit in the description cell, or a dedicated column if several rows differ. See Table rows, below.

#### Feature availability hints

Examples:

**Both plan and version:**

```
{% hint style="info" %}
**Feature availability**

Environments are available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Enterprise

Available from n8n 2.30.0.
{% endhint %}
```

**Plan only:**

```
{% hint style="info" %}
**Feature availability**

Single sign-on is available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Enterprise
{% endhint %}
```

**Plan only, one platform**, with the required absence line:

```
{% hint style="info" %}
**Feature availability**

Multi-main setup is available on:

- **Self-hosted:** Enterprise

It isn't available on n8n Cloud.
{% endhint %}
```

**Plan caveat, plus version:**

```
{% hint style="info" %}
**Feature availability**

Custom roles are available on:

- **Self-hosted:** Enterprise

On n8n Cloud Enterprise, contact n8n to enable it.

Available from n8n 2.30.0.
{% endhint %}
```

**Version only**: the subject can be a named feature:

```
{% hint style="info" %}
**Feature availability**

Canvas Groups are available from n8n 2.28.0.
{% endhint %}
```

**Version only, node case**: the subject can be a node:

```
{% hint style="info" %}
**Feature availability**

The Chat Trigger node is available from n8n 1.24.0, replacing the Manual Chat Trigger node.
{% endhint %}
```

**Deprecated or removed** uses `warning`, not `info`. Swap the wording for a removal (for example, "`N8N_RUNNERS_ENABLED` removed from n8n 3.0"). The subject here is a setting:

```
{% hint style="warning" %}
**Feature availability**

`N8N_RUNNERS_ENABLED` is deprecated from n8n 2.0.
{% endhint %}
```

If the entire page is about a deprecated or removed feature, also add a primary `deprecated` tag (see [Tags](#tags), under Frontmatter, for how tags work). Don't add a `status:` field, since `deprecated` isn't a verified value for it:

```
---
tags:
  - tag: deprecated
    primary: true
---
```

The tag needs label "Deprecated" and color red defined in the space's `.gitbook/tags.yaml`.

Rules:

* **Hint style:** `warning` for a deprecation or removal (the reader needs to act); `info` for everything else. A hint combining both uses `warning`.
* **Name the subject in the body.** The "Feature availability" hint title doesn't say what's available, so name the node, setting, or feature in the following sentence. Don't rely on a heading outside the hint. Keep "available from n8n X.Y.Z" as an unbroken substring.
* **Platform bullets:** lead with "<Feature> <is/are> available on:". Name both platforms, never by omission. Available on both: one bullet each. Available on one only: that bullet, then an absence line below it ("It isn't available on n8n Cloud." / "...self-hosted."). Available on the other only under a condition (for example, on request): a caveat line takes the absence line's place.
* **Tiers:** list low to high, comma-separated, never "and". Cloud order: Starter, Pro, Enterprise. Self-hosted order: Community, Registered Community, Business, Enterprise. Use the exact capitalized names, and spell out "Registered Community" in full.
* **Write "n8n Cloud", not "Cloud".** Bare "Cloud" is ambiguous.
* **Whole platform:** write `All plans` or `All editions` instead of listing every tier. "All plans" includes the free trial (which mirrors Pro). Never list the trial itself; cover it only on the trial page.
* **Below the bullets, in order:** (1) the absence line, or a caveat line in its place, (2) the version sentence, (3) any other feature-specific caveat.
* **No plan limit** (version-only, deprecation, or removal): skip the bullets, just the title and the sentence.
* **Don't link to Compare plans and editions or the release notes.** Earlier drafts of this guidance added those links to every hint; state the fact in the sentence instead and let the reader search if they need the source.

#### Inline and passing mentions

Use inline wording for a small control, option, field, or role inside a larger feature, or for a whole feature or node named in prose with no heading of its own. Not for a page- or section-wide limit: use a hint instead.

* Name the specific thing, not "this feature" or "this option", since it must stand on its own out of context.
* One sentence per item; two if plan/platform and version both apply, plan/platform first.
* Mention both platforms if both matter; don't imply absence by omission.
* State version, deprecation, or removal plainly ("available from n8n X", "deprecated from n8n X"). Skip the hint-style "Available from" lead-in.
* More than two sentences, or both platform bullets: promote it to a scoped hint instead.

For a control, option, field, or role:

```
The **Scopes** option is available on n8n Cloud Pro, Enterprise, and self-hosted Enterprise.
```

```
The **Legacy format** field is deprecated from n8n 2.30.0.
```

For a whole feature or node with no heading of its own, fold the limit into the sentence:

```
The Data table node (available from n8n 2.17.0) stores data between executions.
```

```
The environments feature (n8n Cloud Enterprise, self-hosted Enterprise) lets you promote workflows between instances.
```

#### Table rows

For one row among many in a table. Use the same vocabulary and ordering as inline text.

Put the limit in the description cell:

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `N8N_RUNNERS_ENABLED` (deprecated) | Boolean | `false` | Whether task runners are enabled. Deprecated from n8n 2.0; you no longer need to set it. |

Or add a dedicated column if several rows differ:

| Variable | Available on | Description |
| :--- | :--- | :--- |
| `N8N_LDAP_ENABLED` | Self-hosted Business, Enterprise | Whether LDAP sign-in is enabled. |
| `N8N_SMTP_HOST` | All editions | SMTP server hostname for outgoing email. |

### Versioning wording

#### Two version types

n8n has two separate version numbers. Never leave the reader guessing which one you mean.

* **Instance version**: the n8n release, written as three-part semver, such as 2.30.0. Use it for features, environment variables, APIs, CLI commands, and hooks.
* **Node version**: a node's version number, usually two parts, such as 4.7. Use it only for node-specific facts.

In prose, qualify a bare number: write "n8n 2.30.0" or "node version 4.7", not just "version 2".

#### Writing version numbers

Follow the [numbers guidance](#numbers-dates-and-times), plus these rules for n8n instance versions:

* **Use the product name and numerals**: n8n 2.30.0.
* **Don't add a `v` prefix**: write "n8n 2.30.0", not "n8n v2.30.0".
* **Don't write the word "version" after "n8n"**: the number alone is clear. Write "n8n 2.30.0", not "n8n version 2.30.0".
* **Don't put the version number in inline code formatting in running text**: write n8n 2.30.0, not n8n `2.30.0`. Only use code formatting when the version appears inside an actual code snippet, command, or file path, for example `n8n@2.30.0`, a Docker tag, or a `package.json` value.

### Preview status

A feature in Preview is available but not yet complete or stable, and may change. "Preview" is a feature's maturity label, capitalized wherever it names that status: "is in Preview", "a Preview feature", "In Preview from n8n 2.20.0". Use "Preview", not "beta". This capitalization only applies to the maturity label — leave unrelated senses of the word (a link preview, a UI preview action) in lowercase. Frontmatter and tag values stay lowercase (`status: preview`, `tag: preview`); they're literal identifiers, not prose.

**Page or section:** use a `**Preview status**` title, not `**Feature availability**`. Preview status is a different question from availability (how stable is this? vs. where/when does this exist?), so it gets its own title, not a second hint with the same label as the availability hint next to it. Name the node or feature in the sentence below it, not in the title. Hints get skimmed independently of the surrounding heading, so the sentence must carry the naming, not the title:

```
{% hint style="info" %}
**Preview status**

The Data table node is in Preview and may change in future releases. Avoid relying on it in production workflows.
{% endhint %}
```

If the entire page is about a feature in Preview, also set `status: preview` and add a primary `preview` tag (see [Tags](#tags), under Frontmatter, for how tags work):

```
---
status: preview
tags:
  - tag: preview
    primary: true
---
```

See [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents) for a working example.

**Inline or passing mention:** for a small control, or a whole feature or node named in prose with no heading of its own:

```
The **Streaming response** option is in Preview and may change in future releases.
```

```
The Data table node is in Preview and may change in future releases.
```

* **Tie it to a version when it helps**: "In Preview from n8n 2.20.0".
* **Keep it separate from the Feature availability hint or note.** If a feature also has a plan or version limit, stack both: a Preview status hint alongside a Feature availability hint, or a Preview sentence alongside an availability sentence, rather than folding the Preview wording into the other one.
* **If an inline Preview note needs more than one sentence, promote it to a page- or section-level hint instead.**

## Vale linting

n8n uses [Vale](https://vale.sh/) to lint documentation. Linting enforces the rules defined in this guide and supports writing quality.

The setup comprises:

* A `.vale.ini` file in the root of the repo, containing the configuration.
* A `styles` directory, containing the style definitions. This includes off-the-shelf style libraries and n8n-specific styles.
* A GitHub Action. This runs Vale when a PR is opened or modified, and reports any contraventions directly on the PR.

You can run Vale locally on your machine as follows:

1. Follow the Vale docs to [install Vale CLI](https://vale.sh/docs/install).
2. Choose whether to lint from the command line, or install a text editor plugin:
   1. Running `vale docs/` lints all Markdown files in the `docs` directory
   2. Or install a plugin and view problems automatically in your text editor. If using VS Code, install [vale-vscode](https://github.com/ChrisChinchilla/vale-vscode) by ChrisChinchilla.

## Frontmatter

Frontmatter sits at the top of a page and must be valid YAML. n8n Docs uses the following frontmatter fields:

* `description`: A short summary of the page content. n8n may display it in search results and link previews.
* `hidden`: When set to `true`, removes the page from the site's side menu. Omit this field if the page should appear in the menu (most pages do).
* `layout.description.visible`: When set to `false`, hides the frontmatter description on the rendered page. Always include this field and set it to `false`.
* `generated`: When set to `true`, marks the page as fully managed by an automation. Don't update these pages manually.

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

### Tags

A **visual tag** renders as a label on the page and, if `primary: true`, in the side menu too. It only renders if it's defined in the space's `.gitbook/tags.yaml` (its label and color). Add it as an object in the `tags` array:

```
---
tags:
  - release
  - tag: preview
    primary: true
---
```

In this example, only `tag: preview` is a visual tag. `release` is a plain string with no matching `.gitbook/tags.yaml` entry, so it renders nothing. The `tags` array can carry inert strings like this alongside a real visual tag; they're a different thing, not a second visual tag.

* A visual tag must already be defined in the space's `.gitbook/tags.yaml` before you can apply it: check it exists, and add it if it's missing.
* A visual tag is a label only. It doesn't replace the explanatory hint on the page. The hint is where you explain what the status means; the tag just flags it in the UI.
* The current set of visual tags allowed in docs is: **Deprecated** (a whole page about a deprecated feature), **Preview** (a whole page about a feature in [Preview](#preview-status)), and **Archived** (a page no longer updated). Don't create or use any visual tag other than these three.

## Page navigation

Each space has a `SUMMARY.md` file at its root that defines the sidebar: which pages appear, in what order, and how they nest. GitBook builds the navigation from this file, so a new page won't appear in the sidebar until you add it to `SUMMARY.md`. Creating the `.md` file isn't enough on its own.

A `SUMMARY.md` is a nested Markdown list. Each entry links to a page using a path relative to the space root (the folder where `SUMMARY.md` lives), including the `.md` extension. A `README.md` is the landing page for the space or a section, and indentation nests pages under it:

```
# Summary

* [Administer](README.md)
* [Manage credentials](manage-credentials/README.md)
  * [Share credentials securely](manage-credentials/share-credentials-securely.md)
  * [Credential overwrites](manage-credentials/credential-overwrites.md)
```

When you add a page:

* Add a line for it in the correct `SUMMARY.md`, in the position you want it to appear.
* Use the page title as the link text. It doesn't have to match the page's heading exactly, but keep it close.
* Indent it under its parent section to nest it. The order of entries sets the order in the sidebar.

When you move, rename, or delete a page, update its `SUMMARY.md` entry to match.

## Markdown and GitBook blocks

The site is generated with [GitBook](https://www.gitbook.com/). Pages are written in [Markdown](https://commonmark.org/), plus GitBook-specific components like callouts, tabs, and structured page elements. GitBook calls these components **blocks**, and the sections below cover the ones you'll use most often.

{% hint style="info" %}
For the Markdown representation of every available block type, see the [GitBook documentation](https://gitbook.com/docs/creating-content/blocks).
{% endhint %}

### Headings

Write headings as plain Markdown (`## Heading text`), in sentence case. GitBook generates a clickable anchor from the heading text automatically, so don't add anchor markup yourself.

You'll see explicit anchor tags on existing pages, like:

```
## Heading text <a href="#heading-text" id="heading-text"></a>
```

These pin a stable anchor, so links to the heading keep working even if its text changes later. It is not necessary to add them to new headings, but leave the existing ones in place. If you reword a heading that already has one, keep its anchor tag so existing links don't break.

### Links

#### External links

Use standard Markdown link syntax:

```
[commits](https://github.com/n8n-io/n8n/compare/n8n@0.176.0...n8n@0.177.0)
```

External links automatically open in a new tab.

#### Internal links

How you link depends on whether the target page is in the **same space** or a **different space**. Each top-level folder under `docs/` (such as `build/`, `deploy/`, and `administer/`) is a separate GitBook space.

**Within the same space**, use standard Markdown link syntax and link to the relative path of the target file, including its `.md` extension. Link to the target file rather than typing a raw path, as these references are automatically kept up to date when pages move or are renamed.

The relative path depends on where the target sits in relation to the page you're editing. The examples below all assume you're editing `current-page.md` in this file tree:

```
docs/                                     # docs root
├── build/                                # current space
│   ├── README.md                         # space landing page
│   ├── understand-workflows/             # subfolder (section) in the space
│   │   ├── README.md                     # section landing page (parent of current-page.md)
│   │   ├── current-page.md               # <- you're editing this page
│   │   └── another-page.md               # sibling page, same level
│   └── manage-workflows/                 # another subfolder in the same space
│       ├── README.md                     # section landing page
│       └── export-import.md              # page in a different subfolder
├── deploy/                               # another space
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

Use `./` only if the current folder's landing page is a `README.md`, it points there:

```
[link to a parent page](./)
```

If the parent is a named page instead (no `README.md` in this folder, e.g. `connect-to-n8n-mcp-server.md`), link to that file directly rather than using `./`.

**Link to a page in a different subfolder in the same space**

Step up out of the current folder with `../` for each level, then down into the target folder:

```
[link to a page](../manage-workflows/export-import.md)
```

**Link to a page in a different space**

Relative file paths only resolve within a space. GitBook resolves links between spaces as page references, not file paths, so a `../../` path into another space won't work. Instead, link to the target page's GitBook URL:

```
https://app.gitbook.com/s/<spaceId>/<page-path>
```

Build the URL from two parts:

* `<spaceId>`: the ID of the space the target page lives in. Find it in the table below.
* `<page-path>`: the target page's path within its space folder, with the `.md` extension dropped. A `README.md` becomes its folder path (for example, `host-n8n/configure-n8n/README.md` is just `host-n8n/configure-n8n`).

For example, to link from a page in the `administer` space to `docs/deploy/host-n8n/configure-n8n/user-management.md` in the `deploy` space:

```
[link to a page](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/user-management)
```

Use this form only for a page in a *different* space. For a page in the space you're already editing, use a relative `.md` link instead. GitBook renders both forms, but a space URL drops out of GitBook's rename tracking, so the link breaks when someone moves the target page. It also escapes the revision on a GitBook preview, resolving against published content instead of your changes. The `internal-links` CI check reports these as `same-space-absolute`.

Each top-level folder under `docs/` is a separate space:

| Space folder | Space ID |
| ------------------------------ | ---------------------- |
| `get-started`                  | `CxSeOtVxqqhfxMSac0AV` |
| `build`                        | `rPN1zU5jaYNvwH7RzxqA` |
| `connect`                      | `r7wKI4I1BgdBCuq5Cvcx` |
| `integrations`                 | `BKcbOzIWja8NfqKDcqHc` |
| `deploy`                       | `jm0ZYRpZIPWge2ZSiDYO` |
| `administer`                   | `wMJrGrimpx3PxCJpUswm` |
| `privacy-and-security`         | `ukPPOMQ6NId4gpAIkPXa` |
| `changelog`                    | `hhM8Cox90Piiv0u0EgHM` |
| `contribute`                   | `6OmLnmci5kZDzdkzKREn` |

If you'd rather not build the URL by hand, open the target page in GitBook and copy its link. If you don't have GitBook access, use the page's published `https://docs.n8n.io/...` address instead.

{% hint style="info" %}
Update this table if a space is added, removed, or recreated. Space IDs are stable as long as the space exists. Adding, moving, or editing pages doesn't change them, but a deleted and recreated space gets a new ID.
{% endhint %}

### Images

Images supplement the text; they never carry information on their own. Agents and screen readers receive only an image's alt text and file path, not the picture, so anything the reader must do or know has to be in the prose:

* **Write every instruction in text.** A screenshot can show what a screen looks like, but the step ("Select **Add trigger**, then choose **On schedule**") must be written out. Never leave the only copy of a setting, value, menu path, or click target inside an image.
* **Don't screenshot text.** Put code, commands, error messages, and configuration values in code blocks or tables, so readers can copy them and agents can read them. Don't paste a picture of a terminal or a code editor.
* **Treat screenshots as confirmation, not instruction.** Use them to orient the reader or confirm they're in the right place, alongside the written steps, not instead of them.

Each space has a single folder for all its images, at `.gitbook/assets/` in the root of that space:

```
docs/                                     # docs root
├── build/                                # space root
│   ├── .gitbook/
│   │   └── assets/                       # all images for this space live here
│   │       └── workflow-overview.png
│   ├── understand-workflows/
│   │   └── current-page.md
│   └── manage-workflows/
│       └── export-import.md
└── deploy/                               # another space
    ├── .gitbook/
    │   └── assets/                       # all images for this space live here
    │       └── hosting-diagram.png
```

Images must be stored in the `.gitbook/assets/` folder of the space where they're used. You can't reference an image from another space's assets folder.

Reference images using a path relative to the page you're editing. From any page within the space, step up to the space root first, then into `.gitbook/assets/`:

**From a page one level deep** (e.g. `build-workflows/manage-workflows/export-import.md`):

​ `![Alt text](../.gitbook/assets/workflow-overview.png) ​`

**From a page two levels deep** (e.g. `build-workflows/understand-workflows/current-page.md`):

​ `![Alt text](../../.gitbook/assets/workflow-overview.png) ​`

**Alt text**

Always write descriptive alt text. It supports accessibility and is displayed if the image fails to load.

* Describe what the image shows, not what it is. "Workflow canvas with a Schedule Trigger connected to an HTTP Request node", not "screenshot".
* Keep it under 125 characters.
* Don't start with "Image of" or "Screenshot of".

**Image files**

* Use PNG for screenshots and diagrams.
* Use SVG for icons and simple illustrations where available.
* Keep file sizes reasonable — compress PNGs before committing. [Squoosh](https://squoosh.app/) is a free browser tool.
* Use lowercase, hyphenated file names: `workflow-overview.png`, not `WorkflowOverview.PNG`.

**Inline icons**

When a UI element is only shown as an icon (for example, a menu with no visible text label), embed it inline with an HTML `<img>` tag and `data-size="line"`, so it renders at text height instead of as a block image:

```
select **Workflow menu** <img src="../.gitbook/assets/three-dots-horizontal.png" alt="Workflow menu icon" data-size="line">
```

* Bold the term; don't bold the `<img>` tag.
* Set alt text to `"<Name> icon"`, matching the bolded term.
* See [Terminology and naming](terminology.md) for which icon file maps to which named element.

### Videos

Don't store video files in the n8n-docs repository. Host videos externally — for example on YouTube, Loom or another [supported domain](https://iframely.com/domains) — and embed them in the page.

To embed a video, paste the URL inside embed tags as follows:

```
{% embed url="https://www.youtube.com/embed/your-video-id" %}
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

### Show worked examples for each feature

For anything with a code, expression, or configuration surface, include a worked example. Readers and coding agents rely on examples more than prose.

* **Cover the common case, then the ones that break.** Show the straightforward path, then edge cases (empty input, pagination, rate limits) and failures (the error the reader sees, and the fix).
* **Favour diversity over volume.** Three examples that each show something different beat six near-identical ones. Don't pad; vary.
* **Comment the intent inline.** Say what each example does and why, so it isn't mistaken for another instruction.
* **Label every placeholder.** Use hyphenated words in angle brackets, matching [Text formatting](#text-formatting): `<your-api-key>` or `<YOUR-API-KEY>`, not `YOUR_KEY` or a real value.
* **Structure constraints, don't narrate them.** Put parameters, defaults, and limits in a table or schema block, not a paragraph.

If you show a wrong example, pair it with the correct one beside it. A broken snippet left alone gets copied.

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

Some hint content.

{% endhint %}
```

{% hint style="info" %}
### This is the hint title/heading

Some hint content.
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

Use tabs only for **short** parallel variants. A reader sees one variant, but AI tools read every variant, so long or numerous variants bloat the page. Keep the whole tab block under about one screen (~3,000 characters combined). When variants outgrow that (a full procedure each, or four or more non-trivial variants), drop the tabs and give each variant its own heading on the page, so each becomes a clean, self-contained section. Split into a page per variant only if the combined page would exceed the [page length guidance](#page-length-and-granularity), or the set of variants is open-ended. Keep shared setup and explanation outside the tabbed block so it isn't repeated across variants.

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

### Embedded workflows

You can embed an n8n workflow in a page so readers can view and interact with it directly in the docs. Reference a published template by its template API URL:

```
{% @n8n-blocks/n8n-workflow-demo content="" url="https://api.n8n.io/workflows/templates/1747" %}
```

Find the template API URL by taking a published template's ID and adding it to `https://api.n8n.io/workflows/templates/`.