---
permalink: /nodes/n8n-nodes-base.zendesk
description: Learn how to use the Zendesk node in n8n
---

# Zendesk

[Zendesk](https://www.zendesk.com/) is a support ticketing system, designed to help track, prioritize, and solve customer support interactions. More than just a help desk, Zendesk Support helps nurture customer relationships with personalized, responsive support across any channel.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Zendesk/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.zendesk" />

## Example Usage

This workflow allows you to create a ticket in Zendesk. You can also find the [workflow](https://n8n.io/workflows/496) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Zendesk]()

The final workflow should look like the following image.

![A workflow with the Zendesk node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zendesk node

1. First of all, you'll have to enter credentials for the Zendesk node. You can find out how to do that [here](../../../credentials/Zendesk/README.md).
2. Enter the description of the ticket in the *Description* field.
3. Click on *Execute Node* to run the workflow.
