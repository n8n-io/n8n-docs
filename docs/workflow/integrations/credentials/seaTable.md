# SeaTable

You can use these credentials to authenticate the following nodes:

- [SeaTable](/workflow/integrations/nodes/n8n-nodes-base.seaTable/)
- [SeaTable Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.seaTableTrigger/)

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
