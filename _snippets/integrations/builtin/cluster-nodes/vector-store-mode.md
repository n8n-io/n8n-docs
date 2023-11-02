### Operation Mode
Vector Store nodes in n8n always have three modes: "Get Many", "Insert Documents" and "Retrieve Documents". The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

#### Insert Documents
Insert Documents mode allows you to insert new documents into your vector database. It has a main, configure "Embedding" input and configure "Document" input and regular output.

#### Get Many Mode
In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt will be embedded and used for similiarity search. The node will return the n documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them, for example, to a chain as additional context. This mode has a regular(main) and an configure "Embedding" inputs and regular(main) output. 

#### Retrieve Documents Mode
Retrieve Documents mode is used when paired with a vector-store retriever and allows you to retrieve documents from vector database and provide them to the retriever connected to a chain. This mode doesn't have a regular input and only has "Vector Store" output so it always needs to be connected to a retriever or root node.
