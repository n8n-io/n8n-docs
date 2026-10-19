---
description: >-
  Learn how to use the Databricks Vector Store node in n8n. Search and fill
  Databricks Vector Search indexes and connect them to AI agents and chains.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Databricks Vector Store node

Use the Databricks Vector Store node to work with [Databricks Vector Search](https://docs.databricks.com/aws/en/generative-ai/vector-search) indexes in your workflows. You can run a similarity search over an index, insert documents into a Direct Access index, hand the index to a retriever connected to a chain[^1], or connect it to an AI agent[^2] as a tool[^3]. Indexes live in Unity Catalog, so the node sees only the data the credential's identity can access.

On this page, you'll find the prerequisites, the index types the node works with, the node parameters and options, and a worked example. If you come from the `n8n-nodes-databricks` community package, refer to [Migrate from the community package](migrate-from-the-community-package.md).

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../../../credentials/databricks.md) for guidance on setting up authentication. The node accepts the **Databricks OAuth2 API** credential only, with a service principal or user login. It doesn't accept a personal access token.
{% endhint %}

{% hint style="info" %}
**Preview status**

The Databricks Vector Store node is in Preview and may change in future releases. Avoid relying on it in production workflows.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Prerequisites

- A Databricks workspace with a Vector Search endpoint and at least one index on it. Refer to [Create and query a vector search index](https://docs.databricks.com/aws/en/vector-search/create-query-vector-search) in the Databricks documentation.
- A [Databricks OAuth2 credential](../../../credentials/databricks.md#supported-authentication-methods) in n8n, with a service principal or user login.
- An [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md) node connected to the node's **Embedding** input. The node needs the input in every operation mode, even on indexes where Databricks computes the embeddings itself. Refer to [Index types and embeddings](#index-types-and-embeddings).
- These privileges for the identity the credential authenticates as:
	- **USE CATALOG** on the catalog and **USE SCHEMA** on the schema that hold the index.
	- **SELECT** on the index. **Insert Documents** also needs **MODIFY** on the index.
	- **SELECT** on the source table of a Delta Sync index that syncs all of its columns, so the node can list the columns in **Content Column** and **Metadata Columns**. Without it, **Metadata Columns** stays empty, **Content Column** offers only the embedding source column, and documents come back with content only.
	- **USE CATALOG** and **USE SCHEMA** on the catalog and schema that hold the embeddings model service the Embeddings Databricks node uses, and **EXECUTE** on the service. Databricks grants **EXECUTE** on the `system.ai` services to all users by default.
	- Read access on the Vector Search endpoint that serves the index, if you use **Metadata Filter**. The node reads the endpoint type once per execution to check that the filter applies. Workspace users have it by default.

A service principal must be a member of the workspace with the **Workspace access** entitlement. A service principal that only exists at the account level fails with `invalid_client` from the workspace token endpoint, which looks like a wrong client secret. Refer to [Required Databricks privileges](../../../credentials/databricks.md#required-databricks-privileges) for the full list.

## Index types and embeddings

Two properties of a Databricks index decide what the node can do with it: how rows get into the index, and who computes the embeddings. The node reads the index description once per execution and adapts to both. You don't choose a query mode.

### Delta Sync and Direct Access indexes

| Index type | Where rows come from | Insert Documents |
|------------|---------------------|------------------|
| Delta Sync | A Delta table that Databricks keeps in sync with the index | Not supported. Add rows to the source table instead. The node fails before writing with `Index <name> syncs from its source table. Use a Direct Access index to insert documents`. |
| Direct Access | Rows you write through the Vector Search API | Supported. In **Insert Documents** mode, the **Index** list shows only Direct Access indexes. |

The three search modes work with both index types. **Insert Documents** works with Direct Access indexes only.

### Managed and self-managed embeddings

| Embeddings | Who embeds the text | What the node sends | Embeddings Databricks node |
|------------|--------------------|---------------------|----------------------------|
| Managed: a Delta Sync index with a Databricks embedding model | Databricks, from the index's embedding source column | The search text as `query_text` | Connected, but never called |
| Self-managed: a Direct Access index, or a Delta Sync index with its own vector column | The connected Embeddings Databricks node | The embedded search text as `query_vector` | Called for every search and every inserted document |

The rules for the Embeddings Databricks node follow from the table:

- Connect an Embeddings Databricks node to the Vector Store node in all modes. The node refuses to run without one, with `A Embedding sub-node must be connected and enabled`.
- On a managed index, the Embeddings node isn't called. Databricks embeds the query itself.
- On a self-managed index, the Embeddings node embeds queries and inserted documents, so pick the same model and dimension that produced the index's vectors. A different model fails with `query vector dimension <n> does not match index vector dimension <m>` on a search, or with `Databricks rejected the upsert into <index>. Failed primary keys: ...` on an insert.

## Set up the node

1. Add the node to your workflow. For **Retrieve Documents (As Tool for AI Agent)**, select the **+** on the **Tool** connector of an [AI Agent](../n8n-nodes-langchain.agent/README.md) or [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md) node instead. For **Retrieve Documents (As Vector Store for Chain/Tool)**, select the **+** on the **Vector Store** connector of a [Vector Store Retriever](../../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) or [Vector Store Question Answer Tool](../../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) node.
2. Under **Credential to connect with**, select a Databricks OAuth2 credential or create one.
3. Set **Operation Mode**. Refer to [Node parameters](#node-parameters) for the fields of each mode.
4. Select the index in **Index**:
	- **From List**: the node lists every index on every Vector Search endpoint the credential can see, described as `DELTA_SYNC - <endpoint>` or `DIRECT_ACCESS - <endpoint>`. Type to filter by name. In **Insert Documents** mode, the list shows Direct Access indexes only.
	- **Name**: enter the full Unity Catalog name, `catalog.schema.index`. The node rejects any other form, with `Use the full name: catalog.schema.index` in the editor and `Invalid Databricks index "<name>": use catalog.schema.index` when an expression produces the name at run time.
5. In **Content Column**, pick the column that becomes the document text (`pageContent`). The list shows the index's columns without the primary key and the vector column. On a managed index, the embedding source column comes first, marked `Embedding source column`, and you can leave the field empty to use it. On a self-managed index, you must pick a column: an empty value fails with `Index <name> uses self-managed embeddings. Select a content column`.
6. Select the **+** on the **Embedding** connector and add an [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md) node.
7. Fill in the fields of the operation mode, and the [options](#node-options) you need.

## Node usage patterns

You can use the Databricks Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the Databricks Vector Store node as a regular node to insert or get documents. This pattern places the node in the regular connection flow without using an agent: use **Insert Documents** to load a Direct Access index from a document loader, and **Get Many** to run a search from a prompt and work with the results in the rest of the workflow.

### Connect directly to an AI agent as a tool

You can connect the Databricks Vector Store node directly to the tool connector of an [AI Agent](../n8n-nodes-langchain.agent/README.md) or [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md) node to use the index as a knowledge source when answering questions. The agent writes its own search query, and the tool returns the matching documents.

Here, the connection would be: AI agent (tools connector) -> Databricks Vector Store node. Refer to [Example: Answer questions from a Databricks index with an AI agent](#example-answer-questions-from-a-databricks-index-with-an-ai-agent).

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](../../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Databricks Vector Store node to fetch documents from the index. This is often used with the [Question and Answer Chain](../n8n-nodes-langchain.chainretrievalqa/README.md) node to fetch documents from the vector store that match the given chat input.

The connection flow would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Databricks Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](../../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Databricks Vector Store node. Rather than connecting the Databricks Vector Store directly as a tool, this pattern uses a tool specifically designed to summarize data in the vector store.

The connections flow in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Databricks Vector Store.

## Node parameters

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/eiIkcF23uZ2A8BkFVQM5/" %}

The node doesn't offer an **Update Documents** mode. Every mode uses the **Index** and **Content Column** fields described in [Set up the node](#set-up-the-node), plus the fields below.

### Rerank Results

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KcxcfJWhy81cjCSzO4vQ/" %}

### Get Many parameters

- **Prompt**: Enter the search text. On a managed index the node sends it as `query_text`. On a self-managed index the Embeddings Databricks node embeds it first.
- **Limit**: Enter how many results to return. Default `4`. This is the only control over the number of results: refer to [No score threshold](#no-score-threshold).
- **Include Metadata**: Whether to include the document metadata in the output. Turned on by default.

Each output item holds the document and its score, in the form `{ "document": { "pageContent": "...", "metadata": { ... } }, "score": 0.73 }`. Scores aren't comparable across indexes or search modes.

### Insert Documents parameters

- **Index**: A Direct Access index. The list shows only those. A Delta Sync index entered by name fails before any write.
- **Content Column**: The column that receives the document text. The column must exist in the index and can't be the primary key or the vector column. The node reports a wrong choice before writing, for example `Column id is the primary key of <index>. Select another Content Column` or `Index <name> has no column <column>. Select a Content Column from: text, source`.
- **Embedding Batch Size**: How many documents the node embeds in one request to the Embeddings Databricks node. Default `200`.

Connect a document loader, such as the [Default Data Loader](../../sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md), to the **Document** input. The node embeds the documents with the connected Embeddings Databricks node and writes one row for each document. It outputs the documents it inserted. Rows become searchable within seconds.

How the node fills the row:

- The primary key gets a random UUID. The built-in document loaders don't set a document ID, so running the same insert twice adds the documents twice instead of updating them. Remove duplicates upstream, or delete the old rows in Databricks. A document that carries its own `id`, for example from a [LangChain Code](../n8n-nodes-langchain.code.md) node, is written under that key and replaces the row that has it.
- Loader metadata keys that match a column of the index go into that column. The node drops keys without a matching column. It also drops keys that name the primary key, the content column, or the vector column. There's no warning for dropped keys, and the output items still show them.
- Cancelling an execution stops the insert. Rows the node already wrote stay in the index.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

This mode has no fields of its own beyond **Index** and **Content Column**. The connected retriever or tool controls how many documents it fetches: set the **Limit** on the [Vector Store Retriever](../../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) or [Vector Store Question Answer Tool](../../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) node. The [node options](#node-options) you set here apply to every search those nodes run.

### Retrieve Documents (As Tool for AI Agent) parameters

- **Description**: Explain to the agent what the index contains and when to search it. A specific description, such as `Company handbook. Use it for any question about internal policies and processes.`, gets more reliable tool calls. The agent sees the tool under the node's name.
- **Limit**: Enter how many documents each tool call returns. Default `4`.
- **Include Metadata**: Whether to include the document metadata in the tool result. Turned on by default.

## Node options

The options apply to the three search modes: **Get Many**, **Retrieve Documents (As Vector Store for Chain/Tool)**, and **Retrieve Documents (As Tool for AI Agent)**.

### Metadata Columns

The columns to return in the document metadata. By default the node returns every column of the index except the primary key, the content column, and the vector column. Pick a subset to keep the payload an agent reads small. The list doesn't offer the primary key or the vector column.

### Search Mode

- **Vector** (default): Ranks results purely by semantic similarity. Sent as `query_type` `ANN`.
- **Hybrid**: Adds keyword matching on the search text, so documents that contain an exact term, such as a product code, rank first. Sent as `query_type` `HYBRID`. On a self-managed index the node sends the vector and the text together. Hybrid search returns at most 200 results for each query.

### Metadata Filter

A JSON object that restricts results to rows matching a condition on the index's columns. The node sends it as `filters_json`. Keys in one object combine with AND. The key holds the column name and, for anything other than equality, the operator:

| Condition | Metadata Filter |
|-----------|-----------------|
| Equal to a value | `{"source": "handbook"}` |
| Not equal | `{"source NOT": "draft"}` |
| Comparison (`<`, `<=`, `>`, `>=`) | `{"year >=": 2025}` |
| Range on one column | `{"price >=": 30000, "price <=": 55000}` |
| Any of several values | `{"source": ["handbook", "faq"]}` |
| Token match (no `%` wildcards) | `{"title LIKE": "pricing"}` |
| Several columns (AND) | `{"source": "handbook", "year >=": 2025}` |

Things to know:

- The filter works on **Standard** Vector Search endpoints only. Storage Optimized endpoints expect a SQL filter string that the node doesn't support yet. With a filter set, the node reads the endpoint type once per execution and fails before the query when the endpoint isn't Standard: `Index <name> runs on endpoint <endpoint> of type STORAGE_OPTIMIZED. The Metadata Filter works on STANDARD endpoints only.` Queries without a filter work on every endpoint type.
- A strict filter can return fewer rows than **Limit**. Databricks fetches the nearest candidates first and filters them afterwards, so raise **Limit** when you need more matches.
- A filter that matches nothing returns zero items without an error. Malformed JSON fails before any request with a validation error that names the **Metadata Filter** field.
- `BETWEEN`, wildcards in `LIKE`, and numeric comparisons on values nested in JSON columns aren't supported. Refer to the [Databricks filtering guide](https://docs.databricks.com/aws/en/ai-search/filtering-guide) for the full syntax.

## Known limits

- **Embeddings input always required**: Every mode needs an Embeddings Databricks node, including managed indexes where Databricks embeds the query and the node is never called.
- **Insert Documents on Direct Access indexes only**: Delta Sync indexes are read-only for the node. The insert rejects the primary key or the vector column as **Content Column**.
- **Inserted rows get random keys** unless the document carries its own `id`. The built-in document loaders don't set one, so a re-run duplicates rows instead of updating them.
- **Metadata Filter on Standard endpoints only**: Storage Optimized endpoints take a SQL filter string the node doesn't support yet. A filtered query on such an endpoint fails before it runs.
- **Hybrid search returns at most 200 results** for each query.
- **A strict filter can return fewer rows than Limit**, because Databricks filters after fetching the nearest candidates.
- **Pay-per-token rate limits**: Embedding a large batch of documents at once can hit the workspace rate limit of the embeddings model service. Refer to [Rate limits](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md#rate-limits) on the Embeddings Databricks page for how to avoid it.

### No score threshold

The node has no score threshold field, on purpose. Vector and Hybrid searches score on different scales: a similarity score on a self-managed index can sit around `0.003`, while a Hybrid search ranks an exact keyword match at `1.0`. A single cutoff can't be right for both, and a wrong one drops every result without a trace. Use **Limit** to control how many results you get, and filter on the `score` field in a later node if you need a cutoff for a specific index.

## Example: Answer questions from a Databricks index with an AI agent

This workflow answers chat questions from a company handbook stored in a Delta Sync index with Databricks-computed embeddings. Replace the index and model names with yours.

1. In Databricks, create a Delta Sync index over the handbook table, for example `main.docs.handbook_index`, with a `content` column as the embedding source and a `source` column for the document origin. Refer to [Create and query a vector search index](https://docs.databricks.com/aws/en/vector-search/create-query-vector-search).
2. Add a [Chat Trigger](../../../core-nodes/n8n-nodes-langchain.chattrigger/README.md) node.
3. Add a [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md) node after it. The [AI Agent](../n8n-nodes-langchain.agent/README.md) node works the same way without the trace export. In **Options**, set a **System Message** such as `Answer questions about the company handbook with the handbook tool. Say so when the handbook doesn't cover a question.`
4. Select the **+** on the agent's **Chat Model** connector and add a [Databricks Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md) node. Select your Databricks credential and a chat-capable model service, for example `system.ai.meta-llama-3-3-70b-instruct`.
5. Select the **+** on the **Memory** connector and add a [Simple Memory](../../sub-nodes/n8n-nodes-langchain.memorybufferwindow/README.md) node, so follow-up questions keep their context.
6. Select the **+** on the **Tool** connector and add a **Databricks Vector Store** node. Name the node `handbook`. Set **Operation Mode** to **Retrieve Documents (As Tool for AI Agent)**, select `main.docs.handbook_index` in **Index**, leave **Content Column** empty so the node uses the embedding source column, and set **Description** to `Company handbook. Use it for any question about internal policies and processes.` Keep **Limit** at `4`.
7. Select the **+** on the vector store's **Embedding** connector and add an [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md) node with the same credential and an embeddings model service, for example `system.ai.gte-large-en`. The index is managed, so Databricks embeds the queries and this node is never called, but the node needs the connection.
8. Optionally, in the agent node select the Databricks credential and turn on **Export Traces to MLflow** to see each run, including the handbook searches, in [MLflow Tracing](../n8n-nodes-langchain.databricksaiagent.md#what-the-node-exports).
9. Open the chat and ask a question the handbook answers. The execution shows one call to the `handbook` tool with the agent's search query and the documents it returned.

To search a self-managed index instead, set **Content Column** on the vector store node and pick the model that produced the index's vectors in the Embeddings Databricks node. To restrict the agent to part of the index, add a **Metadata Filter** such as `{"source": "handbook"}` to the vector store node's options.

## Related resources

- [Migrate from the community package](migrate-from-the-community-package.md)
- [Databricks credentials](../../../credentials/databricks.md)
- [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md)
- [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md)
- [Databricks Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md)
- [Databricks node](../../../app-nodes/n8n-nodes-base.databricks.md) for the Vector Search index operations, such as creating and listing indexes
- [Vector Store Retriever](../../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) and [Vector Store Question Answer Tool](../../sub-nodes/n8n-nodes-langchain.toolvectorstore.md)
- [Databricks Vector Search](https://docs.databricks.com/aws/en/generative-ai/vector-search), the [Query index API](https://docs.databricks.com/api/workspace/vectorsearchindexes/queryindex), and the [filtering guide](https://docs.databricks.com/aws/en/ai-search/filtering-guide) in the Databricks documentation

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/dN5Se1JVH7wYGtmN4n0v/" %}

## Common issues

### A Embedding sub-node must be connected and enabled

The node has no Embeddings Databricks node on its **Embedding** input. Connect one in every mode, even on a managed index where it's never called.

### Index uses self-managed embeddings

The error `Index <name> uses self-managed embeddings. Select a content column` means the index carries its own vectors, so the node can't infer which column holds the text. Pick the column in **Content Column**.

### Index syncs from its source table

**Insert Documents** targets a Delta Sync index, and the node reports `Index <name> syncs from its source table. Use a Direct Access index to insert documents`. Databricks fills a Delta Sync index from the source table, so add the rows to the table instead, or insert into a Direct Access index.

### Insufficient permissions for UC entity

`Databricks Vector Search request failed (403): Insufficient permissions for UC entity <index>` means the credential's identity lacks **SELECT** on the index, or **MODIFY** for an insert. Grant the privilege in Unity Catalog, together with **USE CATALOG** and **USE SCHEMA**.

### Unity Catalog entity doesn't exist

`Databricks Vector Search request failed (404): Unity Catalog entity <name> does not exist` means the **Index** name doesn't match an index the identity can see. Check the three-part name, or pick the index **From List**.

### Query vector dimension doesn't match the index

The error `query vector dimension <n> does not match index vector dimension <m>` means the Embeddings Databricks node uses a model with a different dimension than the index. Select the model that produced the index's vectors. On an insert, the same mismatch surfaces as `Databricks rejected the upsert into <index>. Failed primary keys: ...`, and the node writes nothing.

### Failed to retrieve Databricks access token

The credential can't get a token from the workspace. With a service principal, `invalid_client` means the principal isn't assigned to the workspace: add it with the **Workspace access** entitlement. If the error description shows HTML, the credential's **Host** isn't a Databricks workspace URL.

### Host must use HTTPS

The node fails with `Databricks host must use https` because the credential's **Host** isn't an `https://` URL, for example because it starts with `http://` or has no scheme. Every request carries a token, so the node refuses plain HTTP. Enter the full workspace URL with `https://`.

### Rate limit reached during an insert

The embeddings model service rejected a batch with `REQUEST_LIMIT_EXCEEDED`. The node didn't write the chunk that hit the limit, but chunks it wrote before stay in the index, so check the index before you retry. Refer to [Rate limits](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md#rate-limits) on the Embeddings Databricks page.

### The Metadata Filter works on STANDARD endpoints only

A **Metadata Filter** is set, and the index runs on a Storage Optimized endpoint, which takes a SQL filter string the node doesn't support yet. Remove the filter, or move the index to a Standard endpoint. If the message starts with `Could not read the type of the endpoint`, the credential's identity can't read the Vector Search endpoint: grant it read access on the endpoint, or remove the filter.

[^1]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^2]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^3]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
