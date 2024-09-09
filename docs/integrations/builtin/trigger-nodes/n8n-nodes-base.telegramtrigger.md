---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Telegram trigger
description: Documentation for the Telegram trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Telegram trigger

[Telegram](https://telegram.org/){:target=_blank .external-link} is a cloud-based instant messaging and voice over IP service. Users can send messages and exchange photos, videos, stickers, audio, and files of any type. On this page, you'll find a list of events the Telegram trigger node can respond to and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/telegram/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Telegram Trigger integrations](https://n8n.io/integrations/telegram-trigger/){:target=_blank .external-link} page.
///

## Events

- **`*`**: Triggers on all updates of any kind.
- **Callback Query**: Triggers on a new incoming callback query.
- **Channel Post**: Triggers on a new incoming channel post of any kind, including text, photo, sticker, and so on.
- **Edited Channel Post**: Triggers when someone edits a channel post that's known to the bot.
- **Edited Message**: Triggers when someone edits a message that's known to the bot.
- **Inline Query**: Triggers on a new incoming inline query.
- **Message**: Triggers on a new incoming message of any kind, including text, photo, sticker, and so on.
- **Poll**: Triggers when the poll state changes. Bots receive updates about polls they've sent and stopped polls.
- **Pre-Checkout Query**: Triggers on a new incoming pre-checkout query. This response contains full information about checkout.
- **Shipping Query**: Triggers on a new incoming shipping query. Only for invoices with a flexible price.

## Related resources

n8n provides an app node for Telegram. You can find the node docs [here](/integrations/builtin/credentials/telegram/).

View [example workflows and related content](https://n8n.io/integrations/telegram-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Telegram's API documentation](https://core.telegram.org/bots/api){:target=_blank .external-link} for details about their API.
