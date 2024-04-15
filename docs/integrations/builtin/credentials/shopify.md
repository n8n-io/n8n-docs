---
title: Shopify credentials
description: Documentation for Shopify credentials. Use these credentials to authenticate Shopify in n8n, a workflow automation platform.
contentType: integration
---

# Shopify credentials

You can use these credentials to authenticate the following nodes with Shopify.

- [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/)
- [Shopify Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.shopifytrigger/)

## Prerequisites

Create a [Shopify](https://shopify.com/){:target=_blank .external-link} account.

Then [create a custom app](https://help.shopify.com/en/manual/apps/app-types/custom-apps){:target=_blank .external-link} to authenticate to.

## Supported authentication methods

* [Access Token](https://shopify.dev/docs/apps/auth/access-token-types/admin-app-access-tokens){:target=_blank .external-link}. Requires:
    - Shop Subdomain (remove `.myshopify.com`)
    - Access Token: In Shopify UI, the **Admin API Access Token**
    - APP Secret Key: In Shopify UI, the **API Secret Key**
* [OAuth2](https://shopify.dev/docs/apps/auth/get-access-tokens/token-exchange){:target=_blank .external-link}. Requires:
    - Client ID: In Shopify UI, the **API Key**
    - Client Secret: In Shopify UI, the **API Secret Key**
    - Shop Subdomain (remove `.myshopify.com`)
* API Key. Requires:
    - API Key
    - Password
    - Shop Subdomain (remove `.myshopify.com`)

## Related resources

Refer to [Shopify's authentication documentation](https://shopify.dev/docs/apps/auth){:target=_blank .external-link} for more information about the service.

<!-- If this is a credential-only node, add a link to the node page on n8n's website. For example: https://n8n.io/integrations/356-gmail/ -->
This is a credential-only node. Refer to [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/) and [Shopify Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.shopifytrigger/) to learn more. View [example Shopify workflows and related content](https://n8n.io/integrations/shopify/){:target=_blank .external-link} and [example Shopify Trigger workflows and related content](https://n8n.io/integrations/shopify-trigger/){:target=_blank .external-link} on n8n's website.

## Quirks

<!-- This issue was noted by someone in the forums and we also ran into it while testing auth setup -->
If you get a "Couldn't connect with these settings / Forbidden - perhaps check your credentials" warning when you test the credentials, this may have to do with [access scope](https://shopify.dev/docs/api/usage/access-scopes){:target=_blank .external-link} dependencies (for example, `read_orders` scope also requires `read_products` scope to function).