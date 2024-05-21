---
title: Microsoft SQL credentials
description: Documentation for Microsoft SQL credentials. Use these credentials to authenticate Microsoft SQL in n8n, a workflow automation platform.
contentType: integration
---

# Microsoft SQL credentials

You can use these credentials to authenticate the following nodes:

- [Microsoft SQL](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsql/)

## Prerequisites

Create a user account on a [Microsoft SQL server](https://learn.microsoft.com/en-us/sql/sql-server/what-is-sql-server) database.

## Supported authentication methods

- SQL database connection

## Related resources

Refer to [Microsoft's Connect to SQL Server documentation](https://learn.microsoft.com/en-us/sql/sql-server/connect-to-database-engine?view=sql-server-ver16&tabs=sqldb#connect-to-sql-server){:target=_blank .external-link} for more information about connecting to the service.

## Using SQL database connection

To configure this credential, you'll need:

- The **Server** name: Refer to [Find SQL Server Instance Name](https://learn.microsoft.com/en-us/sql/ssms/tutorials/ssms-tricks){:target=_blank .external-link} for more information.
- The **Database** name
- Your **User** account/ID
- Your **Password**
- The **Port** to use for the connection: SQL Server defaults to 1433; only adjust this if your SQL Server database is set up to use another port.
- The **Domain** name: Necessary if users in multiple domains access your database. Run `SELECT DEFAULT_DOMAIN()[DomainName]` to get the Domain name.
- Select whether to use **TLS**
- Select whether to **Ignore SSL Issues**: If turned on, the credential will connect even if SSL certificate validation fails.
- The **Connect Timeout**: Enter the number of milliseconds n8n should allow the connection to remain open before timing out due to inactivity. Refer to the [SqlConnection.ConnectionTimeout property documentation](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlconnection.connectiontimeout){:target=_blank .external-link} for more information.
- The **Request Timeout**: Enter the number of milliseconds n8n should wait on a given request before timing out. This is basically a query timeout parameter. Refer to [Troubleshoot query time-out errors](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/performance/troubleshoot-query-timeouts#explanation){:target=_blank .external-link} for more information.
- Select the **TDS Version**: The Tabular Data Stream (TDS) protocol version to use. If the server doesn't support the version you select here, a negotiated alternate version is used. Refer to [Appendix A: Product Behavior](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/135d0ebe-5c4c-4a94-99bf-1811eccb9f4a) for a more detailed breakdown of the TDS versions' compatibility with different SQL Server versions and .NET frameworks. Options include:
    - `7_4 (SQL Server 2012 ~ 2019)`: TDS version 7.4
    - `7_3_B (SQL Server 2008R2)`: TDS version 7.3.B
    - `7_3_A (SQL Server 2008)`: TDS version 7.3.A
    - `7_2 (SQL Server 2005)`: TDS version 7.2
    - `7_1 (SQL Server 2000)`: TDS version 7.1

Refer to the **Connect to server** table in the [Connect to a SQL Server Instance documentation](https://learn.microsoft.com/en-us/sql/ssms/quickstarts/ssms-connect-query-sql-server) for more details on these fields.

