---
permalink: /nodes/n8n-nodes-base.errorTrigger
---

# Error Trigger

Error Trigger node triggers the workflow when another workflow has an error. As opposed to other workflows with a trigger node, you won’t have to activate the workflow when using the Error Trigger node. Once a workflow fails, this node automagically gets details about the failed workflow and the error workflow gets triggered.

## Example Usage

This workflow allows you to receive updates when another workflow fails using the Error Trigger node. You can also find the [workflow](https://n8n.io/workflows/662) on n8n.io. This example usage workflow would use the following node.
- [Error Trigger]()

The final workflow should look like the following image.

![A workflow with the Error Trigger node](./workflow.png)

### 1. Error Trigger node

1. Click on ***Execute Node*** to run the node.

## Further Reading

- [Creating Error Workflows in n8n 🌪](https://medium.com/n8n-io/creating-error-workflows-in-n8n-6e03c9ecbc0f)
