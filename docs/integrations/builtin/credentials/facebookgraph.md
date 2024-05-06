---
title: Facebook Graph API credentials
description: Documentation for Facebook Graph API credentials. Use these credentials to authenticate Facebook Graph API in n8n, a workflow automation platform.
contentType: integration
---

# Facebook Graph API credentials

You can use these credentials to authenticate the following nodes with Facebook.

- [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi/)

/// note | Facebook Trigger credentials
If you want to create credentials for the [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) node, follow the instructions mentioned in the [Facebook App credentials](/integrations/builtin/credentials/facebookapp/) documentation.
///

## Prerequisites

- Create a [Facebook](https://www.facebook.com/){:target=_blank .external-link} account.
- Sign up for [Meta for Developers](https://developers.facebook.com/){:target=_blank .external-link} with that account.
- Create at least one [Meta app](https://developers.facebook.com/docs/development/create-an-app){:target=_blank .external-link}.

## Supported authentication methods

- App Access Token

## Related resources

Refer to [Meta's Graph API documentation](https://developers.facebook.com/docs/graph-api/overview){:target=_blank .external-link} for more information about the service.

## Using App Access Token

To configure this credential, you'll need:

- An app **Access Token**
- _Optional:_ An **App Secret**

Refer to the Meta instructions for [Your First Request](https://developers.facebook.com/docs/graph-api/get-started#get-started){:target=_blank .external-link} to generate the App **Access Token**.

To add an **App Secret**, go to your App Dashboard **Settings > Basic**. Refer to the [App Dashboard Settings documentation](https://developers.facebook.com/docs/development/create-an-app/app-dashboard#settings){:target=_blank .external-link} and the [App Secret documentation](https://developers.facebook.com/docs/facebook-login/security#appsecret){:target=_blank .external-link} for more information. You will need to re-enter your Facebook account credentials to show the **App Secret**.

When you add an App Secret, the node will verify this signature to validate the integrity and origin of the payload.

