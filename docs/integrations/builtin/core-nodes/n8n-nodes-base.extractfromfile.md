---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Extract From File
description: Documentation for the Extract From File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
priority: high
---

# Extract From File

Use the Extract From File node to get data from a binary format and convert it to JSON.

/// note | Convert to File
To convert JSON data to a file format, use the [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/) node.
///

## Operations

* Extract From CSV
* Extract From HTML
* Extract From JSON
* Extract From ICS
* Extract From ODS
* Extract From PDF
* Extract From RTF
* Extract From Text File
* Extract From XLS
* Extract From XLSX
* Move File to Base64 String

## Node parameters

### Input Binary Field

Enter the name of the field in the node input data that contains the binary file.

### Destination Output Field

Enter the name of the field in the node output that will contain the extracted data.

This parameter is only available for these operations:

* Extract From JSON
* Extract From ICS
* Extract From Text File
* Move File to Base64 String

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'extract-from-file') ]]
