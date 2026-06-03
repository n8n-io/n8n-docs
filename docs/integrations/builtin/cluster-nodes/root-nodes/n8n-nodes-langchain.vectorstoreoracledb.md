---
title: Oracle Database Vector Store node documentation
description: Learn how to use the Oracle Database Vector Store node in n8n. Follow technical documentation to integrate Oracle Database Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Oracle Database Vector Store node

Use the Oracle Database Vector Store node to interact with Oracle Database as a [vector store](/glossary.md#ai-vector-store). You can insert documents into a vector table, get documents from a vector table, retrieve documents to provide them to a retriever connected to a [chain](/glossary.md#ai-chain), or connect directly to an [agent](/glossary.md#ai-agent) as a [tool](/glossary.md#ai-tool).

On this page, you'll find the node parameters for the Oracle Database Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/oracledb.md).
///

/// note | Oracle Database vector support
Your Oracle Database instance must support Oracle AI Vector Search for vector store operations. please see [Oracle AI Vector Search Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/26/arpls&id=VECSE-GUID-29B9E7E1-5A99-4D95-8614-58CA07D29957).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node usage patterns

You can use the Oracle Database Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the Oracle Database Vector Store as a regular node to insert or get documents. This pattern places the Oracle Database Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool

You can connect the Oracle Database Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Oracle Database Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Oracle Database Vector Store node to fetch documents from the Oracle Database Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Oracle Database Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Oracle Database Vector Store node. Rather than connecting the Oracle Database Vector Store directly as a tool, this pattern uses a tool specifically designed to summarize data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) (the linked example uses the Simple Vector Store, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Oracle Database Vector Store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

* **Table Name**: Enter the name of the table you want to query. If the table doesn't exist, the node creates it.
* **Prompt**: Enter your search query.
* **Limit**: Enter a number to set how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Table Name**: Enter the name of the table to store vectors in. If the table doesn't exist, the node creates it.

### Retrieve Documents parameters (As Vector Store for Chain/Tool)

* **Table Name**: Enter the name of the table you want to query.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Table Name**: Enter the Oracle Database table to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options

### Distance Strategy

Available in **Get Many** and **Retrieve Documents** modes. This is the method to calculate the distance between two vectors. Choose from:

* **Cosine**
* **Inner Product**
* **Euclidean**
* **Manhattan**
* **Euclidean Squared**
* **Hamming**

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'oracle-database-vector-store') ]]

## Related resources

Refer to [Oracle AI Vector Search documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/) for more information about vector search in Oracle Database.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
