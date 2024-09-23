---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Qdrant Vector Store node documentation
description: Learn how to use the Qdrant Vector Store node in n8n. Follow technical documentation to integrate Qdrant Vector Store node into your workflows.
contentType: integration
priority: medium
---

# Qdrant Vector Store node

Use the Qdrant node to interact with your Qdrant collection as a vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Qdrant node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/qdrant/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Get Many parameters

* **Qdrant collection name**: Enter the name of the Qdrant collection to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter).

### Insert Documents parameters

* **Qdrant collection name**: Enter the name of the Qdrant collection to use.

This Operation Mode includes one **Node option**:

* **Collection Config**: Enter JSON options for creating a Qdrant collection creation configuration. Refer to the Qdrant [Collections](https://qdrant.tech/documentation/concepts/collections/){:target=_blank .external-link} documentation for more information.

### Retrieve Documents (For Agent/Chain) parameters

* **Qdrant collection name**: Enter the name of the Qdrant collection to use.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter).

## Node options

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'qdrant-vector-store') ]]

## Related resources

Refer to [LangChain's Qdrant documentation](https://js.langchain.com/docs/integrations/vectorstores/qdrant){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
