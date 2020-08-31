---
permalink: /credentials/dropbox
---

# Dropbox

You can find information about the operations supported by the Dropbox node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.dropbox) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Dropbox).

## Prerequisites

Create a [Dropbox](https://www.dropbox.com/) account.

## Using OAuth

1. Access the [Dropbox app creation page](https://www.dropbox.com/developers/apps/create).
2. Under the 'Choose an API' section, select the 'Scoped access' option.
3. Under the 'Choose the type of access you need' section, select the 'App folder' option.
4. In the 'Name your app' section, enter a name for your app.
5. Click on the ***Create app*** button.
6. Copy the 'OAuth Callback URL' provided in the 'Dropbox OAuth2 API' credentials in n8n and paste it in the ***Redirect URIs*** field in the Dropbox app console.
7. Click on the ***Add*** button.
8. From the 'Settings' section, copy the ***App key*** and ***App secret***.
9. Paste the ***App key*** and ***App secret*** in the 'Dropbox OAuth2 API' credentials in n8n.
10. Click on the circle button in the OAuth section of n8n to connect a Dropbox account to n8n.
11. Click on the ***Save*** button to save your credentials.

![Getting Dropbox Access Token](./using-oauth.gif)

## Using Access Token

1. Access the [Dropbox app creation page](https://www.dropbox.com/developers/apps/create).
2. Under the 'Choose an API' section, select the 'Scoped access' option.
3. Under the 'Choose the type of access you need' section, select the 'App folder' option.
4. In the 'Name your app' section, enter a name for your app.
5. Click on the ***Create app*** button.
6. In the Dropbox app console, navigate to 'Settings', scroll down to 'OAuth2' and click on the ***Generate*** button under 'Generated access token'.
7. Use the displayed 'Generated access token' with your Dropbox credentials in n8n.

![Getting Dropbox Access Token](./using-oauth.gif)
