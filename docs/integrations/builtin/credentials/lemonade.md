---
title: Lemonade credentials
description: Documentation for Lemonade credentials. Use these credentials to authenticate Lemonade in n8n, a workflow automation platform.
contentType: [integration, reference]
---
# Lemonade credentials

You can use these credentials to authenticate the following nodes:

* [Lemonade Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatlemonade.md)
* [Lemonade Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmlemonade.md)
* [Embeddings Lemonade](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingslemonade.md)

## Prerequisites

Lemonade runs AI inference locally. These nodes connect directly to a Lemonade server process running on your machine or network. [Install and run Lemonade server](https://lemonade-server.ai/install_options.html) before creating credentials in n8n.

## Supported authentication methods

- Lemonade server connection

## Related resources

Refer to [Lemonade's documentation](https://lemonade-server.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Configuring Lemonade server connection

To configure this credential, you'll need:

- **Base URL**: The URL of your Lemonade server, including the API path. The default for a local installation is `http://localhost:8000/api/v1`. If you're running n8n in Docker, use `http://host.docker.internal:8000/api/v1` instead. If your Lemonade server is on a remote machine, replace `localhost` with the server's address.
- **API key** (optional): Optional API key for Lemonade server authentication. This isn't required for default Lemonade installation.


