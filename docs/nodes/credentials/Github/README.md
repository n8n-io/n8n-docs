---
permalink: /credentials/githubApi
---


# Github
You can find information about the operations supported by the Github node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.github) page. You can also browse the source code of the node on [Github](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Github).


## Pre-requisites

Create a [Github](https://github.com/) account.

## Using OAuth

1. Access your Github dashboard.
2. Click on your user icon in the top right.
3. Click on Settings.
4. Click on Developer Settings.
5. Choose OAuth apps.
6. Register a new application.
7. Use provided Client Secret and Client ID with your Github node credentials in n8n.
8. Enter n8n provided redirect URL in configuration. ![Redirect URL Explanation here](../README.md).
![Getting Github credentials](./using-oauth.gif)


## Using Access Token

1. Access your Github dashboard.
2. Click on your user icon in the top right.
3. Click on Settings.
4. Click on Developer Settings.
5. Choose personal access token.
6. Use provided credentials with your Freshdesk node credentials in n8n.
![Getting Github credentials](./using-access-token.gif)

