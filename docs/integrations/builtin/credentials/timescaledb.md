---
title: TimescaleDB credentials
description: Documentation for TimescaleDB credentials. Use these credentials to authenticate TimescaleDB in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# TimescaleDB credentials

You can use these credentials to authenticate the following nodes:

- [TimescaleDB](/integrations/builtin/app-nodes/n8n-nodes-base.timescaledb.md)

## Prerequisites

An available instance of [TimescaleDB](https://www.timescale.com/).

## Supported authentication methods

- Database connection

## Related resources

Refer to the [Timescale documentation](https://docs.timescale.com/) for more information about the service.

## Using database connection

To configure this credential, you'll need:

- The **Host**: The fully qualified server name or IP address of your TimescaleDB server.
- The **Database**: The name of the database to connect to.
- A **User**: The user name you want to log in with.
- A **Password**: Enter the password for the database user you are connecting to.
- **Ignore SSL Issues**: If turned on, n8n will connect even if SSL certificate validation fails and you won't see the **SSL** selector.
- **SSL**: This setting controls the `ssl-mode` connection string for the connection. Options include:
    - **Allow**: Sets the `ssl-mode` parameter to `allow`. First try a non-SSL connection; if that fails, try an SSL connection.
    - **Disable**: Sets the `ssl-mode` parameter to `disable`. Only try a non-SSL connection.
    - **Require**: Sets the `ssl-mode` parameter to `require`, which is the default for TimescaleDB connection strings. Only try an SSL connection. If a root CA file is present, verify that a trusted certificate authority (CA) issued the server certificate.
- **Port**: The port number of the TimescaleDB server.

Refer to the [Timescale connection settings documentation](https://docs.tigerdata.com/integrations/latest/find-connection-details/) for more information about the non-SSL fields. Refer to [Connect with a stricter SSL](https://docs.tigerdata.com/use-timescale/latest/security/strict-ssl/) for more information about the SSL options.
