---
title: Discord trigger guide
contentType:
  - integration
  - reference
priority: high
nodeTitle: Discord trigger guide
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.discord/discord-trigger-guide.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.discord/discord-trigger-guide
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.discord/discord-trigger-guide
description: >-
  Guidance on triggering n8n workflows from Discord events. Covers webhook-based
  triggers, community trigger nodes, and n8n Cloud compatibility.
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

# Discord trigger guide

n8n's built-in [Discord node](./README.md) supports actions such as sending messages and managing channels, but it doesn't include a native trigger. This guide explains how to trigger n8n workflows from Discord events using the approaches available today.

If you only need to *send* messages to Discord from an existing workflow, use the [Discord node](./README.md) instead. This page is for workflows that need to *start* from a Discord event.

## Why there's no native Discord trigger <a href="#why-theres-no-native-discord-trigger" id="why-theres-no-native-discord-trigger"></a>

Discord doesn't send outbound webhooks for most user events (messages, reactions, member joins). To listen for those events, a client has to maintain a persistent connection to Discord's Gateway API as a bot user. n8n's built-in nodes are stateless request/response steps, which is why the Discord node covers actions but not triggers.

The approaches below work around this by either running a small bot outside n8n that forwards events to a webhook, or by installing a community node that maintains the Gateway connection for you.

## Option 1: Webhook-based trigger <a href="#option-1-webhook-based-trigger" id="option-1-webhook-based-trigger"></a>

Use a small Discord bot (running outside n8n) to listen for Gateway events and forward them to an n8n [Webhook](../../core-nodes/n8n-nodes-base.webhook/README.md) node.

This approach works on both n8n Cloud and self-hosted instances because n8n only needs to receive an inbound HTTP request.

Steps:

1. In n8n, add a **Webhook** node as the first step of your workflow.
2. Copy the **Test URL** (or **Production URL** once you activate the workflow).
3. Create a Discord bot in the [Discord Developer Portal](https://discord.com/developers/applications) — see [Discord credentials](../../credentials/discord.md) for guidance on setting up an application and generating a bot token.
4. Run a small bot process (for example, in Node.js with [discord.js](https://discord.js.org/) or in Python with [discord.py](https://discordpy.readthedocs.io/)) that connects to Discord's Gateway and posts a JSON payload to the n8n Webhook URL when the events you care about fire.
5. Handle the payload downstream in your n8n workflow like any other webhook input.

The bot only needs the intents required for the events you want to forward. For messages, that's `MESSAGE_CONTENT` and `GUILD_MESSAGES`. Refer to Discord's [Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents) documentation for the full list.

{% hint style="info" %}
If you're only reacting to slash commands or button interactions, you can skip the bot process entirely: register an **Interactions Endpoint URL** in the Discord Developer Portal and point it at your n8n Webhook URL. Discord will `POST` interaction payloads directly to n8n. You must respond with a valid interaction response within 3 seconds, or the interaction fails.
{% endhint %}

## Option 2: Community trigger nodes <a href="#option-2-community-trigger-nodes" id="option-2-community-trigger-nodes"></a>

Several community-maintained nodes handle the Gateway connection inside n8n, exposing a native trigger step in the editor. These require [self-hosted n8n](../../../../hosting/index.md) — n8n Cloud doesn't currently allow community nodes to run persistent connections.

Popular options:

* [`n8n-nodes-discord`](https://www.npmjs.com/package/n8n-nodes-discord) — provides Discord Trigger, action, and interaction nodes.
* [`n8n-nodes-discord-trigger`](https://www.npmjs.com/package/n8n-nodes-discord-trigger) — a lighter-weight trigger-only package.

Refer to [Install community nodes](../../../../integrations/community-nodes/installation-and-management/README.md) for installation instructions.

{% hint style="warning" %}
Community nodes aren't maintained by n8n. Review the source, permissions, and update cadence before installing one on a production instance.
{% endhint %}

## Choose an approach <a href="#choose-an-approach" id="choose-an-approach"></a>

| Approach | Runs on Cloud? | Setup effort | Best for |
| --- | --- | --- | --- |
| Webhook + external bot | Yes | Medium — you host the bot | Any n8n instance; production workflows where you want isolation between the bot and n8n. |
| Interactions endpoint (slash commands only) | Yes | Low | Slash commands and buttons; no message-content events. |
| Community trigger node | Self-hosted only | Low | Self-hosted n8n where you're comfortable with community-maintained code. |

## Related resources <a href="#related-resources" id="related-resources"></a>

* [Discord node](./README.md) — for sending messages and managing channels from an existing workflow.
* [Discord credentials](../../credentials/discord.md) — setting up bot, OAuth2, and webhook credentials.
* [Webhook node](../../core-nodes/n8n-nodes-base.webhook/README.md) — receiving inbound HTTP requests in n8n.
* [Discord Gateway documentation](https://discord.com/developers/docs/topics/gateway) — reference for the events a bot can listen to.
* [Discord Interactions documentation](https://discord.com/developers/docs/interactions/receiving-and-responding) — reference for slash commands and components.
