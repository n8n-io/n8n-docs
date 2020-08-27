---
permalink: /credentials/discord
---

# Discord
You can find information about the operations supported by the Discord node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.discord) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Discord).


## Prerequisites

Create a [Discord](https://www.discord.com/) account.

## How to get create a Discord Webhook

1. To create a Discord webhook that sends content to your channel, go to the settings of your channel.
2. Select 'Webhooks' from the sidebar.
3. Click on 'Create Webhook', name your bot, and copy the 'Webhook URL'.
4. Back in n8n, use the Webhook URL in your Discord Node.

![How to create a webhook in Discord](./gif-of-webhooks-in-discord.gif)

<!-- ## Using OAuth

1. Access this [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application".
3. Enter the name and click "Create".
4. Use Client Secret and Client ID in your Discord node credentials in n8n.
5. Enter n8n provided redirect URL in the configuration. ![Redirect URL Explanation here](../README.md).


![Getting Discord credentials](./using-oauth.gif) -->
