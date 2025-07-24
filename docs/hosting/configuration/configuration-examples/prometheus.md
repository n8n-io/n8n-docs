---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Enable Prometheus metrics 
description: Enable Prometheus metrics endpoint.
contentType: howto
---

# Enable Prometheus metrics 

To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client){:target="_blank" .external-link} library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

```bash
export N8N_METRICS=true
```

Refer to the respective [Environment Variables](/hosting/configuration/environment-variables/endpoints.md) (`N8N_METRICS_INCLUDE_*`) for configuring which metrics and labels should get exposed.

Both `main` and `worker` instances are able to expose metrics.

## Queue metrics

To enable queue metrics, set the `N8N_METRICS_INCLUDE_QUEUE_METRICS` env var to `true`. You can adjust the refresh rate with `N8N_METRICS_QUEUE_METRICS_INTERVAL`.

Queue metrics are only available for the `main` instance in single-main mode.

```
# HELP n8n_scaling_mode_queue_jobs_active Current number of jobs being processed across all workers in scaling mode.
# TYPE n8n_scaling_mode_queue_jobs_active gauge
n8n_scaling_mode_queue_jobs_active 0

# HELP n8n_scaling_mode_queue_jobs_completed Total number of jobs completed across all workers in scaling mode since instance start.
# TYPE n8n_scaling_mode_queue_jobs_completed counter
n8n_scaling_mode_queue_jobs_completed 0

# HELP n8n_scaling_mode_queue_jobs_failed Total number of jobs failed across all workers in scaling mode since instance start.
# TYPE n8n_scaling_mode_queue_jobs_failed counter
n8n_scaling_mode_queue_jobs_failed 0

# HELP n8n_scaling_mode_queue_jobs_waiting Current number of enqueued jobs waiting for pickup in scaling mode.
# TYPE n8n_scaling_mode_queue_jobs_waiting gauge
n8n_scaling_mode_queue_jobs_waiting 0
```
