---
title: Postgres credentials
description: Documentation for Postgres credentials. Use these credentials to authenticate Postgres in n8n, a workflow automation platform.
contentType: integration
---

# Postgres credentials

You can use these credentials to authenticate the following nodes:

- [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
- [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)

/// note | Agent node users
The Agent node doesn't support SSH tunnels.
///

## Prerequisites

[Create a user account](https://www.postgresql.org/docs/current/sql-createuser.html) on a Postgres server. 

## Supported authentication methods

- Database connection

## Related resources

Refer to [Postgres's documentation](https://www.postgresql.org/docs/16/index.html){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential, you'll need:

- The **Host**: Enter the host or domain name for the server.
- The **Database**: Enter the database name.
- A **User** name: Enter the username for the user account.
- A user **Password**: Enter the password for the user account.
- **Ignore SSL Issues**: When turned on, the credential will connect even if SSL validation fails.
- **SSL**: Choose whether to use SSL in your connection. Refer to Postgres [SSL Support](https://www.postgresql.org/docs/16/libpq-ssl.html){:target=_blank .external-link} for more information. Options include:
    - **Allow**: Sets the `ssl-mode` parameter to `allow`. First try a non-SSL connection; if that fails, try an SSL connection.
    - **Disable**: Sets the `ssl-mode` parameter to `disable`. Only try a non-SSL connection.
    - **Require**: Sets the `ssl-mode` parameter to `require`. Only try an SSL connection. If a root CA file is present, verify that a trusted certificate authority (CA) issued the server certificate.
    - **Verify**: Sets the `ssl-mode` parameter to `verify-ca`. Only try an SSL connection and verify that a trusted certificate authority (CA) issued the server certificate.
    - **Verify-Full**: Sets the `ssl-mode` parameter to `verify-full`. Only try an SSL connection, verify that a trusted certificate authority (CA) issued the server certificate and that the requested server host name matches that in the certificate.
- The **Port**: Enter the port number to use for the connection.
- **SSH Tunnel**: If turned on, the credential uses SSH to encrypt the network connection with the Postgres server. Refer to [Using SSH tunnel](#using-ssh-tunnel) for more information.

Refer to [Connection Strings](https://www.postgresql.org/docs/16/libpq-connect.html#LIBPQ-CONNSTRING){:target=_blank .external-link} for more information on finding and formatting these fields.

### SSH tunnel

Only turn on the **SSH Tunnel** if:

- You're using the credential with the [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/) node (Agent node doesn't support SSH tunnels).
- You have an SSH server running on the same machine as the Postgres server.
- You can log in using `ssh` as some user.

Once turned on, you'll need:

- **SSH Authenticate with**: Select whether to authenticate SSH with a **Password** or **Private Key**.
- **SSH Host**: Enter the remote bind address you're connecting to.
- **SSH Port**: Enter the local port number for the SSH tunnel.
- **SSH Postgres Port**: Enter the remote end of the tunnel, the port number the database server is using.
- **SSH User**: Enter the username to log in as.
- **SSH Password**: Only required if you selected **Password** as the **SSH Authenticate with** type. Enter the user's SSH password.
- **Private Key**: Only required if you selected **Private Key** as the **SSH Authenticate with** type.
- **Passphrase**: Only required if you selected **Private Key** as the **SSH Authenticate with** type.

Refer to [Secure TCP/IP Connections with SSH Tunnels](https://www.postgresql.org/docs/16/ssh-tunnels.html){:target=_blank .external-link} for more information.
