# Xero

Xero offers an online cloud-based SaaS accounting software platform for small and medium-sized businesses.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/xero/).


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
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Xero]()

The final workflow should look like the following image.

![A workflow with the Xero node](/_images/integrations/nodes/xero/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Xero node

1. First of all, you'll have to enter credentials for the Xero node. You can find out how to do that [here](/integrations/credentials/xero/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Select the organization for which you want to get the invoices from the *Organization ID* dropdown list.
4. Click on *Execute Node* to run the workflow.
