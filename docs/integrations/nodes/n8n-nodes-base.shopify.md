# Shopify

[Shopify](https://www.shopify.com/) is an e-commerce platform that allows users to set up an online store and sell their products.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/shopify/).


## Basic Operations

* Order
    * Create an order
    * Delete an order
    * Get an order
    * Get all orders
    * Update an order
* Product
    * Create a product
    * Delete a product
    * Get a product
    * Get all products
    * Update a product

## Example Usage

This workflow allows you to get all orders from Shopify. You can also find the [workflow](https://n8n.io/workflows/548) on the website. This example usage workflow uses the following two nodes.

- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Shopify]()

The final workflow should look like the following image.

![A workflow with the Shopify node](/_images/integrations/nodes/shopify/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Shopify node

1. First of all, you'll have to enter credentials for the Shopify node. You can find out how to do that [here](/integrations/credentials/shopify/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
