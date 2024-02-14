---
title: Embeddings Mistral Cloud
description: Documentation for the Embeddings Mistral Cloud node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Embeddings Mistral Cloud

Use the Embeddings Mistral Cloud node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings Mistral Cloud node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/mistral/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Mistral Embeddings integrations](https://n8n.io/integrations/embeddings-mistral-cloud/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the embedding. Learn more about available models in [Mistral's models documentation](https://docs.mistral.ai/platform/pricing/){:target=_blank .external-link} 

## Node options

* **Batch Size**: maximum number of documents to send in each request.
* **Strip New Lines**: whether to remove new line characters from input text. n8n enables this by default.
	

## Related resources

View [example workflows and related content](https://n8n.io/integrations/embeddings-mistral-cloud/){:target=_blank .external-link} on n8n's website.

Refer to [Langchain's Mistral embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/mistralai){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
