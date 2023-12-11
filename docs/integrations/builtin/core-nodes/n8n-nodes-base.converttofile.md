---
title: Convert to File
description: Documentation for the Convert to File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Convert to File

Use the Convert to File node to take input data and output it as a file. This converts the input JSON data into a binary format.


///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Convert to File integrations](https://n8n.io/integrations/convert-to-file/){:target=_blank .external-link} page.
///

/// note | Extract From File
To extract data from a file and convert it to JSON, use the [Extract from File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/) node.
///

## Node parameters


* **Operation** > **Convert to CSV**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to HTML**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to iCal**:
	* **Event Title**
	* **Start**: event start time.
	* **End**: event end time.
	* **All Day**: whether the event is an all day event (enabled) or not (disabled).
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* * **Operation** > **Convert to JSON**:
	* **Mode**: choose **All Items to One File** to send all input items to a single file, or **Each Item to Separate File** to create a file for every input item.
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to ODS**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to RTF**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to XLS**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Convert to XLSX**:
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.
* **Operation** > **Move Base64 String to File**:
	* **Base64 Input Field**: the name of the field in the node input data that contains the Base64 string.
	* **Put Output File in Field**: set the name of the field in the output data to contain the file.

## Options

Use the **Options** parameters to configure additional settings. These vary depending on the file type you're creating. You can set the **File Name** for all file types.
