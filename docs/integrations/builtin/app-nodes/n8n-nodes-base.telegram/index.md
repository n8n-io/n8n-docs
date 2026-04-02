---
title: Telegram node documentation
description: Documentation for the Telegram node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# Telegram node

Use the Telegram node to automate work in [Telegram](https://telegram.org/) and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages. 

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

/// note | Credentials
Refer to [Telegram credentials](/integrations/builtin/credentials/telegram.md) for guidance on setting up authentication. 
///

## Operations

* [**Chat** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md)
    * [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#get-chat) up-to-date information about a chat.
    * [**Get Administrators**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#get-administrators): Get a list of all administrators in a chat.
    * [**Get Member**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#get-chat-member): Get the details of a chat member.
    * [**Leave**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#leave-chat) a chat.
    * [**Set Description**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#set-description) of a chat.
    * [**Set Title**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md#set-title) of a chat.
* [**Callback** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations.md)
    * [**Answer Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations.md#answer-query): Send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards).
    * [**Answer Inline Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations.md#answer-inline-query): Send answers to callback queries sent from inline queries.
* [**File** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations.md)
    * [**Get File**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations.md#get-file) from Telegram.
* [**Message** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md)
    * [**Delete Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#delete-chat-message).
    * [**Edit Message Text**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#edit-message-text): Edit the text of an existing message.
    * [**Pin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#pin-chat-message) for the chat.
    * [**Send Animation**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-animation) to the chat.
        * For use with GIFs or H.264/MPEG-4 AVC videos without sound up to 50 MB in size.
    * [**Send Audio**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-audio) file to the chat and display it in the music player.
    * [**Send Chat Action**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-chat-action): Tell the user that something is happening on the bot's side. The status is set for 5 seconds or less.
    * [**Send Document**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-document) to the chat.
    * [**Send Location**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-location): Send a geolocation to the chat.
    * [**Send Media Group**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-media-group): Send a group of photos and/or videos.
    * [**Send Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-message) to the chat.
    * [**Send Photo**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-photo) to the chat.
    * [**Send Sticker**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-sticker) to the chat.
        * For use with static .WEBP, animated .TGS, or video .WEBM stickers.
    * [**Send Video**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#send-video) to the chat.
    * [**Unpin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations.md#unpin-chat-message) from the chat.
    
    /// note | Add bot to channel
    To use most of the **Message** operations, you must add your bot to a channel so that it can send messages to that channel. Refer to [Common Issues | Add a bot to a Telegram channel](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/common-issues.md#add-a-bot-to-a-telegram-channel) for more information.
    ///

    ## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'telegram') ]]

## Related resources

Refer to [Telegram's API documentation](https://core.telegram.org/bots/api) for more information about the service.

n8n provides a trigger node for Telegram. Refer to the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/index.md) for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/common-issues.md).
