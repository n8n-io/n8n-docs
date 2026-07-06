---
contentType: tutorial
nodeTitle: Install with npm
originalFilePath: hosting/installation/npm.md
originalUrl: 'https://docs.n8n.io/hosting/installation/npm'
url: 'https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm'
layout:
  description:
    visible: false
---

# npm <a href="#npm" id="npm"></a>

npm is a quick way to get started with n8n on your local machine. You must have [Node.js](https://nodejs.org/en/) installed. n8n requires a Node.js version between 20.19 and 24.x, inclusive.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iFLUKG9zJaouigaM7IOo/" %}

## Try n8n with npx <a href="#try-n8n-with-npx" id="try-n8n-with-npx"></a>

You can try n8n without installing it using npx.


From the terminal, run:

```bash
npx n8n
```

This command will download everything that's needed to start n8n. You can then access n8n and start building workflows by opening [http://localhost:5678](http://localhost:5678).

## Install globally with npm <a href="#install-globally-with-npm" id="install-globally-with-npm"></a>

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
# or <a href="#or" id="or"></a>
n8n start
```


### Next steps <a href="#next-steps" id="next-steps"></a>

Try out n8n using the [Quickstarts](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/build-your-first-workflow).

## Updating <a href="#updating" id="updating"></a>

To update your n8n instance to the `latest` version, run:

```bash
npm update -g n8n
```

To install the `next` version:

```bash
npm install -g n8n@next
```

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WSJc9HCsn26Um2uT6zAQ/" %}

{% hint style="info" %}
**Docker required**

The tunnel uses cloudflared, which runs as a Docker container. Make sure [Docker](https://docs.docker.com/get-docker/) is installed on your machine, even when running n8n via npm.
{% endhint %}

For npm installations, use the **services only** approach. Start cloudflared as a standalone service, then run n8n locally:

```bash
# Terminal 1: Start the cloudflared tunnel service <a href="#terminal-1-start-the-cloudflared-tunnel-service" id="terminal-1-start-the-cloudflared-tunnel-service"></a>
pnpm --filter n8n-containers services --services cloudflared

# Terminal 2: Start n8n locally <a href="#terminal-2-start-n8n-locally" id="terminal-2-start-n8n-locally"></a>
pnpm dev
```

The `services` command starts cloudflared, fetches the public tunnel URL, and writes a `.env` file to `packages/cli/bin/.env` with `WEBHOOK_URL` and `N8N_PROXY_HOPS=1`. n8n picks up this `.env` automatically on startup.

Clean up when done:

```bash
pnpm --filter n8n-containers services:clean
```

For the full stack approach (n8n and cloudflared both in containers), refer to the [Docker tunnel setup](install-with-docker.md#n8n-with-tunnel).

## Reverting an upgrade <a href="#reverting-an-upgrade" id="reverting-an-upgrade"></a>

Install the older version that you want to go back to.

If the upgrade involved a database migration:

1. Check the feature documentation and release notes to see if there are any manual changes you need to make.
1. Run `n8n db:revert` on your current version to roll back the database. If you want to revert more than one database migration, you need to repeat this process.

## Windows troubleshooting <a href="#windows-troubleshooting" id="windows-troubleshooting"></a>

If you are experiencing issues running n8n on Windows, make sure your Node.js environment is correctly set up. Follow Microsoft's guide to [Install NodeJS on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
