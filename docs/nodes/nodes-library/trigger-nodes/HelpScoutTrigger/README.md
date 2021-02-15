---
permalink: /nodes/n8n-nodes-base.helpScoutTrigger
description: Learn how to use the Help Scout Trigger node in n8n
---

# Help Scout Trigger

[Help Scout](https://www.helpscout.com/) is a help desk software that provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/HelpScout/README.md).
:::

## Example Usage

This workflow allows you to receive updates when a customer is created in Help Scout. You can also find the [workflow](https://n8n.io/workflows/669) on n8n.io. This example usage workflow would use the following node.
- [Help Scout Trigger]()

The final workflow should look like the following image.

![A workflow with the Help Scout Trigger node](./workflow.png)

### 1. Help Scout Trigger node

1. First of all, you'll have to enter credentials for the Help Scout Trigger node. You can find out how to do that [here](../../../credentials/helpScout/README.md).
2. Select 'Customer - Created' from the ***Events*** dropdown list.
3. Click on ***Execute Node*** to run the node.

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Help Scout Trigger node.
:::
