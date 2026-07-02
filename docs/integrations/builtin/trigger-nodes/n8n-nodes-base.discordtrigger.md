---
description: >-
  Learn how to use the Discord Trigger node in n8n. Follow technical
  documentation to integrate the Discord Trigger node into your workflows.
contentType:
  - integration
  - reference
layout:
  description:
    visible: false
---

# Discord Trigger node

Use the Discord Trigger node to respond to events in [Discord](https://discord.com/) and integrate Discord with other applications. n8n has built-in support for a range of Discord events, including new messages, reactions, and members joining or leaving a server.

On this page, you'll find a list of events the Discord Trigger node can respond to and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/discord.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Discord Trigger integrations](https://n8n.io/integrations/discord-trigger/) page.
{% endhint %}

{% hint style="info" %}
**One Gateway connection per active trigger**

Unlike webhook-based triggers, the Discord Trigger node keeps a persistent WebSocket connection to the [Discord Gateway](https://discord.com/developers/docs/events/gateway) open while your workflow is active. Each active Discord Trigger opens and maintains its own connection using your bot token. Discord limits how many Gateway connections a bot can start per day, so reuse a single trigger where you can rather than running many active triggers on the same bot.

Refer to Discord's [Gateway documentation](https://discord.com/developers/docs/events/gateway) for details about the connection lifecycle, intents, and rate limits.
{% endhint %}

## Events

The Discord Trigger node can respond to the following events. Some events require [privileged intents](#required-intents) to be enabled for your bot.

- **Member Added**: A new member joins the server. Requires the **Server Members** privileged intent.
- **Member Left**: A member leaves or is removed from the server. Requires the **Server Members** privileged intent.
- **Member Updated**: A member is updated, for example a change to their roles or nickname. Requires the **Server Members** privileged intent.
- **Message Created**: A new message is sent. Reading the message text requires the **Message Content** privileged intent.
- **Message Deleted**: A message is deleted.
- **Message Reaction Added**: A reaction is added to a message.
- **Message Reaction Removed**: A reaction is removed from a message.
- **Message Updated**: A message is edited.

## Parameters

- **Events**: Select one or more Discord events to trigger the workflow on.
- **Server**: Select the server (guild) to listen to. The bot must be a member of this server. You can select the server from a list, or specify it by ID or URL.
- **Channels**: Select which channels to trigger on. Leave empty to listen to all channels in the server. This only applies to message and reaction events. Member events aren't scoped to a channel.

## Options

You can further refine the node's behavior when you **Add option**:

- **Attachment Content Types**: Only fire for new or edited messages that have at least one attachment matching one of the listed MIME types. Enter a comma-separated list with `*` wildcards, for example `image/*, application/pdf`. Use `*` to match any attachment. Leave empty to not filter by attachments. Other event types are unaffected.
- **Exclude My Bot's Own Messages and Reactions**: Whether to ignore messages and reactions created by this bot's own user. Turn this on to prevent loops when your workflow also sends messages or adds reactions.
- **Exclude Roles**: Drop events from members who have any of the selected roles. This only applies to events that carry the member's roles (new or edited messages, reaction added, member added or updated). n8n ignores it where the event has no role data (message deleted, reaction removed, member left).
- **Ignore Bot Actions**: Whether to ignore events triggered by bots, including this one. This applies wherever the actor is known (new or edited messages, reaction added, and member added, removed, or updated). It can't apply to reaction removed or message deleted, which don't carry the actor in the payload.
- **Include Roles**: Only fire for members who have at least one of the selected roles. The same role-data limitations as **Exclude Roles** apply.

## Required intents

This node connects to the Discord Gateway with your bot token and requests only the [intents](https://discord.com/developers/docs/topics/gateway#gateway-intents) needed for the events you select. Two of these are privileged, so you must enable them for your bot in the Discord developer portal:

- **Server Members**: Required for the **Member Added**, **Member Left**, and **Member Updated** events.
- **Message Content**: Required to read message text in the **Message Created** and **Message Updated** events.

To enable them, open your application in the [Discord developer portal](https://discord.com/developers/applications), go to **Bot > Privileged Gateway Intents**, and turn on the intents you need. Refer to [Discord credentials](../credentials/discord.md) for the full bot setup, including inviting the bot to your server.

## Related resources

n8n provides an app node for Discord. You can find the node docs [here](../app-nodes/n8n-nodes-base.discord/).

View [example workflows and related content](https://n8n.io/integrations/discord-trigger/) on n8n's website.

Refer to Discord's [Gateway documentation](https://discord.com/developers/docs/events/gateway) for details about the events API this node uses.

## Common issues

Here are some common errors and issues with the Discord Trigger node and steps to resolve or troubleshoot them.

### Message text is empty

If **Message Created** or **Message Updated** events arrive without the message text, your bot is missing the **Message Content** privileged intent. Enable it in **Bot > Privileged Gateway Intents** in the [Discord developer portal](https://discord.com/developers/applications). See [Required intents](#required-intents).

### Member events don't fire

The **Member Added**, **Member Left**, and **Member Updated** events require the **Server Members** privileged intent. If these events never trigger, enable the intent for your bot. See [Required intents](#required-intents).

### The trigger fails to start

If the workflow fails to activate with a connection error, check that:

- The **Bot Token** in your credential is valid.
- Every privileged intent required by your selected events is enabled in the Discord developer portal.
- The bot is a member of the server you selected and can view the relevant channels.
