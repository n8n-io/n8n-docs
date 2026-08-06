---
title: Binary data
description: Understand and use binary data in n8n.
contentType: overview
tags:
  - binary data
hide:
  - tags
nodeTitle: Work with files and images
originalFilePath: data/specific-data-types/binary-data.md
originalUrl: 'https://docs.n8n.io/data/specific-data-types/binary-data'
url: >-
  https://docs.n8n.io/build/work-with-data/handle-special-data-types/work-with-files-and-images
layout:
  description:
    visible: false
---

# Binary data <a href="#binary-data" id="binary-data"></a>

Binary data is any file-type data, such as image files or documents.

This page collects resources relating to binary data in n8n.

## Working with binary data in your workflows <a href="#working-with-binary-data-in-your-workflows" id="working-with-binary-data-in-your-workflows"></a>

You can process binary data in n8n workflows. n8n provides nodes to help you work with binary data. You can also use code.

### Nodes <a href="#nodes" id="nodes"></a>

There are three key nodes dedicated to handling binary data files:

- [Convert to File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.converttofile) to take input data and output it as a file.
- [Extract From File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.extractfromfile) to get data from a binary format and convert it to JSON.
- [Read/Write Files from Disk](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile) to read and write files from/to the machine where n8n is running.

There are separate nodes for working with XML and HTML data:

* [HTML](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.html)
* [XML](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.xml)

And nodes for performing common tasks:

* [Compression](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.compression)
* [Edit Image](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.editimage)
* [FTP](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.ftp)

You can trigger a workflow based on changes to a local file using the [Local File trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.localfiletrigger).

To split or concatenate binary data items, use the [data transformation nodes](../expressions-versus-data-nodes.md#other-data-transformation-nodes).

### Code <a href="#code" id="code"></a>

You can use the [Code node](../../code-in-n8n/using-the-code-node.md) to manipulate binary data in your workflows. For example, [Get the binary data buffer](../../code-in-n8n/cookbook/code-node/get-the-binary-data-buffer.md): get the binary data available in your workflow.


## Configure binary data mode when self-hosting <a href="#configure-binary-data-mode-when-self-hosting" id="configure-binary-data-mode-when-self-hosting"></a>

You can configure how your self-hosted n8n instance handles binary data using the [Binary data environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/binary-data). This includes tasks such as setting the storage path and choosing how to store binary data.

Your configuration affects how well n8n scales: [Scaling | Binary data filesystem mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/handle-binary-data).

Reading and writing binary files can have security implications. If you want to disable reading and writing binary data, use the `NODES_EXCLUDE` environment variable. Refer to [Environment variables | Nodes](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/nodes) for more information.
