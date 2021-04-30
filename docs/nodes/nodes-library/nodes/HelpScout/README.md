---
permalink: /nodes/n8n-nodes-base.helpScout
description: Learn how to use the Help Scout node in n8n
---

# Help Scout

[Help Scout](https://www.helpscout.com/) is a help desk software that provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/HelpScout/README.md).
:::

## Basic Operations

<Resource node="HelpScout" />

## Example Usage

This workflow allows you to get all mailboxes from Help Scout. You can also find the [workflow](https://n8n.io/workflows/567) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Help Scout]()

The final workflow should look like the following image.

![A workflow with the Help Scout node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Help Scout node

1. First of all, you'll have to enter credentials for the Help Scout node. You can find out how to do that [here](../../../credentials/HelpScout/README.md).
2. Select the 'Mailbox' option from the *Resource* dropdown list.
3. Select the 'Get All' option from the *Operation* dropdown list.
4. Click on *Execute Node* to run the workflow.
