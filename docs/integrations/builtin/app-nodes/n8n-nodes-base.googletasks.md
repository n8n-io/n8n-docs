---
title: Google Tasks
description: Documentation for the Google Tasks node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Google Tasks

Use the Google Tasks node to automate work in Google Tasks, and integrate Google Tasks with other applications. n8n has built-in support for a wide range of Google Tasks features, including adding, updating, and retrieving contacts. 

On this page, you'll find a list of operations the Google Tasks node supports and links to more resources.

/// note | Credentials
Refer to [Google Tasks credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Google Tasks integrations](https://n8n.io/integrations/google-tasks/){:target="_blank" .external-link} list.
///

## Basic Operations

* Task
    * Add a task to task list
    * Delete a task
    * Retrieve a task
    * Retrieve all tasks from a task list
    * Update a task

## Example Usage

This workflow allows you to add a task to Google Tasks. You can also find the [workflow](https://n8n.io/workflows/428) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Tasks]()

The final workflow should look like the following image.

![A workflow with the Google Tasks node](/_images/integrations/builtin/app-nodes/googletasks/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Tasks node

1. First of all, you'll have to enter credentials for the Google Tasks node. You can find out how to do that [here](/integrations/builtin/credentials/google/).
2. Select the *TaskList* from the dropdown list of the user's task-lists where a new task needs to be added.
3. Enter a title for the task in the *Title* field.
4. Click on *Execute Node* to run the workflow.

