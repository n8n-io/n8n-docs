---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Ollama credentials
description: Documentation for the Ollama credentials. Use these credentials to authenticate Ollama in n8n, a workflow automation platform.
contentType: integration
priority: high
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

- The **Base URL** of your Ollama instance.

The default **Base URL** is `http://localhost:11434`, but if you've set the `OLLAMA_HOST` environment variable, enter that value. If you have issues connecting to a local n8n server, try `127.0.0.1` instead of `localhost`.

Refer to [How do I configure Ollama server?](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-configure-ollama-server){:target=_blank .external-link} for more information.

### Ollama and self-hosted n8n

If you're self-hosting n8n on the same machine as Ollama, you may run into issues if they're running in different containers.

For this setup, open a specific port for n8n to communicate with Ollama by setting the `OLLAMA_ORIGINS` variable or adjusting `OLLAMA_HOST` to an address the other container can access.

Refer to Ollama's [How can I allow additional web origins to access Ollama?](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-allow-additional-web-origins-to-access-ollama){:target=_blank .external-link} for more information.
