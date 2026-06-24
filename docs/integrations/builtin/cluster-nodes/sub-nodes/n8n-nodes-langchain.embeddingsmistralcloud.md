---
title: Embeddings Mistral Cloud node documentation
description: >-
  Learn how to use the Embeddings Mistral Cloud node in n8n. Follow technical
  documentation to integrate Embeddings Mistral Cloud node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Embeddings Mistral Cloud node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud
layout:
  description:
    visible: false
---

# Embeddings Mistral Cloud node <a href="#embeddings-mistral-cloud-node" id="embeddings-mistral-cloud-node"></a>

Use the Embeddings Mistral Cloud node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings Mistral Cloud node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/mistral.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the embedding.

Learn more about available models in [Mistral's models documentation](https://docs.mistral.ai/platform/pricing/).

## Node options <a href="#node-options" id="node-options"></a>

* **Batch Size**: Enter the maximum number of documents to send in each request.
* **Strip New Lines**: Select whether to remove new line characters from input text (turned on) or not (turned off). n8n enables this by default.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings Mistral Cloud node documentation integration templates](https://n8n.io/integrations/embeddings-mistral-cloud) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Langchain's Mistral embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/mistralai) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
