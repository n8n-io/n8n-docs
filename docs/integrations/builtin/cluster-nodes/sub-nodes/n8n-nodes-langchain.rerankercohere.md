---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Reranker Cohere
description: Learn how to use the Reranker Cohere node in n8n. Follow technical documentation to integrate Cohere reraking into your workflows.
contentType: [integration, reference]
---

# Reranker Cohere

The Reranker Cohere node allows to rerank the resulting chunks from a [vector store](/glossary.md#ai-vector-store) based on Cohere. This node can be connected to a vector store.

The reranker will reorder the list of documents retrieved from a vector store with descending relevance to the given query.

On this page, you'll find the node parameters for the Reranker Cohere node, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/cohere.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Cohere offers three different models to choose from to perform the reranking operation.
More about the models available for reranking can be found [here](https://docs.cohere.com/docs/models)

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
