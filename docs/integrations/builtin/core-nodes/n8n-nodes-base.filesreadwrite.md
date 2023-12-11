---
title: Read/Write Files from Disk
description: Documentation for the Read/Write Files from Disk node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Read/Write Files from Disk

Use the Read/Write Files from Disk node to read and write files to/from the machine where n8n is running.


/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Read/Write Files from Disk integrations](https://n8n.io/integrations/read-write-files-from-disk/){:target=_blank .external-link} page.
///

/// note | Self-hosted n8n only
This node isn't available on n8n Cloud.
///

## Node parameters

* **Operation** > **Read File(s) From Disk**:
	* **File(s) Selector**: the path to read files from.
* **Operation** >  **Write File to Disk**:
	* **File Path and Name**: set the destination for the file.
	* **Input Binary Field**: the name of the field in the node input data that contains the binary file.

## Options

The node options available depend on the operation.

### Read File(s) From Disk

* **File Extension**: set the extension for the file in the node output.
* **File Name**: set the name for the file in the node output.
* **MIME Type**: set the file's MIME type in the node output.
* **Put Output File in Field**: set the name of the field in the output data to contain the file.

### Write File to Disk

**Append**: enable this to append to an existing file, instead of creating a new one.

## File locations

If you run n8n in Docker, your command runs in the n8n container and not the Docker host.

This node looks for files relative to the n8n install path. n8n recommends using absolute file paths to prevent any errors.
