---
title: Telegram node Chat operations documentation
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Telegram node Chat operations documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/chat-operations
description: >-
  Documentation for the Chat operations in the Telegram node in n8n, a workflow
  automation platform. Includes details to configure all Chat operations.
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

# Chat operations

Use these operations to get information about chats, members, administrators, leave chat, and set chat titles and descriptions. Refer to [Telegram](./) for more information on the Telegram node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Get Chat <a href="#get-chat" id="get-chat"></a>

Use this operation to get up to date information about a chat using the Bot API [getChat](https://core.telegram.org/bots/api#getchat) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Get**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.

Refer to the Telegram Bot API [getChat](https://core.telegram.org/bots/api#getchat) documentation for more information.

## Get Administrators <a href="#get-administrators" id="get-administrators"></a>

Use this operation to get a list of all administrators in a chat using the Bot API [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Get Administrators**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.

Refer to the Telegram Bot API [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators) documentation for more information.

## Get Chat Member <a href="#get-chat-member" id="get-chat-member"></a>

Use this operation to get the details of a chat member using the Bot API [getChatMember](https://core.telegram.org/bots/api#getchatmember) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Get Member**.
* **Chat ID**: Enter the Chat ID or username of the target channel in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.
* **User ID**: Enter the unique identifier of the user whose information you want to get.

Refer to the Telegram Bot API [getChatMember](https://core.telegram.org/bots/api#getchatmember) documentation for more information.

## Leave Chat <a href="#leave-chat" id="leave-chat"></a>

Use this operation to leave a chat using the Bot API [leaveChat](https://core.telegram.org/bots/api#leavechat) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Leave**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.

Refer to the Telegram Bot API [leaveChat](https://core.telegram.org/bots/api#leavechat) documentation for more information.

## Set Description <a href="#set-description" id="set-description"></a>

Use this operation to set the description of a chat using the Bot API [setChatDescription](https://core.telegram.org/bots/api#setchatdescription) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Set Description**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.
* **Description**: Enter the new description you'd like to set the chat to use, maximum of 255 characters.

Refer to the Telegram Bot API [setChatDescription](https://core.telegram.org/bots/api#setchatdescription) documentation for more information.

## Set Title <a href="#set-title" id="set-title"></a>

Use this operation to set the title of a chat using the Bot API [setChatTitle](https://core.telegram.org/bots/api#setchattitle) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Chat**.
* **Operation**: Select **Set Title**.
* **Chat ID**: Enter the Chat ID or username of the channel you wish to leave in the format `@channelusername`.
  * To feed a Chat ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node. Refer to [Common Issues | Get the Chat ID](common-issues.md#get-the-chat-id) for more information.
* **Title**: Enter the new title you'd like to set the chat to use, maximum of 255 characters.

Refer to the Telegram Bot API [setChatTitle](https://core.telegram.org/bots/api#setchattitle) documentation for more information.
