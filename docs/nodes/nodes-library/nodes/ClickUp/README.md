---
permalink: /nodes/n8n-nodes-base.clickUp
description: Learn how to use the ClickUp node in n8n
---

# ClickUp

[ClickUp](https://clickup.com/) is a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries. Features include communication and collaboration tools, task assignments and statuses, alerts and a task toolbar.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ClickUp/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.clickUp" />

## Example Usage

This workflow allows you to create a task in ClickUp. You can also find the [workflow](https://n8n.io/workflows/485) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [ClickUp]()

The final workflow should look like the following image.

![A workflow with the ClickUp node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ClickUp node

1. First of all, you'll have to enter credentials for the ClickUp node. You can find out how to do that [here](../../../credentials/ClickUp/README.md).
2. Select your team ID from the *Team ID* dropdown list.
3. Select your space ID from the *Space ID* dropdown list.
4. Select your folder ID from the *Folder ID* dropdown list.
5. Select your list ID from the *List ID* dropdown list.
6. Enter the name of the task in the *Name* field.
7. Click on *Execute Node* to run the workflow.

## Further Reading

<FurtherReadingBlog node="ClickUp" />
