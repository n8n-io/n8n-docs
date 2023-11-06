---
title: Microsoft credentials
description: Documentation for Microsoft credentials. Use these credentials to authenticate Microsoft in n8n, a workflow automation platform.
contentType: integration
---

# Microsoft credentials

You can use these credentials to authenticate the following nodes with Microsoft.

- [Microsoft Dynamics CRM](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftdynamicscrm/)
- [Microsoft Excel](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel/)
- [Microsoft Graph Security](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftgraphsecurity/)
- [Microsoft OneDrive](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive/)
- [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/)
- [Microsoft Teams](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams/)
- [Microsoft To Do](/integrations/builtin/app-nodes/n8n-nodes-base.microsofttodo/)


## Prerequisites

Create a [Microsoft Azure](https://azure.microsoft.com/) account.

## Using OAuth

/// note | Note for n8n Cloud users
You'll only need to click on the **Connect my account** button to connect your Microsoft account with n8n.
///

1. Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations){:target=_blank .external-link}.
2. Click on the **Register an application** button.
3. Enter a name for your app in the **Name** field.
4. Select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (e.g. Skype, Xbox)** under the **Supported account types** section.
5. Copy the 'OAuth Callback URL' provided in the Microsoft node credentials in n8n.
6. Paste it in the **Redirect URI (optional)** field on the **Register an application** page. In the same section, select **Select a platform** > **Web**.
7. Click on the **Register** button.
8. Copy the **Application (client) ID**.
9. Enter the name for your credentials in the **Credentials Name** field in the Microsoft node credentials in n8n.
10. Paste the Application ID in the **Client ID** field in the Microsoft node credentials in n8n.
11. On your Microsoft application page, click on **Certificates & secrets** in the left sidebar.
12. Click on the **+ New client secret** button under the **Client secrets** section.
13. Enter a description in the **Description** field.
14. Click on the **Add** button.
15. Copy the displayed secret under the **Value** column.
16. Paste the secret in the **Client Secret** field in the Microsoft node credentials in n8n.
17. Click on the circle button in the OAuth section to connect a Microsoft account to n8n.
18. Login to your Microsoft account and allow the app to access your info.
19. Click on the **Save** button in the Microsoft node credentials in n8n to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/aqr_PwR1Sgc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

