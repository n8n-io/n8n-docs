---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Shopify credentials
description: Documentation for Shopify credentials. Use these credentials to authenticate Shopify in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Shopify credentials

You can use these credentials to authenticate the following nodes with Shopify.

- [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/)
- [Shopify Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.shopifytrigger/)

## Prerequisites

- Create a [Shopify](https://shopify.com/){:target=_blank .external-link} account.
- [Create and install a custom app](https://help.shopify.com/en/manual/apps/app-types/custom-apps){:target=_blank .external-link}.

## Supported authentication methods

- API token
- OAuth2
- API key

## Related resources

Refer to [Shopify's authentication documentation](https://shopify.dev/docs/apps/auth){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- Your **Shop Subdomain**: Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.
- An **Access Token**: Generated when you create a custom app as the **Admin API Access Token**. View it in the app's **API Credentials** section.
- An **APP Secret Key**: Generated when you create a custom app as the **API Secret Key**. View it in the app's **API Credentials** section.

[Creating a custom app](https://help.shopify.com/en/manual/apps/app-types/custom-apps){:target=_blank .external-link} generates the **Access Token** and **APP Secret Key**.

Refer to [Generate access tokens for custom apps in the Shopify admin](https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/generate-app-access-tokens-admin){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a custom app in the **API Access** section.
- A **Client Secret**: Generated when you create a custom app in the **API Access** section.
- Your **Shop Subdomain**: Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.

Refer to [About auth code grants](https://shopify.dev/docs/apps/build/authentication-authorization/get-access-tokens/auth-code-grant){:target=_blank .external-link} for more information on working with OAuth2.

## Using API key

To configure this credential, you'll need:

- An **API Key**
- A **Password**
- Your **Shop Subdomain**: Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.
- _Optional:_ A **Shared Secret**

## Forbidden credentials error

<!-- This issue was noted by someone in the forums and we also ran into it while testing auth setup -->
If you get a **Couldn't connect with these settings / Forbidden - perhaps check your credentials** warning when you test the credentials, this may be due to [access scope](https://shopify.dev/docs/api/usage/access-scopes){:target=_blank .external-link} dependencies. For example, `read_orders` scope also requires `read_products` scope.
