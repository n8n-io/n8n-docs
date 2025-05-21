| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_DEFAULT_NAME` | String | My credentials | Default name for credentials |
| `CREDENTIALS_OVERWRITE_DATA` | String | {} | Prefilled data ("overwrite") in credential types. End users cannot view or change this data. Format: { CREDENTIAL_NAME: { PARAMETER: VALUE }} |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String |  | Internal API endpoint to fetch overwritten credential types from. |
| `DB_LOGGING_ENABLED` | Boolean | false | Whether database logging is enabled. |
| `DB_LOGGING_MAX_EXECUTION_TIME` | Number | 0 | Only queries that exceed this time (ms) will be logged. Set `0` to disable. |
| `DB_LOGGING_OPTIONS` | Enum | error | Database logging level. Requires `DB_LOGGING_MAX_EXECUTION_TIME` to be higher than `0`. |
| `DB_MYSQLDB_DATABASE` | String | n8n |  |
| `DB_MYSQLDB_HOST` | String | localhost | MySQL database host |
| `DB_MYSQLDB_PASSWORD` | String |  | MySQL database password |
| `DB_MYSQLDB_PORT` | Number | 3306 | MySQL database port |
| `DB_MYSQLDB_USER` | String | root | MySQL database user |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | Number | 20000 | Postgres connection timeout (ms) |
| `DB_POSTGRESDB_DATABASE` | String | n8n | Postgres database name |
| `DB_POSTGRESDB_HOST` | String | localhost | Postgres database host |
| `DB_POSTGRESDB_PASSWORD` | String |  | Postgres database password |
| `DB_POSTGRESDB_POOL_SIZE` | Number | 2 | Postgres database pool size |
| `DB_POSTGRESDB_PORT` | Number | 5432 | Postgres database port |
| `DB_POSTGRESDB_SCHEMA` | String | public | Postgres database schema |
| `DB_POSTGRESDB_SSL_CA` | String |  | SSL certificate authority |
| `DB_POSTGRESDB_SSL_CERT` | String |  | SSL certificate |
| `DB_POSTGRESDB_SSL_ENABLED` | Boolean | false | Whether to enable SSL. If `DB_POSTGRESDB_SSL_CA`, `DB_POSTGRESDB_SSL_CERT`, or `DB_POSTGRESDB_SSL_KEY` are defined, `DB_POSTGRESDB_SSL_ENABLED` defaults to `true`. |
| `DB_POSTGRESDB_SSL_KEY` | String |  | SSL key |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Boolean | true | If unauthorized SSL connections should be rejected |
| `DB_POSTGRESDB_USER` | String | postgres | Postgres database user |
| `DB_SQLITE_DATABASE` | String | database.sqlite | SQLite database file name |
| `DB_SQLITE_ENABLE_WAL` | Boolean | this.poolSize > 1 | Enable SQLite WAL mode. |
| `DB_SQLITE_POOL_SIZE` | Number | 0 | SQLite database pool size. Set to `0` to disable pooling. |
| `DB_SQLITE_VACUUM_ON_STARTUP` | Boolean | false | Run `VACUUM` on startup to rebuild the database, reducing file size and optimizing indexes. |
| `DB_TABLE_PREFIX` | String |  | Prefix for table names |
| `DB_TYPE` | Enum | sqlite | Type of database to use |
| `DEPLOYMENT_NAME` | String |  | Name of the deployment, e.g. cloud account name. |
| `ENVIRONMENT` | String |  | Environment of the n8n instance. |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | Number | 1 | How old (hours) a finished execution must be to qualify for hard-deletion. This buffer by default excludes recent executions as the user may need them while building a workflow. |
| `EXECUTIONS_DATA_MAX_AGE` | Number | 336 | How old (hours) a finished execution must be to qualify for soft-deletion. |
| `EXECUTIONS_DATA_PRUNE` | Boolean | true | Whether to delete past executions on a rolling basis. |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | Number | 15 | How often (minutes) execution data should be hard-deleted. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | Number | 10000 | Max number of finished executions to keep in database. Does not necessarily prune to the exact max number. `0` for unlimited. |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | Number | 60 | How often (minutes) execution data should be soft-deleted. |
| `EXTERNAL_HOOK_FILES` | String | [] | Files containing external hooks. Multiple files can be separated by colon (":") |
| `GENERIC_TIMEZONE` | String | America/New_York | Default timezone for the n8n instance. Can be overridden on a per-workflow basis. |
| `N8N_ADDITIONAL_NON_UI_ROUTES` | String |  | Colon-delimited list of additional endpoints to not open the UI on. |
| `N8N_AI_ASSISTANT_BASE_URL` | String |  | Base URL of the AI assistant service |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | Boolean | true | Whether to block access to all files at: - the ".n8n" directory, - the static cache dir at ~/.cache/n8n/public, and - user-defined config files. |
| `N8N_CACHE_BACKEND` | Enum | auto | Backend to use for caching. |
| `N8N_CACHE_MEMORY_MAX_SIZE` | Number | 3 * 1024 * 1024 | Max size of memory cache in bytes |
| `N8N_CACHE_MEMORY_TTL` | Number | 3600 * 1000 | Time to live (in milliseconds) for data cached in memory. |
| `N8N_CACHE_REDIS_KEY_PREFIX` | String | cache | Prefix for cache keys in Redis. |
| `N8N_CACHE_REDIS_TTL` | Number | 3600 * 1000 | Time to live (in milliseconds) for data cached in Redis. 0 for no TTL. |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | Boolean | true | Whether to enable community packages |
| `N8N_COMMUNITY_PACKAGES_PREVENT_LOADING` | Boolean | false | Whether to load community packages |
| `N8N_COMMUNITY_PACKAGES_REGISTRY` | String | https://registry.npmjs.org | NPM registry URL to pull community packages from |
| `N8N_CONTENT_SECURITY_POLICY` | String | {} | Set [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers as [helmet.js](https://helmetjs.github.io/#content-security-policy) nested directives object. Example: { "frame-ancestors": ["http://localhost:3000"] } |
| `N8N_DEFAULT_BINARY_DATA_MODE` | Enum | default | Storage mode for binary data. |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | String | 1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io | Diagnostics config for backend. |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND` | String | 1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io | Diagnostics config for frontend. |
| `N8N_DIAGNOSTICS_ENABLED` | Boolean | true | Whether diagnostics are enabled. |
| `N8N_DIAGNOSTICS_POSTHOG_API_HOST` | String | https://ph.n8n.io | API host for PostHog. |
| `N8N_DIAGNOSTICS_POSTHOG_API_KEY` | String | phc_4URIAm1uYfJO7j8kWSe0J8lc8IqnstRLS7Jx8NcakHo | API key for PostHog. |
| `N8N_DISABLED_MODULES` | String | [] | Comma-separated list of all disabled modules |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Boolean | false | Whether to disable production webhooks on the main process, when using webhook-specific processes. |
| `N8N_DISABLE_UI` | Boolean | false | Whether to disable n8n's UI (frontend). |
| `N8N_EMAIL_MODE` | Enum | smtp | How to send emails |
| `N8N_ENABLED_MODULES` | String | [] | Comma-separated list of all modules enabled |
| `N8N_ENDPOINT_FORM` | String | form | Path segment for form endpoints. |
| `N8N_ENDPOINT_FORM_TEST` | String | form-test | Path segment for test form endpoints. |
| `N8N_ENDPOINT_FORM_WAIT` | String | form-waiting | Path segment for waiting form endpoints. |
| `N8N_ENDPOINT_MCP` | String | mcp | Path segment for MCP endpoints. |
| `N8N_ENDPOINT_MCP_TEST` | String | mcp-test | Path segment for test MCP endpoints. |
| `N8N_ENDPOINT_REST` | String | rest | Path segment for REST API endpoints. |
| `N8N_ENDPOINT_WEBHOOK` | String | webhook | Path segment for webhook endpoints. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | String | webhook-test | Path segment for test webhook endpoints. |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | String | webhook-waiting | Path segment for waiting webhook endpoints. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Boolean | false | Whether to enforce that n8n settings file doesn't have overly wide permissions. If set to true, n8n will check the permissions of the settings file and attempt change them to 0600 (only owner has rw access) if they are too wide. |
| `N8N_EVENTBUS_CHECKUNSENTINTERVAL` | Number | 0 | How often (in ms) to check for unsent event messages. Can in rare cases cause a message to be sent twice. `0` to disable |
| `N8N_EVENTBUS_LOGWRITER_LOGBASENAME` | String | n8nEventLog | Basename of event log file |
| `N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB` | Number | 10240 | Max size (in KB) of an event log file before a new one is started |
| `N8N_EVENTBUS_RECOVERY_MODE` | Enum | extensive | Whether to recover execution details after a crash or only mark status executions as crashed. |
| `N8N_EXTERNAL_SECRETS_PREFER_GET` | Boolean | false | Whether to prefer GET over LIST when fetching secrets from Hashicorp Vault |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | 300 | How often (in seconds) to check for secret updates |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY` | String |  | Access key in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET` | String |  | Access secret in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` | Boolean | false | Use automatic credential detection to authenticate S3 calls for external storage This will ignore accessKey/accessSecret and use the default credential provider chain https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME` | String |  | Name of the n8n bucket in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` | String |  | Region of the n8n bucket in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_HOST` | String |  | Host of the object-store bucket in S3-compatible external storage |
| `N8N_FORMDATA_FILE_SIZE_MAX` | Number | 200 | Max payload size for files in form-data webhook payloads in MiB |
| `N8N_FRONTEND_SENTRY_DSN` | String |  | Sentry DSN (data source name) for the frontend. |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | Number | 30 | Grace period (in seconds) to wait for components to shut down before process exit. |
| `N8N_HOST` | String | localhost | Host name n8n can be reached |
| `N8N_INSIGHTS_COMPACTION_BATCH_SIZE` | Number | 500 | The number of raw insights data to compact in a single batch. Default: 500 |
| `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180 | The max age in days of daily insights data to compact. Default: 180 |
| `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90 | The max age in days of hourly insights data to compact. Default: 90 |
| `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES` | Number | 60 | The interval in minutes at which the insights data should be compacted. Default: 60 |
| `N8N_INSIGHTS_FLUSH_BATCH_SIZE` | Number | 1000 | The maximum number of insights data to keep in the buffer before flushing. Default: 1000 |
| `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS` | Number | 30 | The interval in seconds at which the insights data should be flushed to the database. Default: 30 |
| `N8N_INSIGHTS_MAX_AGE_DAYS` | Number | -1 | How old (days) insights data must be to qualify for regular deletion Default: -1 (no pruning) |
| `N8N_INSIGHTS_PRUNE_CHECK_INTERVAL_HOURS` | Number | 24 | How often (hours) insights data will be checked for regular deletion. Default: 24 |
| `N8N_LICENSE_ACTIVATION_KEY` | String |  | Activation key to initialize license. |
| `N8N_LICENSE_AUTO_RENEW_ENABLED` | Boolean | true | Whether autorenewal for licenses is enabled. |
| `N8N_LICENSE_CERT` | String |  | Ephemeral license certificate. See: https://github.com/n8n-io/license-management?tab=readme-ov-file#concept-ephemeral-entitlements |
| `N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN` | Boolean | true | Whether floating entitlements should be returned to the pool on shutdown |
| `N8N_LICENSE_SERVER_URL` | String | https://license.n8n.io/v1 | License server URL to retrieve license. |
| `N8N_LICENSE_TENANT_ID` | Number | 1 | Tenant ID used by the license manager SDK, e.g. for self-hosted, sandbox, embed, cloud. |
| `N8N_LISTEN_ADDRESS` | String | 0.0.0.0 | IP address n8n should listen on |
| `N8N_LOG_FILE_COUNT_MAX` | Number | 100 | Max number of log files to keep, or max number of days to keep logs for. Once the limit is reached, the oldest log files will be rotated out. If using days, append a `d` suffix. Only for `file` log output. |
| `N8N_LOG_FILE_LOCATION` | String | logs/n8n.log | Location of the log files inside `~/.n8n`. Only for `file` log output. |
| `N8N_LOG_FILE_SIZE_MAX` | Number | 16 | Max size (in MiB) for each log file. Only for `file` log output. |
| `N8N_LOG_LEVEL` | Enum | info | Minimum level of logs to output. Logs with this or higher level will be output; logs with lower levels will not. Exception: `silent` disables all logging. |
| `N8N_LOG_OUTPUT` | String | ['console'] | Where to output logs to. Options are: `console` or `file` or both in a comma separated list. |
| `N8N_LOG_SCOPES` | String | [] | Scopes to filter logs by. Nothing is filtered by default.  Supported log scopes:  - `concurrency` - `external-secrets` - `license` - `multi-main-setup` - `pruning` - `pubsub` - `push` - `redis` - `scaling` - `waiting-executions` - `task-runner` - `workflow-activation` - `insights` |
| `N8N_METRICS` | Boolean | false | Whether to enable the `/metrics` endpoint to expose Prometheus metrics. |
| `N8N_METRICS_ACTIVE_WORKFLOW_METRIC_INTERVAL` | Number | 60 | How often (in seconds) to update active workflow metric |
| `N8N_METRICS_INCLUDE_API_ENDPOINTS` | Boolean | false | Whether to expose metrics for API endpoints. See: https://www.npmjs.com/package/express-prom-bundle |
| `N8N_METRICS_INCLUDE_API_METHOD_LABEL` | Boolean | false | Whether to include a label for the HTTP method of API endpoint calls. |
| `N8N_METRICS_INCLUDE_API_PATH_LABEL` | Boolean | false | Whether to include a label for the path of API endpoint calls. |
| `N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL` | Boolean | false | Whether to include a label for the status code of API endpoint calls. |
| `N8N_METRICS_INCLUDE_CACHE_METRICS` | Boolean | false | Whether to include metrics for cache hits and misses. |
| `N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL` | Boolean | false | Whether to include a label for credential type on credential metrics. |
| `N8N_METRICS_INCLUDE_DEFAULT_METRICS` | Boolean | true | Whether to expose system and Node.js metrics. See: https://www.npmjs.com/package/prom-client |
| `N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS` | Boolean | false | Whether to include metrics derived from n8n's internal events |
| `N8N_METRICS_INCLUDE_NODE_TYPE_LABEL` | Boolean | false | Whether to include a label for node type on node metrics. |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | Boolean | false | Whether to include metrics for jobs in scaling mode. Not supported in multi-main setup. |
| `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` | Boolean | false | Whether to include a label for workflow ID on workflow metrics. |
| `N8N_METRICS_PREFIX` | String | n8n_ | Prefix for Prometheus metric names. |
| `N8N_METRICS_QUEUE_METRICS_INTERVAL` | Number | 20 | How often (in seconds) to update queue metrics. |
| `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL` | Number | 3 | Interval (in seconds) for leader check in multi-main setup. |
| `N8N_MULTI_MAIN_SETUP_ENABLED` | Boolean | false | Whether to enable multi-main setup (if licensed) for scaling mode. |
| `N8N_MULTI_MAIN_SETUP_KEY_TTL` | Number | 10 | Time to live (in seconds) for leader key in multi-main setup. |
| `N8N_PARTIAL_EXECUTION_VERSION_DEFAULT` | Number | 2 | Partial execution logic version to use by default. |
| `N8N_PATH` | String | / | Path n8n is deployed to |
| `N8N_PAYLOAD_SIZE_MAX` | Number | 16 | Max payload size in MiB |
| `N8N_PORT` | Number | 5678 | HTTP port n8n can be reached |
| `N8N_PROTOCOL` | Enum | http | HTTP Protocol via which n8n can be reached |
| `N8N_PUBLIC_API_DISABLED` | Boolean | false | Whether to disable the Public API |
| `N8N_PUBLIC_API_ENDPOINT` | String | api | Path segment for the Public API |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED` | Boolean | false | Whether to disable the Swagger UI for the Public API |
| `N8N_PUSH_BACKEND` | String | websocket | Backend to use for push notifications |
| `N8N_REINSTALL_MISSING_PACKAGES` | Boolean | false | Whether to reinstall any missing community packages |
| `N8N_RESTRICT_FILE_ACCESS_TO` | String |  | Which directories to limit n8n's access to. Separate multiple dirs with semicolon `;`. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | String | 127.0.0.1 | IP address task runners broker should listen on |
| `N8N_RUNNERS_BROKER_PORT` | Number | 5679 | IP address task runners broker should listen on |
| `N8N_RUNNERS_HEARTBEAT_INTERVAL` | Number | 30 | How often (in seconds) the runner must send a heartbeat to the broker, else the task will be aborted. (In internal mode, the runner will also  be restarted.) Must be greater than 0. |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Number | 10 | How many concurrent tasks can a runner execute at a time  Kept high for backwards compatibility - n8n v2 will reduce this to `5` |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE` | String |  | The --max-old-space-size option to use for the runner (in MB). Default means node.js will determine it based on the available memory. |
| `N8N_RUNNERS_MAX_PAYLOAD` | Number | 1024 * 1024 * 1024 | Maximum size of a payload sent to the runner in bytes, Default 1G |
| `N8N_RUNNERS_MODE` | Enum | internal | Whether the task runner should run as a child process spawned by n8n (internal mode) or as a separate process launched outside n8n (external mode). |
| `N8N_RUNNERS_PATH` | String | /runners | Endpoint which task runners connect to |
| `N8N_RUNNERS_TASK_TIMEOUT` | Number | 300 | How long (in seconds) a task is allowed to take for completion, else the task will be aborted. (In internal mode, the runner will also be restarted.) Must be greater than 0.  Kept high for backwards compatibility - n8n v2 will reduce this to `60` |
| `N8N_SAMESITE_COOKIE` | Enum | lax | This sets the `Samesite` flag on n8n auth cookie |
| `N8N_SECURE_COOKIE` | Boolean | true | This sets the `Secure` flag on n8n auth cookie |
| `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number | 90 | In a [security audit](https://docs.n8n.io/hosting/securing/security-audit/), how many days for a workflow to be considered abandoned if not executed. |
| `N8N_SENTRY_DSN` | String |  | Sentry DSN (data source name) for the backend. |
| `N8N_SMTP_HOST` | String |  | SMTP server host |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | String |  | SMTP OAuth Private Key |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | String |  | SMTP OAuth Service Client |
| `N8N_SMTP_PASS` | String |  | SMTP login password |
| `N8N_SMTP_PORT` | Number | 465 | SMTP server port |
| `N8N_SMTP_SENDER` | String |  | How to display sender name |
| `N8N_SMTP_SSL` | Boolean | true | Whether to use SSL for SMTP |
| `N8N_SMTP_STARTTLS` | Boolean | true | Whether to use STARTTLS for SMTP when SSL is disabled |
| `N8N_SMTP_USER` | String |  | SMTP login username |
| `N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE` | String | ed25519 | Default SSH key type to use when generating SSH keys. |
| `N8N_TEMPLATES_ENABLED` | Boolean | true | Whether to load workflow templates. |
| `N8N_TEMPLATES_HOST` | String | https://api.n8n.io/api/ | Host to retrieve workflow templates from endpoints. |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String |  | Overrides default HTML template for notifying that credentials were shared (use full path) |
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | String |  | Overrides default HTML template for inviting new people (use full path) |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | String |  | Overrides default HTML template for resetting password (use full path) |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String |  | Overrides default HTML template for notifying that a workflow was shared (use full path) |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | Boolean | true | Whether to block installation of not verified packages |
| `N8N_VERIFIED_PACKAGES_ENABLED` | Boolean | true | Whether to enable and show search suggestion of packages verified by n8n |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | Boolean | true | Whether to request notifications about new n8n versions |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | String | https://api.n8n.io/api/versions/ | Endpoint to retrieve n8n version information from |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | String | https://docs.n8n.io/hosting/installation/updating/ | URL for versions panel to page instructing user on how to update n8n instance |
| `N8N_WORKER_SERVER_ADDRESS` | String | 0.0.0.0 | IP address for worker server to listen on. |
| `N8N_WORKFLOW_ACTIVATION_BATCH_SIZE` | Number | 1 | How many workflows to activate simultaneously during startup. |
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | Enum | workflowsFromSameOwner | Default option for which workflows may call the current workflow |
| `N8N_WORKFLOW_HISTORY_ENABLED` | Boolean | true | Whether to save workflow history versions. |
| `N8N_WORKFLOW_HISTORY_PRUNE_TIME` | Number | -1 | Time (in hours) to keep workflow history versions for. `-1` means forever. |
| `NODES_ERROR_TRIGGER_TYPE` | String | n8n-nodes-base.errorTrigger | Node type to use as error trigger |
| `NODES_EXCLUDE` | String | [] | Node types not to load. Excludes none if unspecified. |
| `NODES_INCLUDE` | String | [] | Node types to load. Includes all if unspecified. |
| `QUEUE_BULL_PREFIX` | String | bull | Prefix for Bull keys on Redis. |
| `QUEUE_BULL_REDIS_CLUSTER_NODES` | String |  | Redis cluster startup nodes, as comma-separated list of `{host}:{port}` pairs. |
| `QUEUE_BULL_REDIS_DB` | Number | 0 | Redis database for Bull queue. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Boolean | false | Whether to enable dual-stack hostname resolution for Redis connections. |
| `QUEUE_BULL_REDIS_HOST` | String | localhost | Redis host for Bull queue. |
| `QUEUE_BULL_REDIS_PASSWORD` | String |  | Password to authenticate with Redis. |
| `QUEUE_BULL_REDIS_PORT` | Number | 6379 | Port for Redis to listen on. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Number | 10000 | Max cumulative timeout (in milliseconds) of connection retries before process exit. |
| `QUEUE_BULL_REDIS_TLS` | Boolean | false | Whether to enable TLS on Redis connections. |
| `QUEUE_BULL_REDIS_USERNAME` | String |  | Redis username. Redis 6.0 or higher required. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Boolean | false | Whether to enable the worker health check endpoints: - `/healthz` (worker alive) - `/healthz/readiness` (worker connected to migrated database and connected to Redis) |
| `QUEUE_HEALTH_CHECK_PORT` | Number | 5678 | Port for worker server to listen on. |
| `QUEUE_WORKER_LOCK_DURATION` | Number | 30000 | How long (in milliseconds) is the lease period for a worker processing a job. |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | Number | 15000 | How often (in milliseconds) a worker must renew the lease. |
| `QUEUE_WORKER_MAX_STALLED_COUNT` | Number | 1 | Max number of times a stalled job will be re-processed. See Bull's [documentation](https://docs.bullmq.io/guide/workers/stalled-jobs). |
| `QUEUE_WORKER_STALLED_INTERVAL` | Number | 30000 | How often (in milliseconds) Bull must check for stalled jobs. `0` to disable. |
| `QUEUE_WORKER_TIMEOUT` | Number | 30 |  |
| `WORKFLOWS_DEFAULT_NAME` | String | My workflow | Default name for workflow |
