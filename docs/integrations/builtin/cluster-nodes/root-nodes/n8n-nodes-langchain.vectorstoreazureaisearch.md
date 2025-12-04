---
title: Azure AI Search Vector Store node documentation
description: Learn how to use the Azure AI Search Vector Store node in n8n. Follow technical documentation to integrate Azure AI Search Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Azure AI Search Vector Store node

Azure AI Search (formerly Azure Cognitive Search) is a cloud search service with vector search capabilities for RAG and semantic search applications. Use this node to store, retrieve, and query vector embeddings alongside their content and metadata.

On this page, you'll find the node parameters for the Azure AI Search Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/azureaisearch.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Prerequisites

Before using this node, you need:

1. An [Azure subscription](https://azure.microsoft.com)
2. An [Azure AI Search service](https://learn.microsoft.com/azure/search/search-create-service-portal)
3. API key authentication configured (admin key for write operations, query key for read-only)

   See [credentials documentation](/integrations/builtin/credentials/azureaisearch.md) for setup instructions.

### Index configuration

The node automatically creates indexes if they don't exist. When auto-creating, the node configures:

- Vector fields with appropriate dimensions based on your embeddings model
- HNSW algorithm for efficient similarity search with cosine metric
- Content and metadata fields for filtering and retrieval

You can also pre-create indexes in Azure Portal for custom configurations. Example schema:

```json
{
  "name": "n8n-vectorstore",
  "fields": [
    {
      "name": "id",
      "type": "Edm.String",
      "key": true,
      "filterable": true
    },
    {
      "name": "content",
      "type": "Edm.String",
      "searchable": true
    },
    {
      "name": "content_vector",
      "type": "Collection(Edm.Single)",
      "searchable": true,
      "vectorSearchDimensions": 1536,
      "vectorSearchProfileName": "n8n-vector-profile"
    },
    {
      "name": "metadata",
      "type": "Edm.String",
      "filterable": true
    }
  ],
  "vectorSearch": {
    "profiles": [
      {
        "name": "n8n-vector-profile",
        "algorithm": "n8n-vector-algorithm"
      }
    ],
    "algorithms": [
      {
        "name": "n8n-vector-algorithm",
        "kind": "hnsw",
        "hnswParameters": {
          "metric": "cosine",
          "m": 4,
          "efConstruction": 400,
          "efSearch": 500
        }
      }
    ]
  }
}
```

/// note | Vector dimensions
The `vectorSearchDimensions` value must match your embeddings model output.
///

## Node usage patterns

### Use as a regular node to insert and retrieve documents

Use the node directly in workflows to insert or retrieve documents without an agent. See [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) for an example pattern (uses Supabase, but the pattern is identical).

### Connect directly to an AI agent as a tool

Connect to an [AI agent's](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) tool connector to use the vector store as a searchable knowledge base:

AI agent (tools connector) → Azure AI Search Vector Store node

### Use a retriever to fetch documents

Use with [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) and [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) for retrieval-augmented generation:

Question and Answer Chain (Retriever) → Vector Store Retriever (Vector Store) → Azure AI Search Vector Store

See [this example workflow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/).

### Use the Vector Store Question Answer Tool

Use [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize and answer questions:

AI agent (tools) → Vector Store Question Answer Tool (Vector Store) → Azure AI Search Vector Store

See [this example](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/).

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode-with-update.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

/// note | Azure AI Search semantic reranking
Azure AI Search has built-in [semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) available when you use **Semantic Hybrid** query mode with a semantic configuration. To use it:

1. Set **Query Mode** to **Semantic Hybrid** in Options
2. Set **Semantic Configuration** to your configuration name (defaults to `semantic-search-config` if not specified)

The built-in semantic reranker uses machine learning models to improve relevance. You can chain an additional reranking node after semantic reranking for further refinement.

[Semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) is only available if your index has a semantic configuration defined.
///

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

- **Endpoint**: Your Azure AI Search endpoint (format: `https://your-service.search.windows.net`)
- **Index Name**: The index to query
- **Limit**: Maximum documents to return (default: 4)

### Insert Documents parameters

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to use (created automatically if it doesn't exist)
- **Batch Size**: Number of documents uploaded per batch to Azure AI Search. Adjust based on document size and your service tier limits. This controls upload batching only—embedding generation batching is configured in embedding nodes.

### Update Documents parameters

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to update

### Retrieve Documents parameters (As Vector Store for Chain/Tool)

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to query

### Retrieve Documents (As Tool for AI Agent) parameters

- **Name**: Tool name shown to the LLM
- **Description**: Explain to the LLM what this tool does. Be specific to help the LLM choose when to use this tool.
- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to query
- **Limit**: Maximum results to retrieve (e.g., `10` for ten best matches)

## Node options

### Options

- **Filter**: [OData filter expression](https://learn.microsoft.com/azure/search/search-query-odata-filter) to filter results by document fields or metadata. See filter examples below.
- **Query Mode**: Search strategy to use:
  - **Vector**: Similarity search using embeddings only
  - **Keyword**: Full-text search using BM25 ranking
  - **Hybrid** (default): Combines vector and keyword search with Reciprocal Rank Fusion (RRF)
  - **Semantic Hybrid**: Hybrid search with [semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) for improved relevance
- **Semantic Configuration**: Name of the semantic configuration to use for [semantic ranking](https://learn.microsoft.com/azure/search/semantic-search-overview). Defaults to `semantic-search-config` if not specified. Only required if you pre-created an index with a custom semantic configuration name.

/// note | Query mode selection
Use **Vector** for semantic similarity, **Keyword** for exact term matching, **Hybrid** for balanced results, or **Semantic Hybrid** when you've configured semantic search in your index for maximum relevance.
///

### OData filter examples

Azure AI Search uses [OData syntax](https://learn.microsoft.com/azure/search/search-query-odata-filter) for filtering. Metadata fields are accessed using `metadata/fieldName` format.

**Filter by document ID:**
```
id eq '3da6491a-f930-4a4e-9471-c05dcd450ba0'
```

**Filter by metadata field:**
```
metadata/source eq 'user-guide'
```

**Complex AND filter:**
```
metadata/category eq 'technology' and metadata/author eq 'John'
```

**Complex OR filter:**
```
metadata/source eq 'user-guide' or metadata/rating ge 4
```

**Numeric comparison:**
```
metadata/rating ge 4 and metadata/rating lt 10
```

**String matching with NOT:**
```
metadata/category eq 'technology' and metadata/title ne 'Deprecated'
```

**Supported OData operators:**
- Comparison: `eq`, `ne`, `gt`, `ge`, `lt`, `le`
- Logical: `and`, `or`, `not`
- String functions: `startswith()`, `endswith()`, `contains()`
- Collection functions: `any()`, `all()`

/// note | Filter format
Filters work across all query modes (Vector, Keyword, Hybrid, Semantic Hybrid) and all operation modes (retrieve, load, retrieve-as-tool).
///

## Azure AI Search specific features

### Hybrid search with RRF

Azure AI Search's hybrid search uses Reciprocal Rank Fusion to merge vector and keyword results, providing better accuracy than either method alone.

### [Semantic ranking](https://learn.microsoft.com/azure/search/semantic-search-overview)

Semantic Hybrid mode applies machine learning models to rerank results based on semantic understanding of your query. This requires a semantic configuration in your index.

### OData filters

Use OData syntax to filter by document fields or metadata before vector search executes. This improves performance and precision when you need results from specific sources or with certain attributes.

### HNSW algorithm

Azure AI Search uses Hierarchical Navigable Small World (HNSW) graphs for approximate nearest neighbor search, providing fast retrieval at scale with configurable accuracy/speed tradeoffs.

## Troubleshooting

### Index issues

**Index not found**: Verify the index name is correct (case-sensitive) and exists in your Azure AI Search service. If using auto-creation, check that the index was created successfully.

**Vector dimension mismatch**: Ensure your embedding model dimensions match the index vector field dimensions. Check the index schema to confirm the `vectorSearchDimensions` setting.

**Document insert failures**:
- Verify write permissions (admin API key required)
- Check document fields match your index schema
- Ensure required fields are provided in documents
- Review batch size settings if experiencing timeouts with large document sets

### Filter issues

**Filter not working**:
- Verify OData syntax is correct
- Ensure metadata fields use `metadata/` prefix: `metadata/source eq 'value'`
- Check that filtered fields are marked as `filterable` in your index schema
- Test with simple filters first (`id eq 'value'`) before complex expressions

**Invalid OData syntax**:
- Use single quotes for string values: `metadata/source eq 'value'`
- Use proper operators: `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `and`, `or`, `not`
- Refer to [OData filter documentation](https://learn.microsoft.com/azure/search/search-query-odata-filter) for syntax details

### Connection issues

**Unable to connect**:
- Verify endpoint URL format: `https://your-service.search.windows.net`
- Confirm your Azure AI Search service is running and accessible
- Check network security groups, firewall rules, and private endpoint configurations
- For Azure-hosted n8n, verify virtual network peering or service endpoint configuration if using private endpoints

### Authentication issues

For authentication troubleshooting including API key errors, refer to the [credentials documentation troubleshooting section](/integrations/builtin/credentials/azureaisearch.md#troubleshooting).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'azure-ai-search-vector-store') ]]

## Related resources

- [Azure AI Search Vector Search documentation](https://learn.microsoft.com/azure/search/vector-search-overview)
- [LangChain Azure AI Search integration](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch)
- [Azure AI Search REST API reference](https://learn.microsoft.com/rest/api/searchservice/)
- [OData filter syntax for Azure AI Search](https://learn.microsoft.com/azure/search/search-query-odata-filter)

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
