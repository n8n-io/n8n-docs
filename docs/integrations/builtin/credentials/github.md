---
title: GitHub credentials
description: Documentation for GitHub credentials. Use these credentials to authenticate GitHub in n8n, a workflow automation platform.
contentType: integration
---

# GitHub credentials

You can use these credentials to authenticate the following nodes:

- [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/)
- [GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger/)
- [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader): this node doesn't support OAuth.

## Prerequisites

Create a [GitHub](https://github.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [GitHub's API documentation](https://docs.github.com/en/rest){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- The URL for a **GitHub server**:
    - If you are not using GitHub Enterprise Server, keep the URL that n8n has prepopulated.
    - If you're using [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.9/admin/overview/about-github-enterprise-server){:target=_blank .external-link}, update this field to match the URL for your server.
- A **User** name: Your username as it appears in your GitHub profile
- An **Access Token**: n8n recommends using a personal access token (classic), since GitHub's fine-grained personal access tokens are still in beta and cannot access all endpoints. Refer to [Creating a personal access token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic){:target=_blank .external-link} and [Creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token){:target=_blank .external-link} for detailed steps on generating a new access token.


## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name and select the **Connect my account** button in the OAuth credential to connect your _Name_ account to n8n.
///

Should you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, you'll need to register a new [OAuth app](https://docs.github.com/en/apps/oauth-apps){:target=_blank .external-link}. Refer to that documentation for detailed instructions on creating a new app, and refer to the [GitHub Authorizing OAuth apps documentation](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps){:target=_blank .external-link} for more information on the authorization process.
