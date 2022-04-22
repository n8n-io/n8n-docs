---
title: Unleashed Software
description: Use Unleashed Software with Workflow²
tags:
  - Workflow²
  - Unleashed Software
---
# Unleashed Software

[Unleashed Software](https://www.unleashedsoftware.com) is a cloud app that gives product businesses the freedom to better make, manage and move products by enabling them to achieve complete clarity and control over suppliers, production, warehouses, and sales.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/unleashedSoftware/).


## Basic Operations

* Sales Order
    * Get all sales orders
* Stock On Hand
    * Get a stock on hand
    * Get all stocks on hand

## Example Usage

This workflow allows you to get a list of all the orders from Unleashed Software based on the order status. You can also find the [workflow](https://n8n.io/workflows/641) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Unleashed Software]()

The final workflow should look like the following image.

![A workflow with the Unleashed Software node](/_images/integrations/nodes/unleashedsoftware/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Unleashed Software node

1. First of all, you'll have to enter credentials for the Unleashed Software node. You can find out how to do that [here](/workflow/integrations/credentials/unleashedSoftware/).
2. Toggle ***Return All*** to true.
3. Click on the ***Add Filter*** button and select 'Order Status' from the dropdown list.
4. Select 'Completed' from the ***Order Status*** dropdown list.
5. Click on ***Execute Node*** to run the node.

![Using the Unleashed Software node to get the list of completed sales order](/_images/integrations/nodes/unleashedsoftware/unleashedsoftware_node.png)
