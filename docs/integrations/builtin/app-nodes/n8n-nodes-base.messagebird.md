---
title: MessageBird
description: Documentation for the MessageBird node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# MessageBird

The MessageBird node allows you to automate work in MessageBird, and integrate MessageBird with other applications. n8n has built-in support for a wide range of MessageBird features, including sending messages, and getting balances. 

On this page, you'll find a list of operations the MessageBird node supports and links to more resources.

!!! note "Credentials"
    Refer to [MessageBird credentials](/integrations/builtin/credentials/messagebird/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [MessageBird integrations](https://n8n.io/integrations/messagebird/){:target="_blank" .external-link} list.


## Basic Operations

* SMS
    * Send text messages (SMS)
* Balance
    * Get the balance

## Example Usage

This workflow allows you to send an SMS with MessageBird. You can also find the [workflow](https://n8n.io/workflows/455) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [MessageBird]()

The final workflow should look like the following image.

![A workflow with the MessageBird node](/_images/integrations/builtin/app-nodes/messagebird/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. MessageBird node

1. First of all, you'll have to enter credentials for the MessageBird node. You can find out how to do that [here](/integrations/builtin/credentials/messagebird/).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. Enter you message in the *Message* field.
5. Click on *Execute Node* to run the workflow.

