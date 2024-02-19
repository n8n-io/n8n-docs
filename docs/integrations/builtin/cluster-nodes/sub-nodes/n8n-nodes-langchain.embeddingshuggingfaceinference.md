---
title: Embeddings HuggingFace Inference
description: Documentation for the Embeddings HuggingFace Inference node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Embeddings HuggingFace Inference

Use the Embeddings HuggingFace Inference node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings HuggingFace Inference, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/huggingface/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [HuggingFace Inference Embeddings integrations](https://n8n.io/integrations/embeddings-hugging-face-inference/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the embedding. Refer to the [Hugging Face models documentation](https://huggingface.co/models?other=embeddings){:target=_blank .external-link} for available models.

## Node options

Custom Inference Endpoint: the URL of your deployed model, hosted by HuggingFace. If you set this, n8n ignores the Model Name.

Refer to [HuggingFace's guide to inference](https://huggingface.co/inference-endpoints){:target=_blank .external-link} for more information.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/embeddings-hugging-face-inference/){:target=_blank .external-link} on n8n's website.

Refer to [Langchain's HuggingFace Inference embeddings documentation](https://js.langchain.com/docs/modules/data_connection/text_embedding/integrations/hugging_face_inference){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
