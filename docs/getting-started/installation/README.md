# Installation

There are a few different ways to set up n8n depending on how you intend to use it:

- [n8n.cloud](#n8n-cloud) - Hosted solution, no need to install anything
- [Desktop app](#desktop-app) - The fastest way to try n8n on your computer   
- [Self-host](#self-hosting-n8n) - Recommended method for production or customized usecases
	- [npm](#npm)
	- [Docker](#docker)
	- [n8n with tunnel](#n8n-with-tunnel)

## n8n.cloud

n8n.cloud is our hosted solution. In addition to all the features of n8n, it provides added benefits such as:
- No technical set up or maintenance for your n8n instance
- 24/7 uptime monitoring
- Managed OAuth for authentication
- Easy upgrades to the newest n8n versions

[Sign up for n8n.cloud](https://www.n8n.cloud/)

::: tip 💡 Keep in mind
The IP address of n8n.cloud is `20.79.72.105` and the NAT address is `20.79.72.36`, however this may change in the future.
:::

## Desktop app

The n8n desktop app is the fastest way to try n8n on Windows or Mac computers (support for Linux is coming soon). Download the app from the link below:

[Download for Windows](https://downloads.n8n.io/file/n8n-downloads/n8n-win.zip)  
[Download for macOS](https://downloads.n8n.io/file/n8n-downloads/n8n-mac.zip)


::: tip 💡 Keep in mind
If you have already installed n8n locally via `npm`, the desktop app will connect to the existing `sqlite` database.
:::

## Self-hosting n8n 
You can install via Docker or npm.


### npm

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

### Docker

See the [Docker installation](docker-quickstart.md) page for running n8n using Docker.

n8n also offers a Docker image for Raspberry Pi: `n8nio/n8n:latest-rpi`.

### n8n with tunnel

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
