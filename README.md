# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool which enables you to connect anything to everything via its open, [fair-code](https://faircode.io/) model. The documentation is live at [docs.n8n.io](https://docs.n8n.io/).


## Building the documentation

To build the documentation:

```bash
git clone https://github.com/n8n-io/n8n-docs.git
cd n8n-docs
npm install
npm run build
```


## Contributing

To add to the documentation:

```bash
git clone https://github.com/n8n-io/n8n-docs.git
cd n8n-docs
npm install
npm run dev
```
After doing this, visit [http://localhost:8080](http://localhost:8080) to see the docs website. Pages should refresh as you make changes to them.

You can find the contribution guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Structure

The structure of the `/docs` directory mirrors the structure of the docs website itself. Each page has a corresponding markdown file that is compiled to HTML on build. The `README.md` in each directory is the index page for the corresponding section.

The left menu is defined in `/docs/.vuepress/config.js`.


## Support

If you have problems or questions, head to our forum, and we will try to help you as soon as possible: https://community.n8n.io


## License

n8n-docs is [fair-code](http://faircode.io) licensed under [**Apache 2.0 with Commons Clause**](https://github.com/n8n-io/n8n/blob/master/packages/cli/LICENSE.md).

Additional information about license can be found in the [FAQ](https://docs.n8n.io/#/faq?id=license).
