---
title: Embeddings Google Vertex node documentation
description: >-
  Learn how to use the Embeddings Google Vertex node in n8n. Follow technical
  documentation to integrate Embeddings Google Gemini node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Embeddings Google Vertex node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglevertex.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglevertex
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglevertex
layout:
  description:
    visible: false
---

# Embeddings Google Vertex node <a href="#embeddings-google-vertex-node" id="embeddings-google-vertex-node"></a>

Use the Embeddings Google Vertex node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings Google Vertex node, and links to more resources.

{% hint style="info" %}
**Credentials**

Use [Google Vertex AI credentials](../../credentials/googlevertexai.md) to store the project and region with your service account details. This node also supports [Google Service Account credentials](../../credentials/google/service-account.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

- **Authentication**: Select **Google Service Account** (the default) or **Google Vertex AI**.
- **Project ID**: For **Google Service Account** authentication, n8n loads the project list using the service account's access. Select a listed project, or enter the project ID manually. For **Google Vertex AI** authentication, configure the project in the credential.
- **Model Name**: Enter the model name to use to generate the embedding.
- **Region**: Select **Default (Use Credential Region)** to use the region set in the credential. To override it, select **Global**, **EU (Multi-Region)**, or **US (Multi-Region)**.

Learn more about available embedding models in [Google VertexAI embeddings API documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>



[Browse Embeddings Google Vertex node documentation integration templates](https://n8n.io/integrations/embeddings-google-vertex) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Google Generative AI embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/google_generativeai) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
