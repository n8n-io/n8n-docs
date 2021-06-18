---
permalink: /nodes/n8n-nodes-base.trello
description: Learn how to use the Trello node in n8n
---

# Trello

[Trello](https://trello.com/) is a web-based Kanban-style list-making application which is a subsidiary of Atlassian. Users can create their task boards with different columns and move the tasks between them.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Trello/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.trello" />

## Example Usage

This workflow allows you to create a new card in Trello. You can also find the [workflow](https://n8n.io/workflows/461) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Trello]()

The final workflow should look like the following image.

![A workflow with the Trello node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Trello node

1. First of all, you'll have to enter credentials for the Trello node. You can find out how to do that [here](../../../credentials/Trello/README.md).
2. Enter the ID of the list in which you want to create a new card in the *List ID* field. You can find instructions on how to obtain the ID of the list in the FAQs below.
3. Enter the name of the card in the *Name* field.
4. Enter the description of the card in the *Description* field.
5. Click on *Execute Node* to run the workflow.


## FAQs

### How do I find the List ID?

1. Open the Trello board that contains the list.
2. If the list doesn't have any cards, add a card to the list.
3. Open the card, add '.json' at the end of the URL, and press enter.
4. In the JSON file, you will see a field called `idList`.
5. Copy `idList`and paste it in the *List ID* field in n8n.


## Further Reading

<FurtherReadingBlog node="Trello" />
