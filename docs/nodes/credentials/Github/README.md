# GitHub

You can find information about the operations supported by the GitHub node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.github) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Github).


## Prerequisites

Create a [GitHub](https://github.com/) account.

## Using OAuth

1. Access your GitHub dashboard.
2. Click on your user icon in the top right.
3. Click on Settings.
4. Click on Developer Settings.
5. Choose OAuth apps.
6. Register a new application.
7. Use provided Client Secret and Client ID with your GitHub node credentials in n8n.
8. Enter n8n provided redirect URL in configuration. Redirect URL Explanation [here](../README.md).

![Getting GitHub credentials](./using-oauth.gif)


## Using Access Token

1. Access your GitHub dashboard.
2. Click on your user icon in the top right.
3. Click on Settings.
4. Click on Developer Settings.
5. Choose personal access token.
6. Use provided credentials with your Freshdesk node credentials in n8n.

![Getting GitHub credentials](./using-access-token.gif)
