---
title: Configuration methods
description: How to set environment variables for n8n.
contentType: howto
---

# Configuration

You can change n8n's settings using environment variables. For a full list of available configurations see [Environment Variables](/hosting/configuration/environment-variables/index.md).

## Set environment variables by command line

### npm

For npm, set your desired environment variables in terminal. The command depends on your command line.

Bash CLIs:

```bash
export <variable>=<value>
```

In cmd.exe:

```bash
set <variable>=<value>
```

In PowerShell:

```powershell
$env:<variable>=<value>
```

### Docker

In Docker you can use the `-e` flag from the command line:

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e N8N_TEMPLATES_ENABLED="false" \
 docker.n8n.io/n8nio/n8n
```


## Docker Compose file

In Docker, you can set your environment variables in the `n8n: environment:` element of your `docker-compose.yaml` file.

For example:

```yaml
n8n:
    environment:
      - N8N_TEMPLATES_ENABLED=false
```

## Keeping sensitive data in separate files

You can append `_FILE` to individual environment variables to provide their configuration in a separate file, enabling you to avoid passing sensitive details using environment variables. n8n loads the data from the file with the given name, making it possible to load data from [Docker-Secrets](https://docs.docker.com/engine/swarm/secrets/) and [Kubernetes-Secrets](https://kubernetes.io/docs/concepts/configuration/secret/). 

Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for details on each variable.

While most environment variables can use the `_FILE` suffix, it's more beneficial for sensitive data such as [credentials](/glossary.md#credential-n8n) and database configuration. Here are some examples: 

```yaml
CREDENTIALS_OVERWRITE_DATA_FILE=/path/to/credentials_data
DB_TYPE_FILE=/path/to/db_type
DB_POSTGRESDB_DATABASE_FILE=/path/to/database_name
DB_POSTGRESDB_HOST_FILE=/path/to/database_host
DB_POSTGRESDB_PORT_FILE=/path/to/database_port
DB_POSTGRESDB_USER_FILE=/path/to/database_user
DB_POSTGRESDB_PASSWORD_FILE=/path/to/database_password
DB_POSTGRESDB_SCHEMA_FILE=/path/to/database_schema
DB_POSTGRESDB_SSL_CA_FILE=/path/to/ssl_ca
DB_POSTGRESDB_SSL_CERT_FILE=/path/to/ssl_cert
DB_POSTGRESDB_SSL_KEY_FILE=/path/to/ssl_key
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED_FILE=/path/to/ssl_reject_unauth
```
