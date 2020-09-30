---
permalink: /credentials/discord
description: Learn to configure credentials for the Discord node in n8n
---

# Discord
You can follow these instructions to create a webhook in Discord to use with the following nodes.
- [Discord](../../nodes-library/nodes/Discord/README.md)


## Prerequisites

Create a [Discord](https://www.discord.com/) account.

## Creating a webhook in Discord

1. To create a webhook in Discord that sends content to your channel, go to the settings of your channel.
2. Select 'Integrations' from the sidebar.
3. Click on the ***Create Webhook*** button.
4. Name your bot, and click on the ***Copy Webhook URL*** button to copy the webhook URL.
5. Back in n8n, use the copied webhook URL in your Discord node.

![How to create a webhook in Discord](./create-webhook.gif)

<!-- ## Using OAuth

1. Access this [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application".
3. Enter the name and click "Create".
4. Use Client Secret and Client ID in your Discord node credentials in n8n.
5. Enter n8n provided redirect URL in the configuration. ![Redirect URL Explanation here](../README.md).


![Getting Discord credentials](./using-oauth.gif) -->
