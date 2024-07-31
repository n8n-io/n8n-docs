---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram trigger
description: Documentation for the Telegram trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Telegram trigger

[Telegram](https://telegram.org/) is a cloud-based instant messaging and voice over IP service. Users can send messages and exchange photos, videos, stickers, audio, and files of any type.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/telegram/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Telegram Trigger integrations](https://n8n.io/integrations/telegram-trigger/){:target=_blank .external-link} page.
///

## Updates

- `*`: All updates
- **message**: Trigger on a new incoming message of any kind- text, photo, sticker, etc
- **edited_message**: Trigger on a new version of a channel post that's known to the bot and was edited
- **channel_post**: Trigger on a new incoming channel post of any kind - text, photo, sticker, etc
- **edited_channel_post**: Trigger on a new version of a channel post that's known to the bot and was edited
- **inline_query**: Trigger on a new incoming inline query
- **callback_query**: Trigger on a new incoming callback query
- **shipping_query**: Trigger on a new incoming shipping query. Only for invoices with flexible price
- **pre_checkout_query**: Trigger on a new incoming pre-checkout query. Contains full information about checkout
- **poll**: Trigger on a new poll state. Bots receive only updates about stopped polls and polls which are sent by the bot
