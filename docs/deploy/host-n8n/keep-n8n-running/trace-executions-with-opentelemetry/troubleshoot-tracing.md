---
description: >-
  Fix missing traces, spans, and attributes when you trace n8n with
  OpenTelemetry.
layout:
  description:
    visible: false
status: preview
---

# Troubleshoot OpenTelemetry tracing

Find out why traces, spans, or attributes don't reach your trace backend.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

## No traces appear in your backend <a href="#no-traces-appear-in-your-backend" id="no-traces-appear-in-your-backend"></a>

If n8n can't reach the OTLP endpoint at startup, it logs an error:

```
Failed to connect to OpenTelemetry OTLP endpoint during startup
```

Check that:

- `N8N_OTEL_ENABLED` is set to `true`.
- `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` points at the base URL of the collector (not the `/v1/traces` path).
- The collector is reachable from the n8n container or host.
- Any required `N8N_OTEL_EXPORTER_OTLP_HEADERS` (such as authentication tokens) are set.

If you use the `grpc` protocol, also check that the endpoint includes an explicit port. Without one, n8n connects to port 443, not 4317.

n8n logs OpenTelemetry diagnostics at `warn` level by default. Set `N8N_LOG_LEVEL=debug` to see more detail.

## Startup connectivity error with gRPC and a private CA

The startup connectivity check for the `grpc` protocol uses the default TLS trust store. It doesn't read `OTEL_EXPORTER_OTLP_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_KEY`, or `OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE`, while the exporter honors them. A collector behind a private certificate authority, or one that requires mTLS, can fail the check and log `Failed to connect to OpenTelemetry OTLP endpoint during startup` while exporting works. The check doesn't block startup. Use **Send test trace** in **Settings > OpenTelemetry** to confirm that the collector receives spans.

## Custom span attributes are missing <a href="#custom-span-attributes-are-missing" id="custom-span-attributes-are-missing"></a>

Check that:

- You have an Enterprise license.
- You set `N8N_OTEL_ENABLED` to `true`.
- For node-level span attributes, `N8N_OTEL_TRACES_INCLUDE_NODE_SPANS` isn't set to `false`.
- If you set `N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES`, search for the new key. n8n drops keys that match built-in attributes. Refer to [Change the attribute prefixes](add-custom-span-attributes.md#change-the-attribute-prefixes).

## Outbound requests have no `baggage` header

Check that:

- OpenTelemetry is enabled in **Settings > OpenTelemetry**, or `N8N_OTEL_ENABLED` is set to `true`.
- **Send outbound trace headers** is on, and `N8N_OTEL_TRACES_INJECT_OUTBOUND` isn't set to `false`.
- `OTEL_PROPAGATORS` is unset or includes `baggage`.
- You restarted n8n after changing `OTEL_PROPAGATORS`.
- The outbound call comes from a node that uses n8n's HTTP helpers. A node that makes its own raw HTTP calls doesn't get the headers.
- The webhook request that started the execution carried a `baggage` header.
- The entries aren't all `n8n.`-prefixed. n8n drops those.
- The caller's `baggage` header is within the OpenTelemetry limits. n8n drops entries past them.

Refer to [Forward caller baggage](propagate-trace-context.md#forward-caller-baggage).

## A crashed execution has no span

Enable OpenTelemetry on the main instance. In queue mode, the main instance detects the crash and emits the span, so enabling it on the workers alone produces no crash spans. Set the same variables on every instance type so worker spans keep their parent context.

The node that was running when the instance died has no span. Node spans exported before the crash stay in the trace. See [Crashed executions](span-reference.md#crashed-executions).

## A rebuilt span shows a missing-parent warning

n8n rebuilds the span from the trace context stored on the execution. That context is the ID of the original span, which never ended, and OpenTelemetry can't reuse a span ID. That makes the rebuilt span a child of a span the backend never received. Expect the warning. The span carries `n8n.execution.reconstructed=true`. See [Caveats](span-reference.md#crashed-execution-caveats).

## Worker traces are missing parent context <a href="#worker-traces-are-missing-parent-context" id="worker-traces-are-missing-parent-context"></a>

In queue mode, workers read the parent trace context from the database. If you only set the OpenTelemetry environment variables on the main instance, worker spans won't link to the parent workflow trace. Set the same variables on every instance type.

## No agent spans appear <a href="#no-agent-spans-appear" id="no-agent-spans-appear"></a>

Agent spans depend on the OTel module. Check that:

- `N8N_OTEL_ENABLED` is set to `true`.
- `N8N_AGENTS_TRACING_ENABLED` isn't set to `false`. It defaults to `true`.

With `N8N_OTEL_ENABLED` set to `false`, agent runs still complete, but n8n emits no spans for them, whatever value you give `N8N_AGENTS_TRACING_ENABLED`.

## Expression spans don't appear

Check that:

- `N8N_OTEL_ENABLED` is `true`, or OpenTelemetry is on in **Settings > OpenTelemetry**.
- `N8N_EXPRESSION_ENGINE_TRACES_ENABLED` is `true` on every instance that runs workflows. In queue mode, set it on the main instance and on every worker.
- `N8N_EXPRESSION_ENGINE` is `vm` or `quickjs`, not `legacy`.
- You restarted n8n after setting the variables.
- Your expressions are slow, fail, or fall in the sample. With the default sample rate of `0`, n8n only sends spans for failing and slow expressions.

## n8n says another OpenTelemetry setup is registered

At startup, n8n logs this warning:

```
Another OpenTelemetry setup is already registered, so n8n sends its spans there, ignores its own OpenTelemetry settings and sends no Microsoft Agent 365 spans to Microsoft
```

Something set up OpenTelemetry before n8n started, usually a `--require` in `NODE_OPTIONS`. Remove it, and configure tracing with the `N8N_OTEL_*` variables or **Settings > OpenTelemetry** instead.

## n8n sends no spans and logs `OTEL_SDK_DISABLED is true`

`OTEL_SDK_DISABLED=true` turns off all OpenTelemetry in n8n, whatever the n8n settings say. Remove the variable, or set it to `false`, and restart n8n.

## A standard `OTEL_*` variable has no effect

n8n ignores some standard variables without a warning. Check [Variables n8n ignores](set-up-tracing.md#variables-n8n-ignores), and set the matching `N8N_OTEL_*` variable instead.

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Set up OpenTelemetry tracing](set-up-tracing.md)
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md)
- [Propagate trace context](propagate-trace-context.md)
- [Add custom span attributes](add-custom-span-attributes.md)
- [Span reference](span-reference.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
