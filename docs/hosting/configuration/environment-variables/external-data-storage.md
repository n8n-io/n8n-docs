---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: External data storage environment variables
description: Environment variables to configure external data storage for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
  - external storage
  - storage
hide:
  - toc
  - tags
---

# External data storage environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Refer to [External storage](/hosting/scaling/external-storage/) for more information on using external storage for binary data.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_STORAGE_S3_HOST` | String | - | Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com` |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME` | String | - | Name of the n8n bucket in S3-compatible external storage. |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` | String | - | Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`|
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY` | String | - | Access key in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET` | String | - | Access secret in S3-compatible external storage. |
