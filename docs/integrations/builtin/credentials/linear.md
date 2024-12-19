---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Linear credentials
description: Documentation for Linear credentials. Use these credentials to authenticate Linear in n8n, a workflow automation platform.
contentType: integration
---

# Linear credentials

You can use these credentials to authenticate the following nodes:

* [Linear Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/)
* [Linear](/integrations/builtin/app-nodes/n8n-nodes-base.linear/)

## Prerequisites

Create a [Linear](https://linear.app/){:target=_blank .external-link} account.

## Supported authentication methods

- API key
- OAuth2

## Related resources

Refer to [Linear's API documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- A personal **API Key**: Create an API key in your [**Settings > API**](https://linear.app/n8n/settings/api){:target=_blank .external-link}. Refer to the [Linear Personal API keys documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api#personal-api-keys){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new OAuth2 application.
- A **Client Secret**: Generated when you create a new OAuth2 application.
- Select the **Actor**: The actor defines how the OAuth2 application should create issues, comments and other changes. Options include:
    - **User** (Linear's default): The application creates resources as the authorizing user. Use this option if you want each user to do their own authentication.
    - **Application**: The application creates resources as itself. Use this option if you have only one user (like an admin) authorizing the application.
- To use this credential with the [Linear Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/) node, you must enable the **Include Admin Scope** toggle.

Refer to the [Linear OAuth2 Authentication documentation](https://developers.linear.app/docs/oauth/authentication){:target=_blank .external-link} for more detailed instructions and explanations. Use the n8n **OAuth Redirect URL** as the **Redirect callback URL** in your Linear OAuth2 application.
