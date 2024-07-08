---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitLab credentials
description: Documentation for GitLab credentials. Use these credentials to authenticate GitLab in n8n, a workflow automation platform.
contentType: integration
---

# GitLab credentials

You can use these credentials to authenticate the following nodes:

- [GitLab](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/)
- [GitLab Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger/)

## Prerequisites

Create a [GitLab](https://gitlab.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [GitLab's API documentation](https://docs.gitlab.com/ee/api/rest/){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- The URL of your **GitLab Server**
- An **Access Token**: Refer to GitLab's [Create a personal access token documentation](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token){:target=_blank .external-link} for detailed instructions.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure an application with OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the information and instructions in the [GitLab OAuth 2.0 identity provider API documentation](https://docs.gitlab.com/ee/api/oauth2.html){:target=_blank .external-link}.
