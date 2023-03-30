---
title: Drift
description: Documentation for the Drift node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Drift

The Drift node allows you to automate work in Drift, and integrate Drift with other applications. n8n has built-in support for a wide range of Drift features, including creating, updating, deleting, and getting contacts. 

On this page, you'll find a list of operations the Drift node supports and links to more resources.

!!! note "Credentials"
    Refer to [Drift credentials](/integrations/builtin/credentials/drift/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Drift integrations](https://n8n.io/integrations/drift/){:target="_blank" .external-link} list.


## Basic Operations

* Contact
    * Create a contact
    * Get custom attributes
    * Delete a contact
    * Get a contact
    * Update a contact

## Example Usage

This workflow allows you to create a contact in Drift. You can also find the [workflow](https://n8n.io/workflows/497) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Drift]()

The final workflow should look like the following image.

![A workflow with the Drift node](/_images/integrations/builtin/app-nodes/drift/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Drift node

1. First of all, you'll have to enter credentials for the Drift node. You can find out how to do that [here](/integrations/builtin/credentials/drift/).
2. Enter the email of the contact in the *Email* field.
3. Click on *Execute Node* to run the workflow.

