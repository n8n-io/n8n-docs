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

/// note | Node version 1.4
Version 1.4 of this node introduces advanced metadata filtering and custom metadata schema support using the new `FluentRedisVectorStore`. If you're using an older version, refer to the [legacy metadata filter](#metadata-filter-legacy) section. To upgrade, delete the existing node and add a new Redis Vector Store node. Note that you may need to recreate your index and reimport your documents to use the new advanced filtering features.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Prerequisites
Before using this node, you need a Redis database with the [Redis Query Engine](https://redis.io/docs/latest/develop/ai/search-and-query/?utm_source=n8n&utm_medium=docs) enabled. Use one of the following:

- **Redis Open Source (v8.0 and later)** : includes the Redis Query Engine by default 
- **[Redis Cloud](https://cloud.redis.io/?utm_source=n8n&utm_medium=docs)** : fully managed service 
- **[Redis Software](https://redis.io/software/?utm_source=n8n&utm_medium=docs)** : self-managed deployment

/// note | A new index will be created if you don't have one.
Creating your own indices in advance is only necessary if you want to use a custom index schema or reuse an existing index.
Otherwise, you can skip this step and let the node create a new index for you based on the options you specify.
///

## Node usage patterns

You can use the Redis Vector Store node in the following patterns:

### Use as a regular node to insert and retrieve documents

You can use the Redis Vector Store as a regular node to insert or get documents. This pattern places the Redis Vector Store in the regular connection flow without using an agent.

You can see an example in [this template](https://n8n.io/workflows/10887-reduce-llm-costs-with-semantic-caching-using-redis-vector-store-and-huggingface/) where the semantic cache is stored in Redis and retrieved using the Redis Vector Store node in the start of the workflow.

### Connect directly to an AI agent as a tool

You can connect the Redis Vector Store node directly to the [tool](/glossary.md#ai-tool) connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Redis Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Redis Vector Store node to fetch documents from the Redis Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Redis Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Redis Vector Store node. Rather than connecting the Redis Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

This [template](https://n8n.io/workflows/10837-chat-with-github-issues-using-openai-and-redis-vector-search/) shows how to use the Vector Store Question Answer Tool with the Redis Vector Store node. The connections flow in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Redis Vector store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale from-write-good.Weasel = NO  -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
- **Prompt**: Enter the search query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode includes **Node options** for metadata filtering: [Advanced Metadata Filter](#advanced-metadata-filter-v14) (v1.4+) or [Metadata Filter (Legacy)](#metadata-filter-legacy) (v1.3 and earlier).

### Insert Documents parameters

- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.

This Operation Mode includes a **Node option** for [Metadata Schema](#metadata-schema-v14) (v1.4+).

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.

This Operation Mode includes **Node options** for metadata filtering: [Advanced Metadata Filter](#advanced-metadata-filter-v14) (v1.4+) or [Metadata Filter (Legacy)](#metadata-filter-legacy) (v1.3 and earlier).

### Retrieve Documents (As Tool for AI Agent) parameters

- **Name**: The name of the vector store.
- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Include Metadata

Whether to include document metadata.

You can use this with the [Get Many](#get-many-parameters) and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) modes.

## Node options

### Advanced Metadata Filter (v1.4+)

Available in node version 1.4 and later for the [Get Many](#get-many-parameters), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool-parameters), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) operation modes.

The advanced metadata filter uses Redis query syntax, supporting Tag, Numeric, Text, and Geo filters with AND/OR logic. This provides more powerful and precise filtering compared to the legacy simple filter.

**Example filter expressions:**

| Filter Type | Example | Description |
|-------------|---------|-------------|
| Tag filter | `@category:{electronics}` | Match documents where category equals "electronics" |
| Multiple tags | `@category:{electronics\|books}` | Match documents where category is "electronics" OR "books" |
| Numeric range | `@price:[0 100]` | Match documents where price is between 0 and 100 |
| Combined filters | `@category:{electronics} @price:[0 100]` | Match documents matching both conditions |
| Text search | `@description:laptop` | Full-text search in the description field |

For detailed syntax information, refer to [LangChain's Redis Vector Store advanced features documentation](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis#advanced-features) and [Redis Query Engine documentation](https://redis.io/docs/latest/develop/interact/search-and-query/query/).

### Metadata Schema (v1.4+)

Available in node version 1.4 and later for the [Insert Documents](#insert-documents-parameters), [Get Many](#get-many-parameters), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool-parameters), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) operation modes.

Define custom metadata field types for indexing. If not provided, the schema will be inferred automatically from your documents.

**Schema format:**

Enter a JSON array defining metadata fields:

```json
[
  {"name": "category", "type": "tag"},
  {"name": "price", "type": "numeric", "options": {"sortable": true}},
  {"name": "description", "type": "text"},
  {"name": "location", "type": "geo"}
]
```

**Available field types:**

| Type | Description | Use Case |
|------|-------------|----------|
| `tag` | Exact match filtering | Categories, labels, status values |
| `text` | Full-text search | Descriptions, content |
| `numeric` | Range queries | Prices, dates, scores |
| `geo` | Geographic queries | Location-based filtering |

**Field options:**

You can add an `options` object to customize field behavior:

- `sortable`: Enable sorting on this field (for `numeric` and `tag` types)

For more details on schema configuration, refer to [LangChain's Redis Vector Store documentation](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis#advanced-features).

### Metadata Filter (Legacy)

Available in node version 1.3 and earlier for the [Get Many](#get-many-parameters), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool-parameters), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) operation modes.

This is a simple comma-separated list filter. If you specify more than one metadata filter field, it performs an `OR` query—at least one of them must match.

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
- [RediSearch documentation](https://redis.io/docs/latest/develop/ai/search-and-query/query/) for detailed query syntax and filter expressions.
- [LangChain's Redis Vector Store documentation](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis) for more information about the service, including [advanced filtering and custom schema features](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis#advanced-features).

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
