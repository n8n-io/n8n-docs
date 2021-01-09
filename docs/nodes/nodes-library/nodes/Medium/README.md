---
description: Learn how to use the Medium node in n8n
---

# Medium

[Medium](https://www.medium.com/) is an online publishing platform and home to a diverse array of stories, ideas, and perspectives. It empowers writers to share their work and ideas with the readers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Medium/README.md).
:::

## Basic Operations

::: details Post
- Create a post
:::

::: details Publication
- Get all publications
:::


## Example Usage

This workflow allows you to post an article to a publication on Medium. You can also find the [workflow](https://n8n.io/workflows/594) on the website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start/README.md)
- [Medium]()

The final workflow should look like the following image.

![A workflow with the Medium node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Medium node

1. First of all, you'll have to enter credentials for the Medium node. You can find out how to do that [here](../../../credentials/Medium/README.md).
2. Toggle ***Publication*** to true.
3. Select the publication from the ***Publication ID*** dropdown list.
4. Enter the title in the ***Title*** field.
5. Select the format from the ***Content Format*** dropdown list.
6. Enter conent of the post in the ***Content*** field.
7. Click on ***Execute Node*** to run the workflow.
