---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Zep Vector Store node documentation
description: Learn how to use the Zep Vector Store node in n8n. Follow technical documentation to integrate Zep Vector Store node into your workflows.
contentType: integration
---

# Zep Vector Store node

Use the Zep Vector Store to interact with Zep vector databases. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Zep Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/zep/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Zep Vector Store integrations](https://n8n.io/integrations/zep-vector-store/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Insert Documents parameters

* **Collection Name**: Enter the collection name where the data is stored.

### Get Many parameters

* **Collection Name**: Enter the collection name where the data is stored.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Retrieve Documents (For Agent/Chain) parameters

* **Collection Name**: Enter the collection name where the data is stored.

## Node options

### Embedding Dimensions

Must be the same when embedding the data and when querying it.

This sets the size of the array of floats used to represent the semantic meaning of a text document.

Read more about Zep embeddings in [Zep's embeddings documentation](https://docs.getzep.com/deployment/embeddings/){:target=_blank .external-link}.

### Is Auto Embedded

Available in the **Insert Documents** Operation Mode, enabled by default.

Disable this to configure your embeddings in Zep instead of in n8n.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'zep-vector-store') ]]

## Related resources

Refer to [LangChain's Zep documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/zep){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
