---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Embeddings Voyage AI node documentation
description: Learn how to use the Embeddings Voyage AI node in n8n. Follow technical documentation to integrate Embeddings Voyage AI node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Embeddings Voyage AI node

Use the Embeddings Voyage AI node to generate [embeddings](/glossary.md#ai-embedding) for a given text.

On this page, you'll find the node parameters for the Embeddings Voyage AI node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/voyageai.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"


## Node options

* **Model**: Select the model to use for generating embeddings. The available models are:
    * `voyage-3.5`
    * `voyage-3-large`
    * `voyage-3.5-lite`
    * `voyage-code-3`
    * `voyage-finance-2`
    * `voyage-code-2`
    * `voyage-law-2`
* **Input Type**: The Input Type parameter allows you to specify the type of input text for better embedding results. You can set it to query, document, or leave it undefined (which is equivalent to None).

- Query: Use this for search or retrieval queries. Voyage AI will prepend a prompt to optimize the embeddings for query use cases.
- Document: Use this for documents or content that you want to be retrievable. Voyage AI will prepend a prompt to optimize the embeddings for document use cases.
- None (default): The input text will be directly encoded without any additional prompt.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-voyageai') ]]

## Related resources

Refer to [LangChain's Voyage AI embeddings documentation](https://js.langchain.com/docs/integrations/text_embedding/voyageai/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"