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
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | Boolean | `true` | Set to `true` to block access to all files in the `.n8n` directory and user defined configuration files. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Boolean | `false` | Set to `true` to try to set 0600 permissions for the settings file, giving only the owner read and write access. |
| `N8N_RESTRICT_FILE_ACCESS_TO` | String |  | Limits access to files in these directories. Provide multiple files as a colon-separated list ("`:`"). |
| `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number | 90 | Number of days to consider a workflow abandoned if it's not executed. |
| `N8N_SECURE_COOKIE` | Boolean | `true` | Ensures that cookies are only sent over HTTPS, enhancing security.|
| `N8N_SAMESITE_COOKIE` | Enum string: `strict`, `lax`, `none` | `lax` | Controls cross-site cookie behavior ([learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)):<ul><li>`strict`: Sent only for first-party requests.</li><li>`lax` (default): Sent with top-level navigation requests.</li><li>`none`: Sent in all contexts (requires HTTPS).</li></ul> |
