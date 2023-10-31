---
title: Help Scout
description: Documentation for the Help Scout node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Help Scout


Use the Help Scout node to automate work in Help Scout, and integrate Help Scout with other applications. n8n has built-in support for a wide range of Help Scout features, including creating, updating, deleting, and getting conversations, and customers.


On this page, you'll find a list of operations the Help Scout node supports and links to more resources.

!!! note "Credentials"
    Refer to [Help Scout credentials](/integrations/builtin/credentials/helpscout/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Help Scout integrations](https://n8n.io/integrations/helpscout/){:target="_blank" .external-link} list.


## Basic Operations

* Conversation
    * Create a new conversation
    * Delete a conversation
    * Get a conversation
    * Get all conversations
* Customer
    * Create a new customer
    * Get a customer
    * Get all customers
    * Get customer property definitions
    * Update a customer
* Mailbox
    * Get data of a mailbox
    * Get all mailboxes
* Thread
    * Create a new chat thread
    * Get all chat threads

## Example Usage

This workflow allows you to get all mailboxes from Help Scout. You can also find the [workflow](https://n8n.io/workflows/567) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Help Scout]()

The final workflow should look like the following image.

![A workflow with the Help Scout node](/_images/integrations/builtin/app-nodes/helpscout/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Help Scout node

1. First of all, you'll have to enter credentials for the Help Scout node. You can find out how to do that [here](/integrations/builtin/credentials/helpscout/).
2. Select the 'Mailbox' option from the *Resource* dropdown list.
3. Select the 'Get All' option from the *Operation* dropdown list.
4. Click on *Execute Node* to run the workflow.

