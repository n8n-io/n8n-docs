---
permalink: /nodes/n8n-nodes-base.xero
---

# Xero

Xero offers an online cloud-based SaaS accounting software platform for small and medium-sized businesses.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Xero/README.md).
:::

## Basic Operations

- Contact
    - Create a contact
    - Get a contact
    - Get all contacts
    - Update a contact
- Invoice
    - Create an invoice
    - Get an invoice
    - Get all invoices
    - Update an invoice

## Example Usage

This workflow allows you to get upto 100 invoices from Xero. You can also find the [workflow](https://n8n.io/workflows/543) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Xero]()

The final workflow should look like the following image.

![A workflow with the Xero node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Xero node

1. First of all, you'll have to enter credentials for the Xero node. You can find out how to do that [here](../../../credentials/Xero/README.md).
2. Select 'Get All' from the *Operation* dropdown list.
3. Select the organization for which you want to get the invoices from the *Organization ID* dropdown list.
4. Click on *Execute Node* to run the workflow.
