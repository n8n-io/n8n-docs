---
permalink: /nodes/n8n-nodes-base.todoist
description: Learn how to use the Todoist node in n8n
---

# Todoist

[Todoist](https://todoist.com/) is a task management software that can be used for small teams, individuals and professionals to manage anything from a shopping list to major projects at work.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Todoist/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.todoist" />

## Example Usage

This workflow allows you to create a new task in Todoist. You can also find the [workflow](https://n8n.io/workflows/481) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Todoist]()

The final workflow should look like the following image.

![A workflow with the Todoist node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Todoist node

1. First of all, you'll have to enter credentials for the Todoist node. You can find out how to do that [here](../../../credentials/Todoist/README.md).
2. Select your project from the *Project* dropdown list.
3. Enter the content for the task in the *Content* field.
4. Click on *Execute Node* to run the workflow.
