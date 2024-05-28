---
title: Microsoft credentials
description: Documentation for Microsoft credentials. Use these credentials to authenticate Microsoft in n8n, a workflow automation platform.
contentType: integration
---

# Microsoft credentials

You can use these credentials to authenticate the following nodes:

- [Microsoft Dynamics CRM](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftdynamicscrm/)
- [Microsoft Excel](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel/)
- [Microsoft Graph Security](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftgraphsecurity/)
- [Microsoft OneDrive](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive/)
- [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/)
- [Microsoft Teams](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams/)
- [Microsoft To Do](/integrations/builtin/app-nodes/n8n-nodes-base.microsofttodo/)


## Prerequisites

- Create a [Microsoft Azure](https://azure.microsoft.com/){:target=_blank .external-link} account.
- Create at least one user account with access to the appropriate service.

## Supported authentication methods

- OAuth2

## Related resources

Refer to the linked Microsoft API documentation below for more information about each service's API:

- Dynamics CRM: [Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview){:target=_blank .external-link}
- Excel: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/excel){:target=_blank .external-link}
- Graph Security: [Graph API](https://learn.microsoft.com/en-us/graph/api/overview){:target=_blank .external-link}
- OneDrive: [Graph API](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/){:target=_blank .external-link}
- Outlook: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview){:target=_blank .external-link} and [Outlook API](https://learn.microsoft.com/en-us/outlook/rest/reference){:target=_blank .external-link}
- Teams: [Graph API](https://learn.microsoft.com/en-us/graph/api/resources/teams-api-overview){:target=_blank .external-link}
- To Do: [Graph API](https://learn.microsoft.com/en-us/graph/todo-concept-overview){:target=_blank .external-link}

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

Some Microsoft services require extra information for OAuth2. Refer to [Service-specific settings](#service-specific-settings) for more guidance on those services.

For more detail on the Microsoft OAuth2 web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts){:target=_blank .external-link}. To configure OAuth2 from scratch, [register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2){:target=_blank .external-link}.

Use these settings for your application:

- For **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
- Copy the **OAuth Callback URL** from n8n and use that as the **Redirect URI** in your Microsoft application.
- Copy the **Application (client) ID** from your Microsoft application and add it as the **Client ID** in n8n.
- Generate a new client secret in your application. Refer to the instructions in [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials){:target=_blank .external-link}.
- Copy the secret's **Value** and add it as the **Client Secret** in n8n.

## Service-specific settings

The following services require some extra information for OAuth2:

### Dynamics

Dynamics OAuth2 also requires these fields:

- Your **Domain**
- Select the Dynamics datacenter **Region** you're within: Refer to the [Microsoft Datacenter regions documentation](https://learn.microsoft.com/en-us/power-platform/admin/new-datacenter-regions){:target=_blank .external-link} for more information on the options and corresponding URLs.

### Microsoft (general)

The general Microsoft OAuth2 also requires these fields:

- **Scope**: Provide a space-separated list of scopes for this credential. Refer to [Scopes and permissions in the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc){:target=_blank .external-link} for a list of possible scopes.

### Outlook

Outlook OAuth requires also requires these fields:

- Select whether to **Use Shared Inbox**: The API supports accessing a user's primary email inbox or a shared inbox. Turning this on indicates that the credential should access a shared inbox. If selected, you'll also need:
    - **User Principal Name**: Enter the target user's UPN or ID.
