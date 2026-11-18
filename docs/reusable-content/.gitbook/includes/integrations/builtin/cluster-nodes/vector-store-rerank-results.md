---
title: vector-store-rerank-results
---
Enables reranking. If you enable this option, you must connect a reranking node, such as [Reranker Cohere](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere), to the vector store. That node will then rerank the results for queries. You can use this option with the `Get Many`, `Retrieve Documents (As Vector Store for Chain/Tool)` and `Retrieve Documents (As Tool for AI Agent)` modes.
