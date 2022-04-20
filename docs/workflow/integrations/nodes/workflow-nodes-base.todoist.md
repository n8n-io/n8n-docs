---
title: Todoist
description: Use Todoist with Workflow²
tags:
  - Workflow²
  - Todoist
---
# Todoist

[Todoist](https://todoist.com/) is a task management software that can be used for small teams, individuals and professionals to manage anything from a shopping list to major projects at work.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/todoist/).


## Basic Operations

* Task
    * Create a new task
    * Close a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Reopen a task
    * Update a task

## Example Usage

This workflow allows you to create a new task in Todoist. You can also find the [workflow](https://n8n.io/workflows/481) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Todoist]()

The final workflow should look like the following image.

![A workflow with the Todoist node](/_images/integrations/nodes/todoist/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Todoist node

1. First of all, you'll have to enter credentials for the Todoist node. You can find out how to do that [here](/workflow/integrations/credentials/todoist/).
2. Select your project from the *Project* dropdown list.
3. Enter the content for the task in the *Content* field.
4. Click on *Execute Node* to run the workflow.




