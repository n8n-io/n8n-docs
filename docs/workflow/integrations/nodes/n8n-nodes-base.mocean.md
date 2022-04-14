# Mocean

[Mocean](https://www.moceanapi.com/) makes sending and receiving SMS easy. It also has voice API which allows you to make outbound and inbound calls.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/mocean/).


## Basic Operations

* SMS
    * Send SMS/Voice message
* Voice
    * Send SMS/Voice message


## Example Usage

This workflow allows you to send an SMS using the Mocean node. You can also find the [workflow](https://n8n.io/workflows/667) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Mocean]()

The final workflow should look like the following image.

![A workflow with the Mocean node](/_images/integrations/nodes/mocean/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Mocean node

1. First of all, you'll have to enter credentials for the Mocean node. You can find out how to do that [here](/integrations/credentials/mocean/).
2. Enter the sender ID in the ***From*** field.
3. Enter the receivers' number in the ***To*** field.
4. Enter the message in the ***Message*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Mocean node to send an SMS](/_images/integrations/nodes/mocean/mocean_node.png)
