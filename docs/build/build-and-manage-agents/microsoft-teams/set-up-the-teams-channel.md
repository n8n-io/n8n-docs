---
title: Set up the Teams channel
status: preview
description: >-
  Set up the Microsoft Teams channel for an n8n agent with the recommended or manual setup, including prerequisites, self-hosted requirements, and Microsoft Graph permissions.
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

# Set up the Teams channel

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

Connect an n8n agent to Microsoft Teams with the recommended setup or the manual setup. For how the channel works and where people can use the agent, see [Connect an agent to Microsoft Teams](./).

## Prerequisites

Before you start, make sure you have:

* An agent you can edit, published at least once.
* An n8n instance that Microsoft can reach over HTTPS. On self-hosted n8n, set `N8N_WEBHOOK_URL` to the public HTTPS URL of your instance.
* A Microsoft 365 work or school account in the global Microsoft cloud. Personal accounts and sovereign clouds, such as GCC or Microsoft Azure operated by 21Vianet, don't work.
* An Azure subscription for the Azure Bot.
* Permission to add custom apps in Teams. Either your Teams policy allows uploading custom apps, or an administrator can publish the app to your organization.

## Recommended setup

The recommended setup creates everything in Microsoft for you. n8n Cloud offers it out of the box. On self-hosted n8n, an instance owner must set it up first. See [Use the recommended setup on self-hosted n8n](#use-the-recommended-setup-on-self-hosted-n8n). If it's not available, the Teams channel only shows the [manual setup](#manual-setup), labeled **Use your own Microsoft app**.

To connect Teams:

1. Open the agent, go to **Channels**, and select **Microsoft Teams**. Make sure you've selected **Recommended setup**.
2. In **Connect to Microsoft**, select **Sign in with Microsoft** and sign in with a work or school account of the organization where people use the agent.
3. In **Create Teams app**, select **Create app**. n8n registers the app in Microsoft Entra. This can take up to 30 seconds.
4. In **Deploy Azure Bot**, choose an **Azure subscription** and select **Create Azure Bot**. This can take up to a minute.
5. In **Choose where it works**, pick the options from [Where people can use the agent](./#where-people-can-use-the-agent).
6. In **Install app**, choose **Install for me** or **Publish to organization**. See [Upload the app or publish it to your organization](manage-the-teams-channel.md#upload-the-app-or-publish-it-to-your-organization).
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
| **Create Teams app** | Permission to register applications in Microsoft Entra. Your organization may limit this to certain roles. | Ask an administrator to register the app, or select the **Use your own Microsoft app instead** link in the setup to switch to the [manual setup](#manual-setup). |
| **Deploy Azure Bot** | The Contributor role on an Azure subscription. | Ask your Azure administrator for Contributor access, or select the **Use your own Microsoft app instead** link to switch to the manual setup. |
| **Publish to organization** | The Teams administrator role to publish directly. | n8n submits the app for approval instead. See [Publish to your organization](manage-the-teams-channel.md#publish-to-your-organization). |

## Manual setup

Use the manual setup if the recommended setup isn't available, or if your organization doesn't allow it. You create the resources in Microsoft yourself and connect them with a credential.

In the Teams channel, select **Use your own Microsoft app**. In the recommended setup, the **Use your own Microsoft app instead** link takes you to the same place. Follow these steps:

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

* **New bot:** select **Deploy to Azure**. The Azure portal opens with a template that n8n fills in with the bot name, the app's IDs, and the messaging endpoint. Azure may note that the template isn't from Microsoft. Choose a subscription and resource group, then create the deployment. You need the Contributor role on the subscription.
* **Existing bot:** select **Use an existing Azure Bot** and copy the **Messaging endpoint**. In the Azure portal, open the bot's **Configuration** page, paste it into **Messaging endpoint**, and make sure the bot uses the same app registration. Then go to **Channels** and turn on **Microsoft Teams**.

### Choose where it works

Pick where people can use the agent and how it listens. Direct chat is always on. Turn on **Team channels** or **Group and meeting chats** to let people add the agent there and @mention it. The read-all options make the agent run on every message, which uses model credits each time. For details, see [Where people can use the agent](./#where-people-can-use-the-agent) and [How the agent listens in channels and group chats](./#how-the-agent-listens-in-channels-and-group-chats).

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
	* Microsoft Graph: `User.Read`, `Application.ReadWrite.All`, `AppCatalog.ReadWrite.All`, `AppCatalog.Submit`, `openid`, `profile`, `offline_access`
	* Azure Service Management: `user_impersonation`
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

* **Approve now:** if you're an administrator in the organization, open the approval yourself.
* **Copy link for admin:** copy the link and send it to an administrator who can approve it.

What the link opens depends on the setup:

* **Recommended setup:** the Microsoft admin consent screen. n8n already added the permissions to the app registration. The administrator reviews them and accepts.
* **Manual setup:** the app registration's **API permissions** page in Microsoft Entra. The administrator adds the permissions there:
	1. Select **Add a permission** > **Microsoft Graph** > **Application permissions**.
	2. Search for and add each permission from the table above.
	3. Select **Grant admin consent**.

{% hint style="warning" %}
**Use application permissions**

Add the permissions as **Application** permissions, not **Delegated** ones. The agent acts as the app, not as a signed-in user, so it can't use delegated permissions.
{% endhint %}

After you connect the channel, the channel settings check the status for you, in both setups. Once Microsoft confirms the approval, they show **Permissions approved.** It can take up to an hour before the agent can use them.

## Related resources

* [Connect an agent to Microsoft Teams](./)
* [Manage the Teams channel](manage-the-teams-channel.md)
* [Microsoft Entra Service Principal credentials](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/microsoftentraserviceprincipal)
