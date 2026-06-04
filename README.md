![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## How the docs are published

This repository syncs to [GitBook](https://www.gitbook.com/) using [Git Sync](https://docs.gitbook.com/getting-started/git-sync). You write content in Markdown in this repository, and GitBook renders it on the live site at [docs.n8n.io](https://docs.n8n.io/).

* GitBook publishes any changes merged into the `TODO: synced branch (for example, main)` branch to the live site automatically.
* Opening a pull request generates a GitBook **preview** of your changes, linked from the PR. Use this to check how your changes render before they're merged—there's no separate local build step.

## Working on the docs

You can edit and commit Markdown files with any text editor or IDE—you don't need any build tooling or a local server. To preview your work, open a pull request and use the GitBook preview linked from it.

### Editor settings

The repository includes a `.editorconfig` file. Make sure your local editor settings **do not override** these settings. In particular:

* Don't allow your editor to replace tabs with spaces. This can affect our code samples (which must retain tabs for people building nodes).
* One tab must be equivalent to four spaces.

### Content conventions

* Pages are standard Markdown. GitBook adds components such as hint/callout blocks, tabs, and cards. Refer to the [GitBook Markdown reference](https://docs.gitbook.com/content-editor/editing-content/markdown) and the [contribution guide](TODO: link to published guide) for the components and patterns used in this repository.
* TODO: content directory and file-layout conventions.
* TODO: branch and PR naming conventions.
* TODO: frontmatter/metadata requirements (for example, `contentType` and `description`).
* TODO: any validation or linting to run before pushing (for example, style linting or link checking).

## Contributing

Please read the [contribution guide](TODO: link to published guide) before submitting changes.

You can find [style guidance](https://github.com/n8n-io/n8n-docs/wiki/Styles) in the wiki.


## Support

If you have problems or questions, head to n8n's forum: https://community.n8n.io


## License

n8n-docs is [fair-code](https://faircode.io/) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

More information about the license is available in the [License documentation](https://docs.n8n.io/sustainable-use-license).
