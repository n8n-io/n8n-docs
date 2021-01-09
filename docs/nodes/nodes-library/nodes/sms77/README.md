---
description: Learn how to use the sms77 node in n8n
---

# sms77

[sms77](https://www.sms77.io/) is a full service messaging provider that helps improve communication with a powerful API and comprehensive products like Voice, SMS, and Text2Speech.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/sms77/README.md).
:::

## Basic Operations

::: details SMS
- Send SMS
:::

## Example Usage

This workflow allows you to send an SMS to a specified phone number from any phone number. You can also find the [workflow](https://n8n.io/workflows/469) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [sms77]()

The final workflow should look like the following image.

![A workflow with the sms77 node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. sms77 node

1. First of all, you'll have to enter credentials for the sms77 node. You can find out how to do that [here](../../../credentials/sms77/README.md).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. Enter you message in the *Message* field.
5. Click on *Execute Node* to run the workflow.
