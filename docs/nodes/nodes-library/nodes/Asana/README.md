---
permalink: /nodes/n8n-nodes-base.asana
description: Learn how to use the Asana node in n8n
---

# Asana

[Asana](https://asana.com/) is a web and mobile application designed to help teams organize, track, and manage their work.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Asana/README.md).
:::

## Basic Operations

<Resource node="Asana" />

## Example Usage

This workflow allows you to create a new task in Asana. You can also find the [workflow](https://n8n.io/workflows/478) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Asana]()

The final workflow should look like the following image.

![A workflow with the Asana node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Asana node

1. First of all, you'll have to enter credentials for the Asana node. You can find out how to do that [here](../../../credentials/Asana/README.md).
2. Select your workspace from the *Workspace* dropdown list.
3. Enter the name of the task in the *Name* field.
4. Click on *Execute Node* to run the workflow.
