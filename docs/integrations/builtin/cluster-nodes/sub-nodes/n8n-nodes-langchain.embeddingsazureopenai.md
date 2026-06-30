---
title: Embeddings Azure OpenAI node documentation
description: >-
  Learn how to use the Embeddings Azure OpenAI node in n8n. Follow technical
  documentation to integrate Embeddings Azure OpenAI node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Embeddings Azure OpenAI node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai
layout:
  description:
    visible: false
---

# Embeddings Azure OpenAI node <a href="#embeddings-azure-openai-node" id="embeddings-azure-openai-node"></a>

Use the Embeddings Azure OpenAI node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings Azure OpenAI node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/azureopenai.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}


## Node options <a href="#node-options" id="node-options"></a>

* **Model (Deployment) Name**: Select the model (deployment) to use for generating embeddings.
* **Batch Size**: Enter the maximum number of documents to send in each request.
* **Strip New Lines**: Select whether to remove new line characters from input text (turned on) or not (turned off). n8n enables this by default.
* **Timeout**: Enter the maximum amount of time a request can take in seconds. Set to `-1` for no timeout.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings Azure OpenAI node documentation integration templates](https://n8n.io/integrations/embeddings-azure-openai) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's OpenAI embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/azure_openai/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
