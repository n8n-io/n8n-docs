---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Binary data
description: Understand and use binary data in n8n.
contentType: overview
tags:
  - binary data
hide:
  - tags
---

# Binary data

Binary data is any file-type data, such as image files or documents.

This page collects resources relating to binary data in n8n.

## Working with binary data in your workflows

You can process binary data in n8n workflows. n8n provides nodes to help you work with binary data. You can also use code.

### Nodes

There are three key nodes dedicated to handling binary data files:

- [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) to read and write files from/to the machine where n8n is running.
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/) to take input data and output it as a file.
- [Extract From File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/) to get data from a binary format and convert it to JSON.

There are separate nodes for working with XML and HTML data:

* [HTML](/integrations/builtin/core-nodes/n8n-nodes-base.html/)
* [XML](/integrations/builtin/core-nodes/n8n-nodes-base.xml/)

And nodes for performing common tasks:

* [Compression](/integrations/builtin/core-nodes/n8n-nodes-base.compression/)
* [Edit Image](/integrations/builtin/core-nodes/n8n-nodes-base.editimage/)
* [FTP](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/)

You can trigger a workflow based on changes to a local file using the [Local File trigger](/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger/).

To split or concatenate binary data items, use the [data transformation nodes](/data/#data-transformation-nodes).

### Code

You can use the [Code node](/code/code-node/) to manipulate binary data in your workflows. For example, [Get the binary data buffer](/code/cookbook/code-node/get-binary-data-buffer/): get the binary data available in your workflow.


## Configure binary data mode when self-hosting

You can configure how your self-hosted n8n instance handles binary data using the [Binary data environment variables](/hosting/configuration/environment-variables/binary-data). This includes tasks such as setting the storage path and choosing how to store binary data.

Your configuration affects how well n8n scales: [Scaling | Binary data filesystem mode](/hosting/scaling/binary-data/).

Reading and writing binary files can have security implications. If you want to disable reading and writing binary data, use the `NODES_EXCLUDE` environment variable. Refer to [Environment variables | Nodes](/hosting/configuration/environment-variables/nodes/) for more information.
