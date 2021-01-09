---
description: Learn how to use the ActiveCampaign node in n8n
---

# ActiveCampaign

[ActiveCampaign](https://www.activecampaign.com/) is a cloud software platform for small-to-mid-sized business. The company offers software for customer experience automation, which combines the email marketing, marketing automation, sales automation, and CRM categories.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ActiveCampaign/README.md).
:::

## Basic Operations

::: details Contact
- Create a contact
- Delete a contact
- Get data of a contact
- Get data of all contacts
- Update a contact
:::

::: details Deal
- Create a deal
- Delete a deal
- Get data of a deal
- Get data of all deals
- Update a deal
:::

::: details Connection
- Create a connection
- Delete a connection
- Get data of a connection
- Get data of all connections
- Update a connection
:::

::: details E-commerce Order
- Create an order
- Delete an order
- Get data of an order
- Get data of all orders
- Update an order
:::

::: details E-commerce Customer
- Create an e-commerce customer
- Delete an e-commerce customer
- Get data of an e-commerce customer
- Get data of all e-commerce customers
- Update an e-commerce customer
:::

::: details E-commerce Order Products
- Get data of all order products
- Get data of an ordered product
- Get data of an order's product
:::


## Example Usage

This workflow allows you to create a contact in ActiveCampaign. You can also find the [workflow](https://n8n.io/workflows/412) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [ActiveCampaign]()

The final workflow should look like the following image.

![A workflow with the ActiveCampaign node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ActiveCampaign node

1. First of all, you'll have to enter credentials for the ActiveCampaign node. You can find out how to do that [here](../../../credentials/ActiveCampaign/README.md).
2. Enter the email of the contact in the *Email* field.
3. Toggle the *Update if exists* option to yes.
4. Under the *Additional Fields* section, click on the *Add Field* button and select *First Name*.
5. Enter the first name of the contact in the *First Name* field.
6. Click on *Add Field* again and select *Last Name*.
7. Enter the last name of the contact in the *Last name* field.
8. Click on *Execute Node* to run the workflow.
