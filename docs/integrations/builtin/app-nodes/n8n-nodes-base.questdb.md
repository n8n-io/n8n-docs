---
title: QuestDB node documentation
description: >-
  Learn how to use the QuestDB node in n8n. Follow technical documentation to
  integrate QuestDB node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: QuestDB node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.questdb.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.questdb'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.questdb'
layout:
  description:
    visible: false
---

# QuestDB node <a href="#questdb-node" id="questdb-node"></a>

Use the QuestDB node to automate work in QuestDB, and integrate QuestDB with other applications. n8n supports executing an SQL query and inserting rows in a database with QuestDB.

On this page, you'll find a list of operations the QuestDB node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [QuestDB credentials](../credentials/questdb.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Executes a SQL query.
* Insert rows in database.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse QuestDB node documentation integration templates](https://n8n.io/integrations/questdb) or [search all templates](https://n8n.io/workflows/)

## Node reference <a href="#node-reference" id="node-reference"></a>

### Specify a column's data type <a href="#specify-a-columns-data-type" id="specify-a-columns-data-type"></a>

To specify a column's data type, append the column name with `:type`, where `type` is the data type you want for column. For example, if you want to specify the type `int` for the column **id** and type `text` for the column **name**, you can use the following snippet in the **Columns** field: `id:int,name:text`.





