# Xata

[Xata](https://xata.io/) is a serveless database

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/xata/).


## Basic Operations

* Append records to a table
* Delete records from a table
* List records from a table
* Read records from a table
* Update records in a table

## Example Usage

This workflow allows you to list records from a table. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Xata]()

The final workflow should look like the following image.

![A workflow with the Xata node](/_images/integrations/nodes/xata/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Xata node (List)

1. First of all, you'll have to enter credentials for the Xata node. You can find out how to do that [here](/integrations/credentials/xata/).
2. Enter the slug of your workspace in the ***Workspace Slug*** field.
3. Enter the name of the database you want to access in the ***Database Name*** field.
4. Enter the name of the branch you want to access in the ***Branch Name*** field.
5. Enter the name of the table you want to access in the ***Table Name*** field.
6. Click on ***Execute Node*** to run the workflow.

![Using the Xata node to list records from a table](/_images/integrations/nodes/xata/xata_node.png)


