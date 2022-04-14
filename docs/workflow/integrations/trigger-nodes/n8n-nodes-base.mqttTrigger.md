# MQTT Trigger

[MQTT](https://mqtt.org) is an open OASIS and ISO standard lightweight, publish-subscribe network protocol that transports messages between devices.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/mqtt/).



## Example Usage

This workflow allows you to receive messages from a queue using the MQTT Trigger node. You can also find the [workflow](https://n8n.io/workflows/657) on the website. This example usage workflow would use the following node.
- [MQTT Trigger]()

The final workflow should look like the following image.

![A workflow with the MQTT Trigger node](/_images/integrations/trigger-nodes/mqtttrigger/workflow.png)


### 1. MQTT Trigger node

1. First of all, you'll have to enter credentials for the MQTT Trigger node. You can find out how to do that [here](/integrations/credentials/mqtt/).
2. Enter the name of the topic in the ***Topics*** field.
3. Click on ***Execute Node*** to run the workflow.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the MQTT Trigger node.

