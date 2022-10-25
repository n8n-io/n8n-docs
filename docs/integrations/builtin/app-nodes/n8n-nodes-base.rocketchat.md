# Rocket.Chat

[Rocket.Chat](https://rocket.chat/) is a free and open source team chat collaboration platform that allows users to communicate securely in real-time across devices.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/rocketchat/).


## Basic Operations

* Chat
    * Post a message to a channel or a direct message

## Example Usage

This workflow allows you to post a message to a channel in Rocket.Chat. You can also find the [workflow](https://n8n.io/workflows/462) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Rocket.Chat]()

The final workflow should look like the following image.

![A workflow with the Rocket.Chat node](/_images/integrations/builtin/app-nodes/rocketchat/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Rocket.Chat node

1. First of all, you'll have to enter credentials for the Rocket.Chat node. You can find out how to do that [here](/integrations/builtin/credentials/rocketchat/).
2. Enter the name of the channel where you want to post the message in the *Channel* field. For example, `#general`.
3. Enter the message in the *Text* field.
5. Click on *Execute Node* to run the workflow.





