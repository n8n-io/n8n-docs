# Paddle

[Paddle](https://www.paddle.com/) is an all-in-one SaaS Commerce platform for software and SaaS companies to run and grow their business.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/paddle/).


## Basic Operations

* Coupon
    * Create a coupon.
    * Get all coupons.
    * Update a coupon.
* Payment
    * Get all payment.
    * Reschedule payment.
* Plan
    * Get a plan.
    * Get all plans.
* Product
    * Get all products.
* User
    * Get all users


## Example Usage

This workflow allows you to create a coupon on Paddle. You can also find the [workflow](https://n8n.io/workflows/659) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Paddle]()

The final workflow should look like the following image.

![A workflow with the Paddle node](/_images/integrations/nodes/paddle/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Paddle node (create: coupon)

1. First of all, you'll have to enter credentials for the Paddle node. You can find out how to do that [here](/workflow/integrations/credentials/paddle/).
2. Enter the discount amount in the ***Discount Amount*** field.
3. Click on the ***Add Field*** button and select 'Coupon Code' from the dropdown list.
4. Enter the coupon code in the ***Coupon Code*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Paddle node to create a coupon](/_images/integrations/nodes/paddle/paddle_node.png)
