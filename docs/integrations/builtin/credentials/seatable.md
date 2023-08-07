---
title: SeaTable credentials
description: Documentation for SeaTable credentials. Use these credentials to authenticate SeaTable in n8n, a workflow automation platform.
contentType: integration
---

# SeaTable credentials

You can use these credentials to authenticate the following nodes:

- [SeaTable](/integrations/builtin/app-nodes/n8n-nodes-base.seatable/)
- [SeaTable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.seatabletrigger/)

## Prerequisites

You need to have a [SeaTable](https://seatable.io/en/) instance or cloud account.

## Using API key

From your SeaTable dashboard:

1. From the **Bases** menu select the base you want to enable access for.
2. Navigate to the base options > **Advanced** > **API Token**.
3. In the modal, enter a name for this token and select the **Read-Write** permission.
4. Click **Submit** and copy the new API token.

From n8n:

1. Select your environment type: **Cloud-hosted** or **Self-hosted**.
2. For **Self-hosted** environments enter the domain of your instance.
3. Enter the API token obtained above and click **Save** to create your credential.

