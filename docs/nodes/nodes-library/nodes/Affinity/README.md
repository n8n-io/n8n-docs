---
description: Learn how to use the Affinity node in n8n
---

# Affinity

[Affinity](https://www.affinity.co/) is a powerful relationship intelligence platform enabling teams to leverage their network to close the next big deal.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Affinity/README.md).
:::

## Basic Operations

::: details Organization
- Create an organization
- Delete an organization
- Get an organization
- Get all organizations
- Update an organization
:::

::: details Person
- Create a person
- Delete a person
- Get a person
- Get all persons
- Update a person
:::


## Example Usage

This workflow allows you to create an organization in Affinity. You can also find the [workflow](https://n8n.io/workflows/476) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Affinity]()

The final workflow should look like the following image.

![A workflow with the Affinity node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Affinity node

1. First of all, you'll have to enter credentials for the Affinity node. You can find out how to do that [here](../../../credentials/Affinity/README.md).
2. Enter the name of the organization in the *Name* field.
3. Enter the domain name of the organization in the *Domain* field.
4. Click on *Execute Node* to run the workflow.
