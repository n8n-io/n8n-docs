---
permalink: /nodes/n8n-nodes-base.mocean
---

# Mocean

[Mocean](https://www.moceanapi.com/) makes sending and receiving SMS easy. It also has voice API which allows you to make outbound and inbound calls.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Mocean/README.md).
:::

## Basic Operations

- SMS
    - Send an SMS
- Voice
    - Send a voice message


## Example Usage

This workflow allows you to send an SMS using the Mocean node. You can also find the [workflow](https://n8n.io/workflows/667) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Mocean]()

The final workflow should look like the following image.

![A workflow with the Mocean node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Mocean node

1. First of all, you'll have to enter credentials for the Mocean node. You can find out how to do that [here](../../../credentials/Mocean/README.md).
2. Enter the sender ID in the ***From*** field.
3. Enter the receivers' number in the ***To*** field.
4. Enter the message in the ***Message*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Mocean node to send an SMS](./Mocean_node.png)
