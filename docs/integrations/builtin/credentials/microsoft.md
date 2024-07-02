---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

To configure OAuth2 from scratch, [register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2){:target=_blank .external-link} and follow the instructions below:

1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations){:target=_blank .external-link}.
2. Select **Register an application**.
3. Enter a name for your app in the **Name** field.
4. In **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
5. In **Register an application**:
    1. Copy the **OAuth Callback URL** from your n8n credential.
    2. Paste it into the **Redirect URI (optional)** field.
    3. Select **Select a platform** > **Web**.
6. Select **Register** to finish creating your application.
7. Copy the **Application (client) ID**.
8. Paste it into n8n as the **Client ID**.
9. On your Microsoft application page, select **Certificates & secrets** in the left sidebar.
10. In **Client secrets**, select **+ New client secret**. Refer to the instructions in [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials){:target=_blank .external-link} for further details.
11. Enter a description in the **Description** field, such as `n8n credential`.
12. Select **Add**.
13. Copy the **Secret** in the **Value** column.
14. Paste it into n8n as the **Client Secret**.
15. If you see other fields in the n8n credential, refer to [Service-specific settings](#service-specific-settings) below for guidance on completing those fields.
16. Select the circle button in the OAuth section to connect a Microsoft account to n8n.
17. Log in to your Microsoft account and allow the app to access your info.

For more detail on the Microsoft OAuth2 web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts){:target=_blank .external-link}. 

## Service-specific settings

The following services require extra information for OAuth2:

### Dynamics

Dynamics OAuth2 also requires these fields:

- Your **Domain**
- **Region**: Select the Dynamics datacenter region you're within. Refer to the [Microsoft Datacenter regions documentation](https://learn.microsoft.com/en-us/power-platform/admin/new-datacenter-regions){:target=_blank .external-link} for more information on the options and corresponding URLs.

### Microsoft (general)

The general Microsoft OAuth2 also requires these fields:

- **Scope**: Provide a space-separated list of scopes for this credential. Refer to [Scopes and permissions in the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc){:target=_blank .external-link} for a list of possible scopes.

### Outlook

Outlook OAuth also requires these fields:

- **Use Shared Inbox**: The API supports accessing a user's primary email inbox or a shared inbox. Turning this on indicates that the credential should access a shared inbox. If selected, you'll also need:
    - **User Principal Name**: Enter the target user's UPN or ID.
