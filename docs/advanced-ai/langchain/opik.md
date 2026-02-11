---
contentType: howto
title: Use Opik with n8n
description: How to enable Opik tracing for your self-hosted n8n instance with n8n-observability.
---

# Use Opik with n8n

[Opik](https://github.com/comet-ml/opik) is an open-source platform for LLM observability, evaluations, and prompt optimization. You can connect your self-hosted n8n instance to Opik using the [`n8n-observability`](https://github.com/comet-ml/n8n-observability) package.

/// info | Feature availability
Self-hosted n8n only.
///

## Connect your n8n instance to Opik

1. Install the `n8n-observability` package in your n8n environment.

1. Configure OTLP export variables for Opik:

   | Variable | Value |
   | --- | --- |
   | `EXTERNAL_HOOK_FILES` | Path to `n8n-observability/dist/hooks.cjs` |
   | `OTEL_EXPORTER_OTLP_ENDPOINT` | Your Opik OTLP endpoint |
   | `OTEL_EXPORTER_OTLP_HEADERS` | Opik auth/workspace/project headers |
   | `N8N_OTEL_SERVICE_NAME` | Optional service name (for example, `my-n8n`) |

1. Restart n8n.

For complete setup examples (Docker and local), see the [Opik n8n integration docs](https://www.comet.com/docs/opik/integrations/n8n) and the [n8n-observability repository](https://github.com/comet-ml/n8n-observability).
