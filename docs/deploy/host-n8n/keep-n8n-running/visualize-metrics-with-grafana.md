---
contentType: howto
nodeTitle: Visualize metrics with Grafana
originalFilePath: hosting/logging-monitoring/grafana.md
originalUrl: 'https://docs.n8n.io/hosting/logging-monitoring/grafana'
url: >-
  https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/visualize-metrics-with-grafana
layout:
  description:
    visible: false
---

# Grafana <a href="#grafana" id="grafana"></a>

Enable the Prometheus metrics endpoint in n8n, then connect Grafana through a Prometheus instance to visualize your n8n data. Refer to [Enable Prometheus metrics](../configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics.md) before following this guide.

{% hint style="info" %}
**Feature availability**

The `/metrics` endpoint isn't available on n8n Cloud.
{% endhint %}

## Reusable dashboard templates <a href="#reusable-dashboard-templates" id="reusable-dashboard-templates"></a>

Once you enable Prometheus metrics for your n8n instance, you'll want to build dashboards to observe them.

n8n publishes reusable grafana dashboards for several of the supported prometheus metrics in this GitHub project:
[n8n-observability](https://github.com/n8n-io/n8n-observability)

## Configure Prometheus to scrape n8n <a href="#configure-prometheus-to-scrape-n8n" id="configure-prometheus-to-scrape-n8n"></a>

Prometheus scrapes n8n's `/metrics` endpoint on a schedule and stores the data. Grafana then queries Prometheus to display it.

Add a scrape job targeting your n8n instance in your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: n8n
    static_configs:
      - targets:
          - <n8n-host>:<n8n-port>
    metrics_path: /metrics
```

Replace `<n8n-host>` and `<n8n-port>` with your n8n instance address. The default n8n port is `5678`.

After editing, reload or restart Prometheus to apply the change.

## Add Prometheus as a Grafana data source <a href="#add-prometheus-as-a-grafana-data-source" id="add-prometheus-as-a-grafana-data-source"></a>

1. In Grafana, go to **Connections** > **Data sources**.
2. Select **Add new data source**.
3. Select **Prometheus**.
4. Set **Prometheus server URL** to your Prometheus instance address, for example `http://prometheus:9090`.
5. Select **Save & test**.

Grafana confirms the connection with a success message.

## Webhook observability <a href="#webhook-observability" id="webhook-observability"></a>

Available from n8n version 2.28.0.

n8n exposes a `n8n_webhook_request_duration_seconds` histogram for every webhook call. Enable these environment variables to collect it:

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_METRICS_INCLUDE_WEBHOOK_METRICS` | `false` | Exposes the `n8n_webhook_request_duration_seconds` histogram. |
| `N8N_METRICS_INCLUDE_WORKFLOW_INFO` | `false` | Exposes the `n8n_workflow_info` gauge for human-readable workflow names. See [Workflow name lookup](#workflow-name-lookup). |

You can find a [ready-to-use dashboard](https://github.com/n8n-io/n8n-observability/tree/main/dashboards/grafana/n8n-webhook-executions) for this histogram in our n8n-observability project.

### What the metric tracks <a href="#what-the-metric-tracks" id="what-the-metric-tracks"></a>

`n8n_webhook_request_duration_seconds` is a Prometheus histogram. For each webhook call, n8n records how long the request took (time of "request received" -> "response sent"). The metric exposes three series per label combination:

| Series | Description |
|--------|-------------|
| `_bucket{le="<bound>"}` | Cumulative count of requests that completed within `<bound>` seconds. |
| `_sum` | Total seconds spent across all requests. |
| `_count` | Total number of requests. |

Each series carries these labels:

| Label | Example | Description |
|-------|---------|-------------|
| `method` | `GET` | HTTP method of the incoming request. |
| `status_code` | `200` | HTTP status code n8n returned. |
| `webhook_path` | `294febd8-…` | UUID path that identifies the webhook endpoint. |
| `workflow_id` | `KhcGg7EmAMoa7Bmv` | ID of the workflow the webhook belongs to. |

### Dashboard ideas <a href="#dashboard-ideas" id="dashboard-ideas"></a>

| Panel | PromQL |
|-------|--------|
| Request rate per workflow | `sum by (workflow_id) (rate(n8n_webhook_request_duration_seconds_count[5m]))` |
| p95 latency across all webhooks | `histogram_quantile(0.95, sum by (le) (rate(n8n_webhook_request_duration_seconds_bucket[5m])))` |
| p95 latency per workflow | `histogram_quantile(0.95, sum by (le, workflow_id) (rate(n8n_webhook_request_duration_seconds_bucket[5m])))` |
| Error rate (non-2xx) | `sum by (workflow_id) (rate(n8n_webhook_request_duration_seconds_count{status_code!="2.."}[5m]))` |
| Average request duration | `rate(n8n_webhook_request_duration_seconds_sum[5m]) / rate(n8n_webhook_request_duration_seconds_count[5m])` |

## Form submission observability <a href="#form-submission-observability" id="form-submission-observability"></a>

Available from n8n version 2.28.0.

n8n exposes a `n8n_form_submission_duration_seconds` histogram for every form submission. Enable these environment variables to collect it:

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_METRICS_INCLUDE_FORM_METRICS` | `false` | Exposes the `n8n_form_submission_duration_seconds` histogram. |
| `N8N_METRICS_INCLUDE_WORKFLOW_INFO` | `false` | Exposes the `n8n_workflow_info` gauge for human-readable workflow names. See [Workflow name lookup](#workflow-name-lookup). |

You can find a [ready-to-use dashboard](https://github.com/n8n-io/n8n-observability/tree/main/dashboards/grafana/n8n-form-executions) for this histogram in our n8n-observability project.

### What the metric tracks <a href="#what-the-metric-tracks" id="what-the-metric-tracks"></a>

`n8n_form_submission_duration_seconds` is a Prometheus histogram. For each form submission, n8n records how long it took from the "user pressing submit" to "user getting feedback on form submission". The metric exposes three series per label combination:

| Series | Description |
|--------|-------------|
| `_bucket{le="<bound>"}` | Cumulative count of submissions that completed within `<bound>` seconds. |
| `_sum` | Total seconds spent processing all submissions. |
| `_count` | Total number of submissions. |

Each series carries these labels:

| Label | Example | Description |
|-------|---------|-------------|
| `status_code` | `200` | HTTP status code n8n returned. |
| `form_path` | `b395d2e2-…` | UUID path that identifies the form endpoint. |
| `workflow_id` | `qTzTyGlEROwSuVlY` | ID of the workflow the form belongs to. |

{% hint style="info" %}
**No method label**

Form submissions don't include a `method` label because n8n only accepts form data via `POST`.
{% endhint %}

### Dashboard ideas <a href="#dashboard-ideas" id="dashboard-ideas"></a>

| Panel | PromQL |
|-------|--------|
| Submission rate per workflow | `sum by (workflow_id) (rate(n8n_form_submission_duration_seconds_count[5m]))` |
| p95 processing time across all forms | `histogram_quantile(0.95, sum by (le) (rate(n8n_form_submission_duration_seconds_bucket[5m])))` |
| p95 processing time per workflow | `histogram_quantile(0.95, sum by (le, workflow_id) (rate(n8n_form_submission_duration_seconds_bucket[5m])))` |
| Error rate (non-2xx) | `sum by (workflow_id) (rate(n8n_form_submission_duration_seconds_count{status_code!="2.."}[5m]))` |
| Average processing duration | `rate(n8n_form_submission_duration_seconds_sum[5m]) / rate(n8n_form_submission_duration_seconds_count[5m])` |

## Workflow name lookup <a href="#workflow-name-lookup" id="workflow-name-lookup"></a>

Available from n8n version 2.28.0.

When you enable `N8N_METRICS_INCLUDE_WORKFLOW_INFO`, n8n exposes one gauge per workflow:

```
n8n_workflow_info{workflow_id="VaQPuPmx9tPpo6BX",workflow_name="My workflow"} 1
```

Join it onto any other n8n metric via `workflow_id` to replace opaque IDs with human-readable names in Grafana panels. For example, to show webhook request rate by workflow name:

```promql
sum by (workflow_name) (
  rate(n8n_webhook_request_duration_seconds_count[5m])
  * on(workflow_id) group_left(workflow_name)
  n8n_workflow_info
)
```
