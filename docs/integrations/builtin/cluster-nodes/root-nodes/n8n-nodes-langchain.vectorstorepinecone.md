---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Pinecone Vector Store node documentation
description: Learn how to use the Pinecone Vector Store node in n8n. Follow technical documentation to integrate Pinecone Vector Store node into your workflows.
contentType: integration
priority: medium
---

# Pinecone Vector Store node

Use the Pinecone node to interact with your Pinecone database as vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Pinecone node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/pinecone/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Get Many parameters

* **Pinecone Index**: Select or enter the Pinecone Index to use.
* **Prompt**: Enter your search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Pinecone Index**: Select or enter the Pinecone Index to use.

### Retrieve Documents (For Agent/Chain) parameters

* **Pinecone Index**: Select or enter the Pinecone Index to use.

## Node options

### Pinecone Namespace 

Another segregation option for how to store your data within the index.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

### Clear Namespace

Available in **Insert Documents** mode. Deletes all data from the namespace before inserting the new data.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'pinecone-vector-store') ]]

## Related resources

Refer to [LangChain's Pinecone documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/pinecone){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

### Find your Pinecone index and namespace

Your Pinecone index and namespace are available in your Pinecone account.

![Screenshot of a Pinecone account, with the Pinecone index labelled](/_images/integrations/builtin/cluster-nodes/vectorstorepinecone/pinecone-index-namespace.png)
--8<-- "_glossary/ai-glossary.md"
