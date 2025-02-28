---
title: Milvus Vector Store
description: Documentation for the Milvus node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# MIlvus Vector Store

Use the Milvus node to interact with your Milvus collection as a vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Milvus node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/milvus/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Milvus Vector Store integrations](https://n8n.io/integrations/milvus-vector-store/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Parameters for Get Many

* Milvus collection name
* Prompt: search query.
* Limit: how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Parameters for Insert Documents

* Milvus collection name
* Milvus collection creation configuration - Optional

### Parameters for Retrieve Documents (For Agent/Chain)

* Milvus collection name

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Related resources

Refer to [LangChain's Milvus documentation](https://js.langchain.com/docs/integrations/vectorstores/milvus/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"