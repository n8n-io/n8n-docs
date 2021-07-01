# Docker Installation

[Docker](https://www.docker.com/) is a quick and simple way to download and start automating with n8n. By using Docker you are able to:

* Install to a pristine environment
* Easily install and run the your preferred database with n8n
* Enjoy a quick and simplified installation experience regardless of your OS

## Prerequisites

Before proceeding ensure that you have installed [Docker Desktop](https://docs.docker.com/get-docker/).

::: tip 💡 Linux Users 
Docker Desktop is only available for Mac and Windows. You must install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) individually for your distribution.
:::

## Starting n8n

From your terminal, run:

```sh
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-v ~/.n8n:/home/node/.n8n \
	n8nio/n8n
```

This command will download all required n8n images and start your container, exposed on port `5678`. So that all your data is not lost when you stop the container, it also mounts a local directory, `.n8n`, to persist your data locally.

You can then access n8n by opening:
[http://localhost:5678](http://localhost:5678)

## Using alternate databases

By default n8n uses SQLite to save credentials, past executions and workflows.
n8n also supports PostgresDB, MySQL and MariaDB, configurable via
environment variables as detailed below.

It is important to still persist data in the `/root/.n8n` folder as it contains n8n user data and even more importantly the encryption key
for credentials. It is also the name of the webhook when the n8n tunnel is used. 

If no directory is found, n8n creates automatically one on
startup. In this case, existing credentials saved with a different encryption key can not be used anymore.

### PostgresDB

```sh
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
	-v ~/.n8n:/home/node/.n8n \
	n8nio/n8n \
	n8n start
```

A complete `docker-compose` file for Postgres can be found [here](https://github.com/n8n-io/n8n/blob/master/docker/compose/withPostgres/README.md).

#### Passing data via file

To avoid passing sensitive information via environment variables `_FILE` may be appended to some environment variables. It will then load the data from a file with the given name. That makes it possible to load data easily from Docker- and Kubernetes-Secrets.

The following environment variables support file input:
  - `DB_POSTGRESDB_DATABASE_FILE`
  - `DB_POSTGRESDB_HOST_FILE`
  - `DB_POSTGRESDB_PASSWORD_FILE`
  - `DB_POSTGRESDB_PORT_FILE`
  - `DB_POSTGRESDB_USER_FILE`
  - `DB_POSTGRESDB_SCHEMA_FILE`
  - `N8N_BASIC_AUTH_PASSWORD_FILE`
  - `N8N_BASIC_AUTH_USER_FILE`


### MySQL

```sh
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e DB_TYPE=mysqldb \
	-e DB_MYSQLDB_DATABASE=<MYSQLDB_DATABASE> \
	-e DB_MYSQLDB_HOST=<MYSQLDB_HOST> \
	-e DB_MYSQLDB_PORT=<MYSQLDB_PORT> \
	-e DB_MYSQLDB_USER=<MYSQLDB_USER> \
	-e DB_MYSQLDB_PASSWORD=<MYSQLDB_PASSWORD> \
	-v ~/.n8n:/home/node/.n8n \
	n8nio/n8n \
	n8n start
```

## Setting timezone

To define the timezone n8n should use, the environment variable `GENERIC_TIMEZONE` can be set. This gets used by schedule based nodes such as the Cron node.

The timezone of the system can also be set separately. This controls what
some scripts and commands return like `$ date`. The system timezone can be set via the environment variable `TZ`.

Example using the same timezone for both:

```sh
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e GENERIC_TIMEZONE="Europe/Berlin" \
	-e TZ="Europe/Berlin" \
	n8nio/n8n
```

## Further reading

More information about Docker setup can be found in the README file of the [Docker Image](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/README.md).