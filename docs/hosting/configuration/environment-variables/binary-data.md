---
title: Binary data environment variables
description: Customize binary data storage modes and paths with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Binary data environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

By default, n8n uses memory to store binary data. Enterprise users can choose to use an external service instead. Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data. 


| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_AVAILABLE_BINARY_DATA_MODES` | String | `filesystem` | A comma separated list of available binary data modes. |
| `N8N_BINARY_DATA_STORAGE_PATH` | String | `N8N_USER_FOLDER/binaryData` | The path where n8n stores binary data. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | String | `default` | The default binary data mode. `default` keeps binary data in memory. Set to `filesystem` to use the filesystem, or `s3` to AWS S3, or `database` to use the DB. Note that binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. This may change in future. |
