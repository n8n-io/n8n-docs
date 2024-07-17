---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram credentials
description: Documentation for Telegram credentials. Use these credentials to authenticate Telegram in n8n, a workflow automation platform.
contentType: integration
priority: critical
---

# Telegram credentials

You can use these credentials to authenticate the following nodes:

- [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/)
- [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/)

## Prerequisites

Create a [Telegram](https://telegram.org/){:target=_blank .external-link} account.

## Supported authentication methods

- API bot access token

## Related resources

Refer to [Telegram's Bot API documentation](https://core.telegram.org/bots/api){:target=_blank .external-link} for more information about the service.

## Using API bot access token

To configure this credential, you'll need:

- A bot **Access Token**

To generate your access token:

1. Start a chat with the [BotFather](https://telegram.me/BotFather){:target=_blank .external-link}.
2. Enter `/newbot` and reply with your new bot's display name and username.
3. Copy the bot token and add it as the **Access Token** in n8n.

Refer to the [BotFather Create a new bot documentation](https://core.telegram.org/bots/features#creating-a-new-bot) for more information.