---
title: Lemonade credentials
description: Documentation for Lemonade credentials. Use these credentials to authenticate Lemonade in n8n, a workflow automation platform.
contentType: [integration, reference]
---
# Lemonade credentials

You can use these credentials to authenticate the following nodes:

* [Lemonade Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmlmchatlemonade.md)
* [Lemonade Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmlemonade.md)
* [Embeddings Cohere](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingslemonade.md)

## Prerequisites

Lemonade is designed for local AI inference — these nodes connects directly to a Lemonade server process running on your machine or network. [Install and run Lemonade server](https://lemonade-server.ai/install_options.html) before creating credentials in n8n.

## Supported authentication methods

- API key (optional)

## Related resources

Refer to [Lemonade's's documentation](https://lemonade-server.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

Your Contentful Space ID: The Space ID displays as you generate the tokens; You can also refer to the Contentful Find space ID documentation to view the Space ID.
A Content Delivery API Access Token: Required if you want to use the Content Delivery API. Leave blank if you don't intend to use this API.
A Content Preview API Access Token: Required if you want to use the Content Preview API. Leave blank if you don't intend to use this API.
View and generate access tokens in Contentful in Settings > API keys. Contentful generates tokens for both Content Delivery API and Content Preview API as part of a single key. Refer to the Contentful API authentication documentation for detailed instructions.



