---
title: CrateDB node documentation
description: Learn how to use the CrateDB node in n8n. Follow technical documentation to integrate CrateDB node into your workflows.
contentType: [integration, reference]
---

# CrateDB node

Use the CrateDB node to automate work in CrateDB, and integrate CrateDB with other applications. n8n has built-in support for a wide range of CrateDB features, including executing, inserting, and updating rows in the database.

On this page, you'll find a list of operations the CrateDB node supports and links to more resources.

/// note | Credentials
Refer to [CrateDB credentials](/integrations/builtin/credentials/cratedb.md) for guidance on setting up authentication. 
///

## Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'cratedb') ]]

## Node reference

### Specify a column's data type

To specify a column's data type, append the column name with `:type`, where `type` is the data type you want for the column. For example, if you want to specify the type `int` for the column **id** and type `text` for the column **name**, you can use the following snippet in the **Columns** field: `id:int,name:text`.





