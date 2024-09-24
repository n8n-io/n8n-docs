---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook Trigger Ad Account object documentation
description: Learn how to use the Ad Account object of the Facebook Trigger node in n8n. Follow technical documentation to integrate the Facebook Trigger node's Ad Account object into your workflows.
contentType: integration
priority: medium
---

# Facebook Trigger Ad Account object

Use this object to receive updates on certain ads changes in an Ad Account. Refer to [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) for more information on the trigger itself.

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
1. Select **Ad Account** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available Ad Account events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include:
    * **In Process Ad Objects**: Notifies you when a campaign, ad set, or ad exits the `IN_PROCESS` status. Refer to Meta's [Post-processing for Ad Creation and Edits](https://developers.facebook.com/docs/marketing-api/using-the-api/post-processing/){:target=_blank .external-link} for more information.
    * **With Issues Ad Objects**: Notifies you when a campaign, ad set, or ad under the ad account receives the `WITH_ISSUES` status.
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

## Related resources

Refer to [Webhooks for Ad Accounts](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-ad-accounts){:target=_blank .external-link} and Meta's [Ad Account](https://developers.facebook.com/docs/graph-api/webhooks/reference/ad-account/){:target=_blank .external-link} Graph API reference for more information.
