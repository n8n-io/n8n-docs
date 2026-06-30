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

You can find authentication information for this node [here](../credentials/whatsapp.md).
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

n8n provides an app node for WhatsApp. You can find the node docs [here](../app-nodes/n8n-nodes-base.whatsapp/).

View [example workflows and related content](https://n8n.io/integrations/whatsapp-trigger/) on n8n's website.

Refer to [WhatsApp's documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) for details about their API.

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the WhatsApp Trigger node and steps to resolve or troubleshoot them.

### Workflow only works in testing or production <a href="#workflow-only-works-in-testing-or-production" id="workflow-only-works-in-testing-or-production"></a>

WhatsApp only allows you to register a single webhook per app. This means that every time you switch from using the testing URL to the production URL (and vice versa), WhatsApp overwrites the registered webhook URL.

You may have trouble with this if you try to test a workflow that's also active in production. WhatsApp will only send events to one of the two webhook URLs, so the other will never receive event notifications.

To work around this, you can disable your workflow when testing:

{% hint style="warning" %}
**Halts production traffic**

This workaround temporarily disables your production workflow for testing. Your workflow will no longer receive production traffic while it's deactivated.
{% endhint %}

1. Go to your workflow page.
2. Toggle the **Active** switch in the top panel to disable the workflow temporarily.
3. Test your workflow using the test webhook URL.
4. When you finish testing, toggle the **Inactive** toggle to enable the workflow again. The production webhook URL should resume working.
