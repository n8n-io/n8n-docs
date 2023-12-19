---
title: Facebook Lead Ads credentials
description: Documentation for the Facebook Lead Ads credentials. Use these credentials to authenticate Facebook Lead Ads in n8n, a workflow automation platform.
---

# Facebook Lead Ads credentials

You can use these credentials to authenticate the following nodes:

* [Facebook Lead Ads trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger/)

## Prerequisites

This integration uses OAuth. Follow the [Facebook Lead Ads's documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/){:target=_blank .external-link} to understand how Lead Ads works and how to set up your Facebook App.

## Configuration

1. Open your Facebook app page in **Meta for Developers**
2. Go to **Add Product** and add **Facebook Login**
3. Navigate to **Facebook Login > Settings** and paste into **Valid OAuth Redirect URIs** the **OAuth Redirect URL** that you find in the n8n's Facebook Lead Ads credential.
4. Switch your App Mode to **Live**
5. In **App settings > Basic** copy the **App ID** and paste it into **Client ID** (in the n8n's Facebook Lead Ads credential), and copy the **App secret** and paste it into **Client Secret**

You can use the [Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing){:target=_blank .external-link} to trigger some demo form submissions and test your workflow.

## Related resources

Refer to [Facebook Lead Ads' documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/){:target=_blank .external-link} for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/facebook-lead-ads-trigger/){:target=_blank .external-link} on n8n's website.


