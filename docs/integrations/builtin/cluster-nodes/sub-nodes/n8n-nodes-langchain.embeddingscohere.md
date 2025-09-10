---
title: Embeddings Cohere node documentation
description: Learn how to use the Embeddings Cohere node in n8n. Follow technical documentation to integrate Embeddings Cohere node into your workflows.
contentType: [integration, reference]
---

# Embeddings Cohere node

Use the Embeddings Cohere node to generate [embeddings](/glossary.md#ai-embedding) for a given text.

On this page, you'll find the node parameters for the Embeddings Cohere node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/cohere.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding. Choose from:
    * **Embed-English-v2.0(4096 Dimensions)**
	* **Embed-English-Light-v2.0(1024 Dimensions)**
	* **Embed-Multilingual-v2.0(768 Dimensions)**

Learn more about available models in [Cohere's models documentation](https://docs.cohere.com/docs/models).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-cohere') ]]

## Related resources

Refer to [Langchain's Cohere embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/cohere/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

