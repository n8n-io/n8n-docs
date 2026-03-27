---
title: PGVector Vector Store node documentation
description: Learn how to use the PGVector Vector Store node in n8n. Follow technical documentation to integrate PGVector Vector Store node into your workflows.
priority: medium
---

# PGVector Vector Store node

PGVector is an extension of Postgresql. Use this node to interact with the PGVector tables in your Postgresql database. You can insert documents into a vector table, get documents from a vector table, retrieve documents to provide them to a retriever connected to a [chain](/glossary.md#ai-chain), or connect directly to an [agent](/glossary.md#ai-agent) as a [tool](/glossary.md#ai-tool).

On this page, you'll find the node parameters for the PGVector node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/postgres.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node usage patterns

You can use the PGVector Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the PGVector Vector Store as a regular node to insert or get documents. This pattern places the PGVector Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool

You can connect the PGVector Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> PGVector Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the PGVector Vector Store node to fetch documents from the PGVector Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> PGVector Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the PGVector Vector Store node. Rather than connecting the PGVector Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) (the linked example uses the Simple Vector Store, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Simple Vector store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

* **Table name**: Enter the name of the table you want to query.
* **Prompt**: Enter your search query.
* **Limit**: Enter a number to set how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Table name**: Enter the name of the table you want to query.

### Retrieve Documents parameters (As Vector Store for Chain/Tool)

* **Table name**: Enter the name of the table you want to query.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Table Name**: Enter the PGVector table to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

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
[[ templatesWidget(page.title, 'postgres-pgvector-store') ]]

## Related resources

Refer to [LangChain's PGVector documentation](https://js.langchain.com/docs/integrations/vectorstores/pgvector) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
