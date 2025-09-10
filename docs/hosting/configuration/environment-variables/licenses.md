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

--8<-- "_snippets/self-hosting/file-based-configuration.md"

To enable certain licensed features, you must first activate your license. You can do this either through the UI or by setting environment variables. For more information, see [license key](/license-key.md).

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_HIDE_USAGE_PAGE` | boolean | `false` | Hide the usage and plans page in the app. |
| `N8N_LICENSE_ACTIVATION_KEY` | String | `''` | Activation key to initialize license. Not applicable if the n8n instance was already activated. |
| `N8N_LICENSE_AUTO_RENEW_ENABLED` | Boolean | `true` | Enables (true) or disables (false) autorenewal for licenses. <br>If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable all licensed features. |
| `N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN` | Boolean | `true` | Controls whether the instance releases [floating entitlements](/glossary.md#entitlement-n8n) back to the pool upon shutdown. Set to `true` to allow other instances to reuse the entitlements, or `false` to retain them. <br> For production instances that must always keep their licensed features, set this to `false`. |
| `N8N_LICENSE_SERVER_URL` | String | `https://license.n8n.io/v1` | Server URL to retrieve license. |
| `N8N_LICENSE_TENANT_ID` | Number | `1` | Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n. |
| `https_proxy_license_server` | String | `https://user:pass@proxy:port` | Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase. |
