# Environment Variables

## Credentials

Enabling overwrites for credentials allows you to set default values for credentials which get automatically prefilled. The user cannot see or change these credentials. The format is `{ CREDENTIAL_NAME: { PARAMTER: VALUE }}`.

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA` | `*` | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | `string` | The API endpoint to fetch credentials. |

## Database

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_TYPE` | `enum string`: `sqlite`, `mariadb`, `mysqldb`, `postgresdb` | The type of database to use. |
| `DB_TABLE_PREFIX` | `*` | Prefix to be used for table names. |

### MySQL

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_MYSQLDB_DATABASE` | `string` | The name of the MySQL database. |
| `DB_MYSQLDB_HOST` | `string` | The MySQL host (e.g. `localhost`). |
| `DB_MYSQLDB_PORT` | `number` | The MySQL port (e.g. `3306`). |
| `DB_MYSQLDB_USER` | `string` | The MySQL user (e.g. `root`). |
| `DB_MYSQLDB_PASSWORD` | `string` | The MySQL password. |

### Postgres

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_POSTGRESDB_DATABASE` | `string` | The name of the PostgresDB database. |
| `DB_POSTGRESDB_HOST` | `string` | The PostgresDB host (e.g. `localhost`). |
| `DB_POSTGRESDB_PORT` | `number` | The PostgresDB port (e.g. `5432`). |
| `DB_POSTGRESDB_USER` | `string` | The PostgresDB user (e.g. `root`). |
| `DB_POSTGRESDB_PASSWORD` | `string` | The PostgresDB password. |
| `DB_POSTGRESDB_SCHEMA` | `string` | The PostgresDB schema (e.g. `public`). |
| `DB_POSTGRESDB_SSL_CA` | `string` | The PostgresDB SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT` | `string` | The PostgresDB SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY` | `string` | The PostgresDB SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | `boolean` | If unauthorized SSL connections should be rejected. |

### SQLite

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_SQLITE_VACUUM_ON_STARTUP` | `boolean` | Runs `VACUUM` operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and will increase start-up time. |

## Deployment

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_PATH` | `string` | The path n8n is deployed to. |
| `N8N_HOST` | `string` | Host name (e.g. `localhost`) where n8n can be reached. |
| `N8N_PORT` | `number` | The HTTP port (e.g. `5678`) where n8n can be reached. |
| `N8N_LISTEN_ADDRESS` | `string` | The IP address n8n should listen on. |
| `N8N_PROTOCOL` | `enum string`: `http`, `https` | The protocol used to reach n8n. |
| `N8N_SSL_KEY` | `string` | The SSL Key for HTTPS protocol. |
| `N8N_SSL_CERT` | `string` | The SSL certificate for HTTPS protocol. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | `boolean` | When enables, notifications of new versions and security updates are provided. |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | `string` | The endpoint where version information is retreived. By default `https://api.n8n.io/versions/` is used. |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | `string` | The URL displayed in the New Versions panel for additional information. By default `https://docs.n8n.io/getting-started/installation/updating.html` is used. |

## Endpoints

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_PAYLOAD_SIZE_MAX` | `number` | The maximum payload size in MB. |
| `N8N_METRICS` | `boolean` | Whether to enable the metrics endpoint. |
| `N8N_METRICS_PREFIX` | `string` | Optional prefix to be used for metrics names. |
| `N8N_ENDPOINT_REST` | `string` | The path used for REST endpoint. |
| `N8N_ENDPOINT_WEBHOOK` | `string` | The path used for webhook endpoint. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | `string` | The path used for test-webhook endpoint. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | `boolean` | Disable production webhooks from main process. This helps ensures no HTTP traffic load to main process when using webhook-specific processes. |
| `N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN` | `boolean` | Deregister webhooks on external services only when workflows are deactivated. |

## External Hooks

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXTERNAL_HOOK_FILES` | `string` | Files containing external hooks. Multiple files can be provided separated by colon (":"). |

## Executions

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXECUTIONS_PROCESS` | `enum string`: `main`, `own` | Whether processes are executed in their own process (default) or the main process. | 
| `EXECUTIONS_MODE` | `enum string`: `regular`, `queue` | Whether processes should run directly (default) or via queue. |
| `EXECUTIONS_TIMEOUT` | `number` | The max run time (in seconds) before stopping a workflow execution. Set to `-1` to disable. |
| `EXECUTIONS_TIMEOUT_MAX` | `number` | The max execution time (in seconds) that can be set for a workflow individually. |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | `enum string`: `all`, `none` | Whether execution data is saved on error. |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | `enum string`: `all`, `none` | Whether execution data is saved on success. |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | `boolean` | Whether to save progress for each node executed. |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | `boolean` | Whether to save data of executions when started manually. |
| `EXECUTIONS_DATA_PRUNE` | `boolean` | Whether to delete data of past executions on a rolling basis. |
| `EXECUTIONS_DATA_MAX_AGE` | `number` | The execution age (in hours) before it is deleted. |
| `EXECUTIONS_DATA_PRUNE_TIMEOUT` | `number` | The timeout (in seconds) after execution data has been pruned. |

## Logs

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_LOG_LEVEL` | `enum string`: `info`, `warn`, `error`, `verbose`, `debug` | Log output level. |
| `N8N_LOG_OUTPUT` | `enum string`: `console`, `file` | Where to output logs. Multiple values can be provided separated by a comma. |
| `N8N_LOG_FILE_COUNT_MAX` | `number` | Max number of log files to keep. |
| `N8N_LOG_FILE_SIZE_MAX` | `number` | Max size of each log file in MB. |
| `N8N_LOG_FILE_LOCATION` | `string` | Log file location. Only used if log output is set to `file`. |

## Nodes

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `NODES_INCLUDE` | `string` | Specify which nodes to load. |
| `NODES_EXCLUDE` | `string` | Specify which nodes not to load. |
| `NODES_ERROR_TRIGGER_TYPE` | `string` | Specify which node Node Type to use as Error Trigger. |

## Queues

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `QUEUE_BULL_PREFIX` | `string` | Prefix to be used for all queue keys. |
| `QUEUE_BULL_REDIS_DB` | `number` | The Redis database used. |
| `QUEUE_BULL_REDIS_HOST` | `string` | The Redis host (e.g. `localhost`). | 
| `QUEUE_BULL_REDIS_PORT` | `number` | The Redis port used (e.g. `6379`). | 
| `QUEUE_BULL_REDIS_PASSWORD` | `string` | The Redis password. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | `number` | The Redis timeout threshold (in seconds). |
| `QUEUE_RECOVERY_INTERVAL` | `number` | Internal (in seconds) for active polling to the queue to recover from Redis crashes. `0` is disabled. May increase Redis traffic significantly. |

## Security

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_AUTH_EXCLUDE_ENDPOINTS` | `string` | Additional endpoints to exclude auth checks. Multiple endpoints can be provided separated by a colon (":"). |
| `N8N_BASIC_AUTH_ACTIVE` | `boolean` | Whether basic auth should be activated for editor and REST-API access. |
| `N8N_BASIC_AUTH_USER` | `string` | The name of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_PASSWORD` | `string` | The password of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_HASH` | `boolean` | Whether the basic authentication password is hashed. |
| `N8N_JWT_AUTH_ACTIVE` | `boolean` | Whether JWT authentication should be activated for editor and REST-API access. |
| `N8N_JWT_AUTH_HEADER` | `string` | The request header containing a signed JWT. |
| `N8N_JWT_AUTH_HEADER_VALUE_PREFIX` | `string` | Optional. The request header value prefix to strip. |
| `N8N_JWKS_URI` | `string` | The URI to fetch JWK Set for JWT authentication. |
| `N8N_JWT_ISSUER` | `string` | Optional. The expected JWT issuer. |
| `N8N_JWT_NAMESPACE` | `string` | Optional. The expected JWT namespace. |
| `N8N_JWT_ALLOWED_TENANT` | `string` | Optional. The allowed JWT tenant. |
| `N8N_JWT_ALLOWED_TENANT_KEY` | `string` | Optional. The JWT tenant key name to inspect within the JWT namespace. |


## Timezone

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `GENERIC_TIMEZONE` | `*` | The timezone to use (e.g. `America/New York). Important for schedule nodes (i.e. Cron). |

## Workflows

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `WORKFLOWS_DEFAULT_NAME` | `string` | The default name used for new workflows (e.g. `My workflow`). |
