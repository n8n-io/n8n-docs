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

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_AUTH_EXCLUDE_ENDPOINTS` | String | - | Exclude endpoints from authentication checks. Provide multiple endpoints as a colon-seperated list ("`:`"). The endpoints must not start with a forward slash ("`/`"). |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
