### Operation Mode

This Vector Store node has four modes: **Get Many**, **Insert Documents**, **Retrieve Documents**, and **Update Documents**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

<!-- vale off -->
#### Get Many

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt will be embedded and used for similarity search. The node will return the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context. 
<!-- vale on -->
#### Insert Documents

Use Insert Documents mode to insert new documents into your vector database.

#### Retrieve Documents (For Agent/Chain)

Use Retrieve Documents mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Update Documents

Use Update Documents mode to update documents in a vector database by ID. Fill in the **ID** with the ID of the embedding entry to update.
