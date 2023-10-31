---
title: CrateDB
description: Documentation for the CrateDB node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# CrateDB

Use the CrateDB node to automate work in CrateDB, and integrate CrateDB with other applications. n8n has built-in support for a wide range of CrateDB features, including executing, inserting, and updating rows in the database.

On this page, you'll find a list of operations the CrateDB node supports and links to more resources.

!!! note "Credentials"
    Refer to [CrateDB credentials](/integrations/builtin/credentials/cratedb/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [CrateDB integrations](https://n8n.io/integrations/cratedb/){:target="_blank" .external-link} list.


## Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database


## Node reference

### Specify a column's data type

To specify the data type of a column, append the column name with `:type`, where `type` is the data type of that column. For example, if you want to specify the type `int` for the column *id* and type `text` for the column *name*, you can use the following snippet in the ***Columns*** field: `id:init,name:text`.





