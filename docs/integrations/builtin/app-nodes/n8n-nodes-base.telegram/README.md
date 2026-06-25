---
title: Telegram node documentation
contentType:
  - integration
  - reference
priority: critical
nodeTitle: n8n-nodes-base.telegram
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md
originalUrl: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram
url: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram
description: >-
  Documentation for the Telegram node in n8n, a workflow automation platform.
  Includes details of operations and configuration, and links to examples and
  credentials information.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Telegram

Use the Telegram node to automate work in [Telegram](https://telegram.org/) and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages.

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Telegram credentials](../../credentials/telegram.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* [**Chat** operations](chat-operations.md)
  * [**Get**](chat-operations.md#get-chat) up-to-date information about a chat.
  * [**Get Administrators**](chat-operations.md#get-administrators): Get a list of all administrators in a chat.
  * [**Get Member**](chat-operations.md#get-chat-member): Get the details of a chat member.
  * [**Leave**](chat-operations.md#leave-chat) a chat.
  * [**Set Description**](chat-operations.md#set-description) of a chat.
  * [**Set Title**](chat-operations.md#set-title) of a chat.
* [**Callback** operations](callback-operations.md)
  * [**Answer Query**](callback-operations.md#answer-query): Send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards).
  * [**Answer Inline Query**](callback-operations.md#answer-inline-query): Send answers to callback queries sent from inline queries.
* [**File** operations](file-operations.md)
  * [**Get File**](file-operations.md#get-file) from Telegram.
*   [**Message** operations](message-operations.md)<br>

    * [**Delete Chat Message**](message-operations.md#delete-chat-message).
    * [**Edit Message Text**](message-operations.md#edit-message-text): Edit the text of an existing message.
    * [**Pin Chat Message**](message-operations.md#pin-chat-message) for the chat.
    * [**Send Animation**](message-operations.md#send-animation) to the chat.
      * For use with GIFs or H.264/MPEG-4 AVC videos without sound up to 50 MB in size.
    * [**Send Audio**](message-operations.md#send-audio) file to the chat and display it in the music player.
    * [**Send Chat Action**](message-operations.md#send-chat-action): Tell the user that something is happening on the bot's side. The status is set for 5 seconds or less.
    * [**Send Document**](message-operations.md#send-document) to the chat.
    * [**Send Location**](message-operations.md#send-location): Send a geolocation to the chat.
    * [**Send Media Group**](message-operations.md#send-media-group): Send a group of photos and/or videos.
    * [**Send Message**](message-operations.md#send-message) to the chat.
    * [**Send Photo**](message-operations.md#send-photo) to the chat.
    * [**Send Sticker**](message-operations.md#send-sticker) to the chat.
      * For use with static .WEBP, animated .TGS, or video .WEBM stickers.
    * [**Send Video**](message-operations.md#send-video) to the chat.
    * [**Unpin Chat Message**](message-operations.md#unpin-chat-message) from the chat.

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Add bot to channel</strong></p><p>To use most of the <strong>Message</strong> operations, you must add your bot to a channel so that it can send messages to that channel. Refer to <a href="common-issues.md#add-a-bot-to-a-telegram-channel">Common Issues | Add a bot to a Telegram channel</a> for more information.</p></div>

    ## Templates and examples

[Browse n8n-nodes-base.telegram integration templates](https://n8n.io/integrations/telegram) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Telegram's API documentation](https://core.telegram.org/bots/api) for more information about the service.

n8n provides a trigger node for Telegram. Refer to the trigger node docs [here](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) for more information.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).
