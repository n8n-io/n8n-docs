---
title: Facebook Trigger Ad Account object documentation
description: >-
  Learn how to use the Ad Account object of the Facebook Trigger node in n8n.
  Follow technical documentation to integrate the Facebook Trigger node's Ad
  Account object into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Trigger Ad Account object documentation
originalFilePath: >-
  integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account
layout:
  description:
    visible: false
---

# Facebook Trigger Ad Account object <a href="#facebook-trigger-ad-account-object" id="facebook-trigger-ad-account-object"></a>

Use this object to receive updates on certain ads changes in an Ad Account. Refer to [Facebook Trigger](README.md) for more information on the trigger itself.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/facebookapp.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.
{% endhint %}

## Trigger configuration <a href="#trigger-configuration" id="trigger-configuration"></a>

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](../../credentials/facebookapp.md).
1. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](../../credentials/facebookapp.md) documentation for more information.
1. Select **Ad Account** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available Ad Account events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
    * **In Process Ad Objects**: Notifies you when a campaign, ad set, or ad exits the `IN_PROCESS` status. Refer to Meta's [Post-processing for Ad Creation and Edits](https://developers.facebook.com/docs/marketing-api/using-the-api/post-processing/) for more information.
    * **With Issues Ad Objects**: Notifies you when a campaign, ad set, or ad under the ad account receives the `WITH_ISSUES` status.
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Webhooks for Ad Accounts](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-ad-accounts) and Meta's [Ad Account](https://developers.facebook.com/docs/graph-api/webhooks/reference/ad-account/) Graph API reference for more information.
