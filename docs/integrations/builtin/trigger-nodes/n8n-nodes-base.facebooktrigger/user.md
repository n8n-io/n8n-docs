---
title: Facebook Trigger User object documentation
description: >-
  Learn how to use the User object of the Facebook Trigger node in n8n. Follow
  technical documentation to integrate the Facebook Trigger node's User object
  into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Trigger User object documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user
layout:
  description:
    visible: false
---

# Facebook Trigger User object <a href="#facebook-trigger-user-object" id="facebook-trigger-user-object"></a>

Use this object to receive updates when changes to a user's profile occur. Refer to [Facebook Trigger](README.md) for more information on the trigger itself.

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
1. Select **User** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in.
1. In **Options**, choose whether to turn on the toggle to **Include Values**. When turned on, the node includes the new values for the changes.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to Meta's [User](https://developers.facebook.com/docs/graph-api/webhooks/reference/user/) Graph API reference for more information.
