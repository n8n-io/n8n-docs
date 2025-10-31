---
title: n8n v2.0 breaking changes
description: Breaking changes coming in version 2.0
contentType: reference
---

# n8n v2.0 breaking changes

This document provides a summary of breaking changes planned for version 2.0 of n8n. These changes improve security, simplify configuration, and remove legacy features.

The release of n8n 2.0 continues n8n's commitment to providing a secure, reliable, and production-ready automation platform. This major version includes important security enhancements and cleanup of deprecated features.

## Behavioural changes

### Return expected sub-workflow data when it contains a wait node

When a workflow calls a subworkflow which contains a wait node, the child workflow incorrectly returns the input items of the wait node to the parent workflow. This behaviour is incorrect. In v2, the parent workflow will receive the data from the end of the subworkflow.

**Migration path:** Review any workflows that call subworkflows and rely on this behaviour.

### Remove nodes whose service has been retired

The following nodes are removed, since the service they integrate to has been retired:

- Spontit node
- crowd.dev node
- Kitemaker node

## Public API

## The public API endpoint `PUT /workflows/{id}` will be changed

TODO

## Security

### Block env access from Code Node by default

n8n will block access to environment variables from the Code node by default to improve security. The default value of `N8N_BLOCK_ENV_ACCESS_IN_NODE` will be changed to `true`.

**Migration path:** If you need to access environment variables from Code nodes, set `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` in your environment configuration. However, consider using credentials or other secure methods to pass sensitive data instead.

### Enforce settings file permissions

n8n will enforce strict permissions on configuration files by default, similar to how SSH enforces permissions on SSH keys. Configuration files will be set to `0600` permissions (readable and writable only by the owner).

**Migration path:** Set `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true` to test this behavior before v2.0. If your environment doesn't support file permissions (e.g. on Windows), set `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false`.

### Enable Task Runners by default

[Task Runners](/hosting/configuration/task-runners.md) will be enabled by default for improved security and isolation. Code node execution will happen on task runners by default.

**Migration path:** Set `N8N_RUNNERS_ENABLED=true` to test this behavior before v2.0. Ensure your infrastructure can support task runners. Consider using [external mode](/hosting/configuration/task-runners.md#External_mode) for improved security.

### Remove task runner from `n8nio/n8n` docker image

The task runner will be removed from the main `n8nio/n8n` Docker image for external mode.

**Migration path:** Change the task runner's Docker image from `n8nio/n8n` to `n8nio/runners` if you're running task runners in Docker in external mode.

### Remove Pyodide based Python Code node

The Pyodide-based Python Code node will be removed in favor of the [task runner](/hosting/configuration/task-runners.md) based implementation for better security and performance, which uses native Python. Only [external mode](/hosting/configuration/task-runners.md#External_mode) is supported for Python Code node.

The native Python Code node does not support any of the built-ins, such as `_input` that were available in the Pyodide-based implementation. Dot access notation is not supported either. See [Code node](/integrations/builtin/core-nodes/code-node.md#Python\(Native - beta\)) for more details.

**Migration path:** Configure task runner in external mode to continue using Python in Code nodes. Review any existing Python Code nodes.

### Disable ExecuteCommand and LocalFileTrigger nodes by default

The `ExecuteCommand` and `LocalFileTrigger` nodes will be disabled by default as they pose security risks. These nodes allow arbitrary command execution and file system access.

**Migration path:** If you need to use these nodes, you'll need to explicitly remove them from the list of disabled nodes in your n8n configuration using `NODES_EXCLUDE="[]"`

### Require auth on OAuth callback URLs by default

OAuth callback endpoints will require authentication by default. The default value for `N8N_SKIP_AUTH_ON_OAUTH_CALLBACK` will change from `true` to `false`.

**Migration path:** Test your OAuth integrations with `N8N_SKIP_AUTH_ON_OAUTH_CALLBACK=false` before upgrading to v2.0.

### Set default value for N8N_RESTRICT_FILE_ACCESS_TO

n8n will set a default value for `N8N_RESTRICT_FILE_ACCESS_TO` to restrict where file operations can be performed. This affects the `ReadWriteFile` and `ReadBinaryFiles` nodes. The default value will be `./data` directory within the n8n home folder.

**Migration path:** Review your workflows that use file nodes and ensure they operate within the allowed directories. Configure `N8N_RESTRICT_FILE_ACCESS_TO` explicitly if you need different behavior.

### Change the default value of N8N_GIT_NODE_DISABLE_BARE_REPOS to true

The Git node will disable bare repositories by default for security reasons. The default value of `N8N_GIT_NODE_DISABLE_BARE_REPOS` will change to `true`.

**Migration path:** If you need to work with bare repositories, explicitly set `N8N_GIT_NODE_DISABLE_BARE_REPOS=false` in your environment configuration.

## Data

### Drop MySQL/MariaDB support

n8n will drop support for MySQL and MariaDB as storage backends. Support for these was deprecated in v1.0. PostgreSQL is recommended for better compatibility and long-term support.

**Migration path:** Use the database migration tool to migrate from MySQL/MariaDB to PostgreSQL or SQLite before upgrading to v2.0.

### Remove SQLite legacy driver

The legacy SQLite driver has a lot of issues and will be removed. SQLite's pooling driver will become the default and only SQLite driver. The pooling driver uses WAL mode, single write connection and a pool of read connections. According to our benchmarks it is up to 10x more performant.

**Migration path:** The `sqlite-pooled` driver will automatically become the default. It can already be setting `DB_SQLITE_POOL_SIZE` to a value higher than 0. The default will become `2`.

### Disable binary data in-memory mode by default

The `N8N_DEFAULT_BINARY_DATA_MODE` `default` mode (which keeps execution binary data in-memory) will be removed. Filesystem mode will become the default for better performance and stability.

**Migration path:** Filesystem mode will automatically become the default. Ensure your n8n instance has appropriate disk space for storing binary data. See the [binary data configuration](/hosting/configuration/environment-variables/binary-data/) for more details.

## Configuration & Environment

### Upgrade dotenv

n8n automatically loads environment configuration from a `.env` file if one is given using the `dotenv` library. n8n will upgrade the `dotenv` library from `8.6.0` to the latest version, which may include breaking changes in how `.env` files are parsed. The biggest breaking changes are:
- Backtick support ([#615](https://github.com/motdotla/dotenv/pull/615)): If you had values containing the backtick character, please quote those values with either single or double quotes.
- Multiline support
- `#` marks the beginning of a comment


**Migration path:** If using a `.env` file, review the [dotenv changelog](https://github.com/motdotla/dotenv/blob/master/CHANGELOG.md) and ensure your `.env` file is compatible with the new version.

### Remove n8n --tunnel option

The `n8n --tunnel` command-line option will be removed.

**Migration path:** If you're using the `--tunnel` option for development or testing, use alternative tunneling solutions like ngrok, localtunnel, or Cloudflare Tunnel.

### Remove QUEUE_WORKER_MAX_STALLED_COUNT

The `QUEUE_WORKER_MAX_STALLED_COUNT` environment variable and the Bull retry mechanism for stalled jobs will be removed as it causes more confusion and incorrect behavior than it provides value.

**Migration path:** Remove this environment variable from your configuration. The automatic retry mechanism for stalled jobs will no longer be available.

## CLI & Workflow

### Remove CLI command operation to activate all workflows

The CLI command `update:workflow --all --active=true` to activate all workflows will be removed as it can cause unintended consequences in production environments.

**Migration path:** Activate workflows individually or in controlled batches using the API or UI.

## Reporting issues

If you encounter any issues during the process of updating to n8n 2.0, please seek help in the community [forum](https://community.n8n.io/).
