---
title: Facebook Trigger Page object documentation
description: >-
  Learn how to use the Page object of the Facebook Trigger node in n8n. Follow
  technical documentation to integrate the Facebook Trigger node's Page object
  into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Trigger Page object documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page
layout:
  description:
    visible: false
---

# Facebook Trigger Page object <a href="#facebook-trigger-page-object" id="facebook-trigger-page-object"></a>

Use this object to receive updates when updates to your page profile fields or profile settings occur or someone mentions your page. Refer to [Facebook Trigger](README.md) for more information on the trigger itself.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/facebookapp.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.
{% endhint %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

This Object requires some configuration in your app and page before you can use the trigger:

1. At least one page admin needs to grant the `manage_pages` permission to your app.
1. The page admin needs to have at least moderator privileges. If they don't, they won't receive all content.
1. You'll also need to add the app to your page, and you may need to go to the [Graph API explorer](https://developers.facebook.com/tools/explorer/) and execute this call with your app token:

    ```
    {page-id}/subscribed_apps?subscribed_fields=feed
    ```

## Trigger configuration <a href="#trigger-configuration" id="trigger-configuration"></a>

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](../../credentials/facebookapp.md).
1. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](../../credentials/facebookapp.md) documentation for more information.
1. Select **Page** as the **Object**.
1. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in. Options include individual profile fields, as well as:
    * **Feed**: Describes most changes to a page's feed, including posts, likes, shares, and so on.
    * **Leadgen**: Notifies you when a page's lead generation settings change.
    * **Live Videos**: Notifies you when a page's live video status changes.
    * **Mention**: Notifies you when new mentions in pages, comments, and so on occur.
    * **Merchant Review**: Notifies you when a page's merchant review settings change.
    * **Page Change Proposal**: Notifies you when Facebook suggests proposed changes for your Facebook Page.
    * **Page Upcoming Change**: Notifies you about upcoming changes that will occur on your Facebook Page. Facebook has suggested these changes and they may have a deadline to accept or reject before automatically taking effect.
    * **Product Review**: Notifies you when a page's product review settings change.
    * **Ratings**: Notifies you when a page's ratings change, including new ratings or when a user comments on or reacts to a rating.
    * **Videos**: Notifies you when the encoding status of a video on a page changes.
1. In **Options**, turn on the toggle to **Include Values**. This Object type fails without the option enabled.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Webhooks for Pages](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages) and Meta's [Page](https://developers.facebook.com/docs/graph-api/webhooks/reference/page/) Graph API reference for more information.
