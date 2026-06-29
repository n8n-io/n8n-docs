---
title: Microsoft credentials
description: >-
  Documentation for Microsoft credentials. Use these credentials to authenticate
  Microsoft in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Microsoft credentials
originalFilePath: integrations/builtin/credentials/microsoft.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/microsoft'
url: 'https://docs.n8n.io/integrations/builtin/credentials/microsoft'
layout:
  description:
    visible: false
---

# Microsoft credentials <a href="#microsoft-credentials" id="microsoft-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Microsoft Dynamics CRM](../app-nodes/n8n-nodes-base.microsoftdynamicscrm.md)
- [Microsoft Excel](../app-nodes/n8n-nodes-base.microsoftexcel.md)
- [Microsoft Graph Security](../app-nodes/n8n-nodes-base.microsoftgraphsecurity.md)
- [Microsoft OneDrive](../app-nodes/n8n-nodes-base.microsoftonedrive.md)
- [Microsoft Outlook](../app-nodes/n8n-nodes-base.microsoftoutlook.md)
- [Microsoft Outlook Trigger](../trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger.md)
- [Microsoft SharePoint](../app-nodes/n8n-nodes-base.microsoftsharepoint.md)
- [Microsoft Teams](../app-nodes/n8n-nodes-base.microsoftteams.md)
- [Microsoft Teams Trigger](../trigger-nodes/n8n-nodes-base.microsoftteamstrigger.md)
- [Microsoft To Do](../app-nodes/n8n-nodes-base.microsofttodo.md)

{% hint style="info" %}
**Choosing a credential type**

Some nodes (such as Microsoft Excel and Microsoft OneDrive) let you choose between the node-specific credential (for example, **Microsoft Excel OAuth2 API**) and this generic **Microsoft OAuth2 API** credential. The generic credential can be reused across multiple Microsoft nodes; when you use it, make sure it's granted the scopes each node needs. Nodes that don't show this dropdown use their node-specific credential.
{% endhint %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Microsoft Azure](https://azure.microsoft.com/) account.
- Create at least one user account with access to the appropriate service.
- If a corporate Microsoft Entra account manages the user account, the administrator account has enabled the option “User can consent to apps accessing company data on their behalf” for this user (see the [Microsoft Entra documentation](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the linked Microsoft API documentation below for more information about each service's API:

- Dynamics CRM: [Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview)
- Excel: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/excel)
- Graph Security: [Graph API](https://learn.microsoft.com/en-us/graph/api/overview)
- OneDrive: [Graph API](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/)
- Outlook: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview) and [Outlook API](https://learn.microsoft.com/en-us/outlook/rest/reference)
- Teams: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/teams-api-overview)
- To Do: [Graph API](https://learn.microsoft.com/en-us/graph/todo-concept-overview)

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

Some Microsoft services require extra information for OAuth2. Refer to [Service-specific settings](#service-specific-settings) for more guidance on those services.

For self-hosted users, there are two main steps to configure OAuth2 from scratch:

1. [Register an application](#register-an-application) with the Microsoft Identity Platform.
2. Add a credential to that application, either by [generating a client secret](#generate-a-client-secret) or [registering a certificate](#authenticate-with-a-certificate).

Follow the detailed instructions for each step below. For more detail on the Microsoft OAuth2 web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts).

### Register an application <a href="#register-an-application" id="register-an-application"></a>

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

### Generate a client secret <a href="#generate-a-client-secret" id="generate-a-client-secret"></a>

With your application created, generate a client secret for it:

1. On your Microsoft application page, select **Certificates & secrets** in the left navigation.
1. In **Client secrets**, select **+ New client secret**.
1. Enter a **Description** for your client secret, such as `n8n credential`.
1. Select **Add**.
1. Copy the **Secret** in the **Value** column.
1. Paste it into n8n as the **Client Secret**.
1. If you see other fields in the n8n credential, refer to [Service-specific settings](#service-specific-settings) below for guidance on completing those fields.
1. Select **Connect my account** in n8n to finish setting up the connection.
1. Log in to your Microsoft account and allow the app to access your info.

Refer to Microsoft's [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials) for more information on adding a client secret.

### Authenticate with a certificate <a href="#authenticate-with-a-certificate" id="authenticate-with-a-certificate"></a>

Instead of a client secret, you can authenticate the application with a **certificate** (a signed client assertion, also known as `private_key_jwt`). This is useful when your organization's security policy doesn't allow text client secrets. The OAuth2 flow is otherwise unchanged: the same sign-in, consent screen, and permissions apply. Only the application's proof of identity at the token exchange and refresh changes from a secret to a signed assertion.

The default authentication method is **Client Secret**, so existing credentials keep working. Switch a credential to **Certificate** only when you want to use one.

#### Generate a certificate <a href="#generate-a-certificate" id="generate-a-certificate"></a>

If you don't already have one, create a self-signed certificate and private key with [OpenSSL](https://www.openssl.org/):

```shell
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout private-key.pem \
  -out certificate.pem \
  -days 365 \
  -subj "/CN=n8n-microsoft-cert"
```

This produces two files:

- `private-key.pem`: the RSA private key. Keep it private: you paste it into n8n, and n8n never sends it to Microsoft.
- `certificate.pem`: the public certificate. You upload this to your Entra app registration.

The private key must be an **RSA** key. n8n signs the client assertion with RS256, so EC and Ed25519 keys don't work.

#### Register the certificate on your app <a href="#register-the-certificate-on-your-app" id="register-the-certificate-on-your-app"></a>

1. On your Microsoft application page, select **Certificates & secrets** in the left navigation.
2. Select the **Certificates** tab, then select **Upload certificate**.
3. Select your `certificate.pem` file (the public certificate, not the private key).
4. Enter an optional **Description**, such as `n8n credential`, then select **Add**.

Refer to Microsoft's [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials) for more information on adding a certificate.

#### Complete the credential in n8n <a href="#complete-the-certificate-credential-in-n8n" id="complete-the-certificate-credential-in-n8n"></a>

1. Set **Authentication** to **Certificate**.
2. Paste the contents of `private-key.pem` into the **Private Key** field.
3. Paste the contents of `certificate.pem` into the **Certificate** field.
4. If you see other fields in the n8n credential, refer to [Service-specific settings](#service-specific-settings) below for guidance on completing those fields.
5. Select **Connect my account** in n8n to finish setting up the connection.
6. Log in to your Microsoft account and allow the app to access your info.

Token refresh also uses the certificate, so n8n never sends a client secret.

### Microsoft Graph API Base URL <a href="#microsoft-graph-api-base-url" id="microsoft-graph-api-base-url"></a>

The Microsoft OAuth2 credential supports different Microsoft cloud environments. Select the appropriate endpoint based on your tenant's cloud environment:

- **Global**: Use for standard Microsoft 365 tenants (default)
- **US Government**: Use for Azure US Government (GCC) tenants
- **US Government DOD**: Use for Azure US Government Department of Defense tenants
- **China**: Use for Microsoft 365 operated by 21Vianet in China

This setting applies to all Microsoft Graph API nodes that use Microsoft credentials, including:

- Microsoft Teams
- Microsoft Outlook
- Microsoft Excel
- Microsoft OneDrive
- Microsoft Graph Security
- Microsoft To Do

{% hint style="warning" %}
**Government Cloud Authorization URLs**

If you're using a government cloud tenant, you may also need to update the **Authorization URL** and **Access Token URL** fields in your credential to use the government cloud endpoints. For example:

- US Government: Use `https://login.microsoftonline.us/{tenant}/oauth2/v2.0/authorize` and `https://login.microsoftonline.us/{tenant}/oauth2/v2.0/token`
- Replace `{tenant}` with your tenant ID or use `common` for multi-tenant apps
{% endhint %}

### Custom Scopes <a href="#custom-scopes" id="custom-scopes"></a>

Define granular permissions for interacting with the following Microsoft services:

* Microsoft Teams
* Microsoft Excel

### Service-specific settings <a href="#service-specific-settings" id="service-specific-settings"></a>

The following services require extra information for OAuth2:

#### Dynamics <a href="#dynamics" id="dynamics"></a>

Dynamics OAuth2 requires information about your Dynamics domain and region. Follow these extra steps to complete the credential:

1. Enter your Dynamics **Domain**.
2. Select the Dynamics data center **Region** you're within.

Refer to the [Microsoft Datacenter regions documentation](https://learn.microsoft.com/en-us/power-platform/admin/new-datacenter-regions) for more information on the region options and corresponding URLs.

#### Microsoft (general) <a href="#microsoft-general" id="microsoft-general"></a>

The general Microsoft OAuth2 also requires you to provide a space-separated list of **Scope**s for this credential.

Refer to [Scopes and permissions in the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc) for a list of possible scopes.

#### Outlook <a href="#outlook" id="outlook"></a>

Outlook OAuth2 supports the credential accessing a user's primary email inbox or a shared inbox. By default, the credential will access a user's primary email inbox. To change this behavior:

1. Turn on **Use Shared Inbox**.
2. Enter the target user's UPN or ID as the **User Principal Name**.

#### SharePoint <a href="#sharepoint" id="sharepoint"></a>

SharePoint OAuth2 requires information about your SharePoint **Subdomain**.

To complete the credential, enter the **Subdomain** part of your SharePoint URL. For example, if your SharePoint URL is `https://tenant123.sharepoint.com`, the subdomain is `tenant123`.

SharePoint requires the following permissions:

Application permissions:

* `Sites.Read.All`
* `Sites.ReadWrite.All`

Delegated permissions:

* `SearchConfiguration.Read.All`
* `SearchConfiguration.ReadWrite.All`

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are the known common errors and issues with Microsoft OAuth2 credentials.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/fXYywkPyzPTxeGOEnYgb/" %}
