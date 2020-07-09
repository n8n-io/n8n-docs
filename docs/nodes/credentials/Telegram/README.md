# Telegram

You can find information about the operations supported by the Telegram node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.telegram) page. You can also browse the source code of the node on [Telegram](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Telegram).

## Pre-requisites

1. Create a [Telegram](https://telegram.com/) account.
2. Access [Telegram core page](https://my.telegram.org/).

## Using App Access Token

1. Click on API Development tools.
2. Fill in application details.
3. Use 'App api_hash' value for your access token in the Telegram node credentials in n8n.

## Using Bot Access Token

1. Start a chat with the [Botfather](https://telegram.me/BotFather).
2. Enter `/newbot` and reply with your new bot's display name and username.
3. Copy the bot token and use it in the Telegram node credentials in n8n.
4. On the Telegram app, access the target channel and tap on the channel name.
5. Make sure that the channel name is labeled as "public channel".
6. Tap on *Administrators* and then on *Add Admin*.
7. Search for the username of the newly created bot and select it.
8. Tap on the checkmark on the top-right corner to add the bot to the channel.