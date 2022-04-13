# Philips Hue

[Philips Hue](https://www.philips-hue.com/) is a line of smart color-changing LED lamps and bulbs that can be controlled wirelessly.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/philipsHue/).


## Basic Operations

* Light
    * Delete a light
    * Retrieve a light
    * Retrieve all lights
    * Update a light


## Example Usage

This workflow allows you to turn on a light and set its brightness using the Philips Hue node. You can also find the [workflow](https://n8n.io/workflows/666) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Philips Hue]()

The final workflow should look like the following image.

![A workflow with the Philips Hue node](/_images/integrations/nodes/philipshue/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Philips Hue node (update: light)

1. First of all, you'll have to enter credentials for the Philips Hue node. You can find out how to do that [here](/integrations/credentials/philipsHue/).
2. Enter the light id in the ***Light ID*** field.
3. Click on ***Add Field*** and select 'Brightness' from the dropdown list.
4. Enter a value between 1 and 254 for the brightness in the ***Brightness*** field.
5. Click on ***Execute Node*** to run the node.
