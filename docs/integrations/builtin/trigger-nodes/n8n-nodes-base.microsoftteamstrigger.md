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

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Events <a href="#events" id="events"></a>

* **New Channel**
* **New Channel Message**
* **New Chat**
* **New Chat Message**
* **New Team Member**

## Required scopes

Each event subscribes to a Microsoft Graph resource and needs one of the delegated permissions in the table, least privileged first:

| Event | Delegated permission |
|---|---|
| **New Channel** | `Channel.ReadBasic.All` |
| **New Channel Message** | `ChannelMessage.Read.All` |
| **New Chat** | `Chat.ReadBasic`, `Chat.Read`, or `Chat.ReadWrite` |
| **New Chat Message** | `Chat.Read` or `Chat.ReadWrite` |
| **New Team Member** | `TeamMember.Read.All` |

Listing teams in the node needs `Team.ReadBasic.All`, and listing channels needs `Channel.ReadBasic.All`. `ChannelMessage.Read.All` and `TeamMember.Read.All` need admin consent from a Microsoft Entra administrator. The `Team`, `Channel`, and `Chat` permissions don't.

The **Teams OAuth2** credential covers every event by default. `TeamMember.Read.All` is one of its [default scopes for Microsoft Teams](../credentials/microsoft.md#default-scopes-for-microsoft-teams) from n8n 2.45.0. Its default `User.Read.All` and `Group.ReadWrite.All` scopes also authorise the team and channel lists and the New Channel subscription as higher privileged alternatives. The credential needs no extra grant for those. Both scopes need admin consent.

A credential connected before n8n 2.45.0 requests `TeamMember.Read.All` when you reconnect it. A Microsoft Entra administrator must consent to the scope first, or the sign-in fails. A credential with **Custom Scopes** on keeps its own list: add the scope to **Enabled Scopes** and reconnect. On n8n versions before 2.45.0, enable **Custom Scopes** on the credential, add the scope to **Enabled Scopes**, and reconnect.

With the **Microsoft OAuth2 (Graph)** credential, enter the scopes in the credential's **Scope** field. Include `openid offline_access` so the credential can refresh its tokens. For example, to use every event with the least privileged scopes:

```
openid offline_access Team.ReadBasic.All Channel.ReadBasic.All Chat.Read ChannelMessage.Read.All TeamMember.Read.All
```

The **Service Principal (App-Only)** credential uses application permissions instead. Refer to [Required application permissions by node](../credentials/microsoftentraserviceprincipal.md#required-application-permissions-by-node) in the Microsoft Entra Service Principal credentials documentation for the permission each event needs. Chat events aren't available with this credential.

## Subscription renewal

{% hint style="info" %}
**Feature availability**

Automatic subscription renewal in the Microsoft Teams Trigger node is available from n8n 2.45.1.
{% endhint %}

When you publish a workflow, the Microsoft Teams Trigger node creates a Microsoft Graph change notification subscription for each resource it watches. Microsoft Graph expires Teams subscriptions after three days. The trigger renews a subscription when Microsoft Graph sends a lifecycle notification for it, so a published workflow keeps receiving events without a republish. The trigger also renews subscriptions that earlier n8n versions created. You don't need to republish after the upgrade.

Renewal works only while your n8n instance is reachable. If a subscription expires while n8n is down, the trigger re-creates it on the next restart or republish.

The trigger doesn't renew subscriptions for a workflow that has no stored subscription secret, for example after a loss of its static data or a workflow import. The subscriptions expire and the trigger stops receiving events. The instance log shows `Microsoft Teams Trigger: skipped lifecycle notifications: no stored secret, republish the workflow`. Republish the workflow to fix it.

From n8n 2.45.1, lifecycle notifications (`reauthorizationRequired`, `subscriptionRemoved`, and `missed`) no longer reach the workflow as items. On earlier versions, every lifecycle notification started an execution. A workflow that filtered them with an [If node](../core-nodes/n8n-nodes-base.if.md) on `lifecycleEvent` can drop that branch.

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for Microsoft Teams. Refer to the [Microsoft Teams node documentation](../app-nodes/n8n-nodes-base.microsoftteams.md) for more information.


View [example workflows and related content](https://n8n.io/integrations/microsoft-teams-trigger/) on n8n's website.


Refer to the [Microsoft Teams documentation](https://learn.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0) for details about their API.
