---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Ghost credentials
description: Documentation for Ghost credentials. Use these credentials to authenticate Ghost in n8n, a workflow automation platform.
contentType: integration
---

# Ghost credentials

You can use these credentials to authenticate the following nodes:

- [Ghost](/integrations/builtin/app-nodes/n8n-nodes-base.ghost/)

## Prerequisites

Create a [Ghost](https://ghost.org/){:target=_blank .external-link} account.

## Supported authentication methods

- Admin API key
- Content API key

The keys are generated following the same steps, but the authorization flows and key format are different, so n8n stores the credentials separately. The Content API uses an API key; the Admin API uses an API key to generate a token for authentication.

## Related resources

Refer to Ghost's [Admin API documentation](https://ghost.org/docs/admin-api/){:target=_blank .external-link} for more information about the Admin API service. Refer to Ghost's [Content API documentation](https://ghost.org/docs/content-api/){:target=_blank .external-link} for more information about the Content API service.

## Using Admin API key

To configure this credential, you'll need:

- The **URL** of your Ghost admin domain. Your [admin domain](https://ghost.org/docs/admin-api/#base-url){:target=_blank .external-link} can be different to your main domain and may include a subdirectory. All Ghost(Pro) blogs have a `*.ghost.io` domain as their admin domain and require https.
- An **API Key**: To generate a new API key, create a new Custom Integration. Refer to the [Ghost Admin API Token Authentication Key documentation](https://ghost.org/docs/admin-api/#token-authentication){:target=_blank .external-link} for more detailed instructions. Copy the **Admin API Key** and use this as the **API Key** in the Ghost Admin n8n credential.

## Using Content API key

To configure this credential, you'll need:

- The **URL** of your Ghost admin domain. Your [admin domain](https://ghost.org/docs/content-api/#url){:target=_blank .external-link} can be different to your main domain and may include a subdirectory. All Ghost(Pro) blogs have a `*.ghost.io` domain as their admin domain and require https.
- An **API Key**: To generate a new API key, create a new Custom Integration. Refer to the [Ghost Content API Key documentation](https://ghost.org/docs/content-api/#key){:target=_blank .external-link} for more detailed instructions. Copy the **Content API Key** and use this as the **API Key** in the Ghost Content n8n credential.

