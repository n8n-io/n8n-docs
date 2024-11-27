---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Docker Installation

[Docker](https://www.docker.com/){:target=_blank .external-link} offers the following advantages:

* Install n8n in a clean environment.
* Easier setup for your preferred database.
* Can avoid issues due to different operating systems, as Docker provides a consistent system.

You can also use n8n in Docker with [Docker Compose](/hosting/installation/server-setups/docker-compose/). You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

## Prerequisites

Before proceeding, install [Docker Desktop](https://docs.docker.com/get-docker/){:target=_blank .external-link}.

/// note | Linux Users
Docker Desktop is available for Mac and Windows. Linux users must install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) individually for your distribution.
///

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Starting n8n

From your terminal, run:

```sh
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

This command will download all required n8n images and start your container, exposed on port `5678`. To save your work between container restarts, it also mounts a docker volume, `n8n_data`, to persist your data locally.

You can then access n8n by opening:
[http://localhost:5678](http://localhost:5678)

## Using alternate databases

By default n8n uses SQLite to save credentials, past executions and workflows. n8n also supports PostgresDB configurable using environment variables as detailed below.

It's important to still persist data in the `/home/node/.n8n` folder as it contains n8n user data and even more importantly the encryption key for credentials. It's also the name of the webhook when the n8n tunnel is used.

If no directory is found, n8n creates automatically one on
startup. In this case, existing credentials saved with a different encryption key can not be used anymore.

/// note | Keep in mind
Persisting the `/home/node/.n8n` directory even when using alternate databases is the recommended best practice, but not explicitly required. The encryption key can be provided using the `N8N_ENCRYPTION_KEY` [environment variable](/hosting/configuration/environment-variables/).
///
### PostgresDB

To use n8n with Postgres, provide the corresponding:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

A complete `docker-compose` file for Postgres can be found [here](https://github.com/n8n-io/n8n-hosting/tree/main/docker-compose/withPostgres).

## Setting timezone

To define the timezone n8n should use, the environment variable `GENERIC_TIMEZONE` can be set. This gets used by schedule based nodes such as the Cron node.

The timezone of the system can also be set separately. This controls what
some scripts and commands return like `$ date`. The system timezone can be set using the environment variable `TZ`.

Example using the same timezone for both:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Europe/Berlin" \
 -e TZ="Europe/Berlin" \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

## Updating

From your Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

![Docker Desktop](/_images/hosting/installation/docker/docker_desktop.png)

You can also use the command line to pull the latest, or a specific version:

```sh
# Pull latest (stable) version
docker pull docker.n8n.io/n8nio/n8n

# Pull specific version
docker pull docker.n8n.io/n8nio/n8n:0.220.1

# Pull next (unstable) version
docker pull docker.n8n.io/n8nio/n8n:next
```

Stop the container and start it again. You can also use the command line:

```sh
# Get the container ID
docker ps -a

# Stop the container with ID container_id
docker stop [container_id]

# Remove the container with ID container_id
docker rm [container_id]

# Start the container
docker run --name=[container_name] [options] -d docker.n8n.io/n8nio/n8n
```

### Docker Compose

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Further reading

More information about Docker setup can be found in the README file of the [Docker Image](https://github.com/n8n-io/n8n/tree/master/docker/images/n8n).

--8<-- "_snippets/self-hosting/installation/tunnel.md"

Start n8n with `--tunnel` by running:

```sh
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n \
 start --tunnel
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
