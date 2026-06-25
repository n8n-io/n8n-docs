---
title: Embeddings Ollama node documentation
description: >-
  Learn how to use the Embeddings Ollama node in n8n. Follow technical
  documentation to integrate Embeddings Ollama node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Embeddings Ollama node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama
layout:
  description:
    visible: false
---

# Embeddings Ollama node <a href="#embeddings-ollama-node" id="embeddings-ollama-node"></a>

Use the Embeddings Ollama node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings Ollama node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/ollama.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the embedding. Choose from:
    * [all-minilm](https://ollama.com/library/all-minilm) (384 Dimensions)
    * [nomic-embed-text](https://ollama.com/library/nomic-embed-text) (768 Dimensions)

Learn more about available models in [Ollama's models documentation](https://ollama.ai/library).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings Ollama node documentation integration templates](https://n8n.io/integrations/embeddings-ollama) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Langchain's Ollama embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/ollama/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
