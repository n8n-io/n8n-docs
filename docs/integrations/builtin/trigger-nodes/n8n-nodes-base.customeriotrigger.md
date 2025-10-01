---
title: Customer.io Trigger node documentation
description: Learn how to use the Customer.io Trigger node in n8n. Follow technical documentation to integrate Customer.io Trigger node into your workflows.
contentType: [integration, reference]
---

# Customer.io Trigger node

[Customer.io](https://customer.io/) enables users to send newsletters to selected segments of customers using their website data. You can send targeted emails, push notifications, and SMS to lower churn, create stronger relationships, and drive subscriptions.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/customerio.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Customer.io Trigger integrations](https://n8n.io/integrations/customerio-trigger/) page.
///

## Events

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

## Related resources

n8n provides an app node for Customer.io. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.customerio.md).

View [example workflows and related content](https://n8n.io/integrations/customerio-trigger/) on n8n's website.

Refer to [Customer.io's documentation](https://docs.customer.io/api/) for details about their API.
