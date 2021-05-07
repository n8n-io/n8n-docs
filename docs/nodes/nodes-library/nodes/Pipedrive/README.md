---
permalink: /nodes/n8n-nodes-base.pipedrive
description: Learn how to use the Pipedrive node in n8n
---

# Pipedrive

[Pipedrive](https://www.pipedrive.com/) is a cloud-based sales software company that aims to improve the productivity of businesses through the use of their software.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Pipedrive/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.pipedrive" />

## Example Usage

This workflow allows you to create an deal in Pipedrive. You can also find the [workflow](https://n8n.io/workflows/489) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Pipedrive]()

The final workflow should look like the following image.

![A workflow with the Pipedrive node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Pipedrive node

1. First of all, you'll have to enter credentials for the Pipedrive node. You can find out how to do that [here](../../../credentials/Pipedrive/README.md).
2. Enter the title of the deal in the *Title* field.
3. Click on *Execute Node* to run the workflow.
