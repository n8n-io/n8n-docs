---
permalink: /nodes/n8n-nodes-base.customerIo
---

# Customer.io

[Customer.io](https://customer.io/) enables users to send newsletters to selected segments of customers using their website data. You can send targeted emails, push notifications, and SMS to lower churn, create stronger relationships, and drive subscriptions.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/CustomerIo/README.md).
:::	

## Basic Operations

- Customer
    - Create/Update a customer
    - Delete a customer
- Event
    - Track a customer event
    - Track an anonymous event
- Campaign
    - Get a campaign
    - Get all campaigns
    - Get metrics
- Segment
    - Add a customer
    - Remove a customer


## Example Usage

This workflow allows you to update a customer's information and add them to the segment in Customer.io. You can also find the [workflow](https://n8n.io/workflows/646) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Customer.io]()

The final workflow should look like the following image.

![A workflow with the Customer.io node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CustomerIo node (upsert: customer)

1. First of all, you'll have to enter credentials for the Customer.io node. You can find out how to do that [here](../../../credentials/CustomerIo/README.md).
2. Enter the customer id in the ***ID*** field.
4. Click on the ***Node*** tab and toggle ***Always Output Data*** to true.
5. Select 'Custom Properties' from the ***Add Field*** dropdown list.
6. Click on the ***Choose Option to Add***.
7. Enter `name` in the ***Key*** field.
8. Enter the name of the customer in the ***Value*** field.
9. Click on ***Execute Node*** to run the node.

![Using the Customer.io node to update a customer's information](./CustomerIo_node.png)

### 3. CustomerIo node (add: segment)

1. Select the credentials that you entered in the previous Customer.io node.
2. Select 'Segment' from the ***Resource*** field.
3. Enter the customer id in the ***Customer IDs*** field.
4. Click on ***Execute Node*** to run the node.

![Using the Customer.io node to add the customer to a segment](./CustomerIo1_node.png)
