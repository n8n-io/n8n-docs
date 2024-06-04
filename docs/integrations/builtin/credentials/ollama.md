---
title: Ollama credentials
description: Documentation for the Ollama credentials. Use these credentials to authenticate Ollama in n8n, a workflow automation platform.
---

# Ollama credentials

You can use these credentials to authenticate the following nodes:

* [Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/)
* [Chat Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/)
* [Embeddings Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama/)

## Prerequisites

Create and run an [Ollama](https://ollama.com/){:target=_blank .external-link} instance with one user. Refer to the Ollama [Quick Start](https://github.com/ollama/ollama/blob/main/README.md#quickstart){:target=_blank .external-link} for more information.

## Supported authentication methods

- Instance URL

## Related resources

Refer to [Ollama's API documentation](https://github.com/ollama/ollama/blob/main/docs/api.md){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using instance URL

To configure this credential, you'll need:

- The **Base URL** of your Ollama instance. The default is `http://localhost:11434`, but if you've set the `OLLAMA_HOST` environment variable, use whatever that variable is set to. Refer to [How do I configure Ollama server?](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-configure-ollama-server){:target=_blank .external-link} for more information.
