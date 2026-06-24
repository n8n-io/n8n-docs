---
title: Embeddings Google PaLM node documentation
description: >-
  Learn how to use the Embeddings Google PaLM node in n8n. Follow technical
  documentation to integrate Embeddings Google PaLM node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Embeddings Google PaLM node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm
layout:
  description:
    visible: false
---

# Embeddings Google PaLM node <a href="#embeddings-google-palm-node" id="embeddings-google-palm-node"></a>

Use the Embeddings Google PaLM node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings Google PaLM node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/googleai.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the embedding.

n8n dynamically loads models from the Google PaLM API and you'll only see the models available to your account.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings Google PaLM node documentation integration templates](https://n8n.io/integrations/embeddings-google-palm) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Langchain's Google PaLM embeddings documentation](https://js.langchain.com/v0.2/docs/integrations/text_embedding/google_palm/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
