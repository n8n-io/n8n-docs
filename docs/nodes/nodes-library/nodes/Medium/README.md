---
permalink: /nodes/n8n-nodes-base.medium
---

# Mautic

[Medium](https://www.medium.com/) is an online publishing platform.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Medium/README.md).
:::

## Basic Operations

- Publication
	- Get all publications
- Post
	- Create a post

## Example Usage

This workflow allows you to get all publications from Medium. You can also find the [workflow](https://n8n.io/workflows/593) on the website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start/README.md)
- [Medium]()

The final workflow should look like the following image.

![A workflow with the Mautic node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Medium node

1. First of all, you'll have to enter credentials for the Medium node. You can find out how to do that [here](../../../credentials/Medium/README.md).
2. Click on *Execute Node* to run the workflow.
