# AMQP Trigger

[AMQP](https://www.amqp.org/) is an open standard application layer protocol for message-oriented middleware. The defining features of AMQP are message orientation, queuing, routing, reliability and security. This node supports AMQP 1.0 compatible message brokers.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/amqp/).



## Example Usage

This workflow allows you to receive messages for an [ActiveMQ](https://activemq.apache.org/) queue via AMQP Trigger. You can also find the [workflow](https://n8n.io/workflows/513) on the website. This example usage workflow would use the following node.

- [AMQP Trigger]()

The final workflow should look like the following image.

![A workflow with the AMQP Trigger node](/_images/integrations/builtin/trigger-nodes/amqptrigger/workflow.png)


### 1. AMQP Trigger node

1. First of all, you'll have to enter credentials for the AMQP Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/amqp/).
2. Enter the name of the queue or topic in the *Queue / Topic* field.
3. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the AMQP Trigger node.





