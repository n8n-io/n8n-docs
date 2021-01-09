---
description: Learn how to use the MessageBird node in n8n
---

# MessageBird

[MessageBird](https://www.messagebird.com/) is a cloud communications platform that connects enterprises to their global customers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/MessageBird/README.md).
:::

## Basic Operations

::: details Balance
- Get the balance
:::

::: details SMS
- Send text messages (SMS)
:::

## Example Usage

This workflow allows you to send an SMS with MessageBird. You can also find the [workflow](https://n8n.io/workflows/455) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [MessageBird]()

The final workflow should look like the following image.

![A workflow with the MessageBird node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. MessageBird node

1. First of all, you'll have to enter credentials for the MessageBird node. You can find out how to do that [here](../../../credentials/MessageBird/README.md).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. Enter you message in the *Message* field.
5. Click on *Execute Node* to run the workflow.
