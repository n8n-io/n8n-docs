---
permalink: /nodes/n8n-nodes-base.twilio
---

# Twilio

[Twilio](https://www.twilio.com/) is a cloud communications platform as a service company. Twilio allows software developers to programmatically make and receive phone calls, send and receive text messages, and perform other communication functions using its web service APIs.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Twilio/README.md).
:::

## Basic Operations

- SMS
    - Send SMS
    - Send Whatsapp message

## Example Usage

This workflow allows you to send an SMS or a Whatsapp message to a specified phone number from your Twilio number. You can also find the [workflow](https://n8n.io/workflows/401) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Twilio]()

The final workflow should look like the following image.

![A workflow with the Twilio node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Twilio node

1. First of all, you'll have to enter credentials for the Twilio node. You can find out how to do that [here](../../../credentials/Twilio/README.md).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. In case you want to send a Whatsapp message, toggle the *To Whatsapp* button.
5. Enter you message in the *Message* field.
6. Click on *Execute Node* to run the workflow.


## Further Reading

- [Creating Error Workflows in n8n 🌪](https://medium.com/n8n-io/creating-error-workflows-in-n8n-6e03c9ecbc0f)
- [Database Monitoring and Alerting with n8n 📡](https://medium.com/n8n-io/database-monitoring-and-alerting-with-n8n-f5082df7bdb2)
