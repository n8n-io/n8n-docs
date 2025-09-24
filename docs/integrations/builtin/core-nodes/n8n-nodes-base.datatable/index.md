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
status: beta
---

# Data table

Use the Data Table node to permanently save data across workflow executions in a table format. It provides functionality to perform various data operations on stored data.

## Node parameters

### Resource

Select the resource on which you want to operate

- Rows

### Operations

Select the operation you want to run on the resource:

| Operation | Description | Options |
|---|---|---|
| **Get** | Get one or more rows from your table based on defined filters. | **Limit**: The number of rows you want to return, specified as a number. Default value is 50. |
| **Update** | Update one or more rows. | |
| **Insert** | Insert rows into an existing table. | **Optimize Bulk**: Optimize the speed of insertions when working with many rows. If you switch on this option, n8n won't return the data that was inserted. Default state is `off`. |
| **Upsert** | Upsert one or more rows. If the row exists, it's updated; otherwise, a new row is created. | |
| **Delete** | Delete one or more rows. | **Dry Run:** Simulate a deletion before finalizing it. If you switch on this option, n8n returns the rows that will be deleted by the operation. Default state is `off`. |

## Related resources

[Data tables](/data/data-tables.md) explains how to create and manage data tables. 