---
permalink: /nodes/n8n-nodes-base.vero
description: Learn how to use the Vero node in n8n
---

# Vero

[Vero](https://www.getvero.com/) is a messaging platform that helps manage real-time data to create a better customer experience.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Vero/README.md).
:::

## Basic Operations

::: details User
- Create or update a user profile
- Change a users identifier
- Unsubscribe a user
- Resubscribe a user
- Delete a user
- Add a tag to a users profile
- Remove a tag from a users profile
:::

::: details Track
- Track an event for a specific customer
:::


## Example Usage

This workflow allows you to create a user profile in Vero. You can also find the [workflow](https://n8n.io/workflows/499) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Vero]()

The final workflow should look like the following image.

![A workflow with the Vero node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Vero node

1. First of all, you'll have to enter credentials for the Vero node. You can find out how to do that [here](../../../credentials/Vero/README.md).
2. Enter the unique identifier of the user in the *ID* field.
3. Click on *Execute Node* to run the workflow.
