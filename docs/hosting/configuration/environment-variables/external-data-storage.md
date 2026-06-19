---
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

Refer to [External storage](/hosting/scaling/external-storage.md) for more information on using external storage for binary data.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_STORAGE_S3_HOST` | String | - | Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com` |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME` | String | - | Name of the n8n bucket in S3-compatible external storage. |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` | String | - | Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`|
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY` | String | - | Access key in S3-compatible external storage |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET` | String | - | Access secret in S3-compatible external storage. |
| `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` | Boolean | - | Use automatic credential detection to authenticate S3 calls for external storage. This will ignore the access key and access secret and use the default [credential provider chain](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain). |

## Azure Blob Storage

/// info | Enterprise-tier feature
You need an [Enterprise license key](/license-key.md) to store execution data in Azure Blob Storage.
///

To store execution data in Azure Blob Storage, set `N8N_EXECUTION_DATA_STORAGE_MODE` to `azure` and configure the variables below. `N8N_EXTERNAL_STORAGE_AZURE_CONTAINER_NAME` is always required.

For authentication, choose one of these three options. n8n checks them in this order:

1. **Connection string**: set `N8N_EXTERNAL_STORAGE_AZURE_CONNECTION_STRING`. This takes precedence over the other options, so n8n ignores the account name, key, and auto-detect when you set it. It's the simplest option and works well for local testing with Azurite.
2. **Auto-detect**: set `N8N_EXTERNAL_STORAGE_AZURE_ACCOUNT_NAME` and set `N8N_EXTERNAL_STORAGE_AZURE_AUTH_AUTO_DETECT` to `true`. n8n authenticates through Azure's `DefaultAzureCredential` chain (managed identity, environment, or Azure CLI), so no key lives in your n8n configuration. Best for production on Azure.
3. **Account name and key**: set `N8N_EXTERNAL_STORAGE_AZURE_ACCOUNT_NAME` and `N8N_EXTERNAL_STORAGE_AZURE_ACCOUNT_KEY`.

Set `N8N_EXTERNAL_STORAGE_AZURE_ENDPOINT` only if you use a custom endpoint, such as Azurite or a sovereign cloud.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_STORAGE_AZURE_CONNECTION_STRING` | String | - | Connection string for Azure Blob Storage. Takes precedence over the account name and key when set. |
| `N8N_EXTERNAL_STORAGE_AZURE_ACCOUNT_NAME` | String | - | Storage account name. Use with an account key or managed identity. |
| `N8N_EXTERNAL_STORAGE_AZURE_ACCOUNT_KEY` | String | - | Storage account key. Use with the account name. |
| `N8N_EXTERNAL_STORAGE_AZURE_CONTAINER_NAME` | String | - | Name of the blob container to store execution data in. Required for Azure Blob Storage. |
| `N8N_EXTERNAL_STORAGE_AZURE_ENDPOINT` | String | - | Custom blob endpoint, for example for Azurite or sovereign clouds. |
| `N8N_EXTERNAL_STORAGE_AZURE_AUTH_AUTO_DETECT` | Boolean | `false` | Authenticate via `DefaultAzureCredential` (managed identity, environment, or Azure CLI) instead of an account key. Ignores the account key when enabled. |
