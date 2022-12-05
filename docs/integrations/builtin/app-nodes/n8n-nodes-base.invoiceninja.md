# Invoice Ninja

[Invoice Ninja](https://www.invoiceninja.com/) is a free open-source online invoicing app for freelancers & businesses. It offers invoicing, payments, expense tracking, & time-tasks.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/invoiceNinja/).


## Basic Operations

* Client
    * Create a new client
    * Update an existing client
    * Delete a client
    * Get data of a client
    * Get data of all clients
* Invoice
    * Create a new invoice
    * Update an existing invoice
    * Delete a invoice
    * Email an invoice
    * Get data of a invoice
    * Get data of all invoices
* Quote
    * Create a new quote
    * Update an existing quote
    * Delete a quote
    * Email an quote
    * Get data of a quote
    * Get data of all quotes
* Payment
    * Create a new payment
    * Update an existing payment
    * Delete a payment
    * Get data of a payment
    * Get data of all payments
* Expense
    * Create a new expense
    * Update an existing expense
    * Delete an expense
    * Get data of an expense
    * Get data of all expenses
* Task
    * Create a new task
    * Update an existing task
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

1. First of all, you'll have to enter credentials for the Invoice Ninja node. You can find out how to do that [here](/integrations/builtin/credentials/invoiceNinja/).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
