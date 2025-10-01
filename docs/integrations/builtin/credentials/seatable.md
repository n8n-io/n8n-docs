---
title: SeaTable credentials
description: Documentation for SeaTable credentials. Use these credentials to authenticate SeaTable in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# SeaTable credentials

You can use these credentials to authenticate the following nodes:

- [SeaTable](/integrations/builtin/app-nodes/n8n-nodes-base.seatable.md)
- [SeaTable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.seatabletrigger.md)

## Prerequisites

Create a [SeaTable](https://seatable.io/en/) account on either a cloud or self-hosted SeaTable server.

## Supported authentication methods

- API key

## Related resources

Refer to [SeaTable's API documentation](https://api.seatable.io) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **Environment**: Select the environment that matches your SeaTable instance:
    - **Cloud-Hosted**
    - **Self-Hosted**
- An **API Token (of a Base)**: Generate a **Base-Token** in SeaTable from the base options > **Advanced > API Token**.
    - Use **Read-Write** permission for your token.
    - Refer to [Creating an API token](https://seatable.io/en/docs/seatable-api/erzeugen-eines-api-tokens/) for more information.
- A **Timezone**: Select the timezone of your SeaTable server.

