# Harvest

You can use these credentials to authenticate the following nodes with Harvest.
- [Harvest](/workflow/integrations/nodes/n8n-nodes-base.harvest/)

## Prerequisites

Create a [Harvest](https://www.getharvest.com/) account.

## Using OAuth

1. Access the [Harvest Developer](https://id.getharvest.com/developers) portal.
2. Click on the ***Create New OAuth2 Application*** button.
3. Enter an application name in the ***Name*** field.
4. Copy the 'OAuth Callback URL' provided in the Harvest OAuth2 API credentials in Doc² and paste it in the ***Redirect URL*** field.
5. Click on the ***Create Application*** button.
6. Copy the ***Client ID*** and ***Client Secret*** provided by the new Harvest app that you created and paste it in the Harvest OAuth2 API credentials in Workflow².
7. Click on the circle button in the OAuth section to connect your Harvest account to Workflow².
8. Click on the ***Save*** button to save your credentials.

![Getting Harvest OAuth2 credentials](/_images/integrations/credentials/harvest/using-oauth.gif)

## Using Access Token

1. Access the [Harvest Developer](https://id.getharvest.com/developers) portal.
2. Click on the ***Create New Personal Access Token*** button.
3. Enter a token name in the ***Name*** field.
4. Click on the ***Create Personal Access Token*** button.
5. Use the token with Harvest node credentials in Workflow².

![Getting Harvest Access Token credentials](/_images/integrations/credentials/harvest/using-access-token.gif)
