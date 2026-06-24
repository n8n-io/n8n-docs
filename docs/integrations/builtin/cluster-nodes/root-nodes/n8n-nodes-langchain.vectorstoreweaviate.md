---
title: Weaviate Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Weaviate Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreweaviate.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreweaviate
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreweaviate
description: >-
  Learn how to use the Weaviate Vector Store node in n8n. Follow technical
  documentation to integrate Weaviate Vector Store node into your workflows.
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

# Weaviate Vector Store

Use the Weaviate node to interact with your Weaviate collection as a [vector store](#user-content-fn-1)[^1]. You can insert documents into or retrieve documents from a vector database. You can also retrieve documents to provide them to a retriever connected to a chain[^2] or connect this node directly to an agent[^3] to use as a tool[^4]. On this page, you'll find the node parameters for the Weaviate node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/weaviate.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Weaviate Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the Weaviate Vector Store as a regular node to insert or get documents. This pattern places the Weaviate Vector Store in the regular connection flow without using an agent.

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Weaviate Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Weaviate Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Weaviate Vector Store node to fetch documents from the Weaviate Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Weaviate Vector Store node. Rather than connecting the Weaviate Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% hint style="info" %}
**Multitenancy**

You can separate your data into isolated tenants for the same collection (for example, for different customers). For that, you must always provide a [Tenant Name](n8n-nodes-langchain.vectorstoreweaviate.md#tenant-name) both when inserting and retrieving objects. [Read more about multi tenancy in Weaviate docs](https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wxaa18Qg530lwp4KjOwq/" %}

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Embedding Batch Size**: The number of documents to embed in a single batch. The default is 200 documents.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Weaviate Collection**: Enter the name of the Weaviate collection to use.

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Weaviate Collection**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Weaviate Collection**: Enter the name of the Weaviate collection to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Include Metadata <a href="#include-metadata" id="include-metadata"></a>

Whether to include document metadata.

You can use this with the [Get Many](n8n-nodes-langchain.vectorstoreweaviate.md#get-many) and [Retrieve Documents (As Tool for AI Agent)](n8n-nodes-langchain.vectorstoreweaviate.md#retrieve-documents-as-tool-for-ai-agent-parameters) modes.

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzkuyHx0puco05IkndRC/" %}

## Node options <a href="#node-options" id="node-options"></a>

### Search Filters <a href="#search-filters" id="search-filters"></a>

Available for the [Get Many](n8n-nodes-langchain.vectorstoreweaviate.md#get-many), [Retrieve Documents (As Vector Store for Chain/Tool)](n8n-nodes-langchain.vectorstoreweaviate.md#retrieve-documents-as-vector-store-for-chaintool), and [Retrieve Documents (As Tool for AI Agent)](n8n-nodes-langchain.vectorstoreweaviate.md#retrieve-documents-as-tool-for-ai-agent) operation modes.

When searching for data, use this to match metadata associated with documents. You can learn more about the operators and query structure in [Weaviate's conditional filters documentation](https://docs.weaviate.io/weaviate/api/graphql/filters).

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
| ------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'equal'`          | `valueString` or `valueNumber`                       | Checks if the property is equal to the given string or number.                                                                                                                    |
| `'like'`           | `valueString`                                        | Checks if the string property matches a pattern (for example, sub-string match).                                                                                                  |
| `'containsAny'`    | `valueTextArray` (string\[])                         | Checks if the property contains **any** of the given values.                                                                                                                      |
| `'containsAll'`    | `valueTextArray` (string\[])                         | Checks if the property contains **all** of the given values.                                                                                                                      |
| `'greaterThan'`    | `valueNumber`                                        | Checks if the property value is greater than the given number.                                                                                                                    |
| `'lessThan'`       | `valueNumber`                                        | Checks if the property value is less than the given number.                                                                                                                       |
| `'isNull'`         | `valueBoolean` (true/false)                          | Checks if the property is null or not. ([must enable before ingestion](https://docs.weaviate.io/weaviate/manage-collections/collection-operations#set-inverted-index-parameters)) |
| `'withinGeoRange'` | `valueGeoCoordinates` (object with geolocation data) | Filters by proximity to geographic coordinates.                                                                                                                                   |

When inserting data, the document loader sets the metadata. Refer to [Default Data Loader](../sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) for more information on loading documents.

### Metadata Keys <a href="#metadata-keys" id="metadata-keys"></a>

You can define which metadata keys you want Weaviate to return on your queries. This can reduce network load, as you will only get properties you have defined. Returns all properties from the server by default.

Available for the [Get Many](n8n-nodes-langchain.vectorstoreweaviate.md#get-many), [Retrieve Documents (As Vector Store for Chain/Tool)](n8n-nodes-langchain.vectorstoreweaviate.md#retrieve-documents-as-vector-store-for-chaintool), and [Retrieve Documents (As Tool for AI Agent)](n8n-nodes-langchain.vectorstoreweaviate.md#retrieve-documents-as-tool-for-ai-agent) operation modes.

### Hybrid: Query Text <a href="#hybrid-query-text" id="hybrid-query-text"></a>

Provide a query text to combine vector search with a keyword/text search.

### Hybrid: Explain Score <a href="#hybrid-explain-score" id="hybrid-explain-score"></a>

Whether to show the score fused between hybrid and vector search explanation.

### Hybrid: Fusion Type <a href="#hybrid-fusion-type" id="hybrid-fusion-type"></a>

Select the fusion type for combining vector and keyword search results. [Learn more about fusion algorithms](https://weaviate.io/learn/knowledgecards/fusion-algorithm).

Options:

* **Relative Score**: Uses relative score fusion
* **Ranked**: Uses ranked fusion

### Hybrid: Auto Cut Limit <a href="#hybrid-auto-cut-limit" id="hybrid-auto-cut-limit"></a>

Limit result groups by detecting sudden jumps in score. [Learn more about autocut](https://docs.weaviate.io/weaviate/api/graphql/additional-operators#autocut).

### Hybrid: Alpha <a href="#hybrid-alpha" id="hybrid-alpha"></a>

Change the relative weights of the keyword and vector components. 1.0 = pure vector, 0.0 = pure keyword. Default is 0.5. [Learn more about the alpha parameter](https://weaviate.io/learn/knowledgecards/alpha-parameter).

### Hybrid: Query Properties <a href="#hybrid-query-properties" id="hybrid-query-properties"></a>

Comma-separated list of properties to include in the query with optionally weighted values, e.g., "question^2,answer". [Learn more about setting weights on property values](https://docs.weaviate.io/weaviate/search/hybrid#set-weights-on-property-values).

### Hybrid: Max Vector Distance <a href="#hybrid-max-vector-distance" id="hybrid-max-vector-distance"></a>

Set the maximum allowable distance for the vector search component.

### Tenant Name <a href="#tenant-name" id="tenant-name"></a>

The specific tenant to store or retrieve documents for. [Learn more about multi-tenancy](https://weaviate.io/learn/knowledgecards/multi-tenancy).

{% hint style="info" %}
**Must enable at creation**

You must pass a tenant name at first ingestion to enable multitenancy for a collection. You can't enable or disable multitenancy after creation.
{% endhint %}

### Text Key <a href="#text-key" id="text-key"></a>

The key in the document that contains the embedded text.

### Skip Init Checks <a href="#skip-init-checks" id="skip-init-checks"></a>

Whether to [skip initialization checks](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#initial-connection-checks) when instantiating the client.

### Init Timeout <a href="#init-timeout" id="init-timeout"></a>

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during initial checks.

### Insert Timeout <a href="#insert-timeout" id="insert-timeout"></a>

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during inserts.

### Query Timeout <a href="#query-timeout" id="query-timeout"></a>

Number of seconds to wait before [timing out](https://docs.weaviate.io/weaviate/client-libraries/typescript/notes-best-practices#timeout-values) during queries.

### GRPC Proxy <a href="#grpc-proxy" id="grpc-proxy"></a>

A proxy to use for gRPC requests.

### Clear Data <a href="#clear-data" id="clear-data"></a>

Available for the [Insert Documents](n8n-nodes-langchain.vectorstoreweaviate.md#insert-documents) operation mode.

Whether to clear the collection or tenant before inserting new data.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse Weaviate Vector Store node documentation integration templates](https://n8n.io/integrations/weaviate-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Weaviate documentation](https://js.langchain.com/docs/integrations/vectorstores/weaviate/) for more information about the service.

Refer to [Weaviate Installation](https://docs.weaviate.io/deploy) for a self hosted Weaviate Cluster.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^3]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^4]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
