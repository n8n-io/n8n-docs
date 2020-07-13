---
permalink: /nodes/n8n-nodes-base.clickUp
---

# ClickUp

[ClickUp](https://clickup.com/) is a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries. Features include communication and collaboration tools, task assignments and statuses, alerts and a task toolbar.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ClickUp/README.md).
:::

## Basic Operations

- Checklist
    - Create a checklist
    - Delete a checklist
    - Update a checklist
- Checklist item
    - Create a checklist item
    - Delete a checklist item
    - Update a checklist item
- Comment
    - Create a comment
    - Delete a comment
    - Get all comments
    - Update a comment
- Folder
    - Create a folder
    - Delete a folder
    - Get a folder
    - Get all folders
    - Update a folder
- Goal
    - Create a goal
    - Delete a goal
    - Get a goal
    - Get all goals
    - Update a goal
- Goal Key Result
    - Create a key result
    - Delete a key result
    - Update a key result
- List
    - Create a list
    - Retrieve list's custom fields
    - Delete a list
    - Get a list
    - Get all lists
    - Update a list
- Task
    - Create a task
    - Delete a task
    - Get a task
    - Get all tasks
    - Set a custom field
    - Update a task
- Task Dependency
    - Create a task dependency
    - Delete a task dependency
- Time Tracking
    - Log time on task
    - Delete a logged time
    - Get all logging times on task
    - Update a logged time

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
