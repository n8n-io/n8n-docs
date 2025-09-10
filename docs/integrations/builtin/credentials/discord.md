---
title: Discord credentials
description: Documentation for Discord credentials. Use these credentials to authenticate Discord in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Discord credentials

You can use these credentials to authenticate the following nodes:

- [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md)

## Prerequisites

- Create a [Discord](https://www.discord.com/) account.
- For Bot and OAuth2 credentials:
    - [Set up your local developer environment](https://discord.com/developers/docs/quick-start/getting-started#step-0-project-setup).
    - [Create an application and a bot user](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app).
- For webhook credentials, [create a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Supported authentication methods

- Bot
- OAuth2
- Webhook

Not sure which method to use? Refer to [Choose an authentication method](#choose-an-authentication-method) for more guidance.

## Related resources

Refer to [Discord's Developer documentation](https://discord.com/developers/docs/intro) for more information about the service.

## Using bot

Use this method if you want to add the bot to your Discord server using a bot token rather than OAuth2.

To configure this credential, you'll need:

- A **Bot Token**: Generated once you create an application with a bot.

To create an application with a bot and generate the **Bot Token**:

1. If you don't have one already, create an app in the [developer portal](https://discord.com/developers/applications?new_application=true).
2. Enter a **Name** for your app.
3. Select **Create**.
4. Select **Bot** from the left menu.
5. Under **Token**, select **Reset Token** to generate a new bot token. 
6. Copy the token and add it to your n8n credential.
7. In **Bot > Privileged Gateway Intents**, add any privileged intents you want your bot to have. Refer to [Configuring your bot](https://discord.com/developers/docs/quick-start/getting-started#configuring-your-bot) for more information on privileged intents.
    - n8n recommends activating **SERVER MEMBERS INTENT: Required for your bot to receive events listed under GUILD_MEMBERS**. 
8. In **Installation > Installation Contexts**, select the installation contexts you want your bot to use:
    - Select **Guild Install** for server-installed apps. (Most common for n8n users.)
    - Select **User Install** for user-installed apps. (Less common for n8n users, but may be useful for testing.)
    - Refer to Discord's [Choosing installation contexts](https://discord.com/developers/docs/quick-start/getting-started#choosing-installation-contexts) documentation for more information about these installation contexts.
9. In **Installation > Install Link**, select **Discord Provided Link** if it's not already selected.
10. Still on the **Installation** page, in the **Default Install Settings** section, select `applications.commands` and `bot` scopes. Refer to Discord's [Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) documentation for more information about these and other scopes.
11. Add permissions on the **Bot > Bot Permissions** page. Refer to Discord's [Permissions](https://discord.com/developers/docs/topics/permissions) documentation for more information. n8n recommends selecting these permissions for the [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md) node:
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
12. Add the app to your server or test server:
    1. Go to **Installation > Install Link** and copy the link listed there.
    2. Paste the link in your browser and hit Enter.
    1. Select **Add to server** in the installation prompt.
    1. Once your app's added to your server, you'll see it in the member list.

These steps outline the basic functionality needed to set up your n8n credential. Refer to the [Discord Creating an App](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) guide for more information on creating an app, especially:

- [Fetching your credentials](https://discord.com/developers/docs/quick-start/getting-started#fetching-your-credentials) for getting your app's credentials into your local developer environment.
- [Handling interactivity](https://discord.com/developers/docs/quick-start/getting-started#step-3-handling-interactivity) for information on setting up public endpoints for interactive `/slash` commands.

## Using OAuth2

Use this method if you want to add the bot to Discord servers using the OAuth2 flow, which simplifies the process for those installing your app.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**
- Choose whether to send **Authentication** in the **Header** or **Body**
- A **Bot Token**

For details on creating an application with a bot and generating the token, follow the same steps as in [Using bot](#using-bot) above.

Then:

1. Copy the **Bot Token** you generate and add it into the n8n credential.
2. Open the **OAuth2** page in your Discord application to access your **Client ID** and generate a **Client Secret**. Add these to your n8n credential.
3. From n8n, copy the **OAuth Redirect URL** and add it into the Discord application in **OAuth2 > Redirects**. Be sure you save these changes.

## Using webhook

To configure this credential, you'll need:

- A **Webhook URL**: Generated once you create a webhook.

To get a Webhook URL, you create a webhook and copy the URL that gets generated:

1. Open your Discord **Server Settings** and open the **Integrations** tab.
2. Select **Create Webhook** to create a new webhook.
3. Give your webhook a **Name** that makes sense.
3. Select the **avatar** next to the **Name** to edit or upload a new avatar.
4. In the **CHANNEL** dropdown, select the channel the webhook should post to.
5. Select **Copy Webhook URL** to copy the Webhook URL. Enter this URL in your n8n credential.

Refer to the [Discord Making a Webhook documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.

## Choose an authentication method

The simplest installation is a **webhook**. You create and add webhooks to a single channel on a Discord server. Webhooks can post messages to a channel. They don't require a bot user or authentication. But they can't listen or respond to user requests or commands. If you need a straightforward way to send messages to a channel without the need for interaction or feedback, use a webhook.

A **bot** is an interactive step up from a webhook. You add bots to the Discord server (referred to as a `guild` in the Discord API documentation) or to user accounts. Bots added to the server can interact with users on all the server's channels. They can manage channels, send and retrieve messages, retrieve the list of all users, and change their roles. If you need to build an interactive, complex, or multi-step workflow, use a bot.

**OAuth2** is basically a **bot** that uses an OAuth2 flow rather than just the bot token. As with bots, you add these to the Discord server or to user accounts. These credentials offer the same functionalities as bots, but they can simplify the installation of the bot on your server.

