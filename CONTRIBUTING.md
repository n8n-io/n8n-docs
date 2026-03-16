# Contributing

If you want to contribute to this repository - thank you! Before you start, have a look at the existing documentation to get an idea of the structure and writing conventions n8n uses. In writing your documentation, please follow the guidelines described below, to ensure quality and consistency with n8n styles.

## Docs issues only

This repo is for the documentation site.

- Need help? [Ask on the forum](https://community.n8n.io/c/questions/12).
- Got a feature request or product idea? [Propose it on the forum](https://community.n8n.io/c/feature-requests/5).
- Found a bug in the product? [Product repo](https://github.com/n8n-io/n8n)

## No course contributions

n8n is working on replacing the course. n8n isn't accepting reports or changes to the current course.

## Why n8n might reject your contribution

Due to an increase in spam and poor quality contributions, n8n has introduced new criteria and processes. n8n will close issues and PRs that are low-effort and poor quality.

| Label | Action | Notes |
| ----- | ------ | ----- |
| `spam` | Close PR/issue; account blocked | This label is for things like empty issues. |
| `ai-slop` |	Close PR/issue; account blocked | This label is for when content is bad, wrong, and looks like it's probably the result of using AI. n8n isn't banning use of AI in contributions, so long as the contributions are high quality. |
| `low-effort-unusable` |	Close PR/issue; comment with contribution guidance; a second `low-effort-unusable` leads to a block. | n8n uses this for minor changes which have issues. To avoid this, test your work to make sure it's accurate; follow the [style guide](https://github.com/n8n-io/n8n-docs/wiki/Styles); write meaningful titles and descriptions on your PR/issue. |
| `low-effort-usable` |	No action initially. n8n will accept these, but not in large quantities. Too many occurences in a single month will result in n8n reviewing the activity. |
| `duplicate` |	Close PR/issue; comment with contribution guidance. | To avoid this, check existing issues and PRs. |


## Style

n8n uses the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

Refer to [Styles](https://github.com/n8n-io/n8n-docs/wiki/Styles/) for a quickstart, and guidance on style linting.

## n8n's license

Be aware that n8n is fair code licensed. For more information, refer to the [License](https://docs.n8n.io/sustainable-use-license/) documentation.

## Writing docs

You can either:

* Check out the docs repository and work on your local machine.
* Make your changes directly in GitHub.

These instructions are for external users. Members of the n8n organization don't need to fork the repository.

### Working locally

This method allows you to work in your own text editor, and preview your work while editing.

You need Git installed, and a GitHub account.

[Fork the documentation repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Then follow the instructions for external contributors in the [README](https://github.com/n8n-io/n8n-docs?tab=readme-ov-file#steps).

In GitHub, [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to merge the work from your fork to `main` in the docs repository.

### Writing in GitHub

This method is fine for small changes, but not recommended for larger pieces of work.

You need a GitHub account.

Follow GitHub's documentation on [editing files](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

### Previewing your work

You can build the docs locally to preview them, or submit a pull request. All pull requests automatically trigger a preview build.

For instructions on previewing the docs locally, refer to the [README](https://github.com/n8n-io/n8n-docs/blob/main/README.md).

## General checklist

Before submitting a PR, make sure your contribution ticks all these boxes:

- [ ] All necessary files and images are included.
- [ ] All formatting follows the [style guide](https://github.com/n8n-io/n8n-docs/wiki/Styles).
- [ ] All images are optimized.
- [ ] All links are working and direct to the right location.
- [ ] The commit message describes the changes you made.
- [ ] The PR explains the changes you made and why they're necessary.
- [ ] You have read and accepted the [code of conduct](https://github.com/n8n-io/n8n-docs/blob/master/CODE_OF_CONDUCT.md) and [contributor license agreement](https://github.com/n8n-io/n8n-docs/blob/master/CONTRIBUTOR_LICENSE_AGREEMENT.md).


## Documenting nodes

n8n provides [templates](https://github.com/n8n-io/n8n-docs/tree/main/document-templates) for node docs.

* **Nodes and trigger nodes:** Create a directory with the name of the node at `docs/integrations/builtin/app-nodes/` or `docs/integrations/builtin/trigger-nodes/` containing:

  - A text file named `n8n-nodes-base.<node-name>.md` describing the functionality of the relevant node.

* **Credentials:** Create a document with the name of the node at `docs/integrations/builtin/credentials/` containing:
  - A text file with the node name describing how to get credentials for the relevant node.

A standard node doc includes the following parts:

* Node description
  - Describe the purpose and function of the node.
* Operations
  - Enter the resources and operations as they're named in the nodes.

In the credentials doc:

* If there is more than one authentication method, list OAuth first.
* If possible, avoid documenting external products. Instead, provide links to the relevant product documentation. For example, for guidance on getting credentials (such as how to get an API token for a service), provide a link to the product's API authentication docs. 
