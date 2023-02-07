# Invoice Ninja

[Invoice Ninja](https://www.invoiceninja.com/) is a free "source available" online invoicing app for freelancers & businesses. It offers invoicing, payments, expense tracking, & time-tasks.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/invoiceNinja/).


## Basic Operations

* Client
    * Create a new client
    * Update an existing client
    * Delete a client
    * Perform actions on an client (ex. archive, restore)
    * Get data of a client
    * Get data of all clients
* Vendor
    * Create a new vendor
    * Update an existing vendor
    * Delete a vendor
    * Perform actions on an vendor (ex. archive, restore)
    * Get data of a vendor
    * Get data of all vendors
* Invoice
    * Create a new invoice
    * Update an existing invoice
    * Delete a invoice
    * Perform actions on an invoice (ex. email, archive, restore)
    * Get data of a invoice
    * Get data of all invoices
* Recurring Invoice
    * Create a new recurring invoice
    * Update an existing recurring invoice
    * Delete an recurring invoice
    * Perform actions on an recurring invoice (ex. email, archive, restore)
    * Get data of an recurring invoice
    * Get data of all recurring invoices
* Quote
    * Create a new quote
    * Update an existing quote
    * Delete a quote
    * Perform actions on a quote (ex. email, archive, restore)
    * Get data of a quote
    * Get data of all quotes
* Payment
    * Create a new payment
    * Update an existing payment
    * Delete a payment
    * Perform actions on a payment (ex. archive, restore)
    * Get data of a payment
    * Get data of all payments
* Expense
    * Create a new expense
    * Update an existing expense
    * Delete an expense
    * Perform actions on an expense (ex. archive, restore)
    * Get data of an expense
    * Get data of all expenses
* Recurring Expense
    * Create a new recurring expense
    * Update an existing recurring expense
    * Delete an recurring expense
    * Perform actions on an recurring expense (ex. archive, restore)
    * Get data of an recurring expense
    * Get data of all recurring expenses
* Project
    * Create a new project
    * Update an existing project
    * Delete a project
    * Perform actions on a project (ex. archive, restore)
    * Get data of a project
    * Get data of all projects
* Task
    * Create a new task
    * Update an existing task
    * Delete a task
    * Perform actions on a task (ex. archive, restore)
    * Get data of a task
    * Get data of all tasks
* Product
    * Create a new product
    * Update an existing product
    * Delete a product
    * Perform actions on a product (ex. archive, restore)
    * Get data of a product
    * Get data of all products
* Subscription
    * Create a new subscription
    * Update an existing subscription
    * Delete a subscription
    * Perform actions on a subscription (ex. archive, restore)
    * Get data of a subscription
    * Get data of all subscription
* Purchase Order
    * Create a new purchase order
    * Update an existing purchase order
    * Delete a purchase order
    * Perform actions on a purchase order (ex. archive, restore)
    * Get data of a purchase order
    * Get data of all purchase orders
* Bank Transaction
    * Create a new transaction
    * Update an existing transaction
    * Delete a transaction
    * Perform actions on a transaction (ex. archive, restore)
    * Get data of a transaction
    * Get data of all transactions
* Credit
    * Create a new credit
    * Update an existing credit
    * Delete a credit
    * Perform actions on a credit (ex. archive, restore)
    * Get data of a credit
    * Get data of all credits

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
