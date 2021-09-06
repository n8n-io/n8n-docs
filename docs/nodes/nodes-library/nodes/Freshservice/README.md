---
permalink: /nodes/n8n-nodes-base.freshservice
description: Learn how to use the Freshservice node in n8n
---

# Freshservice

[Freshservice](https://www.freshservice.com/) is a cloud-based IT Service Management solution.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/freshservice/README.md).
:::

## Basic operations

<Resource node="n8n-nodes-base.freshservice" />

## Example usage

This workflow allows you to fetch all Tickets with an Urgent status in Freshservice. This example usage workflow would use the following two nodes:
- [Start](../../core-nodes/Start/README.md)
- [Freshservice]()

The final workflow should look like the following image.

![A workflow with the Freshservice node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshservice node

1. First enter your credentials for the Freshservice node. You can find out how to do that [here](../../../credentials/freshservice/README.md).
2. Select **Ticket** from the *Resource* dropdown.
3. Select **Get All** from the *Operation* dropdown.
4. Enable the **Return All** toggle.
5. From the *Add Filter* dropdown select **Priority**.
6. From the new *Priority* dropdown select **Urgent**.
5. Click on **Execute Node** to run the workflow.
