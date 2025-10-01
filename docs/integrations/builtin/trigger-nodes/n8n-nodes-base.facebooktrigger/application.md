---
title: Facebook Trigger Application object documentation
description: Learn how to use the Application object of the Facebook Trigger node in n8n. Follow technical documentation to integrate the Facebook Trigger node's Application object into your workflows.
contentType: [integration, reference]
priority: medium
---

# Facebook Trigger Application object

Use this object to receive updates sent to a specific app. Refer to [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/index.md) for more information on the trigger itself.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookapp.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.
///

## Trigger configuration

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](/integrations/builtin/credentials/facebookapp.md).
1. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](/integrations/builtin/credentials/facebookapp.md) documentation for more information.
1. Select **Application** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
    * **Add Account**
    * **Ads Rules Engine**
    * **Async Requests**
    * **Async Sessions**    
    * **Group Install**
    * **Oe Reseller Onboarding Request Created**
    * **Plugin Comment**
    * **Plugin Comment Reply**
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

## Related resources

Refer to Meta's [Application](https://developers.facebook.com/docs/graph-api/webhooks/reference/application/) Graph API reference for more information.
