---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Oracle Database credentials
description: Documentation for Oracle Database credentials. Use these credentials to authenticate Oracle Database in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Oracle Database credentials

You can use these credentials to authenticate the following nodes:

- [OracleDB](/docs/integrations/builtin/app-nodes/n8n-nodes-base.oracledb/index.md)
- [Agent](/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)

/// note | Agent node users
The Agent node doesn't support SSH tunnels.
///

## Prerequisites

Create a user account on a [OracleDB](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/CREATE-USER.html) server database.

## Supported authentication methods

- Database connection

## Related resources

Refer to [OracleDB's documentation](https://docs.oracle.com/en/database/oracle/oracle-database) for more information about the service.

## Using database connection

To configure this credential, you'll need:

- A **User** name.
- A **Password** for that user.
- **Connection String**: The Oracle database instance to connect to. The string can be an Easy Connect string, or a Net Service Name from a tnsnames.ora file, or the name of a local Oracle database instance.
- **Use SSL**: If your Connection String is using SSL, turn this on and configure additional details for the SSL Authentication.
- **Wallet Password**: The password to decrypt the Privacy Enhanced Mail (PEM)-encoded private certificate, if it is encrypted.
- **Wallet Content**: The security credentials required to establish a mutual TLS (mTLS) connection to Oracle Database.
- **Distinguished Name**: The distinguished name (DN) that should be matched with the certificate DN.
- **Match Distinguished Name**: Whether the server certificate DN should be matched in addition to the regular certificate verification that is performed.
- **Allow Weak Distinguished Name Match**: Whether the secure DN matching behavior which checks both the listener and server certificates has to be performed.
- **Use Optional Oracle Client Libraries**: If you want to use node-oracledb Thick mode, turn this on. The process environment variables, **NODE_ORACLEDB_CLIENT_LIB_DIR** and **NODE_ORACLEDB_CLIENT_CONFIG_DIR** have to be defined for Thick mode to work.
- **Pool Min**: The number of connections established to the database when a pool is created.
- **Pool Max**: The maximum number of connections to which a connection pool can grow.
- **Pool Increment**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Pool Maximum Session Life Time**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Pool Connection Idle Timeout**: The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
- **Connection Class Name**: DRCP/PRCP Connection Class.
- **Connection Timeout**: The timeout duration in seconds for an application to establish an Oracle Net connection.
- **Transport Connection Timeout**: The maximum number of seconds to wait to establish a connection to the database host.
- **Keepalive Probe Interval**: The number of minutes between the sending of keepalive probes.


To set up your database connection credential:

1. Enter your database's username as the **User** in your n8n credential. Run this query to confirm the username:

    ```
    SELECT SYS_CONTEXT('USERENV', 'SESSION_USER')   AS session_user FROM dual;
    ```

2. Enter your database's connection string as the **Connection String** in your n8n credential. Run this query to confirm the database name:

    ```
    SELECT SYS_CONTEXT('USERENV', 'CON_NAME') AS current_pdb FROM dual;
    ```

3. If your database uses SSL and you'd like to use **SSL** for the connection, turn this option on in the credential. If you turn it on, enter the information of your OracleDB SSL certificate in these fields:
    1. Enter the output of PEM-encoded wallet file, **ewallet.pem** contents after retaining the new lines. The command `node -e "console.log('{{\"' + require('fs').readFileSync('ewallet.pem', 'utf8').split('\n').join('\\\\n') + '\"}}')"` can be used to dump file contents in the **Wallet Content** field.

Refer to [Node OracleDB ](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#mutual-tls-connections-to-oracle-cloud-autonomous-database) for more information on working with TLS connections.
