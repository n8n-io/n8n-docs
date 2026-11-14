---
title: SeaTable credentials
description: >-
  Documentation for SeaTable credentials. Use these credentials to authenticate
  SeaTable in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: SeaTable credentials
originalFilePath: integrations/builtin/credentials/seatable.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/seatable'
url: 'https://docs.n8n.io/integrations/builtin/credentials/seatable'
layout:
  description:
    visible: false
---

# SeaTable credentials <a href="#seatable-credentials" id="seatable-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [SeaTable](../app-nodes/n8n-nodes-base.seatable.md)
- [SeaTable Trigger](../trigger-nodes/n8n-nodes-base.seatabletrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [SeaTable](https://seatable.io/en/) account on either a cloud or self-hosted SeaTable server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [SeaTable's API documentation](https://api.seatable.io) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **Environment**: Select the environment that matches your SeaTable instance:
    - **Cloud-Hosted**
    - **Self-Hosted**
- An **API Token (of a Base)**: Generate a **Base-Token** in SeaTable from the base options > **Advanced > API Token**.
    - Use **Read-Write** permission for your token.
    - Refer to [Creating an API token](https://seatable.io/en/docs/seatable-api/erzeugen-eines-api-tokens/) for more information.
- A **Timezone**: Select the timezone of your SeaTable server.

