---
title: Logs environment variables
description: Environment variables to configure logging and diagnostic data. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Logs environment variables

/// note | File-based configuration
You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](/hosting/configuration/configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.
///

This page lists environment variables to set up logging for debugging. Refer to [Logging in n8n](/hosting/logging-monitoring/logging/) for details. 

## n8n logs


| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_LOG_LEVEL` | Enum string: `info`, `warn`, `error`, `verbose`, `debug` | `info` | Log output level. Refer to [Log levels](/hosting/logging-monitoring/logging/#log-levels) for details. |
| `N8N_LOG_OUTPUT` | Enum string: `console`, `file` | `console` | Where to output logs. Provide multiple values as a comma-separated list. |
| `N8N_LOG_FILE_COUNT_MAX` | Number | `100` | Max number of log files to keep. |
| `N8N_LOG_FILE_SIZE_MAX` | Number | `16` | Max size of each log file in MB. |
| `N8N_LOG_FILE_LOCATION` | String | `<n8nFolderPath>/logs/n8n.log` | Log file location. Requires N8N_LOG_OUTPUT set to `file`. |
| `DB_LOGGING_ENABLED` | Boolean | `false` | Whether to enable database-specific logging. |
| `DB_LOGGING_OPTIONS` | Enum string: `query`, `error`, `schema`, `warn`, `info`, `log`  | `error` | Database log output level. To enable all logging, specify `all`. Refer to [TypeORM logging options](https://orkhan.gitbook.io/typeorm/docs/logging#logging-options){:target=_blank .external-link} |
| `DB_LOGGING_MAX_EXECUTION_TIME` | Number | `1000` | Maximum execution time (in milliseconds) before n8n logs a warning. Set to `0` to disable long running query warning. |

## Log streaming

Refer to [Log streaming](/log-streaming/) for more information on this feature.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EVENTBUS_CHECKUNSENTINTERVAL` | Number | `0` | How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to `0` to disable it. |
| `N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS` | Boolean | `false` | Whether all file access happens synchronously within the thread (true) or not (false). |
| `N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT` | Number | `3` | Number of event log files to keep. |
| `N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB` | Number | `10240` | Maximum size (in kilo-bytes) of an event log file before a new one starts. |
| `N8N_EVENTBUS_LOGWRITER_LOGBASENAME` | String | `n8nEventLog` | Basename of the event log file. |
