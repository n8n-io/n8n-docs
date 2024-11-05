---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Embeddings Ollama node documentation
description: Learn how to use the Embeddings Ollama node in n8n. Follow technical documentation to integrate Embeddings Ollama node into your workflows.
contentType: integration
priority: medium
---

# Embeddings Ollama node

Use the Embeddings Ollama node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings Ollama node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding. Choose from:
    * [all-minilm](https://ollama.com/library/all-minilm) (384 Dimensions)
    * [nomic-embed-text](https://ollama.com/library/nomic-embed-text) (768 Dimensions)

Learn more about available models in [Ollama's models documentation](https://ollama.ai/library){:target=_blank .external-link}.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-ollama') ]]

## Related resources

Refer to [Langchain's Ollama embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/ollama/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
