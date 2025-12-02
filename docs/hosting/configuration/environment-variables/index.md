## AI Assistant Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_AI_ASSISTANT_BASE_URL | Base URL of the AI assistant service | string | '' |## AI Builder Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_AI_ANTHROPIC_KEY | Keys for local service | string | '' |## AI Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_AI_ENABLED | Whether AI features are enabled. | boolean | false |## Auth Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SECURE_COOKIE | This sets the `Secure` flag on n8n auth cookie | boolean | true |
| N8N_SAMESITE_COOKIE | This sets the `Samesite` flag on n8n auth cookie | enum ('strict', 'lax', 'none') | 'lax' |## N8N Cache Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_CACHE_MEMORY_MAX_SIZE | Max size of memory cache in bytes | number | 3145728 (3 MiB) |
| N8N_CACHE_MEMORY_TTL | Time to live (in milliseconds) for data cached in memory. | number | 3600000 (1 hour) |
| N8N_CACHE_REDIS_KEY_PREFIX | Prefix for cache keys in Redis. | string | cache |
| N8N_CACHE_REDIS_TTL | Time to live (in milliseconds) for data cached in Redis. 0 for no TTL. | number | 3600000 (1 hour) |
| N8N_CACHE_BACKEND | Backend to use for caching. | 'memory' \| 'redis' \| 'auto' | auto |## Credentials Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `CREDENTIALS_OVERWRITE_DATA` | Prefilled data ("overwrite") in credential types. End users cannot view or change this data. Format: { CREDENTIAL_NAME: { PARAMETER: VALUE }} | string | `{}` |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | Internal API endpoint to fetch overwritten credential types from. | string | `''` |
| `CREDENTIALS_OVERWRITE_ENDPOINT_AUTH_TOKEN` | Authentication token for the credentials overwrite endpoint. | string | `''` |
| `CREDENTIALS_OVERWRITE_PERSISTENCE` | Enable persistence for credentials overwrites. | boolean | `false` |
| `CREDENTIALS_DEFAULT_NAME` | Default name for credentials | string | `'My credentials'` |## Data Table Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `N8N_DATA_TABLES_MAX_SIZE_BYTES` | Specifies the maximum allowed size (in bytes) for data tables. | number | 52428800 (50 * 1024 * 1024) |
| `N8N_DATA_TABLES_WARNING_THRESHOLD_BYTES` | The percentage threshold at which a warning is triggered for data tables. When the usage of a data table reaches or exceeds this value, a warning is issued. Defaults to 80% of maxSize if not explicitly set via environment variable. | number | undefined |
| `N8N_DATA_TABLES_SIZE_CHECK_CACHE_DURATION_MS` | The duration in milliseconds for which the data table size is cached. This prevents excessive database queries for size validation. | number | 60000 (60 * 1000) |
| `N8N_DATA_TABLES_UPLOAD_MAX_FILE_SIZE_BYTES` | The maximum allowed file size (in bytes) for CSV uploads to data tables. If set, this is the hard limit for file uploads. If not set, the upload limit will be the remaining available storage space. | number | undefined |
| `N8N_DATA_TABLES_CLEANUP_INTERVAL_MS` | The interval in milliseconds at which orphaned uploaded files are cleaned up. Defaults to 60 seconds if not explicitly set via environment variable. | number | 60000 (60 * 1000) |
| `N8N_DATA_TABLES_FILE_MAX_AGE_MS` | The maximum age in milliseconds for uploaded files before they are considered orphaned and deleted. Files older than this threshold are removed during cleanup. Defaults to 2 minutes if not explicitly set via environment variable. | number | 120000 (2 * 60 * 1000) |## Database Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| DB_LOGGING_ENABLED | Whether database logging is enabled. | boolean | false |
| DB_LOGGING_OPTIONS | Database logging level. Requires `DB_LOGGING_MAX_EXECUTION_TIME` to be higher than `0`. | enum ('query', 'error', 'schema', 'warn', 'info', 'log', 'all') | 'error' |
| DB_LOGGING_MAX_EXECUTION_TIME | Only queries that exceed this time (ms) will be logged. Set `0` to disable. | number | 0 |
| DB_POSTGRESDB_SSL_ENABLED | Whether to enable SSL. If `DB_POSTGRESDB_SSL_CA`, `DB_POSTGRESDB_SSL_CERT`, or `DB_POSTGRESDB_SSL_KEY` are defined, `DB_POSTGRESDB_SSL_ENABLED` defaults to `true`. | boolean | false |
| DB_POSTGRESDB_SSL_CA | SSL certificate authority | string | '' |
| DB_POSTGRESDB_SSL_CERT | SSL certificate | string | '' |
| DB_POSTGRESDB_SSL_KEY | SSL key | string | '' |
| DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED | If unauthorized SSL connections should be rejected | boolean | true |
| DB_POSTGRESDB_DATABASE | Postgres database name | string | 'n8n' |
| DB_POSTGRESDB_HOST | Postgres database host | string | 'localhost' |
| DB_POSTGRESDB_PASSWORD | Postgres database password | string | '' |
| DB_POSTGRESDB_PORT | Postgres database port | number | 5432 |
| DB_POSTGRESDB_USER | Postgres database user | string | 'postgres' |
| DB_POSTGRESDB_SCHEMA | Postgres database schema | string | 'public' |
| DB_POSTGRESDB_POOL_SIZE | Postgres database pool size | number | 2 |
| DB_POSTGRESDB_CONNECTION_TIMEOUT | Postgres connection timeout (ms) | number | 20000 |
| DB_POSTGRESDB_IDLE_CONNECTION_TIMEOUT | Postgres idle connection timeout (ms) | number | 30000 |
| DB_MYSQLDB_DATABASE | MySQL database name | string | 'n8n' |
| DB_MYSQLDB_HOST | MySQL database host | string | 'localhost' |
| DB_MYSQLDB_PASSWORD | MySQL database password | string | '' |
| DB_MYSQLDB_PORT | MySQL database port | number | 3306 |
| DB_MYSQLDB_USER | MySQL database user | string | 'root' |
| DB_MYSQLDB_POOL_SIZE | MySQL connection pool size | number | 10 |
| DB_SQLITE_DATABASE | SQLite database file name | string | 'database.sqlite' |
| DB_SQLITE_POOL_SIZE | SQLite database pool size. Must be equal to or higher than `1`. | number | 3 |
| DB_SQLITE_ENABLE_WAL | Enable SQLite WAL mode. | boolean | this.poolSize > 1 |
| DB_SQLITE_VACUUM_ON_STARTUP | Run `VACUUM` on startup to rebuild the database, reducing file size and optimizing indexes. **Warning:** Long-running blocking operation that will increase startup time. | boolean | false |
| DB_TYPE | Type of database to use | enum ('sqlite', 'mariadb', 'mysqldb', 'postgresdb') | 'sqlite' |
| DB_TABLE_PREFIX | Prefix for table names | string | '' |
| DB_PING_INTERVAL_SECONDS | The interval in seconds to ping the database to check if the connection is still alive. | number | 2 |## Deployment Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_DEPLOYMENT_TYPE | Type of deployment | string | default |## Diagnostics Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_DIAGNOSTICS_POSTHOG_API_KEY | API key for PostHog. | string | phc_4URIAm1uYfJO7j8kWSe0J8lc8IqnstRLS7Jx8NcakHo |
| N8N_DIAGNOSTICS_POSTHOG_API_HOST | API host for PostHog. | string | https://us.i.posthog.com |
| N8N_DIAGNOSTICS_ENABLED | Whether diagnostics are enabled. | boolean | true |
| N8N_DIAGNOSTICS_CONFIG_FRONTEND | Diagnostics config for frontend. | string | 1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io |
| N8N_DIAGNOSTICS_CONFIG_BACKEND | Diagnostics config for backend. | string | 1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io |## Dynamic Banners Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_DYNAMIC_BANNERS_ENDPOINT | No description provided | string | https://api.n8n.io/api/banners |
| N8N_DYNAMIC_BANNERS_ENABLED | No description provided | boolean | true |## Endpoints Configuration Settings

### Prometheus Metrics Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_METRICS | Whether to enable the `/metrics` endpoint to expose Prometheus metrics. | boolean | false |
| N8N_METRICS_PREFIX | Prefix for Prometheus metric names. | string | n8n_ |
| N8N_METRICS_INCLUDE_DEFAULT_METRICS | Whether to expose system and Node.js metrics. See: https://www.npmjs.com/package/prom-client | boolean | true |
| N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL | Whether to include a label for workflow ID on workflow metrics. | boolean | false |
| N8N_METRICS_INCLUDE_NODE_TYPE_LABEL | Whether to include a label for node type on node metrics. | boolean | false |
| N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL | Whether to include a label for credential type on credential metrics. | boolean | false |
| N8N_METRICS_INCLUDE_API_ENDPOINTS | Whether to expose metrics for API endpoints. See: https://www.npmjs.com/package/express-prom-bundle | boolean | false |
| N8N_METRICS_INCLUDE_API_PATH_LABEL | Whether to include a label for the path of API endpoint calls. | boolean | false |
| N8N_METRICS_INCLUDE_API_METHOD_LABEL | Whether to include a label for the HTTP method of API endpoint calls. | boolean | false |
| N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL | Whether to include a label for the status code of API endpoint calls. | boolean | false |
| N8N_METRICS_INCLUDE_CACHE_METRICS | Whether to include metrics for cache hits and misses. | boolean | false |
| N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS | Whether to include metrics derived from n8n's internal events | boolean | false |
| N8N_METRICS_INCLUDE_QUEUE_METRICS | Whether to include metrics for jobs in scaling mode. Not supported in multi-main setup. | boolean | false |
| N8N_METRICS_QUEUE_METRICS_INTERVAL | How often (in seconds) to update queue metrics. | number | 20 |
| N8N_METRICS_ACTIVE_WORKFLOW_METRIC_INTERVAL | How often (in seconds) to update active workflow metric | number | 60 |
| N8N_METRICS_INCLUDE_WORKFLOW_NAME_LABEL | Whether to include a label for workflow name on workflow metrics. | boolean | false |
| N8N_METRICS_INCLUDE_WORKFLOW_STATISTICS | Whether to include workflow execution statistics as metrics. | boolean | false |
| N8N_METRICS_WORKFLOW_STATISTICS_INTERVAL | How often (in seconds) to update workflow statistics metrics. | number | 300 |

### Endpoints Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_PAYLOAD_SIZE_MAX | Max payload size in MiB | number | 16 |
| N8N_FORMDATA_FILE_SIZE_MAX | Max payload size for files in form-data webhook payloads in MiB | number | 200 |
| N8N_ENDPOINT_REST | Path segment for REST API endpoints. | string | rest |
| N8N_ENDPOINT_FORM | Path segment for form endpoints. | string | form |
| N8N_ENDPOINT_FORM_TEST | Path segment for test form endpoints. | string | form-test |
| N8N_ENDPOINT_FORM_WAIT | Path segment for waiting form endpoints. | string | form-waiting |
| N8N_ENDPOINT_WEBHOOK | Path segment for webhook endpoints. | string | webhook |
| N8N_ENDPOINT_WEBHOOK_TEST | Path segment for test webhook endpoints. | string | webhook-test |
| N8N_ENDPOINT_WEBHOOK_WAIT | Path segment for waiting webhook endpoints. | string | webhook-waiting |
| N8N_ENDPOINT_MCP | Path segment for MCP endpoints. | string | mcp |
| N8N_ENDPOINT_MCP_TEST | Path segment for test MCP endpoints. | string | mcp-test |
| N8N_DISABLE_UI | Whether to disable n8n's UI (frontend). | boolean | false |
| N8N_DISABLE_PRODUCTION_MAIN_PROCESS | Whether to disable production webhooks on the main process, when using webhook-specific processes. | boolean | false |
| N8N_ADDITIONAL_NON_UI_ROUTES | Colon-delimited list of additional endpoints to not open the UI on. | string | '' |## Event Bus Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT | of event log files to keep | number | 3 |
| N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB | Max size (in KB) of an event log file before a new one is started | number | 10240 |
| N8N_EVENTBUS_LOGWRITER_LOGBASENAME | Basename of event log file | string | n8nEventLog |
| N8N_EVENTBUS_CHECKUNSENTINTERVAL | How often (in ms) to check for unsent event messages. Can in rare cases cause a message to be sent twice. `0` to disable | number | 0 |
| N8N_EVENTBUS_RECOVERY_MODE | Whether to recover execution details after a crash or only mark status executions as crashed. Allowed values: 'simple', 'extensive' | RecoveryMode | extensive |## Executions Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL | How often (minutes) execution data should be hard-deleted. | number | 15 |
| EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL | How often (minutes) execution data should be soft-deleted. | number | 60 |
| N8N_CONCURRENCY_PRODUCTION_LIMIT | Max production executions allowed to run concurrently. `-1` means unlimited. Default for scaling mode is taken from the worker's `--concurrency` flag. | number | -1 |
| N8N_CONCURRENCY_EVALUATION_LIMIT | Max evaluation executions allowed to run concurrently. `-1` means unlimited. | number | -1 |
| N8N_EXECUTIONS_QUEUE_RECOVERY_INTERVAL | How often (minutes) to check for queue recovery. | number | 180 |
| N8N_EXECUTIONS_QUEUE_RECOVERY_BATCH | Size of batch of executions to check for queue recovery. | number | 100 |
| N8N_WORKFLOW_AUTODEACTIVATION_MAX_LAST_EXECUTIONS | Number of last executions to check when determining if a workflow should be deactivated when all of the last N executions have crashed. | number | 3 |
| N8N_WORKFLOW_AUTODEACTIVATION_ENABLED | Whether to automatically deactivate workflows that have all their last executions crashed. | boolean | false |
| EXECUTIONS_MODE | Whether to run executions in regular mode (in-process) or scaling mode (in workers). | ExecutionMode (enum: 'regular', 'queue') | 'regular' |
| EXECUTIONS_TIMEOUT | How long (seconds) a workflow execution may run for before timeout. On timeout, the execution will be forcefully stopped. `-1` for unlimited. Currently unlimited by default - this default will change in a future version. | number | -1 |
| EXECUTIONS_TIMEOUT_MAX | How long (seconds) a workflow execution may run for at most. | number | 3600 |
| EXECUTIONS_DATA_PRUNE | Whether to delete past executions on a rolling basis. | boolean | true |
| EXECUTIONS_DATA_MAX_AGE | How old (hours) a finished execution must be to qualify for soft-deletion. | number | 336 |
| EXECUTIONS_DATA_PRUNE_MAX_COUNT | Max number of finished executions to keep in database. Does not necessarily prune to the exact max number. `0` for unlimited. | number | 10000 |
| EXECUTIONS_DATA_HARD_DELETE_BUFFER | How old (hours) a finished execution must be to qualify for hard-deletion. This buffer by default excludes recent executions as the user may need them while building a workflow. | number | 1 |
| EXECUTIONS_DATA_SAVE_ON_ERROR | Whether to save execution data for failed production executions. This default can be overridden at a workflow level. | string (enum: 'all', 'none') | 'all' |
| EXECUTIONS_DATA_SAVE_ON_SUCCESS | Whether to save execution data for successful production executions. This default can be overridden at a workflow level. | string (enum: 'all', 'none') | 'all' |
| EXECUTIONS_DATA_SAVE_ON_PROGRESS | Whether to save execution data as each node executes. This default can be overridden at a workflow level. | boolean | false |
| EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS | Whether to save execution data for manual executions. This default can be overridden at a workflow level. | boolean | true |## External Hooks Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| EXTERNAL_HOOK_FILES | Files containing external hooks. Multiple files can be separated by colon (":") | ColonSeparatedStringArray | [] |## Generic Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `GENERIC_TIMEZONE` | Default timezone for the n8n instance. Can be overridden on a per-workflow basis. | string | America/New_York |
| `N8N_RELEASE_TYPE` | (No description provided. Allowed values: 'stable', 'beta', 'nightly', 'dev', 'rc') | ReleaseChannel (enum) | dev |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | Grace period (in seconds) to wait for components to shut down before process exit. | number | 30 |## Hiring Banner Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_HIRING_BANNER_ENABLED | Whether hiring banner in browser console is enabled. | boolean | true |## Instance Settings Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS | Whether to enforce that n8n settings file doesn't have overly wide permissions. If set to true, n8n will check the permissions of the settings file and attempt change them to 0600 (only owner has rw access) if they are too wide. | boolean | true |
| N8N_ENCRYPTION_KEY | Encryption key to use for encrypting and decrypting credentials. If none is provided, a random key will be generated and saved to the settings file on the first launch. Can be provided directly via N8N_ENCRYPTION_KEY or via a file path using N8N_ENCRYPTION_KEY_FILE. | string | '' |## N8N License Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_LICENSE_SERVER_URL | License server URL to retrieve license. | string | https://license.n8n.io/v1 |
| N8N_LICENSE_AUTO_RENEW_ENABLED | Whether autorenewal for licenses is enabled. | boolean | true |
| N8N_LICENSE_ACTIVATION_KEY | Activation key to initialize license. | string | '' |
| N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN | Whether floating entitlements should be returned to the pool on shutdown | boolean | true |
| N8N_LICENSE_TENANT_ID | Tenant ID used by the license manager SDK, e.g. for self-hosted, sandbox, embed, cloud. | number | 1 |
| N8N_LICENSE_CERT | Ephemeral license certificate. See: https://github.com/n8n-io/license-management?tab=readme-ov-file#concept-ephemeral-entitlements | string | '' |## Logging Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_LOG_CRON_ACTIVE_INTERVAL | Interval in minutes to log currently active cron jobs. Set to `0` to disable. | number | 0 |
| N8N_LOG_FILE_COUNT_MAX | Max number of log files to keep, or max number of days to keep logs for. Once the limit is reached, the oldest log files will be rotated out. If using days, append a `d` suffix. Only for `file` log output. | number | 100 |
| N8N_LOG_FILE_SIZE_MAX | Max size (in MiB) for each log file. Only for `file` log output. | number | 16 |
| N8N_LOG_FILE_LOCATION | Location of the log files inside `~/.n8n`. Only for `file` log output. | string | logs/n8n.log |
| N8N_LOG_LEVEL | Minimum level of logs to output. Logs with this or higher level will be output; logs with lower levels will not. Exception: `silent` disables all logging. | 'error' \| 'warn' \| 'info' \| 'debug' \| 'silent' | info |
| N8N_LOG_OUTPUT | Where to output logs to. Options are: `console` or `file` or both in a comma separated list. | CommaSeparatedStringArray<'console' \| 'file'> | ['console'] |
| N8N_LOG_FORMAT | What format the logs should have. `text` is only printing the human readable messages. `json` is printing one JSON object per line containing the message, level, timestamp and all the metadata. | 'text' \| 'json' | text |
| N8N_LOG_SCOPES | Scopes to filter logs by. Nothing is filtered by default. Supported log scopes: `concurrency`, `external-secrets`, `license`, `multi-main-setup`, `pruning`, `pubsub`, `push`, `redis`, `scaling`, `waiting-executions`, `task-runner-js`, `task-runner-py`, `workflow-activation`, `insights`, `chat-hub` | CommaSeparatedStringArray<LogScope> | [] |## MFA Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_MFA_ENABLED | Whether to enable multi-factor authentication. | boolean | true |## Multi Main Setup Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_MULTI_MAIN_SETUP_ENABLED | Whether to enable multi-main setup (if licensed) for scaling mode. | boolean | false |
| N8N_MULTI_MAIN_SETUP_KEY_TTL | Time to live (in seconds) for leader key in multi-main setup. | number | 10 |
| N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL | Interval (in seconds) for leader check in multi-main setup. | number | 3 |## Nodes Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `NODES_INCLUDE` | Node types to load. Includes all if unspecified. | JsonStringArray | `[]` |
| `NODES_EXCLUDE` | Node types not to load. Defaults to excluding `ExecuteCommand` and `LocalFileTrigger` for security. Set to an empty array to enable all node types. | JsonStringArray | `['n8n-nodes-base.executeCommand', 'n8n-nodes-base.localFileTrigger']` |
| `NODES_ERROR_TRIGGER_TYPE` | Node type to use as error trigger | string | `'n8n-nodes-base.errorTrigger'` |
| `N8N_PYTHON_ENABLED` | Whether to enable Python execution on the Code node. | boolean | `true` |## Personalization Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_PERSONALIZATION_ENABLED | No description provided | boolean | true |## Public API Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `N8N_PUBLIC_API_DISABLED` | Whether to disable the Public API | boolean | false |
| `N8N_PUBLIC_API_ENDPOINT` | Path segment for the Public API | string | api |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED` | Whether to disable the Swagger UI for the Public API | boolean | false |## Redis Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_REDIS_KEY_PREFIX | Prefix for all Redis keys managed by n8n. | string | n8n |## Task Runners Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_RUNNERS_ENABLED | Whether task runners are enabled | boolean | false |
| N8N_RUNNERS_MODE | Whether the task runner should run as a child process spawned by n8n (internal mode) or as a separate process launched outside n8n (external mode). | TaskRunnerMode (enum: 'internal', 'external') | 'internal' |
| N8N_RUNNERS_PATH | Endpoint which task runners connect to | string | '/runners' |
| N8N_RUNNERS_AUTH_TOKEN | Authentication token for task runners | string | '' |
| N8N_RUNNERS_BROKER_PORT | Port task runners broker should listen on | number | 5679 |
| N8N_RUNNERS_BROKER_LISTEN_ADDRESS | IP address task runners broker should listen on | string | '127.0.0.1' |
| N8N_RUNNERS_MAX_PAYLOAD | Maximum size of a payload sent to the runner in bytes | number | 1073741824 (1GB) |
| N8N_RUNNERS_MAX_OLD_SPACE_SIZE | The --max-old-space-size option to use for the runner (in MB). Default means node.js will determine it based on the available memory. | string | '' |
| N8N_RUNNERS_MAX_CONCURRENCY | How many concurrent tasks can a runner execute at a time | number | 10 |
| N8N_RUNNERS_TASK_TIMEOUT | How long (in seconds) a task is allowed to take for completion, else the task will be aborted. (In internal mode, the runner will also be restarted.) Must be greater than 0. | number | 300 |
| N8N_RUNNERS_TASK_REQUEST_TIMEOUT | How long (in seconds) a task request can wait for a runner to become available before timing out. This prevents workflows from hanging indefinitely when no runners are available. Must be greater than 0. | number | 60 |
| N8N_RUNNERS_HEARTBEAT_INTERVAL | How often (in seconds) the runner must send a heartbeat to the broker, else the task will be aborted. (In internal mode, the runner will also be restarted.) Must be greater than 0. | number | 30 |
| N8N_RUNNERS_INSECURE_MODE | Whether to disable all security measures in the task runner. **Discouraged for production use.** Set to `true` for compatibility with modules that rely on insecure JS features. | boolean | false |

**Note:** The `isNativePythonRunnerEnabled` property does not have an `@Env` decorator, so it is not included in the table as it's not configured via environment variable.## Scaling Mode Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `QUEUE_HEALTH_CHECK_ACTIVE` | Whether to enable the worker health check endpoints: `/healthz` (worker alive), `/healthz/readiness` (worker connected to migrated database and connected to Redis) | boolean | false |
| `QUEUE_HEALTH_CHECK_PORT` | Port for worker server to listen on. | number | 5678 |
| `N8N_WORKER_SERVER_ADDRESS` | IP address for worker server to listen on. | string | '::' |
| `QUEUE_BULL_REDIS_DB` | Redis database for Bull queue. | number | 0 |
| `QUEUE_BULL_REDIS_HOST` | Redis host for Bull queue. | string | 'localhost' |
| `QUEUE_BULL_REDIS_PASSWORD` | Password to authenticate with Redis. | string | '' |
| `QUEUE_BULL_REDIS_PORT` | Port for Redis to listen on. | number | 6379 |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Max cumulative timeout (in milliseconds) of connection retries before process exit. | number | 10000 |
| `QUEUE_BULL_REDIS_USERNAME` | Redis username. Redis 6.0 or higher required. | string | '' |
| `QUEUE_BULL_REDIS_CLUSTER_NODES` | Redis cluster startup nodes, as comma-separated list of `{host}:{port}` pairs. @example 'redis-1:6379,redis-2:6379' | string | '' |
| `QUEUE_BULL_REDIS_TLS` | Whether to enable TLS on Redis connections. | boolean | false |
| `QUEUE_BULL_REDIS_DUALSTACK` | Whether to enable dual-stack hostname resolution for Redis connections. | boolean | false |
| `QUEUE_WORKER_LOCK_DURATION` | How long (in milliseconds) is the lease period for a worker processing a job. | number | 60000 |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | How often (in milliseconds) a worker must renew the lease. | number | 10000 |
| `QUEUE_WORKER_STALLED_INTERVAL` | How often (in milliseconds) Bull must check for stalled jobs. `0` to disable. | number | 30000 |
| `QUEUE_BULL_PREFIX` | Prefix for Bull keys on Redis. @example 'bull:jobs:23' | string | 'bull' |
| `QUEUE_WORKER_TIMEOUT` | **@deprecated** How long (in seconds) a worker must wait for active executions to finish before exiting. Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead | number | 30 |## Security Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_RESTRICT_FILE_ACCESS_TO | Dirs that the `ReadWriteFile` and `ReadBinaryFiles` nodes are allowed to access. Separate multiple dirs with semicolon `;`. Set to an empty string to disable restrictions (insecure, not recommended for production). | string | ~/.n8n-files |
| N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES | Whether to block nodes from accessing files at dirs internally used by n8n: `~/.n8n`, `~/.cache/n8n/public`, and any dirs specified by `N8N_CONFIG_FILES`, `N8N_CUSTOM_EXTENSIONS`, `N8N_BINARY_DATA_STORAGE_PATH`, `N8N_UM_EMAIL_TEMPLATES_INVITE`, and `UM_EMAIL_TEMPLATES_PWRESET`. | boolean | true |
| N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW | In a security audit, how many days for a workflow to be considered abandoned if not executed. | number | 90 |
| N8N_CONTENT_SECURITY_POLICY | Set Content-Security-Policy headers as helmet.js nested directives object. Example: { "frame-ancestors": ["http://localhost:3000"] } | string | {} |
| N8N_CONTENT_SECURITY_POLICY_REPORT_ONLY | Whether to set the `Content-Security-Policy-Report-Only` header instead of `Content-Security-Policy`. | boolean | false |
| N8N_INSECURE_DISABLE_WEBHOOK_IFRAME_SANDBOX | Whether to disable HTML sandboxing for webhooks. The sandboxing mechanism uses CSP headers now, but the name is kept for backwards compatibility. | boolean | false |
| N8N_GIT_NODE_DISABLE_BARE_REPOS | Whether to disable bare repositories support in the Git node. | boolean | true |
| N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED | Whether to allow access to AWS system credentials, e.g. in awsAssumeRole credentials | boolean | false |
| N8N_GIT_NODE_ENABLE_HOOKS | Whether to enable hooks (like pre-commit hooks) for the Git node. | boolean | false |## Sentry Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `N8N_SENTRY_DSN` | Sentry DSN (data source name) for the backend. | string | `''` |
| `N8N_FRONTEND_SENTRY_DSN` | Sentry DSN (data source name) for the frontend. | string | `''` |
| `ENVIRONMENT` | Environment of the n8n instance. | string | `''` |
| `DEPLOYMENT_NAME` | Name of the deployment, e.g. cloud account name. | string | `''` |## SSO Configuration Settings

### SAML Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SSO_SAML_LOGIN_ENABLED | Whether to enable SAML SSO. | boolean | false |
| N8N_SSO_SAML_LOGIN_LABEL | | string | '' |

### OIDC Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SSO_OIDC_LOGIN_ENABLED | Whether to enable OIDC SSO. | boolean | false |

### LDAP Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SSO_LDAP_LOGIN_ENABLED | Whether to enable LDAP SSO. | boolean | false |
| N8N_SSO_LDAP_LOGIN_LABEL | | string | '' |

### Provisioning Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SSO_SCOPES_PROVISION_INSTANCE_ROLE | Whether to provision the instance role from an SSO auth claim | boolean | false |
| N8N_SSO_SCOPES_PROVISION_PROJECT_ROLES | Whether to provision the project <> role mappings from an SSO auth claim | boolean | false |
| N8N_SSO_SCOPES_NAME | The name of scope to request on oauth flows | string | 'n8n' |
| N8N_SSO_SCOPES_INSTANCE_ROLE_CLAIM_NAME | The name of the expected claim to be returned for provisioning instance role | string | 'n8n_instance_role' |
| N8N_SSO_SCOPES_PROJECTS_ROLES_CLAIM_NAME | The name of the expected claim to be returned for provisioning project <> role mappings | string | 'n8n_projects' |

### SSO General Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SSO_JUST_IN_TIME_PROVISIONING | Whether to create users when they log in via SSO. | boolean | true |
| N8N_SSO_REDIRECT_LOGIN_TO_SSO | Whether to redirect users from the login dialog to initialize SSO flow. | boolean | true |## Tags Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_WORKFLOW_TAGS_DISABLED | Disable workflow tags | boolean | false |## Templates Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `N8N_TEMPLATES_ENABLED` | Whether to load workflow templates. | boolean | `true` |
| `N8N_TEMPLATES_HOST` | Host to retrieve workflow templates from endpoints. | string | `'https://api.n8n.io/api/'` |## User Management Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_SMTP_USER | SMTP login username | string | '' |
| N8N_SMTP_PASS | SMTP login password | string | '' |
| N8N_SMTP_OAUTH_SERVICE_CLIENT | SMTP OAuth Service Client | string | '' |
| N8N_SMTP_OAUTH_PRIVATE_KEY | SMTP OAuth Private Key | string | '' |
| N8N_SMTP_HOST | SMTP server host | string | '' |
| N8N_SMTP_PORT | SMTP server port | number | 465 |
| N8N_SMTP_SSL | Whether to use SSL for SMTP | boolean | true |
| N8N_SMTP_STARTTLS | Whether to use STARTTLS for SMTP when SSL is disabled | boolean | true |
| N8N_SMTP_SENDER | How to display sender name | string | '' |
| N8N_UM_EMAIL_TEMPLATES_INVITE | Overrides default HTML template for inviting new people (use full path) | string | '' |
| N8N_UM_EMAIL_TEMPLATES_PWRESET | Overrides default HTML template for resetting password (use full path) | string | '' |
| N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED | Overrides default HTML template for notifying that a workflow was shared (use full path) | string | '' |
| N8N_UM_EMAIL_TEMPLATES_WORKFLOW_AUTODEACTIVATED | Overrides default HTML template for notifying that a workflow was deactivated (use full path) | string | '' |
| N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED | Overrides default HTML template for notifying that credentials were shared (use full path) | string | '' |
| N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED | Overrides default HTML template for notifying that credentials were shared (use full path) | string | '' |
| N8N_EMAIL_MODE | How to send emails (allowed values: '', 'smtp') | EmailMode | 'smtp' |
| N8N_USER_MANAGEMENT_JWT_SECRET | JWT secret to use. If unset, n8n will generate its own. | string | '' |
| N8N_USER_MANAGEMENT_JWT_DURATION_HOURS | How long (in hours) before the JWT expires. | number | 168 |
| N8N_INVITE_LINKS_EMAIL_ONLY | Security Control: Invite Link Exposure Prevention - When enabled, prevents exposure of invite URLs in API responses to users with 'user:create' permission, mitigating account takeover risks via invite link leakage (e.g., compromised admin accounts, network interception). | boolean | false |
| N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS | How long (in hours) before expiration to automatically refresh it. - `0` means 25% of `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. - `-1` means it will never refresh. This forces users to log back in after expiration. | number | 0 |## Version Notifications Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_VERSION_NOTIFICATIONS_ENABLED | Whether to request notifications about new n8n versions | boolean | true |
| N8N_VERSION_NOTIFICATIONS_ENDPOINT | Endpoint to retrieve n8n version information from | string | https://api.n8n.io/api/versions/ |
| N8N_VERSION_NOTIFICATIONS_WHATS_NEW_ENABLED | Whether to request What's New articles. Also requires `N8N_VERSION_NOTIFICATIONS_ENABLED` to be enabled | boolean | true |
| N8N_VERSION_NOTIFICATIONS_WHATS_NEW_ENDPOINT | Endpoint to retrieve "What's New" articles from | string | https://api.n8n.io/api/whats-new |
| N8N_VERSION_NOTIFICATIONS_INFO_URL | URL for versions panel to page instructing user on how to update n8n instance | string | https://docs.n8n.io/hosting/installation/updating/ |## Workflow History Configuration

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| N8N_WORKFLOW_HISTORY_PRUNE_TIME | Time (in hours) to keep workflow history versions for. `-1` means forever. | number | -1 |## Workflows Configuration Settings

| Variable | Description | Data type | Default value |
|----------|-------------|-----------|---------------|
| `WORKFLOWS_DEFAULT_NAME` | Default name for workflow | string | `'My workflow'` |
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | Default option for which workflows may call the current workflow | enum (`'any'`, `'none'`, `'workflowsFromAList'`, `'workflowsFromSameOwner'`) | `'workflowsFromSameOwner'` |
| `N8N_WORKFLOW_ACTIVATION_BATCH_SIZE` | How many workflows to activate simultaneously during startup | number | `1` |
| `N8N_WORKFLOWS_INDEXING_ENABLED` | Whether to enable workflow dependency indexing | boolean | `false` |