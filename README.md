![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything via its open, [fair-code](https://faircode.io/) model. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## Previewing and building the documentation locally

### Prerequisites

* Python 3.8 or above
* We recommend using a virtual environment when working with Python, such as [venv](https://docs.python.org/3/tutorial/venv.html).

### Steps

```bash
git clone https://github.com/n8n-io/n8n-docs.git
cd n8n-docs
pip install -r requirements.txt

# n8n organization members: 
# Outside your docs project, do:
git clone https://github.com/n8n-io/mkdocs-material-insiders.git mkdocs-material
# Navigate back into the docs project and run:
pip install -e <path-to-mkdocs-material>

# External contributors: rely on the preview builds on pull requests, or 
# use the free version of Material for MkDocs (most things are the same, some formatting may be missing)
pip install mkdocs-material

# Serve a local preview
mkdocs serve
# Or build
mkdocs build
```

## Contributing

Please read our [CONTRIBUTING](CONTRIBUTING.md) guide.

You can find [style guidance](https://github.com/n8n-io/n8n-docs/wiki/Styles) in our wiki.


## Support

If you have problems or questions, head to our forum, and we will try to help you as soon as possible: https://community.n8n.io


## License

n8n-docs is [fair-code](http://faircode.io) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

Additional information about license can be found in the [FAQ](https://docs.n8n.io/#/faq?id=license).

