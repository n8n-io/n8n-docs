---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MySQL credentials
description: Documentation for MySQL credentials. Use these credentials to authenticate MySQL in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# MySQL credentials

You can use these credentials to authenticate the following nodes:

- [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)
- [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)

/// note | Agent node users
The Agent node doesn't support SSH tunnels.
///

## Prerequisites

Create a user account on a [MySQL](https://www.mysql.com/){:target=_blank .external-link} server database.

## Supported authentication methods

- Database connection

## Related resources

Refer to [MySQL's documentation](https://dev.mysql.com/doc/refman/8.3/en/){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential, you'll need:

- The server **Host**: The database's host name or IP address.
- The **Database** name.
- A **User** name.
- A **Password** for that user.
- The **Port** number used by the MySQL server.
- **Connect Timeout**: The number of milliseconds during the initial database connection before a timeout occurs.
- **SSL**: If your database is using SSL, turn this on and add details for the SSL certificate.
- **SSH Tunnel**: Choose whether to connect over an SSH tunnel. An SSH tunnel lets un-encrypted traffic pass over an encrypted connection and enables authorized remote access to servers protected from outside connections by a firewall.

To set up your database connection credential:

1. Enter your database's hostname as the **Host** in your n8n credential. Run this query to confirm the hostname:

    ```
    SHOW VARIABLES WHERE Variable_name = 'hostname';
    ```

2. Enter your database's name as the **Database** in your n8n credential. Run this query to confirm the database name:

    ```
    SHOW DATABASES;
    ```

3. Enter the username of a **User** in the database. This user should have appropriate permissions for whatever actions you want n8n to perform.
4. Enter the **Password** for that user.
5. Enter the **Port** number used by the MySQL server (default is `3306`). Run this query to confirm the port number:

    ```
    SHOW VARIABLES WHERE Variable_name = 'port';
    ```

6. Enter the **Connect Timeout** you'd like the node to use. The Connect Timeout is the number of milliseconds during the initial database connection the node should wait before timing out. n8n defaults to `1000` which is the default used by MySQL of 10 seconds. If you want to match your database's `connect_timeout`, run this query to get it, then multiply by 100 before entering it in n8n:

    ```
    SHOW VARIABLES WHERE Variable_name = 'connect_timeout';
    ```

7. If your database uses SSL and you'd like to use **SSL** for the connection, turn this option on in the credential. If you turn it on, enter the information from your MySQL SSL certificate in these fields:
    1. Enter the `ca.pem` file contents in the **CA Certificate** field.
    2. Enter the `client-key.pem` file contents in the **Client Private Key** field.
    3. Enter the `client-cert.pem` file contents in the **Client Certificate** field.
8. If you want to use **SSH Tunnel** for the connection, turn this option on in the credential. Otherwise, skip it. If you turn it on:
    1. Select the **SSH Authenticate with** to set the SSH Tunnel type to build:
        - Select **Password** if you want to connect to SSH using a password.
        - Select **Private Key** if you want to connect to SSH using an identity file (private key) and a passphrase. 
    2. Enter the **SSH Host**. n8n uses this host to create the SSH URI formatted as: `[user@]host:port`.
    3. Enter the **SSH Port**. n8n uses this port to create the SSH URI formatted as: `[user@]host:port`.
    4. Enter the **SSH User** to connect with. n8n uses this user to create the SSH URI formatted as: `[user@]host:port`.
    5. If you selected **Password** for **SSH Authenticate with**, add the **SSH Password**.
    6. If you selected **Private Key** for **SSH Authenticate with**:
        1. Add the contents of the **Private Key** or identity file used for SSH. This is the same as using the `ssh-identity-file` option with the `shell-connect()` command in MySQL.
        2. If the **Private Key** was created with a passphrase, enter that **Passphrase**. This is the same as using the `ssh-identity-pass` option with the `shell-connect()` command in MySQL. If the **Private Key** has no passphrase, leave this field blank.

Refer to [MySQL | Creating SSL and RSA Certificates and Keys](https://dev.mysql.com/doc/refman/8.0/en/creating-ssl-rsa-files.html){:target=_blank .external-link} for more information on working with SSL certificates in MySQL. Refer to [MySQL | Using an SSH Tunnel](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-connection-ssh.html){:target=_blank .external-link} for more information on working with SSH tunnels in MySQL.
