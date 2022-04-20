---
title: Stackby
description: Use Stackby with Workflow²
tags:
  - Workflow²
  - Stackby
---
# Stackby

[Stackby](https://stackby.com/) is a real-time database and team collaboration platform.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/stackby/).


## Basic Operations

- Append
- Delete
- List
- Read

## Example Usage

This workflow allows you to insert and retrieve data from a table in Stackby. You can also find the [workflow](https://n8n.io/workflows/934) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/workflow/integrations/core-nodes/n8n-nodes-base.set/)
- [Stackby]()

The final workflow should look like the following image.

![A workflow with the Stackby node](/_images/integrations/nodes/stackby/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

We will use the Set node to set the values for the name and id fields for a new record.

1. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
2. Enter `ID` in the ***Name*** field.
3. Enter an id in the ***Value*** field.
4. Click on the ***Add Value*** button and select 'String' from the dropdown list.
5. Enter `Name` in the ***Name*** field.
6. Enter a name in the ***Value*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sets the value for `ID` and `Name`.

![Using the Set node to set data](/_images/integrations/nodes/stackby/set_node.png)

### 3. Stackby node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://stackby.com/embed/shr161295766228627eec5) in your Stackby stack.

Copy the string of characters located after `/stack/` in your Stackby URL. This is your Stack ID. For example, if the URL is `https://stackby.com/stack/stabdcat4234324/`, the Stack ID will be `stabdcat4234324`.

1. First of all, you'll have to enter credentials for the Stackby node. You can find out how to do that [here](/workflow/integrations/credentials/stackby/).
2. Paste the Stack ID in the ***Stack ID*** field.
3. Enter the name of your table in the ***Table*** field.
4. Enter `ID, Name` in the ***Columns*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Stackby node to insert data into a Stackby table](/_images/integrations/nodes/stackby/stackby_node.png)

### 4. Stackby1 node (List)

This node will list all the records from a table.

1. Select the credentials that you entered in the previous node.
2. Select 'List' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Stack ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Stackby > Parameters > stackId. You can also add the following expression: `{{$node["Stackby"].parameter["stackId"]}}`.
5. Click on the gears icon next to the ***Table*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Stackby > Parameters > table. You can also add the following expression: `{{$node["Stackby"].parameter["table"]}}`.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns all the entries that are stored in the table.

![Using the Stackby node to read data from a Stackby table](/_images/integrations/nodes/stackby/stackby1_node.png)
