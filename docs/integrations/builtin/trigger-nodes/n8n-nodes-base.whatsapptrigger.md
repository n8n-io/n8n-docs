---
title: WhatsApp Trigger node documentation
contentType:
  - integration
  - reference
priority: high
nodeTitle: WhatsApp Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger
description: >-
  Learn how to use the WhatsApp Trigger node in n8n. Follow technical
  documentation to integrate WhatsApp Trigger node into your workflows.
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

# WhatsApp Trigger

Use the WhatsApp Trigger node to respond to events in WhatsApp and integrate WhatsApp with other applications. n8n has built-in support for a wide range of WhatsApp events, including account, message, and phone number events.

On this page, you'll find a list of events the WhatsApp Trigger node can respond to, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [WhatsApp Business Cloud credentials documentation](../credentials/whatsapp.md) for authentication information for this node.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [WhatsApp integrations](https://n8n.io/integrations/whatsapp-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Account Review Update
* Account Update
* Business Capability Update
* Message Template Quality Update
* Message Template Status Update
* Messages
* Phone Number Name Update
* Phone Number Quality Update
* Security
* Template Category Update

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for WhatsApp. Refer to the [WhatsApp Business Cloud node documentation](../app-nodes/n8n-nodes-base.whatsapp/README.md) for more information.

View [example workflows and related content](https://n8n.io/integrations/whatsapp-trigger/) on n8n's website.

Refer to [WhatsApp's documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) for details about their API.

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the WhatsApp Trigger node and steps to resolve or troubleshoot them.

### Workflow only works in testing or production <a href="#workflow-only-works-in-testing-or-production" id="workflow-only-works-in-testing-or-production"></a>

WhatsApp only allows you to register a single webhook per app. This means that every time you switch from using the testing URL to the production URL (and vice versa), WhatsApp overwrites the registered webhook URL.

You may have trouble with this if you try to test a workflow that's also published. WhatsApp will only send events to one of the two webhook URLs, so the other will never receive event notifications.

To work around this, you can disable your workflow when testing:

{% hint style="warning" %}
**Halts production traffic**

This workaround temporarily disables your production workflow for testing. Your workflow will no longer receive production traffic while it's unpublished.
{% endhint %}

1. Go to your workflow page.
2. From the workflow settings dropdown, click **Unpublish** to disable the workflow temporarily.
3. Test your workflow using the test webhook URL.
4. When you finish testing, click **Publish**. The production webhook URL should resume working.

### Workflow doesn't run when WhatsApp messages arrive

Meta sends WhatsApp webhooks for a WhatsApp Business Account (WABA) only to apps subscribed to that account. When you publish a workflow with a WhatsApp Trigger node, n8n registers your webhook URL on your Meta app. It doesn't subscribe your app to your WABA.

If your app isn't subscribed to your WABA, messages sent to your WhatsApp number never reach n8n. The workflow doesn't start, and n8n shows no failed execution. A test event sent from the Meta App Dashboard can still reach n8n, so a passing test doesn't rule this out.

To check the subscription and fix it:

1. In the [Meta for Developers Apps dashboard](https://developers.facebook.com/apps/), select your app, then go to **WhatsApp** > **API Setup**. Copy the WhatsApp Business Account ID. Don't use the phone number ID.
2. Get an access token for the same Meta app as your n8n WhatsApp Trigger credential. The request in step 4 subscribes the app that the token belongs to. The token needs the `whatsapp_business_management` permission. For example, in Meta's [Graph API Explorer](https://developers.facebook.com/tools/explorer/), select your app under **Meta App**, add the permission, and generate a token.
3. List the apps subscribed to your WABA:

    ```bash
    curl -X GET 'https://graph.facebook.com/<api-version>/<business-account-id>/subscribed_apps' \
    	-H 'Authorization: Bearer <access-token>'
    ```

    Each subscribed app appears in the `data` array with its ID in `whatsapp_business_api_data.id`. Your app's ID is the **Client ID** in your n8n credential. If the response is `{"data": []}`, or none of the IDs match yours, your app isn't subscribed.

    If your app's entry also has an `override_callback_uri`, Meta sends message webhooks for this WABA to that URL instead of to your app's webhook URL. An override set on the business phone number takes precedence over both. Check that the URL is the one you expect.
4. If your app is already subscribed, skip this step. A `POST` without a body removes any `override_callback_uri` from your app's subscription. If your app isn't subscribed, subscribe it. This request doesn't need a body:

    ```bash
    curl -X POST 'https://graph.facebook.com/<api-version>/<business-account-id>/subscribed_apps' \
    	-H 'Authorization: Bearer <access-token>'
    ```

    A successful request returns `{"success": true}`.
5. If you subscribed your app in step 4, run the request from step 3 again and check that your app's ID is in the list.
6. Send a message to your WhatsApp number to test the published workflow.

{% hint style="warning" %}
**Don't delete the subscription to fix a webhook conflict**

The "already has a webhook subscription" error refers to your app's webhook URL, not to your WABA subscription. Don't send a `DELETE` request to `subscribed_apps` to clear it. That request unsubscribes your app from your WABA, and Meta stops sending webhooks for that account.
{% endhint %}

Refer to Meta's [Subscribed Apps API](https://developers.facebook.com/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/subscribed-apps-api/) reference and [Webhook overrides](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/override/) for more information.
