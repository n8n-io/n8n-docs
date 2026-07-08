---
title: Compression
description: Documentation for the Compression node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# Compression

Use the Compression node to compress and decompress files. Supports Zip, Gzip, Tar, and Tar.gz formats.

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

The node parameters depend on which **Operation** you select. Choose to:

* **Compress**: Create a compressed file from your input data.
* **Decompress**: Decompress an existing compressed file.

Refer to the sections below for parameters specific to each **Operation**.

### Compress

- **Input Binary Field(s)**: Enter the name of the fields in the input data that contain the binary files you want to compress. To compress more than one file, use a comma-separated list.
- **Output Format**: Choose whether to format the compressed output as **Zip**, **Gzip**, **Tar**, or **Tar (Gzip)**.
- **File Name**: Enter the name of the compressed file the node creates.
- **Put Output File in Field**: Enter the name of the field in the output data to contain the file.

### Decompress

The Decompress operation detects the archive format from the file extension and supports the following formats:

- `.zip`
- `.gz` and `.gzip`
- `.tar`
- `.tar.gz` and `.tgz`

When you decompress a `.tar.gz` or `.tgz` archive, the node extracts all member files in a single step. You don't need to decompress the gzip layer separately.

- **Input Binary Field(s)**: Enter the name of the fields in the input data that contain the binary files you want to decompress. To decompress more than one file, use a comma-separated list.
- **Output Prefix**: Enter a prefix to add to the output file name. The node uses this prefix, followed by an incrementing index, to name each extracted file.

/// warning | Unsupported formats
If you pass a file with an unsupported extension, the node throws an error instead of silently producing empty output. Supported formats are `zip`, `gzip`, `tar`, `tar.gz`, and `tgz`.
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'compression') ]]
