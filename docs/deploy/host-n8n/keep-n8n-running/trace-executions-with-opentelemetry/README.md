---
title: OpenTelemetry tracing
description: >-
  Send workflow and node execution traces from n8n to an OpenTelemetry
  collector.
contentType: howto
nodeTitle: Trace executions with OpenTelemetry
originalFilePath: hosting/logging-monitoring/opentelemetry.md
originalUrl: 'https://docs.n8n.io/hosting/logging-monitoring/opentelemetry'
url: >-
  https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/trace-executions-with-opentelemetry
layout:
  description:
    visible: false
status: preview
tags:
  - tag: preview
    primary: true
---

# OpenTelemetry tracing <a href="#opentelemetry-tracing" id="opentelemetry-tracing"></a>

n8n can emit [OpenTelemetry](https://opentelemetry.io/) traces for workflow and node executions. Use these traces to monitor execution latency, debug failures, and track requests across services in your observability stack.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview from n8n 2.19.0 and may change in future releases. Avoid relying on it in production workflows. n8n plans to add OpenTelemetry-formatted metrics in a later release.
{% endhint %}

Watch an overview of OpenTelemetry tracing in n8n:

{% embed url="https://www.youtube.com/embed/xOi8K_-GLRM" %}

## What you get <a href="#what-you-get" id="what-you-get"></a>

When you turn on tracing, n8n exports two kinds of spans for each execution:

- **`workflow.execute`**: One span per workflow execution. It records the workflow ID, name, version, project, node count, execution mode, status, and any error type.
- **`node.execute`**: One span per node execution, nested inside its workflow span. It records the node ID, name, type, version, the number of input and output items, and the execution, workflow, and project it belongs to.

n8n exports a span when it ends. To see a run while it's still going, turn on [start spans](choose-which-spans-n8n-exports.md#start-spans).

Workflow, node, and [agent](choose-which-spans-n8n-exports.md#agent-tracing) spans are the only spans n8n exports by default. To add spans from other sources, such as expressions, refer to [Choose which spans n8n exports](choose-which-spans-n8n-exports.md).

n8n also continues a trace that an inbound webhook request started, and can add trace headers to outbound requests. Refer to [Propagate trace context](propagate-trace-context.md).

To turn on tracing, refer to [Set up OpenTelemetry tracing](set-up-tracing.md).

## In this section

- [Set up OpenTelemetry tracing](set-up-tracing.md): turn on tracing, choose the OTLP protocol, and see how n8n reads the standard `OTEL_*` variables.
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md): see which spans reach your OTLP endpoint, reduce their volume, and turn on extra tracing sources.
- [Propagate trace context](propagate-trace-context.md): link n8n traces to upstream callers and downstream services.
- [Add custom span attributes](add-custom-span-attributes.md): add your own attributes to project, workflow, and node spans, or with an external hook.
- [Span reference](span-reference.md): look up the attributes on each span, and read the span of a crashed execution.
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md): fix missing traces, spans, and attributes.

## Related resources <a href="#related-resources" id="related-resources"></a>

- [Keep n8n running](../)
- [Logging in n8n](../set-up-logging.md)
- [Monitoring](../monitor-n8n.md)
- [Visualize metrics with Grafana](../visualize-metrics-with-grafana.md)
- [Back up and restore](../backup-and-restore.md)
- [Update n8n](../update-n8n.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
- [W3C Trace Context specification](https://www.w3.org/TR/trace-context/)
- [W3C Baggage specification](https://www.w3.org/TR/baggage/)
- [OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/)
