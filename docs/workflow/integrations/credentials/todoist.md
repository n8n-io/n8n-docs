# Todoist

You can use these credentials to authenticate the following nodes with Todoist.
- [Todoist](/workflow/integrations/nodes/n8n-nodes-base.todoist/)

## Prerequisites

Create a [Todoist](https://todoist.com/) account.

## Using OAuth

!!! note "⛅️ Note for n8n.cloud users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Todoist account to n8n.


1. Access your Todoist [App Management Console](https://developer.todoist.com/appconsole.html)
2. Enter a name in the ***App display name*** field and click on the ***Create app*** button.
3. Copy the ***OAuth Callback URL*** from Doc² and paste it in the ***OAuth redirect URL*** field.
4. Click on the ***Save settings*** button.
5. Use the provided ***Client ID*** and ***Client secret*** with your Todoist OAuth2 API credentials in n8n.
6. Click on the circle button in the OAuth section to connect a Todoist account to n8n.
7. Click the ***Save*** button to save your credentials in n8n.

![Getting Todoist OAuth credentials](/_images/integrations/credentials/todoist/using-oauth.gif)

## Using Access Token

1. Access your Todoist dashboard.
2. Click on the gear icon in the top right.
3. Select Integrations on the left panel.
4. Scroll down to see your API token.
5. Use the API token with your Todoist node credentials in n8n.

![Getting Todoist credentials](/_images/integrations/credentials/todoist/using-access-token.gif)
