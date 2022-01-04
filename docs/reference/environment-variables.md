# Environment Variables

::: tip 💡 Keep in mind
You can provide a [configuration file](../getting-started/installation/advanced/configuration.md#configuration-via-file) for n8n, and also append `_FILE` to certain variables to provide their configuration separately, indicated by "/`_FILE`" below.
:::

## Credentials

Enabling overwrites for credentials allows you to set default values for credentials which get automatically prefilled. The user cannot see or change these credentials. The format is `{ CREDENTIAL_NAME: { PARAMTER: VALUE }}`.

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`/`_FILE` | `*` | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | `string` | The API endpoint to fetch credentials. |
| `CREDENTIALS_DEFAULT_NAME` | `string` | The default name for credentials. Default value is `My credentials`. |

## Database

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_TYPE`/`_FILE` | `enum string`: `sqlite`, `mariadb`, `mysqldb`, `postgresdb` | The type of database to use. Default value is `sqlite`. |
| `DB_TABLE_PREFIX` | `*` | Prefix to be used for table names. |

### MySQL

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_MYSQLDB_DATABASE`/`_FILE` | `string` | The name of the MySQL database. Default value is `n8n`. |
| `DB_MYSQLDB_HOST`/`_FILE` | `string` | The MySQL host. Default value is `localhost`. |
| `DB_MYSQLDB_PORT`/`_FILE` | `number` | The MySQL port. Default value is `3306`. |
| `DB_MYSQLDB_USER`/`_FILE` | `string` | The MySQL user. Default value is `root`. |
| `DB_MYSQLDB_PASSWORD`/`_FILE` | `string` | The MySQL password. |

### Postgres

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_POSTGRESDB_DATABASE`/`_FILE` | `string` | The name of the PostgresDB database. Default value is `n8n`. |
| `DB_POSTGRESDB_HOST`/`_FILE` | `string` | The PostgresDB host. Default value is `localhost`. |
| `DB_POSTGRESDB_PORT`/`_FILE` | `number` | The PostgresDB port. Default value is `5432`. |
| `DB_POSTGRESDB_USER`/`_FILE` | `string` | The PostgresDB user. Default value is `root`. |
| `DB_POSTGRESDB_PASSWORD`/`_FILE` | `string` | The PostgresDB password. |
| `DB_POSTGRESDB_SCHEMA`/`_FILE` | `string` | The PostgresDB schema. Default value is `public`. |
| `DB_POSTGRESDB_SSL_CA`/`_FILE` | `string` | The PostgresDB SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT`/`_FILE` | `string` | The PostgresDB SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY`/`_FILE` | `string` | The PostgresDB SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`/`_FILE` | `boolean` | If unauthorized SSL connections should be rejected. Default value is `true`. |

### SQLite

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_SQLITE_VACUUM_ON_STARTUP` | `boolean` | Runs `VACUUM` operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and will increase start-up time. Default value is `false`. |

## Deployment

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_CONFIG_FILES` | `string` | Use to provide the path to any JSON [configuration file(s)](../getting-started/installation/advanced/configuration.md#configuration-via-file). |
| `N8N_DISABLE_UI` | `boolean` | Whether the UI should be disabled. |
| `N8N_ENCRYPTION_KEY` | `string` | Provide a custom key used to encrypt credentials in the n8n database. By default a random key is generated on first launch. |
| `N8N_USER_FOLDER` | `string` | Provide the path where n8n will store user-specific data, such as database file and encryption key. By default, `.n8n` is used. |
| `N8N_PATH` | `string` | The path n8n is deployed to. Default is `/`. |
| `N8N_HOST` | `string` | Host name where n8n can be reached. Default is `localhost`. |
| `N8N_PORT` | `number` | The HTTP port where n8n can be reached. Default is `5678`. |
| `N8N_LISTEN_ADDRESS` | `string` | The IP address n8n should listen on. Default is `0.0.0.0`. |
| `N8N_PROTOCOL` | `enum string`: `http`, `https` | The protocol used to reach n8n. Default is `http`. |
| `N8N_SSL_KEY` | `string` | The SSL Key for HTTPS protocol. |
| `N8N_SSL_CERT` | `string` | The SSL certificate for HTTPS protocol. |
| `N8N_PERSONALIZATION_ENABLED` | `boolean` | Whether to ask users personalisation questions and then customise n8n accordingly. Default is `true`. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | `boolean` | When enabled, notifications of new versions and security updates are provided. Default value is `true`. |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | `string` | The endpoint where version information is retrieved. By default `https://api.n8n.io/versions/` is used. |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | `string` | The URL displayed in the New Versions panel for additional information. By default `https://docs.n8n.io/getting-started/installation/updating.html` is used. |
| `N8N_DIAGNOSTICS_ENABLED` | `boolean` | Whether to share selected, anonymous [telemetry](../reference/telemetry.html) with n8n |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND` | `string` | Telemetry config for the frontend. Default is `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io`. |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | `string` | Telemetry config for the frontend. Default is `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch`. |
| `VUE_APP_URL_BASE_API` | `string` | Used when building the `n8n-editor-ui` package manually to indicate how the frontend can reach the backend API. |

## Endpoints

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_PAYLOAD_SIZE_MAX` | `number` | The maximum payload size in MB. Default value is `16`. |
| `N8N_METRICS` | `boolean` | Whether to enable the metrics endpoint. Default value is `false`. |
| `N8N_METRICS_PREFIX` | `string` | Optional prefix to be used for metrics names. Default value is `n8n_`. |
| `N8N_ENDPOINT_REST` | `string` | The path used for REST endpoint. Default value is `rest`. |
| `N8N_ENDPOINT_WEBHOOK` | `string` | The path used for webhook endpoint. Default value is `webhook`. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | `string` | The path used for test-webhook endpoint. Default value is `webhook-test`. |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | `string` | The path used for waiting-webhook endpoint. Default value is `webhook-waiting`. |
| `WEBHOOK_URL` | `string` | Used to manually provide the Webhook URL when running n8n behind a reverse proxy. See [here](../getting-started/installation/advanced/configuration.md#webhook-url) for more details. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | `boolean` | Disable production webhooks from main process. This helps ensures no HTTP traffic load to main process when using webhook-specific processes. Default value is `false`.  |
| `N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN` | `boolean` | Deregister webhooks on external services only when workflows are deactivated. Default value is `false`. |

## External Hooks

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXTERNAL_HOOK_FILES` | `string` | Files containing external hooks. Multiple files can be provided separated by colon ("`:`"). |

## Executions

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXECUTIONS_PROCESS` | `enum string`: `main`, `own` | Whether processes are executed in their own process or the main process. By default it is set to `own`.<br><br>See [here](../getting-started/key-concepts/modes.md) for more details. |
| `EXECUTIONS_MODE` | `enum string`: `regular`, `queue` | Whether processes should run directly or via queue. By default it is set to `regular`.<br><br>See [here](../getting-started/key-concepts/modes.md) for more details. |
| `EXECUTIONS_TIMEOUT` | `number` | The max run time (in seconds) before stopping a workflow execution. Set to `-1` to disable. Default value is `-1`. |
| `EXECUTIONS_TIMEOUT_MAX` | `number` | The max execution time (in seconds) that can be set for a workflow individually. Default value is `3600`. |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | `enum string`: `all`, `none` | Whether execution data is saved on error. Default value is `all`. |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | `enum string`: `all`, `none` | Whether execution data is saved on success. Default value is `all`. |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | `boolean` | Whether to save progress for each node executed. Default value is `false`. |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | `boolean` | Whether to save data of executions when started manually. Default value is `false`. |
| `EXECUTIONS_DATA_PRUNE` | `boolean` | Whether to delete data of past executions on a rolling basis. Default value is `false`. |
| `EXECUTIONS_DATA_MAX_AGE` | `number` | The execution age (in hours) before it is deleted. Default value is `336`. |
| `EXECUTIONS_DATA_PRUNE_TIMEOUT` | `number` | The timeout (in seconds) after execution data has been pruned. Default value is `3600`. |

## Logs

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_LOG_LEVEL` | `enum string`: `info`, `warn`, `error`, `verbose`, `debug` | Log output level. Default is `info`. |
| `N8N_LOG_OUTPUT` | `enum string`: `console`, `file` | Where to output logs. Multiple values can be provided separated by a comma. Default is `console`. |
| `N8N_LOG_FILE_COUNT_MAX` | `number` | Max number of log files to keep. Default is `100`. |
| `N8N_LOG_FILE_SIZE_MAX` | `number` | Max size of each log file in MB. Default is `16`. |
| `N8N_LOG_FILE_LOCATION` | `string` | Log file location. Only used if log output is set to `file`. |

## Nodes

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `NODES_INCLUDE` | `string` | Specify which nodes to load. |
| `NODES_EXCLUDE` | `string` | Specify which nodes not to load. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | `string` | Specify which built-in modules may be imported in Function nodes. Use `*` to allow all. By default importing modules is disabled. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | `string` | Specify which external modules (from `n8n/node_modules`) may be imported in Function nodes. By default importing modules is disabled. |
| `NODES_ERROR_TRIGGER_TYPE` | `string` | Specify which Node Type to use as Error Trigger. Default value is `n8n-nodes-base.errorTrigger`. |
| `N8N_CUSTOM_EXTENSIONS` | `string` | Specify the path to additional directories containing your custom nodes. |

## Queues

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `QUEUE_BULL_PREFIX` | `string` | Prefix to be used for all queue keys. |
| `QUEUE_BULL_REDIS_DB` | `number` | The Redis database used. Default value is `0`. |
| `QUEUE_BULL_REDIS_HOST` | `string` | The Redis host. Default value is `localhost`. |
| `QUEUE_BULL_REDIS_PORT` | `number` | The Redis port used. Default value is `6379`. |
| `QUEUE_BULL_REDIS_PASSWORD` | `string` | The Redis password. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | `number` | The Redis timeout threshold (in seconds). Default value is `10000`. |
| `QUEUE_RECOVERY_INTERVAL` | `number` | Internal (in seconds) for active polling to the queue to recover from Redis crashes. `0` is disabled. May increase Redis traffic significantly. Default value is `60`. |

## Security

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_AUTH_EXCLUDE_ENDPOINTS` | `string` | Additional endpoints to exclude auth checks. Multiple endpoints can be provided separated by a colon ("`:`"). The endpoints should **not** start with a forward slash ("`/`"). |
| `N8N_BASIC_AUTH_ACTIVE` | `boolean` | Whether basic auth should be activated for editor and REST-API access. Default value is `false`. |
| `N8N_BASIC_AUTH_USER`/`_FILE` | `string` | The name of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_PASSWORD`/`_FILE` | `string` | The password of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_HASH`/`_FILE` | `boolean` | Whether the basic authentication password is hashed. Default value is `false`. |
| `N8N_JWT_AUTH_ACTIVE` | `boolean` | Whether JWT authentication should be activated for editor and REST-API access. Default value is `false`. |
| `N8N_JWT_AUTH_HEADER`/`_FILE` | `string` | The request header containing a signed JWT. |
| `N8N_JWT_AUTH_HEADER_VALUE_PREFIX`/`_FILE` | `string` | Optional. The request header value prefix to strip. |
| `N8N_JWKS_URI`/`_FILE` | `string` | The URI to fetch JWK Set for JWT authentication. |
| `N8N_JWT_ISSUER`/`_FILE` | `string` | Optional. The expected JWT issuer. |
| `N8N_JWT_NAMESPACE`/`_FILE` | `string` | Optional. The expected JWT namespace. |
| `N8N_JWT_ALLOWED_TENANT`/`_FILE` | `string` | Optional. The allowed JWT tenant. |
| `N8N_JWT_ALLOWED_TENANT_KEY`/`_FILE` | `string` | Optional. The JWT tenant key name to inspect within the JWT namespace. |


## Timezone

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `GENERIC_TIMEZONE` | `*` | The timezone to use. Important for schedule nodes (i.e. Cron). Default value is `America/New_York`. |

## Workflows

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `WORKFLOWS_DEFAULT_NAME` | `string` | The default name used for new workflows. Default value is `My workflow`. |
