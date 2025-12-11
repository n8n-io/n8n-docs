---
title: Oracle Database credentials
description: Documentation for Oracle Database credentials. Use these credentials to authenticate Oracle Database in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Oracle Database credentials

You can use these credentials to authenticate the following nodes:

- [OracleDB](/integrations/builtin/app-nodes/n8n-nodes-base.oracledb/index.md)
- [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)

/// note
These nodes do not support SSH tunnels.
They require Oracle Database **19c or later**.
For advanced Oracle Database features like Transparent Application Continuity (TAC) and Sharding, they also require Oracle Client Libraries **19c or later**.
///

## Prerequisites

Create a user account on an [Oracle Database](https://www.oracle.com/pls/topic/lookup?ctx=dblatest&id=GUID-F0246961-558F-480B-AC0F-14B50134621C) server.

## Supported authentication methods

- Database connection

## Related resources

Refer to [Oracle Database documentation](https://docs.oracle.com/en/database/oracle/oracle-database) for more information about the service.

## Using database connection

To configure this credential, you'll need:

- A **User** name.
- A **Password** for that user.
- **Connection String**: The Oracle Database instance to connect to. The string can be an Easy Connect string, or a TNS Alias from a tnsnames.ora file, or the Oracle Database instance.
- **Use Optional Oracle Client Libraries**: If you want to work with Oracle Database advanced features, turn this on. This option internally uses node-oracledb Thick mode. Additional settings to enable node-oracledb Thick mode are required. Refer to [Enabling Thick mode documentation](https://node-oracledb.readthedocs.io/en/latest/user_guide/initialization.html#enabling-node-oracledb-thick-mode) for more information. This option is not available in the official n8n docker images.
- **Use SSL**: If your Connection String is using SSL, turn this on and configure additional details for the SSL Authentication.
- **Wallet Password**: The password to decrypt the Privacy Enhanced Mail (PEM)-encoded private certificate, if it is encrypted.
- **Wallet Content**: The security credentials required to establish a mutual TLS (mTLS) connection to Oracle Database.
- **Distinguished Name**: The distinguished name (DN) that should be matched with the certificate DN.
- **Match Distinguished Name**: Whether the server certificate DN should be matched in addition to the regular certificate verification that is performed.
- **Allow Weak Distinguished Name Match**: Whether the secure DN matching behavior which checks both the listener and server certificates has to be performed.
- **Pool Min**: The number of connections established to the database when a pool is created.
- **Pool Max**: The maximum number of connections to which a connection pool can grow.
- **Pool Increment**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Pool Maximum Session Life Time**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Pool Connection Idle Timeout**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Connection Class Name**: DRCP/PRCP Connection Class. Refer to [Enabling DRCP](https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-processes.html#GUID-BB76E57C-3F16-4C85-AEF6-BA14FC1B4777) for more information.
- **Connection Timeout**: The timeout duration in seconds for an application to establish an Oracle Net connection.
- **Transport Connection Timeout**: The maximum number of seconds to wait to establish a connection to the database host.
- **Keepalive Probe Interval**: The number of minutes between the sending of keepalive probes.


To set up your database connection credential:

1. Enter your database's username as the **User** in your n8n credential. 

2. Enter the user's **Password**.

3. Enter your database's connection string as the **Connection String** in your n8n credential.

4. If your database uses SSL and you'd like to configure **SSL** for the connection, turn this option on in the credential. If you turn it on, enter the information of your Oracle Database SSL certificate in these fields:
      1. Enter the wallet password, if any, in the **Wallet Password** field.
      2. Enter PEM-encoded wallet file, **ewallet.pem** contents in the 'Expanded' layout of the **Wallet Content** field. This will ensure that all the whitespaces from the PEM-encoded wallet file are retained.
         Direct copy-paste into the **Wallet Content** field will strip out the whitespaces and lead to connection errors. 

Refer to [node-oracledb](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#mutual-tls-connections-to-oracle-cloud-autonomous-database) for more information on working with TLS connections.
