---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# npm

npm is a quick way to get started with n8n on your local machine. You must have [Node.js](https://nodejs.org/en/){:target=_blank .external-link} installed. n8n requires Node.js 18 or above.

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Try n8n with npx

You can try n8n without installing it using npx.

From the terminal, run:

```bash
npx n8n
```

This command will download everything that's needed to start n8n. You can then access n8n and start building workflows by opening [http://localhost:5678](http://localhost:5678){:target=_blank .external-link}.

## Install globally with npm

To install n8n globally, use npm:

```bash
npm install n8n -g
```

To install or update to a specific version of n8n use the `@` syntax to specify the version. For example:

```bash
npm install -g n8n@0.126.1
```

To install `next`:

```bash
npm install -g n8n@next
```

After the installation, start n8n by running:

```bash
n8n
# or
n8n start
```

/// note | Keep in mind
Windows users remember to change into the `.n8n` directory of your Home folder (`~/.n8n`) before running `n8n start`.
///
### Next steps

Try out n8n using the [Quickstarts](/try-it-out/).

## Updating

To update your n8n instance to the `latest` version, run:

```bash
npm update -g n8n
```

To install the `next` version:

```bash
npm install -g n8n@next
```

--8<-- "_snippets/self-hosting/installation/tunnel.md"

Start n8n with `--tunnel` by running:

```bash
n8n start --tunnel
```

## Reverting an upgrade

Install the older version that you want to go back to.

If the upgrade involved a database migration:

1. Check the feature documentation and release notes to see if there are any manual changes you need to make.
1. Run `n8n db:revert` on your current version to roll back the database. If you want to revert more than one database migration, you need to repeat this process.

## Windows troubleshooting

If you are experiencing issues running n8n on Windows, make sure your Node.js environment is correctly set up. Follow Microsoft's guide to [Install NodeJS on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows){:target=_blank .external-link}.
