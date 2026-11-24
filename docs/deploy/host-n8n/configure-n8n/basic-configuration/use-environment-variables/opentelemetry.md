---
title: OpenTelemetry environment variables
description: >-
  Configure OpenTelemetry tracing with environment variables for your
  self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: OpenTelemetry
originalFilePath: hosting/configuration/environment-variables/opentelemetry.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/opentelemetry'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/opentelemetry
layout:
  description:
    visible: false
---

# OpenTelemetry environment variables <a href="#opentelemetry-environment-variables" id="opentelemetry-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

n8n can export workflow and node execution traces over OTLP to an OpenTelemetry collector. Refer to [OpenTelemetry tracing](../../../keep-n8n-running/trace-executions-with-opentelemetry/README.md) for details.

| Variable | Type | Default | Description | Available from | 
| :------- | :--- | :------ | :---------- | :------
| `N8N_OTEL_ENABLED` | Boolean | `false` | Whether to enable OpenTelemetry tracing. When set to `false`, n8n doesn't load the OpenTelemetry SDK. | 2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` | String | `http://localhost:4318` | Base URL of the OTLP endpoint to export traces to. The value must be an `http://` or `https://` URL. If it isn't, n8n logs a warning and uses the default. For `http/protobuf`, n8n appends the value of `N8N_OTEL_EXPORTER_OTLP_TRACING_PATH` to this URL. |  2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_PROTOCOL` | String | `http/protobuf` | OTLP transport for exporting traces. Valid values: `http/protobuf` and `grpc`. The name and values match the upstream [`OTEL_EXPORTER_OTLP_PROTOCOL`](https://opentelemetry.io/docs/specs/otel/protocol/exporter/) specification. Refer to [Choose the OTLP protocol](../../../keep-n8n-running/trace-executions-with-opentelemetry/set-up-tracing.md#choose-the-otlp-protocol) for guidance. | 2.39.0 |
| `N8N_OTEL_EXPORTER_OTLP_TRACING_PATH` | String | `/v1/traces` | Path appended to `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` for exporting traces. n8n ignores this variable when `N8N_OTEL_EXPORTER_OTLP_PROTOCOL` is `grpc`, because gRPC endpoints take no URL path. | 2.19.0 |
| `N8N_OTEL_EXPORTER_OTLP_HEADERS` | String | - | Comma-separated list of `key=value` pairs to send as HTTP headers with each OTLP request. Use this for authentication tokens or tenant headers. For example: `authorization=Bearer <token>,x-tenant=acme`. With the `grpc` protocol, n8n sends these as gRPC metadata and converts the keys to lowercase. | 2.19.0 |
| `N8N_OTEL_EXPORTER_SERVICE_NAME` | String | `n8n` | Value of the `service.name` resource attribute on exported spans. | 2.19.0 |
| `N8N_OTEL_TRACES_SAMPLE_RATE` | Number | `1.0` | Fraction of traces to export, between `0` and `1`. n8n uses a trace ID ratio sampler, so all spans in a trace are either sampled or dropped together. | 2.19.0 |
| `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS` | Boolean | `true` | Whether to emit a `node.execute` span for each node execution. Set to `false` to export workflow-level spans only. | 2.19.0 |
| `N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES` | String | - | JSON object that changes or removes the prefix on custom span attribute keys, for example `{"project":"","node":""}`. Refer to [Change the attribute prefixes](../../../keep-n8n-running/trace-executions-with-opentelemetry/add-custom-span-attributes.md#change-the-attribute-prefixes). | 2.46.0 |
| `N8N_OTEL_TRACES_EMIT_WORKFLOW_START_SPAN` | Boolean | `false` | Whether to send a 0 ms `workflow.execute.started` span when a workflow execution starts. Refer to [Start spans](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#start-spans). | 2.44.0 |
| `N8N_OTEL_TRACES_EMIT_NODE_START_SPAN` | Boolean | `false` | Whether to send a 0 ms `node.execute.started` span when a node execution starts. Needs `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS` set to `true`. Refer to [Start spans](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#start-spans). | 2.44.0 |
| `N8N_OTEL_TRACES_PRODUCTION_ONLY` | Boolean | `true` | Whether to export traces for [production executions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/types-of-executions) only. Set to `false` to export traces for all workflow executions. | 2.25.2 |
| `N8N_OTEL_TRACES_INJECT_OUTBOUND` | Boolean | `true` | Whether n8n adds tracing headers to outbound HTTP requests made by nodes that use n8n's HTTP helpers. When `true`, n8n sends `traceparent`, `tracestate`, and `baggage` (from n8n 2.47.0). Use `OTEL_PROPAGATORS` to narrow the set. Refer to [Outbound trace headers](../../../keep-n8n-running/trace-executions-with-opentelemetry/propagate-trace-context.md#outbound-trace-headers). | 2.19.0 |
| `OTEL_PROPAGATORS` | String | `tracecontext,baggage` | Comma-separated list naming which headers n8n writes while `N8N_OTEL_TRACES_INJECT_OUTBOUND` is `true`. Valid names: `tracecontext` (sends `traceparent` and `tracestate`), `baggage`, and `none`. Set it to `tracecontext` to stop n8n forwarding the caller's `baggage` entries downstream. n8n reads it once at startup, so a change needs a restart. Refer to [Outbound trace headers](../../../keep-n8n-running/trace-executions-with-opentelemetry/propagate-trace-context.md#outbound-trace-headers). | 2.47.0 |
| `N8N_OTEL_STARTUP_CONNECTIVITY_TIMEOUT_MS` | Number | `2000` | Timeout (in milliseconds) for the startup connectivity check against the OTLP endpoint. n8n logs an error if the endpoint isn't reachable within this period. | 2.19.0 |
| `N8N_AGENTS_TRACING_ENABLED` | Boolean | `true` | Whether agent runs emit OpenTelemetry spans. Inherits the endpoint, headers, sampling, and transport settings from `N8N_OTEL_*`. Agent spans need OpenTelemetry turned on, with `N8N_OTEL_ENABLED` or **Enable OpenTelemetry** in **Settings > OpenTelemetry**. Set this to `false` to keep workflow and node spans without agent spans. | 2.33.0 |
| `N8N_AGENTS_TRACING_RECORD_INPUTS` | Boolean | `true` | Whether agent tracing records inputs, such as prompts and tool arguments. Set to `false` to exclude sensitive input data from traces. | 2.33.0 |
| `N8N_AGENTS_TRACING_RECORD_OUTPUTS` | Boolean | `true` | Whether agent tracing records outputs, such as responses and tool results. Set to `false` to exclude sensitive output data from traces. | 2.33.0 |
| `N8N_DAYTONA_TRACING_ENABLED` | Boolean | `false` | Whether n8n sends spans from the Daytona sandbox client to your OTLP endpoint. Needs OpenTelemetry turned on, with `N8N_OTEL_ENABLED` or **Enable OpenTelemetry** in **Settings > OpenTelemetry**. n8n reads this variable at startup, so a change needs a restart. Refer to [Choose which spans n8n exports](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#trace-the-daytona-sandbox). | 2.47.0 |
| `N8N_MICROSOFT_AGENT_365_TRACING_ENABLED` | Boolean | `false` | Whether n8n sends spans from the **Microsoft Agent 365 Trigger** node to your OTLP endpoint. These spans can contain user messages and agent replies. Needs OpenTelemetry turned on, with `N8N_OTEL_ENABLED` or **Enable OpenTelemetry** in **Settings > OpenTelemetry**. n8n reads this variable at startup, so a change needs a restart. Refer to [Choose which spans n8n exports](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#trace-microsoft-agent-365). | 2.47.0 |
| `ENABLE_OBSERVABILITY` | Boolean | `true` | Whether the **Microsoft Agent 365 Trigger** node sends its spans to Microsoft. n8n sends them only while both this variable and `ENABLE_A365_OBSERVABILITY_EXPORTER` are unset or `true`. Any other value stops the export. The export doesn't depend on `N8N_OTEL_ENABLED` or **Settings > OpenTelemetry**, but `OTEL_SDK_DISABLED=true` stops it too. Refer to [Microsoft Agent 365 spans sent to Microsoft](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#microsoft-agent-365-spans-sent-to-microsoft). | 2.47.0 |
| `ENABLE_A365_OBSERVABILITY_EXPORTER` | Boolean | `true` | Same effect as `ENABLE_OBSERVABILITY`. Set either one to `false` to stop sending Microsoft Agent 365 spans to Microsoft. Refer to [Microsoft Agent 365 spans sent to Microsoft](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md#microsoft-agent-365-spans-sent-to-microsoft). | 2.47.0 |

To trace expression evaluations, use the `N8N_EXPRESSION_ENGINE_TRACES_*` variables in [Expression engine environment variables](expression-engine.md#trace-expression-evaluations).

n8n also reads some standard `OTEL_*` variables, such as `OTEL_RESOURCE_ATTRIBUTES` and `OTEL_BSP_*`, and ignores others. For the full list, and which setting wins when you set both, refer to [Standard OpenTelemetry environment variables](../../../keep-n8n-running/trace-executions-with-opentelemetry/set-up-tracing.md#standard-opentelemetry-environment-variables).

## Related resources

* [Environment variables](./)
* [OpenTelemetry tracing](../../../keep-n8n-running/trace-executions-with-opentelemetry/README.md)
* [Choose which spans n8n exports](../../../keep-n8n-running/trace-executions-with-opentelemetry/choose-which-spans-n8n-exports.md)
