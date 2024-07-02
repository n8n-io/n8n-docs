---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mattermost credentials
description: Documentation for Mattermost credentials. Use these credentials to authenticate Mattermost in n8n, a workflow automation platform.
contentType: integration
---

# Mattermost credentials

You can use these credentials to authenticate the following nodes:

- [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/)

## Prerequisites

- Create a [Mattermost](https://www.mattermost.com/){:target=_blank .external-link} account.
- Ensure that an admin has enabled personal access tokens in **System Console > Integrations > Integration Management**.
- If using a non-admin user or bot account, ensure that an admin has granted that user account permission to generate personal access tokens in **System Console > User Management > Users > User account > Manage roles**.

Refer to the Mattermost [Personal access tokens documentation](https://developers.mattermost.com/integrate/reference/personal-access-token/){:target=_blank .external-link} for more detailed instructions on enabling personal access tokens.

## Supported authentication methods

- API access token

## Related resources

Refer to [Mattermost's API documentation](https://api.mattermost.com/){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An **Access Token**: Create a personal access token in Mattermost in **Profile > Security > Personal Access Tokens**. Refer to [Create a personal access token](https://developers.mattermost.com/integrate/reference/personal-access-token/#create-a-personal-access-token){:target=_blank .external-link} for more detailed instructions.
- A **Base URL**: Enter your Mattermost URL.
- _Optional:_ Select whether to **Ignore SSL Issues**. If turned on, the credential will connect even if SSL certificate validation fails.

