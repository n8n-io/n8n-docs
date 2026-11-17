---
description: >-
  See which OpenTelemetry spans n8n sends to your OTLP endpoint, turn on extra
  tracing sources, and learn how n8n reads the standard OTEL_* environment
  variables.
layout:
  description:
    visible: false
status: preview
tags:
  - tag: preview
    primary: true
---

# Choose which spans n8n exports

By default, n8n sends only workflow, node, and agent spans to your OTLP endpoint. Every other tracing source stays off until you turn it on with an environment variable.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

The Daytona and Microsoft Agent 365 tracing sources, and the n8n handling of standard `OTEL_*` variables described on this page, are available from n8n 2.47.0 and n8n 3.1.0. n8n 3.0.x doesn't include them.

Expression spans are available from n8n 2.19.0, and off by default from n8n 2.45.0.
{% endhint %}

This page covers what reaches your OTLP endpoint and what doesn't. To set up tracing in the first place, refer to [OpenTelemetry tracing](trace-executions-with-opentelemetry.md).

## What n8n exports by default

When you turn on OpenTelemetry tracing (`N8N_OTEL_ENABLED=true`, or **Enable OpenTelemetry** in **Settings > OpenTelemetry**), n8n sends these spans to your OTLP endpoint:

| Spans | Source | Turn off with |
| :---- | :----- | :------------ |
| `workflow.execute` | Each workflow execution | Not possible while tracing is on |
| `node.execute` | Each node execution | `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS=false` |
| `<agent-name>.generate`, `<agent-name>.stream`, `execute_tool <tool-name>` | Agent runs built with the Agents feature | `N8N_AGENTS_TRACING_ENABLED=false` |
| `workflow.execute.started`, `node.execute.started` | Optional start spans, off by default | Refer to [Start spans](trace-executions-with-opentelemetry.md#start-spans) |

For the attributes on each span, refer to [Span attributes](trace-executions-with-opentelemetry.md#span-attributes).

n8n drops spans from every other source, including the libraries that nodes use internally. A library can create spans, but n8n doesn't export them unless you turn that source on. This keeps internal engine telemetry, and data you didn't choose to send, out of your trace backend.

## Turn on other tracing sources

You can turn on these extra sources. Each one needs OpenTelemetry tracing turned on as well.

| Source | Environment variable | Default | Spans n8n exports |
| :----- | :------------------- | :------ | :---------------- |
| Expressions | `N8N_EXPRESSION_ENGINE_TRACES_ENABLED` | `false` | `expression.evaluate`, for each expression that fails, runs slowly, or is sampled |
| Daytona sandbox | `N8N_DAYTONA_TRACING_ENABLED` | `false` | One span per Daytona client call that an AI agent makes, named `<class>.<method>`, for example `Daytona.create` |
| Microsoft Agent 365 | `N8N_MICROSOFT_AGENT_365_TRACING_ENABLED` | `false` | `invoke_agent <agent-name>` and `agents.*` spans from the [Microsoft Agent 365 Trigger node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger) |

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

Each span carries these attributes:

| Attribute | Description |
| :-------- | :---------- |
| `expression.engine` | The backend expression engine, `vm` or `quickjs`. |
| `expression.duration_seconds` | How long the evaluation took. |
| `expression.outcome` | `healthy`, `slow`, or `error`. |
| `expression.error.type` | The error type, when the evaluation failed. |

Expression spans need the `vm` or `quickjs` backend engine. The `legacy` engine never creates them. They also need `N8N_EXPRESSION_ENGINE_OBSERVABILITY_ENABLED` left at its default, `true`. Refer to [Expression engine environment variables](../configure-n8n/basic-configuration/use-environment-variables/expression-engine.md).

### Trace the Daytona sandbox

AI agents can run code in a Daytona sandbox. To trace the calls n8n makes to Daytona, such as creating, starting, and deleting a sandbox, set:

```bash
export N8N_OTEL_ENABLED=true
export N8N_DAYTONA_TRACING_ENABLED=true
```

### Trace Microsoft Agent 365

To send spans from the Microsoft Agent 365 Trigger node to your OTLP endpoint, set:

```bash
export N8N_OTEL_ENABLED=true
export N8N_MICROSOFT_AGENT_365_TRACING_ENABLED=true
```

{% hint style="warning" %}
**Microsoft Agent 365 spans can contain conversation content**

These spans can contain user messages and agent replies. Check what your trace backend stores, and who can read it, before you turn them on.
{% endhint %}

This variable controls the copy that goes to your OTLP endpoint. Separately, n8n also sends Microsoft Agent 365 spans to Microsoft. Refer to [Microsoft Agent 365 spans sent to Microsoft](#microsoft-agent-365-spans-sent-to-microsoft).

## Microsoft Agent 365 spans sent to Microsoft

The Microsoft Agent 365 Trigger node sends its `invoke_agent <agent-name>` spans to Microsoft's Agent 365 observability service. This export is on by default, and it doesn't depend on your OpenTelemetry settings: it runs even when `N8N_OTEL_ENABLED` is `false`.

These spans can contain user messages and agent replies. n8n sends them to Microsoft only while both `ENABLE_OBSERVABILITY` and `ENABLE_A365_OBSERVABILITY_EXPORTER` are unset or `true`. To stop the export, set either one to `false` on every instance that runs workflows, and restart n8n:

```bash
export ENABLE_A365_OBSERVABILITY_EXPORTER=false
```

Refer to [OpenTelemetry environment variables](../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md) for both variables.

Spans sent to Microsoft carry the service name `n8n-microsoft-agent-365`. The `OTEL_BSP_*` batch settings don't apply to them.

## Sentry spans

When `N8N_SENTRY_DSN` is set, n8n reports errors and performance data to Sentry. Sentry spans go only to that Sentry DSN. They never reach your OTLP endpoint, and your OpenTelemetry spans never reach Sentry.

Sentry also doesn't add trace headers to outbound requests. Only the OpenTelemetry settings control those. Refer to [Outbound trace headers](trace-executions-with-opentelemetry.md#outbound-trace-headers).

## Standard OpenTelemetry environment variables

OpenTelemetry defines standard `OTEL_*` environment variables. n8n has its own `N8N_OTEL_*` variable for most options, and n8n's settings always win.

For each option that has an n8n setting, n8n uses the first value it finds:

1. The `N8N_OTEL_*` environment variable, or its `_FILE` variant. n8n then disables the matching field in **Settings > OpenTelemetry**.
1. The value saved in **Settings > OpenTelemetry**.
1. n8n's default.

For these options, n8n ignores the standard `OTEL_*` variable, even when you set nothing else. The one exception is headers: n8n adds the keys from `OTEL_EXPORTER_OTLP_HEADERS` to its own. For options n8n has no setting for, such as timeouts and compression, n8n applies the standard variable.

### Variables n8n applies

| Variable | What it does in n8n |
| :------- | :------------------ |
| `OTEL_SDK_DISABLED` | Set to `true` to turn off all OpenTelemetry in n8n, including the export of Microsoft Agent 365 spans to Microsoft. n8n logs a warning at startup. |
| `OTEL_RESOURCE_ATTRIBUTES` | Adds resource attributes to every span. n8n's own `service.name`, `service.version`, `n8n.instance.id`, and `n8n.instance.role` win over the same keys here. |
| `OTEL_NODE_RESOURCE_DETECTORS` | Chooses which resource detectors run. The default is `env,process,host`. |
| `OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_EXPORTER_OTLP_TRACES_HEADERS` | Add headers to export requests. When a key is also in `N8N_OTEL_EXPORTER_OTLP_HEADERS`, n8n's value wins. |
| `OTEL_EXPORTER_OTLP_TIMEOUT`, `OTEL_EXPORTER_OTLP_TRACES_TIMEOUT` | Sets the export request timeout. The default is 10 seconds. **Send test trace** uses `N8N_OTEL_STARTUP_CONNECTIVITY_TIMEOUT_MS` instead. |
| `OTEL_EXPORTER_OTLP_COMPRESSION`, `OTEL_EXPORTER_OTLP_TRACES_COMPRESSION` | Compresses export requests. |
| `OTEL_EXPORTER_OTLP_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_KEY`, and their `_TRACES_` versions | Set a custom certificate authority and mutual TLS. Refer to [TLS](trace-executions-with-opentelemetry.md#tls). |
| `OTEL_BSP_*` | Tunes the batch span processor for your OTLP endpoint, for example `OTEL_BSP_MAX_QUEUE_SIZE`. |
| `OTEL_PROPAGATORS` | Chooses which trace headers n8n adds to outbound requests. Refer to [Outbound trace headers](trace-executions-with-opentelemetry.md#outbound-trace-headers). |
| `OTEL_LOG_LEVEL` | Sets the level of OpenTelemetry diagnostics in the n8n log. The default is `warn`. |

### Variables n8n ignores

n8n doesn't log a warning when you set one of these. Use the n8n variable instead.

| Variable | Use instead |
| :------- | :---------- |
| `OTEL_SERVICE_NAME` | `N8N_OTEL_EXPORTER_SERVICE_NAME` |
| `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` and `N8N_OTEL_EXPORTER_OTLP_TRACING_PATH` |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `N8N_OTEL_EXPORTER_OTLP_PROTOCOL` |
| `OTEL_TRACES_SAMPLER`, `OTEL_TRACES_SAMPLER_ARG` | `N8N_OTEL_TRACES_SAMPLE_RATE` |
| `OTEL_TRACES_EXPORTER` | `N8N_OTEL_ENABLED` |
| `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER` | None. n8n exports traces only over OpenTelemetry. |

For every `N8N_OTEL_*` variable, refer to [OpenTelemetry environment variables](../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md).

## Don't set library OpenTelemetry flags

n8n sets up OpenTelemetry once, when it starts. Some libraries that n8n uses have their own environment variables that start a separate OpenTelemetry setup. Don't set them. They bypass n8n's tracing sources and can send spans somewhere you didn't choose.

| Variable | What happens if you set it | Use instead |
| :------- | :------------------------- | :---------- |
| `DAYTONA_OTEL_ENABLED`, `DAYTONA_EXPERIMENTAL_OTEL_ENABLED` | The Daytona client starts its own OpenTelemetry setup and exporter, and replaces n8n's OpenTelemetry diagnostics logging with console output. | `N8N_DAYTONA_TRACING_ENABLED` |
| `MISTRAL_SDK_TELEMETRY` | The Mistral client can start its own exporter and send spans to Mistral. | None. n8n doesn't export Mistral spans. |
| `NODE_OPTIONS=--require @opentelemetry/auto-instrumentations-node/register`, or any other OpenTelemetry setup loaded before n8n | n8n finds an existing setup and steps aside. Workflow spans go to that setup, n8n ignores its own OpenTelemetry settings, and n8n sends no Microsoft Agent 365 spans to Microsoft. | `N8N_OTEL_*` variables or **Settings > OpenTelemetry** |

## Troubleshooting

### Expression spans don't appear

Check that:

- `N8N_OTEL_ENABLED` is `true`, or OpenTelemetry is on in **Settings > OpenTelemetry**.
- `N8N_EXPRESSION_ENGINE_TRACES_ENABLED` is `true` on every instance that runs workflows. In queue mode, set it on the main instance and on every worker.
- `N8N_EXPRESSION_ENGINE` is `vm` or `quickjs`, not `legacy`.
- You restarted n8n after setting the variables.
- Your expressions are slow, fail, or fall in the sample. With the default sample rate of `0`, n8n only sends spans for failing and slow expressions.

### n8n says another OpenTelemetry setup is registered

At startup, n8n logs this warning:

```
Another OpenTelemetry setup is already registered, so n8n sends its spans there, ignores its own OpenTelemetry settings and sends no Microsoft Agent 365 spans to Microsoft
```

Something set up OpenTelemetry before n8n started, usually a `--require` in `NODE_OPTIONS`. Remove it, and configure tracing with the `N8N_OTEL_*` variables or **Settings > OpenTelemetry** instead.

### n8n sends no spans and logs `OTEL_SDK_DISABLED is true`

`OTEL_SDK_DISABLED=true` turns off all OpenTelemetry in n8n, whatever the n8n settings say. Remove the variable, or set it to `false`, and restart n8n.

### A standard `OTEL_*` variable has no effect

n8n ignores some standard variables without a warning. Check [Variables n8n ignores](#variables-n8n-ignores), and set the matching `N8N_OTEL_*` variable instead.

## Related resources

- [Keep n8n running](./)
- [Set up logging](set-up-logging.md)
- [Monitor n8n](monitor-n8n.md)
- [Visualize metrics with Grafana](visualize-metrics-with-grafana.md)
- [Back up and restore](backup-and-restore.md)
- [Update n8n](update-n8n.md)
- [Trace executions with OpenTelemetry](trace-executions-with-opentelemetry.md)
- [OpenTelemetry environment variables](../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
- [Expression engine environment variables](../configure-n8n/basic-configuration/use-environment-variables/expression-engine.md)
