---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Docker Installation

[Docker](https://www.docker.com/){:target=_blank .external-link} offers the following advantages:

* Installs n8n in a clean environment.
* Easier setup for your preferred database.
* Can avoid issues due to different operating systems, as Docker provides a consistent system.
* Can avoid compatibility issues due to differences in operating systems and tools.
* Makes migrating to new hosts or environments more straightforward.

You can also use n8n in Docker with [Docker Compose](/hosting/installation/server-setups/docker-compose.md). You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

--8<-- "_snippets/self-hosting/warning.md"

## Prerequisites

Before proceeding, install [Docker Desktop](https://docs.docker.com/get-docker/){:target=_blank .external-link}.

/// note | Linux Users
Docker Desktop is available for Mac and Windows. Linux users must install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) individually for your distribution.
///

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Starting n8n

From your terminal, run:

```sh
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

This command creates a volume to store persistent data, downloads the required n8n image, and starts your container, exposed on port `5678`. To save your work between container restarts, it also mounts a docker volume, `n8n_data`, to persist your data locally.

Once running, you can access n8n by opening:
[http://localhost:5678](http://localhost:5678)

## Using with PostgreSQL

By default, n8n uses SQLite to save [credentials](/glossary.md#credential-n8n), past executions, and workflows. n8n also supports PostgreSQL, configurable using environment variables as detailed below.

When using PostgreSQL, it's still important to persist the data stored in the `/home/node/.n8n` folder. This includes n8n user data and, even more importantly, the encryption key for credentials. It's also the name of the webhook when using the [n8n tunnel](#n8n-with-tunnel).

If n8n can't find the `/home/node/.n8n` directory on startup, it automatically creates one. In this case, all existing credentials that n8n saved with a different encryption key will no longer work.

/// note | Keep in mind
While persisting the `/home/node/.n8n` directory with PostgreSQL is the recommended best practice, it's not explicitly required. You can provide the encryption key by passing the [`N8N_ENCRYPTION_KEY` environment variable](/hosting/configuration/environment-variables/deployment.md) when starting your Docker container.
///

To use n8n with PostgreSQL, execute the following commands, replacing the placeholders (depicted within angled brackets, for example `<POSTGRES_USER>`) with your actual values:

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

You can find a complete `docker-compose` file for PostgreSQL in the [n8n hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/docker-compose/withPostgres).

## Setting timezone

To define the timezone n8n should use, you can set the [`GENERIC_TIMEZONE` environment variable](/hosting/configuration/environment-variables/timezone-localization.md). Schedule-oriented nodes, like the [Schedule Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) use this to determine the correct timezone.

You can set the system timezone, which controls what some scripts and commands like `date` return, using the `TZ` environment variable.

This example sets the same timezone for both variables:

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

To update n8n, in Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

![Docker Desktop](/_images/hosting/installation/docker/docker_desktop.png)

You can also use the command line to pull the latest, or a specific version:

```sh
# Pull latest (stable) version
docker pull docker.n8n.io/n8nio/n8n

# Pull specific version
docker pull docker.n8n.io/n8nio/n8n:1.81.0

# Pull next (unstable) version
docker pull docker.n8n.io/n8nio/n8n:next
```

After pulling the updated image, stop your n8n container and start it again. You can also use the command line. Replace `<container_id>` in the commands below with the container ID you find in the first command:

```sh
# Find your container ID
docker ps -a

# Stop the container with the `<container_id>`
docker stop <container_id>

# Remove the container with the `<container_id>`
docker rm <container_id>

# Start the container
docker run --name=<container_name> [options] -d docker.n8n.io/n8nio/n8n
```

### Updating Docker Compose

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Further reading

You can find more information about Docker setup in the README file for the [Docker image](https://github.com/n8n-io/n8n/tree/master/docker/images/n8n).

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
