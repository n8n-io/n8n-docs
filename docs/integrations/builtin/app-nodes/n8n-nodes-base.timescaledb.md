---
title: TimescaleDB
description: Documentation for the TimescaleDB node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# TimescaleDB

Use the TimescaleDB node to automate work in TimescaleDB, and integrate TimescaleDB with other applications. n8n has built-in support for a wide range of TimescaleDB features, including executing an SQL query, as well as inserting and updating rows in a database. 

On this page, you'll find a list of operations the TimescaleDB node supports and links to more resources.

!!! note "Credentials"
    Refer to [TimescaleDB credentials](/integrations/builtin/credentials/timescaledb/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [TimescaleDB integrations](https://n8n.io/integrations/timescaledb/){:target="_blank" .external-link} list.


## Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database


## Node reference

### Specify the data type of a column

To specify the data type of a column, append the column name with `:type`, where `type` is the data type of that column. For example, if you want to specify the type `int` for the column *id* and type `text` for the column *name*, you can use the following snippet in the ***Columns*** field: `id:init,name:text`.

