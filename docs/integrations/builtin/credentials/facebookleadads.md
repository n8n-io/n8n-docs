---
title: Facebook Lead Ads credentials
description: Documentation for the Facebook Lead Ads credentials. Use these credentials to authenticate Facebook Lead Ads in n8n, a workflow automation platform.
---

# Facebook Lead Ads credentials

You can use these credentials to authenticate the following nodes:

* [Facebook Lead Ads trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger/)

## Prerequisites

- Create a [Facebook](https://www.facebook.com/){:target=_blank .external-link} account.
- Sign up for [Meta for Developers](https://developers.facebook.com/){:target=_blank .external-link} with that account.
- Create at least one [Meta app](https://developers.facebook.com/docs/development/create-an-app){:target=_blank .external-link}.

Follow the [Facebook Lead Ads's documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/){:target=_blank .external-link} to understand how Lead Ads works and how to set up your Facebook App.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Facebook Lead Ads' documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/){:target=_blank .external-link} for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/facebook-lead-ads-trigger/){:target=_blank .external-link} on n8n's website.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

In your app, be sure you have either the **Facebook Login** or **Facebook Login for Business** product added. Then:

1. Within that product, go to **Settings**.
2. From the n8n credential, copy the **OAuth Redirect URL**.
3. Within Facebook, paste that URL into the **Valid OAuth Redirect URIs** field and Save.
4. Set your Facebook app to **Live** App Mode.
5. In **App settings > Basic**, copy the **App ID**. Use this as the **Client ID** within the n8n credential.
6. In **App settings > Basic**, copy the **App Secret**. Use this as the **Client Secret** within the n8n credential.

Use the [Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing){:target=_blank .external-link} to trigger some demo form submissions and test your workflow.
