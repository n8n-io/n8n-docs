---
title: Xero
description: Documentation for the Xero node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Xero

The Xero node allows you to automate work in Xero, and integrate Xero with other applications. n8n has built-in support for a wide range of Xero features, including creating, updating, and getting contacts and invoices. 

On this page, you'll find a list of operations the Xero node supports and links to more resources.

!!! note "Credentials"
    Refer to [Xero credentials](/integrations/builtin/credentials/xero/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Xero integrations](https://n8n.io/integrations/xero/){:target="_blank" .external-link} list.


## Basic Operations

* Contact
    * Create a contact
    * Get a contact
    * Get all contacts
    * Update a contact
* Invoice
    * Create a invoice
    * Get a invoice
    * Get all invoices
    * Update a invoice

## Example Usage

This workflow allows you to get upto 100 invoices from Xero. You can also find the [workflow](https://n8n.io/workflows/543) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Xero]()

The final workflow should look like the following image.

![A workflow with the Xero node](/_images/integrations/builtin/app-nodes/xero/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Xero node

1. First of all, you'll have to enter credentials for the Xero node. You can find out how to do that [here](/integrations/builtin/credentials/xero/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Select the organization for which you want to get the invoices from the *Organization ID* dropdown list.
4. Click on *Execute Node* to run the workflow.

