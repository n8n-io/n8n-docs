---
title: QuestDB credentials
description: >-
  Documentation for QuestDB credentials. Use these credentials to authenticate
  QuestDB in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: QuestDB credentials
originalFilePath: integrations/builtin/credentials/questdb.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/questdb'
url: 'https://docs.n8n.io/integrations/builtin/credentials/questdb'
layout:
  description:
    visible: false
---

# QuestDB credentials <a href="#questdb-credentials" id="questdb-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [QuestDB](../app-nodes/n8n-nodes-base.questdb.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a user account on an instance of [QuestDB](https://questdb.io/).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Database connection

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [QuestDB's documentation](https://questdb.io/docs) for more information about the service.

## Using database connection <a href="#using-database-connection" id="using-database-connection"></a>

To configure this credential, you'll need:

- The **Host**: Enter the host name or IP address for the server.
- The **Database**: Enter the database name, for example `qdb`.
- A **User**: Enter the username for the user account as configured in `pg.user` or `pg.readonly.user` property in `server.conf`. Default value is `admin`.
- A **Password**: Enter the password for the user account as configured in `pg.password` or `pg.readonly.password` property in `server.conf`. Default value is `quest`.
- **SSL**: Select whether the connection should use SSL. Options include:
    - **Allow**: Connect over SSL.
    - **Disable**: Connect without SSL.
    - **Require**: Connect over SSL.
- A **CA Certificate**: Optional. Enter the PEM-encoded certificate authority that signed the server's certificate. Use this when your QuestDB presents a certificate that a public certificate authority didn't sign. This replaces the certificate authorities that n8n trusts by default rather than adding to them, so include every authority in the server's chain. This field appears when **SSL** is **Allow** or **Require**.
- **Ignore SSL Issues (Insecure)**: Optional. If turned on, n8n keeps the connection encrypted but doesn't check the server's certificate. You can't use this together with a **CA Certificate**, because skipping the check would ignore the certificate authority you supplied. This field appears when **SSL** is **Allow** or **Require**.
- The **Port**: Enter the port number to use for the connection. Default is `8812`.

QuestDB supports SSL on its PostgreSQL endpoint in QuestDB Enterprise and QuestDB Cloud only. Refer to [TLS](https://questdb.io/docs/operations/tls/) and the [List of supported connection properties](https://questdb.io/docs/reference/api/postgres/#list-of-supported-connection-properties) for more information.
