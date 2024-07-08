---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Extract From File
description: Documentation for the Extract From File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Extract From File

Use the Extract From File node to get data from a binary format and convert it to JSON.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Extract From File integrations](https://n8n.io/integrations/extract-from-file/){:target=_blank .external-link} page.
///

/// note | Convert to File
To convert JSON data to a file format, use the [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/) node.
///

## Operations

* **Extract From CSV**
* **Extract From HTML**
* **Extract From JSON**
* **Extract From ICS**
* **Extract From ODS**
* **Extract From PDF**
* **Extract From RTF**
* **Extract From Text File**
* **Extract From XLS**
* **Extract From XLSX**
* **Move File to Base64 String**

## Node parameters

The parameters depend on the operation selected:

* All operations have the **Input Binary Field** option: Enter the name of the field in the node input data that contains the binary file.
* **Extract From JSON**, **Extract From ICS**, **Extract From Text File**, and **Move File to Base64 String** also have **Destination Output Field**: Enter the name of the field in the node output that will contain the extracted data.

