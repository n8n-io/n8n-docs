---
title: Compression
description: Documentation for the Compression node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Compression

Use the Compression node to compress and decompress files. Supports Zip and Gzip formats.

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Compression integrations](https://n8n.io/integrations/compression/){:target=_blank .external-link} page.
///

## Node parameters

- **Operation** > **Compress**:
	- **Input Binary Field(s)**: the name of the fields in the input data that contain the binary files you want to compress. To compress more than one file, use a comma-separated list.
	- **Output Format**: choose from  **Zip** and **Gzip**.
	- **File Name**: the name of the zip file you create.
	- **Put Output File in Field**: set the name of the field in the output data to contain the file.
- **Operation** > **Decompress**:
	- **Put Output File in Field**: set the name of the field in the output data to contain the file.
	- **Output Prefix**: add a prefix to the output file name.
