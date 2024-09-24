---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook trigger Permissions Object
description: Documentation for the Permissions Object of the Facebook trigger node in n8n, a workflow automation platform. Includes configuration details.
contentType: integration
priority: medium
---

# Permissions (Facebook trigger)

Use this object to receive updates when a user grants or revokes a permission for your app. Refer to [Facebook trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) for more information on the trigger itself.

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
1. Select **Permissions** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in.
1. In **Options**, choose whether to turn on the toggle to **Include Values**. When turned on, the node includes the new values for the changes.

## Related resources

Refer to Meta's [Permissions](https://developers.facebook.com/docs/graph-api/webhooks/reference/permissions/){:target=_blank .external-link} Graph API reference for more information.