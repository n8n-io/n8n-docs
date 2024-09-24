---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook trigger WhatsApp Business Account Object
description: Documentation for the WhatsApp Business Account Object of the Facebook trigger node in n8n, a workflow automation platform. Includes configuration details.
contentType: integration
priority: medium
---

# WhatsApp Business Account (Facebook trigger)

Use this object to receive updates when your WhatsApp Business Account (WABA) changes. Refer to [Facebook trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) for more information on the trigger itself.

/// warning | Use WhatsApp trigger
n8n recommends using the [WhatsApp trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/) with the [WhatsApp credentials](/integrations/builtin/credentials/whatsapp/) instead of the Facebook trigger node. That trigger node includes twice the events to subscribe to.
///

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookapp/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/){:target=_blank .external-link} page.
///

## Prerequisites

This Object requires some configuration in your app and WhatsApp account before you can use the trigger:

1. Subscribe your app under your WhatsApp business account. You must subscribe an app owned by your business. Apps shared with your business can't receive webhook notifications.
1. If you are working as a Solution Partner, make sure your app has completed App Review and requested the `whatsapp_business_management` permission.

## Trigger configuration

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](/integrations/builtin/credentials/facebookapp/).
1. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](/integrations/builtin/credentials/facebookapp/) documentation for more information.
1. Select **WhatsApp Business Account** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
    * **Message Template Status Update**
    * **Phone Number Name Update**
    * **Phone Number Quality Update**
    * **Account Review Update**
    * **Account Update**
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

Refer to [Webhooks for WhatsApp Business Accounts](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp){:target=_blank .external-link} and Meta's [WhatsApp Business Account](https://developers.facebook.com/docs/graph-api/webhooks/reference/whatsapp-business-account/){:target=_blank .external-link} Graph API reference for more information.