---
title: External secrets environment variables
description: Configure the interval for checking updates to external secrets in self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# External secrets environment variables

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.
///

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](/external-secrets/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |
