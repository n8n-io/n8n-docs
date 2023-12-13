---
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

You can process binary data in n8n workflows. n8n provides nodes to support many tasks. You can also use code to work with binary data. 

### Nodes

There are three key nodes dedicated to handling binary data:

* [Read Binary Files](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfiles/): load a file from the host machine running n8n.
* [Write Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.writebinaryfile/): write a file to the host machine running n8n.
* [Convert to/from binary data](/integrations/builtin/core-nodes/n8n-nodes-base.movebinarydata/): transform data between JSON and binary formats.

There are nodes for working with specific file types:

* [iCalendar](/integrations/builtin/core-nodes/n8n-nodes-base.ical/)
* [Read PDF](/integrations/builtin/core-nodes/n8n-nodes-base.readpdf/)
* [Spreadsheet File](/integrations/builtin/core-nodes/n8n-nodes-base.spreadsheetfile/)
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

You can configure how your self-hosted n8n instance handles binary data using the [Binary data environment variables](/hosting/environment-variables/environment-variables/#binary-data). This includes tasks such as setting the storage path and choosing how to store binary data.

Your configuration affects how well n8n scales: [Scaling | Binary data filesystem mode](/hosting/scaling/binary-data/).

Reading and writing binary files can have security implications. If you want to disable reading and writing binary data, use the `NODES_EXCLUDE` environment variable. Refer to [Environment variables | Nodes](https://docs.n8n.io/hosting/environment-variables/environment-variables/#nodes) for more information.
