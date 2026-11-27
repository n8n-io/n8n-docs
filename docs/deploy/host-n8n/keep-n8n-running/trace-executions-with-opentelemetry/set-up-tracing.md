---
description: >-
  Turn on OpenTelemetry tracing in n8n, choose the OTLP protocol, and learn how
  n8n reads the standard OTEL_* environment variables.
layout:
  description:
    visible: false
status: preview
---

# Set up OpenTelemetry tracing

Turn on tracing in **Settings > OpenTelemetry** or with environment variables, then point n8n at your OpenTelemetry collector.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

## Enable tracing in the UI <a href="#enable-tracing-in-the-ui" id="enable-tracing-in-the-ui"></a>

{% hint style="info" %}
**Feature availability**

Configuring OpenTelemetry tracing from the UI is available from n8n 2.27.0. You need to be an instance owner or admin to configure OpenTelemetry in the UI.
{% endhint %}

Instead of setting environment variables, you can configure tracing from **Settings > OpenTelemetry**. n8n applies your changes without a restart, and reloads them across workers and webhook processors in [queue mode](../../configure-n8n/scaling/enable-queue-mode.md).

To configure tracing:

1. Select **Settings > OpenTelemetry**.
1. Turn on **Enable OpenTelemetry**.
1. Under **Collector connection**, enter your **OTLP endpoint** and any other connection details.
1. Under **Tracing**, set your sampling and span options.
1. Select **Save settings**.

To check that n8n can reach your collector, select **Send test trace** under **Verify configuration**. n8n sends a single test span and reports whether the collector accepted it. You can run this before or after you save.

Each field maps to an environment variable, shown in the field's tooltip. For the full list, see [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md).

{% hint style="info" %}
**Environment variables take precedence**

If you set an option with an environment variable, n8n uses that value and disables the matching field in the UI. To manage a setting from the UI, leave its environment variable unset. When n8n restarts, environment variables override the values saved in the UI.
{% endhint %}

## Enable tracing with environment variables <a href="#enable-tracing-with-environment-variables" id="enable-tracing-with-environment-variables"></a>

Set the following environment variables on each n8n instance you want workflow tracing enabled (main, workers, and webhook processors):

```bash
export N8N_OTEL_ENABLED=true
export N8N_OTEL_EXPORTER_OTLP_ENDPOINT=http://<your-collector-host>:4318
```

Restart n8n. The instance starts exporting spans over OTLP HTTP using the Protobuf encoding. To export over gRPC instead, refer to [Choose the OTLP protocol](#choose-the-otlp-protocol).

n8n appends `/v1/traces` to the endpoint by default. Point `N8N_OTEL_EXPORTER_OTLP_ENDPOINT` at the base URL of your collector, not the traces path. The endpoint must be an `http://` or `https://` URL. If you set another scheme, or no scheme, n8n logs a warning and uses the default endpoint.

If your collector needs authentication, set `N8N_OTEL_EXPORTER_OTLP_HEADERS` to a comma-separated list of `key=value` pairs:

```bash
export N8N_OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer <your-token>,x-tenant=acme"

// For added protection - It is recommended to use the `_FILE` postfix if you are putting a token in here:
export N8N_OTEL_EXPORTER_OTLP_HEADERS_FILE=/mnt/otel-headers
```

For the full list of supported variables, refer to [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md).

{% hint style="info" %}
**Queue mode**

In [queue mode](../../configure-n8n/scaling/enable-queue-mode.md), the OpenTelemetry variables must be set on all instances. Trace context is propagated between instances.
{% endhint %}

If you deploy n8n on AWS using the [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module, see [Configure Enterprise features on AWS](../../install-options/use-a-cloud-provider/deploy-to-aws-with-terraform/use-enterprise-features-on-aws.md#opentelemetry-tracing) for the module-specific setup.

## Try it out with Jaeger <a href="#try-it-out-with-jaeger" id="try-it-out-with-jaeger"></a>

You can send traces to a local [Jaeger](https://www.jaegertracing.io/) instance to see them in action.

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

3. Start n8n with tracing turned on and pointed at Jaeger. Refer to [starting n8n](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md) for setup details:

```bash
N8N_OTEL_ENABLED=true N8N_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 n8n start
```

5. Run a workflow, then open the Jaeger UI at [http://localhost:16686](http://localhost:16686) - Select "n8n" as service" and click "Find traces" to see the OpenTelemetry traces emitted by n8n.

## Choose the OTLP protocol

{% hint style="info" %}
**Feature availability**

The OTLP gRPC protocol, with the **Protocol** setting and the `N8N_OTEL_EXPORTER_OTLP_PROTOCOL` environment variable, is available from n8n 2.39.0.
{% endhint %}

n8n can export traces over two OTLP transports:

- **`http/protobuf`** (default): OTLP over HTTP with Protobuf encoding. Collectors listen for it on port 4318 by convention. It works through proxies, ingresses, and firewalls that don't support HTTP/2, and it's simpler to debug.
- **`grpc`**: OTLP over gRPC. Collectors listen for it on port 4317 by convention. HTTP/2 multiplexing and binary framing give it lower overhead per export. The difference matters most at high span volume. It needs HTTP/2 support end to end. Some proxies and load balancers require explicit configuration for HTTP/2.

Keep the default `http/protobuf` unless your collector only accepts gRPC, or you export a high trace volume through infrastructure that supports HTTP/2.

To select the protocol, set the **Protocol** field in **Settings > OpenTelemetry**, or set the environment variable:

```bash
export N8N_OTEL_EXPORTER_OTLP_PROTOCOL=grpc
```

The variable name and its values (`http/protobuf` and `grpc`) match the upstream [`OTEL_EXPORTER_OTLP_PROTOCOL`](https://opentelemetry.io/docs/specs/otel/protocol/exporter/) specification. As with the other fields in **Settings > OpenTelemetry**, n8n disables the **Protocol** field when you set the environment variable.

### TLS

The endpoint scheme controls TLS for both protocols. `https://` turns TLS on and `http://` turns it off. n8n doesn't accept a `grpc://` scheme.

To trust a custom certificate authority, or to present a client certificate for mutual TLS (mTLS), use the upstream OpenTelemetry variables `OTEL_EXPORTER_OTLP_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_KEY`, and `OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE`. For the `http/protobuf` protocol, `NODE_EXTRA_CA_CERTS` also works. n8n has no setting of its own for certificates.

### gRPC behavior

The `grpc` protocol differs from `http/protobuf` in these ways:

- **Include the port in the endpoint.** A gRPC endpoint without an explicit port connects to port 443, the gRPC default, not 4317. Write `http://<your-collector-host>:4317`.
- **gRPC endpoints take no URL path.** n8n ignores the **Trace path** setting (`N8N_OTEL_EXPORTER_OTLP_TRACING_PATH`) and hides its row in the UI. n8n keeps the saved value and applies it again if you switch back to `http/protobuf`.
- **Custom headers become gRPC metadata.** n8n converts the keys to lowercase. It skips entries that gRPC rejects, including `-bin`-suffixed keys with text values, and logs a warning instead of failing startup.
- **The startup connectivity check waits for the gRPC channel to become ready.** A ready channel proves that n8n can open a TCP connection, complete the TLS handshake for `https://`, and establish an HTTP/2 connection. It doesn't prove that the endpoint serves OTLP. Use **Send test trace** in **Settings > OpenTelemetry** to confirm that the collector receives spans. The check doesn't block startup.

## Standard OpenTelemetry environment variables

{% hint style="info" %}
**Feature availability**

The n8n handling of standard `OTEL_*` variables described in this section is available from n8n 2.47.0 and n8n 3.1.0. n8n 3.0.x doesn't include it.
{% endhint %}

OpenTelemetry defines standard `OTEL_*` environment variables. n8n has its own setting for most options. Where it does, n8n's setting wins over the standard variable. A few standard variables, such as `OTEL_SDK_DISABLED`, apply whatever n8n's settings say. Refer to [Variables n8n applies](#variables-n8n-applies).

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
| `OTEL_EXPORTER_OTLP_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE`, `OTEL_EXPORTER_OTLP_CLIENT_KEY`, and their `_TRACES_` versions | Set a custom certificate authority and mutual TLS. Refer to [TLS](#tls). |
| `OTEL_BSP_*` | Tunes the batch span processor for your OTLP endpoint, for example `OTEL_BSP_MAX_QUEUE_SIZE`. |
| `OTEL_PROPAGATORS` | Chooses which trace headers n8n adds to outbound requests. Refer to [Outbound trace headers](propagate-trace-context.md#outbound-trace-headers). |
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

For every `N8N_OTEL_*` variable, refer to [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md).

## Don't set library OpenTelemetry flags

n8n sets up OpenTelemetry once, when it starts. Some libraries that n8n uses have their own environment variables that start a separate OpenTelemetry setup. Don't set them. They bypass n8n's tracing sources and can send spans somewhere you didn't choose.

| Variable | What happens if you set it | Use instead |
| :------- | :------------------------- | :---------- |
| `DAYTONA_OTEL_ENABLED`, `DAYTONA_EXPERIMENTAL_OTEL_ENABLED` | The Daytona client starts its own OpenTelemetry setup and exporter, and replaces n8n's OpenTelemetry diagnostics logging with console output. | `N8N_DAYTONA_TRACING_ENABLED` |
| `MISTRAL_SDK_TELEMETRY` | The Mistral client can start its own exporter and send spans to Mistral. | None. n8n doesn't export Mistral spans. |
| `NODE_OPTIONS=--require @opentelemetry/auto-instrumentations-node/register`, or any other OpenTelemetry setup loaded before n8n | n8n finds an existing setup and steps aside. Workflow spans go to that setup, n8n ignores its own OpenTelemetry settings, and n8n sends no Microsoft Agent 365 spans to Microsoft. | `N8N_OTEL_*` variables or **Settings > OpenTelemetry** |

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md)
- [Propagate trace context](propagate-trace-context.md)
- [Add custom span attributes](add-custom-span-attributes.md)
- [Span reference](span-reference.md)
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
- [OpenTelemetry Collector documentation](https://opentelemetry.io/docs/collector/)
