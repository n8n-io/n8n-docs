---
title: Endpoints environment variables
description: >-
  Customize the application's API and webhook endpoints with environment
  variables for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Endpoints
originalFilePath: hosting/configuration/environment-variables/endpoints.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/endpoints'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/endpoints
layout:
  description:
    visible: false
---

# Endpoints environment variables <a href="#endpoints-environment-variables" id="endpoints-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WWmlKw7GKa6dRtz6RUkf/" %}

This page lists environment variables for customizing endpoints in n8n.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_PAYLOAD_SIZE_MAX` | Number | `16` | The maximum payload size in MiB. The default is 16 MiB, but this can be increased by adjusting the variable to a higher value. The n8n instance needs to be restarted to apply the new setting. Note: Increasing the payload size requires more memory and CPU resources and may impact performance. Ensure your infrastructure can handle larger payloads. |
| `N8N_FORMDATA_FILE_SIZE_MAX` | Number | `200` | Max payload size for files in form-data webhook payloads in MiB. |
| `N8N_METRICS` | Boolean | `false` | Whether to enable the `/metrics` endpoint. |
| `N8N_METRICS_PREFIX` | String | `n8n_` | Optional prefix for n8n specific metrics names. |
| `N8N_METRICS_INCLUDE_DEFAULT_METRICS` | Boolean | `true` | Whether to expose default system and node.js metrics. |
| `N8N_METRICS_INCLUDE_CACHE_METRICS` | Boolean | false | Whether to include metrics (true) for cache hits and misses, or not include them (false). |
| `N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS` | Boolean | `false` | Whether to include metrics (true) for events, or not include them (false). |
| `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` | Boolean | `false` | Whether to include a label for the workflow ID on workflow metrics. |
| `N8N_METRICS_INCLUDE_NODE_TYPE_LABEL` | Boolean | `false` | Whether to include a label for the node type on node metrics. |
| `N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL` | Boolean | `false` | Whether to include a label for the credential type on credential metrics. |
| `N8N_METRICS_INCLUDE_API_ENDPOINTS` | Boolean | `false` | Whether to expose metrics for API endpoints. |
| `N8N_METRICS_INCLUDE_API_PATH_LABEL` | Boolean | `false` | Whether to include a label for the path of API invocations. |
| `N8N_METRICS_INCLUDE_API_METHOD_LABEL` | Boolean | `false` | Whether to include a label for the HTTP method (GET, POST, ...) of API invocations. |
| `N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL` | Boolean | `false` | Whether to include a label for the HTTP status code (200, 404, ...) of API invocations. |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | Boolean | `false` | Whether to include metrics for jobs in scaling mode. |
| `N8N_METRICS_QUEUE_METRICS_INTERVAL` | Integer | `20` | How often (in seconds) to update queue metrics. |
| `N8N_METRICS_INCLUDE_SSRF_METRICS` | Boolean | `false` | Whether to include metrics for SSRF protection checks. |
| `N8N_METRICS_INCLUDE_DNS_CACHE_METRICS` | Boolean | `false` | Whether to include metrics for the DNS cache (currently only used by SSRF protection). |
| `N8N_ENDPOINT_REST` | String | `rest` | The path used for REST endpoint. |
| `N8N_ENDPOINT_WEBHOOK` | String | `webhook` | The path used for webhook endpoint. |
| `N8N_ENDPOINT_WEBHOOK_TEST` | String | `webhook-test` | The path used for test-webhook endpoint. |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | String | `webhook-waiting` | The path used for waiting-webhook endpoint. |
| `N8N_ENDPOINT_HEALTH` | String | `healthz` | The path used for health check endpoint. |
| `WEBHOOK_URL` | String | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy. See [here](../configuration-examples/configure-webhook-urls-with-reverse-proxy.md) for more details. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Boolean | `false` | Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes. |
