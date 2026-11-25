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

Each event subscribes to a Microsoft Graph resource and needs one of the delegated permissions in the table, least privileged first:

| Event | Delegated permission |
|---|---|
| **New Channel** | `Channel.ReadBasic.All` |
| **New Channel Message** | `ChannelMessage.Read.All` |
| **New Chat** | `Chat.ReadBasic`, `Chat.Read`, or `Chat.ReadWrite` |
| **New Chat Message** | `Chat.Read` or `Chat.ReadWrite` |
| **New Team Member** | `TeamMember.Read.All` |

Listing teams in the node needs `Team.ReadBasic.All`, and listing channels needs `Channel.ReadBasic.All`. `ChannelMessage.Read.All` and `TeamMember.Read.All` need admin consent from a Microsoft Entra administrator. The `Team`, `Channel`, and `Chat` permissions don't.

From n8n 2.45.0, the **Teams OAuth2** credential covers every event by default: `TeamMember.Read.All` is one of its [default scopes for Microsoft Teams](../credentials/microsoft.md#default-scopes-for-microsoft-teams).

The credential's default `User.Read.All` and `Group.ReadWrite.All` scopes are higher-privileged alternatives that also cover the team list, the channel list, and the **New Channel** subscription. The credential needs no extra grant for those. `User.Read.All` and `Group.ReadWrite.All` need admin consent.

A credential connected before n8n 2.45.0 requests `TeamMember.Read.All` when you reconnect it. A Microsoft Entra administrator must consent to the scope before you reconnect, or the sign-in fails. Refer to [New scopes need a new approval](../credentials/microsoft.md#new-scopes-need-a-new-approval) in the Microsoft credentials documentation for how an administrator approves it on n8n Cloud. If the credential uses **Custom Scopes**, add the scope to **Enabled Scopes** if it isn't there, then reconnect. Before n8n 2.45.0, turn on **Custom Scopes** (available from n8n 2.6.0) in the credential, add the scope to **Enabled Scopes**, and reconnect.

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

When you publish a workflow, the Microsoft Teams Trigger node creates a Microsoft Graph change notification subscription for each resource it watches. Microsoft Graph expires Teams subscriptions after three days. The trigger renews a subscription when Microsoft Graph sends a lifecycle notification for it, so a published workflow keeps receiving events with no action from you.

Before n8n 2.45.1, the trigger doesn't renew its subscriptions, so it stops receiving events about three days after you publish the workflow. On those versions, [unpublish the workflow](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows#how-to-unpublish-a-workflow) and publish it again. The trigger then receives new events for about three more days.

After you upgrade, the trigger also renews subscriptions that earlier n8n versions created, as long as they haven't expired. If the workflow stopped receiving events before the upgrade, unpublish it and publish it again. If you built a scheduled workflow that renews the subscriptions or republishes the trigger workflow, unpublish the trigger workflow and publish it again after you upgrade. Then you can unpublish that scheduled workflow.

From n8n 2.45.1, lifecycle notifications (`reauthorizationRequired` and `subscriptionRemoved`) no longer reach the workflow as items. Before n8n 2.45.1, every lifecycle notification starts an execution. If your workflow filters them out with an [If](../core-nodes/n8n-nodes-base.if.md) node on `lifecycleEvent`, you can remove that branch after you upgrade.

Renewal works only while your n8n instance is reachable. If a subscription expires while n8n is down or unreachable, the trigger stops receiving events. Unpublish the workflow and publish it again to re-create the subscription.

The trigger doesn't renew subscriptions for a workflow that has no stored subscription secret, for example after a loss of its static data or a workflow import. The subscriptions expire and the trigger stops receiving events. The instance log shows `Microsoft Teams Trigger: skipped lifecycle notifications: no stored secret, republish the workflow`. To fix it, unpublish the workflow and publish it again.

Renewal can also fail for other reasons, for example a Microsoft Graph rate limit, an expired refresh token, or revoked consent. The trigger doesn't retry, and the workflow shows no failed execution. The instance log shows one of these lines:

* `Microsoft Teams Trigger: failed to renew subscription`
* `Microsoft Teams Trigger: failed to re-create subscription` (from n8n 2.47.0 and n8n 3.1.0, `Microsoft Teams Trigger: failed to create subscription`)
* `Microsoft Teams Trigger: failed to list subscriptions or resolve resources, skipped re-create`

If no renewal succeeds before the subscription expires, the trigger stops receiving events. If the trigger fails to re-create a subscription, it has already stopped receiving events for that resource.

For an expired refresh token, reconnect the credential. For revoked consent, a Microsoft Entra administrator must grant consent again before you reconnect an OAuth2 credential. If you connected the credential before n8n 2.45.0, the reconnect also requests `TeamMember.Read.All`, which needs admin consent, as described in [Required scopes](#required-scopes). Then unpublish the workflow and publish it again to re-create the subscription.

With the default log settings, these log lines don't include the workflow ID or the error message. If you self-host n8n, set `N8N_LOG_FORMAT` to `json` to include them. Refer to [Logs environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/logs) for more information.

If the trigger stops receiving events and you can't find one of these log lines, unpublish the workflow and publish it again.

### One subscription for each watched resource

{% hint style="info" %}
**Feature availability**

Subscription cleanup in the Microsoft Teams Trigger node is available from n8n 2.47.0 and n8n 3.1.0. n8n 3.0.x doesn't include it.
{% endhint %}

From n8n 2.47.0 and n8n 3.1.0, the Microsoft Teams Trigger node keeps one Microsoft Graph subscription for each resource it watches, for example a team or a channel. It also removes the subscriptions it doesn't need:

* When you publish the workflow, the trigger keeps or creates one subscription for each resource. It removes every other subscription it left behind for the workflow, for example leftovers of a failed publish or duplicates.
* When you unpublish the workflow, the trigger removes all its subscriptions.
* When a renewal finds a problem, the trigger cleans up its subscriptions too. A problem is a subscription that Microsoft Graph removed, a subscription that the trigger doesn't know, or a failed renewal.

Before n8n 2.47.0, and in n8n 3.0.x, unpublishing the workflow can leave subscriptions behind. A leftover subscription can cause the [Microsoft Graph subscription limit error](#microsoft-graph-subscription-limit-error).

With **Watch All Channels** turned on, the trigger subscribes to channels created after you publish the workflow only when it cleans up its subscriptions. A renewal that finds no problem doesn't add new channels. To make sure the trigger watches a new channel, unpublish the workflow and publish it again.

### Microsoft Graph subscription limit error

Microsoft Graph limits some kinds of subscription to one for each Microsoft account. For example, it allows one **New Channel** subscription for each team. With the **Service Principal (App-Only)** credential, the limit applies to each app registration instead.

From n8n 2.47.0 and n8n 3.1.0, a publish that goes over this limit fails with one of these errors:

* With an OAuth2 credential: `Microsoft Graph allows only one subscription of this kind per Microsoft account`
* With the **Service Principal (App-Only)** credential: `Microsoft Graph allows only one subscription of this kind per app registration`

The cause is another workflow or n8n instance that watches the same team with the same Microsoft account or app registration. A subscription left behind, for example by a deleted workflow, also counts. When you listen for a test event, the published version of the same workflow counts too.

To fix the error, do one of these, then publish the workflow again:

* Unpublish the other workflow that watches the same team with the same Microsoft account or app registration.
* If no published workflow uses the old subscription, wait up to three days for it to expire.
* Connect the credential with a different Microsoft account. With the **Service Principal (App-Only)** credential, use a different app registration.

Before n8n 2.47.0, and in n8n 3.0.x, the publish fails with the Microsoft Graph error text, which contains `has reached its limit of '1'`. With the **Service Principal (App-Only)** credential, it fails with a missing permission message instead.

### When to unpublish and publish the trigger again

From n8n 2.47.0 and n8n 3.1.0, the Microsoft Teams Trigger node cleans up its own subscriptions. In two cases, you still need to [unpublish the workflow](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows#how-to-unpublish-a-workflow) and publish it again once.

**The trigger receives no events after you upgrade.** A workflow that you published before n8n 2.47.0, or in n8n 3.0.x, can keep a subscription that the trigger can't use. The trigger doesn't replace that subscription by itself. When the subscription expires, the trigger still receives no events. To fix it, unpublish the workflow and publish it again. From n8n 2.50.0 and n8n 3.4.0, on self-hosted n8n with `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` set to `false`, restarting n8n replaces the subscription, so you don't need to unpublish and publish.

**You reconnected the credential with a different Microsoft account.** If you reconnect the credential with a different Microsoft account and don't change the trigger node, the workflow keeps receiving events from the previous account's subscriptions until they expire, up to three days later. After you unpublish the workflow and publish it again, the trigger ignores events from those subscriptions.

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for Microsoft Teams. Refer to the [Microsoft Teams node documentation](../app-nodes/n8n-nodes-base.microsoftteams.md) for more information.


View [example workflows and related content](https://n8n.io/integrations/microsoft-teams-trigger/) on n8n's website.


Refer to the [Microsoft Teams documentation](https://learn.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0) for details about their API.
