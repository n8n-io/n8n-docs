---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configuration methods
description: How to set environment variables for n8n.
contentType: howto
---

# Configuration

You can change n8n's settings using environment variables. For a full list of available configurations see [Environment Variables](/hosting/configuration/environment-variables/).

## Set environment variables by command line

### npm

For npm, set your desired environment variables in terminal using the `export` command as shown below:

```bash
export <variable>=<value>
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

## Set environment variables using a file

You can also configure n8n using a configuration file.

Only define the values that need to be different from the default in your configuration file. You can use multiple files. For example, you can have a file with generic base settings, and files with specific values for different environments.

### npm

Set the path to the JSON configuration file using the environment variable `N8N_CONFIG_FILES`:

```shell
# Bash - Single file
export N8N_CONFIG_FILES=/<path-to-config>/my-config.json
# Bash - Multiple files are comma-separated
export N8N_CONFIG_FILES=/<path-to-config>/my-config.json,/<path-to-config>/production.json

# PowerShell - Single file, persist for current user
# Note that setting scope (Process, User, Machine) has no effect on Unix systems
[Environment]::SetEnvironmentVariable('N8N_CONFIG_FILES', '<path-to-config>\config.json', 'User')
```

Example file:

```json
{
 "executions": {
  "saveDataOnSuccess": "none"
 },
 "generic": {
  "timezone": "Europe/Berlin"
 },
 "nodes": {
  "exclude": "[\"n8n-nodes-base.executeCommand\",\"n8n-nodes-base.writeBinaryFile\"]"
 }
}
```

/// note | Formatting as JSON
You can't always work out the correct JSON from the [Environment variables reference](/hosting/configuration/environment-variables/). For example, to set `N8N_METRICS` to `true`, you need to do:

```json
{
	"endpoints": {
		"metrics": {
			"enable": true
		}
	}
}
```

Refer to the [Schema file in the source code](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/config/schema.ts){:target=_blank .external-link} for full details of the expected settings.
///


### Docker

In Docker, you can set your environment variables in the `n8n: environment:` element of your `docker-compose.yaml` file.

For example:

```yaml
n8n:
    environment:
      - N8N_TEMPLATES_ENABLED=false
```

### Keeping sensitive data in separate files

You can append `_FILE` to individual environment variables to provide their configuration in a separate file, enabling you to avoid passing sensitive details using environment variables. n8n loads the data from the file with the given name, making it possible to load data from [Docker-Secrets](https://docs.docker.com/engine/swarm/secrets/){:target=_blank .external-link} and [Kubernetes-Secrets](https://kubernetes.io/docs/concepts/configuration/secret/){:target=_blank .external-link}. 

Refer to [Environment variables](/hosting/configuration/environment-variables/) for details on each variable.

While most environment variables can use the `_FILE` suffix, it's more beneficial for sensitive data such as credentials and database configuration. Here are some examples: 

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
