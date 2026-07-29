---
title: Scaling binary data in n8n
description: How to handle large files without degrading n8n's performance.
contentType: howto
nodeTitle: Handle binary data
originalFilePath: hosting/scaling/binary-data.md
originalUrl: 'https://docs.n8n.io/hosting/scaling/binary-data'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/handle-binary-data'
layout:
  description:
    visible: false
---

# Binary data <a href="#binary-data" id="binary-data"></a>

Binary data is any file-type data, such as image files or documents generated or processed during the execution of a workflow. 

## Enable filesystem mode <a href="#enable-filesystem-mode" id="enable-filesystem-mode"></a>

When handling binary data, n8n keeps the data in memory by default. This can cause crashes when working with large files. 

To avoid this, change the `N8N_DEFAULT_BINARY_DATA_MODE` [environment variable](../basic-configuration/use-environment-variables/binary-data.md) to `filesystem`. This causes n8n to save data to disk, instead of using memory.

If you're using queue mode, switch this to `database`. n8n doesn't support `filesystem` mode with queue mode.

## Binary data pruning <a href="#binary-data-pruning" id="binary-data-pruning"></a>

n8n executes binary data pruning as part of execution data pruning. Refer to [Execution data | Enable executions pruning](manage-execution-data.md#enable-executions-pruning) for details. 

If you configure multiple binary data modes, binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. Refer to [External storage](use-external-storage.md#usage) for details. 
