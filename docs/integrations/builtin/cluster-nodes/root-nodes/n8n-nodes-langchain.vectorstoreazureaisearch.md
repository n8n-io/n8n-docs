---
title: Azure AI Search Vector Store node documentation
description: Learn how to use the Azure AI Search Vector Store node in n8n. Follow technical documentation to integrate Azure AI Search Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Azure AI Search Vector Store node

Azure AI Search (formerly Azure Cognitive Search) is a cloud search service that provides vector search capabilities through its Vector Search feature. Use this node to interact with Vector Search indexes in your Azure AI Search service. You can insert documents, retrieve documents, and use the vector store in chains or as a tool for agents.

On this page, you'll find the node parameters for the Azure AI Search Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/azureaisearch.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Prerequisites

Before using this node, create a [Vector Search index](https://learn.microsoft.com/en-us/azure/search/vector-search-overview) in your Azure AI Search service. Follow these steps to create one:

1. Log in to the [Azure Portal](https://portal.azure.com/).

2. Navigate to your Azure AI Search service or create a new one.
3. Select "Indexes" from the left navigation menu.
4. Click "Add Index" and create a new index with vector fields.
5. Configure your index schema with:
   - A vector field for embeddings with appropriate dimensions
   - Metadata fields for filtering and content
   - Configure the vector search profile with the similarity metric (cosine, euclidean, or dotProduct)

   Example index JSON configuration:
   ```json
   {
     "fields": [
       {
         "name": "content_vector",
         "type": "Collection(Edm.Single)",
         "searchable": true,
         "retrievable": true,
         "dimensions": 1536,
         "vectorSearchProfile": "vector-profile"
       },
       {
         "name": "content",
         "type": "Edm.String",
         "searchable": true,
         "retrievable": true
       }
     ],
     "vectorSearch": {
       "profiles": [
         {
           "name": "vector-profile",
           "algorithm": "hnsw-algorithm"
         }
       ],
       "algorithms": [
         {
           "name": "hnsw-algorithm",
           "kind": "hnsw",
           "parameters": {
             "metric": "cosine"
           }
         }
       ]
     }
   }
   ```

6. Note down your service endpoint URL and index name for configuration.

Make sure to note the following values which are required when configuring the node:

- Azure AI Search endpoint URL
- Index name
- API key or managed identity configuration

## Node usage patterns

You can use the Azure AI Search Vector Store node in the following patterns:

### Use as a regular node to insert and retrieve documents

You can use the Azure AI Search Vector Store as a regular node to insert or get documents. This pattern places the Azure AI Search Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool

You can connect the Azure AI Search Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use the vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Azure AI Search Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Azure AI Search Vector Store node to fetch documents from the Azure AI Search Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Azure AI Search Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Azure AI Search Vector Store node. Rather than connecting the Azure AI Search Vector Store directly as a tool, this pattern uses a tool specifically designed to summarize data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) (the linked example uses the In-Memory Vector Store, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Azure AI Search Vector Store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode-with-update.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale off -->
### Get Many parameters
<!-- vale on -->

- **Endpoint**: Enter the Azure AI Search endpoint URL (e.g., `https://your-service.search.windows.net`).
- **Index Name**: Enter the name of the Azure AI Search index to use.
- **Results Count**: Enter the maximum number of documents to return (default: 50).

### Insert Documents parameters

- **Endpoint**: Enter the Azure AI Search endpoint URL (e.g., `https://your-service.search.windows.net`).
- **Index Name**: Enter the name of the Azure AI Search index to use.

### Update Documents parameters

- **Endpoint**: Enter the Azure AI Search endpoint URL (e.g., `https://your-service.search.windows.net`).
- **Index Name**: Enter the name of the Azure AI Search index to use.

### Retrieve Documents parameters (As Vector Store for Chain/Tool)

- **Endpoint**: Enter the Azure AI Search endpoint URL (e.g., `https://your-service.search.windows.net`).
- **Index Name**: Enter the name of the Azure AI Search index to use.

### Retrieve Documents (As Tool for AI Agent) parameters

- **Name**: The name of the vector store.
- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Endpoint**: Enter the Azure AI Search endpoint URL (e.g., `https://your-service.search.windows.net`).
- **Index Name**: Enter the name of the Azure AI Search index to use.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options

### Options

- **Filter**: Use [OData filter expressions](https://learn.microsoft.com/en-us/azure/search/search-query-odata-filter) to filter results based on metadata fields.
- **Query Mode**: Choose how to search the index:
  - **Vector**: Use only vector search
  - **Keyword**: Use only keyword search
  - **Hybrid** (default): Combine vector and keyword search
  - **Semantic Hybrid**: Combine vector, keyword, and semantic ranking (requires semantic configuration)
- **Semantic Configuration**: Enter the name of the semantic configuration (required when using Semantic Hybrid query mode).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'azure-ai-search-vector-store') ]]

## Related resources

Refer to:

- [Azure AI Search Vector Search documentation](https://learn.microsoft.com/en-us/azure/search/vector-search-overview) for more information about the service.
- [LangChain's Azure AI Search documentation](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch) for more information about the integration.
- [Azure AI Search REST API reference](https://learn.microsoft.com/en-us/rest/api/searchservice/) for detailed API information.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"