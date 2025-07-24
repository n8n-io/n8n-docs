---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram Trigger node documentation
description: Learn how to use the Telegram Trigger node in n8n. Follow technical documentation to integrate Telegram Trigger node into your workflows.
contentType: [integration, reference]
priority: critical
---

# Telegram Trigger node

[Telegram](https://telegram.org/){:target=_blank .external-link} is a cloud-based instant messaging and voice over IP service. Users can send messages and exchange photos, videos, stickers, audio, and files of any type. On this page, you'll find a list of events the Telegram Trigger node can respond to and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/telegram.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Telegram Trigger integrations](https://n8n.io/integrations/telegram-trigger/){:target=_blank .external-link} page.
///

## Events

- **`*`**: All updates except "Chat Member", "Message Reaction", and "Message Reaction Count" (default behavior of Telegram API as they produces a lot of calls of updates).
- **Business Connection**: Trigger when the bot is connected to or disconnected from a business account, or a user edited an existing connection with the bot.
- **Business Message**: Trigger on a new message from a connected business account.
- **Callback Query**: Trigger on new incoming callback query.
- **Channel Post**: Trigger on new incoming channel post of any kind — including text, photo, sticker, and so on.
- **Chat Boost**: Trigger when a chat boost is added or changed. The bot must be an administrator in the chat to receive these updates.
- **Chat Join Request**: Trigger when a request to join the chat is sent. The bot must have the `can_invite_users` administrator right in the chat to receive these updates.
- **Chat Member**: Trigger when a chat member's status is updated. The bot must be an administrator in the chat.
- **Chosen Inline Result**: Trigger when the result of an inline query chosen by a user is sent. Please see Telegram's API documentation on [feedback collection](https://core.telegram.org/bots/inline#collecting-feedback) for details on how to enable these updates for your bot.
- **Deleted Business Messages**: Trigger when messages are deleted from a connected business account.
- **Edited Business Message**: Trigger on new version of a message from a connected business account.
- **Edited Channel Post**: Trigger on new version of a channel post that is known to the bot is edited.
- **Edited Message**: Trigger on new version of a channel post that is known to the bot is edited.
- **Inline Query**: Trigger on new incoming inline query.
- **Message**: Trigger on new incoming message of any kind — text, photo, sticker, and so on.
- **Message Reaction**: Trigger when a reaction to a message is changed by a user. The bot must be an administrator in the chat. The update isn't received for reactions set by bots.
- **Message Reaction Count**: Trigger when reactions to a message with anonymous reactions are changed. The bot must be an administrator in the chat. The updates are grouped and can be sent with delay up to a few minutes.
- **My Chat Member**: Trigger when the bot's chat member status is updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user.
- **Poll**: Trigger on new poll state. Bots only receive updates about stopped polls and polls which are sent by the bot.
- **Poll Answer**: Trigger when user changes their answer in a non-anonymous poll. Bots only receive new votes in polls that were sent by the bot itself.
- **Pre-Checkout Query**: Trigger on new incoming pre-checkout query. Contains full information about checkout.
- **Purchased Paid Media**: Trigger when a user purchases paid media with a non-empty payload sent by the bot in a non-channel chat.
- **Removed Chat Boost**: Trigger when a boost is removed from a chat. The bot must be an administrator in the chat to receive these updates.
- **Shipping Query**: Trigger on new incoming shipping query. Only for invoices with flexible price.

Some **events may require additional permissions**, see [Telegram's API documentation](https://core.telegram.org/bots/api#getting-updates) for more information.

## Options

- **Download Images/Files**: Whether to download attached images or files to include in the output data.
	- **Image Size**: When you enable **Download Images/Files**, this configures the size of image to download. Downloads large images by default.
- **Restrict to Chat IDs**: Only trigger for events with the listed chat IDs. You can include multiple chat IDs separated by commas.
- **Restrict to User IDs**: Only trigger for events with the listed user IDs. You can include multiple user IDs separated by commas.

## Related resources

n8n provides an app node for Telegram. You can find the node docs [here](/integrations/builtin/credentials/telegram.md).

View [example workflows and related content](https://n8n.io/integrations/telegram-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Telegram's API documentation](https://core.telegram.org/bots/api){:target=_blank .external-link} for details about their API.

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/common-issues.md).
