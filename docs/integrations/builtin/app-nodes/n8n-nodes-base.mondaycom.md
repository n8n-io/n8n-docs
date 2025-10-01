---
title: monday.com node documentation
description: Learn how to use the monday.com node in n8n. Follow technical documentation to integrate monday.com node into your workflows.
contentType: [integration, reference]
priority: medium
---

# monday.com node

Use the monday.com node to automate work in monday.com, and integrate monday.com with other applications. n8n has built-in support for a wide range of monday.com features, including creating a new board, and adding, deleting, and getting items on the board.

On this page, you'll find a list of operations the monday.com node supports and links to more resources.

/// warning | Minimum required version
This node requires n8n version 1.22.6 or above.
///

/// note | Credentials
Refer to [monday.com credentials](/integrations/builtin/credentials/mondaycom.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Board
    * Archive a board
    * Create a new board
    * Get a board
    * Get all boards
* Board Column
    * Create a new column
    * Get all columns
* Board Group
    * Delete a group in a board
    * Create a group in a board
    * Get list of groups in a board
* Board Item
    * Add an update to an item.
    * Change a column value for a board item
    * Change multiple column values for a board item
    * Create an item in a board's group
    * Delete an item
    * Get an item
    * Get all items
    * Get items by column value
    * Move item to group

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mondaycom') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
