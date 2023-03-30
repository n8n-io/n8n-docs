---
title: Workflow trigger
description: Documentation for the Workflow trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Workflow trigger

The Workflow trigger node gets triggered when a workflow is updated or activated.

!!! note "Keep in mind"
    If you want to use the Workflow trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.


The Workflow trigger node gets triggered for the workflow that it gets added to. The Workflow trigger node can be used to trigger a workflow to notify the state of the workflow.

## Node Reference

- Events
    - ***Active Workflow Updated:*** triggers when this workflow is updated
    - ***Workflow Activated:*** triggers when this workflow is activated

## Example Usage

This workflow allows you to receive a message on Mattermost when a workflow is updated. You can also find the [workflow](https://n8n.io/workflows/1059) on n8n.io. This example usage workflow uses the following nodes.
- [Workflow trigger]()
- [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/)

The final workflow should look like the following image.

![A workflow with the Webhook node](/_images/integrations/builtin/core-nodes/workflowtrigger/workflow.png)

### 1. Workflow trigger node

Open the workflow where you want to add the Workflow trigger workflow. Add the Workflow trigger node to the workflow.

The Workflow trigger node will trigger the workflow when the workflow gets updated.

1. Select 'Active Workflow Updated' from the ***Events*** dropdown list.

In the screenshot below, you will notice that the node triggers the workflow when the workflow gets updated.

![Using the Workflow trigger node to trigger the workflow](/_images/integrations/builtin/core-nodes/workflowtrigger/workflowtrigger_node.png)

### 2. Mattermost node (post: message)

This node will send a message in the `workflow` channel on Mattermost.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to enter credentials for this node [here](/integrations/builtin/credentials/mattermost/).
2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field click on ***Add Expression***.

4. Enter the following message in the ***Expression*** field: `The workflow {{$workflow.name}}, was updated.`. `$workflow.name` returns the name of the workflow.
5. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node sends a message to Mattermost.

![Using the Mattermost node to send a message to a channel](/_images/integrations/builtin/core-nodes/workflowtrigger/mattermost_node.png)

