---
title: Redis Vector Store node documentation
description: Learn how to use the Redis Vector Store node in n8n. Follow technical documentation to integrate Redis Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Redis Vector Store node

Use the Redis Vector Store node to interact with your Redis database as a [vector store](/glossary.md#ai-vector-store). You can insert documents into the vector database, get documents from the vector database, retrieve documents using a retriever connected to a [chain](/glossary.md#ai-chain), or connect it directly to an [agent](/glossary.md#ai-agent) to use as a [tool](/glossary.md#ai-tool).

On this page, you'll find the node parameters for the Redis Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/redis.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Prerequisites
Before using this node, you need a Redis database with the [Redis Query Engine](https://redis.io/docs/latest/develop/ai/search-and-query/?utm_source=n8n&utm_medium=docs) enabled. Use one of the following:
   - Redis Open Source (v8.0 and later) - includes the Redis Query Engine by default 
   - [Redis Cloud](https://cloud.redis.io/?utm_source=n8n&utm_medium=docs) - fully managed service 
   - [Redis Software](https://redis.io/software/?utm_source=n8n&utm_medium=docs) - self-managed deployment

/// note | A new index will be created if you don't have one.
Creating your own indices in advance is only necessary if you want to use a custom index schema or reuse an existing index.
Otherwise, you can skip this step and let the node create a new index for you based on the options you specify.
///

## Node usage patterns

You can use the Redis Vector Store node in the following patterns:

### Use as a regular node to insert and retrieve documents

You can use the Redis Vector Store as a regular node to insert or get documents. This pattern places the Redis Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool

You can connect the Redis Vector Store node directly to the [tool](/glossary.md#ai-tool) connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Redis Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Redis Vector Store node to fetch documents from the Redis Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Redis Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Redis Vector Store node. Rather than connecting the Redis Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2464-scale-deal-flow-with-a-pitch-deck-ai-vision-chatbot-and-qdrant-vector-store/) (the linked example uses Qdrant, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Redis Vector store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
- **Prompt**: Enter the search query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter).

### Insert Documents parameters

- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

- **Redis Index**: Enter the name of the Redis vector search index to use.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter). Optionally choose an existing one from the list.

### Retrieve Documents (As Tool for AI Agent) parameters

- **Name**: The name of the vector store.
- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Include Metadata

Whether to include document metadata.

You can use this with the [Get Many](#get-many-parameters) and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) modes.

## Node options

### Metadata Filter

Metadata filters are available for the [Get Many](#get-many-parameters), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool-parameters), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) operation modes.
This is an `OR` query. If you specify more than one metadata filter field, at least one of them must match.
When inserting data, the metadata is set using the document loader. Refer to [Default Data Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) for more information on loading documents.

### Redis Configuration Options

Available for all operation modes:

- **Metadata Key**: Enter the key for the metadata field in the Redis hash (default: `metadata`).
- **Key Prefix**: Enter the key prefix for storing documents (default: `doc:`).
- **Content Key**: Enter the key for the content field in the Redis hash (default: `content`).
- **Embedding Key**: Enter the key for the embedding field in the Redis hash (default: `embedding`).

### Insert Options

Available for the [Insert Documents](#insert-documents-parameters) operation mode:

- **Overwrite Documents**: Select whether to overwrite existing documents (turned on) or not (turned off). Also deletes the index.
- **Time-to-Live**: Enter the time-to-live for documents in seconds. Does not expire the index.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'redis-vector-store') ]]

## Related resources

Refer to:

- [Redis Vector Search documentation](https://redis.io/docs/latest/develop/ai/search-and-query/vectors/) for more information about Redis vector capabilities.
- [RediSearch documentation](https://redis.io/docs/latest/develop/interact/search-and-query/) for more information about RediSearch.
- [LangChain's Redis Vector Store documentation](https://js.langchain.com/docs/integrations/vectorstores/redis) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
