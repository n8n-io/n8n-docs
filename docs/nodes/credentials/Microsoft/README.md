# Microsoft

Microsoft credentials work with several different nodes. You can find a list of nodes and their supported operations in the integrations page linked below. You can also browse the source code of the node on GitHub.

| Node Name          	| Supported Operations 	| Source Code 	|
|--------------------	|----------------------	|-------------	|
| [Microsoft Excel](../../nodes-library/nodes/MicrosoftExcel/README.md)    	| [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.microsoftExcel)    	| [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Microsoft/Excel)      	|
| [Microsoft OneDrive](../../nodes-library/nodes/MicrosoftOneDrive/README.md) 	| [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.microsoftOneDrive)    	| [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Microsoft/OneDrive)      	|

## Prerequisites

Create a [Microsoft Azure](https://azure.microsoft.com/) account.

## Using OAuth

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

