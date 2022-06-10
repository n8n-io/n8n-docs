---
title: Workflow Trigger
description: The Workflow Trigger node gets triggered when a workflow is updated or activated.
tags:
  - Workflow²
  - Workflow Trigger
---

# Workflow Trigger

The Workflow Trigger node gets triggered when a workflow is updated or activated.

!!! note " Keep in mind"
    If you want to use the Workflow Trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.


The Workflow Trigger node gets triggered for the workflow that it gets added to. The Workflow Trigger node can be used to trigger a workflow to notify the state of the workflow.

## Node Reference

- Events
    - ***Active Workflow Updated:*** Triggers when this workflow is updated
    - ***Workflow Activated:*** Triggers when this workflow is activated

## Example Usage

This workflow allows you to receive a message on Mattermost when a workflow is updated. You can also find the [workflow](https://n8n.io/workflows/1059) on Workflow².io. This example usage workflow uses the following nodes.
- [Workflow Trigger]()
- [Mattermost](/workflow/integrations/nodes/n8n-nodes-base.mattermost/)

The final workflow should look like the following image.

![A workflow with the Webhook node](/_images/integrations/core-nodes/workflowtrigger/workflow.png)

### 1. Workflow Trigger node

Open the workflow where you want to add the Workflow Trigger workflow. Add the Workflow Trigger node to the workflow.

The Workflow Trigger node will trigger the workflow when the workflow gets updated.

1. Select 'Active Workflow Updated' from the ***Events*** dropdown list.

In the screenshot below, you will notice that the node triggers the workflow when the workflow gets updated.

![Using the Workflow Trigger node to trigger the workflow](/_images/integrations/core-nodes/workflowtrigger/workflowtrigger_node.png)

### 2. Mattermost node (post: message)

This node will send a message in the `workflow` channel on Mattermost.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/mattermost/).
2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field click on ***Add Expression***.

4. Enter the following message in the ***Expression*** field: `The workflow {{$workflow.name}}, was updated.`. `$workflow.name` returns the name of the workflow.
5. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node sends a message to Mattermost.

![Using the Mattermost node to send a message to a channel](/_images/integrations/core-nodes/workflowtrigger/mattermost_node.png)
