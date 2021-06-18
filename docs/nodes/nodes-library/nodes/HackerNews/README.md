---
permalink: /nodes/n8n-nodes-base.hackerNews
description: Learn how to use the Hacker News node in n8n
---

# Hacker News

[Hacker News](https://news.ycombinator.com/) is a social news website focusing on computer science and entrepreneurship.

::: tip 🔑 Credentials
The Hacker News node does not require authentication.
:::

## Basic Operations

<Resource node="n8n-nodes-base.hackerNews" />

## Example Usage

This workflow allows you to get articles from Hacker News. You can also find the [workflow](https://n8n.io/workflows/525) on this website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Hacker News]()

The final workflow should look like the following image.

![A workflow with the Hacker News node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Hacker News node

1. Select the 'All' option from the *Resource* dropdown list.
2. Click on *Execute Node* to run the workflow.

## Further Reading

<FurtherReadingBlog node="Hacker News" />
