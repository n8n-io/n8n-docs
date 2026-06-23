---
title: Embeddings HuggingFace Inference node documentation
description: >-
  Learn how to use the Embeddings HuggingFace Inference node in n8n. Follow
  technical documentation to integrate Embeddings HuggingFace Inference node
  into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Embeddings HuggingFace Inference node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference
layout:
  description:
    visible: false
---

# Embeddings HuggingFace Inference node <a href="#embeddings-huggingface-inference-node" id="embeddings-huggingface-inference-node"></a>

Use the Embeddings HuggingFace Inference node to generate [embeddings](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-embedding) for a given text.

On this page, you'll find the node parameters for the Embeddings HuggingFace Inference, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/huggingface.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the embedding.

Refer to the [Hugging Face models documentation](https://huggingface.co/models?other=embeddings) for available models.

## Node options <a href="#node-options" id="node-options"></a>

* **Custom Inference Endpoint**: Enter the URL of your deployed model, hosted by HuggingFace. If you set this, n8n ignores the **Model Name**.

Refer to [HuggingFace's guide to inference](https://huggingface.co/inference-endpoints) for more information.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings HuggingFace Inference node documentation integration templates](https://n8n.io/integrations/embeddings-hugging-face-inference) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Langchain's HuggingFace Inference embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/hugging_face_inference/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

