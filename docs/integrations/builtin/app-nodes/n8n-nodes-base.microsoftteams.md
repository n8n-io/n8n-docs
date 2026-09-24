---
title: Microsoft Teams node documentation
description: >-
  Learn how to use the Microsoft Teams node in n8n. Follow technical
  documentation to integrate Microsoft Teams node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft Teams node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams
layout:
  description:
    visible: false
---

# Microsoft Teams node <a href="#microsoft-teams-node" id="microsoft-teams-node"></a>

Use the Microsoft Teams node to automate work in Microsoft Teams, and integrate Microsoft Teams with other applications. n8n has built-in support for a wide range of Microsoft Teams features, including channels, channel and chat messages, chat members, online meetings, and tasks.

On this page, you'll find a list of operations the Microsoft Teams node supports and links to more resources.

{% hint style="info" %}
**Credentials**

From version 2 of the node, the **Authentication** dropdown offers three options:

- **Teams OAuth2**: the Microsoft Teams-specific OAuth2 credential (default). Its default scopes cover every resource on this page, including `Chat.ReadWrite` for chat members and chat messages and, from n8n 2.39.0, `OnlineMeetings.ReadWrite` for online meetings.
- **Microsoft OAuth2 (Graph)**: a generic Microsoft Graph credential that you can reuse across other Microsoft nodes. When you select this option, grant the credential the scopes this node needs. Refer to [Default scopes for Microsoft Teams](../credentials/microsoft.md#default-scopes-for-microsoft-teams) for the full list.
- **Service Principal (App-Only)**: app-only access through a Microsoft Entra app registration, with no signed-in user. Some resources need a signed-in user and aren't available with this credential. Refer to [Service Principal credential support](#service-principal-credential-support) on this page, and to [Microsoft Entra Service Principal credentials](../credentials/microsoftentraserviceprincipal.md) for setup and the required application permissions.

If you connected a Teams OAuth2 credential before n8n 2.39.0, reconnect it so it picks up `OnlineMeetings.ReadWrite`. If the credential uses **Custom Scopes**, add the scope to **Enabled Scopes** instead.

Refer to [Microsoft credentials](../credentials/microsoft.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/sYWM3IB0LEL4RkPx8ndF/" %}

## Operations <a href="#operations" id="operations"></a>

{% hint style="info" %}
**Feature availability**

The Chat Member and Online Meeting resources are available from n8n 2.39.0, together with the Channel Message **Get**, **Get Many Replies**, and **Reply** operations. The Chat Member **Add** operation and the Online Meeting **Create or Get**, **Delete**, and **Update** operations are available from n8n 2.40.0. The Activity Notification resource is available from n8n 2.42.0.
{% endhint %}

* Activity Notification
    * Send
* Channel
    * Create
    * Delete
    * Get
    * Get Many
    * Update
* Channel Message
    * Create
    * Get
    * Get Many
    * Get Many Replies
    * Reply
* Chat Member
    * Add
    * Get Many
* Chat Message
	* Create
	* Get
	* Get Many
	* Send and Wait for Response
* Online Meeting
    * Create
    * Create or Get
    * Delete
    * Get
    * Update
* Task
    * Create
    * Delete
    * Get
    * Get Many
    * Update

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/c0Jp2CWNEFSR2IfIVdlL/" %}

## Service Principal credential support

The **Service Principal (App-Only)** credential has no signed-in user, so the Microsoft Teams node can't run operations that act as one. The list below states what's available for each resource. For the unavailable resources and operations, the node hides their fields and shows a notice when you select this credential. A workflow that still uses one of them fails with an error before the node sends any request.

- **Activity Notification**: Send. It needs the `TeamsActivity.Send` application permission and a companion Teams app installed for the recipient. Refer to [Send an activity notification](#send-an-activity-notification).
- **Channel**: all operations.
- **Channel Message**: Get, Get Many, and Get Many Replies. Create and Reply aren't available, because app-only Microsoft Graph only supports migration import for channel messages. Use an OAuth2 credential to send channel messages.
- **Chat Member**: not available. The node's chat picker lists the signed-in user's chats, which app-only access can't do, so the node blocks the whole resource, including chats given by ID.
- **Chat Message**: not available. The node sends and reads chat messages as the signed-in user.
- **Online Meeting**: not available. The node creates and manages online meetings as the signed-in user.
- **Task**: all operations. Get Many always lists the tasks of a plan: the node hides the **Tasks For** option, so **Group Member** isn't available. The node also hides the **Team** picker, and the **Plan**, **Bucket**, and **Assigned To** fields accept an ID only.

Refer to [Microsoft Entra Service Principal credentials](../credentials/microsoftentraserviceprincipal.md) for the application permissions each operation needs.

## Send an activity notification

{% hint style="info" %}
**Feature availability**

The Activity Notification resource is available from n8n 2.42.0.
{% endhint %}

The Activity Notification **Send** operation posts a notification to one user's activity feed, the **Activity** tab in Microsoft Teams. It doesn't send a chat or channel message, so it also works with the **Service Principal (App-Only)** credential, which can't send messages. Use it to ping a person from an unattended workflow, for example when an approval is due.

Microsoft Teams only shows the notification if the recipient has a companion Teams app that names your credential's client ID. Without it, Microsoft Graph rejects the request with an HTTP 403 error. An administrator sets the app up once per tenant, then installs it for each recipient. Refer to [Set up the companion Teams app](#set-up-the-companion-teams-app).

### Fields

| Field | Description |
|---|---|
| **Recipient** | The user who gets the notification. **From List** searches your Microsoft Entra directory. **By ID** takes the user's object ID or user principal name (UPN), such as `jacob@contoso.com`. Give a guest user by their object ID: a guest's UPN contains `#EXT#`, which the field rejects. |
| **Headline** | The bold first line of the notification. Keep it short so it fits on one line. |
| **Preview Text** | The second line. Teams shows the first 150 characters. |
| **Topic** | The third line, in grey. Name the item the notification is about, for example the workflow or the order. |
| **Topic Link** | The Microsoft Teams link that opens when the user selects the notification. It must be an `https` link on a Microsoft Teams domain, such as `https://teams.microsoft.com/l/chat/0/0?users=someone@contoso.com`. Refer to [Topic Link](#topic-link). |
| **Chain ID** (option) | A number that links related notifications. A new notification with the same Chain ID replaces the earlier one in the activity feed. Leave it at `0` to send the notification without a chain. |

The node calls Microsoft Graph's [`sendActivityNotification`](https://learn.microsoft.com/en-us/graph/api/userteamwork-sendactivitynotification?view=graph-rest-1.0) for the user with the `systemDefault` activity type. On success it returns `{ "success": true }`. Team and chat recipients, and custom activity types, aren't supported.

### Set up the companion Teams app

Complete these steps once per tenant. A Microsoft Entra administrator grants the permission, and a Teams administrator publishes and installs the app.

The companion app must name the client ID of the app registration your credential authenticates as. For the **Service Principal (App-Only)** credential, that's its **Application (Client) ID**. For a **Teams OAuth2** or **Microsoft OAuth2 (Graph)** credential, it's the **Client ID** of your own app registration. On n8n Cloud, the Teams OAuth2 credential can connect through an app registration that n8n manages, and that client ID isn't shown, so use a Service Principal credential or a credential with your own app registration instead.

#### Grant the Microsoft Graph permission

<!-- vale off -->

- **Service Principal (App-Only)**: in the [Microsoft Entra admin center](https://entra.microsoft.com/), open the app registration, select **API permissions** > **Add a permission** > **Microsoft Graph** > **Application permissions**, add `TeamsActivity.Send`, and grant admin consent. Refer to [Add application permissions](../credentials/microsoftentraserviceprincipal.md#add-application-permissions). To pick the recipient **From List**, also add `User.Read.All`.
- **Teams OAuth2**: the credential requests the delegated `TeamsActivity.Send` scope by default from n8n 2.42.0. If you connected the credential before n8n 2.42.0, reconnect it so it picks up the scope. If the credential uses **Custom Scopes**, add `TeamsActivity.Send` to **Enabled Scopes** first.
- **Microsoft OAuth2 (Graph)**: add `TeamsActivity.Send` to the credential's **Scope** field and reconnect.

<!-- vale on -->

#### Build the app package

The package is a flat zip file of three files: `manifest.json`, a 192x192 PNG named `color.png`, and a 32x32 PNG named `outline.png`. The only part that matters to Microsoft Graph is `webApplicationInfo.id`, which must be your client ID. The app needs no bot, tab, or other capability.

{% code title="manifest.json" %}
```json
{
	"$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.17/MicrosoftTeams.schema.json",
	"manifestVersion": "1.17",
	"version": "1.0.0",
	"id": "<new-guid>",
	"developer": {
		"name": "Contoso",
		"websiteUrl": "https://www.contoso.com",
		"privacyUrl": "https://www.contoso.com/privacy",
		"termsOfUseUrl": "https://www.contoso.com/terms"
	},
	"name": {
		"short": "n8n Notifications"
	},
	"description": {
		"short": "Lets n8n workflows post to your Teams activity feed.",
		"full": "Companion app that lets an n8n Microsoft Teams credential send activity feed notifications."
	},
	"icons": {
		"color": "color.png",
		"outline": "outline.png"
	},
	"accentColor": "#FF6D5A",
	"webApplicationInfo": {
		"id": "<application-client-id>",
		"resource": "api://<application-client-id>"
	}
}
```
{% endcode %}

Replace `<new-guid>` with a new GUID for the app, for example from `uuidgen`, and `<application-client-id>` with your client ID in both places. Then zip the three files without a folder:

```bash
zip -j n8n-notifications.zip manifest.json color.png outline.png
```

#### Publish the app to your organization's catalog

In the [Teams admin center](https://admin.teams.microsoft.com/), go to **Teams apps** > **Manage apps**, select **Actions** > **Upload new app**, and upload the zip file. Only an administrator can do this: app-only access can't publish to the catalog, which is why n8n can't set the app up for you.

#### Install the app for each recipient

Install the app in the recipient's personal scope with Microsoft Graph. You can send the requests from [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer): open **Modify permissions** and consent to `AppCatalog.Read.All` and `TeamsAppInstallation.ReadWriteForUser` before sending. Any tool that calls Microsoft Graph as your app registration works too, with the `TeamsAppInstallation.ReadWriteForUser.All` application permission.

First, look up the app's catalog ID. It differs from the `id` in the manifest, which Microsoft Graph calls `externalId`:

```http
GET https://graph.microsoft.com/v1.0/appCatalogs/teamsApps?$filter=externalId eq '<manifest-id>'
```

Then install the app for the recipient, using the `id` from the response as `<catalog-app-id>`:

```http
POST https://graph.microsoft.com/v1.0/users/<user-id>/teamwork/installedApps
Content-Type: application/json

{
	"teamsApp@odata.bind": "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/<catalog-app-id>"
}
```

An HTTP 409 response means the app is already installed for that user. Repeat the install for every user who should receive notifications.

#### Allow time for the install to propagate

The install takes time to propagate. Until it does, Microsoft Graph keeps returning the "not installed" HTTP 403 error. In n8n's tests, the first notification went through about five minutes after the install. A 403 right after the install doesn't mean the install failed.

### Topic Link

Teams opens the **Topic Link** when the user selects the notification. Microsoft Graph accepts only Microsoft Teams links, so the notification can't link to the n8n execution or to any other website. The node checks the link before it sends the request. Links on the Teams domains of the sovereign clouds, such as `teams.microsoft.us`, work too.

The link must also open something real, or Teams shows an error when the user selects the notification. Use one of these:

- A chat link such as `https://teams.microsoft.com/l/chat/0/0?users=someone@contoso.com`, which opens a chat with that person.
- A channel, message, or meeting link that you copy from Teams, which opens that item.

Refer to Microsoft's [deep links to Teams chats, channels, and messages](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-link-teams) for the link formats.

### Common errors

| Error | Cause | Fix |
|---|---|---|
| `The companion Teams app is not installed for this recipient` | Microsoft Graph returned HTTP 403. The recipient has no installed app that names your client ID under `webApplicationInfo.id`, or the install hasn't propagated yet. | Complete [Set up the companion Teams app](#set-up-the-companion-teams-app). Check that `webApplicationInfo.id` matches the credential's client ID. A bot app with the same ID doesn't count. Allow about five minutes after installing. |
| `The app registration is missing the TeamsActivity.Send application permission` | Microsoft Graph returned HTTP 403 to a Service Principal credential. The app registration lacks the `TeamsActivity.Send` application permission or its admin consent. | Add the permission and grant admin consent. As an alternative, add the `TeamsActivity.Send.User` resource-specific permission to the companion app's manifest and install the updated app for the recipient. |
| `The credential is missing the TeamsActivity.Send permission` | Microsoft Graph returned HTTP 403 to an OAuth2 credential. The token lacks the delegated `TeamsActivity.Send` scope. | Reconnect the credential. With **Custom Scopes**, add the scope to **Enabled Scopes** first. On a **Microsoft OAuth2 (Graph)** credential, add it to **Scope**. |
| `The Topic Link is required`, `The Topic Link must be a Microsoft Teams link` | The node checked the link before sending. It's empty, not `https`, or not on a Microsoft Teams domain. | Enter a Teams deep link. Refer to [Topic Link](#topic-link). |
| `The recipient was not found` | Microsoft Graph returned HTTP 404 for the user ID or UPN. | Check the value, or pick the user **From List**. Give guest users by object ID. |

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Teams node documentation integration templates](https://n8n.io/integrations/microsoft-teams) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft Teams' API documentation](https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}
