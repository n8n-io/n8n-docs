---
permalink: /nodes/n8n-nodes-base.googleTranslate
description: Learn how to use the Google Translate node in n8n
---

# Google Translate

[Google Translate](https://translate.google.com/) is a free multilingual translation service developed by Google to translate text and websites from one language into another. 

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

::: details Language
- Translate data
:::

## Example Usage

This workflow allows you to translate text using the Google Translate node. You can also find the [workflow](https://n8n.io/workflows/428) on the website. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Translate]()

The final workflow should look like the following image.

![A workflow with the Google Translate node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Translate node

1. First of all, you'll have to enter credentials for the Google Translate node. You can find out how to do that [here](../../../credentials/Google/README.md).
2. Select the *TaskList* from the dropdown list of the user's task-lists where a new task needs to be added.
3. Enter a title for the task in the *Title* field.
4. Click on *Execute Node* to run the workflow.
