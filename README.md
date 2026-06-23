![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)


# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).

Not what you're looking for? Try the following:

- Looking for the product's source code? [Check out the n8n repo](https://github.com/n8n-io/n8n).
- Want to try out the product? Try [n8n Cloud](https://app.n8n.cloud/) or [self-host n8n](https://docs.n8n.io/hosting).
- Need help? [Ask on the forum](https://community.n8n.io/c/questions/12).
- Got a feature request? [Propose it in the dedicated forum space](https://community.n8n.io/c/feature-requests/5).

## Tech stack

n8n Docs uses the following tools:

- **[GitBook](https://www.gitbook.com/)** — documentation framework
- **[Vale](https://vale.sh/)** — prose linting
- **[Lychee](https://lychee.cli.rs/)** — broken link checking
- **GitHub Actions** — runs Vale and Lychee in CI

## Project structure

Most content lives in markdown files in `docs/`, organised into subfolders by topic area. The root contains config for tooling that runs in CI — you're unlikely to need to touch these directly, but it's useful to know they're there.

```
n8n-docs/
├── docs/                        # All documentation content
│   ├── build/
│   ├── deploy/
│   ├── get-started/
│   ├── ...
├── document-templates/          # Templates for doc types
├── styles/                      # Vale prose linting rules
├── .github/                     # CI workflows and PR templates
├── .vale.ini                    # Vale prose linter config
└── lychee.toml                  # Broken link checker config
```

## Contributing

n8n Docs is open-source. We welcome contributions from the community.

Read the [Contribution Guide](https://docs.n8n.io/contribute/contribution-guide-for-n8n-docs) to find out how to contribute. The guide covers the types of contributions accepted, writing standards, different methods for submitting changes, and the team's review process.


## Previewing changes

Local build/preview of the n8n Docs site isn't supported.

If you're making changes locally, push them and open a pull request. GitBook automatically adds a [preview link](https://docs.n8n.io/contribute/contribution-guide-for-n8n-docs#fork-the-repository-locally) to each PR.

## License

n8n-docs is [fair-code](https://faircode.io/) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

More information about the license is available in the [License documentation](https://docs.n8n.io/privacy-and)security/sustainable-use-license).