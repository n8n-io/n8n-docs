---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TimescaleDB node documentation
description: Learn how to use the TimescaleDB node in n8n. Follow technical documentation to integrate TimescaleDB node into your workflows.
contentType: integration
---

# TimescaleDB node

Use the TimescaleDB node to automate work in TimescaleDB, and integrate TimescaleDB with other applications. n8n has built-in support for a wide range of TimescaleDB features, including executing an SQL query, as well as inserting and updating rows in a database. 

On this page, you'll find a list of operations the TimescaleDB node supports and links to more resources.

/// note | Credentials
Refer to [TimescaleDB credentials](/integrations/builtin/credentials/timescaledb/) for guidance on setting up authentication. 
///

## Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'timescaledb') ]]

## Specify a column's data type

To specify a column's data type, append the column name with `:type`, where `type` is the data type you want for the column. For example, if you want to specify the type `int` for the column **id** and type `text` for the column **name**, you can use the following snippet in the **Columns** field: `id:int,name:text`.

