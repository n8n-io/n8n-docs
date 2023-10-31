---
title: QuestDB
description: Documentation for the QuestDB node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# QuestDB

Use the QuestDB node to automate work in QuestDB, and integrate QuestDB with other applications. n8n supports executing an SQL query and inserting rows in a database with QuestDB.

On this page, you'll find a list of operations the QuestDB node supports and links to more resources.

!!! note "Credentials"
    Refer to [QuestDB credentials](/integrations/builtin/credentials/questdb/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [QuestDB integrations](https://n8n.io/integrations/questdb/){:target="_blank" .external-link} list.


## Operations

* Executes a SQL query.
* Insert rows in database.



## Node reference

### Specify the data type of a column

To specify the data type of a column, append the column name with `:type`, where `type` is the data type of that column. For example, if you want to specify the type `int` for the column *id* and type `text` for the column *name*, you can use the following snippet in the ***Columns*** field: `id:init,name:text`.





