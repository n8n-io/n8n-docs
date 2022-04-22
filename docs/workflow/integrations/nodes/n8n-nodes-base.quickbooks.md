# QuickBooks

[QuickBooks](https://quickbooks.intuit.com) is an accounting software package developed by Intuit.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/quickbooks/).


## Basic Operations

* Bill
    * Create
    * Delete
    * Get
    * Get All
    * Update
* Customer
    * Create
    * Get
    * Get All
    * Update
* Employee
    * Create
    * Get
    * Get All
    * Update
* Estimate
    * Create
    * Delete
    * Get
    * Get All
    * Send
    * Update
* Invoice
    * Create
    * Delete
    * Get
    * Get All
    * Send
    * Update
    * Void
* Item
    * Get
    * Get All
* Payment
    * Create
    * Delete
    * Get
    * Get All
    * Send
    * Update
    * Void
* Purchase
    * Get
    * Get All
* Transaction
    * Get Report
* Vendor
    * Create
    * Get
    * Get All
    * Update

## Example Usage

This workflow allows you to create a customer and an invoice, and send the invoice to the customer. You can also find the [workflow](https://n8n.io/workflows/949) on Workflow².io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [QuickBooks]()

The final workflow should look like the following image.

![A workflow with the QuickBooks node](/_images/integrations/nodes/quickbooks/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. QuickBooks node (create:customer)

This node will create a new customer in QuickBooks.

1. First of all, you'll have to enter credentials for the QuickBooks node. You can find out how to do that [here](/workflow/integrations/credentials/quickbooks/).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Enter a display name in the ***Display Name*** field.
4. Click on the ***Add Field*** button and select 'Primary Email Address'.
5. Enter the email address of the customer in the ***Primary Email Address*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new customer.

![Using the QuickBooks node to create a new customer](/_images/integrations/nodes/quickbooks/quickbooks_node.png)

### 3. QuickBooks1 node (create:invoice)

This node will create an invoice for the customer that we created in the previous node.


1. Select the credentials that you entered in the previous node.
2. Select 'Invoice' from the ***Resource*** dropdown list.
3. Select 'Create' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***For Customer*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > Id. You can also add the following expression: `{{$json["Id"]}}`.
6. Click on the ***Add Item*** button.
7. Select 'Item' from the ***Add Line Item Property*** dropdown list.
8. Select an item from the ***Item*** dropdown list.
9. Select 'Amount' from the ***Add Line Item Property*** dropdown list.
10. Enter an amount in the ***Amount*** field.
11. Select 'Detail Type' from the ***Add Line Item Property*** dropdown list.
12. Select a type from the ***Detail Type*** dropdown list.
13. Select 'Description' from the ***Add Line Item Property*** dropdown list.
14. Enter a description in the ***Description*** field.
15. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates an invoice for the customer that we created in the previous node.

![Using the QuickBooks node to create a new invoice](/_images/integrations/nodes/quickbooks/quickbooks1_node.png)

### 4. QuickBooks2 node (send:invoice)

This node will send the invoice that we created in the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'Invoice' from the ***Resource*** dropdown list.
3. Select 'Send' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Invoice ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > Id. You can also add the following expression: `{{$json["Id"]}}`.
6. Enter the email address of the customer in the ***Email*** field.
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends the invoice to the customer.

![Using the QuickBooks node to send an invoice to a customer](/_images/integrations/nodes/quickbooks/quickbooks2_node.png)
