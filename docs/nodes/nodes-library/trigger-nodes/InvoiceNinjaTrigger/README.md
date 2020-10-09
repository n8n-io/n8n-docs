---
permalink: /nodes/n8n-nodes-base.invoiceNinjaTrigger
description: Learn how to use the Invoice Ninja Trigger node in n8n
---

# Invoice Ninja Trigger

[Invoice Ninja](https://www.invoiceninja.com/) is a free open-source online invoicing app for freelancers & businesses. It offers invoicing, payments, expense tracking, & time-tasks.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/InvoiceNinja/README.md).
:::


## Example Usage

This workflow allows you to receive updates when new invoices are created in Invoice Ninja. You can also find the [workflow](https://n8n.io/workflows/535) on the website. This example usage workflow would use the following node.
- [Invoice Ninja Trigger]()

The final workflow should look like the following image.

![A workflow with the Invoice Ninja Trigger node](./workflow.png)


### 1. Invoice Ninja Trigger node

1. First of all, you'll have to enter credentials for the Invoice Ninja Trigger node. You can find out how to do that [here](../../../credentials/InvoiceNinja/README.md).
2. Select the 'Invoice Created' option from the *Event* dropdown list to receive updates when a new invoice is created.
3. Click on *Execute Node* to run the workflow.
