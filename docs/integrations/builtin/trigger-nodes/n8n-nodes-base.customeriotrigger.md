---
title: Customer.io Trigger node documentation
description: >-
  Learn how to use the Customer.io Trigger node in n8n. Follow technical
  documentation to integrate Customer.io Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Customer.io Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.customeriotrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.customeriotrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.customeriotrigger
layout:
  description:
    visible: false
---

# Customer.io Trigger node <a href="#customerio-trigger-node" id="customerio-trigger-node"></a>

[Customer.io](https://customer.io/) enables users to send newsletters to selected segments of customers using their website data. You can send targeted emails, push notifications, and SMS to lower churn, create stronger relationships, and drive subscriptions.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/customerio.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Customer.io Trigger integrations](https://n8n.io/integrations/customerio-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Customer
    * Subscribed
    * Unsubscribe
* Email
    * Bounced
    * Clicked
    * Converted
    * Delivered
    * Drafted
    * Failed
    * Opened
    * Sent
    * Spammed
* Push
    * Attempted
    * Bounced
    * Clicked
    * Delivered
    * Drafted
    * Failed
    * Opened
    * Sent
* Slack
    * Attempted
    * Clicked
    * Drafted
    * Failed
    * Sent
* Sms
    * Attempted
    * Bounced
    * Clicked
    * Delivered
    * Drafted
    * Failed
    * Sent

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for Customer.io. You can find the node docs [here](../app-nodes/n8n-nodes-base.customerio.md).

View [example workflows and related content](https://n8n.io/integrations/customerio-trigger/) on n8n's website.

Refer to [Customer.io's documentation](https://docs.customer.io/api/) for details about their API.
