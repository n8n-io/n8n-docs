---
nodeTitle: Contribution guide for n8n Docs
originalFilePath: dummy2.md
originalUrl: https://docs.n8n.io/dummy2
url: https://docs.n8n.io/contribute/contribution-guide-for-n8n-docs
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

# Contribution guide for n8n Docs

n8n Docs welcomes contributions from everyone. This guide covers the contribution process, and the guidelines to follow.

## Introduction

n8n Docs is the official documentation for [n8n](https://n8n.io), covering everything from getting started to advanced workflow automation. It's maintained by the n8n team, but community contributions can help by improving explanations, updating content, fixing errors, and more.

All contributions must adhere to our [Code of Conduct](https://github.com/n8n-io/n8n-docs/blob/main/CODE_OF_CONDUCT.md), and follow the standards set out in this contribution guide, as well as the style guide. This ensures quality and consistency across n8n Docs.

n8n Docs content is managed on our [GitHub](https://github.com/n8n-io/n8n-docs) repository. The site is generated with [GitBook](https://www.gitbook.com/). Pages are written in [Markdown](https://commonmark.org/) with GitBook-specific components like callouts, tabs, and structured page elements.

## Types of contribution

Here are the main ways to get involved:

**Fix typos and small errors** Correct typos, broken links, or minor inaccuracies.

**Improve an existing page** If an explanation is unclear, content is outdated, or a page is missing important information, you can suggest modifications and additions.

**Propose new pages** Let us know if you think something is missing entirely from the documentation. Open an issue to describe the required content, before writing anything. This lets the team confirm the content is in scope, and avoids duplicating work that's already in progress. If you'd like to write the content yourself once approved, make sure to mention that in the issue.

**Update docs alongside a code change** If you're opening a PR on the [main n8n repository](https://github.com/n8n-io/n8n) — for example, to add a node, change a configuration option, or fix a bug that affects documented behaviour — open a docs PR to reflect the change.

**Report a problem** Maybe you've identified a problem in the docs, but you're not able to fix it yourself. Open an issue to describe what's wrong, and the n8n Docs team will handle it.

## What not to submit

We don't accept the following types of contributions:

* Modifications to **fully-generated pages**. These pages are automatically generated and kept up to date via n8n workflows. If you spot a problem, open an issue instead of editing the page directly. You can identify fully-generated pages by the `generated: true` field in their frontmatter.
* **Promotional or commercial content** of any kind, including adding a provider or tool to a curated list of compatible options. Such lists in the doc usually cover only the most widely-used options and are not exhaustive directories — we aim to be vendor-neutral and only expand them when there's a clear reason to do so.
* **Personal preference changes** — edits that substitute your preferred phrasing or style for content that already follows our style guide.
* **Contributions that ignore these guidelines.** If it's clear a submission hasn't made any attempt to follow our style guide or contribution guidelines, we may close it without review.

## Writing guidance

n8n Docs uses plain, direct language in the second person ("you"), present tense, and active voice, following the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/). Keep sentences short and jargon-free, and use contractions.

Refer to the n8n style guide for full details.

## Content types

n8n Docs uses a few distinct page types. Understanding which type you're working with helps you follow the right structure and use the correct template. Each type has a template in the [`document-templates/`](https://github.com/n8n-io/n8n-docs/tree/main/document-templates) folder:

* **Integration nodes**: reference docs for a node. Use the template matching the node type — [app](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/app-nodes.md), [core](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/core-nodes.md), [trigger](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/trigger-nodes.md), or [cluster](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/cluster-nodes.md) node.
* **Credentials**: how to authenticate an integration ([template](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/credentials.md)).
* **Common issues**: known problems and fixes for a node ([template](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/common-issues.md)).
* **Feature**: how-to and reference docs for an n8n feature ([template](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/feature.md)).
* **Tutorial**: step-by-step guide to build something ([template](https://github.com/n8n-io/n8n-docs/blob/main/document-templates/tutorial.md)).

## Using AI to draft contributions

Using AI tools to help draft or improve contributions is fine and welcome.

We recommend using the n8n Docs skill file at [`skills/n8n-docs-author/SKILL.md`](https://github.com/n8n-io/n8n-docs/tree/main/skills/n8n-docs-author) alongside your AI tool of choice. It's a distillation of our style guide, providing context for agents about n8n's style and documentation conventions. This produces better output from the start and reduces editing afterwards.

**How it works**

If you use an AI coding agent from within a local fork of the n8n Docs GitHub repo, the skill can load automatically. For example, the `CLAUDE.md` file at the repo root points Claude Code at the skill, so you don't need to do anything extra.

If you haven't forked the repo, or you're using a tool that doesn't load the skill automatically, you can still use it. Copy the contents of [`SKILL.md`](https://github.com/n8n-io/n8n-docs/blob/main/skills/n8n-docs-author/SKILL.md), [reference.md](https://github.com/n8n-io/n8n-docs/blob/main/skills/n8n-docs-author/reference.md) and the style guide into your agent's context, then ask it to follow that guidance when it writes or reviews your doc contribution.

**How to use it**

Ask your agent to write or review docs as you normally would. To be explicit about the mode:

* **Write:** "Write a trigger node page for X."
* **Edit:** "Edit this page to fix style guide violations."
* **Review:** "Review this page against the style guide."

For a review, the agent returns a table of issues grouped by severity, with suggested fixes.

## Contribution methods

You can make contributions in a variety of different ways:

### Edit a page in your browser

This method is best for quick edits to a single page. Click **Edit this page** on any n8n Docs page and GitHub will guide you through making your changes and opening a pull request (aka PR - a formal proposal to add your changes to the docs).

**Prerequisites:** A [GitHub](https://github.com/) account.

1. On any n8n Docs page, click **Edit** from the dropdown menu at the top right. This takes you to the page in the [n8n Docs GitHub repository](https://github.com/n8n-io/n8n-docs).
2. Click the pencil icon to edit the page.

You may be prompted to fork the repository first. Click **Fork this repository** and GitHub automatically creates a fork for you.

3. Make your edits in the text editor, and click **Commit changes** > **Propose changes**.

GitHub prepares a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) for you.

4. Check the title and description of your pull request, and edit if necessary. When you're happy, click **Create pull request**.

Ensure you've followed the general checklist, and edit your PR as necessary if you missed anything. The n8n Docs team will review your pull request, and merge it (publish your suggested modifications) if it is accepted.

### Fork the repository locally

This method is suitable for larger changes, new pages, or work that spans multiple files.

**Prerequisites:** A [GitHub account](https://github.com/), [Git](https://git-scm.com/), and a text editor or IDE installed locally.

1. [Fork the n8n Docs repository](https://github.com/n8n-io/n8n-docs/fork) on GitHub and [clone it locally](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
2. Create a new branch for your changes.
3. Make your changes in the relevant page(s). If you add a new page, add it to the space's `SUMMARY.md` file so it appears in the navigation. See the style guide's Page navigation section.
4.  Lint your prose with [Vale](https://vale.sh). Install it (`brew install vale` on macOS — see the [Vale install guide](https://vale.sh/docs/install) for other systems), then run it from the root of the repository:

    ```bash
    vale docs/                 # lint a directory
    vale docs/path/to/file.md  # lint a single file
    ```

    The Vale style rules ship with the repository, so no extra setup is needed. Fix any errors and warnings before continuing.
5. Commit and push your branch to GitHub.
6. Open a [pull request](https://github.com/n8n-io/n8n-docs/pulls) from your fork towards `main`.

Ensure you've followed the general checklist, and edit your PR as necessary if you missed anything. The n8n Docs team will review your pull request and merge it if accepted.

**Preview your changes**

When you open a pull request, GitBook automatically builds a preview of your changes and links it from the PR. Use this preview to check how your changes render on the live site. Both the browser and local methods above go through a pull request, so there's no need to build the site locally.

### Open an issue

If you've spotted a problem but don't want to edit the content yourself, or you want to propose new content before writing it, you can open a GitHub issue instead.

1. Go to the [n8n Docs issues page](https://github.com/n8n-io/n8n-docs/issues).
2. Check whether the issue already exists by searching the open issues before creating a new one.
3. Click **New issue** and choose the most relevant issue type.
4. Fill in the title and description. Include as much detail as you can — the page URL, what's wrong or missing, and any suggestions you have.
5. Click **Submit new issue**.

The n8n Docs team will triage your issue and follow up if they need more information.

## General checklist

Before submitting a pull request to modify n8n Docs, make sure your contribution ticks all these boxes:

* All necessary files and images are included.
* Any new pages are added to the space's `SUMMARY.md` so they appear in the navigation.
* All formatting follows the style guide.
* Your changes pass [Vale](https://vale.sh) prose linting with no errors (if you contributed locally — see Fork the repository locally).
* All links are working and direct to the right location.
* The PR explains the changes you made and why they're necessary.
* You haven't made an unaccepted submission type
* You have read and accepted the [code of conduct](https://github.com/n8n-io/n8n-docs/blob/main/CODE_OF_CONDUCT.md) and [contributor license agreement](https://github.com/n8n-io/n8n-docs/blob/main/CONTRIBUTOR_LICENSE_AGREEMENT.md).

## Review process

Once you open a pull request, the n8n Docs team will review it and either merge it, request changes, or close it. Here's what to expect:

**Timeline** The team aims to review pull requests as quickly as possible. Complex or large contributions may take longer. Contributions linked to a PR int the main code base will not be reviewed until the main PR Is merged.

**Labels** The team uses labels to communicate the status of your PR:

| Label                       | Meaning                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action:awaiting-author`    | The team has left feedback and is waiting for you to respond or make edits                                                                              |
| `action:needs-review`       | Your PR is in the queue and waiting for a technical writer to review it                                                                                 |
| `action:needs-sme`          | Your PR requires review from a subject matter expert before it can be merged                                                                            |
| `status:pending-dev`        | Your PR is linked to an unmerged code change and will be reviewed once that merges                                                                      |
| `status:in-next-release`    | The linked code change has merged and your PR will be reviewed shortly                                                                                  |
| `status:dev-cancelled`      | The code change your PR was linked to has been cancelled — the docs PR will be closed                                                                   |
| `status:duplicate`          | Your PR covers the same ground as an existing PR or issue - the PR will be closed                                                                       |
| `status:outdated`           | Your PR has been overtaken by subsequent changes to the docs - the PR will be closed                                                                    |
| `quality:low-effort-usable` | Your PR is acceptable but only just — consider improving it before it's reviewed                                                                        |
| `quality:unusable`          | Your PR doesn't meet the contribution guidelines and will be closed. If you make multiple contributions that are given this label, you will be blocked. |
| `quality:disruptive`        | Your PR introduces changes that would actively damage the docs. You will be immediately blocked from making further contributions.                      |

See our full label set [on our GitHub repo](https://github.com/n8n-io/n8n-docs/labels)

**Why a PR might be closed** Pull requests may be closed without merging if the content is out of scope, duplicates existing documentation, doesn't meet the style or contribution guidelines, or hasn't been updated after changes were requested. If you think a PR was closed in error, you're welcome to comment and ask for clarification.

By opening a pull request, you agree to the terms described in License.

## License

n8n is fair-code licensed. By contributing to n8n Docs, your contributions are made under the same license. For more information, refer to the license documentation.

## Get help

If you have questions about contributing, there are a few places to get help:

* [**Community forum**](https://community.n8n.io/)**:** Post in the documentation category for questions about content, style, or the contribution process.
* [**Discord**](https://discord.gg/n8n)**:** Join the `#docs` channel for more informal questions or quick feedback.

To get the attention of the docs team specifically, tag `@n8n-io/docs` in your pull request or issue.
