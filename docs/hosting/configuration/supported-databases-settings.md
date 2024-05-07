---
contentType: reference
---

# Supported databases

By default, n8n uses SQLite to save credentials, past executions, and workflows. n8n also supports PostgresDB.

## Shared settings

The following environment variables get used by all databases:

 - `DB_TABLE_PREFIX` (default: -) - Prefix for table names

## PostgresDB

To use PostgresDB as the database, you can provide the following environment variables:

 - `DB_TYPE=postgresdb`
 - `DB_POSTGRESDB_DATABASE` (default: 'n8n')
 - `DB_POSTGRESDB_HOST` (default: 'localhost')
 - `DB_POSTGRESDB_PORT` (default: 5432)
 - `DB_POSTGRESDB_USER` (default: 'postgres')
 - `DB_POSTGRESDB_PASSWORD` (default: empty)
 - `DB_POSTGRESDB_SCHEMA` (default: 'public')
 - `DB_POSTGRESDB_SSL_CA` (default: undefined): Path to the server's CA certificate used to validate the connection (opportunistic encryption isn't supported)
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

### Required permissions

n8n needs to create and modify the schemas of the tables it uses.

Recommended permissions:

```sql
CREATE DATABASE n8n-db;
CREATE USER n8n-user WITH PASSWORD 'random-password';
GRANT ALL PRIVILEGES ON DATABASE n8n-db TO n8n-user;
```

### TLS

You can choose between these configurations:

- Not declaring (default): Connect with `SSL=off`
- Declaring only the CA and unauthorized flag: Connect with `SSL=on` and verify the server's signature
- Declaring `_{CERT,KEY}` and the above: Use the certificate and key for client TLS authentication

## SQLite

This is the default database that gets used if nothing is defined.

The database file is located at:
`~/.n8n/database.sqlite`
