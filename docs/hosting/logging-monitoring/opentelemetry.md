---
title: OpenTelemetry tracing
description: Send workflow and node execution traces from n8n to an OpenTelemetry collector.
contentType: howto
---

# OpenTelemetry tracing
/// warning | This feature is still under development 
- Initially available from 2.19.0
- Open telemetry formatted metrics will be coming soon
///

n8n can emit [OpenTelemetry](https://opentelemetry.io/){:target="_blank" .external-link} traces for workflow and node executions. Use these traces to monitor execution latency, debug failures, and track requests across services in your observability stack.

/// info | Feature availability
OpenTelemetry workflow tracing is only available on self-hosted n8n.
///

## What you get

When you turn on tracing, n8n exports two kinds of spans for each execution:

- **`workflow.execute`**: One span per workflow execution. It records the workflow ID, name, version, node count, execution mode, status, and any error type.
- **`node.execute`**: One span per node execution, nested inside its workflow span. It records the node ID, name, type, version, and the number of input and output items.

Each span includes resource attributes that identify the n8n instance:

- `service.name` (default `n8n`)
- `service.version` (the n8n version)
- `n8n.instance.id`
- `n8n.instance.role` (for example, `main`, `worker`, or `webhook`)

n8n also handles trace context propagation:

- **Inbound**: If a webhook request includes a [W3C `traceparent` header](https://www.w3.org/TR/trace-context/){:target="_blank" .external-link}, n8n uses it as the parent for the workflow span. This links the n8n workflow trace to the upstream caller.
- **Outbound**: HTTP Request nodes (and other nodes that use the n8n HTTP helpers) can inject a `traceparent` header into outbound requests. Downstream services that support W3C trace context can therefore continue the trace.
- **Sub-workflows**: A sub-workflow's span uses the parent workflow's span as its parent.
- **Resumed workflows**: When a workflow resumes after a wait, the new span links back to the previous span using a span link.

## Enable tracing

Set the following environment variables on each n8n instance you want workflow tracing enabled (main, workers, and webhook processors):

```bash
export N8N_OTEL_ENABLED=true
export N8N_OTEL_EXPORTER_OTLP_ENDPOINT=http://<your-collector-host>:4318
```

Restart n8n. The instance starts exporting spans over OTLP HTTP using the Protobuf encoding.

n8n appends `/v1/traces` to the endpoint by default. Point `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` at the base URL of your collector, not the traces path.

If your collector needs authentication, set `N8N_OTEL_EXPORTER_OTLP_HEADERS` to a comma-separated list of `key=value` pairs:

```bash
export N8N_OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer <your-token>,x-tenant=acme"

// For added protection - It is recommended to use the `_FILE` postfix if you are putting a token in here:
export N8N_OTEL_EXPORTER_OTLP_HEADERS_FILE=/mnt/otel-headers
```

For the full list of supported variables, refer to [OpenTelemetry environment variables](/hosting/configuration/environment-variables/opentelemetry.md).

/// note | Queue mode
In [queue mode](/hosting/scaling/queue-mode.md), the OpenTelemetry variables must be set on all instances. Trace context is propagated between instances.
///

## Sampling

By default, n8n exports every trace. To reduce volume in busy instances, set `N8N_OTEL_TRACES_SAMPLE_RATE` to a value between `0` and `1`:

```bash
# Export 10% of traces
export N8N_OTEL_TRACES_SAMPLE_RATE=0.1
```

n8n uses a trace ID ratio sampler, so the same trace ID is either fully sampled or fully dropped across all spans in the trace.

/// note | 
n8n will output a trace for every workflow execution - this includes published workflows, unpublished workflows and test executions - In a future release a toggle will be available to track only published workflows 
///

## Reduce span volume

Each node in a workflow produces its own span. For workflows with lots of nodes, this can produce more data than you need. To export only workflow-level spans, set:

```bash
export N8N_OTEL_TRACES_INCLUDE_NODE_SPANS=false
```

To stop n8n from injecting `traceparent` headers into outbound HTTP requests, set:

```bash
export N8N_OTEL_TRACES_INJECT_OUTBOUND=false
```

## Add custom attributes to node spans

If you're [building a custom node](/integrations/creating-nodes/overview.md), you can attach custom key-value pairs to the node's span. Call `setMetadata` from the node's `execute` method:

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	this.setMetadata({
		tracing: {
			'llm.model': 'gpt-4o',
			'llm.token.input': 1500,
			'llm.token.output': 340,
		},
	});

	return [this.getInputData()];
}
```

n8n prefixes each key with `n8n.node.custom.` on the exported span. Values must be strings, numbers, or boolean.

This API isn't available from the Code node. It's intended for node authors who want to enrich spans with domain-specific data.

## Try it out with Jaeger

You can send traces to a local [Jaeger](https://www.jaegertracing.io/){:target="_blank" .external-link} instance to see them in action.

1. Save the following as `docker-compose.yml`:

```yaml
services:
  jaeger:
    image: jaegertracing/jaeger:latest
    ports:
      - "16686:16686" # UI
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
```

2. Start Jaeger:

```bash
docker compose up -d
```

3. Start n8n with tracing turned on and pointed at Jaeger. Information about [starting n8n](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md) can be found elsewhere in this documentation:

```bash
N8N_OTEL_ENABLED=true N8N_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 n8n start
```

5. Run a workflow, then open the Jaeger UI at [http://localhost:16686](http://localhost:16686) - Select "n8n" as service" and click "Find traces" to see the OpenTelemetry traces emitted by n8n.

## Span attributes

Workflow and node spans include the following n8n-specific attributes.

### Workflow span (`workflow.execute`)

| Attribute | Description |
| :-------- | :---------- |
| `n8n.workflow.id` | Workflow ID. |
| `n8n.workflow.name` | Workflow name. |
| `n8n.workflow.version_id` | Workflow version ID. |
| `n8n.workflow.node_count` | Number of nodes in the workflow. |
| `n8n.execution.id` | Execution ID. |
| `n8n.execution.mode` | Execution mode (for example, `manual`, `webhook`, `trigger`, `retry`). |
| `n8n.execution.status` | Final execution status. |
| `n8n.execution.is_retry` | `true` if the execution is a retry. |
| `n8n.execution.retry_of` | The original execution ID, when the execution is a retry. |
| `n8n.execution.error_type` | Error class name, set when the execution fails. |
| `n8n.continuation.reason` | Set on a span link when the workflow resumes after a wait. |

### Node span (`node.execute`)

| Attribute | Description |
| :-------- | :---------- |
| `n8n.node.id` | Node ID. |
| `n8n.node.name` | Node name. |
| `n8n.node.type` | Node type (for example, `n8n-nodes-base.httpRequest`). |
| `n8n.node.type_version` | Node type version. |
| `n8n.node.items.input` | Number of input items the node received. |
| `n8n.node.items.output` | Number of output items the node produced. |
| `n8n.node.termination_reason` | Why a node span ended without a normal completion (for example, `workflow_cancelled`). |
| `n8n.node.custom.<key>` | Custom attributes set through `metadata.tracing` in the node output. |

When a node fails, n8n records an `exception` event on the span with the standard OpenTelemetry exception attributes (`exception.type`, `exception.message`, `exception.stacktrace`).

## Troubleshooting

### No traces appear in your backend

If n8n can't reach the OTLP endpoint at startup, it logs an error:

```
Failed to connect to OpenTelemetry OTLP endpoint during startup
```

Check that:

- `N8N_OTEL_ENABLED` is set to `true`.
- `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` points at the base URL of the collector (not the `/v1/traces` path).
- The collector is reachable from the n8n container or host.
- Any required `N8N_OTEL_EXPORTER_OTLP_HEADERS` (such as authentication tokens) are set.

n8n logs OpenTelemetry diagnostics at `warn` level by default. Set `N8N_LOG_LEVEL=debug` to see more detail.

### Worker traces are missing parent context

In queue mode, workers read the parent trace context from the database. If you only set the OpenTelemetry environment variables on the main instance, worker spans won't link to the parent workflow trace. Set the same variables on every instance type.

## Related resources

- [OpenTelemetry environment variables](/hosting/configuration/environment-variables/opentelemetry.md)
- [W3C Trace Context specification](https://www.w3.org/TR/trace-context/){:target="_blank" .external-link}
- [OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/){:target="_blank" .external-link}
- [Logging in n8n](/hosting/logging-monitoring/logging.md)
- [Monitoring](/hosting/logging-monitoring/monitoring.md)
