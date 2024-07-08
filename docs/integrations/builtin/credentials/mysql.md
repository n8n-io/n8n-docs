---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MySQL credentials
description: Documentation for MySQL credentials. Use these credentials to authenticate MySQL in n8n, a workflow automation platform.
contentType: integration
---

# MySQL credentials

You can use these credentials to authenticate the following nodes:

- [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)
- [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)

/// note | Agent node users
The Agent node doesn't support tunnels
///

## Prerequisites

Create a user account on a [MySQL](https://www.mysql.com/){:target=_blank .external-link} server database.

## Supported authentication methods

- Database connection

## Related resources

Refer to [MySQL's documentation](https://dev.mysql.com/doc/refman/8.3/en/){:target=_blank .external-link} for more information about the service.

## Using Database Connection

To configure this credential, you'll need:

- The server **Host**: The host name or IP address the database is hosted on.
- The **Database** name
- A **User** name: The user should have appropriate access privileges.
- A **Password** for that user
- The **Port** number: The port number used by the MySQL server (default is 3306).
- The **Connect Timeout**: The number of milliseconds during the initial database connection before a timeout occurs.
- Whether to use **SSL** for the connection: if turned on, also enter:
    - The SSL **CA Certificate**
    - The **Client Private Key**
    - The **Client Certificate**
- Whether to use **SSH Tunnel**: if turned on, also enter:
    - Select the **SSH Authenticate with** either `Password` or `Private Key`
    - The **SSH Host**
    - The **SSH Port**
    - The **SSH MySQL Port**
    - The **SSH User**
    - If you selected **Password** for **SSH Authenticate with**, add the **SSH Password**.
    - If you selected **Private Key** for **SSH Authenticate with**, add the **Private Key** and **Passphrase**.

Refer to [MySQL Using Encrypted Connections documentation](https://dev.mysql.com/doc/refman/8.0/en/encrypted-connections.html){:target=_blank .external-link} for more information on SSL and SSH.
