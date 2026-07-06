---
contentType: reference
nodeTitle: Choose n8n's database
originalFilePath: hosting/configuration/supported-databases-settings.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/supported-databases-settings'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/choose-n8ns-database'
layout:
  description:
    visible: false
---

# Supported databases <a href="#supported-databases" id="supported-databases"></a>

By default, n8n uses SQLite to save credentials, past executions, and workflows. n8n also supports PostgresDB (only [actively maintained versions](https://www.postgresql.org/support/versioning/)).

## Database type by n8n installation <a href="#database-type-by-n8n-installation" id="database-type-by-n8n-installation"></a>

The database type used varies depending on your n8n installation:

### Self-hosted n8n <a href="#self-hosted-n8n" id="self-hosted-n8n"></a>
By default, self-hosted installations use **SQLite**. You can optionally configure PostgreSQL by setting the appropriate environment variables (see [PostgresDB configuration](#postgresdb)).

### n8n Cloud <a href="#n8n-cloud" id="n8n-cloud"></a>

n8n Cloud installations use different databases depending on your plan tier:

- **SQLite**: Trial, Starter, and Pro plans, as well as legacy Enterprise plans
- **PostgreSQL**: Enterprise Scaling plans only

## Shared settings <a href="#shared-settings" id="shared-settings"></a>

The following environment variables get used by all databases:

 - `DB_TABLE_PREFIX` (default: -) - Prefix for table names

## PostgresDB <a href="#postgresdb" id="postgresdb"></a>

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

# optional: <a href="#optional" id="optional"></a>
export DB_POSTGRESDB_SSL_CA_FILE=$(pwd)/ca.crt
export DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false

n8n start
```

### Required permissions <a href="#required-permissions" id="required-permissions"></a>

n8n needs to create and modify the schemas of the tables it uses.

Recommended permissions:

```sql
CREATE DATABASE n8n-db;
CREATE USER n8n-user WITH PASSWORD 'random-password';
GRANT ALL PRIVILEGES ON DATABASE n8n-db TO n8n-user;
```

### TLS <a href="#tls" id="tls"></a>

You can choose between these configurations:

- Not declaring (default): Connect with `SSL=off`
- Declaring only the CA and unauthorized flag: Connect with `SSL=on` and verify the server's signature
- Declaring `_{CERT,KEY}` and the above: Use the certificate and key for client TLS authentication

## SQLite <a href="#sqlite" id="sqlite"></a>

This is the default database that gets used if nothing is defined.

The database file is located at:
`~/.n8n/database.sqlite`
