---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook Trigger Certificate Transparency object documentation
description: Learn how to use the Certificate Transparency object of the Facebook Trigger node in n8n. Follow technical documentation to integrate the Facebook Trigger node's Certificate Transparency object into your workflows.
contentType: integration
priority: medium
---

# Facebook Trigger Certificate Transparency object

Use this object to receive updates about newly issued certificates for any domains that you have subscribed for certificate alerts or phishing alerts. Refer to [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) for more information on the trigger itself.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookapp/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/){:target=_blank .external-link} page.
///

## Trigger configuration

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](/integrations/builtin/credentials/facebookapp/).
1. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](/integrations/builtin/credentials/facebookapp/) documentation for more information.
1. Select **Certificate Transparency** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
    * **Certificate**: Notifies you when someone issues a new certificate for your subscribed domains. You'll need to subscribe your domain for certificate alerts.
    * **Phishing**: Notifies you when someone issues a new certificate that may be phishing one of your legitimate subscribed domains.
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

For these alerts, you'll need to subscribe your domain to the relevant alerts:

* Refer to [Certificate Alerts](https://developers.facebook.com/docs/certificate-transparency-api#certificate-alerts-subscribing){:target=_blank .external-link} for Certificate Alerts subscriptions.
* Refer to [Phishing Alerts](https://developers.facebook.com/docs/certificate-transparency-api#phishing-alerts-subscribing){:target=_blank .external-link} for Phishing Alerts subscriptions.

## Related resources

Refer to [Webhooks for Certificate Transparency](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-certificate-transparency){:target=_blank .external-link} and Meta's [Certificate Transparency](https://developers.facebook.com/docs/graph-api/webhooks/reference/certificate-transparency/){:target=_blank .external-link} Graph API reference for more information.
