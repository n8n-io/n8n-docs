---
title: Trello node documentation
description: >-
  Learn how to use the Trello node in n8n. Follow technical documentation to
  integrate Trello node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Trello node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.trello.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.trello'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.trello'
layout:
  description:
    visible: false
---

# Trello node <a href="#trello-node" id="trello-node"></a>

Use the Trello node to automate work in Trello, and integrate Trello with other applications. n8n has built-in support for a wide range of Trello features, including creating and updating cards, and adding and removing members. 

On this page, you'll find a list of operations the Trello node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Trello credentials](../credentials/trello.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

* Attachment
    * Create a new attachment for a card
    * Delete an attachment
    * Get the data of an attachment
    * Returns all attachments for the card
* Board
    * Create a new board
    * Delete a board
    * Get the data of a board
    * Update a board
* Board Member
    * Add
    * Get All
    * Invite
    * Remove
* Card
    * Create a new card
    * Delete a card
    * Get the data of a card
    * Update a card
* Card Comment
    * Create a comment on a card
    * Delete a comment from a card
    * Update a comment on a card
* Checklist
    * Create a checklist item
    * Create a new checklist
    * Delete a checklist
    * Delete a checklist item
    * Get the data of a checklist
    * Returns all checklists for the card
    * Get a specific checklist on a card
    * Get the completed checklist items on a card
    * Update an item in a checklist on a card
* Label
    * Add a label to a card.
    * Create a new label
    * Delete a label
    * Get the data of a label
    * Returns all labels for the board
    * Remove a label from a card.
    * Update a label.
* List
    * Archive/Unarchive a list
    * Create a new list
    * Get the data of a list
    * Get all the lists
    * Get all the cards in a list
    * Update a list

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Trello node documentation integration templates](https://n8n.io/integrations/trello) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

## Find the List ID <a href="#find-the-list-id" id="find-the-list-id"></a>

1. Open the Trello board that contains the list.
2. If the list doesn't have any cards, add a card to the list.
3. Open the card, add `.json` at the end of the URL, and press enter.
4. In the JSON file, you will see a field called `idList`.
5. Copy the contents of the `idList`field and paste it in the ***List ID** field in n8n.






