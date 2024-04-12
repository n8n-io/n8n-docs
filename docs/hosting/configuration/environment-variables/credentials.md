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

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.
///

Enable credential overwrites using the following environment variables. Refer to [Credential overwrites](/embed/configuration/#credential-overwrites/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | * | - | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String | - | The API endpoint to fetch credentials. |
| `CREDENTIALS_DEFAULT_NAME` | String | `My credentials` | The default name for credentials. |
