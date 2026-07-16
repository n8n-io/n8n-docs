---
title: Microsoft Entra Service Principal credentials
description: >-
  Documentation for the Microsoft Entra Service Principal credentials. Use
  these credentials to authenticate Microsoft services in n8n, a workflow
  automation platform.
contentType:
  - integration
  - reference
priority: medium
layout:
  description:
    visible: false
---

# Microsoft Entra Service Principal credentials

The Microsoft Entra Service Principal credential gives n8n app-only access to Microsoft Graph. Instead of signing in as a person, n8n authenticates as an app registration that an administrator sets up once in the Microsoft Entra admin center. This suits unattended and shared workflows: there's no user session to expire and no per-user consent to manage.

You can use these credentials to authenticate the following nodes:

* [Microsoft Excel (OneDrive)](../app-nodes/n8n-nodes-base.microsoftexcel.md)
* [Microsoft OneDrive](../app-nodes/n8n-nodes-base.microsoftonedrive.md)
* [Microsoft OneDrive Trigger](../trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger.md)
* [Microsoft Outlook](../app-nodes/n8n-nodes-base.microsoftoutlook.md)
* [Microsoft Outlook Trigger](../trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger.md)
* [Microsoft Teams](../app-nodes/n8n-nodes-base.microsoftteams.md)
* [Microsoft Teams Trigger](../trigger-nodes/n8n-nodes-base.microsoftteamstrigger.md)
* [Microsoft To Do](../app-nodes/n8n-nodes-base.microsofttodo.md)

{% hint style="info" %}
**Node version requirements**

The Microsoft Excel (OneDrive), Microsoft Outlook, and Microsoft Teams nodes support this credential from version 2 of the node. n8n plans to support the Microsoft SharePoint node.
{% endhint %}

## Prerequisites

- A Microsoft 365 organization tenant. Personal Microsoft accounts don't support application permissions.
- Access to the [Microsoft Entra admin center](https://entra.microsoft.com/) as an administrator who can create app registrations and grant admin consent, or an administrator who can grant consent for you.

## Supported authentication methods

- OAuth2 client credentials, using a client secret

Certificate authentication is coming in a future release.

## Related resources

Refer to Microsoft's documentation for more information:

- [Get access without a user](https://learn.microsoft.com/en-us/graph/auth-v2-service): how app-only authentication works
- [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)

## How app-only access differs from OAuth2

With the OAuth2 Microsoft credentials, nodes act as the user who signed in. With the Service Principal credential, there's no signed-in user, which changes how you use the nodes:

- **You choose who or what to act on.** Each node shows an extra required parameter when you select this credential: **Access As** (a user or drive) in Microsoft OneDrive, Microsoft OneDrive Trigger, and Microsoft Excel (OneDrive), **Mailbox** in Microsoft Outlook and Microsoft Outlook Trigger, and **User** in Microsoft To Do. Enter a user principal name (UPN), for example `jane@contoso.com`, or a user object ID. In the **Access As** field you can instead select **Drive** and enter a drive ID. There's no list picker for these fields: paste the value directly. In the Microsoft Teams nodes, the **Authentication** option is labelled **Service Principal (App-Only)**, and the **Task** operations replace the group, plan, bucket, and member pickers with plain ID fields.
- **Permissions apply tenant-wide.** Application permissions aren't scoped to one user. For example, the `Mail.Send` application permission lets the app send as any mailbox in the tenant unless you restrict it with an [Exchange Online application access policy](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access). n8n recommends scoping tenant-wide mail permissions with an application access policy.
- **Pickers see the whole tenant.** For example, the Microsoft Teams **Team** picker lists every team in the organization, not just teams the app has joined.
- **Some operations aren't available.** The nodes hide anything that only exists for a signed-in user, such as drive search or Teams chats, or block it with an explanatory error. Refer to [Operations not available with app-only access](#operations-not-available-with-app-only-access).

## Set up the app registration

Complete these steps in the Microsoft Entra admin center before you create the credential in n8n.

### Register an app

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com/) and go to **Entra ID** > **App registrations**.
2. Select **New registration**.
3. Enter a **Name** for your app, for example `n8n service principal`.
4. In **Supported account types**, select **Accounts in this organizational directory only**. You don't need a redirect URI.
5. Select **Register**.
6. On the app's **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID**. You'll need both in n8n.

### Add application permissions

1. In your app registration, select **API permissions** > **Add a permission** > **Microsoft Graph**.
2. Select **Application permissions**. Don't select **Delegated permissions**: app-only access ignores delegated scopes, and the permission names differ between the two types.
3. Add the permissions for the nodes you plan to use. Refer to [Required application permissions by node](#required-application-permissions-by-node).
4. Add `Organization.Read.All` (or the broader `Directory.Read.All`). The n8n credential test reads your organization from Microsoft Graph, so it fails without one of these.
5. Select **Add permissions**.

### Grant admin consent

1. On the **API permissions** page, select **Grant admin consent for \<your tenant\>** and confirm.
2. Check that the **Status** column shows **Granted** for every permission.

{% hint style="warning" %}
**Missing admin consent fails with a generic permissions error**

If nobody grants admin consent, everything looks fine at first: the credential saves and Microsoft still issues a token. But the token contains no permissions, so every operation fails with a generic Microsoft Graph permissions error, such as HTTP 403 `Authorization_RequestDenied` ("Insufficient privileges to complete the operation"). The credential values aren't the problem.

To fix it, open the app registration's **API permissions** page, check that every permission shows **Granted**, and grant admin consent if not. n8n caches the access token, so retest the credential after granting consent. If it still fails, recreate the credential to force a fresh token.
{% endhint %}

### Create a client secret

1. In your app registration, select **Certificates & secrets** > **Client secrets** > **New client secret**.
2. Enter a **Description**, for example `n8n credential`, and choose an expiry.
3. Select **Add**.
4. Copy the secret's **Value** right away. Microsoft only shows it once.

### Create the credential in n8n

In n8n, create a new **Microsoft Entra Service Principal** credential and fill in these fields:

1. **Directory (Tenant) ID**: the Directory (tenant) ID from your app registration's **Overview** page. You can also use a verified domain, for example `contoso.onmicrosoft.com`.
2. **Application (Client) ID**: the Application (client) ID from your app registration's **Overview** page.
3. **Client Secret**: the client secret value you copied.
4. **Microsoft Graph API Base URL**: keep **Global** unless your tenant is in a sovereign cloud. Refer to [Sovereign cloud environments](#sovereign-cloud-environments).

Save and test the credential. The connection test calls Microsoft Graph's `/v1.0/organization` endpoint, so it needs the admin-consented `Organization.Read.All` (or `Directory.Read.All`) application permission to pass, even if you granted all the node permissions.

## Required application permissions by node

Add the application permissions for every node you plan to use, then grant admin consent. All permissions in this table are Microsoft Graph **Application** permissions, not Delegated permissions.

| Node | Required application permissions |
|---|---|
| All nodes (credential test) | `Organization.Read.All` or `Directory.Read.All` |
| Microsoft OneDrive and Microsoft OneDrive Trigger | `Files.ReadWrite.All` (`Files.Read.All` is enough for read-only operations and the trigger) |
| Microsoft Excel (OneDrive) | `Files.ReadWrite.All` |
| Microsoft Outlook | `Mail.ReadWrite` (messages, drafts, folders, and attachments; also required by Reply and Draft: Send, which create or update a draft before sending), `Mail.Send` (send and reply), `Calendars.ReadWrite` (calendars and events), `Contacts.ReadWrite` (contacts), `MailboxSettings.Read` (loads the Categories dropdown). Add only the ones your operations use. |
| Microsoft Outlook Trigger | `Mail.Read` |
| Microsoft Teams and Microsoft Teams Trigger | `Team.ReadBasic.All`, plus the permissions for your operations in the table below |
| Microsoft To Do | `Tasks.ReadWrite.All` |

The Microsoft Teams node needs `Team.ReadBasic.All` to list teams, plus a permission per operation:

<!-- vale off -->

| Teams operation | Application permission |
|---|---|
| Channel: Get, Get Many | `Channel.ReadBasic.All` |
| Channel: Create | `Channel.Create` |
| Channel: Update | `ChannelSettings.ReadWrite.All` |
| Channel: Delete | `Channel.Delete.All` |
| Channel Message: Get Many | `ChannelMessage.Read.All` |
| Task: all operations | `Tasks.ReadWrite.All` |
| Trigger: New Channel | `Channel.ReadBasic.All` |
| Trigger: New Channel Message | `ChannelMessage.Read.All` |
| Trigger: New Team Member | `TeamMember.Read.All` |

<!-- vale on -->

{% hint style="info" %}
**Reading Teams channel messages uses a metered API**

Reading channel messages with this credential uses Microsoft's metered Teams API. Your tenant may need billing or evaluation-model configuration, and Microsoft returns HTTP 402 if it's missing. Refer to [Payment models for Microsoft Teams APIs](https://learn.microsoft.com/en-us/graph/teams-licenses) for details.
{% endhint %}

## Operations not available with app-only access

Some Microsoft Graph operations only exist for a signed-in user. When you select this credential, the nodes hide or block them with an explanatory error. Use an OAuth2 credential if you need them:

<!-- vale off -->

- **Microsoft OneDrive**: File: Search and Folder: Search. Microsoft Graph only offers drive search to signed-in users.
- **Microsoft Excel (OneDrive)**: Workbook: Get Many, and searching for a workbook by name in the **Workbook** field. Set the field to **By ID** instead.
- **Microsoft Teams**: the whole Chat Message resource, Channel Message: Create, and Task: Get Many in Group Member mode.
- **Microsoft Teams Trigger**: the New Chat and New Chat Message events, and the watch-all options. Pick a specific team or channel instead.

<!-- vale on -->

The Microsoft Outlook, Microsoft Outlook Trigger, and Microsoft To Do nodes have no blocked operations.

File: Share and Folder: Share in Microsoft OneDrive stay available, but creating sharing links app-only can need extra tenant or admin configuration. The node shows a notice on these operations.

## Sovereign cloud environments

Select the **Microsoft Graph API Base URL** that matches your tenant's cloud environment:

<!-- vale off -->

- **Global (https://graph.microsoft.com)**: standard Microsoft 365 tenants (default)
- **US Government (https://graph.microsoft.us)**: Azure US Government tenants, including GCC High
- **US Government DOD (https://dod-graph.microsoft.us)**: Azure US Government Department of Defense tenants
- **China (https://microsoftgraph.chinacloudapi.cn)**: Microsoft 365 operated by 21Vianet in China

n8n derives the matching sign-in endpoint automatically, for example `login.microsoftonline.us` for the US Government clouds and `login.partner.microsoftonline.cn` for China, so you don't need to configure any token or authorization URLs. Complete the app registration in your cloud's own Entra admin center, and the nodes route all Microsoft Graph calls through the endpoint you selected.

<!-- vale on -->

## Common issues

Here are common errors and issues with the Microsoft Entra Service Principal credentials:

- **The credential test fails even though you granted the node permissions.** The connection test calls `GET /v1.0/organization`, which needs an admin-consented `Organization.Read.All` (or `Directory.Read.All`) application permission. Add it and grant admin consent.
- **Every operation fails with a generic permissions error.** This almost always means a missing application permission or missing admin consent. Refer to the warning in [Grant admin consent](#grant-admin-consent). The Microsoft Teams nodes show a clearer message instead: "The app registration is missing a consented application permission for this operation."
- **Permission or secret changes don't take effect right away.** n8n caches the access token. Retest the credential after granting consent or rotating a secret, and recreate it if the cached token keeps failing.
- **"Microsoft Entra tenant ID is not a valid GUID or domain."** Enter the Directory (tenant) ID GUID from the app registration's **Overview** page, or a verified domain such as `contoso.onmicrosoft.com`. Don't enter a URL.
