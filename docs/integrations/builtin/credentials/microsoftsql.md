---
title: Microsoft SQL credentials
description: >-
  Documentation for Microsoft SQL credentials. Use these credentials to
  authenticate Microsoft SQL in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft SQL credentials
originalFilePath: integrations/builtin/credentials/microsoftsql.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/microsoftsql'
url: 'https://docs.n8n.io/integrations/builtin/credentials/microsoftsql'
layout:
  description:
    visible: false
---

# Microsoft SQL credentials <a href="#microsoft-sql-credentials" id="microsoft-sql-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Microsoft SQL](../app-nodes/n8n-nodes-base.microsoftsql.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a user account on a [Microsoft SQL server](https://learn.microsoft.com/en-us/sql/sql-server/what-is-sql-server) database.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- SQL database connection

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft's Connect to SQL Server documentation](https://learn.microsoft.com/en-us/sql/sql-server/connect-to-database-engine?view=sql-server-ver16&tabs=sqldb#connect-to-sql-server) for more information about connecting to the service.

## Using SQL database connection <a href="#using-sql-database-connection" id="using-sql-database-connection"></a>

To configure this credential, you'll need:

- The **Server** name
- The **Database** name
- Your **User** account/ID
- Your **Password**
- The **Port** to use for the connection
- The **Domain** name
- Whether to use **TLS**
- Whether to **Ignore SSL Issues**
- The **Connect Timeout**
- The **Request Timeout**
- The **TDS Version** the connection should use

To set up the database connection:

1. Enter the SQL Server Host Name as the **Server**. In an existing SQL Server connection, the host name comes before the instance name in the format `HOSTNAME\INSTANCENAME`. Find the host name:
    - In the **Object Explorer** pane as the top-level object for your database.
    - In the footer of a query window.
    - Viewing the current connection **Properties** and looking for **Name** or **Display Name**.
    - Refer to [Find SQL Server Instance Name | When you're connected to SQL Server](https://learn.microsoft.com/en-us/sql/ssms/tutorials/ssms-tricks?view=sql-server-ver16#when-youre-connected-to-sql-server) for more information. You can also find the information in the [Error logs](https://learn.microsoft.com/en-us/sql/ssms/tutorials/ssms-tricks?view=sql-server-ver16#before-you-connect-to-sql-server).
2. Enter the SQL Server Instance Name as the **Database** name. Find this name using the same steps listed above for finding the host name.
    - If you don't see an instance name in any of these places, then your database uses the default `MSSQLSERVER` instance name.
3. Enter your **User** account name or ID.
4. Enter your **Password**.
5. For the **Port**:
    - SQL Server defaults to `1433`.
    - If you can't connect over port 1433, check the [Error logs](https://learn.microsoft.com/en-us/sql/ssms/tutorials/ssms-tricks?view=sql-server-ver16#before-you-connect-to-sql-server) for the phrase `Server is listening on` to identify the port number you should enter.
6. You only need to enter the **Domain** name if users in multiple domains access your database. Run this SQL query to get the domain name:

    ```sql
    SELECT DEFAULT_DOMAIN()[DomainName];
    ```

7. Select whether to use **TLS**.
8. Select whether to **Ignore SSL Issues**: If turned on, the credential will connect even if SSL certificate validation fails.
9. Enter the number of milliseconds n8n should attempt the initial connection to complete before disconnecting as the **Connect Timeout**. Refer to the [SqlConnection.ConnectionTimeout property documentation](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlconnection.connectiontimeout) for more information.
    - SQL Server stores this timeout as seconds, while n8n stores it as milliseconds. If you're copying your SQL Server defaults, multiple by 100 before entering the number here.
10. Enter the number of milliseconds n8n should wait on a given request before timing out as the **Request Timeout**. This is basically a query timeout parameter. Refer to [Troubleshoot query time-out errors](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/performance/troubleshoot-query-timeouts#explanation) for more information.
11. Select the Tabular Data Stream (TDS) protocol to use from the **TDS Version** dropdown. If the server doesn't support the version you select here, the connection uses a negotiated alternate version. Refer to [Appendix A: Product Behavior](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/135d0ebe-5c4c-4a94-99bf-1811eccb9f4a) for a more detailed breakdown of the TDS versions' compatibility with different SQL Server versions and .NET frameworks. Options include:
    - **7_4 (SQL Server 2012 ~ 2019)**: TDS version 7.4.
    - **7_3_B (SQL Server 2008R2)**: TDS version 7.3.B.
    - **7_3_A (SQL Server 2008)**: TDS version 7.3.A.
    - **7_2 (SQL Server 2005)**: TDS version 7.2.
    - **7_1 (SQL Server 2000)**: TDS version 7.1.
