---
title: Snowflake credentials
description: Documentation for Snowflake credentials. Use these credentials to authenticate Snowflake in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Snowflake credentials

You can use these credentials to authenticate the following nodes:

- [Snowflake](/integrations/builtin/app-nodes/n8n-nodes-base.snowflake.md)

## Prerequisites

Create a [Snowflake](https://www.snowflake.com/en/) account.

## Supported authentication methods

- Database connection

## Related resources

Refer to [Snowflake's API documentation](https://docs.snowflake.com/en/api-reference) and [SQL Command Reference](https://docs.snowflake.com/en/sql-reference-commands) for more information about the service.

## Using database connection

To configure this credential, you'll need:

- An **Account** name: Your account name is the string of characters located between `https://` and `snowflakecomputing.com` in your Snowflake URL. For example, if the URL of your Snowflake account is `https://abc.eu-central-1.snowflakecomputing.com` then the name of your account is `abc.eu-central-1`.
- A **Database**: Enter the name of the [database](https://docs.snowflake.com/en/sql-reference/sql/use-database) the credential should connect to.
- A **Warehouse**: Enter the name of the default virtual [warehouse](https://docs.snowflake.com/en/sql-reference/sql/use-warehouse) to use for the session after connecting. n8n uses this warehouse for performing queries, loading data, and so on.
- A **Username**
- A **Password**
- A **Schema**: Enter the [schema](https://docs.snowflake.com/en/sql-reference/sql/use-schema) you want to use after connecting.
- A **Role**: Enter the security [role](https://docs.snowflake.com/en/sql-reference/sql/use-role) you want to use after connecting.
- **Client Session Keep Alive**: By default, client connections typically time out three or four hours after the most recent query execution. Turning this setting on sets the `clientSessionKeepAlive` parameter to true: the server will keep the client's connection alive indefinitely, even if the connection doesn't execute any queries.

Refer to [Session Commands](https://docs.snowflake.com/en/sql-reference/commands-session) for more information on these settings.
