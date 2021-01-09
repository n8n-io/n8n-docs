---
description: Learn how to use the Quick Base node in n8n
---

# Quick Base

[Quick Base](https://www.quickbase.com/) is a low-code application development platform. It allows you to connect data, integrate your systems in real-time, and orchestrate automated workflows using simple business logic.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/QuickBase/README.md).
:::

## Basic Operations

::: details Field
- Get all fields
:::

::: details File
- Delete a file
- Download a file
:::

::: details Record
- Create a record
- Delete a record
- Get all records
- Update a record
- Upsert a record
:::

::: details Report
- Get a report
- Run a report
:::

## Example Usage

This workflow allows you to create, update, and get all records in Quick Base. You can also find the [workflow](https://n8n.io/workflows/805) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Set](../../core-nodes/Set/README.md)
- [Quick Base]()

The final workflow should look like the following image.

![A workflow with the Quick Base node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

We will use the Set node to set the name and age for a new record.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `name` in the ***Name*** field.
3. Enter `n8n` in the ***Value*** field.
4. Click on ***Add Value*** and select 'Number' from the dropdown list.
5. Enter `age` in the ***Name*** field.
6. Set the value to `8`.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that node sets the value for name and age.

![Using the Set node to set the data](./Set_node.png)

### 3. Quick Base node (create: record)

This node will create a new record in a table.

#### Creating a Quick Base table
1. Create a new table with the fields `name` and `age`.
2. Copy the string of characters located between `db/` and `?a=td` in your Quick Base URL. This string is the Table ID that we will use in the Quick Base node.

#### Configure the Quick Base node
1. First of all, you'll have to enter credentials for the Quick Base node. You can find out how to do that [here](../../../credentials/QuickBase/README.md).
2. Paste the Table ID you copied in the previous step, in the ***Table ID*** field.
3. Enter `name,age` in the ***Columns*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new record in Quick Base using the information from the previous node.

![Using the Quick Base node to create an entry](./QuickBase_node.png)

### 4. Set1 node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow. We will set the value of `age` and `Record ID#` in this node.
::: v-pre
1. Click on ***Add Value*** and select 'Number' from the dropdown list.
2. Enter `age` in the ***Name*** field.
3. Set the value to `10`.
4. Click on ***Add Value*** and select 'Number' from the dropdown list.
5. Enter `Record ID#` in the ***Name*** field.
6. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Quick Base > Output Data > JSON > Record ID#. You can also add the following expression: `{{$node["Quick Base"].json["Record ID#"]}}`.
8. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
9. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sets the value of `age` and `Record ID#`. This value is passed to the next node in the workflow.

![Using the Set node to set the values for age and Record ID#](./Set1_node.png)

### 5. Quick Base1 node (update: record)

This node will update the age field with the new value that we set in the previous node.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Table ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Quick Base > Parameters > tableId. You can also add the following expression: `{{$node["Quick Base"].parameter["tableId"]}}`.
5. Enter `age` in the ***Columns*** field. If you want to update a different column, enter that column name instead.
6. Enter `Record ID#` in the ***Update Key*** field.
7. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node updates the age field with the new value that we set in the previous node.

![Using the Quick Base node to update an entry](./QuickBase1_node.png)

### 6. Quick Base2 node (getAll: record)

This node returns all the records from Quick Base.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Table ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Quick Base > Parameters > tableId. You can also add the following expression: `{{$node["Quick Base"].parameter["tableId"]}}`.
5. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node returns all the records from Quick Base.

![Using the Quick Base node to get all the records](./QuickBase2_node.png)
