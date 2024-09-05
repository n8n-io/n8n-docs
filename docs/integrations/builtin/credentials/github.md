---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitHub credentials
description: Documentation for GitHub credentials. Use these credentials to authenticate GitHub in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# GitHub credentials

You can use these credentials to authenticate the following nodes:

- [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/)
- [GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger/)
- [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader): this node doesn't support OAuth.

## Prerequisites

Create a [GitHub](https://github.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API access token: Use this method with any GitHub nodes.
- OAuth2: Use this method with [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/) and [GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger/) nodes only; don't use with [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader).

## Related resources

Refer to [GitHub's API documentation](https://docs.github.com/en/rest){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need a [GitHub](https://github.com/){:target=_blank .external-link} account.

There are two steps to setting up this credential:

1. [Generate a GitHub personal access token](#generate-personal-access-token).
2. [Set up the credential](#set-up-the-credential).

Refer to the sections below for detailed instructions.

### Generate personal access token

/// note | Recommended access token type
n8n recommends using a personal access token (classic). GitHub's fine-grained personal access tokens are still in beta and can't access all endpoints.
///

To generate your personal access token:

1. If you haven't done so already, verify your email address with GitHub. Refer to [Verifying your email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/verifying-your-email-address){:target=_blank .external-link} for more information.
2. Open your GitHub profile [Settings](https://github.com/settings/profile){:target=_blank .external-link}.
3. In the left navigation, select [**Developer settings**](https://github.com/settings/apps){:target=_blank .external-link}.
4. In the left navigation, under **Personal access tokens**, select **Tokens (classic)**.
5. Select **Generate new token > Generate new token (classic)**.
6. Enter a descriptive name for your token in the **Note** field, like `n8n integration`.
7. Select the **Expiration** you'd like for the token, or select **No expiration**.
8. Select **Scopes** for your token. For most of the n8n GitHub nodes, add the `repo` scope.
    - A token without assigned scopes can only access public information.
    - Refer to 
9. Select **Generate token**.
10. Copy the token.

Refer to [Creating a personal access token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic){:target=_blank .external-link} for more information. Refer to [Scopes for OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes){:target=_blank .external-link} for more information on GitHub scopes.

### Set up the credential

Then, in your n8n credential:

1. If you aren't using GitHub Enterprise Server, don't change the **GitHub server** URL.
    - If you're using [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.9/admin/overview/about-github-enterprise-server){:target=_blank .external-link}, update **GitHub server** to match the URL for your server.
2. Enter your **User** name as it appears in your GitHub profile.
3. Enter the **Access Token** you generated above.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting n8n](/hosting/), create a new GitHub [OAuth app](https://docs.github.com/en/apps/oauth-apps){:target=_blank .external-link}:

1. Open your GitHub profile [Settings](https://github.com/settings/profile){:target=_blank .external-link}.
2. In the left navigation, select [**Developer settings**](https://github.com/settings/apps){:target=_blank .external-link}.
3. In the left navigation, select **OAuth apps**.
4. Select **New OAuth App**.
    - If you haven't created an app before, you may see **Register a new application** instead. Select it.
5. Enter an **Application name**, like `n8n integration`.
6. Enter the **Homepage URL** for your app's website.
7. If you'd like, add the optional **Application description**, which GitHub displays to end-users.
8. From n8n, copy the **OAuth Redirect URL** and paste it into the GitHub **Authorization callback URL**.
9. Select **Register application**.
10. Copy the **Client ID** and **Client Secret** this generates and add them to your n8n credential.

Refer to the [GitHub Authorizing OAuth apps documentation](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps){:target=_blank .external-link} for more information on the authorization process.
