---
permalink: /nodes/n8n-nodes-base.convertKitTrigger
---

# ConvertKit Trigger

[ConvertKit](https://www.convertkit.com/) is a fully-featured email marketing platform. ConvertKit can be used to build an email list, send email broadcasts, automate sequences, create segments, and build landing pages.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ConvertKit/README.md).
:::

## Example Usage

This workflow allows you to receive updates when a subscriber is added through a form in ConvertKit. You can also find the [workflow](https://n8n.io/workflows/644) on n8n.io. This example usage workflow would use the following node.
- [ConvertKit Trigger]()

The final workflow should look like the following image.

![A workflow with the ConvertKit Trigger node](./workflow.png)

### 1. ConvertKit Trigger node

1. First of all, you'll have to enter credentials for the ConvertKit Trigger node. You can find out how to do that [here](../../../credentials/ConvertKit/README.md).
2. Select 'Form Subscribe' from the ***Event*** dropdown list.
3. Select the form from the ***Form ID*** dropdown list.
4. Click on ***Execute Node*** to run the node.
