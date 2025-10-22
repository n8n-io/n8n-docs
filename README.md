![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## Previewing and building the documentation locally

### Prerequisites

* Python 3.8 or above
* Pip
* Follow the [recommended configuration and auto-complete](https://squidfunk.github.io/mkdocs-material/creating-your-site/#minimal-configuration) guidance for the theme. This will help when working with the `mkdocs.yml` file.
* The repo includes a `.editorconfig` file. Make sure your local editor settings **do not override** these settings. In particular:
	- Don't allow your editor to replace tabs with spaces. This can affect our code samples (which must retain tabs for people building nodes).
	- One tab must be equivalent to four spaces.
* n8n recommends using a virtual environment when working with Python, such as [venv](https://docs.python.org/3/tutorial/venv.html).

### Steps

#### For members of the n8n GitHub organization:

n8n members have access to the full Insiders version of the site theme.

1. Set up an SSH token and add it to your GitHub account. Refer to [GitHub | About SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) for guidance.
2. Then run these commands:

	```bash
	git clone --recurse-submodules git@github.com:n8n-io/n8n-docs.git
	cd n8n-docs
 	# Set up a virtual environment (steps depend on your system) and activate it
 	# Install dependencies
	pip install -r requirements.txt
	pip install _submodules/insiders
	```

#### For external contributors:

External contributors don't have access to the full Insiders version of the site theme. You can rely on the preview builds on pull requests, or use the free version of Material for MkDocs.

Fork the repository, then:

```bash
git clone https://github.com/<your-username>/n8n-docs.git
cd n8n-docs
# Set up a virtual environment (steps depend on your system) and activate it
# Install dependencies
pip install -r requirements.txt
pip install mkdocs-material
```

#### To serve a local preview:

```
mkdocs serve --strict
```

## Troubleshooting

### Errors due to missing extensions or features

n8n's docs use the Insiders version of the Material theme. This is not available to external contributors. The standard (free) version has most of the features, but you may get errors if the site is relying on features currently in Insiders. The feature set is constantly changing, as the theme creator gradually moves features out of Insiders to general availability. You can view the currently restricted feautres here: [Material Insiders Benefits](https://squidfunk.github.io/mkdocs-material/insiders/benefits/).

To work around this, you can either:

- Rely on the preview builds when you open a PR.
- Temporarily comment out features in the `mkdocs.yml`. Before committing any changes, remember to uncomment any sections you commented out of the `mkdocs.yml` file.

### Build times

If you find the build times are slow when working with local previews, you can temporarily speed up build times by ignoring parts of the site you're not working on.

#### Dirty builds

`mkdocs serve --strict --dirty`

The first build will still be a full build, but subsequently it will only rebuild files that you change.

#### Temporarily exclude the integrations library

In `mkdocs.yml`, find the `exclude` plugin. Uncomment `- integrations/builtin/*`. Remember to comment it out again before committing.

#### Skip pulling in data for integrations macros

One of the factors that slows down the builds is pulling fresh data for the trending workflows in the integrations pages. You can skip this when previewing locally.

```
# Bash
export NO_TEMPLATE=true && mkdocs serve --strict

# PowerShell
$env:NO_TEMPLATE='true'; mkdocs serve --strict
```

## Contributing

Please read the [CONTRIBUTING](CONTRIBUTING.md) guide.

You can find [style guidance](https://github.com/n8n-io/n8n-docs/wiki/Styles) in the wiki.


## Support

If you have problems or questions, head to n8n's forum: https://community.n8n.io


## License

n8n-docs is [fair-code](https://faircode.io/) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

More information about the license is available in the [License documentation](https://docs.n8n.io/sustainable-use-license).

