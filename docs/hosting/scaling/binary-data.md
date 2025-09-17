---
title: Scaling binary data in n8n
description: How to handle large files without degrading n8n's performance.
contentType: howto
---

# Binary data

Binary data is any file-type data, such as image files or documents generated or processed during the execution of a workflow. 

## Enable filesystem mode

When handling binary data, n8n keeps the data in memory by default. This can cause crashes when working with large files. 

To avoid this, change the `N8N_DEFAULT_BINARY_DATA_MODE` [environment variable](/hosting/configuration/environment-variables/binary-data.md) to `filesystem`. This causes n8n to save data to disk, instead of using memory.

If you're using queue mode, keep this to `default`. n8n doesn't support filesystem mode with queue mode.

## Binary data pruning

n8n executes binary data pruning as part of execution data pruning. Refer to [Execution data | Enable executions pruning](/hosting/scaling/execution-data.md#enable-executions-pruning) for details. 

If you configure multiple binary data modes, binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. Refer to [External storage](/hosting/scaling/external-storage.md#usage) for details. 
