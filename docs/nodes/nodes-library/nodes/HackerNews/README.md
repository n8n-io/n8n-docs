---
permalink: /nodes/n8n-nodes-base.hackerNews
---

# Hacker News

[Hacker News](https://news.ycombinator.com/) is a social news website focusing on computer science and entrepreneurship. It is run by investment fund and startup incubator, Y Combinator.

::: tip 🔑 Credentials
The Hacker News node does not require Authentication.
:::

## Basic Operations

- All
	- Get all items
- Article
	- Get a Hacker News article
- User
	- Get a Hacker News user

## Example Usage

This workflow allows you to get articles from Hacker News. You can also find the [workflow](https://n8n.io/workflows/525) on this website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start)
- [Hacker News]()

The final workflow should look like the following image.

![A workflow with the Hacker News node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Hacker News node

1. Select 'All' in the *Resource* dropdown list.
2. Click on *Execute Node* to run the workflow.
