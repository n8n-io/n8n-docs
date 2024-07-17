---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram
description: Documentation for the Telegram node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Telegram

Use the Telegram node to automate work in Telegram, and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages. 

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

/// note | Credentials
Refer to [Telegram credentials](/integrations/builtin/credentials/telegram/) for guidance on setting up authentication. 
///

## Operations

* Chat
    * Get
    * Get Administrators
    * Get Member
    * Leave
    * Set Description
	* Set Title
* Callback
    * Answer Query
    * Answer Inline Query
* File
    * Get
* Message
    * Delete Chat Message
    * Edit Chat Message
    * Pin Chat Message
    * Send Animation
    * Send Audio
    * Send Chat Action
    * Send Document
    * Send Location
    * Send Media Group
    * Send Message
    * Send Photo
    * Send Sticker
    * Send Video
    * Unpin Chat Message

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'telegram') ]]

## Related resources

Refer to [Telegram's documentation](https://core.telegram.org/){:target=_blank .external-link} for more information about the service.

n8n provides a trigger node for Telegram. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/).

## Send more than 30 messages per second

The Telegram API has a [limitation](https://core.telegram.org/bots/faq#broadcasting-to-users){:target=_blank .external-link} of sending only 30 messages per second. Follow these steps to send more than 30 messages:

1. Loop Over Items node: Use the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node to get at most 30 chat IDs from your database.
2. Telegram node: Connect the Telegram node with the Loop Over Items node. Use the **Expression Editor** to select the Chat IDs from the Loop Over Items node.
3. Code node: Connect the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Loop Over Items node.

You can also use this [workflow](https://n8n.io/workflows/772){:target=_blank .external-link}.

## Add a bot to a Telegram channel

1. In the Telegram app, access the target channel and tap on the channel name.
2. Label the channel name as **public channel**.
3. Tap on **Administrators** and then on **Add Admin**.
4. Search for the username of the bot and select it.
5. Tap on the checkmark on the top-right corner to add the bot to the channel.

## Get the Chat ID

Use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. On successful execution, the Telegram Trigger node returns a Chat ID. You can use the Telegram Trigger node in your workflow to get a Chat ID.






