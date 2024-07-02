---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

--8<-- "_snippets/self-hosting/file-based-configuration.md"

To enable enterprise features, you need to add your enterprise license key. You can do this through the UI, or using environment variables. Refer to [Enterprise license key](/enterprise-key/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_HIDE_USAGE_PAGE` | boolean | `false` | Hide the usage and plans page in the app. |
| `N8N_LICENSE_ACTIVATION_KEY` | String | `''` | Activation key to initialize license. Not applicable if the n8n instance was already activated. |
| `N8N_LICENSE_AUTO_RENEW_ENABLED` | Boolean | `true` | Enables (true) or disables (false) autorenewal for licenses. <br>If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable Enterprise features. |
| `N8N_LICENSE_AUTO_RENEW_OFFSET` | Number | `60 * 60 * 72` (72 hours) | Time in seconds before expiry a license should automatically renew. |
| `N8N_LICENSE_SERVER_URL` | String | `http://license.n8n.io/v1` | Server URL to retrieve license. |
| `HTTP_PROXY_LICENSE_SERVER` | String | `http://use:pass@proxy:port`| Proxy server URL for HTTP requests to retrieve license. |
| `HTTPS_PROXY_LICENSE_SERVER` | String | `https://use:pass@proxy:port` | Proxy server URL for HTTPS requests to retrieve license. |