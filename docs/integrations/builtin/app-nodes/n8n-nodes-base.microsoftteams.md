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

Use the Microsoft Teams node to automate work in Microsoft Teams, and integrate Microsoft Teams with other applications. n8n has built-in support for a wide range of Microsoft Teams features, including channels, chats, channel and chat messages, chat members, online meetings, and tasks.

On this page, you'll find a list of operations the Microsoft Teams node supports and links to more resources.

{% hint style="info" %}
**Credentials**

From version 2 of the node, the **Authentication** dropdown offers three options:

- **Teams OAuth2**: the Microsoft Teams-specific OAuth2 credential (default). Its default scopes cover every resource on this page, including `Chat.ReadWrite` for chat members and chat messages, from n8n 2.39.0, `OnlineMeetings.ReadWrite` for online meetings, and, from n8n 2.41.0, `TeamworkTag.Read` for team tag mentions.
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

- The Chat Member and Online Meeting resources, and the Channel Message **Get**, **Get Many Replies**, and **Reply** operations, are available from n8n 2.39.0.
- The Chat Member **Add** and **Remove** operations, the Channel Message and Chat Message **Delete** and **Undo Delete** operations, the Online Meeting **Create or Get**, **Delete**, and **Update** operations, and Online Meeting support for the **Service Principal (App-Only)** credential are available from n8n 2.40.0.
- The Chat resource is available from n8n 2.41.0.
{% endhint %}

* Channel
    * Create
    * Delete
    * Get
    * Get Many
    * Update
* Channel Message
    * Create
    * Delete
    * Get
    * Get Many
    * Get Many Replies
    * Reply
    * Undo Delete
* Chat
    * Create
    * Get
    * Get Many
* Chat Member
    * Add
    * Get Many
    * Remove
* Chat Message
	* Create
	* Delete
	* Get
	* Get Many
	* Send and Wait for Response
	* Undo Delete
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

## Mentions

{% hint style="info" %}
**Feature availability**

Mentions on the Microsoft Teams node are available from n8n 2.41.0.
{% endhint %}

The Channel Message **Create** and **Reply** operations and the Chat Message **Create** operation have a **Mentions** field. Each row in the field @mentions one person or one team tag, and n8n adds the mention to the message for you. On a channel message, set **Mention Type** to **User** or **Team Tag** first. A chat message mentions users only, because a team tag belongs to a team. Refer to Microsoft's [`chatMessageMention` resource type](https://learn.microsoft.com/en-us/graph/api/resources/chatmessagemention) for how Microsoft Teams stores a mention.

Don't type the name into **Message** as well, or it shows up twice.

**Mention Placement**, an option in the operation's **Options** collection, sets where the mentions go. **Start of Message**, the default, gives `@Jane please review this`. **End of Message** gives `please review this @Jane`.

{% hint style="warning" %}
**Mentions make the message HTML**

A mention makes Microsoft Teams render the message as HTML, even when **Content Type** is **Text**. Line breaks you type into **Message** stop showing as line breaks, so use `<br>` instead.
{% endhint %}

### Mention a user

In a **Mentions** row on Channel Message **Create** or **Reply**, set **Mention Type** to **User**. Chat Message **Create** has no **Mention Type**, because its rows are users already. Then fill in the **User** field:

* **From List**: search your Microsoft Entra directory and pick the user. Entries pair the display name with the user principal name (UPN), such as `Jane Smith (jane@contoso.com)`, because display names aren't unique in a tenant. Guest users work here too.
* **By ID**: enter the user's object ID, such as `7e2f1174-e8ee-4859-b8b1-a8d1cc63d276`, or their UPN or email address, such as `jacob@contoso.com`. For a guest user, use the object ID: a guest's UPN contains `#EXT#`, which this field rejects.

n8n looks the user up in Microsoft Entra before it sends the message, so the mention shows their directory display name rather than the text you entered.

### Mention a team tag

A team tag belongs to a team, so tag mentions work on channel messages only. Set the operation's **Team** to the team that owns the tag, then add a **Mentions** row, set **Mention Type** to **Team Tag**, and fill in the **Team Tag** field:

* **From List**: pick one of the team's tags. Each entry shows how many members carry it, such as `Engineering (4 members)`.
* **By ID**: enter the tag ID that `GET /v1.0/teams/<team-id>/tags` returns. The tag must belong to the team you selected, or the node fails when it looks the tag up.

Mentioning a tag notifies everyone who carries it. The Microsoft Teams node mentions a team's existing tags and can't create new ones.

### Mention permissions

User mentions need the `User.Read.All` permission and team tag mentions need `TeamworkTag.Read`. The **Teams OAuth2** credential requests both by default. Add them by hand if the credential uses **Custom Scopes**, or if you authenticate with **Microsoft OAuth2 (Graph)**. A Microsoft Entra admin must consent to them.

If you connected a Teams OAuth2 credential before n8n 2.41.0, reconnect it so it picks up `TeamworkTag.Read`. Without the scope, a team tag mention fails with a permission error.

Mentions aren't available with the **Service Principal (App-Only)** credential, which can't run any of the three operations that support them. Refer to [Service Principal credential support](#service-principal-credential-support).

## Delete and restore messages

The Channel Message and Chat Message **Delete** operations soft delete a message: Microsoft Teams hides it from the channel or chat but keeps it, so the **Undo Delete** operation of the same resource can restore it. Both operations run as the signed-in user. You can delete and restore your own messages. Whether you can delete other people's messages depends on your role in the team and on your organization's Microsoft Teams messaging policies. When Microsoft Teams doesn't allow it, the operation fails with a permission error.

Both operations take a **Message ID**. To find it, copy the message link in Microsoft Teams: the message ID is the number at the end of the link's path, before the `?`. A chat message also needs the **Chat**. A channel message also needs the **Team** and **Channel**. To delete or restore a reply in a channel, add the **Parent Message ID** option and enter the ID of the message the reply belongs to, which is the `parentMessageId` parameter in the reply's link.

Deleting and restoring channel messages needs the `ChannelMessage.ReadWrite` scope, which the **Teams OAuth2** credential requests by default from n8n 2.40.0. If you connected the credential before n8n 2.40.0, reconnect it so it picks up the scope. If the credential uses **Custom Scopes**, add the scope to **Enabled Scopes** instead.

Chat messages use the `Chat.ReadWrite` scope, which the credential already includes. With the **Microsoft OAuth2 (Graph)** credential, add the scopes yourself.

The **Delete** and **Undo Delete** operations aren't available with the **Service Principal (App-Only)** credential, because Microsoft Graph offers them only for a signed-in user. Refer to [Service Principal credential support](#service-principal-credential-support).

## Chats and chat members

The Chat resource works with the signed-in user's chats. **Get Many** lists them, **Get** returns one chat that you pick from the list or give by ID (the part after `conversations/` in the chat's link), and **Create** starts a new one. n8n adds you to a new chat automatically, so list only the other people under **Other Participants**. **Chat Type** sets what you create:

* **One-on-One**: a chat between you and one other person. If you already have a chat with that person, Microsoft Teams returns the existing chat instead of creating a new one.
* **Group**: a chat with one or more other people. You can give it a **Topic**, and add or remove members later with the Chat Member operations.

For each participant, pick the user from the list or enter their user principal name or object ID. Set **Role** to **Guest** for a guest account in your tenant, because Microsoft Teams rejects a guest as an owner. For a person from another organization, enter their object ID and their organization's **Tenant ID**.

The Chat Member **Remove** operation takes the member's membership ID, not their user ID. Pick the member from the list, or use the `id` field from a Chat Member **Get Many** result. Microsoft Teams refuses to remove a member from a one-on-one chat, and refuses to remove the last owner of a group chat.

The Chat and Chat Member resources aren't available with the **Service Principal (App-Only)** credential. Refer to [Service Principal credential support](#service-principal-credential-support).

## Service Principal credential support

The **Service Principal (App-Only)** credential has no signed-in user, so the Microsoft Teams node can't run operations that act as one. The list below states what's available for each resource. For the unavailable resources and operations, the node hides their fields and shows a notice when you select this credential. A workflow that still uses one of them fails with an error before the node sends any request.

- **Channel**: all operations.
- **Channel Message**: Get, Get Many, and Get Many Replies. Create and Reply aren't available, because app-only Microsoft Graph only supports migration import for channel messages. Delete and Undo Delete aren't available either, because Microsoft Graph offers them only for a signed-in user. Use an OAuth2 credential for these four operations.
- **Chat**: not available. App-only Microsoft Graph has no signed-in user whose chats it could list, get, or create.
- **Chat Member**: not available. The node's chat picker lists the signed-in user's chats, which app-only access can't do, so the node blocks the whole resource, including chats given by ID.
- **Chat Message**: not available. The node sends and reads chat messages as the signed-in user.
- **Online Meeting**: all operations, run on behalf of the user you select in the **Organizer** field, which the node shows when you select this credential. Pick the organizer from the list, or enter their user principal name or object ID. The app registration needs the `OnlineMeetings.ReadWrite.All` application permission (`OnlineMeetings.Read.All` is enough for Get), `User.Read.All` to pick the organizer from the list or by user principal name, and a Microsoft Teams application access policy that lets the app act on the organizer's meetings. Without the policy, the operations fail with a 403 error. Refer to [Allow app-only online meetings](../credentials/microsoftentraserviceprincipal.md#allow-app-only-online-meetings) for the setup.
- **Task**: all operations. Get Many always lists the tasks of a plan: the node hides the **Tasks For** option, so **Group Member** isn't available. The node also hides the **Team** picker, and the **Plan**, **Bucket**, and **Assigned To** fields accept an ID only.

Refer to [Microsoft Entra Service Principal credentials](../credentials/microsoftentraserviceprincipal.md) for the application permissions each operation needs.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Teams node documentation integration templates](https://n8n.io/integrations/microsoft-teams) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft Teams' API documentation](https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}
