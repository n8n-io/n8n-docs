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


**1.** Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations)<br>
**2.** Click on the `+ New registration` button
	![](/_images/workflows/workflows/WF-outlook-import-app-registrations-new.png)<br>
**3.** Enter a name for your app in the `Name` field.<br>
**4.** Select `Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal     Microsoft accounts (eg. Skype, Xbox)` under the **Supported account types** section.<br>
**5.** Copy the `OAuth Callback URL` provided in the Microsoft node credentials in Workflow².<br>
	![](/_images/workflows/workflows/WF-outlook-import-OAuth-redirect-url.png)
**6.** Choose **Web** and paste it in the next field under the `Redirect URI (optional)` section.
	![](/_images/workflows/workflows/WF-outlook-import-register-an-application.png)<br>
**7.** Click on the `Register` button at the bottom left.<br>
**8.** Copy the **Application (client) ID**.<br>
**9.** Paste the Application ID in the `Client ID` field in the Microsoft node credentials in Workflow².
	![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
**10.** On your Microsoft application page, click on **Certificates & secrets** in the left sidebar.
	![](/_images/workflows/workflows/WF-outlook-import-app-registrations-doc2.png)<br>
**11.** Click on the `+ New client secret` button under the **Client secrets** section.
	![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-new.png)<br>
**12.** Enter a description in the **Description** field.<br>
**13.** Click on the `Add` button.<br>
**14.** Copy the displayed secret under the **Value** column.<br>
	![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-value.png)<br>
**15.** Paste the secret in the **Client Secret** field in the Microsoft node credentials in Workflow².
	![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
**16.** Click on the button in the OAuth section to connect a Microsoft account to Workflow².<br>
**17.** Login to your Microsoft account and allow the app to access your info.<br>
**18.** Click on the `Save` button in the Microsoft node credentials in DOC² to save your credentials.<br>

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/aqr_PwR1Sgc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
