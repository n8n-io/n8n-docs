---
permalink: /nodes/n8n-nodes-base.nocoDb
description: Learn how to use the NocoDB node in n8n
---

# NocoDB

[NocoDB](https://www.nocodb.com/) is an open source Airtable alternative. It works by connecting to any relational database and transforming them into a spreadsheet interface.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/NocoDb/README.md).
:::

## Basic operations

<Resource node="n8n-nodes-base.nocoDb" />

## Example usage

This workflow allows you to create a new row in your table. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [NocoDB]()

The final workflow should look like the following image.

![A workflow with the NocoDB node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. NocoDB node

1. First enter your credentials for the NocoDB node. You can find out how to do that [here](../../../credentials/NocoDb/README.md).
2. Enter the name of the city in the *City* field.
3. Click on *Execute Node* to run the workflow.