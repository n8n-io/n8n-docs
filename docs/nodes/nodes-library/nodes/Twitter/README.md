---
permalink: /nodes/n8n-nodes-base.twitter
---

# Twitter

[Twitter](https://twitter.com/) is an American microblogging and social networking service on which users post and interact with messages known as "tweets".

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Twitter/README.md).
:::

## Basic Operations

- Tweet
    - Create a new tweet
    - Search tweets

## Example Usage

This workflow allows you to tweet on Twitter. You can also find the [workflow](https://n8n.io/workflows/445) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Twitter]()

The final workflow should look like the following image.

![A workflow with the Twitter node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Twitter node

1. First of all, you'll have to enter credentials for the Twitter node. You can find out how to do that [here](../../../credentials/Twitter/README.md).
2. Select 'Create' from the *Operation* dropdown.
3. Type the message you want to tweet in the *text* field.
4. Click on *Execute Node* to run the workflow.

