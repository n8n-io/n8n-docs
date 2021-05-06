---
permalink: /nodes/n8n-nodes-base.bitly
description: Learn how to use the Bitly node in n8n
---

# Bitly

[Bitly](https://bitly.com/) is URL shortening service and a link management platform that allows users to shorten, create and share trusted, powerful links for businesses.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Bitly/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.bitly" />

## Example Usage

This workflow shows you how to create a new link. You can also find the [workflow](https://n8n.io/workflows/442) on the website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Bitly]()

The final workflow should look like the following image.

![A workflow with the Bitly node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bitly node

1. First of all, you'll have to enter credentials for the Twilio node. You can find out how to do that [here](../../../credentials/Bitly/README.md).
2. Enter the URL in the *Long URL* field.
3. Click on *Execute Node* to run the workflow.
