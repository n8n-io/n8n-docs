---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Trello node documentation
description: Learn how to use the Trello node in n8n. Follow technical documentation to integrate Trello node into your workflows.
contentType: integration
priority: medium
---

# Trello node

Use the Trello node to automate work in Trello, and integrate Trello with other applications. n8n has built-in support for a wide range of Trello features, including creating and updating cards, and adding and removing members. 

On this page, you'll find a list of operations the Trello node supports and links to more resources.

/// note | Credentials
Refer to [Trello credentials](/integrations/builtin/credentials/trello/) for guidance on setting up authentication. 
///

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'trello') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Find the List ID

1. Open the Trello board that contains the list.
2. If the list doesn't have any cards, add a card to the list.
3. Open the card, add `.json` at the end of the URL, and press enter.
4. In the JSON file, you will see a field called `idList`.
5. Copy the contents of the `idList`field and paste it in the ***List ID** field in n8n.






