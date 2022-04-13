# Help Scout

[Help Scout](https://www.helpscout.com/) is a help desk software that provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/helpScout/).


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
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Help Scout]()

The final workflow should look like the following image.

![A workflow with the Help Scout node](/_images/integrations/nodes/helpscout/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Help Scout node

1. First of all, you'll have to enter credentials for the Help Scout node. You can find out how to do that [here](/integrations/credentials/helpScout/).
2. Select the 'Mailbox' option from the *Resource* dropdown list.
3. Select the 'Get All' option from the *Operation* dropdown list.
4. Click on *Execute Node* to run the workflow.
