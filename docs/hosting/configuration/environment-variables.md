---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Environment Variables
description: An overview of configuration environment variables for self-hosted n8n. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Environment variables

This page lists of environment variables that you can use to change n8n's configuration settings when self-hosting n8n.

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods.md) for n8n. You can also append `_FILE` to certain variables to [provide their configuration in a separate file](/hosting/configuration/configuration-methods.md#keeping-sensitive-data-in-separate-files).
///

Environment variables are organized into the following sections:

* [Binary data](#binary-data)
* [Credentials](#credentials)
* [Databases](#databases)
	* [PostgreSQL](#postgresql)
	* [SQLite](#sqlite)
* [Deployment](#deployment)
* [Endpoints](#endpoints)
* [Executions](#executions)
* [External data storage](#external-data-storage)
* [External hooks](#external-hooks)
* [External secrets](#external-secrets)
* [Insights](#insights)
* [Licenses](#licenses)
* [Logs](#logs)
	* [n8n logs](#n8n-logs)
	* [Log streaming](#log-streaming)
* [Nodes](#nodes)
* [Queue mode](#queue-mode)
	* [Multi-main setup](#multi-main-setup)
* [Security](#security)
* [Source control](#source-control)
* [Task runners](#task-runners)
	* [n8n instance](#n8n-instance)
	* [Task runner](#task-runner)
	* [Task runner launcher](#task-runner-launcher)
* [Timezone and localization](#timezone-and-localization)
* [User management, SMTP, and two-factor authentication](#user-management-smtp-and-two-factor-authentication)
* [Workflows](#workflows)

## Binary data

By default, n8n uses memory to store binary data. Enterprise users can choose to use an external service instead. Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data. 


| Variable                          | Type   | Default                      | Description                                                                                                                                                                                                                                                                                                                                                                      |
|:----------------------------------|:-------|:-----------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_AVAILABLE_BINARY_DATA_MODES` | String | `filesystem`                 | A comma separated list of available binary data modes.                                                                                                                                                                                                                                                                                                                           |
| `N8N_BINARY_DATA_STORAGE_PATH`    | String | `N8N_USER_FOLDER/binaryData` | The path where n8n stores binary data.                                                                                                                                                                                                                                                                                                                                           |
| `N8N_DEFAULT_BINARY_DATA_MODE`    | String | `default`                    | The default binary data mode. `default` keeps binary data in memory. Set to `filesystem` to use the filesystem, or `s3` to AWS S3. Note that binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. This may change in future. |


## Credentials

Enable credential overwrites using the following environment variables. Refer to [Credential overwrites](/embed/configuration.md#credential-overwrites) for details.

| Variable                                 | Type   | Default          | Description                            |
|:-----------------------------------------|:-------|:-----------------|:---------------------------------------|
| `CREDENTIALS_DEFAULT_NAME`               | String | `My credentials` | The default name for credentials.      |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | *      | -                | Overwrites for credentials.            |
| `CREDENTIALS_OVERWRITE_ENDPOINT`         | String | -                | The API endpoint to fetch credentials. |


## Databases

By default, n8n uses SQLite. n8n also supports PostgreSQL. n8n [removed support for MySQL and MariaDB](/1-0-migration-checklist.md#mysql-and-mariadb) in v1.0.

This section outlines environment variables to configure your chosen database for your self-hosted n8n instance.

| Variable              | Type                                    | Default  | Description                    |
|:----------------------|:----------------------------------------|:---------|:-------------------------------|
| `DB_TABLE_PREFIX`     | *                                       | -        | Prefix to use for table names. |
| `DB_TYPE`<br>/`_FILE` | Enum string:<br> `sqlite`, `postgresdb` | `sqlite` | The database to use.           |

### PostgreSQL

| Variable                                            | Type    | Default     | Description                                                                                                                                                              |
|:----------------------------------------------------|:--------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DB_POSTGRESDB_CONNECTION_TIMEOUT`<br>/`_FILE`      | Number  | `20000`     | Postgres connection timeout (ms).
| `DB_POSTGRESDB_DATABASE`<br>/`_FILE`                | String  | `n8n`       | The name of the PostgreSQL database.                                                                                                                                     |
| `DB_POSTGRESDB_HOST`<br>/`_FILE`                    | String  | `localhost` | The PostgreSQL host.                                                                                                                                                     |
| `DB_POSTGRESDB_PASSWORD`<br>/`_FILE`                | String  | -           | The PostgreSQL password.                                                                                                                                                 |
| `DB_POSTGRESDB_POOL_SIZE`<br>/`_FILE`               | Number  | `2`         | Control how many parallel open Postgres connections n8n should have. Increasing it may help with resource utilization, but too many connections may degrade performance. |
| `DB_POSTGRESDB_PORT`<br>/`_FILE`                    | Number  | `5432`      | The PostgreSQL port.                                                                                                                                                     |
| `DB_POSTGRESDB_USER`<br>/`_FILE`                    | String  | `postgres`  | The PostgreSQL user.                                                                                                                                                     |
| `DB_POSTGRESDB_SCHEMA`<br>/`_FILE`                  | String  | `public`    | The PostgreSQL schema.                                                                                                                                                   |
| `DB_POSTGRESDB_SSL_CA`<br>/`_FILE`                  | String  | -           | The PostgreSQL SSL certificate authority.                                                                                                                                |
| `DB_POSTGRESDB_SSL_CERT`<br>/`_FILE`                | String  | -           | The PostgreSQL SSL certificate.                                                                                                                                          |
| `DB_POSTGRESDB_SSL_ENABLED`<br>/`_FILE`             | Boolean | `false`     | Whether to enable SSL. Automatically enabled if `DB_POSTGRESDB_SSL_CA`, `DB_POSTGRESDB_SSL_CERT` or `DB_POSTGRESDB_SSL_KEY` is defined.                                  |
| `DB_POSTGRESDB_SSL_KEY`<br>/`_FILE`                 | String  | -           | The PostgreSQL SSL key.                                                                                                                                                  |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`<br>/`_FILE` | Boolean | `true`      | If n8n should reject unauthorized SSL connections (true) or not (false).                                                                                                 |

### SQLite

| Variable                      | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
|:------------------------------|:--------|:--------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DB_SQLITE_POOL_SIZE`         | Number  | `0`     | Controls whether to open the SQLite file in [WAL mode](https://www.sqlite.org/wal.html) or [rollback journal mode](https://www.sqlite.org/lockingv3.html#rollback). Uses rollback journal mode when set to zero. When greater than zero, uses WAL mode with the value determining the number of parallel SQL read connections to configure. WAL mode is much more performant and reliable than the rollback journal mode. |
| `DB_SQLITE_VACUUM_ON_STARTUP` | Boolean | `false` | Runs [VACUUM](https://www.sqlite.org/lang_vacuum.html){:target="_blank" .external-link} operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time.                                                                                                                                                                                     |


## Deployment

This section lists the deployment configuration options for your self-hosted n8n instance, including setting up access URLs, enabling templates, customizing encryption, and configuring server details. 

| Variable                             | Type                         | Default                                                          | Description                                                                                                                                                                                                                                                                  |
|:-------------------------------------|:-----------------------------|:-----------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_CONFIG_FILES`                   | String                       | -                                                                | Use to provide the path to any JSON [configuration file](/hosting/configuration/configuration-methods.md).                                                                                                                                                                   |
| `N8N_DEV_RELOAD`                     | Boolean                      | `false`                                                          | When working on the n8n source code, set this to `true` to automatically reload or restart the application when changes occur in the source code files.                                                                                                                      |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND`     | String                       | `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch`  | Telemetry configuration for the backend.                                                                                                                                                                                                                                     |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND`    | String                       | `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io`           | Telemetry configuration for the frontend.                                                                                                                                                                                                                                    |
| `N8N_DIAGNOSTICS_ENABLED`            | Boolean                      | `true`                                                           | Whether to share selected, anonymous [telemetry](/privacy-security/privacy.md) with n8n. Note that if you set this to `false`, you can't enable Ask AI in the Code node.                                                                                                     |
| `N8N_DISABLE_UI`                     | Boolean                      | `false`                                                          | Set to `true` to disable the UI.                                                                                                                                                                                                                                             |
| `N8N_EDITOR_BASE_URL`                | String                       | -                                                                | Public URL where users can access the editor. Also used for emails sent from n8n and the redirect URL for SAML based authentication.                                                                                                                                         |
| `N8N_ENCRYPTION_KEY`                 | String                       | Random key generated by n8n                                      | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch.                                                                                                                                                 |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT`      | Number                       | `30`                                                             | How long should the n8n process wait (in seconds) for components to shut down before exiting the process.                                                                                                                                                                    |
| `N8N_HIRING_BANNER_ENABLED`          | Boolean                      | `true`                                                           | Whether to show the n8n hiring banner in the console (true) or not (false).                                                                                                                                                                                                  |
| `N8N_HOST`                           | String                       | `localhost`                                                      | Host name n8n runs on.                                                                                                                                                                                                                                                       |
| `N8N_LISTEN_ADDRESS`                 | String                       | `0.0.0.0`                                                        | The IP address n8n should listen on.                                                                                                                                                                                                                                         |
| `N8N_PATH`                           | String                       | `/`                                                              | The path n8n deploys to.                                                                                                                                                                                                                                                     |
| `N8N_PERSONALIZATION_ENABLED`        | Boolean                      | `true`                                                           | Whether to ask users personalisation questions and then customise n8n accordingly.                                                                                                                                                                                           |
| `N8N_PORT`                           | Number                       | `5678`                                                           | The HTTP port n8n runs on.                                                                                                                                                                                                                                                   |
| `N8N_PREVIEW_MODE`                   | Boolean                      | `false`                                                          | Set to `true` to run in preview mode.                                                                                                                                                                                                                                        |
| `N8N_PROTOCOL`                       | Enum string: `http`, `https` | `http`                                                           | The protocol used to reach n8n.                                                                                                                                                                                                                                              |
| `N8N_PROXY_HOPS`                     | Number                       | 0                                                                | Number of reverse-proxies n8n is running behind.                                                                                                                                                                                                                             |
| `N8N_PUBLIC_API_DISABLED`            | Boolean                      | `false`                                                          | Whether to disable the public API (true) or not (false).                                                                                                                                                                                                                     |
| `N8N_PUBLIC_API_ENDPOINT`            | String                       | `api`                                                            | Path for the public API endpoints.                                                                                                                                                                                                                                           |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED`  | Boolean                      | `false`                                                          | Whether the Swagger UI (API playground) is disabled (true) or not (false).                                                                                                                                                                                                   |
| `N8N_PUSH_BACKEND`                   | String                       | `websocket`                                                      | Choose whether the n8n backend uses server-sent events (`sse`) or WebSockets (`websocket`) to send changes to the UI.                                                                                                                                                        |
| `N8N_REINSTALL_MISSING_PACKAGES`     | Boolean                      | `false`                                                          | If set to `true`, n8n will automatically attempt to reinstall any missing packages.                                                                                                                                                                                          |
| `N8N_SSL_CERT`                       | String                       | -                                                                | The SSL certificate for HTTPS protocol.                                                                                                                                                                                                                                      |
| `N8N_SSL_KEY`                        | String                       | -                                                                | The SSL key for HTTPS protocol.                                                                                                                                                                                                                                              |
| `N8N_TEMPLATES_ENABLED`              | Boolean                      | `false`                                                          | Enables [workflow templates](/glossary.md#template-n8n) (true) or disable (false).                                                                                                                                                                                           |
| `N8N_TEMPLATES_HOST`                 | String                       | `https://api.n8n.io`                                             | Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](/workflows/templates.md) for more information. |
| `N8N_TUNNEL_SUBDOMAIN`               | String                       | -                                                                | Specifies the subdomain for the n8n tunnel. If not set, n8n generates a random subdomain.                                                                                                                                                                                    |
| `N8N_USER_FOLDER`                    | String                       | `user-folder`                                                    | Provide the path where n8n will create the `.n8n` folder. This directory stores user-specific data, such as database file and encryption key.                                                                                                                                |
| `N8N_VERSION_NOTIFICATIONS_ENABLED`  | Boolean                      | `true`                                                           | When enabled, n8n sends notifications of new versions and security updates.                                                                                                                                                                                                  |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | String                       | `https://api.n8n.io/versions/`                                   | The endpoint to retrieve where version information.                                                                                                                                                                                                                          |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | String                       | `https://docs.n8n.io/getting-started/installation/updating.html` | The URL displayed in the New Versions panel for more information.                                                                                                                                                                                                            |
| `VUE_APP_URL_BASE_API`               | String                       | `http://localhost:5678/`                                         | Used when building the `n8n-editor-ui` package manually to set how the frontend can reach the backend API. Refer to [Configure the Base URL](/hosting/configuration/configuration-examples/base-url.md).                                                              |


## Endpoints

This section lists environment variables for customizing endpoints in n8n.

| Variable                                        | Type    | Default           | Description                                                                                                                                                                  |
|:------------------------------------------------|:--------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS`           | Boolean | `false`           | Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes.                                 |
| `N8N_ENDPOINT_REST`                             | String  | `rest`            | The path used for REST endpoint.                                                                                                                                             |
| `N8N_ENDPOINT_WEBHOOK`                          | String  | `webhook`         | The path used for webhook endpoint.                                                                                                                                          |
| `N8N_ENDPOINT_WEBHOOK_TEST`                     | String  | `webhook-test`    | The path used for test-webhook endpoint.                                                                                                                                     |
| `N8N_ENDPOINT_WEBHOOK_WAIT`                     | String  | `webhook-waiting` | The path used for waiting-webhook endpoint.                                                                                                                                  |
| `N8N_FORMDATA_FILE_SIZE_MAX`                    | Number  | `200`             | Max payload size for files in form-data webhook payloads in MiB.                                                                                                             |
| `N8N_METRICS`                                   | Boolean | `false`           | Whether to enable the `/metrics` endpoint.                                                                                                                                   |
| `N8N_METRICS_INCLUDE_API_ENDPOINTS`             | Boolean | `false`           | Whether to expose metrics for API endpoints.                                                                                                                                 |
| `N8N_METRICS_INCLUDE_API_METHOD_LABEL`          | Boolean | `false`           | Whether to include a label for the HTTP method (GET, POST, ...) of API invocations.                                                                                          |
| `N8N_METRICS_INCLUDE_API_PATH_LABEL`            | Boolean | `false`           | Whether to include a label for the path of API invocations.                                                                                                                  |
| `N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL`     | Boolean | `false`           | Whether to include a label for the HTTP status code (200, 404, ...) of API invocations.                                                                                      |
| `N8N_METRICS_INCLUDE_CACHE_METRICS`             | Boolean | false             | Whether to include metrics (true) for cache hits and misses, or not include them (false).                                                                                    |
| `N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL`     | Boolean | `false`           | Whether to include a label for the credential type on credential metrics.                                                                                                    |
| `N8N_METRICS_INCLUDE_DEFAULT_METRICS`           | Boolean | `true`            | Whether to expose default system and node.js metrics.                                                                                                                        |
| `N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS` | Boolean | `false`           | Whether to include metrics (true) for events, or not include them (false).                                                                                                   |
| `N8N_METRICS_INCLUDE_NODE_TYPE_LABEL`           | Boolean | `false`           | Whether to include a label for the node type on node metrics.                                                                                                                |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS`             | Boolean | `false`           | Whether to include metrics for jobs in scaling mode. Not supported in multi-main setup.                                                                                      |
| `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL`         | Boolean | `false`           | Whether to include a label for the workflow ID on workflow metrics.                                                                                                          |
| `N8N_METRICS_PREFIX`                            | String  | `n8n_`            | Optional prefix for n8n specific metrics names.                                                                                                                              |
| `N8N_METRICS_QUEUE_METRICS_INTERVAL`            | Integer | `20`              | How often (in seconds) to update queue metrics.                                                                                                                              |
| `N8N_PAYLOAD_SIZE_MAX`                          | Number  | `16`              | The maximum payload size in MiB.                                                                                                                                             |
| `WEBHOOK_URL`                                   | String  | -                 | Used to manually provide the Webhook URL when running n8n behind a reverse proxy. See [here](/hosting/configuration/configuration-examples/webhook-url.md) for more details. |


## Executions

This section lists environment variables to configure workflow execution settings.

| Variable                                     | Type                            | Default   | Description                                                                                                                                                                                                                                                     |
|:---------------------------------------------|:--------------------------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER`         | Number                          | `1`       | How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow.                                                                              |
| `EXECUTIONS_DATA_MAX_AGE`                    | Number                          | `336`     | The execution age (in hours) before it's deleted.                                                                                                                                                                                                               |
| `EXECUTIONS_DATA_PRUNE`                      | Boolean                         | `true`    | Whether to delete data of past executions on a rolling basis.                                                                                                                                                                                                   |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | Number                          | `15`      | How often (minutes) execution data should be hard-deleted.                                                                                                                                                                                                      |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | Number                          | `60`      | How often (minutes) execution data should be soft-deleted.                                                                                                                                                                                                      |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT`            | Number                          | `10000`   | Maximum number of executions to keep in the database. 0 = no limit                                                                                                                                                                                              |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS`     | Boolean                         | `true`    | Whether to save data of executions when started manually.                                                                                                                                                                                                       |
| `EXECUTIONS_DATA_SAVE_ON_ERROR`              | Enum string: `all`, `none`      | `all`     | Whether n8n saves execution data on error.                                                                                                                                                                                                                      |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS`           | Boolean                         | `false`   | Whether to save progress for each node executed (true) or not (false).                                                                                                                                                                                          |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS`            | Enum string: `all`, `none`      | `all`     | Whether n8n saves execution data on success.                                                                                                                                                                                                                    |
| `EXECUTIONS_MODE`                            | Enum string: `regular`, `queue` | `regular` | Whether executions should run directly or using queue.<br><br>Refer to [Queue mode](/hosting/scaling/queue-mode.md) for more details.                                                                                                                           |
| `EXECUTIONS_TIMEOUT`                         | Number                          | `-1`      | Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in `EXECUTIONS_TIMEOUT_MAX`. Set `EXECUTIONS_TIMEOUT` to `-1` to disable. |
| `EXECUTIONS_TIMEOUT_MAX`                     | Number                          | `3600`    | The maximum execution time (in seconds) that users can set for an individual workflow.                                                                                                                                                                          |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT`           | Number                          | `-1`      | Max production executions allowed to run concurrently, in both regular and scaling modes. `-1` to disable in regular mode.                                                                                                                                      |


## External data storage

Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data.

| Variable                                   | Type    | Default | Description                                                                                                                                                                                                                                                                                     |
|:-------------------------------------------|:--------|:--------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY`       | String  | -       | Access key in S3-compatible external storage                                                                                                                                                                                                                                                    |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET`    | String  | -       | Access secret in S3-compatible external storage.                                                                                                                                                                                                                                                |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME`      | String  | -       | Name of the n8n bucket in S3-compatible external storage.                                                                                                                                                                                                                                       |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION`    | String  | -       | Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`                                                                                                                                                                                                            |
| `N8N_EXTERNAL_STORAGE_S3_HOST`             | String  | -       | Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com`                                                                                                                                                                                             |
| `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` | Boolean | -       | Use automatic credential detection to authenticate S3 calls for external storage. This will ignore the access key and access secret and use the default [credential provider chain](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain). |


## External hooks

You can define external hooks that n8n executes whenever a specific operation runs. Refer to [Backend hooks](/embed/configuration.md#backend-hooks) for examples of available hooks and [Hook files](/embed/configuration.md#backend-hook-files) for information on file formatting. 

| Variable                       | Type   | Description                                                                                                |
|:-------------------------------|:-------|:-----------------------------------------------------------------------------------------------------------|
| `EXTERNAL_FRONTEND_HOOKS_URLS` | String | URLs to files containing frontend external hooks. Provide multiple URLs as a colon-separated list ("`:`"). |
| `EXTERNAL_HOOK_FILES`          | String | Files containing backend external hooks. Provide multiple files as a colon-separated list ("`:`").         |


## External secrets

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](/external-secrets.md) for details.

| Variable                               | Type   | Default           | Description                                         |
|:---------------------------------------|:-------|:------------------|:----------------------------------------------------|
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |

## Insights

Insights gives instance owners and admins visibility into how workflows perform over time. Refer to [Insights](/insights.md) for details.

| Variable                                                 | Type   | Default | Description                                                                             |
|:---------------------------------------------------------|:-------|:--------|:----------------------------------------------------------------------------------------|
| `N8N_DISABLED_MODULES`                                   | String | -       | Set to `insights` to disable the feature and metrics collection for an instance.        |
| `N8N_INSIGHTS_COMPACTION_BATCH_SIZE`                     | Number | 500     | The number of raw insights data to compact in a single batch.                           |
| `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180     | The maximum age (in days) of daily insights data to compact.                            |
| `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90      | The maximum age (in days) of hourly insights data to compact.                           |
| `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES`               | Number | 60      | Interval (in minutes) at which compaction should run.                                   |
| `N8N_INSIGHTS_FLUSH_BATCH_SIZE`                          | Number | 1000    | The maximum number of insights data to keep in the buffer before flushing.              |
| `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS`                    | Number | 30      | The interval (in seconds) at which the insights data should be flushed to the database. |

## Licenses

To enable certain licensed features, you must first activate your license. You can do this either through the UI or by setting environment variables. For more information, see [license key](/license-key.md).

| Variable                                  | Type    | Default                        | Description                                                                                                                                                                                                                                                                                                                 |
|:------------------------------------------|:--------|:-------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `https_proxy_license_server`              | String  | `https://user:pass@proxy:port` | Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase.                                                                                                                                                                                                                          |
| `N8N_HIDE_USAGE_PAGE`                     | boolean | `false`                        | Hide the usage and plans page in the app.                                                                                                                                                                                                                                                                                   |
| `N8N_LICENSE_ACTIVATION_KEY`              | String  | `''`                           | Activation key to initialize license. Not applicable if the n8n instance was already activated.                                                                                                                                                                                                                             |
| `N8N_LICENSE_AUTO_RENEW_ENABLED`          | Boolean | `true`                         | Enables (true) or disables (false) autorenewal for licenses. <br>If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable all licensed features.                                                  |
| `N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN` | Boolean | `true`                         | Controls whether the instance releases [floating entitlements](/glossary.md#entitlement-n8n) back to the pool upon shutdown. Set to `true` to allow other instances to reuse the entitlements, or `false` to retain them. <br> For production instances that must always keep their licensed features, set this to `false`. |
| `N8N_LICENSE_SERVER_URL`                  | String  | `http://license.n8n.io/v1`     | Server URL to retrieve license.                                                                                                                                                                                                                                                                                             |
| `N8N_LICENSE_TENANT_ID`                   | Number  | `1`                            | Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n.                                                                                                                                                                                                                              |

## Logs

This section lists environment variables to set up logging for debugging. Refer to [Logging in n8n](/hosting/logging-monitoring/logging.md) for details. 

### n8n logs

<!-- vale off -->
| Variable                        | Type                                                           | Default                             | Description                                                                                                                                                                                             |
|:--------------------------------|:---------------------------------------------------------------|:------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CODE_ENABLE_STDOUT`            | Boolean                                                        | `false`                             | Set to `true` to send Code node logs to process's stdout for debugging, monitoring, or logging purposes.                                                                                                |
| `DB_LOGGING_ENABLED`            | Boolean                                                        | `false`                             | Whether to enable database-specific logging.                                                                                                                                                            |
| `DB_LOGGING_MAX_EXECUTION_TIME` | Number                                                         | `1000`                              | Maximum execution time (in milliseconds) before n8n logs a warning. Set to `0` to disable long running query warning.                                                                                   |
| `DB_LOGGING_OPTIONS`            | Enum string: `query`, `error`, `schema`, `warn`, `info`, `log` | `error`                             | Database log output level. To enable all logging, specify `all`. Refer to [TypeORM logging options](https://orkhan.gitbook.io/typeorm/docs/logging#logging-options){:target=_blank .external-link} |
| `N8N_LOG_FILE_COUNT_MAX`        | Number                                                         | `100`                               | Max number of log files to keep.                                                                                                                                                                        |
| `N8N_LOG_FILE_LOCATION`         | String                                                         | `<n8n-directory-path>/logs/n8n.log` | Log file location. Requires N8N_LOG_OUTPUT set to `file`.                                                                                                                                               |
| `N8N_LOG_FILE_SIZE_MAX`         | Number                                                         | `16`                                | Max size of each log file in MB.                                                                                                                                                                        |
| `N8N_LOG_LEVEL`                 | Enum string: `info`, `warn`, `error`, `debug`                  | `info`                              | Log output level. Refer to [Log levels](/hosting/logging-monitoring/logging.md#log-levels) for details.                                                                                                 |
| `N8N_LOG_OUTPUT`                | Enum string: `console`, `file`                                 | `console`                           | Where to output logs. Provide multiple values as a comma-separated list.                                                                                                                                |
| `NO_COLOR`                      | any                                                            | `undefined`                         | Set to any value to output logs without ANSI colors. For more information, see the [no-color.org website](https://no-color.org/){:target=_blank .external-link}.                                        |
<!-- vale on -->

### Log streaming

Refer to [Log streaming](/log-streaming.md) for more information on this feature.

| Variable                                 | Type    | Default       | Description                                                                                                                     |
|:-----------------------------------------|:--------|:--------------|:--------------------------------------------------------------------------------------------------------------------------------|
| `N8N_EVENTBUS_CHECKUNSENTINTERVAL`       | Number  | `0`           | How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to `0` to disable it. |
| `N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT`    | Number  | `3`           | Number of event log files to keep.                                                                                              |
| `N8N_EVENTBUS_LOGWRITER_LOGBASENAME`     | String  | `n8nEventLog` | Basename of the event log file.                                                                                                 |
| `N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB` | Number  | `10240`       | Maximum size (in kilo-bytes) of an event log file before a new one starts.                                                      |
| `N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS`  | Boolean | `false`       | Whether all file access happens synchronously within the thread (true) or not (false).                                          |

## Nodes

This section lists the environment variables configuration options for managing [nodes](/glossary.md#node-n8n) in n8n, including specifying which nodes to load or exclude, importing built-in or external modules in the Code node, and enabling community nodes.

| Variable                                 | Type             | Default                       | Description                                                                                                                                                                                                               |
|:-----------------------------------------|:-----------------|:------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NODE_FUNCTION_ALLOW_BUILTIN`            | String           | -                             | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default.                                                                                         |
| `NODE_FUNCTION_ALLOW_EXTERNAL`           | String           | -                             | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default.                                                                                   |
| `NODES_EXCLUDE`                          | Array of strings | -                             | Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: `NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"`            |
| `NODES_INCLUDE`                          | Array of strings | -                             | Specify which nodes to load.                                                                                                                                                                                              |
| `NODES_ERROR_TRIGGER_TYPE`               | String           | `n8n-nodes-base.errorTrigger` | Specify which node type to use as Error Trigger.                                                                                                                                                                          |
| `N8N_COMMUNITY_PACKAGES_ENABLED`         | Boolean          | `true`                        | Enables (true) or disables (false) the functionality to install and load community nodes. If set to false, neither verified nor unverified community packages will be available, regardless of their individual settings. |
| `N8N_COMMUNITY_PACKAGES_PREVENT_LOADING` | Boolean          | `false`                       | Prevents (true) or allows (false) loading installed community nodes on instance startup. Use this if a faulty node prevents the instance from starting.                                                                   |
| `N8N_COMMUNITY_PACKAGES_REGISTRY`        | String           | `https://registry.npmjs.org`  | NPM registry URL to pull community packages from (license required).                                                                                                                                                      |
| `N8N_CUSTOM_EXTENSIONS`                  | String           | -                             | Specify the path to directories containing your custom nodes.                                                                                                                                                             |
| `N8N_UNVERIFIED_PACKAGES_ENABLED`        | Boolean          | `true`                        | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to enable the installation and use of unverified community nodes from an NPM registry (true) or not (false).                                |
| `N8N_VERIFIED_PACKAGES_ENABLED`          | Boolean          | `true`                        | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to show verified community nodes in the nodes panel for installation and use (true) or to hide them (false).                                |

## Queue mode

You can run n8n in different modes depending on your needs. Queue mode provides the best scalability. Refer to [Queue mode](/hosting/scaling/queue-mode.md) for more information.

| Variable                                | Type    | Default     | Description                                                                                                                                                                                                                                                                                                                                           |
|:----------------------------------------|:--------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `QUEUE_BULL_PREFIX`                     | String  | -           | Prefix to use for all queue keys.                                                                                                                                                                                                                                                                                                                     |
| `QUEUE_BULL_REDIS_CLUSTER_NODES`        | String  | -           | Expects a comma-separated list of Redis Cluster nodes in the format `host:port`, for the Redis client to initially connect to. If running in queue mode (`EXECUTIONS_MODE = queue`), setting this variable will create a Redis Cluster client instead of a Redis client, and n8n will ignore `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`. |
| `QUEUE_BULL_REDIS_DUALSTACK`            | Boolean | `false`     | Enable dual-stack support (IPv4 and IPv6) on Redis connections.                                                                                                                                                                                                                                                                                       |
| `QUEUE_BULL_REDIS_DB`                   | Number  | `0`         | The Redis database used.                                                                                                                                                                                                                                                                                                                              |
| `QUEUE_BULL_REDIS_HOST`                 | String  | `localhost` | The Redis host.                                                                                                                                                                                                                                                                                                                                       |
| `QUEUE_BULL_REDIS_PASSWORD`             | String  | -           | The Redis password.                                                                                                                                                                                                                                                                                                                                   |
| `QUEUE_BULL_REDIS_PORT`                 | Number  | `6379`      | The Redis port used.                                                                                                                                                                                                                                                                                                                                  |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD`    | Number  | `10000`     | The Redis timeout threshold (in ms).                                                                                                                                                                                                                                                                                                                  |
| `QUEUE_BULL_REDIS_TLS`                  | Boolean | `false`     | Enable TLS on Redis connections.                                                                                                                                                                                                                                                                                                                      |
| `QUEUE_BULL_REDIS_USERNAME`             | String  | -           | The Redis username (needs Redis version 6 or above). Don't define it for Redis < 6 compatibility                                                                                                                                                                                                                                                      |
| `QUEUE_WORKER_TIMEOUT` (**deprecated**) | Number  | `30`        | **Deprecated** Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead.<br/><br/>How long should n8n wait (seconds) for running executions before exiting worker process on shutdown.                                                                                                                                                                             |
| `QUEUE_HEALTH_CHECK_ACTIVE`             | Boolean | `false`     | Whether to enable health checks (true) or disable (false).                                                                                                                                                                                                                                                                                            |
| `QUEUE_HEALTH_CHECK_PORT`               | Number  | -           | The port to serve health checks on.                                                                                                                                                                                                                                                                                                                   |
| `QUEUE_WORKER_LOCK_DURATION`            | Number  | `30000`     | How long (in ms) is the lease period for a worker to work on a message.                                                                                                                                                                                                                                                                               |
| `QUEUE_WORKER_LOCK_RENEW_TIME`          | Number  | `15000`     | How frequently (in ms) should a worker renew the lease time.                                                                                                                                                                                                                                                                                          |
| `QUEUE_WORKER_MAX_STALLED_COUNT`        | Number  | `1`         | Maximum amount of times a stalled job will be re-processed.                                                                                                                                                                                                                                                                                           |
| `QUEUE_WORKER_STALLED_INTERVAL`         | Number  | `30000`     | How often should a worker check for stalled jobs (use 0 for never).                                                                                                                                                                                                                                                                                   |

### Multi-main setup

Refer to [Configuring multi-main setup](/hosting/scaling/queue-mode.md#configuring-multi-main-setup) for details.

| Variable                              | Type    | Default | Description                                                           |
|:--------------------------------------|:--------|:--------|:----------------------------------------------------------------------|
| `N8N_MULTI_MAIN_SETUP_ENABLED`        | Boolean | `false` | Whether to enable multi-main setup for queue mode (license required). |
| `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL` | Number  | `3`     | Interval (in seconds) for leader check in multi-main setup.           |
| `N8N_MULTI_MAIN_SETUP_KEY_TTL`        | Number  | `10`    | Time to live (in seconds) for leader key in multi-main setup.         |


## Security

 | Variable                                     | Type                                 | Default | Description                                                                                                                                                                                                                                                                                                                                |
 |:---------------------------------------------|:-------------------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | `N8N_BLOCK_ENV_ACCESS_IN_NODE`               | Boolean                              | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true).                                                                                                                                                                                                                            |
 | `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES`         | Boolean                              | `true`  | Set to `true` to block access to all files in the `.n8n` directory and user defined configuration files.                                                                                                                                                                                                                              |
 | `N8N_RESTRICT_FILE_ACCESS_TO`                | String                               |         | Limits access to files in these directories. Provide multiple files as a colon-separated list ("`:`").                                                                                                                                                                                                                                     |
 | `N8N_SAMESITE_COOKIE`                        | Enum string: `strict`, `lax`, `none` | `lax`   | Controls cross-site cookie behavior ([learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)):<ul><li>`strict`: Sent only for first-party requests.</li><li>`lax` (default): Sent with top-level navigation requests.</li><li>`none`: Sent in all contexts (requires HTTPS).</li></ul> |
 | `N8N_SECURE_COOKIE`                          | Boolean                              | `true`  | Ensures that cookies are only sent over HTTPS, enhancing security.                                                                                                                                                                                                                                                                         |
 | `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number                               | 90      | Number of days to consider a workflow abandoned if it's not executed.                                                                                                                                                                                                                                                                      |


## Source control

n8n uses Git-based source control to support environments. Refer to [Source control and environments](/source-control-environments/setup.md) for more information on how to link a Git repository to an n8n instance and configure your source control.

| Variable                                 | Type   | Default   | Description                                                                                                          |
|:-----------------------------------------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------|
| `N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE` | String | `ed25519` | Set to `rsa` to make RSA the default SSH key type for [Source control setup](/source-control-environments/setup.md). |


## Task runners

[Task runners](/hosting/configuration/task-runners.md) execute code defined by the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

### n8n instance

| Variable                            | Type                                | Default         | Description                                                                                                                                                                    |
|:------------------------------------|:------------------------------------|:----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_RUNNERS_AUTH_TOKEN`            | String                              | Random string   | Shared secret used by a task runner to authenticate to n8n. Required when using `external` mode.                                                                               |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | String                              | `127.0.0.1`     | Address the task broker listens on.                                                                                                                                            |
| `N8N_RUNNERS_BROKER_PORT`           | Number                              | `5679`          | Port the task broker listens on for task runner connections.                                                                                                                   |
| `N8N_RUNNERS_ENABLED`               | Boolean                             | `false`         | Are task runners enabled.                                                                                                                                                      |
| `N8N_RUNNERS_HEARTBEAT_INTERVAL`    | Number                              | `30`            | How often (in seconds) the runner must send a heartbeat to the broker, else the task aborts and the runner restarts. Must be greater than 0.                                   |
| `N8N_RUNNERS_MAX_CONCURRENCY`       | Number                              | `5`             | The number of concurrent tasks a task runner can execute at a time.                                                                                                            |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE`    | String                              |                 | The `--max-old-space-size` option to use for a task runner (in MB). By default, Node.js will set this based on available memory.                                               |
| `N8N_RUNNERS_MAX_PAYLOAD`           | Number                              | `1 073 741 824` | Maximum payload size in bytes for communication between a task broker and a task runner.                                                                                       |
| `N8N_RUNNERS_MODE`                  | Enum string: `internal`, `external` | `internal`      | How to launch and run the task runner. `internal` means n8n will launch a task runner as child process. `external` means an external orchestrator will launch the task runner. |
| `N8N_RUNNERS_TASK_TIMEOUT`          | Number                              | `60`            | How long (in seconds) a task can take to complete before the task aborts and the runner restarts. Must be greater than 0.                                                      |


### Task runner launcher

| Variable                                 | Type                                          | Default                 | Description                                                                              |
|:-----------------------------------------|:----------------------------------------------|:------------------------|:-----------------------------------------------------------------------------------------|
| `N8N_RUNNERS_AUTH_TOKEN`                 | String                                        | -                       | Shared secret used to authenticate to n8n.                                               |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT`      | Number                                        | `15`                    | The number of seconds to wait before shutting down an idle runner.                       |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Number                                        | `5680`                  | Port for the launcher's health check server.                                             |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL`         | Enum string: `debug`, `info`, `warn`, `error` | `info`                  | Which log messages to show.                                                              |
| `N8N_RUNNERS_MAX_CONCURRENCY`            | Number                                        | `5`                     | The number of concurrent tasks a task runner can execute at a time.                      |
| `N8N_RUNNERS_MAX_PAYLOAD`                | Number                                        | `1 073 741 824`         | Maximum payload size in bytes for communication between a task broker and a task runner. |
| `N8N_RUNNERS_TASK_BROKER_URI`            | String                                        | `http://127.0.0.1:5679` | The URI of the task broker server (n8n instance).                                        |
| `NODE_OPTIONS`                           | String                                        | -                       | [Options](https://nodejs.org/api/cli.html#node_optionsoptions) for Node.js.              |


### Task runner

| Variable                                 | Type    | Default                 | Description                                                                                                                                                                                                          |
|:-----------------------------------------|:--------|:------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GENERIC_TIMEZONE`                       | *       | `America/New_York`      | The [same default timezone as configured for the n8n instance](/hosting/configuration/environment-variables.md#timezone-and-localization).                                                                           |
| `N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION`   | Boolean | `false`                 | Whether to allow prototype mutation for external libraries. Set to `true` to allow modules that rely on runtime prototype mutation (for example, [`puppeteer`](https://pptr.dev/)) at the cost of relaxing security. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT`      | Number  | `15`                    | The number of seconds to wait before shutting down an idle runner.                                                                                                                                                   |
| `N8N_RUNNERS_GRANT_TOKEN`                | String  | Random string           | Token the runner uses to authenticate with the task broker. This is automatically provided by the launcher.                                                                                                          |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Number  | `5680`                  | Port for the launcher's health check server.                                                                                                                                                                         |
| `N8N_RUNNERS_MAX_CONCURRENCY`            | Number  | `5`                     | The number of concurrent tasks a task runner can execute at a time.                                                                                                                                                  |
| `N8N_RUNNERS_MAX_PAYLOAD`                | Number  | `1 073 741 824`         | Maximum payload size in bytes for communication between a task broker and a task runner.                                                                                                                             |
| `N8N_RUNNERS_TASK_BROKER_URI`            | String  | `http://127.0.0.1:5679` | The URI of the task broker server (n8n instance).                                                                                                                                                                    |
| `NODE_FUNCTION_ALLOW_BUILTIN`            | String  | -                       | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default.                                                                                    |
| `NODE_FUNCTION_ALLOW_EXTERNAL`           | String  | -                       | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default.                                                                              |


## Timezone and localization

| Variable             | Type   | Default            | Description                                                                                                                                                                                                                                                                                                                                                                                             |
|:---------------------|:-------|:-------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GENERIC_TIMEZONE`   | *      | `America/New_York` | The n8n instance timezone. Important for schedule nodes (such as Cron).                                                                                                                                                                                                                                                                                                                                 |
| `N8N_DEFAULT_LOCALE` | String | `en`               | A locale identifier, compatible with the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language){:target="_blank" .external-link}. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings. |


## User management SMTP and two-factor authentication

Refer to [User management](/hosting/configuration/user-management-self-hosted.md) for more information on setting up user management and emails.

<!-- vale off -->
| Variable                                        | Type    | Default | Description                                                                                                                                                                                                                                                          |
|:------------------------------------------------|:--------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_EMAIL_MODE`                                | String  | `smtp`  | Enable emails.                                                                                                                                                                                                                                                       |
| `N8N_MFA_ENABLED`                               | Boolean | `true`  | Whether to enable two-factor authentication (true) or disable (false). n8n ignores this if existing users have 2FA enabled.                                                                                                                                          |
| `N8N_SMTP_HOST`                                 | String  | -       | _your_SMTP_server_name_                                                                                                                                                                                                                                              |
| `N8N_SMTP_OAUTH_PRIVATE_KEY`                    | String  | -       | If using 2LO with a service account this is your private key                                                                                                                                                                                                         |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT`                 | String  | -       | If using 2LO with a service account this is your client ID                                                                                                                                                                                                           |
| `N8N_SMTP_PASS`                                 | String  | -       | _your_SMTP_password_                                                                                                                                                                                                                                                 |
| `N8N_SMTP_PORT`                                 | Number  | -       | _your_SMTP_server_port_                                                                                                                                                                                                                                              |
| `N8N_SMTP_SENDER`                               | String  | -       | Sender email address. You can optionally include the sender name. Example with name: _N8N `<contact@n8n.com>`_                                                                                                                                                       |
| `N8N_SMTP_SSL`                                  | Boolean | `true`  | Whether to use SSL for SMTP (true) or not (false).                                                                                                                                                                                                                   |
| `N8N_SMTP_STARTTLS`                             | Boolean | `true`  | Whether to use STARTTLS for SMTP (true) or not (false).                                                                                                                                                                                                              |
| `N8N_SMTP_USER`                                 | String  | -       | _your_SMTP_username_                                                                                                                                                                                                                                                 |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED`     | String  | -       | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template.                                                                                                                                         |
| `N8N_UM_EMAIL_TEMPLATES_INVITE`                 | String  | -       | Full path to your HTML email template. This overrides the default template for invite emails.                                                                                                                                                                        |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET`                | String  | -       | Full path to your HTML email template. This overrides the default template for password reset emails.                                                                                                                                                                |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED`        | String  | -       | Overrides the default HTML template for notifying users that a workflow was shared. Provide the full path to the template.                                                                                                                                           |
| `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`        | Number  | 168     | Set an expiration date for the JWTs in hours.                                                                                                                                                                                                                        |
| `N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS` | Number  | 0       | How many hours before the JWT expires to automatically refresh it. 0 means 25% of `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. -1 means it will never refresh, which forces users to log in again after the period defined in `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. |
| `N8N_USER_MANAGEMENT_JWT_SECRET`                | String  | -       | Set a specific JWT secret. By default, n8n generates one on start.                                                                                                                                                                                                   |
<!-- vale on -->


## Workflows

| Variable                                    | Type    | Default                  | Description                                                                                                                                                                       |
|:--------------------------------------------|:--------|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_ONBOARDING_FLOW_DISABLED`              | Boolean | `false`                  | Whether to disable onboarding tips when creating a new workflow (true) or not (false).                                                                                            |
| `N8N_WORKFLOW_ACTIVATION_BATCH_SIZE`        | Number  | `1`                      | How many workflows to activate simultaneously during startup.
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | String  | `workflowsFromSameOwner` | Which workflows can call a workflow. Options are: `any`, `none`, `workflowsFromAList`, `workflowsFromSameOwner`. This feature requires [Workflow sharing](/workflows/sharing.md). |
| `N8N_WORKFLOW_TAGS_DISABLED`                | Boolean | `false`                  | Whether to disable workflow tags (true) or enable tags (false).                                                                                                                   |
| `WORKFLOWS_DEFAULT_NAME`                    | String  | `My workflow`            | The default name used for new workflows.                                                                                                                                          |
