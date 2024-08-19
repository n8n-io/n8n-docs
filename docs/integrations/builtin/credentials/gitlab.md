---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitLab credentials
description: Documentation for GitLab credentials. Use these credentials to authenticate GitLab in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# GitLab credentials

You can use these credentials to authenticate the following nodes:

- [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/)
- [GitLab Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger/)

## Supported authentication methods

- API access token
- OAuth2 (Recommended)

## Related resources

Refer to [GitLab's API documentation](https://docs.gitlab.com/ee/api/rest/){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need a [GitLab](https://gitlab.com/){:target=_blank .external-link} account and:

- The URL of your **GitLab Server**
- An **Access Token**

To set up the credential:

1. In GitLab, select your avatar, then select **Edit profile**.
2. In the left sidebar, select **Access tokens**.
3. Select **Add new token**.
4. Enter a **Name** for the token, like `n8n integration`.
5. Enter an **expiry date** for the token. If you don't enter an expiry date, GitLab automatically sets it to 365 days later than the current date.
    - The token expires on that expiry date at midnight UTC.
6. Select the desired **Scopes**. For the [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/) node, use the `api` scope to easily grant access for all the node's functionality. Or refer to [Personal access token scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes){:target=_blank .external-link} to select scopes for the functions you want to use.
7. Select **Create personal access token**.
8. Copy the access token this creates and enter it in your n8n credential as the **Access Token**.
9. Enter the URL of your **GitLab Server** in your n8n credential. 

Refer to GitLab's [Create a personal access token documentation](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token){:target=_blank .external-link} for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/) n8n, you'll need a [GitLab](https://gitlab.com/){:target=_blank .external-link} account. Then create a new GitLab application:

1. In GitLab, select your avatar, then select **Edit profile**.
2. In the left sidebar, select **Applications**.
3. Select **Add new application**.
4. Enter a **Name** for your application, like `n8n integration`.
5. In n8n, copy the **OAuth Redirect URL**. Enter it as the GitLab **Redirect URI**.
6. Select the desired **Scopes**. For the [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/) node, use the `api` scope to easily grant access for all the node's functionality. Or refer to [Personal access token scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes){:target=_blank .external-link} to select scopes for the functions you want to use.
6. Select **Save application**.
7. Copy the **Application ID** and enter it as the **Client ID** in your n8n credential.
8. Copy the **Secret** and enter it as the **Client Secret** in your n8n credential.

Refer to GitLab's [Configure GitLab as an OAuth 2.0 authentication identity provider](https://docs.gitlab.com/ee/integration/oauth_provider.html){:target=_blank .external-link} documentation for more information. Refer to the [GitLab OAuth 2.0 identity provider API documentation](https://docs.gitlab.com/ee/api/oauth2.html){:target=_blank .external-link} for more information on OAuth2 and GitLab.
