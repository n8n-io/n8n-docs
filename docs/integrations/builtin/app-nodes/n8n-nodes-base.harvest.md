---
title: Harvest
description: Documentation for the Harvest node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Harvest

The Harvest node allows you to automate work in Harvest, and integrate Harvest with other applications. n8n has built-in support for a wide range of Harvest features, including creating, updating, deleting, and getting clients, contacts, invoices, tasks, expenses, users, and projects. 

On this page, you'll find a list of operations the Harvest node supports and links to more resources.

!!! note "Credentials"
    Refer to [Harvest credentials](/integrations/builtin/credentials/harvest/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Harvest integrations](https://n8n.io/integrations/harvest/){:target="_blank" .external-link} list.


## Basic Operations

* Client
    * Create a client
    * Delete a client
    * Get data of a client
    * Get data of all clients
    * Update a client
* Company
    * Retrieves the company for the currently authenticated user
* Contact
    * Create a contact
    * Delete a contact
    * Get data of a contact
    * Get data of all contacts
    * Update a contact
* Estimate
    * Create an estimate
    * Delete an estimate
    * Get data of an estimate
    * Get data of all estimates
    * Update an estimate
* Expense
    * Get data of an expense
    * Get data of all expenses
    * Create an expense
    * Update an expense
    * Delete an expense
* Invoice
    * Get data of an invoice
    * Get data of all invoices
    * Create an invoice
    * Update an invoice
    * Delete an invoice
* Project
    * Create a project
    * Delete a project
    * Get data of a project
    * Get data of all projects
    * Update a project
* Task
    * Create a task
    * Delete a task
    * Get data of a task
    * Get data of all tasks
    * Update a task
* Time Entries
    * Create a time entry via duration
    * Create a time entry via start and end time
    * Delete a time entry
    * Delete a time entry's external reference.
    * Get data of a time entry
    * Get data of all time entries
    * Restart a time entry
    * Stop a time entry
    * Update a time entry
* User
    * Create a user
    * Delete a user
    * Get data of a user
    * Get data of all users
    * Get data of authenticated user
    * Update a user

## Example Usage

This workflow allows you to create a client in Harvest. You can also find the [workflow](https://n8n.io/workflows/494) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Harvest]()

The final workflow should look like the following image.

![A workflow with the Harvest node](/_images/integrations/builtin/app-nodes/harvest/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Harvest node

1. First of all, you'll have to enter credentials for the Harvest node. You can find out how to do that [here](/integrations/builtin/credentials/harvest/).
2. Select the 'Client' option from the *Resource* dropdown list.
3. Select the 'Create' option from the *Operation* dropdown list.
4. Enter the name of the client in the *Name* field.
5. Click on *Execute Node* to run the workflow.

