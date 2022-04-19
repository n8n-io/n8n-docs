# monday.com

[monday.com](https://monday.com/) is a work operating system that enables organizations to manage tasks, projects, and team work.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mondayCom/).


## Basic Operations

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

## Example Usage

This workflow allows you to get a board from monday.com. You can also find the [workflow](https://n8n.io/workflows/556) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [monday.com]()

The final workflow should look like the following image.

![A workflow with the monday.com node](/_images/integrations/nodes/mondaycom/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. monday.com node

1. First of all, you'll have to enter credentials for the monday.com node. You can find out how to do that [here](/workflow/integrations/credentials/mondayCom/).
2. Select the 'Get' option from the *Operation* dropdown list.
3. Select the board you want to get from the *Board ID* dropdown list.
4. Click on *Execute Node* to run the workflow.
