# Pushbullet

You can use these credentials to authenticate the following nodes with Pushbullet.

- [Pushbullet](/integrations/builtin/app-nodes/n8n-nodes-base.pushbullet/)

## Prerequisites

Create a [Pushbullet](https://www.pushbullet.com/) account.

## Using OAuth

1. Access the [create client](https://www.pushbullet.com/create-client) page.
2. Enter an app name in the ***name*** field.
3. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste it in the ***redirect_uri*** field.
4. Click on the ***Add A New OAuth Client*** button.
5. Use the provided ***client_id*** and ***client_secret*** with your Pushbullet OAuth2 API credentials in n8n.
6. Click the ***Connect my account*** button to connect to Pushbullet and save your credentials in n8n.

!!! note "Pushbullet OAuth Test Link"
    Pushbullet does offer a test link during the client creation process described above. This link is not compatible with n8n. In order to verify the authentication works, simply use the ***Connect my account*** button in n8n.


![Getting Pushbullet credentials](/_images/integrations/builtin/credentials/pushbullet/using-oauth.gif)
