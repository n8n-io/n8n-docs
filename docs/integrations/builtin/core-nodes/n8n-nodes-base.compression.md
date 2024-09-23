---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Compression
description: Documentation for the Compression node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: medium
---

# Compression

Use the Compression node to compress and decompress files. Supports Zip and Gzip formats.

## Node parameters

The node parameters depend on which **Operation** you select. Choose to:

* **Compress**: Create a compressed file from your input data.
* **Decompress**: Decompress an existing compressed file.

Refer to the sections below for parameters specific to each **Operation**.

### Compress

- **Input Binary Field(s)**: Enter the name of the fields in the input data that contain the binary files you want to compress. To compress more than one file, use a comma-separated list.
- **Output Format**: Choose whether to format the compressed output as **Zip** or **Gzip**.
- **File Name**: Enter the name of the zip file the node creates.
- **Put Output File in Field**: Enter the name of the field in the output data to contain the file.

### Decompress

- **Put Output File in Field**: Enter the name of the fields in the input data that contain the binary files you want to decompress. To decompress more than one file, use a comma-separated list.
- **Output Prefix**: Enter a prefix to add to the output file name.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'compression') ]]
