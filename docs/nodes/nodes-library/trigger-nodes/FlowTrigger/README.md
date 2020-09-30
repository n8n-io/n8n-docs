---
permalink: /nodes/n8n-nodes-base.flowTrigger
description: Learn how to use the Flow Trigger node in n8n
---

# Flow Trigger

[Flow](https://www.getflow.com/) is modern task and project management software for teams. It brings together tasks, projects, timelines, and conversations, and integrates with a lot of tools.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Flow/README.md).
:::


## Example Usage

This workflow allows you to receive updates for specified tasks in Flow. You can also find the [workflow](https://n8n.io/workflows/508) on the website. This example usage workflow would use the following node.
- [Flow Trigger]()

The final workflow should look like the following image.

![A workflow with the Flow Trigger node](./workflow.png)


### 1. Flow Trigger node

1. First of all, you'll have to enter credentials for the Flow Trigger node. You can find out how to do that [here](../../../credentials/Flow/README.md).
2. Select 'Task' from the *Resource* dropdown list.
3. Enter one or more task IDs separated by commas in the *Task ID* field. You can find the task ID by clicking on the task in Flow and copying the number after `tasks/` in the URL.
4. Click on *Execute Node* to run the workflow.
