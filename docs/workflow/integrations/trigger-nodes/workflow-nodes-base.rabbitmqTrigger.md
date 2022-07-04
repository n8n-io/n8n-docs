# RabbitMQ Trigger

[RabbitMQ](https://www.rabbitmq.com) is an open-source message broker that accepts and forwards messages.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/rabbitmq/).


## Example Usage

This workflow allows you to receive messages from a queue and send an SMS if the value of the temperature is greater than 50. You can also find the [workflow](https://n8n.io/workflows/845) on Workflow².io. This example usage workflow would use the following nodes.
- [RabbitMQ Trigger]()
- [IF](/workflow/integrations/core-nodes/workflow-nodes-base.if/)
- [Vonage](/workflow/integrations/nodes/workflow-nodes-base.vonage/)
- [No Operation, do nothing](/workflow/integrations/core-nodes/workflow-nodes-base.noOp/)

The final workflow should look like the following image.

![A workflow with the RabbitMQ Trigger node](/_images/integrations/trigger-nodes/rabbitmqtrigger/workflow.png)

### 1. RabbitMQ Trigger node

This node will trigger the workflow when a new message is sent to the queue `temp`. If you're using a different queue, use that instead. We are sending the message `{ "id": 1, "temp": 100 }` to `temp`.

1. First of all, you'll have to enter credentials for the RabbitMQ Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/rabbitmq/).
2. Enter the name of the queue or topic in the ***Queue / Topic*** field.
3. Click on ***Add Option*** and select 'JSON Parse Body'.
4. Toggle ***JSON Parse Body*** to `true`. By setting this value to true, the node returns the body as JSON instead of a string.
5. Click on ***Add Option*** and select 'Only Content'.
6. Toggle ***Only Content*** to `true`. By setting this to true, the node only returns the message.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node gets triggered when a new message is sent to the `temp` queue in RabbitMQ.

![Using the RabbitMQ Trigger node to get a message from a queue](/_images/integrations/trigger-nodes/rabbitmqtrigger/rabbitmqtrigger_node.png)

### 2. IF node

This node will compare the value of `temp` that we received in the message from the previous node. If the value is greater than 50, it will return true otherwise false.

1. Click on ***Add Condition*** and select 'Number' from the dropdown list.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > RabbitMQ > Output Data > JSON > temp. You can also add the following expression: `{{$node["RabbitMQ"].json["temp"]}}`.
4. Select 'Larger' from the ***Operation*** dropdown list.
5. Set ***Value 2*** to 50.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns output for **true** when the temperature is greater than 50.

![Using the IF node to check if the temp is larger than 50](/_images/integrations/trigger-nodes/rabbitmqtrigger/if_node.png)

### 3. Vonage node (send: sms)

This node sends an SMS to the specified phone number when the value of `temp` is greater than `50`.

1. Create a Vonage node connected to the 'true' output of the IF node.
2. You'll have to enter credentials for the Vonage node. You can find out how to do that [here](/workflow/integrations/credentials/vonage/).
3. Enter the name of the sender in the ***From*** field. If you're using a number, enter the number instead.
4. Enter the receiver's phone number in the ***To*** field.
5. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.

6. Enter the following in the ***Expression*** field.
```
Alert!
The value of temp is {{$node["RabbitMQ"].json["temp"]}}.
```
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends an SMS with the value of `temp` that we received from the RabbitMQ Trigger node.

![Using the Vonage node to send an SMS](/_images/integrations/trigger-nodes/rabbitmqtrigger/vonage_node.png)

### 4. NoOp node
Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.

![Using the NoOp node](/_images/integrations/trigger-nodes/rabbitmqtrigger/noop_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the RabbitMQ Trigger node.

