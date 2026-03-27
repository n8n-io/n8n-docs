---
title: Telegram credentials
description: Documentation for Telegram credentials. Use these credentials to authenticate Telegram in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# Telegram credentials

You can use these credentials to authenticate the following nodes:

- [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md)
- [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/index.md)

## Prerequisites

Create a [Telegram](https://telegram.org/) account.

## Supported authentication methods

- API bot access token

## Related resources

Refer to [Telegram's Bot API documentation](https://core.telegram.org/bots/api) for more information about the service.

Refer to the [Telegram Bot Features](https://core.telegram.org/bots/features) documentation for more information on creating and working with bots.

## Using API bot access token

To configure this credential, you'll need:

- A bot **Access Token**

To generate your access token:

1. Start a chat with the [BotFather](https://telegram.me/BotFather).
2. Enter the `/newbot` command to create a new bot.
3. The BotFather will ask you for a name and username for your new bot:
    * The **name** is the bot's name displayed in contact details and elsewhere. You can change the bot name later.
    * The **username** is a short name used in search, mentions, and t.me links. Use these guidelines when creating your username:
        * Must be between 5 and 32 characters long.
        * Not case sensitive.
        * May only include Latin characters, numbers, and underscores.
        * Must end in `bot`, like `tetris_bot` or `TetrisBot`.
        * You can't change the username later.
3. Copy the bot **token** the BotFather generates and add it as the **Access Token** in n8n.

Refer to the [BotFather Create a new bot documentation](https://core.telegram.org/bots/features#creating-a-new-bot) for more information.
