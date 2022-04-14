# Doc² Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything via its open, [fair-code](https://faircode.io/) model. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## Previewing and building the documentation locally

### Prerequisites

* Python 3.8 or above
* We recommend using a virtual environment when working with Python, such as [venv](https://docs.python.org/3/tutorial/venv.html).

### Steps

```bash
git clone https://github.com/n8n-io/n8n-docs.git
cd docapp-docs
pip install -r requirements.txt

pip install mkdocs-material
# Serve a local preview
mkdocs serve
# Or build
mkdocs build
```

## Contributing

Please read our [CONTRIBUTING](CONTRIBUTING.md) guide.


## Support

If you have problems or questions, head to our forum, and we will try to help you as soon as possible: https://community.n8n.io


## License

n8n-docs is [fair-code](http://faircode.io) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

Additional information about license can be found in the [FAQ](https://docs.n8n.io/#/faq?id=license).
