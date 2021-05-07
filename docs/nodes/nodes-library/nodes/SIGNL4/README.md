---
permalink: /nodes/n8n-nodes-base.signl4
description: Learn how to use the SIGNL4 node in n8n
---

# SIGNL4

[SIGNL4](https://www.signl4.com/) is a plug-and-play cloud solution produced by Derdack. It automatically notifies teams on their mobile devices in case of critical events.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/SIGNL4/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.signl4" />

## Example Usage

This workflow allows you to send an alert on SIGNL4. You can also find the [workflow](https://n8n.io/workflows/441) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [SIGNL4]()

The final workflow should look like the following image.

![A workflow with the SIGNL4 node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. SIGNL4 node

1. First of all, you'll have to enter credentials for the SIGNL4 node. You can find out how to do that [here](../../../credentials/SIGNL4/README.md).
2. Enter a message in the *Message* field.
3. Click on the *Add Field* button and select 'Title'.
4. Enter a title in the *Title* field.
5. Click on *Execute Node* to run the workflow.
