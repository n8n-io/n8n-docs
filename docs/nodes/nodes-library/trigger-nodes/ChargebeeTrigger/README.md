---
permalink: /nodes/n8n-nodes-base.chargebeeTrigger
---

# Chargebee Trigger

[Chargebee](https://www.chargebee.com/) is a billing platform for subscription based SaaS and eCommerce businesses. Chargebee integrates with payment gateways to let you automate recurring payment collection along with invoicing, taxes, accounting, email notifications, SaaS Metrics and customer management. 

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Chargebee/README.md).
:::


## Example Usage

This workflow allows you to receive updates for events in Chargebee. You can also find the [workflow](https://n8n.io/workflows/486) on the website. This example usage workflow would use the following node.
- [Chargebee Trigger]()

The final workflow should look like the following image.

![A workflow with the Chargebee Trigger node](./workflow.png)


### 1. Chargebee Trigger node

1. First of all, you'll have to add the webhook URL in Chargebee. You can find instructions on how to do that in the FAQs below.
2. Select the `*` option in the *Events* field to receive updates when any event is triggered.
3. Click on *Execute Node* to run the workflow.


## FAQs

### How do I add my webhook URL in Chargebee?
1. Open your Chargebee dashboard.
2. Click on "Settings".
3. Click on "Configure Chargebee".
4. Scroll down and click on "Webhooks".
5. Click on the *Add Webhook* button. 
6. Enter the Webhook Name and the Webhook URL.
7. Click on the *Create* button.
