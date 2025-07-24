<!-- vale off -->
#### Get Many

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt is embedded and used for similarity search. The node returns the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.
<!-- vale on -->
#### Insert Documents

Use insert documents mode to insert new documents into your vector database.

#### Retrieve Documents (For Agent/Chain)

Use Retrieve Documents mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.
