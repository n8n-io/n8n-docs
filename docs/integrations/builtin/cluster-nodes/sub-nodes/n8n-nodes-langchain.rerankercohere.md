---
title: Reranker Cohere
description: >-
  Learn how to use the Reranker Cohere node in n8n. Follow technical
  documentation to integrate Cohere reranking into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Reranker Cohere
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere
layout:
  description:
    visible: false
---

# Reranker Cohere <a href="#reranker-cohere" id="reranker-cohere"></a>

The Reranker Cohere node allows you to rerank[^1] the resulting chunks from a [vector store](#user-content-fn-2)[^2]. You can connect this node to a vector store.

The reranker reorders the list of documents retrieved from a vector store for a given query in order of descending relevance.

On this page, you'll find the node parameters for the Reranker Cohere node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/cohere.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Model <a href="#model" id="model"></a>

Choose the reranking model to use. You can find out more about the available models in [Cohere's model documentation](https://docs.cohere.com/docs/models#rerank).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Reranker Cohere integration templates](https://n8n.io/integrations/reranker-cohere) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: Reranking is a technique that refines the order of a list of candidate documents to improve the relevance of search results. Retrieval-Augmented Generation (RAG) and other applications use reranking to prioritize the most relevant information for generation or downstream tasks.
[^2]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
