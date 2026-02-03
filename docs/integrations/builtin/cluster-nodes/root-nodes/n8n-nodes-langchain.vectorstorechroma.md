---
title: Chroma Vector Store node documentation
description: Learn how to use the Chroma Vector Store node in n8n. Follow technical documentation to integrate Chroma Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Chroma Vector Store node

Use the Chroma node to interact with your Chroma database as [vector store](/glossary/#ai-vector-store). You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a [chain](/glossary/#ai-chain), or connect directly to an [agent](/glossary/#ai-agent) as a [tool](/glossary/#ai-tool). 

On this page, you'll find the node parameters for the Chroma node, and links to more resources.

## Node usage patterns

You can use the Chroma Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the Chroma Vector Store as a regular node to insert or get documents. This pattern places the Chroma Vector Store in the regular connection flow without using an agent.

### Connect directly to an AI agent as a tool

You can connect the Chroma Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Chroma Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/) node with the Chroma Vector Store node to fetch documents from the Chroma Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An example of the connection flow would be as follows:

Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Chroma Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/) to summarize results and answer questions from the Chroma Vector Store node. Rather than connecting the Chroma Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The connections flow in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Chroma Vector store.

## Node parameters

### Operation Mode

This Vector Store node has four modes: **Get Many**, **Insert Documents**, **Retrieve Documents (As Vector Store for Chain/Tool)**, and **Retrieve Documents (As Tool for AI Agent)**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

#### Get Many

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt is embedded and used for similarity search. The node returns the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.

#### Insert Documents

Use insert documents mode to insert new documents into your vector database.

#### Retrieve Documents (as Vector Store for Chain/Tool)

Use Retrieve Documents (As Vector Store for Chain/Tool) mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Retrieve Documents (as Tool for AI Agent)

Use Retrieve Documents (As Tool for AI Agent) mode to use the vector store as a tool resource when answering queries. When formulating responses, the agent uses the vector store when the vector store name and description match the question details.

### Rerank Results

Enables [reranking](/glossary/#ai-reranking). If you enable this option, you must connect a reranking node to the vector store. That node will then rerank the results for queries. You can use this option with the `Get Many`, `Retrieve Documents (As Vector Store for Chain/Tool)` and `Retrieve Documents (As Tool for AI Agent)` modes.

### Get Many parameters

- **Chroma collection name**: Select your collection from the fetched collections list.
- **Prompt**: Enter the search query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `5` to get the five best results.

This Operation Mode includes one **Node option**, the Metadata Filter

### Insert Documents parameters

- **Chroma collection name**: Select your collection from the fetched collections list.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

- **Chroma collection name**: Select your collection from the fetched collections list.

This Operation Mode includes one **Node option**, the Metadata Filter

### Retrieve Documents (As Tool for AI Agent) parameters

- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Chroma collection name**: Select your collection from the fetched collections list.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `5` to get the five best results.

## Node options

### Metadata Filter

Available in **Get Many** mode. When searching for data, use this to match with metadata associated with the document.

This is an `AND` query. If you specify more than one metadata filter field, all of them must match.

When inserting data, the metadata is set using the document loader. Refer to [Default Data Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader/) for more information on loading documents.

## Related resources

Refer to [LangChain's Chroma documentation](https://docs.langchain.com/oss/javascript/integrations/vectorstores/chroma) for more information about the service.

View n8n's [Advanced AI](/advanced-ai/) documentation.