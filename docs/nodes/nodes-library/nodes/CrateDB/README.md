---
permalink: /nodes/n8n-nodes-base.crateDb
---

# CrateDB

[CrateDB](https://crate.io/) is an open-source distributed SQL database management system that integrates a fully searchable document-oriented data store based on a shared-nothing architecture, and is designed for high scalability.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/CrateDB/README.md).
:::

## Basic Operations

- Execute an SQL query
- Insert rows in database
- Update rows in database


## Example Usage

This workflow allows you to execute an SQL query in CrateDB. You can also find the [workflow](https://n8n.io/workflows/568) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [CrateDB]()

The final workflow should look like the following image.

![A workflow with the CrateDB node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CrateDB node

1. First of all, you'll have to enter credentials for the CrateDB node. You can find out how to do that [here](../../../credentials/CrateDB/README.md).
2. Select 'Execute Query' from the *Operation* dropdown list.
3. Enter your SQL query in the *Query* field.
4. Click on *Execute Node* to run the workflow.
