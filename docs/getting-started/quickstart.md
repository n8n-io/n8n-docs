# Quickstart


## Give n8n a spin

To spin up n8n, you can run:

```bash
npx n8n
```

It will download everything that is needed to start n8n.

You can then access n8n by opening:
[http://localhost:5678](http://localhost:5678)

## Run with Docker

To play around with n8n, you can also start it using Docker:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n
```

Be aware that all the data will be lost once the Docker container gets removed. To
persist the data mount the `~/.n8n` folder:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/root/.n8n \
  n8nio/n8n
```

n8n also offers a Docker image for Raspberry Pi: `n8nio/n8n:latest-rpi`.

More information about the Docker setup can be found in the README file of the
[Docker Image](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/README.md).

In case you run into issues, check out the [troubleshooting](../reference/troubleshooting.md) page or ask for help in the community [forum](https://community.n8n.io/).

## Install with npm

To install n8n globally:

```bash
npm install n8n -g
```

After the installation n8n can be started by typing in:

```bash
n8n
# or
n8n start
```


## Starting n8n with tunnel

::: danger
This is only meant for local development and testing. It should not be used in production!
:::

To be able to use webhooks for trigger nodes of external services like GitHub, n8n has to be reachable from the web. To make that easy, n8n has a special tunnel service, which redirects requests from our servers to your local n8n instance (uses this code: [https://github.com/localtunnel/localtunnel](https://github.com/localtunnel/localtunnel)).

If you've installed n8n using npm, start n8n with `--tunnel`

```bash
n8n start --tunnel
```

If you're running n8n with Docker, start n8n with `--tunnel`

```bash
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-v ~/.n8n:/root/.n8n \
	n8nio/n8n \
	n8n start --tunnel
```

In case you run into issues, check out the [troubleshooting](../reference/troubleshooting.md) page or ask for help in the community [forum](https://community.n8n.io/).
