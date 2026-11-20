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

In queue mode, binary data storage also backs webhook responses too large to send through the queue. Refer to [Large webhook responses](enable-queue-mode.md#large-webhook-responses) for details.

## Binary data storage mode <a href="#binary-data-storage-mode" id="binary-data-storage-mode"></a>

n8n saves binary data to disk by default. The `N8N_DEFAULT_BINARY_DATA_MODE` [environment variable](../basic-configuration/use-environment-variables/binary-data.md) is `filesystem` unless you set it.

In queue mode, the default is `database` instead. If you use `filesystem` in queue mode, all main instances, workers, and webhook processors that handle binary data must access the same shared volume at the same configured path.

## Binary data pruning <a href="#binary-data-pruning" id="binary-data-pruning"></a>

n8n executes binary data pruning as part of execution data pruning. Refer to [Execution data | Enable executions pruning](manage-execution-data.md#enable-executions-pruning) for details. 

If you configure multiple binary data modes, binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. Refer to [External storage](use-external-storage.md#usage) for details. 

## Related resources

* [Scaling](../scaling.md)
* [Measure performance](measure-performance.md)
* [Enable queue mode](enable-queue-mode.md)
* [Control concurrency](control-concurrency.md)
* [Manage execution data](manage-execution-data.md)
* [Use external storage](use-external-storage.md)
* [Fix memory issues](fix-memory-issues.md)
