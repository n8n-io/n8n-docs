---
title: Paddle
description: Documentation for the Paddle node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Paddle

Use the Paddle node to automate work in Paddle, and integrate Paddle with other applications. n8n has built-in support for a wide range of Paddle features, including creating, updating, and getting coupons, as well as getting plans, products, and users. 

On this page, you'll find a list of operations the Paddle node supports and links to more resources.

/// note | Credentials
Refer to [Paddle credentials](/integrations/builtin/credentials/paddle/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Paddle integrations](https://n8n.io/integrations/paddle/){:target="_blank" .external-link} list.
///

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

This workflow allows you to create a coupon on Paddle. You can also find the [workflow](https://n8n.io/workflows/659) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Paddle]()

The final workflow should look like the following image.

![A workflow with the Paddle node](/_images/integrations/builtin/app-nodes/paddle/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Paddle node (create: coupon)

1. First of all, you'll have to enter credentials for the Paddle node. You can find out how to do that [here](/integrations/builtin/credentials/paddle/).
2. Enter the discount amount in the ***Discount Amount*** field.
3. Click on the ***Add Field*** button and select 'Coupon Code' from the dropdown list.
4. Enter the coupon code in the ***Coupon Code*** field.
5. Click on ***Test step*** to run the node.

![Using the Paddle node to create a coupon](/_images/integrations/builtin/app-nodes/paddle/paddle_node.png)

