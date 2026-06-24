---
title: Security environment variables
description: >-
  Configure authentication and environment variable access in self-hosted n8n
  instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Security
originalFilePath: hosting/configuration/environment-variables/security.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/security'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security
layout:
  description:
    visible: false
---

# Security environment variables <a href="#security-environment-variables" id="security-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WWmlKw7GKa6dRtz6RUkf/" %}

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | Boolean | `false` | Whether to allow users to access environment variables in expressions and the Code node (false) or not (true). |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | Boolean | `true` | Set to `true` to block access to all files in the `.n8n` directory and user defined configuration files. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Boolean | `false` | Set to `true` to try to set 0600 permissions for the settings file, giving only the owner read and write access. |
| `N8N_RESTRICT_FILE_ACCESS_TO` | String |  | Limits access to files in these directories. Provide multiple files as a semicolon-separated list ("`;`"). |
| `N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW` | Number | 90 | Number of days to consider a workflow abandoned if it's not executed. |
|`N8N_CONTENT_SECURITY_POLICY`| String | `{}` | Set [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers as [helmet.js](https://helmetjs.github.io/#content-security-policy) nested directives object. For example, `{ "frame-ancestors": ["http://localhost:3000"] }` |
| `N8N_SECURE_COOKIE` | Boolean | `true` | Ensures that cookies are only sent over HTTPS, enhancing security.|
| `N8N_SAMESITE_COOKIE` | Enum string: `strict`, `lax`, `none` | `lax` | Controls cross-site cookie behavior ([learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)):<ul><li>`strict`: Sent only for first-party requests.</li><li>`lax` (default): Sent with top-level navigation requests.</li><li>`none`: Sent in all contexts (requires HTTPS).</li></ul> |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | Boolean | `false` | Set to `true` to prevent the [Git node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.git) from working with bare repositories, enhancing security. |
| `N8N_GIT_NODE_ENABLE_HOOKS` | Boolean | `false` | Set to `true` to allow the [Git node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.git) to execute Git hooks. |

## Security policy using environment variables <a href="#security-policy-using-environment-variables" id="security-policy-using-environment-variables"></a>

Set `N8N_SECURITY_POLICY_MANAGED_BY_ENV` to `true` to manage the security policy from environment variables. See [Manage instance settings using environment variables](../../manage-settings-using-environment-variables.md) for how the activation pattern works.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Hlnt6L4Wk4TL9ywOlK1S/" %}
