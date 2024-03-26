---
title: Managing binary data
description: Environment variables to customize binary data storage modes and paths.
contentType: reference
hide:
  - toc
---

# Managing binary data

By default, n8n uses memory to store binary data. Enterprise users can choose to use an external service instead. Refer to [External storage](/hosting/scaling/external-storage/) for more information on using external storage for binary data.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_AVAILABLE_BINARY_DATA_MODES` | String | `filesystem` | A comma separated list of available binary data modes. |
| `N8N_BINARY_DATA_STORAGE_PATH` | String | `N8N_USE_FOLDER/binaryData` | The path where n8n stores binary data. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | String | `default` | The default binary data mode. `default` keeps binary data in memory. Set to `filesystem` to use the filesystem, or `s3` to AWS S3. |