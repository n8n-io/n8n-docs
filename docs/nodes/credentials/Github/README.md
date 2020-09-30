---
permalink: /credentials/github
description: Learn to configure credentials for the GitHub node in n8n
---

# GitHub

You can use these credentials to authenticate the following nodes with GitHub.
- [GitHub](../../nodes-library/nodes/GitHub/README.md)
- [GitHub Trigger](../../nodes-library/trigger-nodes/GitHubTrigger/README.md)


## Prerequisites

Create a [GitHub](https://github.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your GitHub account to n8n.
:::

1. Access your GitHub dashboard.
2. Click on your user icon in the top right.
3. Click on ***Settings***.
4. Click on ***Developer settings***.
5. Select ***OAuth Apps***.
6. Click on the ***Register a new application*** button.
7. Enter the ***Application name*** and ***Homepage URL***.
8. Copy the ***OAuth Callback URL*** from n8n and paste it in the ***Authorization callback URL*** field.
9. Use the provided ***Client ID*** and ***Client Secret*** with your GitHub node credentials in n8n.
10. Click on the circle button in the OAuth section to connect a GitHub account to n8n.
11. Click the ***Save*** button to save your credentials in n8n.

![Getting GitHub OAuth credentials](./using-oauth.gif)


## Using Access Token

1. Access your GitHub dashboard.
2. Click on your user icon in the top right.
3. Click on ***Settings***.
4. Click on ***Developer settings***.
5. Select ***Personal access tokens***.
6. Click on ***Generate new token***.
7. Select the relevant scopes from the ***Select scopes*** section.
8. Click on the ***Generate token*** button.
8. Use the ***Personal access token*** with your GitHub node credentials in n8n.
9. Click the ***Save*** button to save your credentials in n8n.

![Getting GitHub Access Token](./using-access-token.gif)
