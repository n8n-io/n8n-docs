---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Discord credentials
description: Documentation for Discord credentials. Use these credentials to authenticate Discord in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Discord credentials

You can use these credentials to authenticate the following nodes:

- [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/)

## Prerequisites

- Create a [Discord](https://www.discord.com/){:target=_blank .external-link} account.
- For Bot and OAuth2 credentials:
    - [Set up your local developer environment](https://discord.com/developers/docs/quick-start/getting-started#step-0-project-setup){:target=_blank .external-link}.
    - [Create an application and a bot user](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app){:target=_blank .external-link}.
- For webhook credentials, [create a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks){:target=_blank .external-link}.

## Supported authentication methods

- Bot
- OAuth2
- Webhook

Not sure which method to use? Refer to [How to choose an authentication method](#how-to-choose-an-authentication-method) for more guidance.

## Related resources

Refer to [Discord's Developer documentation](https://discord.com/developers/docs/intro){:target=_blank .external-link} for more information about the service.

## Using bot

Use this method if you want to add the bot to your Discord server using a bot token rather than OAuth2.

To configure this credential, you'll need:

- A **Bot Token**: Generated once you create an application with a bot.

To create an application with a bot and generate the **Bot Token**:

1. If you don't have one already, create an app in the [developer portal](https://discord.com/developers/applications?new_application=true){:target=_blank .external-link}.
2. Enter a **Name** for your app.
3. Select **Create**.
4. In your Discord project folder on your local environment, rename the `.sample.env` file to `.env`. You'll store your app's credentials there.
5. From the app's **General Information** page, copy the **Application ID**. In your `.env` file, replace `<YOUR_APP_ID>` with the copied ID.
6. From the app's **General Information** page, copy the **Public Key**. In your `.env` file, replace `<YOUR_PUBLIC_KEY>` with the copied key.
7. Select **Bot** from the left menu.
8. Under **Token**, select **Reset Token** to generate a new bot token. In your `.env` file, replace `<YOUR_BOT_TOKEN>` with the copied token.
9. Add this bot token to your n8n credential.
10. In **Bot > Privileged Gateway Intents**, n8n recommends activating **SERVER MEMBERS INTENT: Required for your bot to receive events listed under GUILD_MEMBERS**. Refer to [Configuring your bot](https://discord.com/developers/docs/quick-start/getting-started#configuring-your-bot){:target=_blank .external-link} for more information on privileged intents.
11. In **Installation > Installation Contexts**, select the installation contexts you want your bot to use:
    - Select **Guild Install** for server-installed apps. (Most common for n8n users.)
    - Select **User Install** for user-installed apps. (Less common for n8n users.)
    - Refer to Discord's [Choosing installation contexts](https://discord.com/developers/docs/quick-start/getting-started#choosing-installation-contexts){:target=_blank .external-link} documentation for more information about these installation contexts.
12. In **Installation > Install Link**, select **Discord Provided Link** if it's not already selected.
13. Still on the **Installation** page, in the **Default Install Settings** section, select `applications.commands` and `bot` scopes. Refer to Discord's [Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes){:target=_blank .external-link} documentation for more information about these and other scopes.
14. Add permissions on the **Bot > Bot Permissions** page. Refer to Discord's [Permissions](https://discord.com/developers/docs/topics/permissions){:target=_blank .external-link} documentation for more information. n8n recommends selecting these permissions for the [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/) node:
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
15. Add the app to your server:
    1. Go to **Installation > Install Link** and copy the link listed there.
    2. For **Guild Install** tests, add this to your test server or live server:
        1. Paste the link in your browser and hit Enter.
        1. Select "Add to server" in the installation prompt.
        1. Once your app's added to your test server, you'll see it in the member list.
    4. For **User Install**, add the app to your user account:
        1. Paste the same link in your browser and hit Enter again.
        1. Select **Add to my apps** in the installation prompt.
        1. Follow the prompt to install to your user account.
        1. Once your app's installed to your user account, you can open a DM with it.

Refer to the [Discord Creating an App](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app){:target=_blank .external-link} guide for more information.

## Using OAuth2

Use this method if you want to add the bot to Discord servers using the OAuth2 flow, which simplifies the process for those installing your app.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**
- Choose whether to send **Authentication** in the **Header** or **Body**
- A **Bot Token**

For details on creating an application with a bot and generating the token, follow the same steps as in [Using Bot](#using-bot) above.

Then:

1. Copy the **Bot Token** you generate and add it into the n8n credential.
2. Open the **OAuth2** page in your Discord application to access your **Client ID** and generate a **Client Secret**. Add these to your n8n credential.
3. From n8n, copy the **OAuth Redirect URL** and add it into the Discord application in **OAuth2 > Redirects**. Be sure you save these changes.

## Using webhook

To configure this credential, you'll need:

- A **Webhook URL**: Generated once you create a webhook.

To get a Webhook URL, you create a webhook and copy the URL that gets generated:

1. Open your Discord **Server Settings** and open the Integrations tab.
2. Select "Create Webhook" to create a new webhook.
3. Give your webhook a **Name** that makes sense.
3. Select the **avatar** next to the **Name** to edit or upload a new avatar.
4. In the **CHANNEL** dropdown, select the channel the webhook should post to.
5. Select **Copy Webhook URL** to copy the Webhook URL. Enter this URL in your n8n credential.

Refer to the [Discord Making a Webhook documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks){:target=_blank .external-link} for more information.

## How to choose an authentication method

The simplest installation is a **webhook**. You create and add webhooks to a single channel on a Discord server. Webhooks can post messages to a channel. They don't require a bot user or authentication. But they can't listen or respond to user requests or commands. If you need a straightforward way to send messages to a channel without the need for interaction or feedback, use a webhook.

A **bot** is an interactive step up from a webhook. You add bots to the Discord server (referred to as a `guild` in the Discord API documentation) or to user accounts. Bots added to the server can interact with users on all the server's channels. They can manage channels, send and retrieve messages, retrieve the list of all users, and change their roles. If you need to build an interactive, complex, or multi-step workflow, use a bot.

**OAuth2** is basically a **bot** that uses an OAuth2 flow rather than just the bot token. As with bots, you add these to the Discord server or to user accounts. These credentials offer the same functionalities as bots, but they can simplify the installation of the bot on your server.

