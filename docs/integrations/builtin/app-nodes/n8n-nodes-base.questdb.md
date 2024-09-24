---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: QuestDB node documentation
description: Learn how to use the QuestDB node in n8n. Follow technical documentation to integrate QuestDB node into your workflows.
contentType: integration
---

# QuestDB node

Use the QuestDB node to automate work in QuestDB, and integrate QuestDB with other applications. n8n supports executing an SQL query and inserting rows in a database with QuestDB.

On this page, you'll find a list of operations the QuestDB node supports and links to more resources.

/// note | Credentials
Refer to [QuestDB credentials](/integrations/builtin/credentials/questdb/) for guidance on setting up authentication. 
///

## Operations

* Executes a SQL query.
* Insert rows in database.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'questdb') ]]

## Node reference

### Specify a column's data type

To specify a column's data type, append the column name with `:type`, where `type` is the data type you want for column. For example, if you want to specify the type `int` for the column **id** and type `text` for the column **name**, you can use the following snippet in the **Columns** field: `id:int,name:text`.





