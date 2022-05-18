# Configuration

It's possible to change some n8n defaults using environment variables.

For a full list of available configurations see [Environment Variables](/hosting/environment-variables/).

## How to set

Where you set these environment variables depends on how you are running n8n: with npm or Docker.

### npm

For npm, set your desired environment variables in terminal using the `export` command as shown below:

```bash
export <variable>=<value>
```

### Docker

For Docker, you can set your environment variables in the `n8n: environment:` element of your `docker-compose.yaml` file. For example:

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

### Configuration by file

You can also configure n8n using a configuration file.

Only define the values that need to be different from the default in your configuration file. You can use multiple files. For example, you can have a file with generic base settings, and files with specific values for different environments.

Set the path to the JSON configuration file using the environment variable `N8N_CONFIG_FILES`.

```bash
# Single file
export N8N_CONFIG_FILES=/folder/my-config.json

# Multiple files are comma-separated
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

You can also append `_FILE` to some individual environment variables to provide their configuration in a separate file, enabling you to avoid passing sensitive details using environment variables. n8n loads the data from the file with the given name, making it possible to load data from Docker- and Kubernetes-Secrets.

The following environment variables support file input:

  - `CREDENTIALS_OVERWRITE_DATA_FILE`
  - `DB_TYPE_FILE`
  - `DB_MYSQLDB_DATABASE_FILE`
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

!!! warning "Requires manual UI build"
    This variable requires a manual build of the `n8n-editor-ui` package. You can't use it with the default n8n docker image. The default it`/`, meaning that it uses the root-domain.


Tells the frontend how to reach the REST API of the back-end.

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```

### Encryption key

n8n creates a random encryption key automatically on the first launch and saves
it in the `~/.n8n` folder. n8n uses that key to encrypt the credentials before
they get saved to the database. It's possible to overwrite the key and
set it using an environment variable.

```bash
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```

### Execute in same process

All workflows run in their own separate process. This ensures that all CPU cores get used and that they don't block each other on CPU intensive tasks. It also makes sure that one execution crashing doesn't take down the whole application. The disadvantage is that it slows down the start-time considerably and uses much more memory. If your
workflows aren't CPU intensive, and they have to start very fast, it's possible to run them all directly in the main-process with this setting.

```bash
export EXECUTIONS_PROCESS=main
```

### Execution timeout

A workflow times out and gets canceled after this time (in seconds). If the workflow runs in the main process, a soft timeout happens (takes effect after the current node finishes). If a workflow runs in its own process, n8n attempts a soft timeout first, then kills the process after waiting for an additional fifth of the given timeout duration.

`EXECUTIONS_TIMEOUT` default is `-1`. For example, if you want to set the timeout to one hour:

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
You can define additional folders with an environment variable.

```bash
export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"
```

### Use built-in and external modules in Function-Nodes

For security reasons, ithe Function node restricts importing modules. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

- `NODE_FUNCTION_ALLOW_BUILTIN`: For built-in modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when an environment variable isn't set.

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

The default timezone is "America/New_York". For instance, the Cron node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/).

### User folder

n8n saves user-specific data like the encryption key, SQLite database file, and
the ID of the tunnel (if used) in the subfolder `.n8n` of the user who started n8n. It's possible to overwrite the user-folder using an environment variable.

```bash
export N8N_USER_FOLDER=/home/jim/n8n
```

### Webhook URL

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy that won't work. That's because n8n runs internally
on port 5678 but is exposed to the web using the reverse proxy on port 443. In
that case, it's important to set the webhook URL manually so that n8n can display it correctly in the Editor UI and register the correct webhook URLs with external services.

```bash
export WEBHOOK_URL=https://n8n.example.com/
```

### Prometheus

To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client) library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

It's also possible to overwrite the prefix of the metric names by setting the `N8N_METRICS_PREFIX` environment variable.

```bash
export N8N_METRICS_PREFIX=n8n_
```

!!! note "Metrics and webhooks"
  At the moment, n8n doesn't support metrics for webhooks.
