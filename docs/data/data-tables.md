---
title: Data tables
description: Structured tabular data management for workflows within project boundaries
contentType: overview
tags:
  - data tables
hide:
  - tags
---

# Data tables 

## Overview

Data tables integrate data storage within your n8n environment. Using data tables, you can save, manage, and interact with data directly inside your workflows without relying on external database systems for scenarios such as:

- Persisting data across workflows in the same project
- Storing markers to prevent duplicate runs or control workflow triggers
- Reusing prompts or messages across workflows
- Storing evaluation data for AI workflows
- Storing data generated from workflow executions
- Combining data from different sources to enrich your datasets
- Creating lookup tables as quick reference points within workflows

## How to use data tables

There are two parts to working with data tables: creating them and interacting with them in workflows.

### Step 1: Creating a data table

1. In your n8n project, select the **Data tables** tab.
2. Click the split button located in the top right corner and select **Create Data table**.

    ![Data table creation](/_images/data/data-tables/create-data-table.png)

3. Enter a descriptive name for your table.
   
   In the table view that appears, you can:
   
   * Add and reorder columns to organize your data
   * Add, delete, and update rows
   * Edit existing data

### Step 2: Interacting with Data tables in workflows

Interact with data tables in your workflow using the **Data table** node, which allows you to retrieve, update, and manipulate the data stored in a Data table.

See [Data table node](/integrations/builtin/core-nodes/n8n-nodes-base.datatable/index.md).

## Considerations and limitations of data tables

- Data tables are suitable for light to moderate data storage. By default, the total storage used by all data tables in an instance is limited to 50MB. In self-hosted environments, you can increase this default size limit using the environment variable `N8N_DATA_TABLES_MAX_SIZE_BYTES`.
- When your data tables approach 80% of your storage limit, a warning will alert you. A final warning appears when you reach the storage limit. Exceeding this limit will disable manual additions to tables and cause workflow execution errors during attempts to insert or update data.
- By default, data tables created within a project are accessible to all team members in that project.
- Tables created in a **Personal** space are only accessible by their creator.

## Data tables versus variables

| Feature | Data tables | Variables |
|---------|-------------|-----------|
| Unified tabular view | ✓ | ✗ |
| Row-column relationships | ✓ | ✗ |
| Cross-project access | ✗ | ✓ |
| Individual value display | ✗ | ✓ |
| Optimized for short values | ✗ | ✓ |
| Structured data | ✓ | ✗ |
| Scoped to projects | ✓ | ✗ |
| Use values as expressions | ✗ | ✓ |

## Exporting and importing data

To transfer data between n8n and external tools, use workflows that:

1. Retrieve data from a data table.
2. Export it using an API or file export.
3. Import data into another system or data table accordingly.

    ![Data export workflow](/_images/data/data-tables/data-table-export.png)
