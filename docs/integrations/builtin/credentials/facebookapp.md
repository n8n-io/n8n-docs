---
title: Facebook App credentials
description: Documentation for Facebook App credentials. Use these credentials to authenticate Facebook App in n8n, a workflow automation platform.
contentType: integration
---

# Facebook App credentials

You can use these credentials to authenticate the following nodes:

- [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/)

/// note | Facebook Graph API credentials
If you want to create credentials for the [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi/) node, follow the instructions in the [Facebook Graph API credentials](/integrations/builtin/credentials/facebookgraph/) documentation.
///

## Prerequisites

- Create a [Facebook](https://www.facebook.com/){:target=_blank .external-link} account.
- Sign up for [Meta for Developers](https://developers.facebook.com/){:target=_blank .external-link} with that account.
- Create at least one [Meta app](https://developers.facebook.com/docs/development/create-an-app){:target=_blank .external-link}.

## Supported authentication methods

- App access token

## Related resources

Refer to [Meta's Graph API documentation](https://developers.facebook.com/docs/graph-api/overview){:target=_blank .external-link} for more information about the service.

## Using app access token

To configure this credential, you'll need:

- An app **Access Token**: Refer to the Meta instructions for [Your First Request](https://developers.facebook.com/docs/graph-api/get-started#get-started){:target=_blank .external-link} to generate the App **Access Token**.
- _Optional:_ An **App Secret**: To add an **App Secret**, go to your App Dashboard **Settings > Basic**. Refer to the [App Dashboard Settings documentation](https://developers.facebook.com/docs/development/create-an-app/app-dashboard#settings){:target=_blank .external-link} and the [App Secret documentation](https://developers.facebook.com/docs/facebook-login/security#appsecret){:target=_blank .external-link} for more information. You will need to re-enter your Facebook account credentials to show the **App Secret**.

When you add an App Secret, n8n will verify this signature to validate the integrity and origin of the payload.
