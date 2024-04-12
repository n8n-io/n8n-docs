---
title: Security environment variables
description: Configure authentication and environment variable access in self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Security environment variables

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.
///

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
