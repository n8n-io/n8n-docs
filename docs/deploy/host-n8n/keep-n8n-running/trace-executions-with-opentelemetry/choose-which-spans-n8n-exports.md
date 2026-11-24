---
description: >-
  See which OpenTelemetry spans n8n sends to your OTLP endpoint, reduce their
  volume, and turn on extra tracing sources.
layout:
  description:
    visible: false
status: preview
---

# Choose which spans n8n exports

By default, n8n sends only workflow, node, and agent spans to your OTLP endpoint. Spans from every other source reach your endpoint only after you turn that source on with an environment variable.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

The Daytona and Microsoft Agent 365 tracing sources are available from n8n 2.47.0 and n8n 3.1.0. n8n 3.0.x doesn't include them.

Expression spans are available from n8n 2.19.0, and off by default from n8n 2.45.0.
{% endhint %}

This page covers what reaches your OTLP endpoint and what doesn't. Two other destinations don't depend on your endpoint: Microsoft Agent 365 spans go to Microsoft by default, and Sentry spans go to Sentry when you set `N8N_SENTRY_DSN`. Refer to [Microsoft Agent 365 spans sent to Microsoft](#microsoft-agent-365-spans-sent-to-microsoft) and [Sentry spans](#sentry-spans).

To set up tracing in the first place, refer to [Set up OpenTelemetry tracing](set-up-tracing.md).

## What n8n exports by default

When you turn on OpenTelemetry tracing (`N8N_OTEL_ENABLED=true`, or **Enable OpenTelemetry** in **Settings > OpenTelemetry**), n8n sends these spans to your OTLP endpoint:

| Spans | Source | Turn off with |
| :---- | :----- | :------------ |
| `workflow.execute` | Each workflow execution | Always on while tracing is on |
| `node.execute` | Each node execution | `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS=false` |
| `<agent-name>.generate`, `<agent-name>.stream`, `execute_tool <tool-name>` | Agent runs built with the Agents feature | `N8N_AGENTS_TRACING_ENABLED=false` |
| `workflow.execute.started`, `node.execute.started` | Optional start spans, off by default | Refer to [Start spans](#start-spans) |

For the attributes on each span, refer to [Span reference](span-reference.md).

n8n keeps spans from every other source away from your OTLP endpoint, including the libraries that nodes use internally. A library can create spans, but n8n doesn't send them to your endpoint unless you turn that source on. This keeps internal engine telemetry, and data you didn't choose to send, out of your trace backend.

## Sampling <a href="#sampling" id="sampling"></a>

By default, n8n exports every trace. To reduce volume in busy instances, set `N8N_OTEL_TRACES_SAMPLE_RATE` to a value between `0` and `1`:

```bash
# Export 10% of traces <a href="#export-10percent-of-traces" id="export-10percent-of-traces"></a>
export N8N_OTEL_TRACES_SAMPLE_RATE=0.1
```

n8n uses a trace ID ratio sampler, so the same trace ID is either fully sampled or fully dropped across all spans in the trace.

{% hint style="info" %}
By default, n8n only outputs traces for [production executions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/types-of-executions). To output traces for all workflow executions, set `N8N_OTEL_TRACES_PRODUCTION_ONLY=false`.
{% endhint %}

## Reduce span volume <a href="#reduce-span-volume" id="reduce-span-volume"></a>

Each node in a workflow produces its own span. For workflows with lots of nodes, this can produce more data than you need. To export only workflow-level spans, set:

```bash
export N8N_OTEL_TRACES_INCLUDE_NODE_SPANS=false
```

## Agent tracing <a href="#agent-tracing" id="agent-tracing"></a>

{% hint style="info" %}
**Feature availability**

Agent tracing is available from n8n 2.33.0.
{% endhint %}

n8n can also emit detailed spans for agent runs built with the Agents feature, using the same tracer as workflow tracing. This covers agent runs started from a workflow, from chat integrations, and from scheduled tasks.

{% hint style="warning" %}
**Legacy AI Agent node**

This section covers tracing for the new Agents feature. The older AI Agent (LangChain) node doesn't produce agent-run or tool-call spans. It produces a standard `node.execute` span. From n8n 2.46.0, that span has `gen_ai.*` attributes, and so does the span of its chat model node.
{% endhint %}

Agent tracing rides along with the rest of the OTel module. It's on by default: when you turn on `N8N_OTEL_ENABLED`, n8n exports agent spans too, because `N8N_AGENTS_TRACING_ENABLED` defaults to `true`.

To keep workflow and node spans while dropping agent spans, set:

```bash
export N8N_AGENTS_TRACING_ENABLED=false
```

By default, agent tracing records prompts, tool arguments, responses, and tool results. To exclude sensitive input or output data:

```bash
export N8N_AGENTS_TRACING_RECORD_INPUTS=false
export N8N_AGENTS_TRACING_RECORD_OUTPUTS=false
```

For the full list of variables, refer to [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md).

### What you get <a href="#what-you-get-agents" id="what-you-get-agents"></a>

Each agent run produces one root span, named `<agent name>.generate` or `<agent name>.stream` depending on whether the run streams its response. Each tool call the agent makes produces a nested `execute_tool <tool name>` span.

These spans use the OpenTelemetry [GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (`gen_ai.*` attributes), so they're readable in any OTLP backend, not just tools built for LangSmith.

For the attributes on each span, refer to [Agent run span](span-reference.md#agent-run-span) and [Tool call span](span-reference.md#tool-call-span).

## Start spans

{% hint style="info" %}
**Feature availability**

Start spans are available from n8n 2.44.0.
{% endhint %}

A long-running workflow or node is invisible in your backend until its span ends. With start spans on, n8n also sends a 0 ms child span the moment the workflow or node starts. The start span carries the same attributes as its parent at that moment, so you know right away what's running, and in which workflow and project.

| Start span | Parent | Setting | Environment variable |
| :--------- | :----- | :------ | :------------------- |
| `workflow.execute.started` | `workflow.execute` | **Send workflow start spans** | `N8N_OTEL_TRACES_EMIT_WORKFLOW_START_SPAN` |
| `node.execute.started` | `node.execute` | **Send node start spans** | `N8N_OTEL_TRACES_EMIT_NODE_START_SPAN` |

Both are off by default. Turn them on under **Settings > OpenTelemetry > Tracing**, or set the environment variables to `true`. Node start spans also need **Include node spans** (`N8N_OTEL_TRACES_INCLUDE_NODE_SPANS`) on. In queue mode, set the variables on the main instance and on every worker.

To use the public API, call `PUT /api/v1/settings/otel` with `emitWorkflowStartSpan` and `emitNodeStartSpan`, using an API key with the `otel:manage` scope. This call replaces all OpenTelemetry settings. n8n rejects a body that leaves out a required field. If you leave out an optional field, `exporterProtocol`, `emitWorkflowStartSpan`, or `emitNodeStartSpan`, n8n resets it to its default.

## Turn on other tracing sources

You can turn on these extra sources. Each one needs OpenTelemetry tracing turned on as well.

| Source | Environment variable | Default | Spans n8n exports |
| :----- | :------------------- | :------ | :---------------- |
| Expressions | `N8N_EXPRESSION_ENGINE_TRACES_ENABLED` | `false` | `expression.evaluate`, for each expression that fails, takes longer than the slow threshold, or falls in the sample |
| Daytona sandbox | `N8N_DAYTONA_TRACING_ENABLED` | `false` | One span per Daytona client call that an AI agent makes, named `<class>.<method>`, for example `Daytona.create` |
| Microsoft Agent 365 | `N8N_MICROSOFT_AGENT_365_TRACING_ENABLED` | `false` | `invoke_agent <agent-name>` and `agents.*` spans from the [**Microsoft Agent 365 Trigger** node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger) |

To turn on a source:

1. Set its environment variable to `true` on every n8n instance: main, workers, and webhook processors.
1. Restart n8n. n8n reads these variables once at startup. A change in **Settings > OpenTelemetry** applies without a restart, but these variables don't.

Your sampling settings, such as `N8N_OTEL_TRACES_SAMPLE_RATE`, apply to these spans too.

### Trace expression evaluations

Expression spans help you find slow or failing expressions. From n8n 2.19.0 to 2.44.x, n8n sent them by default. From n8n 2.45.0, they're off until you turn them on.

n8n creates an `expression.evaluate` span for:

- Every expression that fails.
- Every expression that takes longer than `N8N_EXPRESSION_ENGINE_SLOW_EVAL_THRESHOLD_MS` (default `50`).
- A sample of the other expressions, at the rate set by `N8N_EXPRESSION_ENGINE_TRACES_SAMPLE_RATE` (default `0`, so none).

```bash
# Send spans for failing and slow expressions only
export N8N_OTEL_ENABLED=true
export N8N_EXPRESSION_ENGINE_TRACES_ENABLED=true

# Treat an expression as slow above 200 ms instead of 50 ms
export N8N_EXPRESSION_ENGINE_SLOW_EVAL_THRESHOLD_MS=200

# Also send spans for 1% of healthy expressions
export N8N_EXPRESSION_ENGINE_TRACES_SAMPLE_RATE=0.01
```

For the attributes on each span, refer to [Expression span](span-reference.md#expression-span).

Expression spans need the `vm` or `quickjs` backend engine. The `legacy` engine never creates them. They also need `N8N_EXPRESSION_ENGINE_OBSERVABILITY_ENABLED` left at its default, `true`. Refer to [Expression engine environment variables](../../configure-n8n/basic-configuration/use-environment-variables/expression-engine.md).

### Trace the Daytona sandbox

AI agents can run code in a Daytona sandbox. To trace the calls n8n makes to Daytona, such as creating, starting, and deleting a sandbox, set:

```bash
export N8N_OTEL_ENABLED=true
export N8N_DAYTONA_TRACING_ENABLED=true
```

### Trace Microsoft Agent 365

To send spans from the **Microsoft Agent 365 Trigger** node to your OTLP endpoint, set:

```bash
export N8N_OTEL_ENABLED=true
export N8N_MICROSOFT_AGENT_365_TRACING_ENABLED=true
```

{% hint style="warning" %}
**Microsoft Agent 365 spans can contain conversation content**

These spans can contain user messages and agent replies. Check what your trace backend stores, and who can read it, before you turn them on.
{% endhint %}

This variable controls only the copy that goes to your OTLP endpoint. n8n also sends Microsoft Agent 365 spans to Microsoft, and other variables control that export. Refer to [Microsoft Agent 365 spans sent to Microsoft](#microsoft-agent-365-spans-sent-to-microsoft).

## Microsoft Agent 365 spans sent to Microsoft

The **Microsoft Agent 365 Trigger** node sends its `invoke_agent <agent-name>` spans to Microsoft's Agent 365 observability service. This export is on by default, and it doesn't depend on `N8N_OTEL_ENABLED` or **Settings > OpenTelemetry**: it runs even when OpenTelemetry tracing is off. Two things stop it besides the variables below: `OTEL_SDK_DISABLED=true`, and another OpenTelemetry setup loaded before n8n. Refer to [Don't set library OpenTelemetry flags](set-up-tracing.md#dont-set-library-opentelemetry-flags).

These spans can contain user messages and agent replies. n8n sends them to Microsoft only while both `ENABLE_OBSERVABILITY` and `ENABLE_A365_OBSERVABILITY_EXPORTER` are unset or `true`. To stop the export, set either one to `false` on every instance that runs workflows, and restart n8n:

```bash
export ENABLE_A365_OBSERVABILITY_EXPORTER=false
```

Refer to [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md) for both variables.

Spans sent to Microsoft carry the service name `n8n-microsoft-agent-365`. The `OTEL_BSP_*` batch settings don't apply to them.

## Sentry spans

When `N8N_SENTRY_DSN` is set, n8n reports errors and performance data to Sentry. Sentry spans go only to that Sentry DSN. They never reach your OTLP endpoint, and your OpenTelemetry spans never reach Sentry.

Sentry also doesn't add trace headers to outbound requests. Only the OpenTelemetry settings control those. Refer to [Outbound trace headers](propagate-trace-context.md#outbound-trace-headers).

## Send spans to different backends

n8n exports to one OTLP endpoint. To send spans to more than one backend, or different spans to different backends, point n8n at an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/). Route spans there, for example with the [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor).

Don't load a second OpenTelemetry setup in the n8n process. n8n steps aside and ignores its own settings. Refer to [Don't set library OpenTelemetry flags](set-up-tracing.md#dont-set-library-opentelemetry-flags).

To route n8n spans, match on these names and attributes:

| Spans | Match on |
| :---- | :------- |
| Workflow and node spans | Span name `workflow.execute`, `workflow.execute.started`, `node.execute`, or `node.execute.started` |
| Agent runs and tool calls | Span attribute `gen_ai.operation.name` |
| Expression evaluations | Span name `expression.evaluate` |
| Spans from one instance type, such as workers | Resource attribute `n8n.instance.role` |

If you send agent spans and workflow spans to different backends, an agent run started from a workflow arrives without its parent. It nests under the span of the node that called it. Agent runs started from a chat integration start their own trace, so they arrive complete.

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Set up OpenTelemetry tracing](set-up-tracing.md)
- [Propagate trace context](propagate-trace-context.md)
- [Add custom span attributes](add-custom-span-attributes.md)
- [Span reference](span-reference.md)
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
- [Expression engine environment variables](../../configure-n8n/basic-configuration/use-environment-variables/expression-engine.md)
