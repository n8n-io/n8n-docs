---
description: Learn how to use the ClickUp Trigger node in n8n
---

# ClickUp Trigger

[ClickUp](https://clickup.com/) is a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries. Features include communication and collaboration tools, task assignments and statuses, alerts and a task toolbar.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ClickUp/README.md).
:::


## Example Usage

This workflow allows you to receive updates for events in ClickUp. You can also find the [workflow](https://n8n.io/workflows/487) on the website. This example usage workflow would use the following node.
- [ClickUp Trigger]()

The final workflow should look like the following image.

![A workflow with the ClickUp Trigger node](./workflow.png)


### 1. ClickUp Trigger node

1. First of all, you'll have to enter credentials for the ClickUp Trigger node. You can find out how to do that [here](../../../credentials/ClickUp/README.md).
2. Select your team from the *Team* dropdown list.
3. Select the `*` option in the *Events* field to receive updates for all the events.
4. Click on *Execute Node* to run the workflow.

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the ClickUp Trigger node.
:::
