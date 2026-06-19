---
title: Database environment variables
description: Set up and configure databases with environment variables for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Database environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

By default, n8n uses SQLite. n8n also supports PostgreSQL. n8n [deprecated support for MySQL and MariaDB](/1-0-migration-checklist.md#mysql-and-mariadb) in v1.0.

This page outlines environment variables to configure your chosen database for your self-hosted n8n instance.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_TYPE`<br>/`_FILE` | Enum string:<br> `sqlite`, `postgresdb` | `sqlite` | The database to use. |
| `DB_TABLE_PREFIX` | * | - | Prefix to use for table names. |
| `DB_PING_INTERVAL_SECONDS` | Number | `2` | How often, in seconds, n8n pings the database to check that the connection is still alive. |
| `DB_PING_TIMEOUT_MS` | Number | `5000` | How long, in milliseconds, n8n waits for a single ping to respond before counting it as a failure. Falls back to the deprecated `N8N_DB_PING_TIMEOUT` if that's set. |
| `DB_PING_MAX_FAILURES_BEFORE_RECOVERY` | Number | `3` | How many pings in a row must fail before n8n treats the connection as lost and starts recovery. |
| `DB_RECOVERY_BACKOFF_MIN_MS` | Number | `1000` | How long, in milliseconds, n8n waits before its first recovery attempt. Each retry waits longer (exponential backoff). |
| `DB_RECOVERY_BACKOFF_MAX_MS` | Number | `30000` | The longest, in milliseconds, n8n waits between recovery attempts. This caps the backoff. Must be greater than or equal to `DB_RECOVERY_BACKOFF_MIN_MS`. |
| `DB_CONNECTION_ACQUISITION_TIMEOUT_MS` | Number | `30000` | How long, in milliseconds, a query waits while recovery is in progress before failing fast with an error. Set to `0` to wait indefinitely. Applies to PostgreSQL only. |

## PostgreSQL

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_POSTGRESDB_DATABASE`<br>/`_FILE` | String | `n8n` | The name of the PostgreSQL database. |
| `DB_POSTGRESDB_HOST`<br>/`_FILE` | String | `localhost` | The PostgreSQL host. |
| `DB_POSTGRESDB_PORT`<br>/`_FILE` | Number | `5432` | The PostgreSQL port. |
| `DB_POSTGRESDB_USER`<br>/`_FILE` | String | `postgres` | The PostgreSQL user. |
| `DB_POSTGRESDB_PASSWORD`<br>/`_FILE` | String | - | The PostgreSQL password. |
| `DB_POSTGRESDB_POOL_SIZE`<br>/`_FILE` | Number | `2` | Control how many parallel open Postgres connections n8n should have. Increasing it may help with resource utilization, but too many connections may degrade performance. |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT`<br>/`_FILE` | Number | `20000` | Postgres connection timeout (ms).
| `DB_POSTGRESDB_IDLE_CONNECTION_TIMEOUT`<br>/`_FILE` | Number | `30000` | Amount of time before an idle connection is eligible for eviction for being idle.
| `DB_POSTGRESDB_MAX_CONNECTION_LIFETIME_MS`<br>/`_FILE` | Number | `3600000` | How long, in milliseconds, n8n keeps a pooled connection before recycling it. Recycling old connections helps avoid stale connections that the database or network dropped without n8n noticing. The default is one hour. Set to `0` to disable recycling. |
| `DB_POSTGRESDB_KEEP_ALIVE`<br>/`_FILE` | Boolean | `true` | Whether to enable TCP keep-alive on connections. Keep-alive lets n8n notice a dead connection without having to run a query first. |
| `DB_POSTGRESDB_KEEP_ALIVE_INITIAL_DELAY_MS`<br>/`_FILE` | Number | `10000` | How long, in milliseconds, n8n waits before sending the first TCP keep-alive probe on a connection. |
| `DB_POSTGRESDB_SCHEMA`<br>/`_FILE` | String | `public` | The PostgreSQL schema. |
| `DB_POSTGRESDB_SSL_ENABLED`<br>/`_FILE` | Boolean | `false` | Whether to enable SSL. Automatically enabled if `DB_POSTGRESDB_SSL_CA`, `DB_POSTGRESDB_SSL_CERT` or `DB_POSTGRESDB_SSL_KEY` is defined. |
| `DB_POSTGRESDB_SSL_CA`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY`<br>/`_FILE` | String | - | The PostgreSQL SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`<br>/`_FILE` | Boolean | `true` | If n8n should reject unauthorized SSL connections (true) or not (false). |

## SQLite

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_SQLITE_POOL_SIZE` | Number | `0` | Controls whether to open the SQLite file in [WAL mode](https://www.sqlite.org/wal.html) or [rollback journal mode](https://www.sqlite.org/lockingv3.html#rollback). Uses rollback journal mode when set to zero. When greater than zero, uses WAL mode with the value determining the number of parallel SQL read connections to configure. WAL mode is much more performant and reliable than the rollback journal mode. |
| `DB_SQLITE_VACUUM_ON_STARTUP` | Boolean | `false` | Runs [VACUUM](https://www.sqlite.org/lang_vacuum.html) operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time. |

## How database connection recovery works

n8n keeps checking that it can still reach your database. If the connection drops, for example after a database restart or a network blip, n8n can repair it on its own instead of staying broken until you restart n8n.

Here's the cycle the variables on this page control:

1. Every `DB_PING_INTERVAL_SECONDS`, n8n sends a ping. Each ping has `DB_PING_TIMEOUT_MS` to respond.
1. Once `DB_PING_MAX_FAILURES_BEFORE_RECOVERY` pings fail in a row, n8n treats the connection as lost.
1. n8n then rebuilds the connection, retrying with a growing wait between attempts that starts at `DB_RECOVERY_BACKOFF_MIN_MS` and never exceeds `DB_RECOVERY_BACKOFF_MAX_MS`.
1. On PostgreSQL, while recovery is in progress, any new query waits up to `DB_CONNECTION_ACQUISITION_TIMEOUT_MS` for the connection to come back, then fails with an error rather than hanging.

/// note | Applies to all databases
The health checks and the recovery cycle (the `DB_PING_*` and `DB_RECOVERY_BACKOFF_*` variables) apply to every database type.
The remaining settings (`DB_CONNECTION_ACQUISITION_TIMEOUT_MS`, `DB_POSTGRESDB_MAX_CONNECTION_LIFETIME_MS`, `DB_POSTGRESDB_KEEP_ALIVE`, and `DB_POSTGRESDB_KEEP_ALIVE_INITIAL_DELAY_MS`) apply to PostgreSQL only. The default values suit most deployments, so you can leave them unchanged unless you run into connection problems.
///
