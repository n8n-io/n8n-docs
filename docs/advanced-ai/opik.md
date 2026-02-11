---
contentType: howto
title: Use Opik with n8n
description: Configure OpenTelemetry tracing for self-hosted n8n with Opik and n8n-observability.
---

# Use Opik with n8n

[Opik](https://github.com/comet-ml/opik) is an open-source platform for LLM observability, evaluations, and prompt optimization. You can connect your self-hosted n8n instance to Opik using the [`n8n-observability`](https://github.com/comet-ml/n8n-observability) package.

/// info | Feature availability
This integration is available for self-hosted n8n. It isn't available on n8n Cloud.
///

## What you get

- Automatic tracing for workflow executions and node operations.
- OpenTelemetry-based instrumentation using OTLP export.
- Zero-code integration through n8n external hooks.
- Configurable capture and filtering for node data.

## Quick start with Docker

The fastest way to validate the integration is the example in the `n8n-observability` repository:

```bash
git clone https://github.com/comet-ml/n8n-observability.git
cd n8n-observability/examples/docker-compose
export OPIK_API_KEY=your_api_key_here
docker-compose up --build
```

After startup, open `http://localhost:5678`, run a workflow, and check traces in Opik.

## Setup options

### Option 1: Docker (recommended)

Create a custom Dockerfile that installs `n8n-observability`:

```dockerfile
FROM n8nio/n8n:latest

USER root
RUN npm install -g n8n-observability
ENV EXTERNAL_HOOK_FILES=/usr/local/lib/node_modules/n8n-observability/dist/hooks.cjs
USER node
```

Add OTLP settings to `docker-compose.yml`:

#### Opik Cloud

```yaml
services:
  n8n:
    build: .
    environment:
      OTEL_EXPORTER_OTLP_ENDPOINT: "https://www.comet.com/opik/api/v1/private/otel"
      OTEL_EXPORTER_OTLP_HEADERS: "Authorization=${OPIK_API_KEY},Comet-Workspace=default"
      N8N_OTEL_SERVICE_NAME: "my-n8n"
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

volumes:
  n8n_data:
```

To send traces to a specific Opik project, add `projectName` in headers:

```yaml
OTEL_EXPORTER_OTLP_HEADERS: "Authorization=${OPIK_API_KEY},Comet-Workspace=default,projectName=my-n8n-project"
```

#### Opik Enterprise deployment

```yaml
services:
  n8n:
    build: .
    environment:
      OTEL_EXPORTER_OTLP_ENDPOINT: "https://<comet-deployment-url>/opik/api/v1/private/otel"
      OTEL_EXPORTER_OTLP_HEADERS: "Authorization=${OPIK_API_KEY},Comet-Workspace=default"
      N8N_OTEL_SERVICE_NAME: "my-n8n"
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

volumes:
  n8n_data:
```

#### Self-hosted Opik instance

```yaml
services:
  n8n:
    build: .
    environment:
      OTEL_EXPORTER_OTLP_ENDPOINT: "http://host.docker.internal:5173/api/v1/private/otel"
      OTEL_EXPORTER_OTLP_HEADERS: "projectName=my-n8n-project"
      N8N_OTEL_SERVICE_NAME: "my-n8n"
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

volumes:
  n8n_data:
```

If Opik runs in Docker on the same network, use the Opik service name instead of `host.docker.internal`.

### Option 2: Bare metal / npm

If you're running n8n directly on your machine:

```bash
npm install -g n8n-observability
```

Set environment variables before starting n8n.

#### Opik Cloud

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://www.comet.com/opik/api/v1/private/otel
export OTEL_EXPORTER_OTLP_HEADERS='Authorization=<your-api-key>,Comet-Workspace=default'
export N8N_OTEL_SERVICE_NAME=my-n8n
export EXTERNAL_HOOK_FILES=$(npm root -g)/n8n-observability/dist/hooks.cjs
n8n start
```

#### Opik Enterprise deployment

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://<comet-deployment-url>/opik/api/v1/private/otel
export OTEL_EXPORTER_OTLP_HEADERS='Authorization=<your-api-key>,Comet-Workspace=default'
export N8N_OTEL_SERVICE_NAME=my-n8n
export EXTERNAL_HOOK_FILES=$(npm root -g)/n8n-observability/dist/hooks.cjs
n8n start
```

#### Self-hosted Opik instance

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:5173/api/v1/private/otel
export OTEL_EXPORTER_OTLP_HEADERS='projectName=my-n8n-project'
export N8N_OTEL_SERVICE_NAME=my-n8n
export EXTERNAL_HOOK_FILES=$(npm root -g)/n8n-observability/dist/hooks.cjs
n8n start
```

## Configuration reference

Use these environment variables to tune behavior:

| Variable | Purpose | Default |
| --- | --- | --- |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP exporter endpoint | - |
| `OTEL_EXPORTER_OTLP_HEADERS` | OTLP headers for authentication/workspace/project | - |
| `N8N_OTEL_SERVICE_NAME` | Service name on telemetry spans | `n8n` |
| `N8N_OTEL_NODE_INCLUDE` | Trace only listed nodes (comma-separated) | - |
| `N8N_OTEL_NODE_EXCLUDE` | Exclude listed nodes (comma-separated) | - |
| `N8N_OTEL_CAPTURE_INPUT` | Capture node input payloads | `true` |
| `N8N_OTEL_CAPTURE_OUTPUT` | Capture node output payloads | `true` |
| `N8N_OTEL_AUTO_INSTRUMENT` | Enable HTTP/Express auto-instrumentation | `false` |
| `N8N_OTEL_METRICS` | Enable metrics collection | `false` |
| `N8N_OTEL_DEBUG` | Enable debug logging | `false` |
| `EXTERNAL_HOOK_FILES` | Path to `hooks.cjs` | - |

## Node filtering examples

```bash
# Only trace selected nodes
export N8N_OTEL_NODE_INCLUDE="OpenAI,HTTP Request"

# Exclude noisy nodes
export N8N_OTEL_NODE_EXCLUDE="Wait,Set"

# Disable payload capture for privacy
export N8N_OTEL_CAPTURE_INPUT=false
export N8N_OTEL_CAPTURE_OUTPUT=false
```

## What gets tracked

Workflow-level spans include attributes such as:

- `n8n.workflow.id`
- `n8n.workflow.name`
- `n8n.span.type=workflow`

Node-level spans include attributes such as:

- `n8n.node.type`
- `n8n.node.name`
- `n8n.span.type` (`llm`, `prompt`, `evaluation`, or unset)
- `n8n.node.input` and `n8n.node.output` when capture is enabled
- `gen_ai.system` and `gen_ai.request.model` for supported AI nodes

## Verify your installation

Validate that hook resolution works:

```bash
test -f "$(npm root -g)/n8n-observability/dist/hooks.cjs" && echo "n8n-observability hook found"
```

When n8n starts, you should see logs similar to:

```text
[otel-setup] OpenTelemetry initialized: my-n8n (OTLP export enabled, n8n spans only)
[n8n-observability] observability ready and patches applied
```

## Related links

- [Opik n8n integration docs](https://www.comet.com/docs/opik/integrations/n8n)
- [n8n-observability repository](https://github.com/comet-ml/n8n-observability)
