---
permalink: /nodes/n8n-nodes-base.telegram
---

# Telegram

[Telegram](https://telegram.org) is a cloud-based instant messaging and voice-over-IP service.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Telegram/README.md).
:::

## Basic Operations

::: details Chat
- Get up to date information about a chat
- Leave a group, supergroup or channel
- Get the member of a chat
- Set the description of a chat
- Set the title of a chat
:::

::: details Callback
- Send an answer to a callback query sent from the inline keyboard
:::

::: details Message
- Edit a text message
- Send an audio file
- Send a chat action
- Send a document
- Send a text message
- Send a group of photos or videos to an album
- Send a photo
- Send a sticker
- Send a video
:::

## Example Usage

This workflow shows you how to send a message to a Telegram channel. You can also find the [workflow](https://n8n.io/workflows/451) on this website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Telegram]()

The final workflow should look like the following image.

![A workflow with the Telegram node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Telegram node

1. First of all, you'll have to enter credentials for the Telegram node. You can find out how to do that [here](../../../credentials/Telegram/README.md). Use the bot access token.
2. Add your bot to the target channel. You can find instructions on how to add a bot to a Telegram channel in the FAQs below.
3. Enter the target channel ID in *Chat ID*. You can find instructions on how to find the Chat ID in the FAQs below.
4. Write the content of your message in the *Text* field.
5. Click on *Execute Node* to run the workflow.

## FAQs

### How do I add a bot to a Telegram channel?

1. In the Telegram app, access the target channel and tap on the channel name.
2. Make sure that the channel name is labeled as "public channel".
3. Tap on *Administrators* and then on *Add Admin*.
4. Search for the username of the bot and select it.
5. Tap on the checkmark on the top-right corner to add the bot to the channel.

### How do I find the Chat ID?

1. In the Telegram app, access the target channel and tap on the channel.
2. In the *Invite Link* field, copy the string after `https://t.me/`.
3. Prefix the string with "@" and enter it in the *Chat ID* field.

**Example:** If the link is `https://t.me/n8ntest`, the Chat ID will be `@n8ntest`.

## Further Reading

- [Creating Telegram Bots with n8n, a No-Code Platform](https://medium.com/n8n-io/creating-telegram-bots-with-n8n-a-no-code-platform-fdf1f0928da7)
