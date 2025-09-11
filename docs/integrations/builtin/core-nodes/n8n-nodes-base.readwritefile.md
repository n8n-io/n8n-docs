---
title: Read/Write Files from Disk
description: Documentation for the Read/Write Files from Disk node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: critical
---

# Read/Write Files from Disk

Use the Read/Write Files from Disk node to read and write files from/to the machine where n8n is running.

/// note | Self-hosted n8n only
This node isn't available on n8n Cloud.
///

## Operations

- [**Read File(s) From Disk**](#read-files-from-disk): Use this operation to retrieve one or more files from the computer that runs n8n.
- [**Write File to Disk**](#write-file-to-disk): Use this operation to create a binary file on the computer that runs n8n.

Refer to the sections below for more information on configuring the node for each operation.

## Read File(s) From Disk

Configure this operation with these parameters:

* **File(s) Selector**: Enter the path of the file you want to read.
	- To enter multiple files, enter a file path pattern. You can use these characters to define a path pattern:
		- `*`: Matches any character zero or more times, excluding path separators.
			- Example: `*.txt` matches `file.txt`, `document.txt`, but not `folder/file.txt`
			- Example: `data-*` matches `data-2023`, `data-backup`, `data-final`
		- `**`: Matches any character zero or more times, including path separators.
			- Example: `**/*.json` matches `config.json`, `src/config.json`, `src/utils/config.json`
			- Example: `logs/**` matches all files in the `logs` directory and subdirectories
		- `?`: Matches any character except for path separators one time.
			- Example: `file?.txt` matches `file1.txt`, `fileA.txt`, but not `file10.txt`
			- Example: `log-202?-??.txt` matches `log-2023-01.txt`, `log-2024-12.txt`
		- `[]`: Matches any characters inside the brackets.
			- Example: `[abc]` matches `a`, `b`, or `c`, and nothing else
			- Example: `file[0-9].txt` matches `file0.txt`, `file5.txt`, `file9.txt`
			- Example: `backup-[A-Z][0-9].log` matches `backup-A1.log`, `backup-Z9.log`

	**Common Pattern Examples:**
	- `*.csv` - All CSV files in the current directory
	- `**/*.pdf` - All PDF files in current and all subdirectories
	- `data/2023/**/*.json` - All JSON files in any subdirectory of `data/2023/`
	- `logs/app-????.log` - Log files like `app-2023.log`, `app-prod.log`
	- `backup-[0-9][0-9][0-9].zip` - Backup files like `backup-001.zip`, `backup-999.zip`

Refer to [Picomatch's Basic globbing](https://github.com/micromatch/picomatch#basic-globbing) documentation for more information on these characters and their expected behavior.

### Read File(s) From Disk options

You can also configure this operation with these **Options**:

* **File Extension**: Enter the extension for the file in the node output.
* **File Name**: Enter the name for the file in the node output.
* **MIME Type**: Enter the file's MIME type in the node output. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for a list of file extensions and their MIME types.
* **Put Output File in Field**: Enter the name of the field in the output data to contain the file.

## Write File to Disk

Configure this operation with these parameters:

* **File Path and Name**: Enter the destination for the file, the file's name, and the file's extension.
* **Input Binary Field**: Enter the name of the field in the node input data that will contain the binary file.

### Write File to Disk options

You can also configure this operation with these **Options**:

This operation includes a single option, whether to **Append** data to an existing file instead of creating a new one (turned on) or to create a new file instead of appending to existing (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'readwrite-files-from-disk') ]]

## File locations

If you run n8n in Docker, your command runs in the n8n container and not the Docker host.

This node looks for files relative to the n8n install path. n8n recommends using absolute file paths to prevent any errors.
