---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Enable Prometheus metrics 
description: Enable Prometheus metrics endpoint.
contentType: howto
---

# Enable Prometheus metrics 

/// note | Experimental
Prometheus metrics are an experimental feature.
///
To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client){:target="_blank" .external-link} library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

Refer to the respective [Environment Variables](/hosting/configuration/environment-variables/endpoints/) (`N8N_METRICS_INCLUDE_*`) for configuring which metrics and labels should get exposed.
