# Asana

[Asana](https://asana.com/) is a web and mobile application designed to help teams organize, track, and manage their work.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/asana/).


## Basic Operations

* Project
    * Create a new project
    * Delete a project
    * Get a project
    * Get all projects
    * Update a project
* Subtask
    * Create a subtask
    * Get all substasks
* Task
    * Create a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Move a task
    * Search for tasks
    * Update a task
* Task Comment
    * Add a comment to a task
    * Remove a comment from a task
* Task Tag
    * Add a tag to a task
    * Remove a tag from a task
* Task Project
    * Add a task to a project
    * Remove a task from a project
* User
    * Get a user
    * Get all users

## Example Usage

This workflow allows you to create a new task in Asana. You can also find the [workflow](https://n8n.io/workflows/478) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Asana]()

The final workflow should look like the following image.

![A workflow with the Asana node](/_images/integrations/nodes/asana/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Asana node

1. First of all, you'll have to enter credentials for the Asana node. You can find out how to do that [here](/integrations/credentials/asana/).
2. Select your workspace from the *Workspace* dropdown list.
3. Enter the name of the task in the *Name* field.
4. Click on *Execute Node* to run the workflow.




