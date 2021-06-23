---
permalink: /nodes/n8n-nodes-base.baserow
description: Learn how to use the Baserow node in n8n
---

# Baserow

[Baserow](https://baserow.io/) is an open source no-code database and Airtable alternative.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Baserow/README.md).
:::

## Basic Operations

The Baserow node is able to call basic API endpoint to any configured Baserow
instance.

<Resource node="n8n-nodes-base.baserow" />

## Example usage

This workflow allows you to create, find and delete rows in Baserow default Customer table.

This example usage workflow would use the following nodes.

- [Start](../../core-nodes/Start/README.md)
- [Set](../../core-nodes/Set/README.md)
- [Baserow]()

The final workflow should look like the following image.

![A workflow with the Baserow node](./workflow.png)

For this workflow you need an account to any Baserow instance with 
the demo table `Customers`. View the API doc to get the table id you
have to use later.

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

We will use the Set node to set the values for the name and id fields for a new record.

1. Click on the ***Add Value*** button and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Enter a nami in the ***Value*** field.
4. Click on the ***Add Value*** button and select 'String' from the dropdown list.
5. Enter `Last name` in the ***Name*** field.
6. Enter a last name in the ***Value*** field.
7. Click on the ***Add Value*** button and select 'Boolean' from the dropdown list.
8. Enter `Active` in the ***Name*** field.
9. Check the value.
10. Click on ***Execute Node*** to run the node.

### 3. Baserow node (Create)

This node will create a row with the content from the previous node
in the `Customers` table.

1. First of all, you'll have to enter credentials for the Baserow node. You can find out how to do that [here](../../../credentials/Baserow/README.md).
2. Enter your Baserow instance URL (default value is for official version)
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter the Table ID in the ***Table ID*** field. For obtaining the Table ID, head over the Database API page available from the database menu.
5. Click on ***Execute Node*** to run the node.

### 4. Baserow list

This node will list all the rows with the name `Bill`. If you want to list records with a different name, use that name instead.

::: v-pre
1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Host*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Baserow > Parameters > Host. You can also add the following expression: `{{$node["Baserow"].parameter["host"]}}`.
4. Select the 'List' option from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Table ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Baserow > Parameters > table. You can also add the following expression: `{{$node["Baserow"].parameter["table"]}}`.
1. Click on ***Add Option*** and select 'Search' from the dropdown list.
7.  Enter `Bill` in the ***Search*** field.
8.  Click on ***Execute Node*** to run the node.
:::

You will notice that the node only returns the record with a column containing `Bill`.

### 4. Baserow delete

This node will delete all the rows listed from the previous node.

::: v-pre
1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Host*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Baserow > Parameters > Host. You can also add the following expression: `{{$node["Baserow"].parameter["host"]}}`.
4. Select the 'Delete' option from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Table ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Baserow > Parameters > table. You can also add the following expression: `{{$node["Baserow"].parameter["table"]}}`.
5. Click on the gears icon next to the ***Row ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
7.  Click on ***Execute Node*** to run the node.
:::

## Further Reading

<FurtherReadingBlog />