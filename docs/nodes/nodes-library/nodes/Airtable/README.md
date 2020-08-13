---
permalink: /nodes/n8n-nodes-base.airtable
---

# Airtable

[Airtable](https://airtable.com/) is a spreadsheet-database hybrid, with the features of a database but applied to a spreadsheet. The fields in an Airtable table are similar to cells in a spreadsheet, but have types such as 'checkbox', 'phone number', and 'drop-down list', and can reference file attachments like images.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Airtable/README.md).
:::

## Basic Operations

- Append the data to a table
- Delete data from a table
- List data from a table
- Read data from a table
- Update data in a table


## Example Usage

This workflow allows you to insert and list data from a table in Airtable. You can also find the [workflow](https://n8n.io/workflows/601) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Set](../../core-nodes/Set/README.md)
- [Airtable]()

The final workflow should look like the following image.

![A workflow with the Airtable node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

1. Click on the ***Add Value*** button and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Enter the value for the name in the ***Value*** field.
4. Click on the ***Add Value*** button and select 'String' from the dropdown list.
5. Enter `Info` in the ***Name*** field.
6. Enter the value for the info in the ***Value*** field.
7. Click on ***Execute Node*** to run the node.

![Using the Set node to set data to be inserted by the Airtable node](./Set_node.png)

### 3. Airtable node (Append)

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](../../../credentials/Airtable/README.md).
2. Select the 'Append' option from the ***Operation*** dropdown list.
3. Enter the application ID in the ***Application ID*** field. For obtaining the Application ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Application ID there.
4. Enter the name of the table in the ***Table*** field.
5. Click on ***Execute Node*** to run the workflow.

![Using the Airtable node to insert data into an Airtable table](./Airtable_node.png)

### 4. Airtable1 node (List)

1. Select the credentials that you entered in the previous Airtable node.
2. Select the 'List' option from the ***Operation*** dropdown list.
3. Enter the same application ID used in the previous Airtable node in the ***Application ID*** field.
4. Enter the name of the table used in the previous Airtable node in the ***Table*** field.
5. Click on ***Execute Node*** to run the workflow.

![Using the Airtable node to read data from an Airtable table](./Airtable1_node.png)

## Further Reading

- [Automating Conference Organization Processes with n8n](https://medium.com/n8n-io/automating-conference-organization-processes-with-n8n-ab8f64a7a520)
