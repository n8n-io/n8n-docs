---
title: Notion credentials
description: Documentation for Notion credentials. Use these credentials to authenticate Notion in n8n, a workflow automation platform.
contentType: integration
---

# Notion credentials

You can use these credentials to authenticate the following nodes:

- [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
- [Notion Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.notiontrigger/)

## Prerequisites

- Create a [Notion](https://notion.so){:target=_blank .external-link} account with admin level access.
- Create a [Notion integration](https://developers.notion.com/docs/create-a-notion-integration){:target=_blank .external-link} with these [**Capabilities**](https://developers.notion.com/reference/capabilities){:target=_blank .external-link}:
    - `Read content`
    - `Update content`
    - `Insert content`
    - `User information without email addresses`

Be sure to [Give your integration page permissions](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions){:target=_blank .external-link}.

## Supported authentication methods

- API integration token: Used for internal integrations
- OAuth2: Used for public integrations

## Related resources

Refer to [Notion's API documentation](https://developers.notion.com/reference/intro){:target=_blank .external-link} for more information about the service.

## Using API integration token

To configure this credential, you'll need:

- An **Internal Integration Secret**: To generate an integration secret, [create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion){:target=_blank .external-link}. Once your integration is created, visit the **Secrets** tab to get your integration secret. Refer to [Get your API secret](https://developers.notion.com/docs/create-a-notion-integration#get-your-api-secret){:target=_blank .external-link} for more information.

Refer to the [Internal integration auth flow setup documentation](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up){:target=_blank .external-link} for further explanation.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you configure a public integration
- A **Client Secret**: Generated once you configure a public integration

As with the API integration token, you must have [created a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion){:target=_blank .external-link}.

For the OAuth2 configuration, your integration must use the [public integration auth flow setup](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up){:target=_blank .external-link}. Refer to that documentation for more detailed guidance.

As you set up this integration, copy the n8n **OAuth Redirect URL** and add it to as a **Redirect URI** in your Notion integration.