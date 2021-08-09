---
permalink: /nodes/n8n-nodes-base.googlePerspective
description: Learn how to use the Google Perspective node in n8n
---

# Google Perspective

[Google Perspective](https://www.perspectiveapi.com/) is a free API that uses machine learning to identify "" comments, making it easier to host better conversations online.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic operations

* Analyze Comment

## Example usage

This workflow allows you to analyze a comment for profanity. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Perspective]()

The final workflow should look like the following image.

![A workflow with the Google Perspective node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Perspective node

1. First enter credentials for the Google Perspective node. You can find out how to enter credentials for this node [here](../../../credentials/Google/README.md).
2. The **Analyze Comment** ***Operation*** is selected by default.
3. In the ***Text*** field enter the comment to be analyzed.
4. From the ***Properties*** section click **Add Attribute**.
    * For ***Attribute Name*** select **Profanity**.
    * For ***Score Threshold*** leave the **0.00** default setting to return all scores.
5. Click on **Execute Node** to run the workflow.

![The Google Perspective node](./googlePerspective_node.png)
