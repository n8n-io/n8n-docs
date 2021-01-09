---
description: Learn to configure credentials for the nodes based on Microsoft services in n8n
---

# Microsoft

You can use these credentials to authenticate the following nodes with Microsoft.
- [Microsoft Excel](../../nodes-library/nodes/MicrosoftExcel/README.md)
- [Microsoft OneDrive](../../nodes-library/nodes/MicrosoftOneDrive/README.md)
- [Microsoft Outlook](../../nodes-library/nodes/MicrosoftOutlook/README.md)
- [Microsoft Teams](../../nodes-library/nodes/MicrosoftTeams/README.md)


## Prerequisites

Create a [Microsoft Azure](https://azure.microsoft.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Microsoft account to n8n.
:::

1. Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. In the top left, click on *New registration*.
3. Enter a name and select an appropriate account type by clicking radio buttons.
4. Copy the 'OAuth Callback URL' provided in the Microsoft OAuth2 API credentials in n8n and paste it in the 'Redirect URI (optional)' section in the Microsoft application registration page.
5. Copy the 'Application (client) ID' and the 'Directory (tenant) ID' from the *Overview* section and use with your Microsoft OAuth2 API credentials in n8n.
6. Click on the *New client secret* button in the *Certificates & secrets* section and create a new client secret.
7. Copy the client secret and use it with your Microsoft OAuth2 API credentials in n8n.
8. Click on the circle button in the OAuth section to connect a Microsoft account to n8n.
9. Click the *Save* button to save your credentials.

![Getting Microsoft credentials](./using-oauth.gif)
