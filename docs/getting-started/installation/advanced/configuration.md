# Configuration

It is possible to change some of the n8n defaults via special environment variables.

For a full list of available configurations see [Environment Variables](../../../reference/environment-variables.md).

## How to set

Where you set these environment variables depends on how you are [running](../README.md) n8n, via npm or Docker.

### npm

For npm, set your desired environment variables in Terminal using the `export` command as shown below:

```bash
export <variable>=<value>
```

### Docker

For Docker, you can set your desired environment variables in the `n8n: environment:` element of your `docker-compose.yaml` file . For example:

```yaml
n8n:
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=<user>
      - N8N_BASIC_AUTH_PASSWORD=<password>
```

Or using the `-e` flag from the command line:

```bash
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e N8N_BASIC_AUTH_ACTIVE="true" \
	-e N8N_BASIC_AUTH_USER="<user>" \
	-e N8N_BASIC_AUTH_PASSWORD="<password>" \
	n8nio/n8n
```

### Configuration via file

It is also possible to configure n8n using a configuration file.

Only the values that should be different from the default need to be defined in your configuration file. If needed multiple files can also be supplied. For example, you can have some generic base settings and some specific ones depending on the environment.

The path to the JSON configuration file to use can be set using the environment variable `N8N_CONFIG_FILES`.

```bash
# Single file
export N8N_CONFIG_FILES=/folder/my-config.json

# Multiple files can be comma-separated
export N8N_CONFIG_FILES=/folder/my-config.json,/folder/production.json
```

A possible configuration file could look like this:
```json
{
	"executions": {
		"process": "main",
		"saveDataOnSuccess": "none"
	},
	"generic": {
		"timezone": "Europe/Berlin"
	},
	"security": {
		"basicAuth": {
			"active": true,
			"user": "frank",
			"password": "some-secure-password"
		}
	},
	"nodes": {
		"exclude": "[\"n8n-nodes-base.executeCommand\",\"n8n-nodes-base.writeBinaryFile\"]"
	}
}
```

You can also append `_FILE` to some individual environment variables to provide their configuration in a separate file, enabling you to avoid passing sensitive details via environment variables. 

n8n will then load the data from the file with the given name, making it possible to easily load data from Docker- and Kubernetes-Secrets.

The following environment variables support file input:
  - `CREDENTIALS_OVERWRITE_DATA_FILE`
  - `DB_TYPE_FILE`
  - `DB_MYSQLDB_DATABASE`
  - `DB_MYSQLDB_HOST_FILE`
  - `DB_MYSQLDB_PORT_FILE`	
  - `DB_MYSQLDB_USER_FILE`
  - `DB_MYSQLDB_PASSWORD_FILE`
  - `DB_POSTGRESDB_DATABASE_FILE`
  - `DB_POSTGRESDB_HOST_FILE`
  - `DB_POSTGRESDB_PASSWORD_FILE`
  - `DB_POSTGRESDB_PORT_FILE`
  - `DB_POSTGRESDB_SSL_CA_FILE`
  - `DB_POSTGRESDB_SSL_CERT_FILE`
  - `DB_POSTGRESDB_SSL_KEY_FILE`
  - `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED_FILE`
  - `DB_POSTGRESDB_USER_FILE`
  - `DB_POSTGRESDB_SCHEMA_FILE`
  - `N8N_BASIC_AUTH_PASSWORD_FILE`
  - `N8N_BASIC_AUTH_USER_FILE`
  - `N8N_BASIC_AUTH_HASH_FILE`
  - `N8N_JWT_AUTH_HEADER_FILE`
  - `N8N_JWKS_URI_FILE`
  - `N8N_JWT_AUTH_HEADER_VALUE_PREFIX_FILE`
  - `N8N_JWT_ISSUER_FILE`
  - `N8N_JWT_NAMESPACE_FILE`
  - `N8N_JWT_ALLOWED_TENANT_FILE`
  - `N8N_JWT_ALLOWED_TENANT_KEY_FILE`

## Examples

### Base URL

::: warning 💡 Keep in mind
This variable only gets used when the `n8n-editor-ui` package gets built manually. Hence,
it does not get used in combination with the default n8n docker image. By default, `/`
gets used, meaning that it uses the root-domain.
:::

Tells the frontend how to reach the REST API of the backend.

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```

### Encryption key

n8n creates a random encryption key automatically on the first launch and saves
it in the `~/.n8n` folder. That key is used to encrypt the credentials before
they get saved to the database. It is also possible to overwrite that key and
set it via an environment variable.

```bash
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```

### Execute in same process

All workflows get executed in their own separate process. This ensures that all CPU cores get used and that they do not block each other on CPU intensive tasks. Additionally, this makes sure that the crash of one execution does not take down the whole application. The disadvantage is, however, that it slows down the start-time considerably and uses much more memory. So in case the
workflows are not CPU intensive and they have to start very fast, it is possible to run them all directly in the main-process with this setting.

```bash
export EXECUTIONS_PROCESS=main
```

### Execution timeout

A workflow times out and gets canceled after this time (in seconds). If the workflow is executed in the main process, a soft timeout is executed (takes effect after the current node finishes). If a workflow is running in its own process, a soft timeout is tried first. The process is killed after waiting for an additional fifth of the given timeout duration.

By default `EXECUTIONS_TIMEOUT` is set to `-1`. For example, if you want to set the timeout to one hour:

```bash
export EXECUTIONS_TIMEOUT=3600
```

You can also set maximum execution time (in seconds) for each workflow individually. For example, if you want to set maximum execution time to two hours:

```bash
export EXECUTIONS_TIMEOUT_MAX=7200
```

### Custom nodes location

Every user can add custom nodes that get loaded by n8n on startup. The default
location is in the subfolder `.n8n/custom` of the user who started n8n.
Additional folders can be defined with an environment variable.

```bash
export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"
```

### Use built-in and external modules in Function-Nodes

For security reasons, importing modules is restricted by default in the Function-Nodes.
It is, however, possible to lift that restriction for built-in and external modules by
setting the following environment variables:
- `NODE_FUNCTION_ALLOW_BUILTIN`: For builtin modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when env variable is not set.

```bash
# Allows usage of all builtin modules
export NODE_FUNCTION_ALLOW_BUILTIN=*

# Allows usage of only crypto
export NODE_FUNCTION_ALLOW_BUILTIN=crypto

# Allows usage of only crypto and fs
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# Allow usage of external npm modules.
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```

### Timezone

The timezone is set by default to "America/New_York". For instance, it is used by the
Cron node to know at what time the workflow should be started. To set a different
default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example,
if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/).

### User folder

User-specific data like the encryption key, SQLite database file, and
the ID of the tunnel (if used) gets saved by default in the subfolder
`.n8n` of the user who started n8n. It is possible to overwrite the
user-folder via an environment variable.

```bash
export N8N_USER_FOLDER=/home/jim/n8n
```

### Webhook URL

The webhook URL will normally be created automatically by combining
`N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. However, if n8n runs behind a
reverse proxy that would not work. That's because n8n runs internally
on port 5678 but is exposed to the web via the reverse proxy on port 443. In
that case, it is important to set the webhook URL manually so that it can be
displayed correctly in the Editor UI and even more important is that the correct
webhook URLs get registred with the external services.

```bash
export WEBHOOK_URL=https://n8n.example.com/
```

### Prometheus

In order to collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client) library.

The `/metrics` endpoint is disabled by default, but it is possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

It is also possible to overwrite the prefix of the metric names by setting the `N8N_METRICS_PREFIX` environment variable.

```bash
export N8N_METRICS_PREFIX=n8n_
```

**Note:** At the moment, n8n does not support metrics for webhooks.
