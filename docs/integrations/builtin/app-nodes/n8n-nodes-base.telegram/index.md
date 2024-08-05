---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram
description: Documentation for the Telegram node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Telegram

Use the Telegram node to automate work in [Telegram](https://telegram.org/){:target=_blank .external-link} and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages. 

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

/// note | Credentials
Refer to [Telegram credentials](/integrations/builtin/credentials/telegram/) for guidance on setting up authentication. 
///

## Operations

* [**Chat** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/)
    * [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-chat) up-to-date information about a chat using the Bot API [getChat](https://core.telegram.org/bots/api#getchat){:target=_blank .external-link} method.
    * [**Get Administrators**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-administrators): Get a list of all administrators in a chat using the Bot API [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators){:target=_blank .external-link} method.
    * [**Get Member**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-chat-member): Get the details of a chat member using the Bot API [getChatMember](https://core.telegram.org/bots/api#getchatmember){:target=_blank .external-link} method.
    * [**Leave**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#leave-chat) a chat using the Bot API [leaveChat](https://core.telegram.org/bots/api#leavechat){:target=_blank .external-link} method.
    * [**Set Description**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#set-description) of a chat using the Bot API [setChatDescription](https://core.telegram.org/bots/api#setchatdescription){:target=_blank .external-link} method.
    * [**Set Title**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#set-title) of a chat using the Bot API [setChatTitle](https://core.telegram.org/bots/api#setchattitle){:target=_blank .external-link} method.
* [**Callback** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/)
    * [**Answer Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/#answer-query): Send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards){:target=_blank .external-link} using the Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery){:target=_blank .external-link} method.
    * [**Answer Inline Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/#answer-inline-query): Send answers to callback queries sent from inline queries using the Bot API [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery){:target=_blank .external-link} method.
* [**File** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations/)
    * [**Get File**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations/#get-file) from Telegram using the Bot API [getFile](https://core.telegram.org/bots/api#getfile){:target=_blank .external-link} method.
* [**Message** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/)
    * [**Delete Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#delete-chat-message) using the Bot API [deleteMessage](https://core.telegram.org/bots/api#deletemessage){:target=_blank .external-link} method.
    * [**Edit Message Text**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#edit-message-text): Edit the text of an existing message using the Bot API [editMessageText](https://core.telegram.org/bots/api#editmessagetext){:target=_blank .external-link} method.
    * [**Pin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#pin-chat-message) for the chat using the Bot API [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage){:target=_blank .external-link} method.
    * [**Send Animation**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-animation) to the chat using the Bot API [sendAnimation](https://core.telegram.org/bots/api#sendanimation){:target=_blank .external-link} method.
        * For use with GIFs or H.264/MPEG-4 AVC videos without sound up to 50 MB in size.
    * [**Send Audio**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-audio) file to the chat and display it in the music player using the Bot API [sendAudio](https://core.telegram.org/bots/api#sendaudio){:target=_blank .external-link} method.
    * [**Send Chat Action**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-chat-action): Tell the user that something is happening on the bot's side. The status is set for 5 seconds or less using the Bot API [sendChatAction](https://core.telegram.org/bots/api#sendchataction){:target=_blank .external-link} method.
    * [**Send Document**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-document) to the chat using the Bot API [sendDocument](https://core.telegram.org/bots/api#senddocument){:target=_blank .external-link} method.
    * [**Send Location**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-location): Send a geolocation to the chat using the Bot API [sendLocation](https://core.telegram.org/bots/api#sendlocation){:target=_blank .external-link} method.
    * [**Send Media Group**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-media-group): Send a group of photos and/or videos using the Bot API [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup){:target=_blank .external-link} method.
    * [**Send Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-message) to the chat using the Bot API [sendMessage](https://core.telegram.org/bots/api#sendmessage){:target=_blank .external-link} method.
    * [**Send Photo**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-photo) to the chat using the Bot API [sendPhoto](https://core.telegram.org/bots/api#sendphoto){:target=_blank .external-link} method.
    * [**Send Sticker**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-sticker): to the chat using the Bot API [sendSticker](https://core.telegram.org/bots/api#sendsticker){:target=_blank .external-link} method.
        * For use with static .WEBP, animated .TGS, or video .WEBM stickers.
    * [**Send Video**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-video) to the chat using the Bot API [sendVideo](https://core.telegram.org/bots/api#sendvideo){:target=_blank .external-link} method.
    * [**Unpin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#unpin-chat-message) from the chat using the Bot API [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage){:target=_blank .external-link} method.
    
    /// note | Add bot to channel
    To use most of the **Message** operations, you must add your bot to a channel so that it can send messages to that channel. Refer to [Add a bot to a Telegram channel](#add-a-bot-to-a-telegram-channel) for more information.
    ///

    ## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'telegram') ]]

## Related resources

Refer to [Telegram's API documentation](https://core.telegram.org/bots/api){:target=_blank .external-link} for more information about the service.

n8n provides a trigger node for Telegram. Refer to the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) for more information.

## Add a bot to a Telegram channel

For a bot to send a message to a channel, you must add the bot to the channel. If the bot hasn't been added to the channel, you'll see an error with a description like:
`Error: Forbidden: bot is not a participant of the channel`.

To add a bot to a channel:

1. In the Telegram app, access the target channel and select the channel name.
2. Label the channel name as **public channel**.
3. Select **Administrators** > **Add Admin**.
4. Search for the bot's username and select it.
5. Select the checkmark on the top-right corner to add the bot to the channel.

## Get the Chat ID

Use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node in your workflow to get a Chat ID. This node can trigger on different events and returns a Chat ID on successful execution.

## Send more than 30 messages per second

The Telegram API has a [limitation](https://core.telegram.org/bots/faq#broadcasting-to-users){:target=_blank .external-link} of sending only 30 messages per second. Follow these steps to send more than 30 messages:

1. **Loop Over Items node**: Use the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node to get at most 30 chat IDs from your database.
2. **Telegram node**: Connect the Telegram node with the Loop Over Items node. Use the **Expression Editor** to select the Chat IDs from the Loop Over Items node.
3. **Code node**: Connect the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Loop Over Items node.

You can also use this [workflow](https://n8n.io/workflows/772){:target=_blank .external-link}.
