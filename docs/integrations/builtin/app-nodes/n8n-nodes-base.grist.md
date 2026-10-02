---
title: Grist node documentation
description: >-
  Learn how to use the Grist node in n8n. Follow technical documentation to
  integrate Grist node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Grist node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.grist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.grist'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.grist'
layout:
  description:
    visible: false
---

# Grist node <a href="#grist-node" id="grist-node"></a>

Use the Grist node to automate work in Grist, and integrate Grist with other applications. n8n has built-in support for a wide range of Grist features, including creating, updating, deleting, and reading rows in a table. 

On this page, you'll find a list of operations the Grist node supports and links to more resources.

New Grist nodes use node version 2, with document and table pickers and a column mapper. Workflows built with node version 1 stay on node version 1 and keep working unchanged. Refer to [What changed from node version 1](#what-changed-from-node-version-1).

{% hint style="info" %}
**Credentials**

Refer to [Grist credentials](../credentials/grist.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Create rows in a table
* Create or update rows in a table
* Delete rows from a table
* Read rows from a table
* Update rows in a table

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Grist node documentation integration templates](https://n8n.io/integrations/grist) or [search all templates](https://n8n.io/workflows/)

## Choose the Grist document and table

In node version 2, set **Document** and **Table** in one of these ways:

- **Document**: Select **From list** to choose from the documents your credential can access, **By URL** to paste the address of a Grist document, or **By ID** to enter the document ID.
- **Table**: Select **From list** to choose a table in that document, or **By ID** to enter the table ID. A table ID isn't always the table name. In Grist, open **Raw Data** to see it.

## Set column values in Grist rows

In node version 2, **Create Row**, **Update Row**, and **Create or Update** read the columns of the table and show them in a column mapper.

Set **Mapping Column Mode** to one of these:

- **Map Each Column Manually**: Enter a value for each column. Each input matches the Grist column type. For example, a Toggle column shows a switch, and a Choice column shows its choices.
- **Map Automatically**: Map incoming data fields to columns with the same name. The node leaves out `id`, formula columns, and fields that don't match a column, so you can copy rows from **Get Many Rows** to another table.

The mapper hides formula columns, because Grist calculates their values.

In node version 2, send an array to a list column, such as Choice List, Reference List, or Attachment. For example, `["vip", "beta"]`. **Get Many Rows** also returns these columns as arrays.

The node reads the choices of a Choice column when you set it up. If you add a choice in Grist later, open the node again before you use the new choice. **Map Automatically** doesn't check choices.

## Update Grist rows

In node version 2, choose **Row ID** or other columns under **Columns to match on**, then enter the values to match. The node updates the first row that matches. If no row matches, the node reports an error.

In node version 1, enter the **Row ID** of the row to update.

## Create or update Grist rows

The **Create or Update** operation looks for a row that matches values you choose. If it finds one, it updates that row. If it doesn't, it adds a new row.

1. Under **Columns to match on**, choose one or more columns. A row must match every one.
2. Enter the values to match and the values to write.
3. Use **On Multiple Matches** to choose what happens when more than one row matches:
	* **Update First Match**: Update the first matching row. This is the default.
	* **Do Not Update**: Change none of the matching rows, and don't add a row.
	* **Update All Matches**: Update every matching row.

The output for each item is the data the node sent, plus the `id` of the row it created or updated. **Update All Matches** outputs the `id` of the first row only. **Do Not Update** outputs no `id` when it leaves the rows unchanged.

In node version 1, set the columns to match under **Upsert Criteria** instead.

## What changed from node version 1

Existing workflows keep the node version you built them with. To see a node's version, open the node and select the **Settings** tab. Node version 2 differs from node version 1 in these ways:

* **Document and table:** pickers replace the **Document ID** and **Table ID** text fields.
* **Column values:** a column mapper replaces **Data to Send**, **Fields to Send**, and **Inputs to Ignore**.
* **Matching rows:** **Update Row** and **Create or Update** match on columns chosen in **Columns to match on**, in place of **Row ID** and **Upsert Criteria**. **Update Row** reports an error when no row matches.
* **List columns:** **Get Many Rows** returns list columns as plain arrays, without Grist's `L` marker.

## Get the Row ID <a href="#get-the-row-id" id="get-the-row-id"></a>

To delete a row, or to update a row by its ID, you need the Row ID. There are two ways to get the Row ID:

**Create a Row ID column in Grist**

Create a new column in your Grist table with the formula `$id`.

**Use the Get Many Rows operation**

The **Get Many Rows** operation returns the Row ID of each record along with the fields.
 
You can get it with the expression `{{$("GristNodeName").item.json.id}}`.


## Filter records when using the Get Many Rows operation <a href="#filter-records-when-using-the-get-all-operation" id="filter-records-when-using-the-get-all-operation"></a>

- Select **Add Option** and select **Filter** from the dropdown list.
- You can add filters for any number of columns. The result will only include records which match all the columns.
- For each column, you can enter any number of values separated by commas. The result will include records which match any of the values for that column.

