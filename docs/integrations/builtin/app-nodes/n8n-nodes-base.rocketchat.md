---
title: Rocket.Chat
description: Documentation for the Rocket.Chat node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Rocket.Chat

The Rocket.Chat node allows you to automate work in Rocket.Chat, and integrate Rocket.Chat with other applications. n8n supports posting messages to channels, and sending direct messages, with Rocket.Chat. 

On this page, you'll find a list of operations the Rocket.Chat node supports and links to more resources.

!!! note "Credentials"
    Refer to [Rocket.Chat credentials](/integrations/builtin/credentials/rocketchat/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Rocket.Chat integrations](https://n8n.io/integrations/rocketchat/){:target="_blank" .external-link} list.


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






