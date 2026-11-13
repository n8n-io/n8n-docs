---
title: Linear credentials
description: >-
  Documentation for Linear credentials. Use these credentials to authenticate
  Linear in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Linear credentials
originalFilePath: integrations/builtin/credentials/linear.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/linear'
url: 'https://docs.n8n.io/integrations/builtin/credentials/linear'
layout:
  description:
    visible: false
---

# Linear credentials <a href="#linear-credentials" id="linear-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Linear Trigger](../trigger-nodes/n8n-nodes-base.lineartrigger.md)
* [Linear](../app-nodes/n8n-nodes-base.linear.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Linear](https://linear.app/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Linear's API documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:


- A personal **API Key**: Create a dedicated personal API key in your [**Settings** > **Security & access**](https://linear.app/n8n/settings/account/security). Refer to the [Linear Personal API keys documentation](https://linear.app/developers/graphql#personal-api-keys) for more information.


## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new OAuth2 application.
- A **Client Secret**: Generated when you create a new OAuth2 application.
- Select the **Actor**: The actor defines how the OAuth2 application should create issues, comments and other changes. Options include:
    - **User** (Linear's default): The application creates resources as the authorizing user. Use this option if you want each user to do their own authentication.
    - **Application**: The application creates resources as itself. Use this option if you have only one user (like an admin) authorizing the application.
- To use this credential with the [Linear Trigger](../trigger-nodes/n8n-nodes-base.lineartrigger.md) node, you must enable the **Include Admin Scope** toggle.

Refer to the [Linear OAuth2 Authentication documentation](https://developers.linear.app/docs/oauth/authentication) for more detailed instructions and explanations. Use the n8n **OAuth Redirect URL** as the **Redirect callback URL** in your Linear OAuth2 application.
