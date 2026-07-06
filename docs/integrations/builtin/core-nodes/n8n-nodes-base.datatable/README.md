---
title: Data table
description: >-
  Documentation for the data table node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
tags:
  - data table node
  - data
hide:
  - tags
search:
  boost: 1.5
nodeTitle: n8n-nodes-base.datatable
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.datatable/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable'
layout:
  description:
    visible: false
---

# Data table <a href="#data-table" id="data-table"></a>

Use the Data Table node to create and manage internal data tables. Data tables allow you to store structured data directly inside n8n and use it across workflows.

You can use the Data Table node to:

- Create, list, and manage data tables
- Insert, update, delete, and upsert rows in data tables
- Query and retrieve rows using matching conditions

{% hint style="info" %}
**Working with data tables**

As well as using the Data Tables node in a workflow, you can view and manage data tables manually from the **Data Tables** tab in your project **Overview**.

For information about working with data tables in this tab, and guidance on when to use data tables and their limitations, see [Data tables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables).
{% endhint %}

## Resources <a href="#resources" id="resources"></a>

The Data Table node supports the following resources:

- **Data Table:** Create, list, update, and delete tables.
- **Row:** Insert, retrieve, update, delete, and upsert rows within a table.

### Operations <a href="#operations" id="operations"></a>

See available operations below. For detailed information on parameters for different operation types, refer to the [Table operations](tables.md) and [Row operations](rows.md) pages.

* **Rows**
    * [**Delete:**](rows.md#delete-row) Delete one or more rows.
    * [**Get:**](rows.md#get-row) Get one or more rows from your table based on defined filters.
    * [**If Row Exists:**](rows.md#if-row-exists) Specify a set of conditions to match input items that exist in the data table.
    * [**If Row Does Not Exist:**](rows.md#if-row-does-not-exist) Specify a set of conditions to match input items that don't exist in the data table.
    * [**Insert:**](rows.md#insert-row) Insert rows into an existing table.
    * [**Update:**](rows.md#update-row) Update one or more rows.
    * [**Upsert:**](rows.md#upsert-row) Upsert one or more rows. If the row exists, it's updated; otherwise, a new row is created.

* **Tables**
    * [**Create:**](tables.md#create-a-data-table) Create a new data table.
    * [**Delete:**](tables.md#delete-a-data-table) Delete an existing data table.
    * [**List:**](tables.md#list-data-tables) List existing data tables.
    * [**Update:**](tables.md#update-a-data-table) Update an existing data table.

## Related resources <a href="#related-resources" id="related-resources"></a>

[Data tables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables) explains how to create and manage data tables.
