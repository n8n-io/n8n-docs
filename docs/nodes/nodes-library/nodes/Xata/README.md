---
permalink: /nodes/n8n-nodes-base.xata
description: Learn how to use the Xata node in n8n
---

# Xata

[Xata](https://xata.io/) is a serverless database.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Xata/README.md).
:::

## Basic Operations

1. Append records to a table.
2. Delete records from a table.
3. List records from a table.
4. Read records from a table.
5. Update records in a table.

## Example Usage

This workflow allows you to list records from a table in Xata.
- [Start](../../core-nodes/Start/README.md)
- [Xata]()

The final workflow should look like the following image.

![A workflow with the Xata node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Xata node (List: Get)

1. First of all, you'll have to enter credentials for the Xata node. You can find out how to do that [here](../../../credentials/xata/README.md).
2. Enter the Slug of your workspace in the ***Workspace Slug*** field.
3. Enter the name of the database you want to access in the ***Database Name*** field.
4. Enter the name of the branch you want to access in the ***Branch Name*** field.
5. Enter the name of the table you want to access in the ***Table Name*** field.
6. Click on ***Execute Node*** to run the workflow.








