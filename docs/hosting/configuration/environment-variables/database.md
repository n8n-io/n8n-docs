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

/// note | File-based configuration
You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](/hosting/configuration/configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.
///

By default, n8n uses SQLite. n8n also supports PostgreSQL. n8n [removed support for MySQL and MariaDB](/1-0-migration-checklist/#mysql-and-mariadb) in v1.0. 

This page outlines environment variables to configure your chosen database for your self-hosted n8n instance. 

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_TYPE`<br>/`_FILE` | Enum string:<br> `sqlite`, `postgresdb` | `sqlite` | The database to use. |
| `DB_TABLE_PREFIX` | * | - | Prefix to use for table names. |

## PostgreSQL

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_POSTGRESDB_DATABASE`<br>/`_FILE` | String | `n8n` | The name of the PostgreSQL database. Default value is `n8n`. |
| `DB_POSTGRESDB_HOST`<br>/`_FILE` | String | `localhost` | The PostgreSQL host. Default value is `localhost`. |
| `DB_POSTGRESDB_PORT`<br>/`_FILE` | Number | `5432` | The PostgreSQL port. Default value is `5432`. |
| `DB_POSTGRESDB_USER`<br>/`_FILE` | String | `root` | The PostgreSQL user. Default value is `root`. |
| `DB_POSTGRESDB_PASSWORD`<br>/`_FILE` | String | - | The PostgreSQL password. |
| `DB_POSTGRESDB_SCHEMA`<br>/`_FILE` | String | `public` | The PostgreSQL schema. Default value is `public`. |
| `DB_POSTGRESDB_SSL_CA`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate authority. |
| `DB_POSTGRESDB_SSL_CERT`<br>/`_FILE` | String | - | The PostgreSQL SSL certificate. |
| `DB_POSTGRESDB_SSL_KEY`<br>/`_FILE` | String | - | The PostgreSQL SSL key. |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED`<br>/`_FILE` | Boolean | `true` | If n8n should reject unauthorized SSL connections (true) or not (false). |

## SQLite

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `DB_SQLITE_VACUUM_ON_STARTUP` | Boolean | `false` | Runs [VACUUM](https://www.sqlite.org/lang_vacuum.html){:target="_blank" .external-link} operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time. |
