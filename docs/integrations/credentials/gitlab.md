# GitLab

You can use these credentials to authenticate the following nodes with GitLab.
- [GitLab](/integrations/nodes/n8n-nodes-base.gitlab/)
- [GitLab Trigger](/integrations/trigger-nodes/n8n-nodes-base.gitlabTrigger/)

## Prerequisites

Create a [GitLab](https://gitlab.com/) account.

## Using OAuth

!!! note "⛅️ Note for n8n.cloud users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your GitLab account to n8n.


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

![Getting GitLab OAuth credentials](/_images/integrations/credentials/gitlab/using-oauth.gif)


## Using Access Token

1. Access your GitLab dashboard.
2. Click on your user icon in the top right.
3. Click on 'Settings'.
4. Click on 'Access Tokens' in the sidebar.
5. Enter a name in the ***Name*** field.
6. Fill out the required information to receive the access token.
7. Select any scopes you plan to use and then click on ***Create personal access token***.
8. Use the generated access token with your GitLab node credentials in n8n.
9. Click on the ***Save*** button to save your credentials.

![Getting GitLab access token](/_images/integrations/credentials/gitlab/using-access-token.gif)
