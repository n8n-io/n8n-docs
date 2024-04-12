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
You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](/hosting/configuration/configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.
///

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](/external-secrets/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |
