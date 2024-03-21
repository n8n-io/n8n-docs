---
title: Prometheus
description: Enable Prometheus metrics endpoint.
contentType: howto
---

# Prometheus

/// note | Experimental
Prometheus metrics are an experimental feature.
///
To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client) library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

Refer to the respective [Environment Variables](/hosting/configuration/environment-variables/#endpoints) (`N8N_METRICS_INCLUDE_*`) for configuring which metrics and labels should get exposed.
