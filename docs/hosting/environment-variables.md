# Environment Variables

!!! note "File-based configuration"
    You can provide a [configuration file](/hosting/configuration/#configuration-via-file) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.


## Credentials

Enabling overwrites for credentials allows you to set default values for credentials which get automatically populated. The user can't see or change these credentials. The format is `{ CREDENTIAL_NAME: { PARAMTER: VALUE }}`.

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`/`_FILE` | `*` | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | `string` | The API endpoint to fetch credentials. |
| `CREDENTIALS_DEFAULT_NAME` | `string` | The default name for credentials. Default value is `My credentials`. |

## Database

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_TYPE`/`_FILE` | `enum string`: `sqlite`, `mariadb`, `mysqldb`, `postgresdb` | The database to use. Default value is `sqlite`. |
| `DB_TABLE_PREFIX` | `*` | Prefix to use for table names. |

### MySQL

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_MYSQLDB_DATABASE`/`_FILE` | `string` | The name of the MySQL database. Default value is `n8n`. |
| `DB_MYSQLDB_HOST`/`_FILE` | `string` | The MySQL host. Default value is `localhost`. |
| `DB_MYSQLDB_PORT`/`_FILE` | `number` | The MySQL port. Default value is `3306`. |
| `DB_MYSQLDB_USER`/`_FILE` | `string` | The MySQL user. Default value is `root`. |
| `DB_MYSQLDB_PASSWORD`/`_FILE` | `string` | The MySQL password. |

### PostgreSQL

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_POSTGRESDB_DATABASE`/`_FILE` | `string` | The name of the PostgreSQL database. Default value is `n8n`. |
| `DB_POSTGRESDB_HOST`/`_FILE` | `string` | The PostgreSQL host. Default value is `localhost`. |
| `DB_POSTGRESDB_PORT`/`_FILE` | `number` | The PostgreSQL port. Default value is `5432`. |
| `DB_POSTGRESDB_USER`/`_FILE` | `string` | The PostgreSQL user. Default value is `root`. |
| `DB_POSTGRESDB_PASSWORD`/`_FILE` | `string` | The PostgreSQL password. |
| `DB_POSTGRESDB_SCHEMA`/`_FILE` | `string` | The PostgreSQL schema. Default value is `public`. |
| `DB_POSTGRESDB_SSL_CA`/`_FILE` | `string` | The PostgreSQL SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT`/`_FILE` | `string` | The PostgreSQL SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY`/`_FILE` | `string` | The PostgreSQL SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`/`_FILE` | `boolean` | If n8n should reject unauthorized SSL connections. Default value is `true`. |

### SQLite

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `DB_SQLITE_VACUUM_ON_STARTUP` | `boolean` | Runs [VACUUM](https://www.sqlite.org/lang_vacuum.html){:target="_blank" .external-link} operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time. Default value is `false`. |

## Deployment

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_EDITOR_BASE_URL` | `string` | Public URL where users can access the editor. Also used for emails sent from n8n. |
| `N8N_CONFIG_FILES` | `string` | Use to provide the path to any JSON [configuration file(/hosting/configuration/#configuration-by-file). |
| `N8N_DISABLE_UI` | `boolean` | Disable the UI (true) or not (false). |
| `N8N_TEMPLATES_ENABLED` | `boolean` | Enable workflow templates (true) or disable (false). |
| `N8N_TEMPLATES_HOST` | `string` | Defaults to https://api.n8n.io. Change this if creating your own workflow template library. |
| `N8N_ENCRYPTION_KEY` | `string` | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch. |
| `N8N_USER_FOLDER` | `string` | Provide the path where n8n will store user-specific data, such as database file and encryption key. By default, `.n8n` is used. |
| `N8N_PATH` | `string` | The path n8n deploys to. Default is `/`. |
| `N8N_HOST` | `string` | Host name n8n runs on. Default is `localhost`. |
| `N8N_PORT` | `number` | The HTTP port n8n runs on. Default is `5678`. |
| `N8N_LISTEN_ADDRESS` | `string` | The IP address n8n should listen on. Default is `0.0.0.0`. |
| `N8N_PROTOCOL` | `enum string`: `http`, `https` | The protocol used to reach n8n. Default is `http`. |
| `N8N_SSL_KEY` | `string` | The SSL Key for HTTPS protocol. |
| `N8N_SSL_CERT` | `string` | The SSL certificate for HTTPS protocol. |
| `N8N_PERSONALIZATION_ENABLED` | `boolean` | Whether to ask users personalisation questions and then customise n8n accordingly. Default is `true`. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | `boolean` | When enabled, n8n sends notifications of new versions and security updates. Default value is `true`. |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | `string` | The endpoint to retrieve where version information. Default is `https://api.n8n.io/versions/`. |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | `string` | The URL displayed in the New Versions panel for additional information. Default is `https://docs.n8n.io/getting-started/installation/updating.html`. |
| `N8N_DIAGNOSTICS_ENABLED` | `boolean` | Whether to share selected, anonymous [telemetry](/reference/data-collection/) with n8n |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND` | `string` | Telemetry configuration for the frontend. Default is `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io`. |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | `string` | Telemetry configuration for the frontend. Default is `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch`. |
| `N8N_AVAILABLE_BINARY_DATA_MODES` | `string` | A comma separated list of available binary data modes. Default is `filesystem`. |
| `N8N_BINARY_DATA_STORAGE_PATH` | `string` | The path where n8n stores binary data. Defaults to `binaryData` under the `N8N_USER_FOLDER`. |
| `N8N_BINARY_DATA_TTL` | `number` | Time to live (in minutes) for binary data of unsaved executions. Default is `60`. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | `string` | The default binary data mode. Default value is `default` and keeps binary data in memory. Set to `filesystem` to use the filesystem. |
| `N8N_PERSISTED_BINARY_DATA_TTL` | `number` | Time to live (in minutes) for persisted data. Default is `1440`. |
| `VUE_APP_URL_BASE_API` | `string` | Used when building the `n8n-editor-ui` package manually to set how the frontend can reach the backend API. |

## User management and SMTP

| Variable | Type | Description | Required? |
| :------- | :--- | :---------- | --------- |
| `N8N_USER_MANAGEMENT_DISABLED` | Boolean | Defaults to user management enabled (false). Set to `true` to disable the [user management](/hosting/user-management/) feature. Note that n8n ignores this environment variable if you have already set up an owner account. | Optional |
| `N8N_EMAIL_MODE` | string | `smtp` | Required |
| `N8N_SMTP_HOST` | string | _your_SMTP_server_name_ | Required |
| `N8N_SMTP_PORT` | number | _your_SMTP_server_port_ Default is `465`. | Optional |
| `N8N_SMTP_USER` | string | _your_SMTP_username_ | Required |
| `N8N_SMTP_PASS` | string | _your_SMTP_password_ | Required |
| `N8N_SMTP_SENDER` | string | You can select the sender name from the sender addresses. Example: `N8N _contact@n8n.com_`| Required |
| `N8N_SMTP_SSL` | Boolean | Whether to use SSL for SMTP (true) or not (false). Defaults to `true`. | Optional | 
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | string | Full path to your HTML email template. This overrides the default template for invite emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | string | Full path to your HTML email template. This overrides the default template for password reset emails. | Optional |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | String | Set a specific JWT secret. By default, n8n generates one on start. | Optional |


## Endpoints

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_PAYLOAD_SIZE_MAX` | `number` | The maximum payload size in MB. Default value is `16`. |
| `N8N_METRICS` | `boolean` | Whether to enable the metrics endpoint. Default value is `false`. |
| `N8N_METRICS_PREFIX` | `string` | Optional prefix for metrics names. Default value is `n8n_`. |
| `N8N_ENDPOINT_REST` | `string` | The path used for REST endpoint. Default value is `rest`. |
| `N8N_ENDPOINT_WEBHOOK` | `string` | The path used for webhook endpoint. Default value is `webhook`. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | `string` | The path used for test-webhook endpoint. Default value is `webhook-test`. |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | `string` | The path used for waiting-webhook endpoint. Default value is `webhook-waiting`. |
| `WEBHOOK_URL` | `string` | Used to manually provide the Webhook URL when running n8n behind a reverse proxy. See [here](/hosting/configuration/#webhook-url) for more details. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | `boolean` | Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes. Default value is `false`.  |
| `N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN` | `boolean` | Only de-register webhooks on external services when workflows are deactivated. Default value is `false`. |

## External hooks

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXTERNAL_HOOK_FILES` | `string` | Files containing external hooks. Provide multiple files as a colon-separated list ("`:`"). |

## Executions

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `EXECUTIONS_PROCESS` | `enum string`: `main`, `own` | Whether n8n executions run in their own process or the main process. Default is `own`.<br><br>See [here](/hosting/scaling/execution-modes-processes/) for more details. |
| `EXECUTIONS_MODE` | `enum string`: `regular`, `queue` | Whether executions should run directly or using queue. Default is `regular`.<br><br>Refer to [Execution modes and processes](/hosting/scaling/execution-modes-processes/) for more details. |
| `EXECUTIONS_TIMEOUT` | `number` | The maximum run time (in seconds) before stopping a workflow execution. Set to `-1` to disable. Default value is `-1`. |
| `EXECUTIONS_TIMEOUT_MAX` | `number` | The maximum execution time (in seconds) for an individual workflow. Default value is `3600`. |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | `enum string`: `all`, `none` | Whether n8n saves execution data on error. Default value is `all`. |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | `enum string`: `all`, `none` | Whether n8n saves execution data on success. Default value is `all`. |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | `boolean` | Whether to save progress for each node executed (true) or not (false). Default value is `false`. |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | `boolean` | Whether to save data of executions when started manually. Default value is `false`. |
| `EXECUTIONS_DATA_PRUNE` | `boolean` | Whether to delete data of past executions on a rolling basis. Default value is `false`. |
| `EXECUTIONS_DATA_MAX_AGE` | `number` | The execution age (in hours) before it's deleted. Default value is `336`. |
| `EXECUTIONS_DATA_PRUNE_TIMEOUT` | `number` | The timeout (in seconds) after n8n prunes execution data. Default value is `3600`. |

## Logs

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_LOG_LEVEL` | `enum string`: `info`, `warn`, `error`, `verbose`, `debug` | Log output level. Default is `info`. |
| `N8N_LOG_OUTPUT` | `enum string`: `console`, `file` | Where to output logs. Provide multiple values as a comma-seperated list. Default is `console`. |
| `N8N_LOG_FILE_COUNT_MAX` | `number` | Max number of log files to keep. Default is `100`. |
| `N8N_LOG_FILE_SIZE_MAX` | `number` | Max size of each log file in MB. Default is `16`. |
| `N8N_LOG_FILE_LOCATION` | `string` | Log file location. Requires log output set to `file`. |
| `DB_LOGGING_ENABLED` | `boolean` | Whether to enable database-specific logging. Default is `false`. |
| `DB_LOGGING_OPTIONS` | `string` | Database log output level. Possible values: `query`, `error`, `schema`, `warn`, `info`, `log`. To enable all logging, specify `all`. |
| `DB_LOGGING_MAX_EXECUTION_TIME` | `number` | Maximum execution time (in milliseconds) before n8n logs a warning. Default is `1000`. Set to `0` to disable long running query warning. |

## Nodes

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `NODES_INCLUDE` | `string` | Specify which nodes to load. |
| `NODES_EXCLUDE` | `string` | Specify which nodes not to load. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | `string` | Permit users to import specific built-in modules in Function nodes. Use `*` to allow all. n8n disables importing modules by default. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | `string` | Permit users to import specific external modules (from `n8n/node_modules`) in Function nodes. n8n disables importing modules by default. |
| `NODES_ERROR_TRIGGER_TYPE` | `string` | Specify which Node Type to use as Error Trigger. Default value is `n8n-nodes-base.errorTrigger`. |
| `N8N_CUSTOM_EXTENSIONS` | `string` | Specify the path to additional directories containing your custom nodes. |

## Queues

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `QUEUE_BULL_PREFIX` | `string` | Prefix to use for all queue keys. |
| `QUEUE_BULL_REDIS_DB` | `number` | The Redis database used. Default value is `0`. |
| `QUEUE_BULL_REDIS_HOST` | `string` | The Redis host. Default value is `localhost`. |
| `QUEUE_BULL_REDIS_PORT` | `number` | The Redis port used. Default value is `6379`. |
| `QUEUE_BULL_REDIS_PASSWORD` | `string` | The Redis password. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | `number` | The Redis timeout threshold (in seconds). Default value is `10000`. |
| `QUEUE_RECOVERY_INTERVAL` | `number` | Interval (in seconds) for active polling to the queue to recover from Redis crashes. `0` disables recovery. May increase Redis traffic significantly. Default value is `60`. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Boolean | Whether to enable health checks (true) or disable (false). Defaults to false. |
| `QUEUE_HEALTH_CHECK_PORT` | number | The port to serve health checks on. |

## Security

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `N8N_AUTH_EXCLUDE_ENDPOINTS` | `string` | Exclude endpoints from authentication checks. Provide multiple endpoints as a colon-seperated list ("`:`"). The endpoints must not start with a forward slash ("`/`"). |
| `N8N_BASIC_AUTH_ACTIVE` | `boolean` | Whether n8n should activate basic auth for editor and REST-API access. Default value is `false`. |
| `N8N_BASIC_AUTH_USER`/`_FILE` | `string` | The name of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_PASSWORD`/`_FILE` | `string` | The password of the n8n user for basic authentication. |
| `N8N_BASIC_AUTH_HASH`/`_FILE` | `boolean` | Whether to hash the basic authentication password. Default value is `false`. |
| `N8N_JWT_AUTH_ACTIVE` | `boolean` | Whether n8n should activate JWT authentication for editor and REST-API access. Default value is `false`. |
| `N8N_JWT_AUTH_HEADER`/`_FILE` | `string` | The request header containing a signed JWT. |
| `N8N_JWT_AUTH_HEADER_VALUE_PREFIX`/`_FILE` | `string` | Optional. The request header value prefix to strip. |
| `N8N_JWKS_URI`/`_FILE` | `string` | The URI to fetch JWK Set for JWT authentication. |
| `N8N_JWT_ISSUER`/`_FILE` | `string` | Optional. The expected JWT issuer. |
| `N8N_JWT_NAMESPACE`/`_FILE` | `string` | Optional. The expected JWT namespace. |
| `N8N_JWT_ALLOWED_TENANT`/`_FILE` | `string` | Optional. The allowed JWT tenant. |
| `N8N_JWT_ALLOWED_TENANT_KEY`/`_FILE` | `string` | Optional. The JWT tenant key name to inspect within the JWT namespace. |

## Timezone and localization

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `GENERIC_TIMEZONE` | `*` | The n8n instance timezone. Important for schedule nodes (such as Cron). Default value is `America/New_York`. |
| `N8N_DEFAULT_LOCALE` | String | A locale identifier, compatible with the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language){:target="_blank" .external-link}. n8n doesn't support regional identifiers, such as `de-AT`. Default is `en`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings. |

## Workflows

| Variable | Type | Description |
| :------- | :--- | :---------- |
| `WORKFLOWS_DEFAULT_NAME` | `string` | The default name used for new workflows. Default value is `My workflow`. |
| `N8N_ONBOARDING_FLOW_DISABLED` | `boolean` | Whether to show onboarding tips when creating a new workflow (true) or not (false). Default value is `false`. |
| `N8N_WORKFLOW_TAGS_DISABLED` | Boolean | Whether to disable workflow tags (true) or enable tags (false). Default is `false`. |
