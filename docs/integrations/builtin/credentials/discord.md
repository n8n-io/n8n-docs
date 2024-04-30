---
title: Discord credentials
description: Documentation for Discord credentials. Use these credentials to authenticate Discord in n8n, a workflow automation platform.
contentType: integration
---

# Discord credentials

You can use these credentials to authenticate the following nodes:

- [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/)

## Prerequisites

- Create a [Discord](https://www.discord.com/){:target=_blank .external-link} account.
- For Bot and OAuth2 credentials, [create an application and a bot user](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app){:target=_blank .external-link}.
- For webhook credentials, [create a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks){:target=_blank .external-link}.

## Supported authentication methods

- Bot
- OAuth2
- Webhook

Not sure which method to use? See [Which method do I use?](#which-method-should-i-use) for more guidance.

## Related resources

Refer to [Discord's Developer documentation](https://discord.com/developers/docs/intro){:target=_blank .external-link} for more information about the service.

## Using Bot

Use this method if you want to add the bot to your Discord server using a bot token rather than OAuth2.

To configure this credential, you'll need:

- A **Bot Token**

For details on creating an application with a bot and generating the token, see the [Discord Creating an App](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app){:target=_blank .external-link} guide. Follow the instructions to configure your bot, add scopes and bot permissions (do not forget the `bot` scope!), and install the application. Copy the **Bot Token** you generate and add it into the n8n credential.

n8n recommends using these settings when you create your application:

- In **Bot > Privileged Gateway Intents**, activate **SERVER MEMBERS INTENT: Required for your bot to receive events listed under GUILD_MEMBERS**
- In **Bot > Bot Permissions**, select:
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

## Using Webhook

To configure this credential, you'll need:

- A **Webhook URL**

Refer to the [Discord Making a Webhook documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks){:target=_blank .external-link} to create a webhook. Copy the **Webhook URL** that gets generated and add this to your n8n credential.

## FAQs

### Which method should I use?

The simplest installation is a **webhook**. You create and add webhooks to a single channel on a Discord server. Webhooks can post messages to a channel. They don't require a bot user or authentication. But they can't listen or respond to user requests or commands. If you need a straightforward way to send messaged to a channel without the need for interaction or feedback, use a webhook.

A **bot** is an interactive step up from a webhook. You add bots to the Discord server (referred to as a `guild` in the Discord API documentation). Bots can interact with users on all the server's channels. They can manage channels, send and retrieve messages, retrieve the list of all users, and change their roles. If you need to build an interactive, complex, or multi-step workflow, use a bot.

**OAuth2** is basically a **bot** that uses an OAuth2 flow rather than just the bot token. As with bots, these are added to the Discord server. These credentials offer the same functionalities as bots, but they can simplify the installation of the bot on your server.

