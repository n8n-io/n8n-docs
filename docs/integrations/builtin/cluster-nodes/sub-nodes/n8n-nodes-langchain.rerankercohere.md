---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Reranker Cohere
description: Learn how to use the Reranker Cohere node in n8n. Follow technical documentation to integrate Cohere reranking into your workflows.
contentType: [integration, reference]
---

# Reranker Cohere

The Reranker Cohere node allows you to [rerank](/glossary.md#ai-reranking) the resulting chunks from a [vector store](/glossary.md#ai-vector-store). You can connect this node to a vector store.

The reranker reorders the list of documents retrieved from a vector store for a given query in order of descending relevance.

On this page, you'll find the node parameters for the Reranker Cohere node, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/cohere.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Choose the reranking model to use. You can find out more about the available models in [Cohere's model documentation](https://docs.cohere.com/docs/models#rerank).

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
