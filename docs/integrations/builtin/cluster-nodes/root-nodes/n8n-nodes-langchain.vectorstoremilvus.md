---
title: Milvus Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Milvus Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus
description: >-
  Learn how to use the Milvus Vector Store node in n8n. Follow technical
  documentation to integrate Milvus Vector Store node into your workflows.
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

# Milvus Vector Store

Use the Milvus node to interact with your Milvus database as [vector store](#user-content-fn-1)[^1]. You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a chain[^2], or connect directly to an agent[^3] as a tool[^4].

On this page, you'll find the node parameters for the Milvus node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/milvus.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Milvus Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the Milvus Vector Store as a regular node to insert, or get documents. This pattern places the Milvus Vector Store in the regular connection flow without using an agent.

See this [example template](https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/) for how to build a system that stores documents in Milvus and retrieves them to support cited, chat-based answers.

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Milvus Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Milvus Vector Store node. See this [example template](https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/) where data is embedded and indexed in Milvus, and the AI Agent uses the vector store as a knowledge tool for question-answering.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Milvus Vector Store node to fetch documents from the Milvus Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

A typical node connection flow looks like this: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Milvus Vector Store.

Check out this [workflow example](https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/) to see how to ingest external data into Milvus and build a chat-based semantic Q\&A system.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Milvus Vector Store node. Rather than connecting the Milvus Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The connections flow would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Milvus Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/eiIkcF23uZ2A8BkFVQM5/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KcxcfJWhy81cjCSzO4vQ/" %}

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Milvus Collection**: Select or enter the Milvus Collection to use.
* **Prompt**: Enter your search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Milvus Collection**: Select or enter the Milvus Collection to use.
* **Clear Collection**: Specify whether to clear the collection before inserting new documents.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Milvus collection**: Select or enter the Milvus Collection to use.

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Milvus Collection**: Select or enter the Milvus Collection to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options <a href="#node-options" id="node-options"></a>

### Metadata Filter <a href="#metadata-filter" id="metadata-filter"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/9OWZ8hSpVqky4D4xRnYP/" %}

### Clear Collection <a href="#clear-collection" id="clear-collection"></a>

Available in **Insert Documents** mode. Deletes all data from the collection before inserting the new data.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Milvus documentation](https://js.langchain.com/docs/integrations/vectorstores/milvus/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^3]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^4]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
