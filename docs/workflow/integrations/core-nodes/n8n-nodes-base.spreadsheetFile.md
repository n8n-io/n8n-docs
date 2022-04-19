---
title: Spreadsheet File
description: The Spreadsheet File node is used to access data from spreadsheet files.
tags:
  - Workflow²
  - Spreadsheet File
---

# Spreadsheet File

The Spreadsheet File node is used to access data from spreadsheet files.

!!! note " Keep in mind"
    You will need to use an additional node such as the [Read Binary File](/integrations/core-nodes/n8n-nodes-base.readBinaryFile/) node or the [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) node to pass the image file as a data property to the Spreadsheet File node.


## Basic Operations

- Read from file
- Write to file

## Node Reference

When writing to a spreadsheet file, the *File Format* field can be used to specify the format of the file to save the data as.

- ***File Format***
	- CSV (Comma-separated values)
	- HTML (HTML Table)
	- ODS (OpenDocument Spreadsheet)
	- RTF (Rich Text Format)
	- XLS (Excel)
	- XLSX (Excel)

- ***Binary Property*** field: Name of the binary property in which to save the binary data of the spreadsheet file.

- ***Options***
	- ***Sheet Name*** field: This field specifies the name of the sheet from which the data should be read or written to.
	- ***Read As String*** field: This toggle enables you to parse all input data as strings.
	- ***RAW Data*** field: This toggle enables you to skip the parsing of data.
	- ***File Name*** field: This field can be used to specify a custom file name when writing a spreadsheet file to disk.

## Example Usage

This workflow allows you to read a spreadsheet file using the Spreadsheet File node. You can also find the [workflow](https://n8n.io/workflows/586) on the website. This example usage workflow would use the following three nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Read Binary File](/integrations/core-nodes/n8n-nodes-base.readBinaryFile/)
- [Spreadsheet File]()


The final workflow should look like the following image.

![A workflow with the Spreadsheet File node](/_images/integrations/core-nodes/spreadsheetfile/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Read Binary File
1. Enter the path to the spreadsheet file you want to read in the *File Path* field.

### 3. Spreadsheet File node

1. Enter the *Property Name* you used in the previous node in the *Binary Property* field.
2. Click on *Execute Node* to run the workflow.




