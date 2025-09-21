---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Astra DB Vector Store node documentation
description: Learn how to use the Astra DB Vector Store node in n8n. Follow technical documentation to integrate Astra DB Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Astra DB Vector Store node

Use the Astra DB node to interact with your Astra DB collection as a [vector store](/glossary.md#ai-vector-store). You can insert documents into or retrieve documents from a vector database. You can also retrieve documents to provide them to a retriever connected to a [chain](/glossary.md#ai-chain) or connect this node directly to an [agent](/glossary.md#ai-agent) to use as a [tool](/glossary.md#ai-tool).

On this page, you'll find the node parameters for the Astra DB node, and links to more resources.

/// note | Credentials
You need to configure credentials for the Astra DB node. For more information, see [Astra DB credentials](/integrations/builtin/credentials/astra-db.md).
///

## Node parameters

### Operation Mode

Choose how you want to use the Astra DB node:

- **Retrieve**: Retrieve documents from the vector store and supply them to other AI nodes
- **Retrieve as Tool**: Create a tool that an AI agent can use to search the vector store
- **Insert**: Insert documents into the vector store
- **Load**: Load documents from the vector store based on a search query
- **Update**: Update existing documents in the vector store

### Astra DB Collection

Select the Astra DB collection to work with. You can either:

- **From List**: Choose from existing collections in your Astra DB database
- **ID**: Enter the collection name directly

### Name

The name of the vector store. This is used when connecting to other AI nodes.

### Description

Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.

### Embedding Batch Size

Number of documents to embed in a single batch when inserting documents.

### Prompt

Search prompt to retrieve matching documents from the vector store using similarity-based ranking.

### Limit

Number of top results to fetch from the vector store.

### Include Metadata

Whether to include document metadata in the results.

### Rerank Results

Whether to rerank results using a reranker model.

### ID

ID of an embedding entry to update.

### Options

#### Text Key

The key in the document that contains the embedded text. Default is `text`.

#### Vector Dimension

The dimension of the vector embeddings. Required for collection creation. Default is 1536.

#### Similarity Metric

The similarity metric to use for vector search:

- **Cosine**: Cosine similarity
- **Euclidean**: Euclidean distance
- **Dot Product**: Dot product similarity

#### Search Filters

Filter documents using MongoDB-style query syntax. Use `path` for field name, `operator` for comparison type, and `value` for the value to compare against.

Example:
```json
{
  "AND": [
    {
        "path": "metadata.source",
        "operator": "eq",
        "value": "document.pdf"
    }
  ]
}
```

#### Include Similarity Score

Whether to include similarity scores in the results.

#### Clear Collection

Whether to clear the collection before inserting new data.

## Examples

### Basic Vector Search

1. Add an Astra DB Vector Store node
2. Set Operation Mode to "Retrieve"
3. Select your Astra DB collection
4. Connect an embedding model
5. Set the search parameters
6. Execute the node

### Insert Documents

1. Add an Astra DB Vector Store node
2. Set Operation Mode to "Insert"
3. Select your Astra DB collection
4. Connect an embedding model
5. Connect your document data
6. Configure the text key and other options
7. Execute the node

### Use as AI Tool

1. Add an Astra DB Vector Store node
2. Set Operation Mode to "Retrieve as Tool"
3. Select your Astra DB collection
4. Connect an embedding model
5. Provide a tool name and description
6. Connect to an AI agent
7. The agent can now use this as a tool for document retrieval

## Troubleshooting

### Common Issues

**Collection not found**: Ensure the collection exists in your Astra DB database and you have the correct permissions.

**Authentication failed**: Verify your Astra DB credentials are correct and the token has sufficient permissions.

**Vector dimension mismatch**: Ensure the vector dimension matches the embedding model you're using.

**Filter syntax errors**: Check that your filter JSON is valid and uses supported operators.

### Supported Filter Operators

- `eq` / `equal`: Equal to
- `ne` / `not_equal`: Not equal to
- `gt` / `greater_than`: Greater than
- `gte` / `greater_than_equal`: Greater than or equal to
- `lt` / `less_than`: Less than
- `lte` / `less_than_equal`: Less than or equal to
- `in`: Value is in array
- `nin` / `not_in`: Value is not in array
- `exists`: Field exists
- `regex`: Regular expression match

## Resources

- [Astra DB Documentation](https://docs.datastax.com/en/astra-db-serverless/)
- [Astra DB TypeScript SDK](https://docs.datastax.com/en/astra-db-serverless/api-reference/typescript-client/)
- [Vector Store Glossary](/glossary.md#ai-vector-store)
- [AI Chain Glossary](/glossary.md#ai-chain)
- [AI Agent Glossary](/glossary.md#ai-agent)
- [AI Tool Glossary](/glossary.md#ai-tool)

For community support, refer to [Astra DB Community Forums](https://community.datastax.com/).


