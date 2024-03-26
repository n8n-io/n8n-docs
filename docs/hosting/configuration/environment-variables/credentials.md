---
title: Managing credentials
description: Manage default credentials and override them through environment variables your self-hosted n8n instance.
contentType: reference
hide:
  - toc
---

# Managing credentials

Enabling overwrites for credentials allows you to set default values for credentials which get automatically populated. The user can't see or change these credentials. The format is `{ CREDENTIAL_NAME: { PARAMETER: VALUE }}`.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | * | - | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String | - | The API endpoint to fetch credentials. |
| `CREDENTIALS_DEFAULT_NAME` | String | `My credentials` | The default name for credentials. |
