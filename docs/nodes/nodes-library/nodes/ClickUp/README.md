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

::: details Checklist
- Create a checklist
- Delete a checklist
- Update a checklist
:::

::: details Checklist item
- Create a checklist item
- Delete a checklist item
- Update a checklist item
:::

::: details Comment
- Create a comment
- Delete a comment
- Get all comments
- Update a comment
:::

::: details Folder
- Create a folder
- Delete a folder
- Get a folder
- Get all folders
- Update a folder
:::

::: details Goal
- Create a goal
- Delete a goal
- Get a goal
- Get all goals
- Update a goal
:::

::: details Goal Key Result
- Create a key result
- Delete a key result
- Update a key result
:::

::: details List
- Create a list
- Retrieve list's custom fields
- Delete a list
- Get a list
- Get all lists
- Get list members
- Update a list
:::

::: details Space Tag
- Create a space tag
- Delete a space tag
- Get all space tags
- Update a space tag
:::

::: details Task
- Create a task
- Delete a task
- Get a task
- Get all tasks
- Get task members
- Set a custom field
- Update a task
:::

::: details Task List
- Add a task to a list
- Remove a task from a list
:::

::: details Task Tag
- Add a tag to a task
- Remove a tag from a task
:::

::: details Task Dependency
- Create a task dependency
- Delete a task dependency
:::

::: details Time Entry
- Create a time entry
- Delete a time entry
- Get a time entry
- Start a time entry
- Stop the current running timer
- Update a time entry
:::

::: details Time Entry Tag
- Add a tag to a time entry
- Get all time entry tags
- Remove a tag from time entry
:::

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
