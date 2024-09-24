---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: PGVector Vector Store node documentation
description: Learn how to use the PGVector Vector Store node in n8n. Follow technical documentation to integrate PGVector Vector Store node into your workflows.
priority: medium
---

# PGVector Vector Store node

PGVector is an extension of Postgresql. Use this node to interact with the PGVector tables in your Postgresql database. You can insert documents into a vector table, get documents from a vector table, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the PGVector node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/postgres/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

* **Table name**: Enter the name of the table you want to query.
* **Prompt**: Enter your search query.
* **Limit**: Enter a number to set how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Table name**: Enter the name of the table you want to query.

### Retrieve Documents parameters (for Agent/Chain)

* **Table name**: Enter the name of the table you want to query.

## Node options

### Collection

A way to separate datasets in PGVector. This creates a separate table and column to keep track of which collection a vector belongs to.

* **Use Collection**: Select whether to use a collection (turned on) or not (turned off).
* **Collection Name**: Enter the name of the collection you want to use.
* **Collection Table Name**: Enter the name of the table to store collection information in.

### Column Names

The following options specify the names of the columns to store the vectors and corresponding information in:

* **ID Column Name**
* **Vector Column Name**
* **Content Column Name**
* **Metadata Column Name**

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'pgvector-vector-store') ]]

## Related resources

Refer to [LangChain's PGVector documentation](https://js.langchain.com/docs/integrations/vectorstores/pgvector){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
