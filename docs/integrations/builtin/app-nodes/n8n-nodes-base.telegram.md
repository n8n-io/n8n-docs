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

* Chat operations
    * [**Get**](#get-chat): Use this operation to get up to date information about a chat using the Bot API [getChat](https://core.telegram.org/bots/api#getchat){:target=_blank .external-link} method.
    * [**Get Administrators**](#get-administrators): Use this operation to get a list of all administrators in a chat using the Bot API [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators){:target=_blank .external-link} method.
    * [**Get Member**](#get-chat-member): Use this operation to get the details of a chat member using the Bot API [getChatMember](https://core.telegram.org/bots/api#getchatmember){:target=_blank .external-link} method.
    * [**Leave**](#leave-chat): Use this operation to leave a chat using the Bot API [leaveChat](https://core.telegram.org/bots/api#leavechat){:target=_blank .external-link} method.
    * [**Set Description**](#set-description): Use this operation to set the description of a chat using the Bot API [setChatDescription](https://core.telegram.org/bots/api#setchatdescription){:target=_blank .external-link} method.
	* [**Set Title**](#set-title): Use this operation to set the title of a chat using the Bot API [setChatTitle](https://core.telegram.org/bots/api#setchattitle){:target=_blank .external-link} method.
* Callback operations
    * [**Answer Query**](#answer-query): Use this operation to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards){:target=_blank .external-link} using the Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery){:target=_blank .external-link} method.
    * [**Answer Inline Query**](#answer-inline-query): Use this operation to send answers to callback queries sent from inline queries using the Bot API [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery){:target=_blank .external-link} method.
* File operations
    * [**Get File**](#get-file): Use this operation to get a file from Telegram. Uses the Bot API [getFile](https://core.telegram.org/bots/api#getfile){:target=_blank .external-link}.
* Message
    * [**Delete Chat Message**](#delete-chat-message): Use this operation to delete a message from chat using the Bot API [deleteMessage](https://core.telegram.org/bots/api#deletemessage){:target=_blank .external-link} method.
    * [**Edit Message Text**](#edit-message-text): Use this operation to edit the text of an existing message using the Bot API [editMessageText](https://core.telegram.org/bots/api#editmessagetext){:target=_blank .external-link} method.
    * [**Pin Chat Message**](#pin-chat-message): Use this operation to pin a message for the chat. Uses the Bot API [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage){:target=_blank .external-link} method.
    * [**Send Animation**](#send-animation): Use this operation to send an animated file to the chat using the Bot API [sendAnimation](https://core.telegram.org/bots/api#sendanimation){:target=_blank .external-link} method.
        * Send GIFs or H.264/MPEG-4 AVC videos without sound using this method.
        * Bots can send animation files of up to 50 MB in size.
    Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound)
    * [**Send Audio**](#send-audio): Use this operation to send an audio file to the chat using Bot API [sendAudio](https://core.telegram.org/bots/api#sendaudio){:target=_blank .external-link} method.
    * [**Send Chat Action**](#send-chat-action): Use this operation when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less using the Bot API [sendChatAction](https://core.telegram.org/bots/api#sendchataction){:target=_blank .external-link} method.
    * [**Send Document**](#send-document): Use this operation to send a document to the chat using the Bot API [sendDocument](https://core.telegram.org/bots/api#senddocument){:target=_blank .external-link} method.
    * [**Send Location**](#send-location): Use this operation to send a geolocation to the chat using the Bot API [sendLocation](https://core.telegram.org/bots/api#sendlocation){:target=_blank .external-link} method.
    * [**Send Media Group**](#send-media-group): Use this operation to send a group of photos, videos, documents, or audios as an album using the Bot API [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup){:target=_blank .external-link} method.
    * [**Send Message**](#send-message): Use this operation to send a message to the chat using the Bot API [sendMessage](https://core.telegram.org/bots/api#sendmessage){:target=_blank .external-link} method.
    * [**Send Photo**](#send-photo): Use this operation to send a photo to the chat using the Bot API [sendPhoto](https://core.telegram.org/bots/api#sendphoto){:target=_blank .external-link} method.
    * [**Send Sticker**](#send-sticker): Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers using the Bot API [sendSticker](https://core.telegram.org/bots/api#sendsticker){:target=_blank .external-link} method.
    * [**Send Video**](#send-video): Use this operation to send a video to the chat using the Bot API [sendVideo](https://core.telegram.org/bots/api#sendvideo){:target=_blank .external-link} method.
    * [**Unpin Chat Message**](#unpin-chat-message): Use this operation to unpin a message from the chat using the Bot API [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage){:target=_blank .external-link} method.

### Get Chat

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Get**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.

Refer to the Telegram Bot API [getChat](https://core.telegram.org/bots/api#getchat){:target=_blank .external-link} documentation for more information.

### Get Administrators

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Get Administrators**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.

Refer to the Telegram Bot API [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators){:target=_blank .external-link} documentation for more information.

### Get Chat Member

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Get Member**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **User ID**: Enter the unique identifier of the user whose information you want to get.

Refer to the Telegram Bot API [getChatMember](https://core.telegram.org/bots/api#getchatmember){:target=_blank .external-link} documentation for more information.

### Leave Chat

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Leave**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.

Refer to the Telegram Bot API [leaveChat](https://core.telegram.org/bots/api#leavechat){:target=_blank .external-link} documentation for more information.

### Set Description

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Set Description**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Description**: Enter the new description you'd like to set the chat to use, maximum of 255 characters.

Refer to the Telegram Bot API [setChatDescription](https://core.telegram.org/bots/api#setchatdescription){:target=_blank .external-link} documentation for more information.

### Set Title

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Chat**.
* **Operation**: Select **Set Title**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Title**: Enter the new title you'd like to set the chat to use, maximum of 255 characters.

Refer to the Telegram Bot API [setChatTitle](https://core.telegram.org/bots/api#setchattitle){:target=_blank .external-link} documentation for more information.

### Answer Query

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Callback**.
* **Operation**: Select **Answer Query**.
* **Query ID**: Enter the unique identifier of the query you want to answer.
    * To feed a Query ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node triggered on the **Callback Query**.
* **Results**: Enter a JSON-serialized array of results you want to use as answers to the query. Refer to the Telegram [InlineQueryResults](https://core.telegram.org/bots/api#inlinequeryresult){:target=_blank .external-link} documentation for more information on formatting your array.

Refer to the Telegram Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery){:target=_blank .external-link} documentation for more information.

#### Answer Query additional fields

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Cache Time**: Enter the maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram defaults to `0` seconds for this method.
* **Show Alert**: Telegram can display the answer as a notification at the top of the chat screen or as an alert. Choose whether you want to keep the default notification display (turned off) or display the answer as an alert (turned on).
* **Text**: If you want the answer to show text, enter up to 200 characters of text here.
* **URL**: Enter a URL that will be opened by the user's client. Refer to the **url** parameter instructions at the Telegram Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery){:target=_blank .external-link} documentation for more information.

### Answer Inline Query

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Callback**.
* **Operation**: Select **Answer Inline Query**.
* **Query ID**: Enter the unique identifier of the query you want to answer.
    * To feed a Query ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node triggered on the **Inline Query**.
* **Results**: Enter a JSON-serialized array of results you want to use as answers to the query. Refer to the Telegram [InlineQueryResults](https://core.telegram.org/bots/api#inlinequeryresult){:target=_blank .external-link} documentation for more information on formatting your array.

Telegram allows a maximum of 50 results per query.

Refer to the Telegram Bot API [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery){:target=_blank .external-link} documentation for more information.

#### Answer Inline Query additional fields

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Cache Time**: The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram defaults to `300` seconds for this method.
* **Show Alert**: Telegram can display the answer as a notification at the top of the chat screen or as an alert. Choose whether you want to keep the default notification display (turned off) or display the answer as an alert (turned on).
* **Text**: If you want the answer to show text, enter up to 200 characters of text here.
* **URL**: Enter a URL that will be opened by the user's client.

### Get File

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **File**.
* **Operation**: Select **Get**.
* **File ID**: Enter the ID of the file you want to get.
* **Download**: Choose whether you want the node to download the file (turned on) or not (turned off).

Refer to the Telegram Bot API [getFile](https://core.telegram.org/bots/api#getfile){:target=_blank .external-link} documentation for more information.

### Delete Chat Message

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Delete Chat Message**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Message ID**: Enter the unique identifier of the message you want to delete.

Refer to the Telegram Bot API [deleteMessage](https://core.telegram.org/bots/api#deletemessage){:target=_blank .external-link} documentation for more information.

### Edit Message Text

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Edit Message Text**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Message ID**: Enter the unique identifier of the message you want to edit.
* **Reply Markup**: Select whether to use the **Inline Keyboard** to display the InlineKeyboardMarkup **None** not to. This sets the `reply_markup` parameter. Refer to the [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup){:target=_blank .external-link} documentation for more information.
* **Text**: Enter the text you want to edit the message to.

Refer to the Telegram Bot API [editMessageText](https://core.telegram.org/bots/api#editmessagetext){:target=_blank .external-link} documentation for more information.

#### Edit Message Text additional fields

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Disable WebPage Preview**: Select whether you want to enable link previews for links in this message (turned off) or disable link previews for links in this message (turned on). This sets the `link_preview_options` parameter for `is_disabled`. Refer to the [LinkPreviewOptions](https://core.telegram.org/bots/api#linkpreviewoptions){:target=_blank .external-link} documentation for more information.
* **Parse Mode**: Choose whether the message should be parsed using **HTML** (default), **Markdown (Legacy)**, or **MarkdownV2**. This sets the `parse_mode` parameter.

### Pin Chat Message

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Pin Chat Message**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to pin the message to in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Message ID**: Enter the unique identifier of the message you want to pin.

Refer to the Telegram Bot API [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage){:target=_blank .external-link} documentation for more information.

#### Pin Chat Message additional fields

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Disable Notifications**: By default, Telegram will notify all chat members that the message has been pinned. If you don't want these notifications to go out, turn this control on. Sets the `disable_notification` parameter to `true`.

### Send Animation

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Send Animation**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to pin the message to in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Binary File**: To send a binary file from the node itself, turn this option on. If you turn this parameter on, you must enter the **Input Binary Field** containing the file you want to send.
* **Animation**: If you aren't using the **Binary File**, enter the animation to send here. Pass a `file_id` to send an animation that exists on the Telegram servers (recommended) or an HTTP URL for Telegram to get an animation from the Internet.
* **Reply Markup**: Use this parameter to set additional interface options, including:
    * **Force Reply**: The Telegram clients will act as if the user has selected the bot's message and tapped **Reply**, automatically displaying a reply interface to the user. Useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Refer to [ForceReply](https://core.telegram.org/bots/api#forcereply){:target=_blank .external-link} for more information. If you select this interface option, you can also select these **Force Reply** options:
        * **Force Reply**: Turn on to show the reply interface to the user.
        * **Selective**: Turn this on if you want to force reply from these users only:
            * Users that are @mentioned in the text of the message
            * The sender of the original message, if this Send Animation message is a reply to a message.
    * **Inline Keyboard**: Display an inline keyboard right next to the message. Refer to [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup){:target=_blank .external-link} for more information.
    * **Reply Keyboard**: Display a custom keyboard with reply options. Refer to [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) for more information.
    * **Reply Keyboard Remove**: The Telegram client will remove the current custom keyboard and display the default letter-keyboard. Refer to [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) for more information.

Refer to the Telegram Bot API [sendAnimation](https://core.telegram.org/bots/api#sendanimation){:target=_blank .external-link} documentation for more information.

/// note | Telegram Business accounts
Telegram restricts these options in channels and for messages sent on behalf of a Telegram Business account:

* Force Reply
* Reply Keyboard
* Reply Keyboard Remove
///

### Send Audio

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Send Audio**.

Refer to the Telegram Bot API [sendAudio](https://core.telegram.org/bots/api#sendaudio){:target=_blank .external-link} documentation for more information.

### Send Chat Action

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Send Chat Action**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to pin the message to in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Action**: Select the action you'd like to broadcast the bot as taking. The options here include: **Find Location**, **Typing**, **Recording** audio or video, and **Uploading** file types.

Refer to Telegram's Bot API [sendChatAction](https://core.telegram.org/bots/api#sendchataction){:target=_blank .external-link} documentation for more information.

### Send Document

Refer to Telegram's Bot API [sendDocument](https://core.telegram.org/bots/api#sendchataction){:target=_blank .external-link} documentation for more information.

### Send Location

Refer to Telegram's Bot API [sendLocation](https://core.telegram.org/bots/api#sendlocation){:target=_blank .external-link} documentation for more information.

### Send Media Group


Refer to Telegram's Bot API [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup){:target=_blank .external-link} documentation for more information.

### Send Message

Telegram limits the number of messages you can send to 30 per second. If you expect to hit this limit, refer to [Send more than 30 messages per second](#send-more-than-30-messages-per-second) for a suggested workaround.

Refer to Telegram's Bot API [sendMessage](https://core.telegram.org/bots/api#sendmessage){:target=_blank .external-link} documentation for more information.

### Send Photo

Refer to Telegram's Bot API [sendPhoto](https://core.telegram.org/bots/api#sendphoto){:target=_blank .external-link} documentation for more information.

### Send Sticker

Refer to Telegram's Bot API [sendSticker](https://core.telegram.org/bots/api#sendsticker){:target=_blank .external-link} documentation for more information.

### Send Video

Refer to Telegram's Bot API [sendChatAction](https://core.telegram.org/bots/api#sendchataction){:target=_blank .external-link} documentation for more information.

### Unpin Chat Message

To use this operation, enter these parameters:

* **Credential to connect with**: Create or select an existing Telegram credential.
* **Resource**: Select **Message**.
* **Operation**: Select **Pin Chat Message**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to unpin the message to in the format `@channelusername`.
    * To feed a Chat ID directly into this node, use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Get the Chat ID](#get-the-chat-id) for more information.
* **Message ID**: Enter the unique identifier of the message you want to pin.

Refer to the Telegram Bot API [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage){:target=_blank .external-link} documentation for more information.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'telegram') ]]

## Related resources

Refer to [Telegram's documentation](https://core.telegram.org/){:target=_blank .external-link} for more information about the service.

n8n provides a trigger node for Telegram. Refer to the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) for more information.

## Send more than 30 messages per second

The Telegram API has a [limitation](https://core.telegram.org/bots/faq#broadcasting-to-users){:target=_blank .external-link} of sending only 30 messages per second. Follow these steps to send more than 30 messages:

1. **Loop Over Items node**: Use the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node to get at most 30 chat IDs from your database.
2. **Telegram node**: Connect the Telegram node with the Loop Over Items node. Use the **Expression Editor** to select the Chat IDs from the Loop Over Items node.
3. **Code node**: Connect the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node with the Telegram node. Use the Code node to wait for a few seconds before fetching the next batch of chat IDs. Connect this node with the Loop Over Items node.

You can also use this [workflow](https://n8n.io/workflows/772){:target=_blank .external-link}.

## Add a bot to a Telegram channel

For a bot to send a message to a channel, the bot must be added to the channel. If the bot hasn't been added to the channel, you'll see an error with a description like:
`Error: Forbidden: bot is not a participant of the channel`.

To add a bot to a channel:

1. In the Telegram app, access the target channel and select the channel name.
2. Label the channel name as **public channel**.
3. Select **Administrators** > **Add Admin**.
4. Search for the bot's username and select it.
5. Select the checkmark on the top-right corner to add the bot to the channel.

## Get the Chat ID

Use the [Telegram Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/) node in your workflow to get a Chat ID.

On successful execution, the Telegram Trigger node returns a Chat ID.
