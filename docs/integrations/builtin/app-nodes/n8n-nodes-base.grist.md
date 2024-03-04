---
title: Grist
description: Documentation for the Grist node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Grist

Use the Grist node to automate work in Grist, and integrate Grist with other applications. n8n has built-in support for a wide range of Grist features, including creating, updating, deleting, and reading rows in a table. 

On this page, you'll find a list of operations the Grist node supports and links to more resources.

/// note | Credentials
Refer to [Grist credentials](/integrations/builtin/credentials/grist/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Grist integrations](https://n8n.io/integrations/grist/){:target="_blank" .external-link} list.
///

## Basic operations

* Create rows in a table
* Delete rows from a table
* Read rows from a table
* Update rows in a table

## FAQs

### How to get the Row ID?

To update or delete a particular record, you need the Row ID. There are two ways to get the Row ID.

**Create a Row ID column in Grist**

Create a new column in your Grist table with the formula `$id`.

**Use the Get All operation**

The ***Get All*** operation returns the Row ID of each record along with the fields.
 
You can obtain it with the expression `{{$node["GristNodeName"].json["id"]}}`.


### How to filter records when using the Get All operation?

- Click on ***Add Option*** and select 'Filter' from the dropdown list.
- You can add filters for any number of columns. The result will only include records which match all the columns.
- For each column, you can enter any number of values separated by commas. The result will include records which match any of the values for that column.

