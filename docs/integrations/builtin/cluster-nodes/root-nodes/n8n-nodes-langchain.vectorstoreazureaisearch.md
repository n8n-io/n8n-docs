---
title: Azure AI Search Vector Store node documentation
description: >-
  Learn how to use the Azure AI Search Vector Store node in n8n. Follow
  technical documentation to integrate Azure AI Search Vector Store node into
  your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Azure AI Search Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreazureaisearch.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreazureaisearch
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreazureaisearch
layout:
  description:
    visible: false
---

# Azure AI Search Vector Store node <a href="#azure-ai-search-vector-store-node" id="azure-ai-search-vector-store-node"></a>

Azure AI Search (formerly Azure Cognitive Search) is a cloud search service with vector search capabilities for RAG and semantic search applications. Use this node to store, retrieve, and query vector embeddings alongside their content and metadata.

On this page, you'll find the node parameters for the Azure AI Search Vector Store node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/azureaisearch.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Before using this node, you need:

1. An [Azure subscription](https://azure.microsoft.com)
2. An [Azure AI Search service](https://learn.microsoft.com/azure/search/search-create-service-portal)
3. API key authentication configured (admin key for write operations, query key for read-only)

   See [credentials documentation](../../credentials/azureaisearch.md) for setup instructions.

### Index configuration <a href="#index-configuration" id="index-configuration"></a>

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

{% hint style="info" %}
**Vector dimensions**

The `vectorSearchDimensions` value must match your embeddings model output.
{% endhint %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

Use the node directly in workflows to insert or retrieve documents without an agent. See [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) for an example pattern (uses Supabase, but the pattern is identical).

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

Connect to an [AI agent's](n8n-nodes-langchain.agent/README.md) tool connector to use the vector store as a searchable knowledge base:

AI agent (tools connector) → Azure AI Search Vector Store node

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

Use with [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) and [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/README.md) for retrieval-augmented generation:

Question and Answer Chain (Retriever) → Vector Store Retriever (Vector Store) → Azure AI Search Vector Store

See [this example workflow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/).

### Use the Vector Store Question Answer Tool <a href="#use-the-vector-store-question-answer-tool" id="use-the-vector-store-question-answer-tool"></a>

Use [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize and answer questions:

AI agent (tools) → Vector Store Question Answer Tool (Vector Store) → Azure AI Search Vector Store

See [this example](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/).

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/NhmxpkeoTzl1WU1jhcbT/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzkuyHx0puco05IkndRC/" %}

{% hint style="info" %}
**Azure AI Search semantic reranking**

Azure AI Search has built-in [semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) available when you use **Semantic Hybrid** query mode with a semantic configuration. To use it:

1. Set **Query Mode** to **Semantic Hybrid** in Options
2. Set **Semantic Configuration** to your configuration name (defaults to `semantic-search-config` if not specified)

The built-in semantic reranker uses machine learning models to improve relevance. You can chain an additional reranking node after semantic reranking for further refinement.

[Semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) is only available if your index has a semantic configuration defined.
{% endhint %}


### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>


- **Endpoint**: Your Azure AI Search endpoint (format: `https://your-service.search.windows.net`)
- **Index Name**: The index to query
- **Limit**: Maximum documents to return (default: 4)

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to use (created automatically if it doesn't exist)
- **Batch Size**: Number of documents uploaded per batch to Azure AI Search. Adjust based on document size and your service tier limits. This controls upload batching only—embedding generation batching is configured in embedding nodes.

### Update Documents parameters <a href="#update-documents-parameters" id="update-documents-parameters"></a>

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to update

### Retrieve Documents parameters (As Vector Store for Chain/Tool) <a href="#retrieve-documents-parameters-as-vector-store-for-chaintool" id="retrieve-documents-parameters-as-vector-store-for-chaintool"></a>

- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to query

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

- **Name**: Tool name shown to the LLM
- **Description**: Explain to the LLM what this tool does. Be specific to help the LLM choose when to use this tool.
- **Endpoint**: Your Azure AI Search endpoint
- **Index Name**: The index to query
- **Limit**: Maximum results to retrieve (e.g., `10` for ten best matches)

## Node options <a href="#node-options" id="node-options"></a>

### Options <a href="#options" id="options"></a>

- **Filter**: [OData filter expression](https://learn.microsoft.com/azure/search/search-query-odata-filter) to filter results by document fields or metadata. See filter examples below.
- **Query Mode**: Search strategy to use:
    - **Vector**: Similarity search using embeddings only
    - **Keyword**: Full-text search using BM25 ranking
    - **Hybrid** (default): Combines vector and keyword search with Reciprocal Rank Fusion (RRF)
    - **Semantic Hybrid**: Hybrid search with [semantic reranking](https://learn.microsoft.com/azure/search/semantic-search-overview) for improved relevance
- **Semantic Configuration**: Name of the semantic configuration to use for [semantic ranking](https://learn.microsoft.com/azure/search/semantic-search-overview). Defaults to `semantic-search-config` if not specified. Only required if you pre-created an index with a custom semantic configuration name.

{% hint style="info" %}
**Query mode selection**

Use **Vector** for semantic similarity, **Keyword** for exact term matching, **Hybrid** for balanced results, or **Semantic Hybrid** when you've configured semantic search in your index for maximum relevance.
{% endhint %}

### OData filter examples <a href="#odata-filter-examples" id="odata-filter-examples"></a>

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

{% hint style="info" %}
**Filter format**

Filters work across all query modes (Vector, Keyword, Hybrid, Semantic Hybrid) and all operation modes (retrieve, load, retrieve-as-tool).
{% endhint %}

## Azure AI Search specific features <a href="#azure-ai-search-specific-features" id="azure-ai-search-specific-features"></a>

### Hybrid search with RRF <a href="#hybrid-search-with-rrf" id="hybrid-search-with-rrf"></a>

Azure AI Search's hybrid search uses Reciprocal Rank Fusion to merge vector and keyword results, providing better accuracy than either method alone.

### [Semantic ranking](https://learn.microsoft.com/azure/search/semantic-search-overview) <a href="#semantic-rankinghttpslearnmicrosoftcomazuresearchsemantic-search-overview" id="semantic-rankinghttpslearnmicrosoftcomazuresearchsemantic-search-overview"></a>

Semantic Hybrid mode applies machine learning models to rerank results based on semantic understanding of your query. This requires a semantic configuration in your index.

### OData filters <a href="#odata-filters" id="odata-filters"></a>

Use OData syntax to filter by document fields or metadata before vector search executes. This improves performance and precision when you need results from specific sources or with certain attributes.

### HNSW algorithm <a href="#hnsw-algorithm" id="hnsw-algorithm"></a>

Azure AI Search uses Hierarchical Navigable Small World (HNSW) graphs for approximate nearest neighbor search, providing fast retrieval at scale with configurable accuracy/speed tradeoffs.

## Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

### Index issues <a href="#index-issues" id="index-issues"></a>

**Index not found**: Verify the index name is correct (case-sensitive) and exists in your Azure AI Search service. If using auto-creation, check that the index was created successfully.

**Vector dimension mismatch**: Ensure your embedding model dimensions match the index vector field dimensions. Check the index schema to confirm the `vectorSearchDimensions` setting.

**Document insert failures**:
- Verify write permissions (admin API key required)
- Check document fields match your index schema
- Ensure required fields are provided in documents
- Review batch size settings if experiencing timeouts with large document sets

### Filter issues <a href="#filter-issues" id="filter-issues"></a>

**Filter not working**:
- Verify OData syntax is correct
- Ensure metadata fields use `metadata/` prefix: `metadata/source eq 'value'`
- Check that filtered fields are marked as `filterable` in your index schema
- Test with simple filters first (`id eq 'value'`) before complex expressions

**Invalid OData syntax**:
- Use single quotes for string values: `metadata/source eq 'value'`
- Use proper operators: `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `and`, `or`, `not`
- Refer to [OData filter documentation](https://learn.microsoft.com/azure/search/search-query-odata-filter) for syntax details

### Connection issues <a href="#connection-issues" id="connection-issues"></a>

**Unable to connect**:
- Verify endpoint URL format: `https://your-service.search.windows.net`
- Confirm your Azure AI Search service is running and accessible
- Check network security groups, firewall rules, and private endpoint configurations
- For Azure-hosted n8n, verify virtual network peering or service endpoint configuration if using private endpoints

### Authentication issues <a href="#authentication-issues" id="authentication-issues"></a>

For authentication troubleshooting including API key errors, refer to the [credentials documentation troubleshooting section](../../credentials/azureaisearch.md#troubleshooting).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Azure AI Search Vector Store node documentation integration templates](https://n8n.io/integrations/azure-ai-search-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

- [Azure AI Search Vector Search documentation](https://learn.microsoft.com/azure/search/vector-search-overview)
- [LangChain Azure AI Search integration](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch)
- [Azure AI Search REST API reference](https://learn.microsoft.com/rest/api/searchservice/)
- [OData filter syntax for Azure AI Search](https://learn.microsoft.com/azure/search/search-query-odata-filter)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ou1SzleSsYddnaSSV2H2/" %}
