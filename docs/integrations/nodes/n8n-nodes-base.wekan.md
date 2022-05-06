# Wekan

[Wekan](https://wekan.github.io/) is an open-source kanban board that allows a card-based task and to-do management.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/wekan/).


## Basic Operations

* Board
    * Create a new board
    * Delete a board
    * Get the data of a board
    * Get all user boards
* Card
    * Create a new card
    * Delete a card
    * Get a card
    * Get all cards
    * Update a card
* Card Comment
    * Create a comment on a card
    * Delete a comment from a card
    * Get a card comment
    * Get all card comments
* Checklist
    * Create a new checklist
    * Delete a checklist
    * Get the data of a checklist
    * Returns all checklists for the card
* Checklist Item
    * Delete a checklist item
    * Get a checklist item
    * Update a checklist item
* List
    * Create a new list
    * Delete a list
    * Get the data of a list
    * Get all board lists

## Example Usage

This workflow allows you to create a board and two lists called `To Do` and `Done` using the Wekan node. It also allows you to create a card and update the list ID of the card, enabling you to move it from the `To Do` list to the `Done` list. You can also find the [workflow](https://n8n.io/workflows/728) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Wekan]()

The final workflow should look like the following image.

![A workflow with the Wekan node](/_images/integrations/nodes/wekan/workflow.png)


### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Wekan node (create: board)

This node will create a board called `Documentation` in Wekan. To create a board with a different name, you can enter the name of your board instead.

1. First of all, you'll have to enter credentials for the Wekan node. You can find out how to do that [here](/integrations/credentials/wekan/).

2. Select 'Board' from the ***Resource*** dropdown list.
3. Enter `Documentation` in the ***Title*** field.
4. Select the owner of the board from the ***Owner*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new board with the title `Documentation`.


![Using the Wekan node to create a board](/_images/integrations/nodes/wekan/wekan_node.png)


### 3. Wekan1 node (create: list)

This node will create a list with the title `To Do` in the `Documentation` board, which was created using the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'List' from the ***Resource*** dropdown list.
3. Click on the gears icon next to the ***Board ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Wekan > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan"].json["_id"]}}`.
5. Enter `To Do` in the ***Title*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new list called `To Do` in the `Documentation` board.


![Using the Wekan node to create a list with the title To Do](/_images/integrations/nodes/wekan/wekan1_node.png)


### 4. Wekan2 node (create: list)

This node will create a list with the title `Done` in the `Documentation` board, which was created using the Wekan node.

1. Select the credentials that you entered in the previous node.
2. Select 'List' from the ***Resource*** dropdown list.
3. Click on the gears icon next to the ***Board ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Wekan > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan"].json["_id"]}}`.
5. Enter `Done` in the ***Title*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new list called `Done` in the `Documentation` board.


![Using the Wekan node to create a list with the title Done](/_images/integrations/nodes/wekan/wekan2_node.png)


### 5. Wekan3 node (create: card)

This node will create a card in the `Documentation` board under the list titled `To Do`, which was created using the Wekan1 node.

1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Board ID*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Wekan > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan"].json["_id"]}}`.
4. Click on the gears icon next to the ***List ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Wekan1 > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan1"].json["_id"]}}`.
6. Enter `Document Wekan node` in the ***Title*** field.
7. Select 'Default' from the ***Swimlane ID*** dropdown list.
8. Select an author from the ***Author ID*** dropdown list.
9. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new card with the title `Document Wekan node` in the `To Do` list of the `Documentation` board.


![Using the Wekan node to create a card in the To Do list](/_images/integrations/nodes/wekan/wekan3_node.png)


### 6. Wekan4 node (update: card)

This node will update the list ID of the card created by the previous node and move it from the `To Do` list to the `Done` list.

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Board ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Wekan > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan"].json["_id"]}}`.
5. Click on the gears icon next to the ***List ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Wekan1 > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan1"].json["_id"]}}`.
7. Click on the gears icon next to the ***Card ID*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Wekan3 > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan3"].json["_id"]}}`.
9. Click on the ***Add Field*** button and select 'List ID'.
10. Click on the gears icon next to the ***List ID*** field and click on ***Add Expression***.
11. Select the following in the ***Variable Selector*** section: Nodes > Wekan2 > Output Data > JSON > _id. You can also add the following expression: `{{$node["Wekan2"].json["_id"]}}`.
12. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node updates the list id of the card that we created in the previous node and moves it from the `To Do` list to the `Done` list.


![Using the Wekan node to update the card](/_images/integrations/nodes/wekan/wekan4_node.png)


## FAQs

### How to load all the parameters for the node?

To load all the parameters, for example, Author ID, you need to give admin permissions to the user. Refer to the [Wekan documentation](https://github.com/wekan/wekan/wiki/Features#members-click-member-initials-or-avatar--permissions-adminnormalcomment-only) to learn how to change permissions.
