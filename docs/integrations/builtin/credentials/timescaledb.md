---
title: TimescaleDB credentials
description: >-
  Documentation for TimescaleDB credentials. Use these credentials to
  authenticate TimescaleDB in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: TimescaleDB credentials
originalFilePath: integrations/builtin/credentials/timescaledb.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/timescaledb'
url: 'https://docs.n8n.io/integrations/builtin/credentials/timescaledb'
layout:
  description:
    visible: false
---

# TimescaleDB credentials <a href="#timescaledb-credentials" id="timescaledb-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [TimescaleDB](../app-nodes/n8n-nodes-base.timescaledb.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

An available instance of [TimescaleDB](https://www.timescale.com/).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Database connection

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the [Timescale documentation](https://docs.timescale.com/) for more information about the service.

## Using database connection <a href="#using-database-connection" id="using-database-connection"></a>

To configure this credential, you'll need:

- The **Host**: The fully qualified server name or IP address of your TimescaleDB server.
- The **Database**: The name of the database to connect to.
- A **User**: The user name you want to log in with.
- A **Password**: Enter the password for the database user you are connecting to.
- **Ignore SSL Issues**: If turned on, n8n keeps the connection encrypted but doesn't check the server's certificate, so it connects to a server presenting a self-signed or hostname-mismatched certificate. n8n hides the **SSL** selector while this is on. A server with SSL switched off needs this turned off and **SSL** set to **Disable**.
- **SSL**: Whether to connect over SSL. Options include:
    - **Allow**: Connect over SSL and verify the server's certificate.
    - **Disable**: Connect without SSL.
    - **Require**: Connect over SSL and verify the server's certificate. Behaves the same as **Allow**.
- **Port**: The port number of the TimescaleDB server.

Refer to the [Timescale connection settings documentation](https://docs.tigerdata.com/integrations/latest/find-connection-details/) for more information about the non-SSL fields. Refer to [Connect with a stricter SSL](https://docs.tigerdata.com/use-timescale/latest/security/strict-ssl/) for more information about the SSL options.
