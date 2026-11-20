---
description: >-
  Link n8n traces to upstream callers and downstream services with W3C trace
  context and baggage headers.
layout:
  description:
    visible: false
status: preview
---

# Propagate trace context

n8n continues a trace that an inbound request started, and passes it on to the services your workflows call.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

## How n8n propagates trace context

n8n handles trace context propagation in these cases:

- **Inbound**: If a webhook request includes a [W3C `traceparent` header](https://www.w3.org/TR/trace-context/), n8n uses it as the parent for the workflow span. This links the n8n workflow trace to the upstream caller. From n8n 2.47.0, n8n also reads a [`baggage` header](https://www.w3.org/TR/baggage/). It reads the header only to forward it, so **Send outbound trace headers** has to be on. Refer to [Forward caller baggage](#forward-caller-baggage).
- **Outbound**: HTTP Request nodes (and other nodes that use the n8n HTTP helpers) can add `traceparent`, `tracestate`, and `baggage` headers to outbound requests. Downstream services that support W3C trace context can continue the trace. Refer to [Outbound trace headers](#outbound-trace-headers).
- **Sub-workflows**: A sub-workflow's span uses the parent workflow's span as its parent.
- **Resumed workflows**: When a workflow resumes after a wait, the new span links back to the previous span using a span link.

## Outbound trace headers

{% hint style="info" %}
**Feature availability**

Sending the `baggage` header on outbound requests and the `OTEL_PROPAGATORS` environment variable are available from n8n 2.47.0.
{% endhint %}

**Send outbound trace headers** decides whether n8n adds any tracing header to outbound requests. It's on by default. Set it under **Settings > OpenTelemetry**, or with the `N8N_OTEL_TRACES_INJECT_OUTBOUND` environment variable. As with the other fields in **Settings > OpenTelemetry**, n8n disables the field when you set the environment variable.

`OTEL_PROPAGATORS` names which headers n8n writes while the toggle is on:

| `N8N_OTEL_TRACES_INJECT_OUTBOUND` | `OTEL_PROPAGATORS` | Headers n8n sends |
| :-------------------------------- | :----------------- | :---------------- |
| Off | Any value | None |
| On | Not set | `traceparent`, `tracestate`, `baggage` |
| On | `tracecontext` | `traceparent`, `tracestate` |
| On | `baggage` | `baggage` |
| On | `none` | None |

n8n sends `tracestate` only when the trace has one, and `baggage` only when the execution has entries.

`OTEL_PROPAGATORS` is a standard OpenTelemetry variable. It takes a comma-separated list of names and defaults to `tracecontext,baggage`. Case doesn't matter. n8n leaves out a name it doesn't support, such as `b3`, and logs a warning.

It affects outbound headers only. It doesn't change what n8n reads from an inbound request.

n8n reads `OTEL_PROPAGATORS` once at startup, so a change needs a restart. The **Send outbound trace headers** toggle applies without one.

To stop n8n from sending any tracing header:

```bash
export N8N_OTEL_TRACES_INJECT_OUTBOUND=false
```

To keep trace context but drop the `baggage` header:

```bash
export OTEL_PROPAGATORS=tracecontext
```

### Forward caller baggage

When a webhook request carries a [W3C `baggage` header](https://www.w3.org/TR/baggage/), n8n forwards those entries on the outbound requests that the execution makes. A downstream service can then put the same entries, such as a tenant ID, on its own telemetry.

Forwarding needs OpenTelemetry turned on, **Send outbound trace headers** on, and `baggage` among the propagators.

{% hint style="warning" %}
**Caller baggage leaves your instance**

n8n forwards the caller's entries to every host the execution calls, third-party APIs included. A sub-workflow or an error workflow sends the baggage of the run that started it. The entries come from the caller, so n8n can't tell whether they're safe to share. To keep trace context and drop the caller's entries, set `OTEL_PROPAGATORS=tracecontext`.
{% endhint %}

How n8n handles the entries:

- n8n drops every entry whose key starts with `n8n.`. That prefix is reserved for n8n's own attributes, so a caller can't forge one.
- n8n drops entries past the OpenTelemetry limits: 180 entries, 4,096 bytes for a single entry, and 8,192 bytes in total. A dropped entry never reaches the downstream service.
- n8n saves the entries on the execution, so they survive a [queue mode](../../configure-n8n/scaling/enable-queue-mode.md) worker and a resume after a Wait node.
- n8n forwards the entries without recording them. A `tenant.id` entry goes out on the headers but never appears as a [span attribute](span-reference.md).
- An [`otel.configure` external hook](add-custom-span-attributes.md#change-exported-telemetry-with-an-external-hook) can add entries of its own. Those win over the caller's when both set the same key.

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Set up OpenTelemetry tracing](set-up-tracing.md)
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md)
- [Add custom span attributes](add-custom-span-attributes.md)
- [Span reference](span-reference.md)
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
- [W3C Trace Context specification](https://www.w3.org/TR/trace-context/)
- [W3C Baggage specification](https://www.w3.org/TR/baggage/)
