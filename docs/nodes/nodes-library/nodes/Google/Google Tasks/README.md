---
permalink: /nodes/n8n-nodes-base.googleTasks
---

# Google Tasks

[Google Tasks](https://www.google.com/tasks/) a task management service developed by Google.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

- Task
    - Add a task to the tasklist
    - Delete a task
    - Get a task
	- Retrieve all the tasks from the specified task list
    - Update a task

## Example Usage

This workflow allows you to add a task to Google Tasks. You can also find the [workflow](https://n8n.io/workflows/428) on the website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Tasks]()

The final workflow should look like the following image.

![A workflow with the Google Tasks node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Tasks node

1. First of all, you'll have to enter credentials for the Google Tasks node. You can find out how to do that [here](../../../credentials/Google/README.md).
2. To add a new task to the tsklist, select *Task* under the *Resource* field.
3. Select the *Create* option in the *Operation* field.
4. Select the *TaskList* from the dropdown list of the user's task-lists.
8. If you want to enter optional fields such as the attendees or location, etc as JSON data, then add those JSON parameters under the *Additional fields* field.
9. Click on *Execute Node* to run the workflow.
