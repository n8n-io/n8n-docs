---
title: Discord credentials
description: Documentation for Discord credentials. Use these credentials to authenticate Discord in n8n, a workflow automation platform.
contentType: integration
---

# Discord credentials
You can follow these instructions to connect the following nodes with Discord:

- [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/)


## Prerequisites

Create a [Discord](https://www.discord.com/) account

## Which type of credentials to use

- **Bot Token:** bots are added to a Discord server and can interact with users on all the server’s channels. They can manage channels, send and retrieve messages, retrieve the list of all users, and change their roles. If you need to build an interactive, complex, or multi-step workflow use a bot.
- **OAuth2:** OAuth credentials offer the same functionalities as the Bot Token. The difference is that it simplifies the installation of the bot on your server.
- **Webhook:** webhooks are added to a single channel in a server. They're a simple way to post messages to a channel. They do not require a bot user or authentication, making them easier to set up for simple use cases. However, they can't listen or respond to user requests or commands. If you need a straightforward way to send messages to a channel, without the need for interaction or feedback, a webhook is sufficient.

## Bot Token manual installation

Use this method if you want to add the bot to your Discord server manually (without using OAuth2).

1. Go to the [Applications](https://discord.com/developers/applications){:target=_blank .external-link} page on the Discord developers portal
2. Select or create an application
3. In the application page, go to **Bot**, and in **Privileged Gateway Intents**, activate **Required for your bot to receive events listed under GUILD_MEMBERS**
4. Generate a bot token by clicking on **Reset Token**
5. Copy the token and paste it in the **Bot Token** parameter in the n8n's Discord Bot credentials modal, and Save
6. Go to **Oauth2** > **URL Generator**
7. In the **Scopes** list, select **bot**
8. In the **Bot permissions** list below activate:
    - Manage Roles
    - Manage Channels
    - Read Messages/View Channels
    - Send Messages
    - Create Public Threads
    - Create Private Threads
    - Send Messages in Threads
    - Send TTS Messages
    - Manage Messages
    - Manage Threads
    - Embed Links
    - Attach Files
    - Read Message History
    - Add Reactions    
9. Copy the URL clicking on **Copy** In **Generated URL** at the bottom
10. Open the copied URL in a new browser tab and follow the instructions to add the Bot to a server
    - In **Add to Server** select the server you want to add the Bot to, and click **Continue**
    - In the following page, click on **Authorize**

## Bot Token OAuth2 installation

This process simplifies the addition of your Bot to the Discord server.

1. Go to the [Applications](https://discord.com/developers/applications){:target=_blank .external-link} page on the Discord developers portal
2. Select or create an application
3. ? In the application page, go to **Bot**, and in **Privileged Gateway Intents**, activate **Required for your bot to receive events listed under GUILD_MEMBERS**
4. Copy the CLIENT ID in the **OAuth2** page and paste it into the Client ID parameter in the n8n's Discord OAuth2 API credential modal
5. Generate a CLIENT SECRET in the **OAuth2** page and paste it into the Client Secret parameter in the n8n's Discord OAuth2 API credential modal
6. Copy the OAuth Redirect URL in n8n and add it to the **Redirects** list in your Discord app and save
7. In the Discord developer portal, go to the Bot page  of your app and copy the Bot Token (Generate one if you don’t have it yet)
8. Paste the Bot Token in n8n
9. Select **Connect my account** in the n8n Discord OAuth2 API credential modal
10. n8n displays a window where must select the Discord server and the permission you want to set for your bot

## Creating a webhook

1. To create a webhook in Discord that sends content to your channel, go to the settings of your channel.
2. Select **Integrations** from the sidebar.
3. Select **Create Webhook**.
4. Name your bot, and select **Copy Webhook URL** to copy the webhook URL.
5. Back in n8n, paste the copied webhook URL in the **Webhook URL** parameter of the Discord credentials.

![How to create a webhook in Discord](/_images/integrations/builtin/credentials/discord/create-webhook.gif)

<!-- ## Using OAuth

1. Access this [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application".
3. Enter the name and click "Create".
4. Use Client Secret and Client ID in your Discord node credentials in n8n.
5. Enter n8n provided redirect URL in the configuration. ![Redirect URL Explanation here](/).


![Getting Discord credentials](/_images/integrations/builtin/credentials/discord/using-oauth.gif) -->

