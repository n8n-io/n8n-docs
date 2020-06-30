# Dropbox

You can find information about the operations supported by the Dropbox node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.dropbox) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Dropbox).

## Pre-requisites

Create a [Dropbox](https://www.dropbox.com/) account.

## Using OAuth

1. Access the [Dropbox app creation page](https://www.dropbox.com/developers/apps/create).
2. Select Dropbox API and scoped access.
3. Select access type, enter the app name and accept the terms and conditions.
4. Click on Create App.
5. In the Dropbox app dashboard, navigate to Settings, scroll down to OAuth2 and click Generate under Access token.
6. In the Dropbox app dashboard, navigate to Permissions, and select the permissions your workflow will need.
7. Return to n8n and enter the access token in your n8n Dropbox credentials.

![Getting Dropbox credentials](./using-oauth.gif)
