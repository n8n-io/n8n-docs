---
contentType: howto
---

# Grafana

Enable the Prometheus metrics endpoint in n8n, then connect Grafana through a Prometheus instance to visualize your n8n data. Refer to [Enable Prometheus metrics](../configuration/configuration-examples/prometheus.md) before following this guide.

/// info | Feature availability
The `/metrics` endpoint isn't available on n8n Cloud.
///

## Configure Prometheus to scrape n8n

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

## Add Prometheus as a Grafana data source

1. In Grafana, go to **Connections** > **Data sources**.
2. Select **Add new data source**.
3. Select **Prometheus**.
4. Set **Prometheus server URL** to your Prometheus instance address, for example `http://prometheus:9090`.
5. Select **Save & test**.

Grafana confirms the connection with a success message.

## Webhook observability

n8n exposes a `n8n_webhook_request_duration_seconds` histogram for every webhook call. Enable these environment variables to collect it:

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_METRICS_INCLUDE_WEBHOOK_METRICS` | `false` | Exposes the `n8n_webhook_request_duration_seconds` histogram. |
| `N8N_METRICS_INCLUDE_WORKFLOW_INFO` | `false` | Exposes the `n8n_workflow_info` gauge for human-readable workflow names. See [Workflow name lookup](#workflow-name-lookup). |

### What the metric tracks

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

### Dashboard ideas

| Panel | PromQL |
|-------|--------|
| Request rate per workflow | `sum by (workflow_id) (rate(n8n_webhook_request_duration_seconds_count[5m]))` |
| p95 latency across all webhooks | `histogram_quantile(0.95, sum by (le) (rate(n8n_webhook_request_duration_seconds_bucket[5m])))` |
| p95 latency per workflow | `histogram_quantile(0.95, sum by (le, workflow_id) (rate(n8n_webhook_request_duration_seconds_bucket[5m])))` |
| Error rate (non-2xx) | `sum by (workflow_id) (rate(n8n_webhook_request_duration_seconds_count{status_code!="2.."}[5m]))` |
| Average request duration | `rate(n8n_webhook_request_duration_seconds_sum[5m]) / rate(n8n_webhook_request_duration_seconds_count[5m])` |

## Form submission observability

n8n exposes a `n8n_form_submission_duration_seconds` histogram for every form submission. Enable these environment variables to collect it:

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_METRICS_INCLUDE_FORM_METRICS` | `false` | Exposes the `n8n_form_submission_duration_seconds` histogram. |
| `N8N_METRICS_INCLUDE_WORKFLOW_INFO` | `false` | Exposes the `n8n_workflow_info` gauge for human-readable workflow names. See [Workflow name lookup](#workflow-name-lookup). |

### What the metric tracks

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

/// note | No method label
Form submissions don't include a `method` label because n8n only accepts form data via `POST`.
///

### Dashboard ideas

| Panel | PromQL |
|-------|--------|
| Submission rate per workflow | `sum by (workflow_id) (rate(n8n_form_submission_duration_seconds_count[5m]))` |
| p95 processing time across all forms | `histogram_quantile(0.95, sum by (le) (rate(n8n_form_submission_duration_seconds_bucket[5m])))` |
| p95 processing time per workflow | `histogram_quantile(0.95, sum by (le, workflow_id) (rate(n8n_form_submission_duration_seconds_bucket[5m])))` |
| Error rate (non-2xx) | `sum by (workflow_id) (rate(n8n_form_submission_duration_seconds_count{status_code!="2.."}[5m]))` |
| Average processing duration | `rate(n8n_form_submission_duration_seconds_sum[5m]) / rate(n8n_form_submission_duration_seconds_count[5m])` |

## Workflow name lookup

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