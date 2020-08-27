---
permalink: /nodes/n8n-nodes-base.discord
---

# Discord

[Discord](https://discord.com/) is a voice, video, and text communications platform for groups. Discord allows users to programmatically send messages using webhooks.

::: tip 🔑 Credentials
The Discord node does not require authentication, but you must have access to a channel's settings to use webhooks. You can find out how to create a webhook in Discord [here](../../../credentials/Discord/README.md).
:::

## Basic Operations

- Send messages in a Discord Channel

## Example Usage

This workflow allows you to send a message to a Discord channel using webhooks. You can also find the [workflow](https://n8n.io/workflows/410) on this website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Discord]()

The final workflow should look like the following image.

![A workflow with the Discord node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Discord node

1. First of all, you'll have to create a webhook for the Discord node. You can find out how to do that [here](../../../credentials/Discord/README.md).
2. Paste your webhook into the ***Webhook URL*** field.
5. Enter your message in the ***Text*** field.
6. Click on ***Execute Node*** to run the workflow.
