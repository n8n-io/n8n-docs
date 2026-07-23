---
title: vector-store-mode-with-update
---
This Vector Store node has five modes: **Get Many**, **Insert Documents**, **Retrieve Documents (As Vector Store for Chain/Tool)**, **Retrieve Documents (As Tool for AI Agent)**, and **Update Documents**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.


#### Get Many <a href="#get-many" id="get-many"></a>

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt will be embedded and used for similarity search. The node will return the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context. 

#### Insert Documents <a href="#insert-documents" id="insert-documents"></a>

Use Insert Documents mode to insert new documents into your vector database.

#### Retrieve Documents (As Vector Store for Chain/Tool) <a href="#retrieve-documents-as-vector-store-for-chaintool" id="retrieve-documents-as-vector-store-for-chaintool"></a>

Use Retrieve Documents (As Vector Store for Chain/Tool) mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Retrieve Documents (As Tool for AI Agent) <a href="#retrieve-documents-as-tool-for-ai-agent" id="retrieve-documents-as-tool-for-ai-agent"></a>

Use Retrieve Documents (As Tool for AI Agent) mode to use the vector store as a tool resource when answering queries. When formulating responses, the agent uses the vector store when the vector store name and description match the question details.

#### Update Documents <a href="#update-documents" id="update-documents"></a>

Use Update Documents mode to update documents in a vector database by ID. Fill in the **ID** with the ID of the embedding entry to update.
