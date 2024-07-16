---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Pinecone Vector Store
description: Documentation for the Pinecone node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Pinecone Vector Store

Use the Pinecone node to interact with your Pinecone database as vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain. You can also update an item in a vector database by its ID.

On this page, you'll find the node parameters for the Pinecone node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/pinecone/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

### Operation Mode

Pinecone Vector Store node in n8n have four modes: **Get Many**, **Insert Documents**, **Retrieve Documents** and **Update Documents**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

--8<-- "_snippets/integrations/builtin/cluster-nodes/common-vector-store-modes.md"

#### Update Documents

Use Update Documents mode to update existing items in vector database by ID.


### Parameters for **Get Many**

* Pinecone Index
* Prompt: search query.
* Limit: how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Parameters for **Insert Documents**

* Pinecone Index

### Parameters for **Retrieve Documents (For Agent/Chain)**

* Pinecone Index

### Parameters for **Update Documents**

* ID

## Node options

#### Pinecone Namespace 

Another segregation option for how to store your data within the index.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

### Clear Namespace

Available in **Insert Documents** mode. Deletes all data from the namespace before inserting the new data.

## Templates and examples


<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'pinecone-vector-store') ]]

## Related resources


Refer to [LangChain's Pinecone documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/pinecone){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

### Find your Pinecone index and namespace

Your Pinecone index and namespace are available in your Pinecone account.

![Screenshot of a Pinecone account, with the Pinecone index labelled](/_images/integrations/builtin/cluster-nodes/vectorstorepinecone/pinecone-index-namespace.png)
--8<-- "_glossary/ai-glossary.md"
