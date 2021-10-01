# Installation

Get started with n8n right away by using our hosted n8n.cloud offering or running n8n locally via [npm](https://www.npmjs.com/package/n8n). 

n8n is also available as a [Docker image](https://hub.docker.com/r/n8nio/n8n).

[[toc]]

## n8n.cloud

In addition to all the features of n8n, n8n.cloud provides added benefits such as:
- No set up or maintenance for your n8n instance
- Managed OAuth for authentication
- Easy upgrades to the newest n8n versions

If this option is for you, sign up for an [n8n.cloud](https://www.n8n.cloud/) account.

::: tip 💡 Keep in mind
The IP address of n8n.cloud is `20.79.72.105` and the NAT address is `20.79.72.36`, however this may change in the future.
Recommended practice is to whitelist `20.79.72.0/24`, but if more strict measures are needed, at minimum both `20.79.72.105` and `20.79.72.36` must be whitelisted.
:::

## npm

You can try n8n without installing it using [npx](../../reference/glossary.md#npx).

From the terminal, run:

```bash
npx n8n
```

This command will download everything that is needed to start n8n. You can then access n8n and start building workflows by opening [http://localhost:5678](http://localhost:5678). 

If you want to install n8n globally, use [npm](../../reference/glossary.md#npm):

```bash
npm install n8n -g
```

After the installation, start n8n by running:

```bash
n8n
# or
n8n start
```

::: tip 💡 Keep in mind
Windows users remember to change into the `.n8n` directory of your Home folder (`~/.n8n`) before running `n8n start`.
:::

## Docker

See the [Docker installation](docker-quickstart.md) page for running n8n using Docker.

n8n also offers a Docker image for Raspberry Pi: `n8nio/n8n:latest-rpi`.

## n8n with tunnel

::: danger
This is only meant for local development and testing. It should not be used in production.
:::

To be able to use webhooks for trigger nodes of external services like GitHub, n8n has to be reachable from the web. To make that easy, n8n has a special [tunnel service](https://github.com/localtunnel/localtunnel) which redirects requests from our servers to your local n8n instance.

If you installed n8n with **npm**, start n8n with `--tunnel` by running:

```bash
n8n start --tunnel
```

If you are running n8n with **Docker**, start n8n with `--tunnel` by running:

```bash
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-v ~/.n8n:/home/node/.n8n \
	n8nio/n8n \
	n8n start --tunnel
```

In case you run into issues with the installation, check out the [troubleshooting page](../../reference/troubleshooting.md) or ask for help in the [community forum](https://community.n8n.io/).
