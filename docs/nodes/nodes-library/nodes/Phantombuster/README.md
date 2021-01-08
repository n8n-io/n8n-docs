---
permalink: /nodes/n8n-nodes-base.phantombuster
description: Learn how to use the Phantombuster node in n8n
---

# Phantombuster

[Phantombuster](https://www.phantombuster.com/) is a scraping platform to automate all websites. It allows chain actions and data extraction on the web to generate business leads, marketing audiences, and overall growth.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Phantombuster/README.md).
:::

## Basic Operations

::: details Agent
- Delete an agent by id
- Get an agent by id
- Get all agents of the current user's organization
- Get the output of the most recent container of an agent
- Add an agent to the launch queue
:::

## Example Usage

This workflow allows you to send financial metrics monthly to a Mattermost channel. You can also find the [workflow](https://n8n.io/workflows/798) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Phantombuster]()
- [Mattermost](../../nodes/Mattermost/README.md)

The final workflow should look like the following image.

![A workflow with the Phantombuster node](./workflow.png)

### 1. Start node


### 2. Phantombuster node (getOutput: agent)


### 3. Set node

## 4. Airtable (Append)
