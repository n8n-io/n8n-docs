---
title: Microsoft Teams Trigger node documentation
description: >-
  Learn how to use the Microsoft Teams Trigger node in n8n. Follow technical
  documentation to integrate Microsoft Teams Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Microsoft Teams Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftteamstrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftteamstrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftteamstrigger
layout:
  description:
    visible: false
---

# Microsoft Teams Trigger node <a href="#microsoft-teams-trigger-node" id="microsoft-teams-trigger-node"></a>

Use the Microsoft Teams Trigger node to respond to events in [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software) and integrate Microsoft Teams with other applications.

On this page, you'll find a list of events the Microsoft Teams Trigger node can respond to and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Microsoft credentials documentation](../credentials/microsoft.md) for authentication information for this node. This node also supports the [Microsoft Entra Service Principal credentials](../credentials/microsoftentraserviceprincipal.md) for app-only access with no signed-in user: select **Service Principal (App-Only)** in the **Authentication** dropdown.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

## Events <a href="#events" id="events"></a>

* **New Channel**
* **New Channel Message**
* **New Chat**
* **New Chat Message**
* **New Team Member**

## Required scopes

Each event subscribes to a Microsoft Graph resource and needs one delegated permission for it:

| Event | Delegated permission |
|---|---|
| **New Channel** | `Group.ReadWrite.All` |
| **New Channel Message** | `ChannelMessage.Read.All` |
| **New Chat** | `Chat.ReadBasic`, `Chat.Read`, or `Chat.ReadWrite` |
| **New Chat Message** | `Chat.Read` or `Chat.ReadWrite` |
| **New Team Member** | `TeamMember.Read.All` |

Listing teams and channels in the node needs `User.Read.All` and `Group.ReadWrite.All`. Every permission except the `Chat` ones needs admin consent from a Microsoft Entra administrator.

The **Teams OAuth2** credential covers every event by default, except New Team Member: it doesn't request `TeamMember.Read.All` yet.

Until the n8n release that adds `TeamMember.Read.All` to the [default scopes for Microsoft Teams](../credentials/microsoft.md#default-scopes-for-microsoft-teams), enable **Custom Scopes** on the credential, add the scope to **Enabled Scopes**, and reconnect.

With the **Microsoft OAuth2 (Graph)** credential, enter the scopes in the credential's **Scope** field. Include `openid offline_access` so the credential can refresh its tokens. For example, to use every event:

```
openid offline_access User.Read.All Group.ReadWrite.All Chat.ReadWrite ChannelMessage.Read.All TeamMember.Read.All
```

The **Service Principal (App-Only)** credential uses application permissions instead. Refer to [Required application permissions by node](../credentials/microsoftentraserviceprincipal.md#required-application-permissions-by-node) in the Microsoft Entra Service Principal credentials documentation for the permission each event needs. Chat events aren't available with this credential.

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for Microsoft Teams. Refer to the [Microsoft Teams node documentation](../app-nodes/n8n-nodes-base.microsoftteams.md) for more information.


View [example workflows and related content](https://n8n.io/integrations/microsoft-teams-trigger/) on n8n's website.


Refer to the [Microsoft Teams documentation](https://learn.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0) for details about their API.
