---
title: Connect an agent to Microsoft Teams
status: preview
description: >-
  Connect an n8n agent to Microsoft Teams so people can chat with it in direct
  messages, team channels, and group chats. Covers the recommended and manual
  setup, permissions, files, scheduled messages, and publishing.
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

The Microsoft Teams channel is available wherever agents are. See [Build and manage agents](build-and-manage-agents.md) for agent availability.
{% endhint %}

{% hint style="info" %}
**Preview status**

The Microsoft Teams channel for agents is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

There are two ways to connect Teams:

- **Recommended setup:** you sign in with Microsoft and n8n creates the app registration, the Azure Bot, and the Teams app for you.
- **Manual setup:** shown as **Use your own Microsoft app**. You create the app registration and the Azure Bot yourself, then give n8n the credential.

Both setups end with the same result. The sections on where the agent works, how it listens, messages it sends on its own, files, and Microsoft Graph permissions apply to both.

## How the Teams channel works

A Teams agent needs three resources on the Microsoft side and one credential in n8n:

| Resource | What it does |
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

The options are part of the app package. If you change them later, n8n builds a new package, and you have to upload or publish it again. See [Manage the Teams channel](#manage-the-teams-channel).

## How the agent listens in channels and group chats

In direct chats, every message runs the agent, and the reply appears word by word as the agent writes it.

In team channels and group chats, the agent can listen in two ways. The reply arrives as one message once the agent finishes.

### Mention only

This is the default. The agent only reacts when someone @mentions it:

- When someone @mentions the agent, it joins the conversation. In a channel, it joins that one thread. In a group chat, it joins the whole chat.
- After it joins, later messages in that thread or chat reach the agent, even without a mention.
- Messages in threads or chats the agent hasn't joined don't reach it.

### Read all messages

When you turn on **Read all channel messages** or **Read all group-chat messages**:

- The agent runs on every message in the channel or chat, without an @mention.
- The agent decides for itself whether to reply. It can stay silent when a message isn't meant for it.
- Every message uses model credits, even when the agent doesn't reply.
- n8n ignores messages that other bots send.

Keep the default when people ask the agent for help directly. Turn on the read-all options when the agent needs to follow the whole conversation, for example to answer questions nobody addressed to it. In busy channels, this uses a lot of model credits.

## Messages the agent sends on its own

The agent doesn't only reply. It can also start a conversation, for example from a scheduled task like "Send anna@example.com the Monday summary":

- **Direct messages:** the agent sends a direct message to a person. The person must have added the app in Teams first.
- **Channel and group chat posts:** the agent starts a new post in a team channel or group chat. The app must already be in that team or chat.

To reach someone, the agent needs their Teams ID or the ID of the channel. It can look them up for you:

- By email: the agent finds a person from their email address. This needs `User.ReadBasic.All`.
- By name: the agent finds a channel from the team and channel name, for example "Marketing General". This needs `Team.ReadBasic.All` and `Channel.ReadBasic.All`.

An administrator approves these permissions together with file access. See [Microsoft Graph permissions](#microsoft-graph-permissions). Without them, the agent can still reach a channel once someone has @mentioned it there, or a person whose Teams ID it already knows.

## Files and file permissions

People can attach files to their messages, and the agent receives them along with the text. Each file can be up to 10 MB, and a message can have up to 10 files. If n8n can't read a file, the agent still gets the message.

How files reach the agent depends on where people send them.

### Files in direct messages

In direct chats, Teams sends files with the message itself. You don't need any extra permission.

### Files in channels and group chats

In team channels and group chats, Teams doesn't include files in the message. n8n reads the message again through Microsoft Graph to find them:

- **Pasted images** work with the RSC permission the app already has (`ChannelMessage.Read.Group` or `ChatMessage.Read.Chat`, see [Where people can use the agent](#where-people-can-use-the-agent)). You don't need anything else.
- **Attached files** are stored in SharePoint or OneDrive. To download them, the app registration needs the Microsoft Graph **application** permission `Files.Read.All`, with admin consent. See [Microsoft Graph permissions](#microsoft-graph-permissions).

Even with `Files.Read.All`, n8n only downloads a file if one of these is true:

- The file is in the channel's **Files** folder.
- The file is in the OneDrive of the person who sent the message.

This keeps the agent from opening files that aren't part of the conversation.

### When the agent can't read a file

If n8n can't download a file, it tells the agent why, so the agent can explain it to the person who sent it:

| Reason | What to do |
| --- | --- |
| No administrator has approved the permissions yet | Approve them as described in [Approve access](#approve-access), then wait up to an hour. |
| The app in Teams is missing a permission | Upload or publish the latest app package. Older packages may not have the RSC permissions. |
| The file isn't in the channel's files and the sender doesn't own it | Ask the person to share the file in the channel or from their own OneDrive. |

## Microsoft Graph permissions

Replying in a conversation and reading pasted images work with the permissions in the app package. For anything beyond that, the app registration needs four Microsoft Graph **application** permissions:

| Permission | What the agent can do with it |
| --- | --- |
| `User.ReadBasic.All` | Find people by email, so it can send them direct messages and mention them. |
| `Team.ReadBasic.All` | Find teams by name, so it can post in their channels. |
| `Channel.ReadBasic.All` | Find channels by name, so it can post in them. |
| `Files.Read.All` | Read files people attach in channels and group chats. |

An administrator of your Microsoft organization approves all four at once. You can't approve only some of them. Without them, the agent can only reply when someone messages it.

### Approve access

Both setups show an **Approve access** step. Its description lists what the approval unlocks for the places you turned on. You can also approve later: until an administrator approves, the channel settings show a warning under **Where it works**.

Select **Approve access**, then choose one of these:

- **Approve now:** if you're an administrator in the organization, open the approval yourself.
- **Copy link for admin:** copy the link and send it to an administrator who can approve it.

What the link opens depends on the setup:

- **Recommended setup:** the Microsoft admin consent screen. n8n already added the permissions to the app registration. The administrator reviews them and accepts.
- **Manual setup:** the app registration's **API permissions** page in Microsoft Entra. The administrator adds the permissions there:
	1. Select **Add a permission** > **Microsoft Graph** > **Application permissions**.
	2. Search for and add each permission from the table above.
	3. Select **Grant admin consent**.

{% hint style="warning" %}
**Use application permissions**

Add the permissions as **Application** permissions, not **Delegated** ones. The agent acts as the app, not as a signed-in user, so it can't use delegated permissions.
{% endhint %}

After you connect the channel, the channel settings check the status for you, in both setups. Once Microsoft confirms the approval, they show **Permissions approved.** It can take up to an hour before the agent can use them.

## Prerequisites

Before you start, make sure you have:

- An agent you can edit, published at least once.
- An n8n instance that Microsoft can reach over HTTPS. On self-hosted n8n, set `N8N_WEBHOOK_URL` to the public HTTPS URL of your instance.
- A Microsoft 365 work or school account in the global Microsoft cloud. Personal accounts and sovereign clouds, such as GCC or Microsoft Azure operated by 21Vianet, don't work.
- An Azure subscription for the Azure Bot.
- Permission to add custom apps in Teams. Either your Teams policy allows uploading custom apps, or an administrator can publish the app to your organization.

## Recommended setup

The recommended setup creates everything in Microsoft for you. n8n Cloud offers it out of the box. On self-hosted n8n, an instance owner must set it up first. See [Use the recommended setup on self-hosted n8n](#use-the-recommended-setup-on-self-hosted-n8n). If it's not available, the Teams channel only shows the [manual setup](#manual-setup).

To connect Teams:

1. Open the agent, go to **Channels**, and select **Microsoft Teams**. Make sure you've selected **Recommended setup**.
2. In **Connect to Microsoft**, select **Sign in with Microsoft** and sign in with a work or school account of the organization where people use the agent.
3. In **Create Teams app**, select **Create app**. n8n registers the app in Microsoft Entra. This can take up to 30 seconds.
4. In **Deploy Azure Bot**, choose an **Azure subscription** and select **Create Azure Bot**. This can take up to a minute.
5. In **Choose where it works**, pick the options from [Where people can use the agent](#where-people-can-use-the-agent).
6. In **Install app**, choose **Install for me** or **Publish to organization**. See [Upload the app or publish it to your organization](#upload-the-app-or-publish-it-to-your-organization).
7. In **Approve access**, approve the Microsoft Graph permissions now, or later in the channel settings. See [Approve access](#approve-access).
8. In **Connect Microsoft Teams**, finish adding the app in Teams, then select **Done**.

### What n8n creates for you

| Resource | Details |
| --- | --- |
| App registration | Named `<agent-name> (n8n)`, single-tenant, with a client secret named `n8n agent channel`. n8n also creates its service principal. |
| Resource group | `n8n-agents` in West Europe, created in the subscription you pick if it doesn't exist yet. |
| Azure Bot | Named after the agent, on the free F0 tier, with the Microsoft Teams channel turned on. The channel settings link to it. |
| n8n credential | A Microsoft Entra Service Principal credential with the app's IDs and secret. You don't need to copy the secret anywhere. |

If you run a step again, n8n reuses the same app registration and bot instead of creating new ones.

### Permissions for the recommended setup

When you sign in, n8n asks Microsoft for these delegated permissions. n8n only uses them to set up the agent, as the signed-in user:

| Permission | What n8n uses it for |
| --- | --- |
| `User.Read` | Read your profile and organization. |
| `Application.ReadWrite.All` | Create the app registration, its client secret, and its service principal. |
| `AppCatalog.ReadWrite.All` | Publish the Teams app to your organization's app catalog. |
| `AppCatalog.Submit` | Submit the Teams app for an administrator's approval when you can't publish it directly. |
| Azure Service Management (`user_impersonation`) | List your Azure subscriptions and create the Azure Bot. |

`Application.ReadWrite.All` and `AppCatalog.ReadWrite.All` need admin consent. An administrator of your Microsoft organization approves n8n once, and after that anyone can sign in without a permissions screen. If Microsoft shows **Need admin approval** when you sign in, an administrator has to approve n8n first. Select **Copy link for an admin** and send the link to one.

The permissions only let n8n act as you. You also need these rights in Microsoft:

| Step | What your account needs | If it's missing |
| --- | --- | --- |
| **Create Teams app** | Permission to register applications in Microsoft Entra. Your organization may limit this to certain roles. | Ask an administrator to register the app, or select **Use your own Microsoft app instead** to switch to the [manual setup](#manual-setup). |
| **Deploy Azure Bot** | The Contributor role on an Azure subscription. | Ask your Azure administrator for Contributor access, or select the **your own Microsoft app** link to switch to the manual setup. |
| **Publish to organization** | The Teams administrator role to publish directly. | n8n submits the app for approval instead. See [Publish to your organization](#publish-to-your-organization). |

## Manual setup

Use the manual setup if the recommended setup isn't available, or if your organization doesn't allow it. You create the resources in Microsoft yourself and connect them with a credential.

Select **Use your own Microsoft app** in the Teams channel, then follow these steps:

1. [Register the app in Microsoft Entra](#register-the-app-in-microsoft-entra).
2. [Create the credential in n8n](#create-the-credential-in-n8n).
3. [Deploy the Azure Bot](#deploy-the-azure-bot).
4. [Choose where it works](#choose-where-it-works).
5. [Download the app package](#download-the-app-package).
6. [Approve the Graph permissions](#approve-the-graph-permissions) (optional).
7. [Add the app in Teams](#add-the-app-in-teams).

### Register the app in Microsoft Entra

If you already have a credential for an app registration that no other agent uses, skip this step.

1. Select **Open Microsoft Entra**, or go to [Microsoft Entra admin center](https://entra.microsoft.com/) > **App registrations** > **New registration**.
2. Enter a name, for example, the name of your agent.
3. In **Supported account types**, select **Accounts in this organizational directory only** (single tenant).
4. You don't need a redirect URI. Select **Register**.
5. On the **Overview** page, copy the **Directory (tenant) ID** and the **Application (client) ID**.
6. Go to **Certificates & secrets** > **Client secrets** > **New client secret**. Add a description and an expiry, then copy the secret **Value**, not the **Secret ID**. Microsoft only shows the value once.

The bot doesn't need any API permissions to send and receive messages.

### Create the credential in n8n

In **Create credential**, create a new credential:

1. **Authentication:** **Client Secret**. Teams channels don't support certificates.
2. **Directory (Tenant) ID:** the tenant ID you copied.
3. **Application (Client) ID:** the client ID you copied.
4. **Client Secret:** the secret value you copied.
5. **Microsoft Graph API Base URL:** **Global**.

n8n checks the credential with Microsoft. When the check passes, n8n shows **Credential verified with Microsoft Entra.** Each credential can only connect one agent to Teams. If another agent already uses it, register a new app for this agent.

For more about this credential type, see [Microsoft Entra Service Principal credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/microsoftentraserviceprincipal).

### Deploy the Azure Bot

Choose one of these options:

- **New bot:** select **Deploy to Azure**. The Azure portal opens with a template that n8n fills in with the bot name, the app's IDs, and the messaging endpoint. Azure may note that the template isn't from Microsoft. Choose a subscription and resource group, then create the deployment. You need the Contributor role on the subscription.
- **Existing bot:** select **Use an existing Azure Bot** and copy the **Messaging endpoint**. In the Azure portal, open the bot's **Configuration** page, paste it into **Messaging endpoint**, and make sure the bot uses the same app registration. Then go to **Channels** and turn on **Microsoft Teams**.

### Choose where it works

Pick where people can use the agent and how it listens. Direct chat is always on. Turn on **Team channels** or **Group and meeting chats** to let people add the agent there and @mention it. The read-all options make the agent run on every message, which uses model credits each time. For details, see [Where people can use the agent](#where-people-can-use-the-agent) and [How the agent listens in channels and group chats](#how-the-agent-listens-in-channels-and-group-chats).

### Download the app package

Select **Download app package**. This also connects the channel to the agent. The package uses the agent's name and icon.

### Approve the Graph permissions

To let the agent find people and channels and read attached files, an administrator adds the Microsoft Graph application permissions and grants admin consent. Select **Approve access**, then **Approve now** or **Copy link for admin**. See [Approve access](#approve-access).

Skip this step if the agent only replies when someone messages it. You can approve later in the channel settings.

### Add the app in Teams

1. In Teams, go to **Apps** > **Manage your apps** > **Upload an app**, and upload the zip file.
2. Choose **Add to a team** or **Add to a chat**, depending on where the agent should work.
3. In n8n, select **Done**.

If you don't see **Upload an app**, your Teams policy doesn't allow custom apps. Ask your Teams administrator to allow custom app uploads, or to upload the app to your organization's app catalog.

### Permissions for the manual setup

| Permission | Type | Who grants it | Needed for | Without it |
| --- | --- | --- | --- | --- |
| Register applications | Microsoft Entra setting or role | Your Microsoft Entra administrator | Registering the app | You can't create the app registration. |
| Contributor | Azure role on a subscription | Your Azure administrator | Deploying the Azure Bot | You can't create the bot. |
| Upload custom apps | Teams app setup policy | Your Teams administrator | Uploading the app package | Only an administrator can add the app, through the Teams admin center. |
| `User.ReadBasic.All`, `Team.ReadBasic.All`, `Channel.ReadBasic.All`, and `Files.Read.All` | Microsoft Graph application permissions | A Microsoft administrator, with admin consent | Finding people and channels, and files attached in channels and group chats | The agent can only reply when messaged, and can't read those files. |
| `ChannelMessage.Read.Group` | RSC permission, added by **Team channels** | The team owner, when adding the app | Reading channel messages and pasted images | The agent can't work in channels. |
| `ChatMessage.Read.Chat` | RSC permission, added by **Group and meeting chats** | The person adding the app to the chat | Reading chat messages and pasted images | The agent can't work in group chats. |

## Use the recommended setup on self-hosted n8n

On self-hosted n8n, the recommended setup needs a Microsoft app that signs users in for the setup. n8n Cloud provides one. On your own instance, an instance owner provides it:

1. In Microsoft Entra, register a multi-tenant app (**Accounts in any organizational directory**).
2. Add the redirect URI `<n8n-url>/rest/oauth2-credential/callback` as a **Web** platform.
3. Add these delegated API permissions:
	- Microsoft Graph: `User.Read`, `Application.ReadWrite.All`, `AppCatalog.ReadWrite.All`, `AppCatalog.Submit`, `openid`, `profile`, `offline_access`
	- Azure Service Management: `user_impersonation`
4. Create a client secret.
5. Provide the client ID and secret as a credential overwrite for the credential type `microsoftTeamsManagerOAuth2Api`:

	```json
	{
		"microsoftTeamsManagerOAuth2Api": {
			"clientId": "<client-id>",
			"clientSecret": "<client-secret>"
		}
	}
	```

Once the overwrite is in place, the Teams channel shows **Recommended setup**. For how to set credential overwrites, see [Credential overwrites](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/credential-overwrites) and [Pre-configure Microsoft OAuth credentials](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/pre-configure-microsoft-oauth-credentials).

## Manage the Teams channel

After you connect Teams, you change it in the channel settings. Open the agent, go to **Channels**, and select **Microsoft Teams**.

The channel settings show:

- **Where it works:** the options from [Where people can use the agent](#where-people-can-use-the-agent), and whether an administrator approved the Microsoft Graph permissions.
- **Appearance in Teams:** the app's display name, description, and icon. With the recommended setup, this also has the **Install app** menu.
- **The Azure Bot:** with the recommended setup, **Linked to Azure Bot** and a **Find it in Azure** link. With the manual setup, a **Find your Azure Bot** link.

### Upload the app or publish it to your organization

There are two ways to get the app into Teams:

| | Install for me (upload) | Publish to organization |
| --- | --- | --- |
| **Who can add the app** | You, and anyone you give the zip file to | Anyone in your organization, from the Teams app store |
| **Who approves** | Nobody, if your Teams policy allows custom app uploads | A Teams administrator, unless you are one |
| **How long it takes** | Right away | Up to a day before Microsoft lists the app, and longer if it waits for approval |
| **How updates reach people** | Everyone uploads the new zip file again | You publish again, and Teams updates the app for everyone |
| **Available in** | Recommended and manual setup | Recommended setup |

#### Install for me

**Install for me** downloads the app package. Upload it in Teams under **Apps** > **Manage your apps** > **Upload an app**, then add it to a team or chat. In the manual setup, this is the **Download app package** step.

If you don't see **Upload an app**, ask your Teams administrator to allow custom app uploads, or publish the app instead.

#### Publish to your organization

**Publish to organization** adds the app to your organization's app catalog in Teams. You find it in the **Install app** step of the recommended setup, and later in the **Install app** menu in the channel settings.

- **If you're a Teams administrator,** n8n publishes the app right away, but Microsoft can take up to a day to list it. Depending on your organization's app policies, a Teams administrator may still need to make it available to everyone in the Teams admin center.
- **If you aren't,** n8n submits the app for approval. It waits in the Teams admin center under **Teams apps** > **Manage apps**, as **Pending approval**. Nobody can add the app until an administrator approves it. In the setup, select **Copy a request for your administrator** to copy a message with the app name and a link to that page.

If the app is waiting for approval or an administrator rejected it, the channel settings say so. If an administrator rejects it, Microsoft doesn't share the reason, so ask them directly.

In the manual setup, n8n can't publish the app for you. Ask a Teams administrator to upload the app package in the Teams admin center instead.

### Change where it works or how it looks

In the channel settings, you can change **Where it works** and **Appearance in Teams**, like the display name and description. Teams keeps the previous version of the app until you send the new one:

- **Manual setup:** select **Save and download package**, then upload the new package in Teams under **Apps** > **Manage your apps** > **Upload an app**.
- **Recommended setup:** open the **Install app** menu and select **Publish to organization**, or **Install for me** to download and upload the new package.

The app uses the agent's name and icon. If you change the agent's name or icon later, the channel settings show **Changes to the agent aren't in Teams yet.** Install or publish the app again to update it.

### Switch to another credential or sign-in

A different credential or Microsoft sign-in means a different bot, so n8n can't swap it into a connected channel. If you pick another one in the channel settings, n8n asks **Set up Microsoft Teams again?** Select **Set up again** to remove the current Teams connection and its settings and start the setup from the beginning. The agent stops answering in Teams until you finish the new setup.

### Renew the client secret

Client secrets expire. When the secret expires, the agent stops replying in Teams.

- **Recommended setup:** n8n creates the secret with the longest lifetime your organization allows, up to 24 months. When the **Create Teams app** step runs again, n8n reuses the app registration and creates a new secret if the current one expires within seven days.
- **Manual setup:** create a new client secret in Microsoft Entra, then update the credential in n8n.

### Disconnect Teams

To disconnect Teams, remove the channel from the agent and confirm with **Yes, remove**. Messages already sent stay in Teams. To reconnect later, you set up the channel again.

When you disconnect the Teams channel or delete the agent, n8n doesn't delete anything in Microsoft. People may still have the app installed, but the agent no longer responds. For apps the recommended setup created, n8n shows a reminder with an **Open Teams** link to the Teams admin center. If you no longer need these resources, remove them yourself:

- The app registration, in [Microsoft Entra](https://entra.microsoft.com/) under **App registrations**.
- The Azure Bot, in the [Azure portal](https://portal.azure.com/). With the recommended setup, it's in the `n8n-agents` resource group.
- The Teams app, in the [Teams admin center](https://admin.teams.microsoft.com/) under **Teams apps** > **Manage apps**, if you published it.

## Limitations

- The Teams channel only works in the global Microsoft cloud. Sovereign clouds aren't supported.
- The bot credential must use a client secret. Certificate authentication isn't supported.
- Each credential can connect only one agent to Teams, and each agent has one Teams connection.
- When the agent looks for channels by name, it searches up to 50 teams.
- The recommended setup always creates the bot in the `n8n-agents` resource group in West Europe.
- Files can be up to 10 MB each, with up to 10 files per message.

## Troubleshooting

### Your organization doesn't let you register apps

Your Microsoft account can't create app registrations. Ask an administrator to give you that permission, or use the [manual setup](#manual-setup) with an app registration an administrator creates for you.

### Teams apps need a work or school account

You signed in with a personal Microsoft account. Sign in again with your organization's work or school account.

### Your account can't create resources in the Azure subscription

You need the Contributor role on the Azure subscription you picked. Ask your Azure administrator for access, or pick another subscription.

### The credential doesn't match an app in Microsoft Entra

The credential's details don't match the app registration. Check that:

- The tenant ID and client ID belong to the same app registration.
- The client secret is the secret's **Value**, not its **Secret ID**.
- The client secret hasn't expired.

### "The Teams bot needs an HTTPS messaging endpoint"

Microsoft only sends messages to HTTPS URLs. On self-hosted n8n, set `N8N_WEBHOOK_URL` to the public HTTPS URL of your instance.

### No Upload an app option in Teams

Your Teams policy doesn't allow custom app uploads. Ask your Teams administrator to allow them, or publish the app to your organization instead.

### The agent doesn't reply in a channel

Check that:

- You've published the agent.
- **Team channels** is on and the latest app package is in Teams.
- Someone @mentioned the agent in the thread, or **Read all channel messages** is on.

### The agent can't read attached files

Files in channels and group chats need the `Files.Read.All` application permission. An administrator grants it once with admin consent, together with the other Graph permissions. It can take up to an hour to apply. See [Approve access](#approve-access).

### The agent can't find a person or channel

Finding people by email needs `User.ReadBasic.All`, and finding channels by name needs `Team.ReadBasic.All` and `Channel.ReadBasic.All`. An administrator approves them in [Approve access](#approve-access). Until then, @mention the agent once in the channel, or give the agent the person's Teams ID.

### The agent can't send a direct message or post

Teams only delivers messages the agent starts where the app is installed. For a direct message, the person must have added the app in Teams. For a post, the app must be in that team or group chat. Ask the person, or a team owner, to add the app, then try again.

## Related resources

* [Build and manage agents](build-and-manage-agents.md)
* [Microsoft Entra Service Principal credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/microsoftentraserviceprincipal)
* [Microsoft Teams node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.microsoftteams)
