---
permalink: /credentials/gitlab
---

# GitLab

You can find information about the operations supported by the GitLab node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.gitlab) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Gitlab).

## Prerequisites

Create a [GitLab](https://gitlab.com/) account.

## Using OAuth

1. Access your GitLab dashboard.
2. Click on your user icon in the top right.
3. Click on 'Settings'.
4. Click on 'Applications' in the sidebar.
5. Enter a name in the ***Name*** field.
6. Copy the 'OAuth Callback URL' provided in the 'Gitlab OAuth2 API' credentials in n8n and paste it in the ***Redirect URI*** field in the GitLab app creation page.
7. Select any scopes you plan to use and then click on ***Save application***.
8. Use the ***Application ID*** and ***Secret*** with your GitLab OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect a GitLab account to n8n.
10. Click on the ***Save*** button to save your credentials.

![Getting GitLab OAuth credentials](./using-oauth.gif)


## Using Access Token

1. Access your GitLab dashboard.
2. Click on your user icon in the top right.
3. Click on 'Settings'.
4. Click on 'Access Tokens'.
5. Fill out the required information to receive the access token.
6. Use the provided credentials with your GitLab node credentials in n8n.

![Getting GitLab access token](./using-access-token.gif)
