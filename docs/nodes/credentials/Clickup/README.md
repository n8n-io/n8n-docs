---
permalink: /credentials/clickupApi
---


# Clickup
You can find information about the operations supported by the Clickup node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.clickup) page. You can also browse the source code of the node on [Github](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Clickup).

## Pre-requisites

Create a [Clickup](https://www.clickup.com/) account.

## Using OAuth

1. Open your Clickup dashboard.
2. Click on your profile icon in the bottom left.
3. Click on "Settings" under your workspace profile.
4. Click on "Integrations".
5. Click on "Clickup API".
6. Click on Create app.
7. Enter in App name and redirect URL(s).
8. Use Client ID and client Secret key in your Clickup node credentials in n8n.
9. Enter n8n provided redirect URL in configuration. ![Redirect URL Explanation here](../README.md).


![Getting Clickup credentials](./using-oauth.gif)


### Using Access Token

1. Open your Clickup dashboard.
2. Click on your profile icon in the bottom left.
3. Click on "Apps".
4. Click on "Generate" under API token.
5. Use selected API key in your Clickup node credentials in n8n.


![Getting Clickup credentials](./using-access-token.gif)



