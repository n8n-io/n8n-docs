---
permalink: /nodes/n8n-nodes-base.signl4
---

# Derdack SIGNL4

[SIGNL4](https://www.signl4.com/) is a plug-and-play cloud solution produced by [Derdack](https://www.derdack.com/). It automatically notifies teams on their mobile devices in case of critical events.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/SIGNL4/README.md).
:::

## Basic Operations

- Alert
    - Send an alert

## Example Usage

This workflow allows you to send an alert on SIGNL4. You can also find the [workflow](https://n8n.io/workflows/441) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [SIGNL4]()

The final workflow should look like the following image.

![A workflow with the SIGNL4 node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. SIGNL4 node

1. First of all, you'll have to enter credentials for the PagerDuty node. You can find out how to do that [here](../../../credentials/SIGNL4/README.md).
2. Select 'Alert' as the *Resource*.
3. Select 'Send' as the *Operation*.
4. Enter a message in the message field.
5. Click on *Execute Node* to run the workflow.