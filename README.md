![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## Previewing and building the documentation locally

### Prerequisites

* Python 3.8 or above
* Pip
* n8n recommends using a virtual environment when working with Python, such as [venv](https://docs.python.org/3/tutorial/venv.html).
* Follow the [recommended configuration and auto-complete](https://squidfunk.github.io/mkdocs-material/creating-your-site/#minimal-configuration) guidance for the theme. This will help when working with the `mkdocs.yml` file.
* The repo includes a `.editorconfig` file. Make sure your local editor settings **do not override** these settings. In particular:
	- Don't allow your editor to replace tabs with spaces. This can affect our code samples (which must retain tabs for people building nodes).
	- One tab must be equivalent to four spaces.

### Steps

#### For members of the n8n GitHub organization:

1. Set up an SSH token and add it to your GitHub account. Refer to [GitHub | About SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) for guidance.
2. Then run these commands:

	```bash
	git clone --recurse-submodules git@github.com:n8n-io/n8n-docs.git
	cd n8n-docs
 	# Set up virtual environment if using one (steps depend on your system)
 	# Install dependencies
	pip install -r requirements.txt
	pip install _submodules/insiders
	```

#### For external contributors:

Rely on the preview builds on pull requests, or use the free version of Material for MkDocs (most things are the same, some formatting may be missing)

Fork the repository, then:

```
git clone https://github.com/<your-username>/n8n-docs.git
cd n8n-docs
pip install -r requirements.txt
pip install mkdocs-material
```

#### To serve a local preview:

```
mkdocs serve
```

## Contributing

Please read the [CONTRIBUTING](CONTRIBUTING.md) guide.

You can find [style guidance](https://github.com/n8n-io/n8n-docs/wiki/Styles) in the wiki.


## Support

If you have problems or questions, head to n8n's forum: https://community.n8n.io


## License

n8n-docs is [fair-code](https://faircode.io/) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

More information about the license is available in the [License documentation](https://docs.n8n.io/reference/license/).

