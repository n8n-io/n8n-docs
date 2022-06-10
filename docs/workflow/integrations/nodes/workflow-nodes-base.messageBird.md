# MessageBird

[MessageBird](https://www.messagebird.com/) is a cloud communications platform that connects enterprises to their global customers.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/messageBird/).


## Basic Operations

* SMS
    * Send text messages (SMS)
* Balance
    * Get the balance

## Example Usage

This workflow allows you to send an SMS with MessageBird. You can also find the [workflow](https://n8n.io/workflows/455) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [MessageBird]()

The final workflow should look like the following image.

![A workflow with the MessageBird node](/_images/integrations/nodes/messagebird/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. MessageBird node

1. First of all, you'll have to enter credentials for the MessageBird node. You can find out how to do that [here](/workflow/integrations/credentials/messageBird/).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. Enter you message in the *Message* field.
5. Click on *Execute Node* to run the workflow.
