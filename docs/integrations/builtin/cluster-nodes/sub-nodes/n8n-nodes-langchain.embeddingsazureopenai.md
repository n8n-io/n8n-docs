---
title: Microsoft Foundry Embeddings node documentation
description: >-
  Learn how to use the Microsoft Foundry Embeddings node in n8n. Follow technical
  documentation to integrate Microsoft Foundry Embeddings node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Microsoft Foundry Embeddings node documentation
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

# Microsoft Foundry Embeddings node <a href="#embeddings-azure-openai-node" id="embeddings-azure-openai-node"></a>

Use the Microsoft Foundry Embeddings node to generate embeddings[^1] for a given text.

This node was previously called the Embeddings Azure OpenAI node.

On this page, you'll find the node parameters for the Microsoft Foundry Embeddings node, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Microsoft Foundry credentials documentation](../../credentials/azureopenai.md) for authentication information for this node.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}


## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Authentication**: Choose how the node signs in to Azure. Each option uses its own credential.
    * **API Key**: Use a stored API key. This is the default.
    * **Azure Entra ID (OAuth2)**: Sign in as your Entra application with a client ID and secret. Use this when your organization doesn't allow stored API keys. No API key is stored in n8n.

Both options work with the **Classic** and the **Microsoft Foundry** endpoint types. Refer to the [Microsoft Foundry credentials documentation](../../credentials/azureopenai.md) for how to set up each credential.

## Node options <a href="#node-options" id="node-options"></a>

* **Model (Deployment) Name**: Select the model (deployment) to use for generating embeddings.
* **Batch Size**: Enter the maximum number of documents to send in each request.
* **Strip New Lines**: Select whether to remove new line characters from input text (turned on) or not (turned off). n8n enables this by default.
* **Timeout**: Enter the maximum amount of time a request can take in seconds. Set to `-1` for no timeout.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Foundry Embeddings node documentation integration templates](https://n8n.io/integrations/embeddings-azure-openai) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's OpenAI embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/azure_openai/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
