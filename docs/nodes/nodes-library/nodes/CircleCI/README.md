---
permalink: /nodes/n8n-nodes-base.circleCi
description: Learn how to use the CircleCI node in n8n
---

# CircleCI

[CircleCI](https://circleci.com/) is a continuous integration and delivery platform helps teams release quality code, faster.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/CircleCI/README.md).
:::

## Basic Operations

<Resource node="CircleCI" />

## Example Usage

This workflow allows you to get a pipeline in CircleCI. You can also find the [workflow](https://n8n.io/workflows/454) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [CircleCI]()

The final workflow should look like the following image.

![A workflow with the CircleCI node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CircleCI node

1. First of all, you'll have to enter credentials for the CircleCI node. You can find out how to do that [here](../../../credentials/CircleCI/README.md).
2. Select the VCS provider from the dropdown in the *Provider* field.
3. Enter the project slug in the *Project Slug* field.
4. Enter the number of the pipeline in CircleCI that you want to get in the *Pipeline Number* field.
5. Click on *Execute Node* to run the workflow.
