---
title: Weaviate Vector Store node documentation
description: Learn how to use the Weaviate Vector Store node in n8n. Follow technical documentation to integrate Weaviate Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Weaviate Vector Store node

Use the Weaviate node to interact with your Weaviate collection as a [vector store](/glossary.md#ai-vector-store). You can insert documents into or retrieve documents from a vector database. You can also retrieve documents to provide them to a retriever connected to a [chain](/glossary.md#ai-chain) or connect this node directly to an [agent](/glossary.md#ai-agent) to use as a [tool](/glossary.md#ai-tool).
On this page, you'll find the node parameters for the Weaviate node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/weaviate.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node usage patterns

You can use the Weaviate Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the Weaviate Vector Store as a regular node to insert or get documents. This pattern places the Weaviate Vector Store in the regular connection flow without using an agent.


### Connect directly to an AI agent as a tool

You can connect the Weaviate Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Weaviate Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Weaviate Vector Store node to fetch documents from the Weaviate Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.


### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Weaviate Vector Store node. Rather than connecting the Weaviate Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

	
## Node parameters

/// note | Multitenancy
You can separate your data into isolated tenants for the same collection (for example, for different customers). For that, you must always provide a [Tenant Name](#tenant-name) both when inserting and retrieving objects. [Read more about multi tenancy in Weaviate docs](https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

<!-- vale from-write-good.Weasel = NO -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Embedding Batch Size**: The number of documents to embed in a single batch. The default is 200 documents.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Weaviate Collection**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Include Metadata

Whether to include document metadata.

You can use this with the [Get Many](#get-many) and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent-parameters) modes.

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

## Node options

### Search Filters

Available for the [Get Many](#get-many), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent) operation modes.

When searching for data, use this to match metadata associated with documents. You can learn more about the operators and query structure in [Weaviate's conditional filters documentation](https://docs.weaviate.io/weaviate/api/graphql/filters#filter-structure).

You can use both `AND` and `OR` with different operators. Operators are case insensitive:

```json
{
  "OR": [
    {
        "path": ["source"],
        "operator": "Equal",
        "valueString": "source1"
    },
    {
        "path": ["source"],
        "operator": "Equal",
        "valueString": "source1"
    }
  ]
}
```

Supported operators:

| Operator           | Required Field(s)                                    | Description                                                                                                                                                                       |
|--------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'equal'`          | `valueString` or `valueNumber`                       | Checks if the property is equal to the given string or number.                                                                                                                    |
| `'like'`           | `valueString`                                        | Checks if the string property matches a pattern (for example, sub-string match).                                                                                                  |
| `'containsAny'`    | `valueTextArray` (string\[])                         | Checks if the property contains **any** of the given values.                                                                                                                      |
| `'containsAll'`    | `valueTextArray` (string\[])                         | Checks if the property contains **all** of the given values.                                                                                                                      |
| `'greaterThan'`    | `valueNumber`                                        | Checks if the property value is greater than the given number.                                                                                                                    |
| `'lessThan'`       | `valueNumber`                                        | Checks if the property value is less than the given number.                                                                                                                       |
| `'isNull'`         | `valueBoolean` (true/false)                          | Checks if the property is null or not. ([must enable before ingestion](https://docs.weaviate.io/weaviate/manage-collections/collection-operations#set-inverted-index-parameters)) |
| `'withinGeoRange'` | `valueGeoCoordinates` (object with geolocation data) | Filters by proximity to geographic coordinates.                                                                                                                                   |

When inserting data, the document loader sets the metadata. Refer to [Default Data Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) for more information on loading documents.

### Metadata Keys

You can define which metadata keys you want Weaviate to return on your queries. This can reduce network load, as you will only get properties you have defined. Returns all properties from the server by default.

Available for the [Get Many](#get-many), [Retrieve Documents (As Vector Store for Chain/Tool)](#retrieve-documents-as-vector-store-for-chaintool), and [Retrieve Documents (As Tool for AI Agent)](#retrieve-documents-as-tool-for-ai-agent) operation modes.

### Tenant Name

The specific tenant to store or retrieve documents for.

/// note | Must enable at creation
You must pass a tenant name at first ingestion to enable multitenancy for a collection. You can't enable or disable multitenancy after creation.
///

### Text Key

The key in the document that contains the embedded text.

### Skip Init Checks

Whether to [skip initialization checks](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#initial-connection-checks) when instantiating the client.

### Init Timeout

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during initial checks.

### Insert Timeout

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during inserts.

### Query Timeout

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during queries.

### GRPC Proxy

A proxy to use for gRPC requests.

### Clear Data

Available for the [Insert Documents](#insert-documents) operation mode.

Whether to clear the collection or tenant before inserting new data.

## Templates and examples

[[ templatesWidget(page.title, 'weaviate-vector-store') ]]

## Related resources

Refer to [LangChain's Weaviate documentation](https://js.langchain.com/docs/integrations/vectorstores/weaviate/) for more information about the service.

Refer to [Weaviate Installation](https://docs.weaviate.io/deploy) for a self hosted Weaviate Cluster.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
