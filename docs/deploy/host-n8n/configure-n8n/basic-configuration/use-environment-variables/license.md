---
title: License environment variables
contentType: reference
hide:
  - toc
  - tags
nodeTitle: License
originalFilePath: hosting/configuration/environment-variables/licenses.md
originalUrl: https://docs.n8n.io/hosting/configuration/environment-variables/licenses
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/license
description: >-
  Environment variables to configure license settings in n8n, including options
  to hide the usage page, manage license activation and auto-renewal settings,
  and specify the server URL for license retrie
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
tags:
  - environment variables
---

# License

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WWmlKw7GKa6dRtz6RUkf/" %}

To enable certain licensed features, you must first activate your license. You can do this either through the UI or by setting environment variables. For more information, see [license key](../../manage-your-license.md).

| Variable                                  | Type    | Default                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------- | ------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N8N_HIDE_USAGE_PAGE`                     | boolean | `false`                        | Hide the usage and plans page in the app.                                                                                                                                                                                                                                                                                                                                                                                           |
| `N8N_LICENSE_ACTIVATION_KEY`              | String  | `''`                           | Activation key to initialize license. Not applicable if the n8n instance was already activated.                                                                                                                                                                                                                                                                                                                                     |
| `N8N_LICENSE_AUTO_RENEW_ENABLED`          | Boolean | `true`                         | <p>Enables (true) or disables (false) autorenewal for licenses.<br>If disabled, you need to manually renew the license every 10 days by navigating to <strong>Settings</strong> > <strong>Usage and plan</strong>, and pressing <code>F5</code>. Failure to renew the license will disable all licensed features.</p>                                                                                                               |
| `N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN` | Boolean | `true`                         | <p>Controls whether the instance releases <a href="https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#entitlement-n8n">floating entitlements</a> back to the pool upon shutdown. Set to <code>true</code> to allow other instances to reuse the entitlements, or <code>false</code> to retain them.<br>For production instances that must always keep their licensed features, set this to <code>false</code>.</p> |
| `N8N_LICENSE_SERVER_URL`                  | String  | `https://license.n8n.io/v1`    | Server URL to retrieve license.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `N8N_LICENSE_TENANT_ID`                   | Number  | `1`                            | Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n.                                                                                                                                                                                                                                                                                                                                      |
| `https_proxy_license_server`              | String  | `https://user:pass@proxy:port` | Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase.                                                                                                                                                                                                                                                                                                                                  |
