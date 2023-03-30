---
title: Discord
description: Documentation for the Discord node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Discord

The Discord node allows you to automate work in Discord, and integrate Discord with other applications. n8n has built-in support for a wide range of Discord features, including sending messages in a Discord channel.

On this page, you'll find a list of operations the Discord node supports and links to more resources.

!!! note "Credentials"
    Refer to [Discord credentials](/integrations/builtin/credentials/discord/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Discord integrations](https://n8n.io/integrations/discord/){:target="_blank" .external-link} list.


## Basic Operations

- Send messages in a Discord Channel

## Example Usage

This workflow allows you to send a message to a Discord channel using webhooks. You can also find the [workflow](https://n8n.io/workflows/410) on this website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Discord]()

The final workflow should look like the following image.

![A workflow with the Discord node](/_images/integrations/builtin/app-nodes/discord/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Discord node

1. First of all, you'll have to create a webhook for the Discord node. You can find out how to do that [here](/integrations/builtin/credentials/discord/).
2. Paste your webhook into the **Webhook URL** field.
5. Enter your message in the **Text** field.
6. Click on **Execute Node** to run the workflow.

![Sending a message to a Discord channel using the Discord node](/_images/integrations/builtin/app-nodes/discord/discord_node.png)

