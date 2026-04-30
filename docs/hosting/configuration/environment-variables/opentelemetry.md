---
title: OpenTelemetry environment variables
description: Configure OpenTelemetry tracing with environment variables for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# OpenTelemetry environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

n8n can export workflow and node execution traces over OTLP to an OpenTelemetry collector. Refer to [OpenTelemetry tracing](/hosting/logging-monitoring/opentelemetry.md) for details.

| Variable | Type | Default | Description | Available from | 
| :------- | :--- | :------ | :---------- | :------
| `N8N_OTEL_ENABLED` | Boolean | `false` | Whether to enable OpenTelemetry tracing. When set to `false`, n8n doesn't load the OpenTelemetry SDK. | 2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` | String | `http://localhost:4318` | Base URL of the OTLP HTTP endpoint to export traces to. n8n appends the value of `N8N_OTEL_EXPORTER_OTLP_TRACING_PATH` to this URL. |  2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_TRACING_PATH` | String | `/v1/traces` | Path appended to `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` for exporting traces. | 2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_HEADERS` | String | - | Comma-separated list of `key=value` pairs to send as HTTP headers with each OTLP request. Use this for authentication tokens or tenant headers. For example: `authorization=Bearer <token>,x-tenant=acme`. | 2.19.0 |
| `N8N_OTEL_EXPORTER_SERVICE_NAME` | String | `n8n` | Value of the `service.name` resource attribute on exported spans. | 2.19.0 |
| `N8N_OTEL_TRACES_SAMPLE_RATE` | Number | `1.0` | Fraction of traces to export, between `0` and `1`. n8n uses a trace ID ratio sampler, so all spans in a trace are either sampled or dropped together. | 2.19.0 |
| `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS` | Boolean | `true` | Whether to emit a `node.execute` span for each node execution. Set to `false` to export workflow-level spans only. | 2.19.0 |
| `N8N_OTEL_TRACES_INJECT_OUTBOUND` | Boolean | `true` | Whether to inject the W3C `traceparent`/`tracesstate` headers into outbound HTTP requests made by nodes that use n8n's HTTP helpers. | 2.19.0 |
| `N8N_OTEL_STARTUP_CONNECTIVITY_TIMEOUT_MS` | Number | `2000` | Timeout (in milliseconds) for the startup connectivity check against the OTLP endpoint. n8n logs a warning if the endpoint isn't reachable within this period. | 2.19.0 |
