---
title: Facebook Trigger Certificate Transparency object documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Trigger Certificate Transparency object documentation
originalFilePath: >-
  integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency
description: >-
  Learn how to use the Certificate Transparency object of the Facebook Trigger
  node in n8n. Follow technical documentation to integrate the Facebook Trigger
  node's Certificate Transparency object into y
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Certificate Transparency

Use this object to receive updates about newly issued certificates for any domains that you have subscribed for certificate alerts or phishing alerts. Refer to [Facebook Trigger](./) for more information on the trigger itself.

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
2. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](../../credentials/facebookapp.md) documentation for more information.
3. Select **Certificate Transparency** as the **Object**.
4. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
   * **Certificate**: Notifies you when someone issues a new certificate for your subscribed domains. You'll need to subscribe your domain for certificate alerts.
   * **Phishing**: Notifies you when someone issues a new certificate that may be phishing one of your legitimate subscribed domains.
5. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

For these alerts, you'll need to subscribe your domain to the relevant alerts:

* Refer to [Certificate Alerts](https://developers.facebook.com/docs/certificate-transparency-api#certificate-alerts-subscribing) for Certificate Alerts subscriptions.
* Refer to [Phishing Alerts](https://developers.facebook.com/docs/certificate-transparency-api#phishing-alerts-subscribing) for Phishing Alerts subscriptions.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Webhooks for Certificate Transparency](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-certificate-transparency) and Meta's [Certificate Transparency](https://developers.facebook.com/docs/graph-api/webhooks/reference/certificate-transparency/) Graph API reference for more information.
