---
title: Unleashed Software
description: Documentation for the Unleashed Software node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Unleashed Software

The Unleashed Software node allows you to automate work in Unleashed Software, and integrate Unleashed Software with other applications. n8n has built-in support for a wide range of Unleashed Software features, including getting sales orders and stock on hand. 

On this page, you'll find a list of operations the Unleashed Software node supports and links to more resources.

!!! note "Credentials"
    Refer to [Unleashed Software credentials](/integrations/builtin/credentials/unleashedsoftware/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Unleashed Software integrations](https://n8n.io/integrations/unleashed-software/){:target="_blank" .external-link} list.


## Basic Operations

* Sales Order
    * Get all sales orders
* Stock On Hand
    * Get a stock on hand
    * Get all stocks on hand

## Example Usage

This workflow allows you to get a list of all the orders from Unleashed Software based on the order status. You can also find the [workflow](https://n8n.io/workflows/641) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Unleashed Software]()

The final workflow should look like the following image.

![A workflow with the Unleashed Software node](/_images/integrations/builtin/app-nodes/unleashedsoftware/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Unleashed Software node

1. First of all, you'll have to enter credentials for the Unleashed Software node. You can find out how to do that [here](/integrations/builtin/credentials/unleashedsoftware/).
2. Toggle ***Return All*** to true.
3. Click on the ***Add Filter*** button and select 'Order Status' from the dropdown list.
4. Select 'Completed' from the ***Order Status*** dropdown list.
5. Click on ***Execute Node*** to run the node.

![Using the Unleashed Software node to get the list of completed sales order](/_images/integrations/builtin/app-nodes/unleashedsoftware/unleashedsoftware_node.png)

