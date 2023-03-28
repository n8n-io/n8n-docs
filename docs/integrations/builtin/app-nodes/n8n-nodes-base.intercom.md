---
title: Intercom node - n8n Documentation
description: Documentation for the Intercom node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Intercom

The Intercom node allows you to automate work in Intercom, and integrate Intercom with other applications. n8n has built-in support for a wide range of Intercom features, including creating, updating, deleting, and getting companies, leads, and users. 

On this page, you'll find a list of operations the Intercom node supports and links to more resources.

!!! note "Credentials"
    Refer to [Intercom credentials](/integrations/builtin/credentials/intercom/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Intercom integrations](https://n8n.io/integrations/intercom/){:target="_blank" .external-link} list.


## Basic Operations

* Company
    * Create a new company
    * Get data of a company
    * Get data of all companies
    * Update a company
    * List company's users
* Lead
    * Create a new lead
    * Delete a lead
    * Get data of a lead
    * Get data of all leads
    * Update new lead
* User
    * Create a new user
    * Delete a user
    * Get data of a user
    * Get data of all users
    * Update a user

## Example Usage

This workflow allows you to create a new user in Intercom. You can also find the [workflow](https://n8n.io/workflows/464) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Intercom]()

The final workflow should look like the following image.

![A workflow with the Intercom node](/_images/integrations/builtin/app-nodes/intercom/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Intercom node

1. First of all, you'll have to enter credentials for the Intercom node. You can find out how to do that [here](/integrations/builtin/credentials/intercom/).
2. Select 'Email' from the dropdown list for the *Identifier Type* field.
3. Enter the email in the *Value* field.
4. Click on *Execute Node* to run the workflow.

