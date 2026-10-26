---
title: Connect an agent to Microsoft Teams
status: preview
description: >-
  Connect an n8n agent to Microsoft Teams so people can chat with it in direct messages, team channels, and group chats. Covers how it works, where people can use it, how it listens, files, and limitations.
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
tags:
  - tag: preview
    primary: true
---

# Connect an agent to Microsoft Teams

The Microsoft Teams channel lets people chat with an n8n agent in Teams direct messages, team channels, and group chats.

{% hint style="info" %}
**Feature availability**

The Microsoft Teams channel is available on:

* **n8n Cloud:** All plans
* **Self-hosted:** All plans from n8n 2.32.3
{% endhint %}

{% hint style="info" %}
**Preview status**

The Microsoft Teams channel for agents is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

There are two ways to connect Teams:

* **Recommended setup:** you sign in with Microsoft and n8n creates the app registration, the Azure Bot, and the Teams app for you.
* **Manual setup** (shown as **Use your own Microsoft app**): you create the app registration and the Azure Bot yourself, then give n8n the credential.

See [Set up the Teams channel](set-up-the-teams-channel.md) for the steps. Both setups end with the same result. The sections on where the agent works, how it listens, messages it sends on its own, files, and Microsoft Graph permissions apply to both.

## How the Teams channel works

A Teams agent has four components: three resources on the Microsoft side and one credential in n8n.

| Component | What it does |
| --- | --- |
| **Microsoft Entra app registration** | Gives the bot its identity. It's a single-tenant app, so it only works in your organization. |
| **Azure Bot** | Receives messages from Teams and forwards them to n8n. It uses the free F0 tier and has the Microsoft Teams channel turned on. |
| **Teams app package** | A zip file with the app manifest and icons. People add this app in Teams to reach the agent. |
| **Microsoft Entra Service Principal credential** | Stores the tenant ID, client ID, and client secret of the app registration in n8n. |

When someone messages the agent in Teams:

1. Teams sends the message to the Azure Bot.
2. The Azure Bot forwards it to your n8n instance.
3. n8n runs the published version of the agent.
4. The agent replies in the same chat or thread. While it works, Teams shows a typing indicator.

Each thread is its own session, so the agent remembers earlier messages in the same thread. To start over, send `/new`. If a tool needs approval, the agent posts an approval card. In channels and group chats, only the person who has to answer sees the card.

{% hint style="info" %}
**Publish the agent first**

The Teams channel runs the published version of the agent. Until you publish the agent, it doesn't receive messages from Teams. You can set up the channel before you publish, and n8n connects it when you publish.
{% endhint %}

## Where people can use the agent

In the **Choose where it works** step, you decide where people can reach the agent. Direct chat is always on. You can also turn on team channels, group chats, and whether the agent reads every message there.

| Option | Where people use it | How a conversation starts | Permission it adds | Who approves it |
| --- | --- | --- | --- | --- |
| **Direct chat** | One-to-one chat with the agent | Open the app and send a message | None | Nobody |
| **Team channels** | Channels in teams that added the app | Add the app to a team, then @mention the agent in a channel | `ChannelMessage.Read.Group` | The team owner, when adding the app |
| **Group and meeting chats** | Group chats and meeting chats that added the app | Add the app to a chat, then @mention the agent | `ChatMessage.Read.Chat` | The person adding the app to the chat |
| **Read all channel messages** | Team channels | Any message in the channel | None beyond **Team channels** | The team owner, when adding the app |
| **Read all group-chat messages** | Group and meeting chats | Any message in the chat | None beyond **Group and meeting chats** | The person adding the app to the chat |

The permissions in this table are resource-specific consent (RSC) permissions. They're part of the app package and only apply to the team or chat that adds the app. They let the agent read messages and pasted images in that team or chat. They don't give access to anything else in your organization.

The options are part of the app package. If you change them later, n8n builds a new package, and you have to upload or publish it again. See [Manage the Teams channel](manage-the-teams-channel.md).

## How the agent listens in channels and group chats

In direct chats, every message runs the agent, and the reply appears word by word as the agent writes it.

In team channels and group chats, the agent can listen in two ways. The reply arrives as one message once the agent finishes.

### Mention only

This is the default. The agent only reacts when someone @mentions it:

* When someone @mentions the agent, it joins the conversation. In a channel, it joins that one thread. In a group chat, it joins the whole chat.
* After it joins, later messages in that thread or chat reach the agent, even without a mention.
* Messages in threads or chats the agent hasn't joined don't reach it.

### Read all messages

When you turn on **Read all channel messages** or **Read all group-chat messages**:

* The agent runs on every message in the channel or chat, without an @mention.
* The agent decides for itself whether to reply. It can stay silent when a message isn't meant for it.
* Every message uses model credits, even when the agent doesn't reply.
* n8n ignores messages that other bots send.

Keep the default when people ask the agent for help directly. Turn on the read-all options when the agent needs to follow the whole conversation, for example to answer questions nobody addressed to it. In busy channels, this uses a lot of model credits.

## Messages the agent sends on its own

The agent doesn't only reply. It can also start a conversation, for example from a scheduled task like "Send anna@example.com the Monday summary":

* **Direct messages:** the agent sends a direct message to a person. The person must have added the app in Teams first.
* **Channel and group chat posts:** the agent starts a new post in a team channel or group chat. The app must already be in that team or chat.

To reach someone, the agent needs their Teams ID or the ID of the channel. It can look them up for you:

* By email: the agent finds a person from their email address. This needs `User.ReadBasic.All`.
* By name: the agent finds a channel from the team and channel name, for example "Marketing General". This needs `Team.ReadBasic.All` and `Channel.ReadBasic.All`.

An administrator approves these permissions together with file access. See [Microsoft Graph permissions](set-up-the-teams-channel.md#microsoft-graph-permissions). Without them, the agent can still reach a channel once someone has @mentioned it there, or a person whose Teams ID it already knows.

## Files and file permissions

People can attach files to their messages, and the agent receives them along with the text. Each file can be up to 10 MB, and a message can have up to 10 files. If n8n can't read a file, the agent still gets the message.

How files reach the agent depends on where people send them.

### Files in direct messages

In direct chats, Teams sends files with the message itself. You don't need any extra permission.

### Files in channels and group chats

In team channels and group chats, Teams doesn't include files in the message. n8n reads the message again through Microsoft Graph to find them:

* **Pasted images** work with the RSC permission the app already has (`ChannelMessage.Read.Group` or `ChatMessage.Read.Chat`, see [Where people can use the agent](#where-people-can-use-the-agent)). You don't need anything else.
* **Attached files** are stored in SharePoint or OneDrive. To download them, the app registration needs the Microsoft Graph **application** permission `Files.Read.All`, with admin consent. See [Microsoft Graph permissions](set-up-the-teams-channel.md#microsoft-graph-permissions).

Even with `Files.Read.All`, n8n only downloads a file if one of these is true:

* The file is in the channel's **Files** folder.
* The file is in the OneDrive of the person who sent the message.

This keeps the agent from opening files that aren't part of the conversation.

### When the agent can't read a file

If n8n can't download a file, it tells the agent why, so the agent can explain it to the person who sent it:

| Reason | What to do |
| --- | --- |
| No administrator has approved the permissions yet | Approve them as described in [Approve access](set-up-the-teams-channel.md#approve-access), then wait up to an hour. |
| The app in Teams is missing a permission | Upload or publish the latest app package. Older packages may not have the RSC permissions. |
| The file isn't in the channel's files and the sender doesn't own it | Ask the person to share the file in the channel or from their own OneDrive. |

## Limitations

* The Teams channel only works in the global Microsoft cloud. Sovereign clouds aren't supported.
* The bot credential must use a client secret. Certificate authentication isn't supported.
* Each credential can connect only one agent to Teams, and each agent has one Teams connection.
* When the agent looks for channels by name, it searches up to 50 teams.
* The recommended setup always creates the bot in the `n8n-agents` resource group in West Europe.
* Files can be up to 10 MB each, with up to 10 files per message.
* Episodic memory doesn't apply to Teams conversations yet. The agent remembers earlier messages in the same thread, but not context from other threads or chats.

## In this section

* [Set up the Teams channel](set-up-the-teams-channel.md): connect an agent to Teams with the recommended or manual setup, and approve Microsoft Graph permissions.
* [Manage the Teams channel](manage-the-teams-channel.md): publish or upload the app, update it, renew the client secret, disconnect Teams, and fix common problems.

## Related resources

* [Build and manage agents](../)
