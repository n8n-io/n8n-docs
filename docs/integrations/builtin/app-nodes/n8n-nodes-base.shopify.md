# Shopify

The Shopify node allows you to automate work in Shopify, and integrate Shopify with other applications. n8n has built-in support for a wide range of Shopify features, including creating, updating, deleting, and getting order, and products. 

On this page, you'll find a list of operations the Shopify node supports and links to more resources.

!!! note "Credentials"
    Refer to [Shopify credentials](https://docs.n8n.io/integrations/builtin/credentials/shopify/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [HaloPSA integrations](https://n8n.io/integrations/shopify/){:target="_blank" .external-link} list.


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

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Shopify]()

The final workflow should look like the following image.

![A workflow with the Shopify node](/_images/integrations/builtin/app-nodes/shopify/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Shopify node

1. First of all, you'll have to enter credentials for the Shopify node. You can find out how to do that [here](/integrations/builtin/credentials/shopify/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
