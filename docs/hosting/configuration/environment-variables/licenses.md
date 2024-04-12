---
title: License environment variables
description: Environment variables to configure license settings in n8n, including options to hide the usage page, manage license activation and auto-renewal settings, and specify the server URL for license retrieval.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# License environment variables

/// note | File-based configuration
You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](/hosting/configuration/configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.
///

To enable enterprise features, you need to add your enterprise license key. You can do this through the UI, or using environment variables. Refer to [Enterprise license key](/enterprise-key/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_HIDE_USAGE_PAGE` | boolean | `false` | Hide the usage and plans page in the app. |
| `N8N_LICENSE_ACTIVATION_KEY` | String | `''` | Activation key to initialize license. Not applicable if the n8n instance was already activated. |
| `N8N_LICENSE_AUTO_RENEW_ENABLED` | Boolean | `true` | Enables (true) or disables (false) autorenewal for licenses. |
| `N8N_LICENSE_AUTO_RENEW_OFFSET` | Number | `60 * 60 * 72` (72 hours) | Time in seconds before expiry a license should automatically renew. |
| `N8N_LICENSE_SERVER_URL` | String | `http://license.n8n.io/v1` | Server URL to retrieve license. |
