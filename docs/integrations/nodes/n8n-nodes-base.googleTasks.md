# Google Tasks

[Google Tasks](https://tasks.google.com) is a task management service developed by Google. It keeps track of your daily tasks, organize multiple lists, and track important deadlines.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/google/).


## Basic Operations

* Task
    * Add a task to tasklist
    * Delete a task
    * Retrieve a task
    * Retrieve all tasks from a tasklist
    * Update a task

## Example Usage

This workflow allows you to add a task to Google Tasks. You can also find the [workflow](https://n8n.io/workflows/428) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Google Tasks]()

The final workflow should look like the following image.

![A workflow with the Google Tasks node](/_images/integrations/nodes/googletasks/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Tasks node

1. First of all, you'll have to enter credentials for the Google Tasks node. You can find out how to do that [here](/integrations/credentials/google/).
2. Select the *TaskList* from the dropdown list of the user's task-lists where a new task needs to be added.
3. Enter a title for the task in the *Title* field.
4. Click on *Execute Node* to run the workflow.
