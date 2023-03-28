---
title: Todoist
description: Documentation for the Todoist node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Todoist

The Todoist node allows you to automate work in Todoist, and integrate Todoist with other applications. n8n has built-in support for a wide range of Todoist features, including creating, updating, deleting, and getting tasks. 

On this page, you'll find a list of operations the Todoist node supports and links to more resources.

!!! note "Credentials"
    Refer to [Todoist credentials](/integrations/builtin/credentials/todoist/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Todoist integrations](https://n8n.io/integrations/todoist/){:target="_blank" .external-link} list.


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
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Todoist]()

The final workflow should look like the following image.

![A workflow with the Todoist node](/_images/integrations/builtin/app-nodes/todoist/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Todoist node

1. First of all, you'll have to enter credentials for the Todoist node. You can find out how to do that [here](/integrations/builtin/credentials/todoist/).
2. Select your project from the *Project* dropdown list.
3. Enter the content for the task in the *Content* field.
4. Click on *Execute Node* to run the workflow.





