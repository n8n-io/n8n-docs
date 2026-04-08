---
title: Microsoft Entra ID credentials
description: Documentation for the Microsoft Entra ID credentials. Use these credentials to authenticate Microsoft Entra ID in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Microsoft Entra ID credentials

You can use these credentials to authenticate the following nodes:

* [Microsoft Entra ID](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftentra.md)

## Prerequisites

- Create a Microsoft Entra ID account or subscription.
- If the user account is managed by a corporate Microsoft Entra account, the administrator account has enabled the option “User can consent to apps accessing company data on their behalf” for this user (see the [Microsoft Entra documentation](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)).

Microsoft includes an Entra ID free plan when you create a [Microsoft Azure](https://azure.microsoft.com/) account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Microsoft Entra ID's documentation](https://www.microsoft.com/en-us/security/business/identity-access/azure-active-directory) for more information about the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

For self-hosted users, there are two main steps to configure OAuth2 from scratch:

1. [Register an application](#register-an-application) with the Microsoft Identity Platform.
2. [Generate a client secret](#generate-a-client-secret) for that application.

Follow the detailed instructions for each step below. For more detail on the Microsoft OAuth2 web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts). 

### Register an application

Register an application with the Microsoft Identity Platform:

1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. Select **Register an application**.
3. Enter a **Name** for your app.
4. In **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
5. In **Register an application**:
    1. Copy the **OAuth Callback URL** from your n8n credential.
    2. Paste it into the **Redirect URI (optional)** field.
    3. Select **Select a platform** > **Web**.
6. Select **Register** to finish creating your application.
7. Copy the **Application (client) ID** and paste it into n8n as the **Client ID**.

Refer to [Register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2) for more information.

### Generate a client secret

With your application created, generate a client secret for it:

1. On your Microsoft application page, select **Certificates & secrets** in the left navigation.
1. In **Client secrets**, select **+ New client secret**.
1. Enter a **Description** for your client secret, such as `n8n credential`.
1. Select **Add**.
1. Copy the **Secret** in the **Value** column.
1. Paste it into n8n as the **Client Secret**.
1. Select **Connect my account** in n8n to finish setting up the connection.
1. Log in to your Microsoft account and allow the app to access your info.

Refer to Microsoft's [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials) for more information on adding a client secret.

### Microsoft Graph API Base URL

Microsoft Entra ID credentials extend the Microsoft OAuth2 API credentials and support different Microsoft cloud environments. Select the appropriate endpoint based on your tenant's cloud environment:

- **Global**: Use for standard Microsoft 365 tenants (default)
- **US Government**: Use for Azure US Government (GCC) tenants
- **US Government DOD**: Use for Azure US Government Department of Defense tenants
- **China**: Use for Microsoft 365 operated by 21Vianet in China

/// warning | Government Cloud Authorization URLs
If you're using a government cloud tenant, you may also need to update the **Authorization URL** and **Access Token URL** fields in your credential to use the government cloud endpoints. For example:
- US Government: Use `https://login.microsoftonline.us/{tenant}/oauth2/v2.0/authorize` and `https://login.microsoftonline.us/{tenant}/oauth2/v2.0/token`
- Replace `{tenant}` with your tenant ID or use `common` for multi-tenant apps
///

## Setting custom scopes

Microsoft Entra ID credentials use the following scopes by default:

* [`openid`](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc#the-openid-scope)
* [`offline_access`](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc#the-offline_access-scope)
* [`AccessReview.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#accessreviewreadwriteall)
* [`Directory.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#directoryreadwriteall)
* [`NetworkAccessPolicy.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#networkaccesspolicyreadwriteall)
* [`DelegatedAdminRelationship.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#delegatedadminrelationshipreadwriteall)
* [`EntitlementManagement.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#entitlementmanagementreadwriteall)
* [`User.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#userreadwriteall)
* [`Directory.AccessAsUser.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#directoryaccessasuserall)
* [`Sites.FullControl.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#sitesfullcontrolall)
* [`GroupMember.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#groupmemberreadwriteall)

To select different scopes for your credentials, enable the **Custom Scopes** slider and edit the **Enabled Scopes** list. Keep in mind that some features may not work as expected with more restrictive scopes.


## Delegated access for organisation-wide Microsoft integrations

This section explains how an n8n administrator can register a single Entra ID app with delegated permissions, grant admin consent once, and then pre-configure n8n so that other users in the organisation can connect Microsoft services (Outlook, Teams, OneDrive, and others) without completing their own OAuth app registration.

### Register the app

1. In the [Microsoft Entra admin centre](https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade/quickStartType~/null/sourceType/Microsoft_AAD_IAM), go to **App registrations** and select **+ New registration**.

    /// note
    Register under **App registrations**, not **Enterprise applications**.
    ///

2. Enter a meaningful **Name** for the app, for example `n8n Outlook`.
3. Under **Supported account types**, select **Multiple Entra ID tenants**.
4. Under **Allow only certain tenants (Preview)**, select **Manage allowed tenants** and add your tenant. The red banner disappears once your tenant is added.
5. Leave the **Redirect URI** blank for now and select **Register**.
6. On the app overview page, copy the **Application (client) ID**. You'll need this later.

### Generate a client secret

1. On the app overview page, select **Add a certificate or secret** under **Client credentials**.
2. Select **+ New client secret**.
3. Enter a **Description** (for example, `n8n token`) and choose an expiry period that matches your organisation's credentials policy.
4. Select **Add**.
5. Copy the **Value** immediately.

    /// warning
    The secret value is only shown once. Don't navigate away without copying it: you will be unable to retrieve it later.
    ///

### Configure API permissions

1. In the left navigation, click **API permissions**.
2. Click **+ Add a permission** > **Microsoft Graph** > **Delegated permissions**.
3. In the **Select permissions** box, search for each required scope and check the box next to it. Repeat for all scopes needed by the integrations you want to enable. Refer to [Required scopes by integration](#required-scopes-by-integration) below for the full list.
4. Select **Add permissions**.

### Add the redirect URI

1. In n8n, create a workflow containing a node for one of the Microsoft integrations you want to configure (for example, Microsoft Outlook).
2. Open the node and select **Set up credential** > **Create new credential**.
3. Give the credential a meaningful name (for example, `admin@yourorg.com`).
4. Copy the **OAuth Redirect URL** shown in the n8n credential panel.
5. Back in Entra, go to the app overview page and select **Add a redirect URI** under **Redirect URIs**.
6. Select **+ Add redirect URI**, choose **Web**, paste in the URL copied from n8n, and select **Configure**.

### Grant admin consent in n8n

1. In n8n, paste the **Client ID** and **Client Secret** you copied earlier into the credential panel.
2. Select **Connect to [service]** (for example, **Connect to Microsoft Outlook**).
3. In the sign-in popup, check **Consent on behalf of your organization**, then select **Accept**.

    /// warning
    You must be signed in as an admin to grant organisation-wide consent. Non-admin accounts will see a message stating that admin approval is required.
    ///

4. A success banner in n8n confirms the connection is working and that consent has been granted correctly.

### Pre-configure credentials for users

Once admin consent is granted, use [credential overwrites](/hosting/configuration/credential-overwrites.md) to pre-configure the Client ID and Client Secret so users in your organisation can connect without their own app registration. Refer to the [Microsoft OAuth credential overwrites configuration guide](/hosting/configuration/configuration-examples/microsoft-oauth-credential-overwrites.md) for Docker and Kubernetes setup instructions.

### Required scopes by integration

The following scopes are required for each Microsoft integration as of March 2026. When configuring API permissions in Entra, add the scopes for every integration you plan to enable.

| Integration | Required scopes |
|---|---|
| **Microsoft Dynamics** | `openid`, `offline_access` |
| **Microsoft Entra ID** | `openid`, `offline_access`, `AccessReview.ReadWrite.All`, `Directory.ReadWrite.All`, `NetworkAccessPolicy.ReadWrite.All`, `DelegatedAdminRelationship.ReadWrite.All`, `EntitlementManagement.ReadWrite.All`, `User.ReadWrite.All`, `Directory.AccessAsUser.All`, `Sites.FullControl.All`, `GroupMember.ReadWrite.All` |
| **Microsoft Excel** | `openid`, `offline_access`, `Files.ReadWrite` |
| **Microsoft Graph Security** | `SecurityEvents.ReadWrite.All`, `offline_access` |
| **Microsoft OneDrive** | `openid`, `offline_access`, `Files.ReadWrite.All` |
| **Microsoft Outlook** | `openid`, `offline_access`, `Contacts.Read`, `Contacts.ReadWrite`, `Calendars.Read`, `Calendars.Read.Shared`, `Calendars.ReadWrite`, `Mail.ReadWrite`, `Mail.ReadWrite.Shared`, `Mail.Send`, `Mail.Send.Shared`, `MailboxSettings.Read` |
| **Microsoft SharePoint** | `openid`, `offline_access` |
| **Microsoft Teams** | `openid`, `offline_access`, `User.Read.All`, `Group.ReadWrite.All`, `Chat.ReadWrite`, `ChannelMessage.Read.All` |
| **Microsoft To Do** | `openid`, `offline_access`, `Tasks.ReadWrite` |
| **Additional permissions for triggers** | `Chat.Read.All`, `Team.ReadBasic.All`, `Subscription.Read.All` |

## Common issues

Here are the known common errors and issues with Microsoft Entra credentials.

--8<-- "_snippets/integrations/builtin/credentials/microsoft-need-admin-approval.md"

### Admin approval required during delegated access setup

If a user sees a screen stating that admin approval is required, it means organisation-wide consent hasn't yet been granted for the app registration.

To resolve this, complete the [Grant admin consent in n8n](#grant-admin-consent-in-n8n) steps above using an Entra ID admin account.

Alternatively, an administrator can grant consent directly in Entra without going through n8n by navigating to:

**Enterprise applications** > [your app] > **Security** > **Permissions** > **Grant admin consent for [your organisation]**

Once consent is granted, standard users can authenticate without encountering the admin approval prompt.
