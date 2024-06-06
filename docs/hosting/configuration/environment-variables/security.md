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

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
| `N8N_RESTRICT_FILE_ACCESS_TO` | String |  | Allows access only to files in these directories. Provide multiple files as a colon-separated list ("`:`"). |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | Boolean | `true` | If set to `true`, blocks access to all files in the ".n8n" directory and user defined configuration files. |
| `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number | 90 | Number of days to consider a workflow abandoned if it's not executed. |
| `N8N_SECURE_COOKIE` | Boolean | `true` | Ensures that cookies are only sent over HTTPS, enhancing security.|