---
title: Compression
description: >-
  Documentation for the Compression node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: n8n-nodes-base.compression
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.compression.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.compression'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.compression'
layout:
  description:
    visible: false
---

# Compression <a href="#compression" id="compression"></a>

Use the Compression node to compress and decompress files. Supports Zip, Gzip, Tar, and Tar.gz formats.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

The node parameters depend on which **Operation** you select. Choose to:

* **Compress**: Create a compressed file from your input data.
* **Decompress**: Decompress an existing compressed file.

Refer to the sections below for parameters specific to each **Operation**.

### Compress <a href="#compress" id="compress"></a>

- **Input Binary Field(s)**: Enter the name of the fields in the input data that contain the binary files you want to compress. To compress more than one file, use a comma-separated list.
- **Output Format**: Choose whether to format the compressed output as **Zip**, **Gzip**, **Tar**, or **Tar (Gzip)**.
- **File Name**: Enter the name of the compressed file the node creates.
- **Put Output File in Field**: Enter the name of the field in the output data to contain the file.

### Decompress <a href="#decompress" id="decompress"></a>

The Decompress operation detects the archive format from the file extension and supports the following formats:

- `.zip`
- `.gz` and `.gzip`
- `.tar`
- `.tar.gz` and `.tgz`

When you decompress a `.tar.gz` or `.tgz` archive, the node extracts all member files in a single step. You don't need to decompress the gzip layer separately.

- **Input Binary Field(s)**: Enter the name of the fields in the input data that contain the binary files you want to decompress. To decompress more than one file, use a comma-separated list.
- **Output Prefix**: Enter a prefix to add to the output file name. The node uses this prefix, followed by an incrementing index, to name each extracted file.

{% hint style="warning" %}
#### Unsupported formats

If you pass a file with an unsupported extension, the node throws an error instead of silently producing empty output. Supported formats are `zip`, `gzip`, `tar`, `tar.gz`, and `tgz`.
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.compression integration templates](https://n8n.io/integrations/compression) or [search all templates](https://n8n.io/workflows/)
