# Supported databases and settings

# Databases

By default, n8n uses SQLite to save credentials, past executions, and workflows. However, n8n also supports PostgresDB.

## Shared settings

The following environment variables get used by all databases:

 - `DB_TABLE_PREFIX` (default: '') - Prefix for table names

## PostgresDB

To use PostgresDB as the database, you can provide the following environment variables:

 - `DB_TYPE=postgresdb`
 - `DB_POSTGRESDB_DATABASE` (default: 'n8n')
 - `DB_POSTGRESDB_HOST` (default: 'localhost')
 - `DB_POSTGRESDB_PORT` (default: 5432)
 - `DB_POSTGRESDB_USER` (default: 'root')
 - `DB_POSTGRESDB_PASSWORD` (default: empty)
 - `DB_POSTGRESDB_SCHEMA` (default: 'public')
 - `DB_POSTGRESDB_SSL_CA` (default: undefined): Path to the server's CA certificate used to validate the connection (opportunistic encryption is not supported)
 - `DB_POSTGRESDB_SSL_CERT` (default: undefined): Path to the client's TLS certificate
 - `DB_POSTGRESDB_SSL_KEY` (default: undefined): Path to the client's private key corresponding to the certificate
 - `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` (default: true): If TLS connections that fail validation should be rejected

```bash
export DB_TYPE=postgresdb
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_HOST=postgresdb
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_USER=n8n
export DB_POSTGRESDB_PASSWORD=n8n
export DB_POSTGRESDB_SCHEMA=n8n

# optional:
export DB_POSTGRESDB_SSL_CA=$(pwd)/ca.crt
export DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false

n8n start
```

### TLS

You can choose between these configurations:

- Not declaring (default): Connect with `SSL=off`
- Declaring only the CA and unauthorized flag: Connect with `SSL=on` and verify the server's signature
- Declaring `_{CERT,KEY}` and the above: Use the certificate and key for client TLS authentication

## MySQL / MariaDB

The compatibility with MySQL/MariaDB has been tested. Even then, it is advisable to observe the operation of the application with this database as this option has been recently added. If you spot any problems, feel free to submit a bug report or a pull request.

To use MySQL or MariaDB, provide the following environment variables:

 - `DB_TYPE=mysqldb` or `DB_TYPE=mariadb`
 - `DB_MYSQLDB_DATABASE` (default: 'n8n')
 - `DB_MYSQLDB_HOST` (default: 'localhost')
 - `DB_MYSQLDB_PORT` (default: 3306)
 - `DB_MYSQLDB_USER` (default: 'root')
 - `DB_MYSQLDB_PASSWORD` (default: empty)


```bash
export DB_TYPE=mysqldb
export DB_MYSQLDB_DATABASE=n8n
export DB_MYSQLDB_HOST=mysqldb
export DB_MYSQLDB_PORT=3306
export DB_MYSQLDB_USER=n8n
export DB_MYSQLDB_PASSWORD=n8n

n8n start
```

## SQLite

This is the default database that gets used if nothing is defined.

The database file is located at:
`~/.n8n/database.sqlite`


## Other databases

Currently, only the databases mentioned above are supported. n8n internally uses
[TypeORM](https://typeorm.io), so adding support for the following databases
should not be too much work:

 - CockroachDB
 - Microsoft SQL
 - Oracle

If you cannot use any of the currently supported databases for some reason and
you can code, we'd appreciate your support in the form of a pull request. If not, you can request support [here](https://community.n8n.io/c/feature-requests/cli).
