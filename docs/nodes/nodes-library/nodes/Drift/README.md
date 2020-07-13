---
permalink: /nodes/n8n-nodes-base.drift
---

# Drift

[Drift](https://www.drift.com/) is a tool for managing conversations, engaging with customers, and collaborating with teammates.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Drift/README.md).
:::

## Basic Operations

- Contact
    - Create a contact
    - Get custom attributes
    - Delete a contact
    - Get a contact
    - Update a contact


## Example Usage

This workflow allows you to create a contact in Drift. You can also find the [workflow](https://n8n.io/workflows/497) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Drift]()

The final workflow should look like the following image.

![A workflow with the Drift node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Drift node

1. First of all, you'll have to enter credentials for the Drift node. You can find out how to do that [here](../../../credentials/Drift/README.md).
2. Enter the email of the contact in the *Email* field.
3. Click on *Execute Node* to run the workflow.
