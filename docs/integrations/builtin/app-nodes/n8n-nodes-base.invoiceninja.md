# Invoice Ninja

The Invoice Ninja node allows you to automate work in Invoice Ninja, and integrate Invoice Ninja with other applications. n8n has built-in support for a wide range of Invoice Ninja features, including creating, updating, deleting, and getting clients, sites and tickets. 

On this page, you'll find a list of operations the Invoice Ninja node supports and links to more resources.

!!! note "Credentials"
    Refer to [Invoice Ninja credentials](https://docs.n8n.io/integrations/builtin/credentials/invoiceninja/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Invoice Ninja integrations](https://n8n.io/integrations/invoice-ninja/){:target="_blank" .external-link


## Basic Operations

* Client
    * Create a new client
    * Delete a client
    * Get data of a client
    * Get data of all clients
* Expense
    * Create a new expense
    * Delete an expense
    * Get data of an expense
    * Get data of all expenses
* Invoice
    * Create a new invoice
    * Delete a invoice
    * Email an invoice
    * Get data of a invoice
    * Get data of all invoices
* Payment
    * Create a new payment
    * Delete a payment
    * Get data of a payment
    * Get data of all payments
* Quote
    * Create a new quote
    * Delete a quote
    * Email an quote
    * Get data of a quote
    * Get data of all quotes
* Task
    * Create a new task
    * Delete a task
    * Get data of a task
    * Get data of all tasks

## Example Usage

This workflow allows you to get multiple clients' data from Invoice Ninja. You can also find the [workflow](https://n8n.io/workflows/534) on this website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Invoice Ninja]()

The final workflow should look like the following image.

![A workflow with the Invoice Ninja node](/_images/integrations/builtin/app-nodes/invoiceninja/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Invoice Ninja node

1. First of all, you'll have to enter credentials for the Invoice Ninja node. You can find out how to do that [here](/integrations/builtin/credentials/invoiceninja/).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
