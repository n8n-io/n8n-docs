---
title: Zoom
description: Documentation for the Zoom node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Zoom

The Zoom node allows you to automate work in Zoom, and integrate Zoom with other applications. n8n has built-in support for a wide range of Zoom features, including creating, retrieving, deleting, and updating meetings. 

On this page, you'll find a list of operations the Zoom node supports and links to more resources.

!!! note "Credentials"
    Refer to [Zoom credentials](/integrations/builtin/credentials/zoom/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Zoom integrations](https://n8n.io/integrations/zoom/){:target="_blank" .external-link} list.


## Basic Operations

* Meeting
    * Create a meeting
    * Delete a meeting
    * Retrieve a meeting
    * Retrieve all meetings
    * Update a meeting

## Example Usage

This workflow allows you to create a meeting in Zoom. You can also find the [workflow](https://n8n.io/workflows/453) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Zoom]()

The final workflow should look like the following image.

![A workflow with the Zoom node](/_images/integrations/builtin/app-nodes/zoom/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zoom node

1. First of all, you'll have to enter credentials for the Zoom node. You can find out how to do that [here](/integrations/builtin/credentials/zoom/).
2. Enter the topic of the meeting in the *Topic* field.
3. Click on *Execute Node* to run the workflow.

