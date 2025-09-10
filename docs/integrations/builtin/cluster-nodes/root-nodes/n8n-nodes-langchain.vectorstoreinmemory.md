---
title: Simple Vector Store node documentation
description: Learn how to use the Simple Vector Store node in n8n. Follow technical documentation to integrate Simple Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Simple Vector Store node

Use the Simple Vector Store node to store and retrieve [embeddings](/glossary.md#ai-embedding) in n8n's in-app memory. 

On this page, you'll find the node parameters for the Simple Vector Store node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

/// note | This node is different from AI memory nodes
The simple vector storage described here is different to the AI memory nodes such as [Simple Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md).

This node creates a [vector database](/glossary.md#ai-vector-store) in the app memory.
///

## Data safety limitations

Before using the Simple Vector Store node, it's important to understand its limitations and how it works.

/// warning
n8n recommends using Simple Vector store for development use only.
///

### Vector store data isn't persistent

This node stores data in memory only. All data is lost when n8n restarts and may also be purged in low-memory conditions.

### All instance users can access vector store data

Memory keys for the Simple Vector Store node are global, not scoped to individual workflows.

This means that all users of the instance can access vector store data by adding a Simple Vector Store node and selecting the memory key, regardless of the access controls set for the original workflow. Take care not to expose sensitive information when ingesting data with the Simple Vector Store node.

## Node usage patterns

You can use the Simple Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the Simple Vector Store as a regular node to insert or get documents. This pattern places the Simple Vector Store in the regular connection flow without using an agent.

You can see an example of in step 2 of [this template](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/).

### Connect directly to an AI agent as a tool

You can connect the Simple Vector Store node directly to the [tool](/glossary.md#ai-tool) connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Simple Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Simple Vector Store node to fetch documents from the Simple Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Simple Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Simple Vector Store node. Rather than connecting the Simple Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Simple Vector store.

## Memory Management

The Simple Vector Store implements memory management to prevent excessive memory usage:

- Automatically cleans up old vector stores when memory pressure increases
- Removes inactive stores that haven't been accessed for a configurable amount of time

### Configuration Options

You can control memory usage with these environment variables:

 | Variable                      | Type   | Default | Description                                                                         |
 |-------------------------------|--------|---------|-------------------------------------------------------------------------------------|
 | `N8N_VECTOR_STORE_MAX_MEMORY` | Number | -1      | Maximum memory in MB allowed for all vector stores combined (-1 to disable limits). |
 | `N8N_VECTOR_STORE_TTL_HOURS`  | Number | -1      | Hours of inactivity after which a store gets removed (-1 to disable TTL).           |

On n8n Cloud, these values are preset to 100MB (about 8,000 documents, depending on document size and metadata) and 7 days respectively. For self-hosted instances, both values default to -1(no memory limits or time-based cleanup).

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale from-write-good.Weasel = NO -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

* **Memory Key**: Select or create the key containing the vector memory you want to query.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.


### Insert Documents parameters

* **Memory Key**: Select or create the key you want to store the vector memory as.
* **Clear Store**: Use this parameter to control whether to wipe the vector store for the given memory key for this workflow before inserting data (turned on).

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

* **Memory Key**: Select or create the key containing the vector memory you want to query.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Memory Key**: Select or create the key containing the vector memory you want to query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'in-memory-vector-store') ]]

## Related resources

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/integrations/vectorstores/memory/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

