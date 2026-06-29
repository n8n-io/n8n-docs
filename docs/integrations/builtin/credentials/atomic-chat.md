---
title: Atomic Chat credentials
contentType:
  - integration
  - reference
priority: high
nodeTitle: Atomic Chat credentials
originalFilePath: integrations/builtin/credentials/atomic-chat.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/atomic-chat
url: https://docs.n8n.io/integrations/builtin/credentials/atomic-chat
description: >-
  Documentation for Atomic Chat credentials. Use these credentials to
  authenticate Atomic Chat in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
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

# Atomic Chat credentials

You can use these credentials to authenticate the following nodes with a locally hosted [Atomic Chat](https://github.com/AtomicBot-ai/Atomic-Chat) instance:

* [OpenAI](../app-nodes/n8n-nodes-langchain.openai/)
* [Chat OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/)
* [Embeddings OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md)
* [LM OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenai/)

Atomic Chat runs an OpenAI-compatible server. Configure it through the **OpenAI** credential type and override the default API base URL.

## Prerequisites

Install and run [Atomic Chat](https://atomic.chat/), then load a model in the app. The local API listens on port `1337` by default.

## Supported authentication methods

* API key with custom Base URL (OpenAI credential)

## Related resources

Refer to the [Atomic Chat README](https://github.com/AtomicBot-ai/Atomic-Chat#-use-it-as-an-api) for API details.

## Using OpenAI credentials

To configure this credential, you'll need:

* An **API Key**: Atomic Chat accepts any non-empty placeholder (for example, `atomic`) when local auth is not enforced.
* A **Base URL** pointing at your Atomic Chat server.

Use these values:

| Field | Value |
| --- | --- |
| **API Key** | `atomic` (or your configured key) |
| **Base URL** | `http://127.0.0.1:1337/v1` |

Steps:

1. In n8n, open **Credentials** and create a new **OpenAI** credential.
2. Set **API Key** to `atomic`.
3. Set **Base URL** to `http://127.0.0.1:1337/v1`.
4. Save and test the credential. A successful test calls `GET /v1/models` on your Atomic Chat instance.
5. In OpenAI-family nodes, enter the model name shown in Atomic Chat.

If you have issues connecting to a local n8n server, try `127.0.0.1` instead of `localhost`.

### Atomic Chat and self-hosted n8n

If you're self-hosting n8n in Docker while Atomic Chat runs on the host, use `host.docker.internal` as the host address instead of `localhost`. For example:

`http://host.docker.internal:1337/v1`

If n8n and Atomic Chat run in separate Docker containers on the same network, use the Atomic Chat container name as the host (for example, `http://atomic-chat:1337/v1`).
