---
title: Embeddings Cohere node documentation
description: Learn how to use the Embeddings Cohere node in n8n. Follow technical documentation to integrate Embeddings Cohere node into your workflows.
contentType: [integration, reference]
---

# Embeddings Lemonade node

Use the Embeddings Lemonade node to generate vector embeddings using models hosted and managed by a Lemonade server. This node is useful for workflows that perform semantic search, clustering, similarity matching, or any task that requires numerical vector representations of text.

On this page, you'll find a list of operations the Embeddings Lemonade node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/lemonade.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

Configure the node with the following parameters.

### Model

The model which will generate the embeddings. Models are loaded and managed through the Lemonade server configured for this node. Select the desired model from the list of available options served by your Lemonade instance.

## Templates and examples

[[ templatesWidget(page.title, 'embeddings-lemonade') ]]

## Related resources

Refer to [Lemonade Server's documentation](https://lemonade-server.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"