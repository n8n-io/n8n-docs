---
description: Learn how to use the Taiga Trigger node in n8n
---

# Taiga Trigger

[Taiga](https://www.taiga.io/) is a free and open-source project management platform for startups, agile developers, and designers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Taiga/README.md).
:::

## Example Usage

This workflow allows you to receive updates when an event occurs in Taiga. You can also find the [workflow](https://n8n.io/workflows/686) on n8n.io. This example usage workflow would use the following node.
- [Taiga Trigger]()

The final workflow should look like the following image.

![A workflow with the Taiga Trigger node](./workflow.png)

### 1. Taiga Trigger node

1. First of all, you'll have to enter credentials for the Taiga Trigger node. You can find out how to do that [here](../../../credentials/Taiga/README.md).
2. Select the project ID from the ***Project ID*** dropdown list.
2. Click on ***Execute Node*** to run the node.

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Taiga Trigger node.
:::
