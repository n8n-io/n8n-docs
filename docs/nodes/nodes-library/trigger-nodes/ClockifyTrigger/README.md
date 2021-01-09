---
description: Learn how to use the Clockify Trigger node in n8n
---

# Clockify Trigger

[Clockify](https://clockify.me/) is a free time tracker and timesheet app for tracking work hours across projects.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Clockify/README.md).
:::


## Example Usage

This workflow allows you to get new time entries from Clockify. You can also find the [workflow](https://n8n.io/workflows/536) on the website. This example usage workflow would use the following node.
- [Clockify Trigger]()

The final workflow should look like the following image.

![A workflow with the Clockify Trigger node](./workflow.png)


### 1. Clockify Trigger node

1. First of all, you'll have to enter credentials for the Clockify Trigger node. You can find out how to do that [here](../../../credentials/Clockify/README.md).
2. Select the workspace you want to receive updates for from the *Workspace* dropdown list.
3. Click on *Execute Node* to run the workflow.

**Note:** This node uses polling to get new time entries. You'll have to use the *Add Poll Time* button if you want this Trigger node to run regularly to retrieve new time entries.

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Clockify Trigger node.
:::
