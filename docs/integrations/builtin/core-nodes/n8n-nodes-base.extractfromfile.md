---
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

## Node parameters

* **Operation**:
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

The other parameters depend on the operation:

* All operations have **Input Binary Field**: the name of the field in the node input data that contains the binary file.
* **Extract From JSON**, **Extract From ICS**, **Extract From Text File**, and **Move File to Base64 String** also have **Destination Output Field**: the name of the field in the node output that will contain the extracted data.

