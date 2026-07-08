---
description: Set up the AI Assistant on self-hosted n8n using environment variables.
layout:
  width: default
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Set up AI Assistant (Preview)

{% hint style="info" %}
AI Assistant is a preview feature.
{% endhint %}

To run AI Assistant on a self-hosted instance, you need:

* An API key for an LLM provider.
* An AI model. n8n uses `anthropic/claude-opus-4-8` by default, or you can set your own.
* A sandbox provider. Daytona is recommended.
* A search provider if you want web search. Brave Search is recommended.

{% hint style="info" %}
Most AI Assistant settings use `N8N_INSTANCE_AI_*` environment variables. `INSTANCE_AI_BRAVE_SEARCH_API_KEY` is a deliberate exception. The internal module name is `instance-ai`.
{% endhint %}

### Before you start

Make sure you have:

* Access to configure environment variables for the n8n instance.
* A recent version of n8n. Run the latest stable release or later; older versions may work, but newer is better.
* An API key for a supported LLM provider:
  * Anthropic
  * OpenAI
  * OpenRouter
* A sandbox provider. Daytona is recommended.
* A search provider if you want web search. Brave Search is recommended.

### Quick setup with Daytona

Daytona is the recommended sandbox provider for most self-hosted setups.

This setup enables AI Assistant with an Anthropic model, Daytona, and Brave Search for web search.

Set these environment variables on your n8n instance:

```bash
# Enable the module and choose a model
N8N_ENABLED_MODULES=instance-ai
N8N_INSTANCE_AI_MODEL=anthropic/claude-opus-4-8
N8N_INSTANCE_AI_MODEL_API_KEY=sk-ant-xxx

# Sandbox, required
N8N_INSTANCE_AI_SANDBOX_ENABLED=true
N8N_INSTANCE_AI_SANDBOX_PROVIDER=daytona
N8N_INSTANCE_AI_SANDBOX_IMAGE=daytonaio/sandbox:0.5.3-slim

# Daytona
DAYTONA_API_URL=https://app.daytona.io/api
DAYTONA_API_KEY=dtn_xxx

# Web search, recommended
INSTANCE_AI_BRAVE_SEARCH_API_KEY=BSA-xxx
```

These variables do the following:

| Variable                           | Description                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `N8N_ENABLED_MODULES`              | Must include `instance-ai` to enable the module.                                                                    |
| `N8N_INSTANCE_AI_MODEL`            | Selects the LLM in `provider/model` format. Has a default (`anthropic/claude-opus-4-8`), so setting it is optional. |
| `N8N_INSTANCE_AI_MODEL_API_KEY`    | API key for the selected provider.                                                                                  |
| `N8N_INSTANCE_AI_SANDBOX_ENABLED`  | Set to `true`. AI Assistant requires a sandbox.                                                                     |
| `N8N_INSTANCE_AI_SANDBOX_PROVIDER` | Sandbox provider. Use `daytona` for Daytona.                                                                        |
| `N8N_INSTANCE_AI_SANDBOX_IMAGE`    | Base container image for Daytona sandboxes.                                                                         |
| `DAYTONA_API_URL`                  | Daytona API endpoint.                                                                                               |
| `DAYTONA_API_KEY`                  | Your Daytona API key.                                                                                               |
| `INSTANCE_AI_BRAVE_SEARCH_API_KEY` | Brave Search API key for web search. This variable intentionally doesn't use the `N8N_` prefix.                     |

### Docker Compose example

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    environment:
      N8N_ENABLED_MODULES: instance-ai
      N8N_INSTANCE_AI_MODEL: anthropic/claude-opus-4-8
      N8N_INSTANCE_AI_MODEL_API_KEY: sk-ant-xxx
      N8N_INSTANCE_AI_SANDBOX_ENABLED: 'true'
      N8N_INSTANCE_AI_SANDBOX_PROVIDER: daytona
      N8N_INSTANCE_AI_SANDBOX_IMAGE: daytonaio/sandbox:0.5.3-slim
      DAYTONA_API_URL: https://app.daytona.io/api
      DAYTONA_API_KEY: dtn_xxx
      INSTANCE_AI_BRAVE_SEARCH_API_KEY: BSA-xxx
```

### Apply and verify

After you set the variables:

1. Restart all n8n processes.
2. Open the editor.
3. Confirm that AI Assistant appears and responds.

### Choose a model provider

`N8N_INSTANCE_AI_MODEL` uses this format:

```
provider/model
```

Supported providers are:

* `anthropic`
* `openai`
* `openrouter`

For a hosted provider, start with `anthropic/claude-opus-4-8` or `openai/gpt-5.5`.

Examples:

```bash
# Anthropic
N8N_INSTANCE_AI_MODEL=anthropic/claude-opus-4-8

# OpenAI
N8N_INSTANCE_AI_MODEL=openai/gpt-5.5

# OpenRouter
N8N_INSTANCE_AI_MODEL=openrouter/deepseek/deepseek-v4-pro
```

Set `N8N_INSTANCE_AI_MODEL_API_KEY` to the API key for the provider you choose.

If `N8N_INSTANCE_AI_MODEL_API_KEY` isn't set, n8n uses the provider's standard environment variable as a fallback:

* `ANTHROPIC_API_KEY`
* `OPENAI_API_KEY`
* `OPENROUTER_API_KEY`

### Use a local or custom OpenAI-compatible endpoint

To use a local or custom OpenAI-compatible endpoint, set `N8N_INSTANCE_AI_MODEL_URL`.

```bash
N8N_INSTANCE_AI_MODEL_URL=http://localhost:1234/v1
N8N_INSTANCE_AI_MODEL_API_KEY=optional-key
```

Some local servers don't require an API key.

### Configure a sandbox provider

AI Assistant runs its work in an isolated sandbox, so a sandbox provider is required.

| Provider      | Best for                                                           |
| ------------- | ------------------------------------------------------------------ |
| `daytona`     | Recommended setup for most self-hosted instances.                  |
| `n8n-sandbox` | Advanced setup when you want to host the sandbox service yourself. |

### Daytona

If you follow [Quick setup with Daytona](set-up-ai-assistant-preview.md#quick-setup-with-daytona), you already have the required Daytona variables in place.

Daytona creates sandboxes on demand.

Tune the sandbox lifecycle with these variables:

```bash
N8N_INSTANCE_AI_SANDBOX_AUTO_STOP_MINUTES=15
N8N_INSTANCE_AI_SANDBOX_AUTO_ARCHIVE_MINUTES=60
N8N_INSTANCE_AI_SANDBOX_AUTO_DELETE_MINUTES=10080
```

{% hint style="info" %}
By default, Daytona stops an idle sandbox after 15 minutes, archives a stopped sandbox after 1 hour, and deletes it after 7 days. Change these with the auto-stop, auto-archive, and auto-delete variables above.
{% endhint %}

### Option B: n8n Sandbox Service

Use the [n8n Sandbox Service](https://github.com/n8n-io/n8n-sandbox-service) if you want to host the sandbox service yourself.

{% hint style="warning" %}
This is an advanced setup. Use Daytona unless you need to run the sandbox service yourself.
{% endhint %}

The n8n Sandbox Service has two containers:

* `n8nio/n8n-sandbox-service-api`: the HTTP API that n8n talks to.
* `n8nio/n8n-sandbox-service-runner-dind`: the runner that executes sandboxes as Docker-in-Docker containers.

{% hint style="warning" %}
The runner must run in privileged mode.
{% endhint %}

The API and runner communicate over mutual TLS. The API image includes a `bootstrap-mtls.sh` script that generates the certificates.

#### Full Docker Compose example

Run this alongside your n8n service:

{% code expandable="true" %}
```yaml
volumes:
  sandbox-tls:

services:
  # One-shot: generates mTLS certificates, then exits
  sandbox-certs:
    image: n8nio/n8n-sandbox-service-api:latest
    user: '0:0'
    entrypoint: ['sh', '-c']
    command:
      - >
        bootstrap-mtls.sh --out-dir /tls --api-san sandbox-api
        --control-san-prefix sandbox-runner --world-readable &&
        chown -R sandbox-api:sandbox-api /tls/api && chmod -R a+rX /tls
    environment:
      NUM_RUNNERS: '1'
    volumes:
      - sandbox-tls:/tls

  sandbox-api:
    image: n8nio/n8n-sandbox-service-api:latest
    depends_on:
      sandbox-certs:
        condition: service_completed_successfully
    environment:
      SANDBOX_API_KEYS: my-sandbox-api-key
      SANDBOX_API_RUNNER_REGISTRATION_TOKEN: my-registration-token
      SANDBOX_API_RUNNER_API_KEY: my-runner-key
      SANDBOX_API_GRPC_TLS_CERT_FILE: /tls/api/grpc-server.crt
      SANDBOX_API_GRPC_TLS_KEY_FILE: /tls/api/grpc-server.key
      SANDBOX_API_GRPC_TLS_CLIENT_CA_FILE: /tls/api/ca.crt
      SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_CA_FILE: /tls/api/ca.crt
      SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_CERT_FILE: /tls/api/control-grpc-api-client.crt
      SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_KEY_FILE: /tls/api/control-grpc-api-client.key
      SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_SERVER_NAME: sandbox-runner-1
    volumes:
      - sandbox-tls:/tls:ro

  sandbox-runner-1:
    image: n8nio/n8n-sandbox-service-runner-dind:latest
    privileged: true
    depends_on:
      - sandbox-api
    environment:
      SANDBOX_RUNNER_API_KEYS: my-runner-key
      SANDBOX_RUNNER_REGISTRATION_TOKEN: my-registration-token
      SANDBOX_RUNNER_API_GRPC_ADDR: sandbox-api:9090
      SANDBOX_RUNNER_HTTP_BASE_URL: http://sandbox-runner-1:8080
      SANDBOX_RUNNER_CONTROL_GRPC_LISTEN_ADDR: ':9091'
      SANDBOX_RUNNER_CONTROL_GRPC_ADVERTISE_ADDR: sandbox-runner-1:9091
      SANDBOX_RUNNER_ID: runner-1
      SANDBOX_RUNNER_DOCKER_SANDBOX_IMAGE: n8nio/n8n-sandbox-service-sandbox:latest
      SANDBOX_RUNNER_REGISTRATION_GRPC_CA_FILE: /tls/runner/ca.crt
      SANDBOX_RUNNER_REGISTRATION_GRPC_CERT_FILE: /tls/runner/grpc-client.crt
      SANDBOX_RUNNER_REGISTRATION_GRPC_KEY_FILE: /tls/runner/grpc-client.key
      SANDBOX_RUNNER_REGISTRATION_GRPC_SERVER_NAME: sandbox-api
      SANDBOX_RUNNER_CONTROL_GRPC_TLS_CERT_FILE: /tls/runner/control-grpc-server.crt
      SANDBOX_RUNNER_CONTROL_GRPC_TLS_KEY_FILE: /tls/runner/control-grpc-server.key
      SANDBOX_RUNNER_CONTROL_GRPC_TLS_CLIENT_CA_FILE: /tls/runner/ca.crt
    volumes:
      - sandbox-tls:/tls:ro
```
{% endcode %}

#### Point n8n at the sandbox service

After the service is running, set these variables on your n8n instance:

```bash
N8N_INSTANCE_AI_SANDBOX_ENABLED=true
N8N_INSTANCE_AI_SANDBOX_PROVIDER=n8n-sandbox
N8N_SANDBOX_SERVICE_URL=http://sandbox-api:8080
N8N_SANDBOX_SERVICE_API_KEY=my-sandbox-api-key
```

| Variable                           | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| `N8N_INSTANCE_AI_SANDBOX_ENABLED`  | Set to `true`.                                      |
| `N8N_INSTANCE_AI_SANDBOX_PROVIDER` | Set to `n8n-sandbox`.                               |
| `N8N_SANDBOX_SERVICE_URL`          | URL of the sandbox API, reachable from n8n.         |
| `N8N_SANDBOX_SERVICE_API_KEY`      | Must match `SANDBOX_API_KEYS` on the API container. |

Verify that the service is running:

```bash
curl http://<sandbox-api-host>:8080/healthz
```

Expected response:

```json
{"status":"ok"}
```

Notes:

* Replace `my-sandbox-api-key`, `my-registration-token`, and `my-runner-key` with your own secrets.
* The runner pulls `n8nio/n8n-sandbox-service-sandbox` from Docker Hub on first use.
* For air-gapped setups, preload `n8nio/n8n-sandbox-service-sandbox` into the runner's inner Docker.
* Hostnames matter. The certificates are issued for `sandbox-api` and `sandbox-runner-<n>`, so keep those service names or regenerate certificates with matching SANs.

### Optional features

After the base setup works, you can adjust web search.

#### Enable web search

Web search lets AI Assistant look things up on the web. It requires a search provider.

Brave Search is the recommended provider. The recommended setup includes Brave Search by default. If you don't configure web search, the rest of AI Assistant still works, but the web-search action stays disabled.

```bash
# Brave Search
INSTANCE_AI_BRAVE_SEARCH_API_KEY=BSA-xxx

# SearXNG
N8N_INSTANCE_AI_SEARXNG_URL=http://searxng:8080
```

{% hint style="info" %}
`INSTANCE_AI_BRAVE_SEARCH_API_KEY` intentionally doesn't use the `N8N_` prefix. Use the variable exactly as shown.
{% endhint %}

If you want web search, configure Brave Search. If you also configure SearXNG, Brave Search takes priority over SearXNG.

Free or unauthenticated providers, including SearXNG, can hit rate limits. Use Brave Search for a more reliable setup.

If an instance admin selects a Brave Search or SearXNG credential in the AI settings UI, n8n uses that credential instead of these environment variables.

### Disable AI Assistant

To disable AI Assistant, remove `instance-ai` from `N8N_ENABLED_MODULES`.

You can also disable the module explicitly:

```bash
N8N_DISABLED_MODULES=instance-ai
```

### Troubleshooting

If AI Assistant doesn't appear or doesn't work, check that:

* `N8N_ENABLED_MODULES` includes `instance-ai`.
* The model value uses `provider/model` format if you set `N8N_INSTANCE_AI_MODEL`.
* The API key is valid for the selected provider.
* `N8N_INSTANCE_AI_SANDBOX_ENABLED` is set to `true`.
* A sandbox provider is configured.
* The sandbox provider is reachable from the n8n instance.
* For Daytona, `DAYTONA_API_URL` and `DAYTONA_API_KEY` are set.
* If you want web search, `INSTANCE_AI_BRAVE_SEARCH_API_KEY` is set, or `N8N_INSTANCE_AI_SEARXNG_URL` is set.
* For n8n Sandbox Service, `N8N_SANDBOX_SERVICE_API_KEY` matches `SANDBOX_API_KEYS` on the API container.
* The sandbox service health check returns `{"status":"ok"}`.
