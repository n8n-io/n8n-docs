---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

/// note | Multi Tenancy
You can separate your data into isolated tenants for the same collection (eg different customers). For that, you must always provide a `Tenant` both for inserting and retrieving objects. [Read more about multi tenancy in Weaviate docs.](https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy)
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"


<!-- vale from-write-good.Weasel = NO -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode also includes **options**: [Search Filter](#search-filter), [Connection Timeout and Initial Checks](#connection-timeout-and-initial-checks), [Multi Tenancy](#multi-tenancy) and [Metadata Keys](#metadata-keys)

### Insert Documents parameters

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.

This Operation Mode also includes **options**:[Connection Timeout and Initial Checks](#connection-timeout-and-initial-checks) and [Multi Tenancy](#multi-tenancy)


### Retrieve Documents (As Vector Store for Chain/Tool) parameters

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.

This Operation Mode also includes **options**: [Search Filter](#search-filter), [Connection Timeout and Initial Checks](#connection-timeout-and-initial-checks), [Multi Tenancy](#multi-tenancy) and [Metadata Keys](#metadata-keys)

### Retrieve Documents (As Tool for AI Agent) parameters

* **Weaviate Collection**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode also includes **options**: [Search Filter](#search-filter), [Connection Timeout and Initial Checks](#connection-timeout-and-initial-checks), [Multi Tenancy](#multi-tenancy) and [Metadata Keys](#metadata-keys)


## Node options

### Search Filter

When searching for data, use this to match with metadata associated with the document.

You can use both `AND` and `OR` with different operators. Operators are case insensitive.

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

All current operators:

| Operator           | Required Field(s)                            | Description                                                             |
| ------------------ | -------------------------------------------- | ----------------------------------------------------------------------- |
| `'equal'`          | `valueString` or `valueNumber`               | Checks if the property is equal to the given string or number.          |
| `'like'`           | `valueString`                                | Checks if the string property matches a pattern (e.g. substring match). |
| `'containsAny'`    | `valueTextArray` (string\[])                 | Checks if the property contains **any** of the given values.      |
| `'containsAll'`    | `valueTextArray` (string\[])                 | Checks if the property contains **all** of the given values.      |
| `'greaterThan'`    | `valueNumber`                                | Checks if the property value is greater than the given number.          |
| `'lessThan'`       | `valueNumber`                                | Checks if the property value is less than the given number.             |
| `'isNull'`         | `valueBoolean` (true/false)                  | Checks if the property is null or not. ([must enable before ingestion](https://weaviate.io/developers/weaviate/manage-data/collections#set-inverted-index-parameters))                                  |
| `'withinGeoRange'` | `valueGeoCoordinates` (object with geo data) | Filters by proximity to geographic coordinates.                         |


When inserting data, the metadata is set using the document loader. Refer to [Default Data Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) for more information on loading documents.

### Connection Timeout and Initial Checks
You change `init`, `insert`, `query` [timeouts](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values), as well as to wether to [skip initial checks](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#initial-connection-checks) when the client is instantiated.

### Multi Tenancy 
Define a the `tenant` option in order to insert or query content from a specific tenant. 

Note: Once the collection is created, you cannot enable or disable multi tenancy. A tenant must be passed at the first ingestion in order to enable multi tenancy on a collection.

### Metadata Keys
You can define which metadata keys you want Weaviate to return on your queries. This can reduce network load, as you will only get properties you have defined. By default, all properties are returned from server.

<!-- temporarily disabled
## Templates and examples

[[ templatesWidget(page.title, 'weaviate-vector-store') ]] -->

## Related resources

Refer to [LangChain's Weaviate documentation](https://js.langchain.com/docs/integrations/vectorstores/weaviate/){:target=_blank .external-link} for more information about the service.

Refer to [Weaviate Installation](https://docs.weaviate.io/deploy) for a self hosted Weaviate Cluster.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

<!-- --8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md" -->
