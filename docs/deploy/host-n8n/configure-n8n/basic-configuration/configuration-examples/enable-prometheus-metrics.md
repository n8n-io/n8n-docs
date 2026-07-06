---
title: Enable Prometheus metrics
description: Enable Prometheus metrics endpoint.
contentType: howto
nodeTitle: Enable Prometheus metrics
originalFilePath: hosting/configuration/configuration-examples/prometheus.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/prometheus'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics
layout:
  description:
    visible: false
---

# Enable Prometheus metrics <a href="#enable-prometheus-metrics" id="enable-prometheus-metrics"></a>

To collect and expose metrics, n8n uses the [prom-client](https://www.npmjs.com/package/prom-client) library.

The `/metrics` endpoint is disabled by default, but it's possible to enable it using the `N8N_METRICS` environment variable.

{% hint style="warning" %}
**Don't expose the metrics endpoint publicly**

Only expose the `/metrics` endpoint to internal services that consume the Prometheus data. Don't make it accessible on the public internet, as it can reveal sensitive operational data about your n8n instance.
{% endhint %}

```bash
export N8N_METRICS=true
```

Refer to the respective [Environment Variables](../use-environment-variables/endpoints.md) (`N8N_METRICS_INCLUDE_*`) for configuring which metrics and labels should get exposed.

Both `main` and `worker` instances are able to expose metrics.

For guidance on connecting Grafana to Prometheus to visualize n8n metrics, refer to [Grafana](../../../keep-n8n-running/visualize-metrics-with-grafana.md).

## Queue metrics <a href="#queue-metrics" id="queue-metrics"></a>

To enable queue metrics, set the `N8N_METRICS_INCLUDE_QUEUE_METRICS` env var to `true`. You can adjust the refresh rate with `N8N_METRICS_QUEUE_METRICS_INTERVAL`.

n8n gathers these metrics from Bull and exposes them on the main instances. On multi-main setups, when aggregating queries, you can identify the leader using the `instance_role_leader` gauge, set to `1` for the leader main and `0` otherwise.

```
# HELP n8n_scaling_mode_queue_jobs_active Current number of jobs being processed across all workers in scaling mode. <a href="#help-n8nscalingmodequeuejobsactive-current-number-of-jobs-being-processed-across-all-workers-in-scaling-mode" id="help-n8nscalingmodequeuejobsactive-current-number-of-jobs-being-processed-across-all-workers-in-scaling-mode"></a>
# TYPE n8n_scaling_mode_queue_jobs_active gauge <a href="#type-n8nscalingmodequeuejobsactive-gauge" id="type-n8nscalingmodequeuejobsactive-gauge"></a>
n8n_scaling_mode_queue_jobs_active 0

# HELP n8n_scaling_mode_queue_jobs_completed Total number of jobs completed across all workers in scaling mode since instance start. <a href="#help-n8nscalingmodequeuejobscompleted-total-number-of-jobs-completed-across-all-workers-in-scaling-mode-since-instance-start" id="help-n8nscalingmodequeuejobscompleted-total-number-of-jobs-completed-across-all-workers-in-scaling-mode-since-instance-start"></a>
# TYPE n8n_scaling_mode_queue_jobs_completed counter <a href="#type-n8nscalingmodequeuejobscompleted-counter" id="type-n8nscalingmodequeuejobscompleted-counter"></a>
n8n_scaling_mode_queue_jobs_completed 0

# HELP n8n_scaling_mode_queue_jobs_failed Total number of jobs failed across all workers in scaling mode since instance start. <a href="#help-n8nscalingmodequeuejobsfailed-total-number-of-jobs-failed-across-all-workers-in-scaling-mode-since-instance-start" id="help-n8nscalingmodequeuejobsfailed-total-number-of-jobs-failed-across-all-workers-in-scaling-mode-since-instance-start"></a>
# TYPE n8n_scaling_mode_queue_jobs_failed counter <a href="#type-n8nscalingmodequeuejobsfailed-counter" id="type-n8nscalingmodequeuejobsfailed-counter"></a>
n8n_scaling_mode_queue_jobs_failed 0

# HELP n8n_scaling_mode_queue_jobs_waiting Current number of enqueued jobs waiting for pickup in scaling mode. <a href="#help-n8nscalingmodequeuejobswaiting-current-number-of-enqueued-jobs-waiting-for-pickup-in-scaling-mode" id="help-n8nscalingmodequeuejobswaiting-current-number-of-enqueued-jobs-waiting-for-pickup-in-scaling-mode"></a>
# TYPE n8n_scaling_mode_queue_jobs_waiting gauge <a href="#type-n8nscalingmodequeuejobswaiting-gauge" id="type-n8nscalingmodequeuejobswaiting-gauge"></a>
n8n_scaling_mode_queue_jobs_waiting 0
```
