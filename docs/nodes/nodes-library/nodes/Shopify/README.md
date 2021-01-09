---
description: Learn how to use the Shopify node in n8n
---

# Shopify

[Shopify](https://www.shopify.com/) is an e-commerce platform that allows users to set up an online store and sell their products.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Shopify/README.md).
:::

## Basic Operations

::: details Order
- Create an order
- Delete an order
- Get an order
- Get all orders
- Update an order
:::

## Example Usage

This workflow allows you to get all orders from Shopify. You can also find the [workflow](https://n8n.io/workflows/548) on the website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start/README.md)
- [Shopify]()

The final workflow should look like the following image.

![A workflow with the Shopify node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Shopify node

1. First of all, you'll have to enter credentials for the Shopify node. You can find out how to do that [here](../../../credentials/Shopify/README.md).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
