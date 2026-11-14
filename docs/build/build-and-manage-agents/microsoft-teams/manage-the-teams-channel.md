---
title: Manage the Teams channel
status: preview
description: >-
  Manage the Microsoft Teams channel for an n8n agent: publish or upload the app, update it, renew the client secret, disconnect Teams, and troubleshoot common problems.
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

# Manage the Teams channel

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

After you connect Teams, you change it in the channel settings. Open the agent, go to **Channels**, and select **Microsoft Teams**.

The channel settings show:

* **Where it works:** the options from [Where people can use the agent](./#where-people-can-use-the-agent), and whether an administrator approved the Microsoft Graph permissions.
* **Appearance in Teams:** the app's display name, description, and icon. With the recommended setup, this also has the **Install app** menu.
* **The Azure Bot:** with the recommended setup, **Linked to Azure Bot** and a **Find it in Azure** link. With the manual setup, a **Find your Azure Bot** link.

## Upload the app or publish it to your organization

There are two ways to get the app into Teams:

| | Install for me (upload) | Publish to organization |
| --- | --- | --- |
| **Who can add the app** | You, and anyone you give the zip file to | Anyone in your organization, from the Teams app store |
| **Who approves** | Nobody, if your Teams policy allows custom app uploads | A Teams administrator, unless you are one |
| **How long it takes** | Right away | Up to a day before Microsoft lists the app, and longer if it waits for approval |
| **How updates reach people** | Everyone uploads the new zip file again | You publish again, and Teams updates the app for everyone |
| **Available in** | Recommended and manual setup | Recommended setup |

### Install for me

**Install for me** downloads the app package. Upload it in Teams under **Apps** > **Manage your apps** > **Upload an app**, then add it to a team or chat. In the manual setup, this is the **Download app package** step.

If you don't see **Upload an app**, ask your Teams administrator to allow custom app uploads, or publish the app instead.

### Publish to your organization

**Publish to organization** adds the app to your organization's app catalog in Teams. You find it in the **Install app** step of the recommended setup, and later in the **Install app** menu in the channel settings.

* **If you're a Teams administrator,** n8n publishes the app right away, but Microsoft can take up to a day to list it. Depending on your organization's app policies, a Teams administrator may still need to make it available to everyone in the Teams admin center.
* **If you aren't,** n8n submits the app for approval. It waits in the Teams admin center under **Teams apps** > **Manage apps**, as **Pending approval**. Nobody can add the app until an administrator approves it. In the setup, select **Copy a request for your administrator** to copy a message with the app name and a link to that page.

If the app is waiting for approval or an administrator rejected it, the channel settings say so. If an administrator rejects it, Microsoft doesn't share the reason, so ask them directly.

In the manual setup, n8n can't publish the app for you. Ask a Teams administrator to upload the app package in the Teams admin center instead.

## Change where it works or how it looks

In the channel settings, you can change **Where it works** and **Appearance in Teams**, like the display name and description. Teams keeps the previous version of the app until you send the new one:

* **Manual setup:** select **Save and download package**, then upload the new package in Teams under **Apps** > **Manage your apps** > **Upload an app**.
* **Recommended setup:** open the **Install app** menu and select **Publish to organization**, or **Install for me** to download and upload the new package.

The app uses the agent's name and icon. If you change the agent's name or icon later, the channel settings show **Changes to the agent aren't in Teams yet.** Install or publish the app again to update it.

## Switch to another credential or sign-in

A different credential or Microsoft sign-in means a different bot, so n8n can't swap it into a connected channel. If you pick another one in the channel settings, n8n asks **Set up Microsoft Teams again?** Select **Set up again** to remove the current Teams connection and its settings and start the setup from the beginning. The agent stops answering in Teams until you finish the new setup.

## Renew the client secret

Client secrets expire. When the secret expires, the agent stops replying in Teams.

* **Recommended setup:** n8n creates the secret with the longest lifetime your organization allows, up to 24 months. When the **Create Teams app** step runs again, n8n reuses the app registration and creates a new secret if the current one expires within seven days.
* **Manual setup:** create a new client secret in Microsoft Entra, then update the credential in n8n.

## Disconnect Teams

To disconnect Teams, remove the channel from the agent and confirm with **Yes, remove**. Messages already sent stay in Teams. To reconnect later, you set up the channel again.

When you disconnect the Teams channel or delete the agent, n8n doesn't delete anything in Microsoft. People may still have the app installed, but the agent no longer responds. For apps the recommended setup created, n8n shows a reminder with an **Open Teams** link to the Teams admin center. If you no longer need these resources, remove them yourself:

* The app registration, in [Microsoft Entra](https://entra.microsoft.com/) under **App registrations**.
* The Azure Bot, in the [Azure portal](https://portal.azure.com/). With the recommended setup, it's in the `n8n-agents` resource group.
* The Teams app, in the [Teams admin center](https://admin.teams.microsoft.com/) under **Teams apps** > **Manage apps**, if you published it.

## Troubleshooting

### Your organization doesn't let you register apps

Your Microsoft account can't create app registrations. Ask an administrator to give you that permission, or use the [manual setup](set-up-the-teams-channel.md#manual-setup) with an app registration an administrator creates for you.

### Teams apps need a work or school account

You signed in with a personal Microsoft account. Sign in again with your organization's work or school account.

### Your account can't create resources in the Azure subscription

You need the Contributor role on the Azure subscription you picked. Ask your Azure administrator for access, or pick another subscription.

### The credential doesn't match an app in Microsoft Entra

The credential's details don't match the app registration. Check that:

* The tenant ID and client ID belong to the same app registration.
* The client secret is the secret's **Value**, not its **Secret ID**.
* The client secret hasn't expired.

### "The Teams bot needs an HTTPS messaging endpoint"

Microsoft only sends messages to HTTPS URLs. On self-hosted n8n, set `N8N_WEBHOOK_URL` to the public HTTPS URL of your instance.

### No Upload an app option in Teams

Your Teams policy doesn't allow custom app uploads. Ask your Teams administrator to allow them, or publish the app to your organization instead.

### The agent doesn't reply in a channel

Check that:

* You've published the agent.
* **Team channels** is on and the latest app package is in Teams.
* Someone @mentioned the agent in the thread, or **Read all channel messages** is on.

### The agent can't read attached files

Files in channels and group chats need the `Files.Read.All` application permission. An administrator grants it once with admin consent, together with the other Graph permissions. It can take up to an hour to apply. See [Approve access](set-up-the-teams-channel.md#approve-access).

### The agent can't find a person or channel

Finding people by email needs `User.ReadBasic.All`, and finding channels by name needs `Team.ReadBasic.All` and `Channel.ReadBasic.All`. An administrator approves them in [Approve access](set-up-the-teams-channel.md#approve-access). Until then, @mention the agent once in the channel, or give the agent the person's Teams ID.

### The agent can't send a direct message or post

Teams only delivers messages the agent starts where people have added the app. For a direct message, the person must have added the app in Teams. For a post, the app must be in that team or group chat. Ask the person, or a team owner, to add the app, then try again.

## Related resources

* [Connect an agent to Microsoft Teams](./)
* [Set up the Teams channel](set-up-the-teams-channel.md)
