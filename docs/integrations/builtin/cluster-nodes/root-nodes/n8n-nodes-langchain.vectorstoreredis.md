---
title: Redis Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Redis Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreredis.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreredis
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreredis
description: >-
  Learn how to use the Redis Vector Store node in n8n. Follow technical
  documentation to integrate Redis Vector Store node into your workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Redis Vector Store

Use the Redis Vector Store node to interact with your Redis database as a [vector store](#user-content-fn-1)[^1]. You can insert documents into the vector database, get documents from the vector database, retrieve documents using a retriever connected to a chain[^2], or connect it directly to an agent[^3] to use as a tool[^4].

On this page, you'll find the node parameters for the Redis Vector Store node, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Redis credentials documentation](../../credentials/redis.md) for authentication information for this node.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

{% hint style="info" %}
**Feature availability**

Advanced metadata filtering and custom metadata schema support, using the new `FluentRedisVectorStore`, are available from node version 1.4 of the Redis Vector Store node.

If you use an older node version, see [Metadata filter (legacy)](#metadata-filter-legacy).
{% endhint %}


## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Before using this node, you need a Redis database with the [Redis Query Engine](https://redis.io/docs/latest/develop/ai/search-and-query/?utm_source=n8n\&utm_medium=docs) enabled. Use one of the following:

* **Redis Open Source (v8.0 and later)** : includes the Redis Query Engine by default
* [**Redis Cloud**](https://cloud.redis.io/?utm_source=n8n\&utm_medium=docs) : fully managed service
* [**Redis Software**](https://redis.io/software/?utm_source=n8n\&utm_medium=docs) : self-managed deployment

{% hint style="info" %}
**A new index will be created if you don't have one.**

Creating your own indices in advance is only necessary if you want to use a custom index schema or reuse an existing index. Otherwise, you can skip this step and let the node create a new index for you based on the options you specify.
{% endhint %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Redis Vector Store node in the following patterns:

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the Redis Vector Store as a regular node to insert or get documents. This pattern places the Redis Vector Store in the regular connection flow without using an agent.

You can see an example in [this template](https://n8n.io/workflows/10887-reduce-llm-costs-with-semantic-caching-using-redis-vector-store-and-huggingface/) where the semantic cache is stored in Redis and retrieved using the Redis Vector Store node in the start of the workflow.

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Redis Vector Store node directly to the tool[^4] connector of an [AI agent](n8n-nodes-langchain.agent/README.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Redis Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Redis Vector Store node to fetch documents from the Redis Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/README.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Redis Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Redis Vector Store node. Rather than connecting the Redis Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

This [template](https://n8n.io/workflows/10837-chat-with-github-issues-using-openai-and-redis-vector-search/) shows how to use the Vector Store Question Answer Tool with the Redis Vector Store node. The connections flow in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Redis Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/eiIkcF23uZ2A8BkFVQM5/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KcxcfJWhy81cjCSzO4vQ/" %}

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode includes **Node options** for metadata filtering: [Advanced Metadata Filter](#advanced-metadata-filter-v14) (v1.4+) or [Metadata Filter (Legacy)](#metadata-filter-legacy) (v1.3 and earlier).

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.

This Operation Mode includes a **Node option** for [Metadata Schema](#metadata-schema-v14) (v1.4+).

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.

This Operation Mode includes **Node options** for metadata filtering: [Advanced Metadata Filter](#advanced-metadata-filter-v14) (v1.4+) or [Metadata Filter (Legacy)](#metadata-filter-legacy) (v1.3 and earlier).

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Redis Index**: Enter the name of the Redis vector search index to use. Optionally choose an existing one from the list.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Include Metadata <a href="#include-metadata" id="include-metadata"></a>

Whether to include document metadata.

You can use this with the [Get Many](n8n-nodes-langchain.vectorstoreredis.md#get-many-parameters) and [Retrieve Documents (As Tool for AI Agent)](n8n-nodes-langchain.vectorstoreredis.md#retrieve-documents-as-tool-for-ai-agent-parameters) modes.

## Node options <a href="#node-options" id="node-options"></a>

### Advanced Metadata Filter (v1.4+) <a href="#advanced-metadata-filter-v14" id="advanced-metadata-filter-v14"></a>

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

### Metadata Schema (v1.4+) <a href="#metadata-schema-v14" id="metadata-schema-v14"></a>

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

### Metadata Filter (Legacy) <a href="#metadata-filter-legacy" id="metadata-filter-legacy"></a>

Available in node version 1.3 and earlier for the [Get Many](#get-many-parameters), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool-parameters), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) operation modes.

This is a simple comma-separated list filter. If you specify more than one metadata filter field, it performs an `OR` query—at least one of them must match.

When inserting data, the metadata is set using the document loader. Refer to [Default Data Loader](../sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) for more information on loading documents.

### Redis Configuration Options <a href="#redis-configuration-options" id="redis-configuration-options"></a>

Available for all operation modes:

* **Metadata Key**: Enter the key for the metadata field in the Redis hash (default: `metadata`).
* **Key Prefix**: Enter the key prefix for storing documents (default: `doc:`).
* **Content Key**: Enter the key for the content field in the Redis hash (default: `content`).
* **Embedding Key**: Enter the key for the embedding field in the Redis hash (default: `embedding`).

### Insert Options <a href="#insert-options" id="insert-options"></a>

Available for the [Insert Documents](n8n-nodes-langchain.vectorstoreredis.md#insert-documents-parameters) operation mode:

* **Overwrite Documents**: Select whether to overwrite existing documents (turned on) or not (turned off). Also deletes the index.
* **Time-to-Live**: Enter the time-to-live for documents in seconds. Does not expire the index.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse Redis Vector Store node documentation integration templates](https://n8n.io/integrations/redis-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to:

- [Redis Vector Search documentation](https://redis.io/docs/latest/develop/ai/search-and-query/vectors/) for more information about Redis vector capabilities.
- [RediSearch documentation](https://redis.io/docs/latest/develop/ai/search-and-query/query/) for detailed query syntax and filter expressions.
- [LangChain's Redis Vector Store documentation](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis) for more information about the service, including [advanced filtering and custom schema features](https://docs.langchain.com/oss/javascript/integrations/vectorstores/redis#advanced-features).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/dN5Se1JVH7wYGtmN4n0v/" %}

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^3]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^4]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
