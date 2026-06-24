---
title: Logs environment variables
description: Environment variables to configure logging and diagnostic data.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Logs
originalFilePath: hosting/configuration/environment-variables/logs.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/logs'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/logs
layout:
  description:
    visible: false
---

# Logs environment variables <a href="#logs-environment-variables" id="logs-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

This page lists environment variables to set up logging for debugging. Refer to [Logging in n8n](../../../keep-n8n-running/set-up-logging.md) for details. 

## n8n logs <a href="#n8n-logs" id="n8n-logs"></a>


| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_LOG_LEVEL` | Enum string: `info`, `warn`, `error`, `debug` | `info` | Log output level. Refer to [Log levels](../../../keep-n8n-running/set-up-logging.md#log-levels) for details. |
| `N8N_LOG_OUTPUT` | Enum string: `console`, `file` | `console` | Where to output logs. Provide multiple values as a comma-separated list. |
| `N8N_LOG_FORMAT` | Enum string: `text`, `json` | `text` | The log format to use. `text` prints human readable messages. `json` prints one JSON object per line containing the message, level, timestamp, and all metadata. This is useful for production monitoring as well as debugging. |
| `N8N_LOG_CRON_ACTIVE_INTERVAL` | Number | `0` | Interval in minutes to log currently active cron jobs. Set to `0` to disable. |
| `N8N_LOG_FILE_COUNT_MAX` | Number | `100` | Max number of log files to keep. |
| `N8N_LOG_FILE_SIZE_MAX` | Number | `16` | Max size of each log file in MB. |
| `N8N_LOG_FILE_LOCATION` | String | `<n8n-directory-path>/logs/n8n.log` | Log file location. Requires N8N_LOG_OUTPUT set to `file`. |
| `DB_LOGGING_ENABLED` | Boolean | `false` | Whether to enable database-specific logging. |
| `DB_LOGGING_OPTIONS` | Enum string: `query`, `error`, `schema`, `warn`, `info`, `log`  | `error` | Database log output level. To enable all logging, specify `all`. Refer to [TypeORM logging options](https://orkhan.gitbook.io/typeorm/docs/docs/advanced-topics/5-logging#logging-options) |
| `DB_LOGGING_MAX_EXECUTION_TIME` | Number | `1000` | Maximum execution time (in milliseconds) before n8n logs a warning. Set to `0` to disable long running query warning. |
| `CODE_ENABLE_STDOUT` | Boolean | `false` | Set to `true` to send Code node logs from `console.log` or `print` to the process's stdout, only for production executions. |
| `NO_COLOR` | any | `undefined` | Set to any value to output logs without ANSI colors. For more information, see the [no-color.org website](https://no-color.org/). |


## Log streaming <a href="#log-streaming" id="log-streaming"></a>

Refer to [Log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems) for more information on this feature.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EVENTBUS_CHECKUNSENTINTERVAL` | Number | `0` | How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to `0` to disable it. |
| `N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS` | Boolean | `false` | Whether all file access happens synchronously within the thread (true) or not (false). |
| `N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT` | Number | `3` | Number of event log files to keep. |
| `N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB` | Number | `10240` | Maximum size (in kilo-bytes) of an event log file before a new one starts. |
| `N8N_EVENTBUS_LOGWRITER_LOGBASENAME` | String | `n8nEventLog` | Basename of the event log file. Ignored when `N8N_EVENTBUS_LOGWRITER_LOGFULLPATH` is set. |
| `N8N_EVENTBUS_LOGWRITER_LOGFULLPATH` | String | `''` | Absolute path to the event log file. Must end in `.log`. When set, this path is used verbatim and overrides `N8N_EVENTBUS_LOGWRITER_LOGBASENAME` and the default per-process suffix. Use this to give each n8n process a unique event log path when multiple processes share a writable filesystem. Refer to [Per-process event log files](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems#per-process-event-log-files) for details. |
| `N8N_EVENTBUS_LOGWRITER_MAXTOTALMESSAGESPERFILE` | Number | `500000` | Maximum number of lines parsed from a single event log file during recovery. Bounds memory use when an event log file contains many invalid lines. |

### Manage log streaming destinations from environment variables <a href="#manage-log-streaming-destinations-from-environment-variables" id="manage-log-streaming-destinations-from-environment-variables"></a>

Set `N8N_LOG_STREAMING_MANAGED_BY_ENV` to `true` to manage log streaming destinations from environment variables. See [Manage instance settings using environment variables](../../manage-settings-using-environment-variables.md) for how the activation pattern works, and [Configure log streaming destinations using environment variables](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems#configure-using-environment-variables) for the per-destination JSON shape.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/JvN9TDUUWTwpWaT83YrH/" %}
