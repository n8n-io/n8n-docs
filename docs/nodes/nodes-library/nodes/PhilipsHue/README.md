---
permalink: /nodes/n8n-nodes-base.philipsHue
description: Learn how to use the Philips Hue node in n8n
---

# Philips Hue

[Philips Hue](https://www.philips-hue.com/) is a line of smart color-changing LED lamps and bulbs that can be controlled wirelessly.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/PhilipsHue/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.philipsHue" />


## Example Usage

This workflow allows you to turn on a light and set its brightness using the Philips Hue node. You can also find the [workflow](https://n8n.io/workflows/666) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Philips Hue]()

The final workflow should look like the following image.

![A workflow with the Philips Hue node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Philips Hue node (update: light)

1. First of all, you'll have to enter credentials for the Philips Hue node. You can find out how to do that [here](../../../credentials/PhilipsHue/README.md).
2. Enter the light id in the ***Light ID*** field.
3. Click on ***Add Field*** and select 'Brightness' from the dropdown list.
4. Enter a value between 1 and 254 for the brightness in the ***Brightness*** field.
5. Click on ***Execute Node*** to run the node.
