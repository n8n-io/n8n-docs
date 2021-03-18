# Quickstart

You can run n8n both locally and remotely. There are three different ways in which you can get started with n8n.

[[toc]]

## Run n8n with n8n.cloud

While n8n.cloud and n8n are the same in terms of features, n8n.cloud provides conveniences such as:
- Not having to set up and maintain your n8n instance
- Managed OAuth for authentication
- Easily upgrading to the newest n8n versions

If this option is for you, sign up for an [n8n.cloud](https://www.n8n.cloud/) account.

## Run n8n locally
### Using npx
If you just want to try out n8n without installing it, run it with [npx](../reference/glossary.md#npx):

```bash
npx n8n
```

This command will download everything that is needed to start n8n. You can then access n8n and start building workflows by opening [http://localhost:5678](http://localhost:5678).

### Using npm

If you want to install n8n globally, use [npm](../reference/glossary.md#npm):

```bash
npm install n8n -g
```

After the installation, start n8n by running:

```bash
n8n
# or
n8n start
```

### Using Docker

If you do not want to install n8n, you can also start it using [Docker](../reference/glossary.md#docker):

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n
```

Be aware that all the data will be lost once the Docker container gets removed. To keep the data, mount the `~/.n8n` folder:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

n8n also offers a Docker image for Raspberry Pi: `n8nio/n8n:latest-rpi`.

More information about the Docker setup can be found in the README file of the
[Docker Image](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/README.md).


### Starting n8n with tunnel (post-installation)

::: danger
This is only meant for local development and testing. It should not be used in production.
:::

To be able to use webhooks for trigger nodes of external services like GitHub, n8n has to be reachable from the web. To make that easy, n8n has a special [tunnel service](https://github.com/localtunnel/localtunnel), which redirects requests from our servers to your local n8n instance.

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

In case you run into issues with the installation, check out the [troubleshooting page](../reference/troubleshooting.md) or ask for help in the [community forum](https://community.n8n.io/).
