---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Qdrant Vector Store
description: Documentation for the Qdrant node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Qdrant Vector Store

Use the Qdrant node to interact with your Qdrant collection as a vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Qdrant node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/qdrant/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Parameters for Get Many

* Qdrant collection name
* Prompt: search query.
* Limit: how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Parameters for Insert Documents

* Qdrant collection name
* Qdrant collection creation configuration - Optional

### Parameters for Retrieve Documents (For Agent/Chain)

* Qdrant collection name

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, slug) ]]

## Related resources

Refer to [LangChain's Qdrant documentation](https://js.langchain.com/docs/integrations/vectorstores/qdrant){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
