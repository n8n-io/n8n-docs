---
title: Flow
description: Documentation for the Flow node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Flow

Use the Flow node to automate work in Flow, and integrate Flow with other applications. n8n has built-in support for a wide range of Flow features, including creating, updating, and getting tasks.

On this page, you'll find a list of operations the Flow node supports and links to more resources.

/// note | Credentials
Refer to [Flow credentials](/integrations/builtin/credentials/flow/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Flow integrations](https://n8n.io/integrations/flow/){:target="_blank" .external-link} list.
///

## Basic Operations

* Task
    * Create a new task
    * Update a task
    * Get a task
    * Get all the tasks

## Example Usage

This workflow allows you to get all the tasks in Flow. You can also find the [workflow](https://n8n.io/workflows/506) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Flow]()

The final workflow should look like the following image.

![A workflow with the Flow node](/_images/integrations/builtin/app-nodes/flow/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Flow node

1. First of all, you'll have to enter credentials for the Flow node. You can find out how to do that [here](/integrations/builtin/credentials/flow/).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Toggle the *Return All* slider to true.
4. Click on *Execute Node* to run the workflow.

