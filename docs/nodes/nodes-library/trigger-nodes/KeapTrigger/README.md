---
permalink: /nodes/n8n-nodes-base.keapTrigger
---

# Keap Trigger

[Keap](https://keap.com/) is an e-mail marketing and sales platform for small businesses, including products to manage and optimize the customer lifecycle, customer relationship management, marketing automation, lead capture, and e-commerce.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Keap/README.md).
:::


## Example Usage

This workflow allows you to receive updates when new contacts are created in Keap. You can also find the [workflow](https://n8n.io/workflows/554) on the website. This example usage workflow would use the following node.
- [Keap Trigger]()

The final workflow should look like the following image.

![A workflow with the Keap Trigger node](./workflow.png)


### 1. Keap Trigger node

1. First of all, you'll have to enter credentials for the Keap Trigger node. You can find out how to do that [here](../../../credentials/Keap/README.md).
2. Select the 'Contact Add' option from the *Event* dropdown list to receive updates when a new contact is created.
3. Click on *Execute Node* to run the workflow.
