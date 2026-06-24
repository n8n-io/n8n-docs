---
title: Ollama credentials
contentType:
  - integration
  - reference
priority: high
nodeTitle: Ollama credentials
originalFilePath: integrations/builtin/credentials/ollama.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/ollama
url: https://docs.n8n.io/integrations/builtin/credentials/ollama
description: >-
  Documentation for the Ollama credentials. Use these credentials to
  authenticate Ollama in n8n, a workflow automation platform.
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

# Ollama credentials

You can use these credentials to authenticate the following nodes:

* [Ollama](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/)
* [Chat Ollama](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/)
* [Embeddings Ollama](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create and run an [Ollama](https://ollama.com/) instance with one user. Refer to the Ollama [Quick Start](https://github.com/ollama/ollama/blob/main/README.md#quickstart) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* Instance URL

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Ollama's API documentation](https://github.com/ollama/ollama/blob/main/docs/api.md) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Using instance URL <a href="#using-instance-url" id="using-instance-url"></a>

To configure this credential, you'll need:

* The **Base URL** of your Ollama instance or remote authenticated Ollama instances.
* (Optional) The **API Key** for Bearer token authentication if connecting to a remote, authenticated proxy.

The default **Base URL** is `http://localhost:11434`, but if you've set the `OLLAMA_HOST` environment variable, enter that value. If you have issues connecting to a local n8n server, try `127.0.0.1` instead of `localhost`.

If you're connecting to Ollama through authenticated proxy services (such as [Open WebUI](https://docs.openwebui.com/getting-started/api-endpoints/#-ollama-api-proxy-support)) you must include an API key. If you don't need authentication, leave this field empty. When provided, the API key is sent as a Bearer token in the `Authorization` header of the request to the Ollama API.

Refer to [How do I configure Ollama server?](https://github.com/ollama/ollama/blob/main/docs/faq.mdx#how-do-i-configure-ollama-server) for more information.

### Ollama and self-hosted n8n <a href="#ollama-and-self-hosted-n8n" id="ollama-and-self-hosted-n8n"></a>

If you're self-hosting n8n on the same machine as Ollama, you may run into issues if they're running in different containers.

For this setup, open a specific port for n8n to communicate with Ollama by setting the `OLLAMA_ORIGINS` variable or adjusting `OLLAMA_HOST` to an address the other container can access.

Refer to Ollama's [How can I allow additional web origins to access Ollama?](https://docs.ollama.com/faq#how-can-i-allow-additional-web-origins-to-access-ollama) for more information.
