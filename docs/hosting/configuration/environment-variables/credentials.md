---
title: Credentials environment variables
description: Manage default credentials and override them through environment variables your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Credentials environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Enable credential overwrites using the following environment variables. Refer to [Credential overwrites](/embed/configuration.md#credential-overwrites) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | * | - | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String | - | The API endpoint to fetch credentials. |
| `CREDENTIALS_OVERWRITE_PERSISTENCE` | Boolean | `false` | Enable database persistence for credential overwrites. Required for multiinstance or queue mode to propagate overwrites to workers through a publish/subscribe approach. |
| `CREDENTIALS_DEFAULT_NAME` | String | `My credentials` | The default name for credentials. |
