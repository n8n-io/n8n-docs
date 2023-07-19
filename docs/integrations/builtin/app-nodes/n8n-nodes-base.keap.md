---
title: Keap
description: Documentation for the Keap node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Keap

The Keap node allows you to automate work in Keap, and integrate Keap with other applications. n8n has built-in support for a wide range of Keap features, including creating, updating, deleting, and getting companies, products, ecommerce orders, emails, and files. 

On this page, you'll find a list of operations the Keap node supports and links to more resources.

!!! note "Credentials"
    Refer to [Keap credentials](/integrations/builtin/credentials/keap/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Keap integrations](https://n8n.io/integrations/keap/){:target="_blank" .external-link} list.



## Basic Operations

* Company
    * Create a company
    * Retrieve all companies
* Contact
    * Create/update a contact
    * Delete an contact
    * Retrieve an contact
    * Retrieve all contacts
* Contact Note
    * Create a note
    * Delete a note
    * Get a notes
    * Retrieve all notes
    * Update a note
* Contact Tag
    * Add a list of tags to a contact
    * Delete a contact's tag
    * Retrieve all contact's tags
* Ecommerce Order
    * Create an ecommerce order
    * Get an ecommerce order
    * Delete an ecommerce order
    * Retrieve all ecommerce orders
* Ecommerce Product
    * Create an ecommerce product
    * Delete an ecommerce product
    * Get an ecommerce product
    * Retrieve all ecommerce product
* Email
    * Create a record of an email sent to a contact
    * Retrieve all sent emails
    * Send Email
* File
    * Delete a file
    * Retrieve all files
    * Upload a file

## Example Usage

This workflow allows you to get all contacts from Keap. You can also find the [workflow](https://n8n.io/workflows/553) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Keap]()

The final workflow should look like the following image.

![A workflow with the Keap node](/_images/integrations/builtin/app-nodes/keap/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Keap node

1. First of all, you'll have to enter credentials for the Keap node. You can find out how to do that [here](/integrations/builtin/credentials/keap/).
2. Select the 'Contact' option from the *Resource* dropdown list.
3. Select the 'Get All' option from the *Operation* dropdown list.
4. Click on *Execute Node* to run the workflow.

