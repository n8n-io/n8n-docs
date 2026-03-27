---
title: Embeddings HuggingFace Inference node documentation
description: Learn how to use the Embeddings HuggingFace Inference node in n8n. Follow technical documentation to integrate Embeddings HuggingFace Inference node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Embeddings HuggingFace Inference node

Use the Embeddings HuggingFace Inference node to generate [embeddings](/glossary.md#ai-embedding) for a given text.

On this page, you'll find the node parameters for the Embeddings HuggingFace Inference, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/huggingface.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding.

Refer to the [Hugging Face models documentation](https://huggingface.co/models?other=embeddings) for available models.

## Node options

* **Custom Inference Endpoint**: Enter the URL of your deployed model, hosted by HuggingFace. If you set this, n8n ignores the **Model Name**.

Refer to [HuggingFace's guide to inference](https://huggingface.co/inference-endpoints) for more information.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-hugging-face-inference') ]]

## Related resources

Refer to [Langchain's HuggingFace Inference embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/hugging_face_inference/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

