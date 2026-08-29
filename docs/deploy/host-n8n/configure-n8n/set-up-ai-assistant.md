---
description: Set up the AI Assistant on self-hosted n8n using environment variables.
status: preview
tags:
  - tag: preview
    primary: true
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

# Set up AI Assistant

{% hint style="info" %}
**Feature availability**

The AI Assistant is available on:

- **n8n Cloud:** Starter, Pro
- **Self-hosted:** Community, Registered Community, Business

It isn't ready for n8n Cloud Enterprise or self-hosted Enterprise yet. If you're an Enterprise customer, contact your Customer Success Manager about preview access.
{% endhint %}

{% hint style="info" %}
**Preview status**

The AI Assistant is in Preview. It can make mistakes, and behavior may change while the feature is in development. Always review generated workflows before using them in production.
{% endhint %}

## What AI Assistant needs

Every self-hosted AI Assistant setup needs three things:

* **A model provider:** An API key for Anthropic, OpenAI, or OpenRouter.
* **A sandbox (required):** An isolated environment where AI Assistant runs code.
* **A search provider (optional):** Lets AI Assistant look things up on the web.

How you provide the sandbox is the main decision. n8n's own bundled sandbox (`n8n-sandbox`) is a good fit for local development and testing. It's what the [one-line setup command](../install-options/one-line-setup.md) and [Docker Compose guide](../install-options/install-using-docker-compose.md) set up automatically. For production, use Daytona instead.

[Pick your setup](#pick-your-setup) below based on how you installed n8n and where you're running it.

### Before you start

Make sure you have:

* Access to configure environment variables for the n8n instance.
* A recent version of n8n. Run the latest stable release or later; older versions may work, but newer is better.
* An API key for a supported LLM provider: Anthropic, OpenAI, or OpenRouter.

## Pick your setup

| Setup | When to use this | Sandbox hosted by | Best for |
| --- | --- | --- | --- |
| [1. Already running the sandbox](#setup-1-already-running-the-sandbox-recommended-for-local-development) | You installed with the one-line setup command or the Docker Compose guide. | You (already done) | Local development and testing |
| [2. Self-host the sandbox manually](#setup-2-self-host-the-sandbox-manually-advanced) | You're running n8n some other way and want to self-host the sandbox rather than use Daytona. | You | Local development and testing |
| [3. Daytona (managed sandbox)](#setup-3-daytona-managed-sandbox-recommended-for-production) | You're deploying to production, or don't want to run sandbox containers yourself. | Daytona | Production |

### Setup 1: Already running the sandbox (recommended for local development)

If you installed n8n with the [one-line setup command](../install-options/one-line-setup.md) or built it by hand with the [Docker Compose guide](../install-options/install-using-docker-compose.md), the sandbox and search, using bundled SearXNG, are already running. All that's left is a model key.

**What you need:** an LLM API key. Nothing else.

**Steps:**

The quickest way: open the editor, go to the instance's AI settings, and add your model key there. Prefer `.env`?  Use the steps below.

1. Add your model key to `.env`:

   ```bash
   N8N_INSTANCE_AI_MODEL_API_KEY=sk-ant-xxx
   ```

2. Restart n8n.
3. Open the editor and confirm AI Assistant appears and responds.

`N8N_INSTANCE_AI_MODEL` defaults to `anthropic/claude-opus-4-8`. Set it explicitly only if you want a different model (see [Choose a model provider](#choose-a-model-provider)).

Prefer to watch? This [video guide](https://go.n8n.io/RZZWq1) covers the setup end to end, from the one-line install to selecting a provider and model in the editor.

### Setup 2: Self-host the sandbox manually (advanced)

Use this if you're configuring n8n outside of the one-line setup command or Docker Compose guide, and you want to run the sandbox yourself rather than hand it to Daytona.

{% hint style="warning" %}
This means hosting two extra containers yourself: the sandbox API and a privileged Docker-in-Docker runner, plus mutual TLS between them. Like setup 1, this uses `n8n-sandbox`, which is best suited to local development and testing. For production, use [Daytona](#setup-3-daytona-managed-sandbox-recommended-for-production) instead.
{% endhint %}

**What you need:**

* The n8n Sandbox Service running and reachable from n8n. See the [Docker Compose guide](../install-options/install-using-docker-compose.md) for the full stack (`sandbox-certs`, `sandbox-api`, `sandbox-runner-1`) and its secrets.
* An LLM API key.

**Steps:**

1. Stand up the sandbox stack (Docker Compose guide linked above).
2. Point n8n at it:

   ```bash
   N8N_INSTANCE_AI_SANDBOX_ENABLED=true
   N8N_INSTANCE_AI_SANDBOX_PROVIDER=n8n-sandbox
   N8N_SANDBOX_SERVICE_URL=http://sandbox-api:8080
   N8N_SANDBOX_SERVICE_API_KEY=my-sandbox-api-key
   ```

   | Variable | Description |
   | --- | --- |
   | `N8N_INSTANCE_AI_SANDBOX_ENABLED` | Set to `true`. |
   | `N8N_INSTANCE_AI_SANDBOX_PROVIDER` | Set to `n8n-sandbox`. |
   | `N8N_SANDBOX_SERVICE_URL` | URL of the sandbox API, reachable from n8n. |
   | `N8N_SANDBOX_SERVICE_API_KEY` | Must match `SANDBOX_API_KEYS` on the API container. |

3. Add your model key (see [Choose a model provider](#choose-a-model-provider)) and restart n8n.

**Verify:**

```bash
curl http://<sandbox-api-host>:8080/healthz
```

Expected response: `{"status":"ok"}`

**Notes:**

* Replace `my-sandbox-api-key` with your own secret, and set matching registration-token and runner-key secrets on the API and runner containers. See the [Docker Compose guide](../install-options/install-using-docker-compose.md) for the full set of variables and how they connect.
* `N8N_SANDBOX_SERVICE_API_KEY` must match a value in `SANDBOX_API_KEYS` on the sandbox API container.
* The runner pulls its sandbox image on first use. For air-gapped setups, preload that image into the runner's inner Docker.
* Hostnames matter. The certificates are issued for `sandbox-api` and `sandbox-runner-<n>`, so keep those service names or regenerate certificates with matching SANs.

### Setup 3: Daytona (managed sandbox, recommended for production)

Daytona creates sandboxes on demand instead of you hosting the containers yourself. It's the sandbox provider n8n recommends for production use.

**What you need:** a Daytona account and API key, plus an LLM API key.

**Steps:**

1. Set these environment variables on your n8n instance:

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

   | Variable | Description |
   | --- | --- |
   | `N8N_ENABLED_MODULES` | Must include `instance-ai` to enable the module. |
   | `N8N_INSTANCE_AI_MODEL` | Selects the LLM in `provider/model` format. Has a default (`anthropic/claude-opus-4-8`). Set it explicitly only if you want a different model. |
   | `N8N_INSTANCE_AI_MODEL_API_KEY` | API key for the selected provider. |
   | `N8N_INSTANCE_AI_SANDBOX_ENABLED` | Set to `true`. AI Assistant requires a sandbox. |
   | `N8N_INSTANCE_AI_SANDBOX_PROVIDER` | Set to `daytona`. |
   | `N8N_INSTANCE_AI_SANDBOX_IMAGE` | Base container image for Daytona sandboxes. |
   | `DAYTONA_API_URL` | Daytona API endpoint. |
   | `DAYTONA_API_KEY` | Your Daytona API key. |
   | `INSTANCE_AI_BRAVE_SEARCH_API_KEY` | Brave Search API key for web search. This variable intentionally doesn't use the `N8N_` prefix. |

   Docker Compose example:

   ```yaml
   services:
     n8n:
       image: n8nio/n8n
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

2. Restart n8n, open the editor, and confirm AI Assistant appears and responds.

**Optional: tune the sandbox lifecycle**

```bash
N8N_INSTANCE_AI_SANDBOX_AUTO_STOP_MINUTES=15
N8N_INSTANCE_AI_SANDBOX_AUTO_ARCHIVE_MINUTES=60
N8N_INSTANCE_AI_SANDBOX_AUTO_DELETE_MINUTES=10080
```

{% hint style="info" %}
By default, Daytona stops an idle sandbox after 15 minutes, archives a stopped sandbox after one hour, and deletes it after seven days. Change these settings with the variables above.
{% endhint %}

## Choose a model provider

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

## Enable web search

Web search lets AI Assistant look things up on the web. It's optional, and the rest of AI Assistant works without it.

If you used the [one-line setup](../install-options/one-line-setup.md) or the [Docker Compose guide](../install-options/install-using-docker-compose.md), SearXNG is already bundled and running. No setup is needed unless you'd rather use Brave Search instead.

```bash
# Brave Search
INSTANCE_AI_BRAVE_SEARCH_API_KEY=BSA-xxx

# SearXNG
N8N_INSTANCE_AI_SEARXNG_URL=http://searxng:8080
```

{% hint style="info" %}
`INSTANCE_AI_BRAVE_SEARCH_API_KEY` intentionally doesn't use the `N8N_` prefix. Use the variable exactly as shown.
{% endhint %}

If you configure both, Brave Search takes priority over SearXNG. Free or unauthenticated providers, including SearXNG, can hit rate limits, so use Brave Search for a more reliable setup.

If an instance admin selects a Brave Search or SearXNG credential in the AI settings UI, n8n uses that credential instead of these environment variables.

## Enable agents

Agents run on the same self-hosted stack as AI Assistant. Once AI Assistant works, add the `agents` module to [build and run agents on your instance](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents). Agents are in Preview and available from n8n 2.32.3.

{% hint style="info" %}
**Feature availability**

Agents aren't available on self-hosted Enterprise yet.
{% endhint %}

You build agents manually with just the `agents` module: you pick the model, write the instructions, and attach the tools and skills yourself. AI Assistant (`instance-ai`) is optional and adds AI-assisted building, where you describe an agent and n8n scaffolds it for you.

Add `agents` to `N8N_ENABLED_MODULES`, alongside `instance-ai` if you want AI-assisted building:

```bash
# Enable the agents module (keep instance-ai for AI-assisted building)
N8N_ENABLED_MODULES=instance-ai,agents

# Knowledge base, optional: reuses the Daytona sandbox you set up for AI Assistant
N8N_AGENTS_AI_SANDBOX_ENABLED=true
N8N_AGENTS_AI_SANDBOX_PROVIDER=daytona

# Channels, optional: public URL so Slack, Telegram, and Linear can reach your instance
WEBHOOK_URL=https://your-public-url
```

| Variable | Description |
| --- | --- |
| `N8N_ENABLED_MODULES` | Include `agents` to enable the module. Keep `instance-ai` for AI-assisted building. |
| `N8N_AGENTS_AI_SANDBOX_ENABLED` | Set to `true` to enable the knowledge base, so agents can search uploaded files. Requires a Daytona sandbox. |
| `N8N_AGENTS_AI_SANDBOX_PROVIDER` | Sandbox provider for the knowledge base. Use `daytona`. Reuses the Daytona keys you set for AI Assistant. |
| `WEBHOOK_URL` | Public, secure URL for your instance. Required to connect agents to channels such as Slack, Telegram, and Linear. |

{% hint style="info" %}
**Feature availability**

The knowledge base needs the Daytona sandbox on self-hosted. Without it, the rest of the agent still works.
{% endhint %}

{% hint style="info" %}
**Preview status**

On self-hosted, the knowledge base is in Preview.
{% endhint %}

For a full deployment example, see [Installation options](../install-options/README.md). After you enable the module, see [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents).

## Disable AI Assistant

To disable AI Assistant, remove `instance-ai` from `N8N_ENABLED_MODULES`.

You can also disable the module explicitly:

```bash
N8N_DISABLED_MODULES=instance-ai
```

## Troubleshooting

If AI Assistant doesn't appear or doesn't work, check for these issues.

**General**

* `N8N_ENABLED_MODULES` includes `instance-ai`.
* The model value uses `provider/model` format if you set `N8N_INSTANCE_AI_MODEL`.
* The API key is valid for the selected provider.
* `N8N_INSTANCE_AI_SANDBOX_ENABLED` is set to `true`.

**Self-hosted sandbox (setup 2)**

* `N8N_SANDBOX_SERVICE_API_KEY` matches `SANDBOX_API_KEYS` on the API container.
* The sandbox health check returns `{"status":"ok"}`.
* `N8N_SANDBOX_SERVICE_URL` is reachable from the n8n container.

**Daytona (setup 3)**

* `DAYTONA_API_URL` and `DAYTONA_API_KEY` are set.
* Your Daytona account has capacity to create a new sandbox.

**Web search**

* `INSTANCE_AI_BRAVE_SEARCH_API_KEY` is set, or `N8N_INSTANCE_AI_SEARXNG_URL` is set.
* If nothing is set, this is expected. Web search is optional and the rest of AI Assistant still works.

See [Configure n8n](./) for other configuration topics.