---
permalink: /nodes/n8n-nodes-base.zulip
description: Learn how to use the Zulip node in n8n
---

# Zulip

[Zulip](https://zulipchat.com/) is an open source chat and collaborative software. In Zulip, communication occurs in streams (which are like channels in IRC).

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Zulip/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.zulip" />

## Example Usage

This workflow allows you to send a private message on Zulip. You can also find the [workflow](https://n8n.io/workflows/498) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Zulip]()

The final workflow should look like the following image.

![A workflow with the Zulip node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zulip node

1. First of all, you'll have to enter credentials for the Zulip node. You can find out how to do that [here](../../../credentials/Zulip/README.md).
2. Select the user you want to send a private message to from the *To* dropdown list.
3. Type the message you want to post in the *Content* field.
4. Click on *Execute Node* to run the workflow.
