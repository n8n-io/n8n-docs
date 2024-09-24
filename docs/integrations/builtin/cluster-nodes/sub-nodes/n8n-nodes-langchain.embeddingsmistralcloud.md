---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Embeddings Mistral Cloud node documentation
description: Learn how to use the Embeddings Mistral Cloud node in n8n. Follow technical documentation to integrate Embeddings Mistral Cloud node into your workflows.
contentType: integration
---

# Embeddings Mistral Cloud node

Use the Embeddings Mistral Cloud node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings Mistral Cloud node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/mistral/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding.

Learn more about available models in [Mistral's models documentation](https://docs.mistral.ai/platform/pricing/){:target=_blank .external-link}.

## Node options

* **Batch Size**: Enter the maximum number of documents to send in each request.
* **Strip New Lines**: Select whether to remove new line characters from input text (turned on) or not (turned off). n8n enables this by default.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-mistral-cloud') ]]

## Related resources

Refer to [Langchain's Mistral embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/mistralai){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
