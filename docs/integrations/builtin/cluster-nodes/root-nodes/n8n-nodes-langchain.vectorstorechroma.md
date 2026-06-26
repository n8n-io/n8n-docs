---
title: Chroma Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Chroma Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorechroma.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorechroma
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorechroma
description: >-
  Learn how to use the Chroma Vector Store node in n8n. Follow technical
  documentation to integrate Chroma Vector Store node into your workflows.
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

# Chroma Vector Store

Use the Chroma node to interact with your Chroma database as [vector store](#user-content-fn-1)[^1]. You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a chain[^2], or connect directly to an agent[^3] as a tool[^4].

On this page, you'll find the node parameters for the Chroma node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/chroma.md).
{% endhint %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Chroma Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the Chroma Vector Store as a regular node to insert or get documents. This pattern places the Chroma Vector Store in the regular connection flow without using an agent.

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Chroma Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Chroma Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Chroma Vector Store node to fetch documents from the Chroma Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An example of the connection flow would be as follows:

Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Chroma Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Chroma Vector Store node. Rather than connecting the Chroma Vector Store directly as a tool, this pattern uses a tool specifically designed to summarize data in the vector store.

The connections flow in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Chroma Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Operation Mode <a href="#operation-mode" id="operation-mode"></a>

This Vector Store node has four modes: **Get Many**, **Insert Documents**, **Retrieve Documents (As Vector Store for Chain/Tool)**, and **Retrieve Documents (As Tool for AI Agent)**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

#### Get Many <a href="#get-many" id="get-many"></a>

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt is embedded and used for similarity search. The node returns the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.

#### Insert Documents <a href="#insert-documents" id="insert-documents"></a>

Use insert documents mode to insert new documents into your vector database.

#### Retrieve Documents (as Vector Store for Chain/Tool) <a href="#retrieve-documents-as-vector-store-for-chaintool" id="retrieve-documents-as-vector-store-for-chaintool"></a>

Use Retrieve Documents (As Vector Store for Chain/Tool) mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Retrieve Documents (as Tool for AI Agent) <a href="#retrieve-documents-as-tool-for-ai-agent" id="retrieve-documents-as-tool-for-ai-agent"></a>

Use Retrieve Documents (As Tool for AI Agent) mode to use the vector store as a tool resource when answering queries. When formulating responses, the agent uses the vector store when the vector store name and description match the question details.

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

Enables reranking[^5]. If you enable this option, you must connect a reranking node to the vector store. That node will then rerank the results for queries. You can use this option with the `Get Many`, `Retrieve Documents (As Vector Store for Chain/Tool)` and `Retrieve Documents (As Tool for AI Agent)` modes.

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Chroma collection name**: Select your collection from the fetched collections list.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `5` to get the five best results.

This Operation Mode includes one **Node option**, the Metadata Filter

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Chroma collection name**: Select your collection from the fetched collections list.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Chroma collection name**: Select your collection from the fetched collections list.

This Operation Mode includes one **Node option**, the Metadata Filter

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Chroma collection name**: Select your collection from the fetched collections list.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `5` to get the five best results.

## Node options <a href="#node-options" id="node-options"></a>

### Metadata Filter <a href="#metadata-filter" id="metadata-filter"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/9OWZ8hSpVqky4D4xRnYP/" %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Chroma documentation](https://js.langchain.com/oss/javascript/integrations/vectorstores/chroma) for more information about the service.

View n8n's [Advanced AI](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai) documentation.

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^3]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^4]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
[^5]: Reranking is a technique that refines the order of a list of candidate documents to improve the relevance of search results. Retrieval-Augmented Generation (RAG) and other applications use reranking to prioritize the most relevant information for generation or downstream tasks.
