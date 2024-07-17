---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: monday.com credentials
description: Documentation for monday.com credentials. Use these credentials to authenticate monday.com in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# monday.com credentials

You can use these credentials to authenticate the following nodes:

- [monday.com](/integrations/builtin/app-nodes/n8n-nodes-base.mondaycom/)

/// info | Minimum required version
The monday.com node requires n8n version 1.22.6 or above.
///

## Prerequisites

- Create a [monday.com](https://monday.com/){:target=_blank .external-link} account.
- For OAuth2, register a new monday.com app with the scopes `boards:write` and `boards:read`.

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [monday.com's API documentation](https://developer.monday.com/api-reference/docs/basics){:target=_blank .external-link} for more information about authenticating with the service.

## Using API token

To configure this credential, you'll need:

- An API **Token V2**: You generate API tokens differently depending on whether you're a monday.com admin or user. Refer to [monday.com API Authentication](https://developer.monday.com/api-reference/docs/authentication){:target=_blank .external-link} for detailed instructions for both user types.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate both these fields, register a new monday.com application. Refer to [Creating a new app](https://developer.monday.com/apps/docs/manage){:target=_blank .external-link} for instructions, and refer to [OAuth and permissions](https://developer.monday.com/apps/docs/oauth){:target=_blank .external-link} for details on the OAuth setup.

Use these settings in your app:

- Use scopes `boards:write` and `boards:read` at minimum.
- Copy the **OAuth Redirect URL** from n8n and enter this as the [**Redirect URI**](https://developer.monday.com/apps/docs/oauth#redirect-urls){:target=_blank .external-link} in your app.



