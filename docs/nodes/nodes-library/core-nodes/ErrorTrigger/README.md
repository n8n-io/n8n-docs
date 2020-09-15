---
permalink: /nodes/n8n-nodes-base.errorTrigger
---

# Error Trigger

Error Trigger node triggers the workflow when another workflow has an error. Once a workflow fails, this node gets details about the failed workflow and the error workflow gets triggered.

::: tip 💡 Keep in mind
1. If a workflow is using the Error Trigger node, you don't have to activate the workflow.
2. For the workflow you want to receive updates on failure, make sure that you select the 'Error Workflow' in the ***Workflow Settings***.
:::

## Example Usage

This workflow allows you to send an SMS when a workflow fails, using the Error Trigger node. You can also find the [workflow](https://n8n.io/workflows/665) on n8n.io. This example usage workflow would use the following node.
- [Error Trigger]()
- [Twilio](../../../nodes-library/nodes/Twilio/README.md)

The final workflow should look like the following image.

![A workflow with the Error Trigger node](./workflow.png)

### 1. Error Trigger node

1. Click on ***Execute Node*** to run the node.

::: v-pre
### 2. Twilio node (send: sms)

1. First of all, you'll have to enter credentials for the Twilio node. You can find out how to do that [here](../../../credentials/Twilio/README.md).
2. Enter the phone number from which you'll be sending the message in the ***From*** field.
3. Enter the phone number to which you'll be sending the message in the ***To*** field.
4. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
5. Enter `Your workflow with ID: {{$node["Error Trigger"].json["workflow"]["id"]}} and name: {{$node["Error Trigger"].json["workflow"]["name"]}} failed to execute.` in the ***Expression*** field.
6. Click on ***Execute Node*** to run the node.
:::

## FAQs

### Can we send a custom error-message?

The Error Trigger node the actual error-message thrown by the workflow
You can ignore that error-message but you will always receive the actual error as a message.

### How do we call the Error Workflow manually?

There is currently no special functionality to call an Error Workflow manually.

## Further Reading

- [Creating Error Workflows in n8n 🌪](https://medium.com/n8n-io/creating-error-workflows-in-n8n-6e03c9ecbc0f)
