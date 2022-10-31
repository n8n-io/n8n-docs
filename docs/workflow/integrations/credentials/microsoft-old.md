# Microsoft

You can use these credentials to authenticate the following nodes with Microsoft.
- [Microsoft Dynamics CRM](/workflow/integrations/nodes/workflow-nodes-base.microsoftDynamicsCrm/)
- [Microsoft Excel](/workflow/integrations/nodes/workflow-nodes-base.microsoftExcel/)
- [Microsoft Graph Security](/workflow/integrations/nodes/workflow-nodes-base.microsoftGraphSecurity/)
- [Microsoft OneDrive](/workflow/integrations/nodes/workflow-nodes-base.microsoftOneDrive/)
- [Microsoft Outlook](/workflow/integrations/nodes/workflow-nodes-base.microsoftOutlook/)
- [Microsoft Teams](/workflow/integrations/nodes/workflow-nodes-base.microsoftTeams/)
- [Microsoft To Do](/workflow/integrations/nodes/workflow-nodes-base.microsoftToDo/)

## Prerequisites

Create a [Microsoft Azure](https://azure.microsoft.com/) account.

## Using OAuth

!!! note "⛅️ Note fordoc2app.cloudintegration.eu users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Microsoft account to Workflow².


1. Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. Click on the ***Register an application*** button.
3. Enter a name for your app in the ***Name*** field.
4. Select 'Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (eg. Skype, Xbox)' under the ***Supported account types*** section.
5. Copy the 'OAuth Callback URL' provided in the Microsoft node credentials in Workflow².
6. Paste it in the ***Redirect URI (optional)*** field on the ***Register an application*** page.
7. Click on the ***Register*** button.
8. Copy the ***Application (client) ID***.
9. Enter the name for your credentials in the ***Credentials Name*** field in the Microsoft node credentials in Workflow².
10. Paste the Application ID in the ***Client ID*** field in the Microsoft node credentials in Workflow².
11. On your Microsoft application page, click on ***Certificates & secrets*** in the left sidebar.
12. Click on the ***+ New client secret*** button under the ***Client secrets*** section.
13. Enter a description in the ***Description*** field.
14. Click on the ***Add*** button.
15. Copy the displayed secret under the ***Value*** column.
16. Paste the secret in the ***Client Secret*** field in the Microsoft node credentials in Workflow².
17. Click on the circle button in the OAuth section to connect a Microsoft account to Workflow².
18. Login to your Microsoft account and allow the app to access your info.
19. Click on the ***Save*** button in the Microsoft node credentials in Doc² to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/aqr_PwR1Sgc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
