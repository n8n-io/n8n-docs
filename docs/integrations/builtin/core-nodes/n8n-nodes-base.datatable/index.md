---
title: Data table
description: Documentation for the data table node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: critical
tags:
  - data table node
  - data
hide:
  - tags
search:
  boost: 1.5
---

# Data table

Use the Data Table node to create and manage internal data tables. Data tables allow you to store structured data directly inside n8n and use it across workflows.

You can use the Data Table node to:

- Create, list, and manage data tables
- Insert, update, delete, and upsert rows in data tables
- Query and retrieve rows using matching conditions

/// note | Working with data tables
As well as using the Data Tables node in a workflow, you can view and manage data tables manually from the **Data Tables** tab in your project **Overview**.

For information about working with data tables in this tab, and guidance on when to use data tables and their limitations, see [Data tables](/data/data-tables.md).
///

## Resources

The Data Table node supports the following resources:

- **Data Table:** Create, list, update, and delete tables.
- **Row:** Insert, retrieve, update, delete, and upsert rows within a table.

### Operations

Available operations are summarized below. For detailed information on parameters for different operation types, refer to the [Table operations](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/tables.md) and [Row operations](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md) pages.

* **Rows**
    * [**Delete:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#delete-row) Delete one or more rows.
    * [**Get:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#get-row) Get one or more rows from your table based on defined filters.
    * [**If Row Exists:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#if-row-exists) Specify a set of conditions to match input items that exist in the data table.
    * [**If Row Does Not Exist:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#if-row-does-not-exist) Specify a set of conditions to match input items that don't exist in the data table.
    * [**Insert:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#insert-row) Insert rows into an existing table.
    * [**Update:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#update-row) Update one or more rows.
    * [**Upsert:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows.md#upsert-row) Upsert one or more rows. If the row exists, it's updated; otherwise, a new row is created.

* **Tables**
    * [**Create:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/tables.md#create-a-data-table) Create a new data table.
    * [**Delete:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/tables.md#delete-a-data-table) Delete an existing data table.
    * [**List:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/tables.md#list-data-tables) List existing data tables.
    * [**Update:**](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/tables.md#update-a-data-table) Update an existing data table.

## Related resources

[Data tables](/data/data-tables.md) explains how to create and manage data tables.
