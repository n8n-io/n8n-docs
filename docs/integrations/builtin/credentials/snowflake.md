---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Snowflake credentials
description: Documentation for Snowflake credentials. Use these credentials to authenticate Snowflake in n8n, a workflow automation platform.
contentType: integration
---

# Snowflake credentials

You can use these credentials to authenticate the following nodes:

- [Snowflake](/integrations/builtin/app-nodes/n8n-nodes-base.snowflake/)

## Prerequisites

Create a [Snowflake](https://www.snowflake.com/en/){:target=_blank .external-link} account.

## Supported authentication methods

- Database connection

## Related resources

Refer to [Snowflake's API documentation](https://docs.snowflake.com/en/api-reference){:target=_blank .external-link} and [SQL Command Reference](https://docs.snowflake.com/en/sql-reference-commands){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential, you'll need:

- An **Account** name: Your account name is the string of characters located between `https://` and `snowflakecomputing.com` in your Snowflake URL. For example, if the URL of your Snowflake account is `https://abc.eu-central-1.snowflakecomputing.com` then the name of your account is `abc.eu-central-1`.
- A **Database**: Enter the name of the [database](https://docs.snowflake.com/en/sql-reference/sql/use-database){:target=_blank .external-link} the credential should connect to.
- A **Warehouse**: Enter the name of the default virtual [warehouse](https://docs.snowflake.com/en/sql-reference/sql/use-warehouse){:target=_blank .external-link} to use for the session after connecting. n8n uses this warehouse for performing queries, loading data, and so on.
- A **Username**
- A **Password**
- A **Schema**: Enter the [schema](https://docs.snowflake.com/en/sql-reference/sql/use-schema){:target=_blank .external-link} you want to use after connecting.
- A **Role**: Enter the security [role](https://docs.snowflake.com/en/sql-reference/sql/use-role){:target=_blank .external-link} you want to use after connecting.
- **Client Session Keep Alive**: By default, client connections typically time out three or four hours after the most recent query execution. Turning this setting on sets the `clientSessionKeepAlive` parameter to true: the server will keep the client's connection alive indefinitely, even if the connection doesn't execute any queries.

Refer to [Session Commands](https://docs.snowflake.com/en/sql-reference/commands-session){:target=_blank .external-link} for more information on these settings.
