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
You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](/hosting/configuration/configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.
///

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
