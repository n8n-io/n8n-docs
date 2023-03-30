---
title: Telegram
description: Documentation for the Telegram node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Telegram

The Telegram node allows you to automate work in Telegram, and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages. 

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

!!! note "Credentials"
    Refer to [Telegram credentials](/integrations/builtin/credentials/telegram/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Telegram integrations](https://n8n.io/integrations/telegram/){:target="_blank" .external-link} list.


## Basic Operations

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

## Related resources


Refer to [Telegram's documentation](https://core.telegram.org/){:target=_blank .external-link} for more information about the service.


n8n provides a trigger node for Telegram. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/).
	

View [example workflows and related content](https://n8n.io/integrations/telegram/){:target=_blank .external-link} on n8n's website.


## How to

### Send more than 30 messages per second

The Telegram API has a [limitation](https://core.telegram.org/bots/faq#broadcasting-to-users){:target=_blank .external-link} of sending only 30 messages per second. Follow these steps to send more than 30 messages:

1. Split In Batches node: Use the [Split in Batches](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node to get at most 30 chat IDs from your database.
2. Telegram node: Connect the Telegram node with the Split In Batches node. Use the **Expression Editor** to select the Chat IDs from the Split in Batches node.
3. Code node: Connect the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Split In Batches node.

You can also use this [workflow](https://n8n.io/workflows/772){:target=_blank .external-link}.

### Add a bot to a Telegram channel

1. In the Telegram app, access the target channel and tap on the channel name.
2. Label the channel name as **public channel**.
3. Tap on **Administrators** and then on **Add Admin**.
4. Search for the username of the bot and select it.
5. Tap on the checkmark on the top-right corner to add the bot to the channel.

### Get the Chat ID

There are two ways to get the Chat ID in Telegram.

- Using the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node: On successful execution, the Telegram Trigger node returns a Chat ID. You can use the Telegram Trigger node in your workflow to get a Chat ID.
- Using the @RawDataBot: The @RawDataBot returns the raw data of the chat with a Chat ID. Invite the @RawDataBot to your channel/group, and upon joining, it will output a Chat ID along with other information. Be sure to remove the @RawDataBot from your group/channel afterward.





