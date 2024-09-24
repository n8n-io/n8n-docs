---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Grist node documentation
description: Learn how to use the Grist node in n8n. Follow technical documentation to integrate Grist node into your workflows.
contentType: integration
---

# Grist node

Use the Grist node to automate work in Grist, and integrate Grist with other applications. n8n has built-in support for a wide range of Grist features, including creating, updating, deleting, and reading rows in a table. 

On this page, you'll find a list of operations the Grist node supports and links to more resources.

/// note | Credentials
Refer to [Grist credentials](/integrations/builtin/credentials/grist/) for guidance on setting up authentication. 
///

## Operations

* Create rows in a table
* Delete rows from a table
* Read rows from a table
* Update rows in a table

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'grist') ]]

## Get the Row ID

To update or delete a particular record, you need the Row ID. There are two ways to get the Row ID:

**Create a Row ID column in Grist**

Create a new column in your Grist table with the formula `$id`.

**Use the Get All operation**

The **Get All** operation returns the Row ID of each record along with the fields.
 
You can get it with the expression `{{$node["GristNodeName"].json["id"]}}`.


## Filter records when using the Get All operation

- Select **Add Option** and select **Filter** from the dropdown list.
- You can add filters for any number of columns. The result will only include records which match all the columns.
- For each column, you can enter any number of values separated by commas. The result will include records which match any of the values for that column.

