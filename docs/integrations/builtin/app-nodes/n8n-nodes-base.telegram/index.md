---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram node documentation
description: Documentation for the Telegram node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Telegram node

Use the Telegram node to automate work in [Telegram](https://telegram.org/){:target=_blank .external-link} and integrate Telegram with other applications. n8n has built-in support for a wide range of Telegram features, including getting files as well as deleting and editing messages. 

On this page, you'll find a list of operations the Telegram node supports and links to more resources.

/// note | Credentials
Refer to [Telegram credentials](/integrations/builtin/credentials/telegram/) for guidance on setting up authentication. 
///

## Operations

* [**Chat** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/)
    * [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-chat) up-to-date information about a chat.
    * [**Get Administrators**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-administrators): Get a list of all administrators in a chat.
    * [**Get Member**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#get-chat-member): Get the details of a chat member.
    * [**Leave**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#leave-chat) a chat.
    * [**Set Description**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#set-description) of a chat.
    * [**Set Title**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations/#set-title) of a chat.
* [**Callback** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/)
    * [**Answer Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/#answer-query): Send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards){:target=_blank .external-link}.
    * [**Answer Inline Query**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations/#answer-inline-query): Send answers to callback queries sent from inline queries.
* [**File** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations/)
    * [**Get File**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations/#get-file) from Telegram.
* [**Message** operations](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/)
    * [**Delete Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#delete-chat-message).
    * [**Edit Message Text**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#edit-message-text): Edit the text of an existing message.
    * [**Pin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#pin-chat-message) for the chat.
    * [**Send Animation**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-animation) to the chat.
        * For use with GIFs or H.264/MPEG-4 AVC videos without sound up to 50 MB in size.
    * [**Send Audio**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-audio) file to the chat and display it in the music player.
    * [**Send Chat Action**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-chat-action): Tell the user that something is happening on the bot's side. The status is set for 5 seconds or less.
    * [**Send Document**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-document) to the chat.
    * [**Send Location**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-location): Send a geolocation to the chat.
    * [**Send Media Group**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-media-group): Send a group of photos and/or videos.
    * [**Send Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-message) to the chat.
    * [**Send Photo**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-photo) to the chat.
    * [**Send Sticker**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-sticker) to the chat.
        * For use with static .WEBP, animated .TGS, or video .WEBM stickers.
    * [**Send Video**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#send-video) to the chat.
    * [**Unpin Chat Message**](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/#unpin-chat-message) from the chat.
    
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

For a bot to send a message to a channel, you must add the bot to the channel. If you haven't added the bot to the channel, you'll see an error with a description like:
`Error: Forbidden: bot is not a participant of the channel`.

To add a bot to a channel:

1. In the Telegram app, access the target channel and select the channel name.
2. Label the channel name as **public channel**.
3. Select **Administrators** > **Add Admin**.
4. Search for the bot's username and select it.
5. Select the checkmark on the top-right corner to add the bot to the channel.

## Get the Chat ID

You can only use `@channelusername` on public channels. To interact with a Telegram group, you need that group's Chat ID.

There are three ways to get that ID:

1. From the Telegram Trigger: Use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node in your workflow to get a Chat ID. This node can trigger on different events and returns a Chat ID on successful execution.
2. From your web browser: Open Telegram in a web browser and open the group chat. The group's Chat ID is the series of digits behind the letter "g." Prefix your group Chat ID with a `-` when you enter it in n8n.
3. Invite Telegram's [@RawDataBot](https://t.me/RawDataBot){:target=_blank .external-link} to the group: Once you add it, the bot outputs a JSON file that includes a `chat` object. The `id` for that object is the group Chat ID. Then remove the RawDataBot from your group.

## Send more than 30 messages per second

The Telegram API has a [limitation](https://core.telegram.org/bots/faq#broadcasting-to-users){:target=_blank .external-link} of sending only 30 messages per second. Follow these steps to send more than 30 messages:

1. **Loop Over Items node**: Use the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node to get at most 30 chat IDs from your database.
2. **Telegram node**: Connect the Telegram node with the Loop Over Items node. Use the **Expression Editor** to select the Chat IDs from the Loop Over Items node.
3. **Code node**: Connect the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Loop Over Items node.

You can also use this [workflow](https://n8n.io/workflows/772){:target=_blank .external-link}.
