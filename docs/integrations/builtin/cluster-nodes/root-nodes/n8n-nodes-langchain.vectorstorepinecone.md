---
title: 'Pinecone'
description: 'Documentation for the Pinecone node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.'
---

# Pinecone Vector Store

Use the Pinecone node to interact with your Pinecone database as vector store. You can insert documents into a vector database, get documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Pinecone node, and links to more resources.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/pinecone/).

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/pinecone-insert/){:target=_blank .external-link} page.
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

Parameters for **Get Many**:

* Pinecone Index
* Prompt
* Limit

Parameters for **Insert Documents**:

* Pinecone Index

Parameters for **Retrieve Documents (For Agent/Chain)**:

* Pinecone Index

## Node options

* Pinecone Namespace
* Metadata Filter: available in **Get Many** mode.
* Clear Namespace: available in **Insert Documents** mode.

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/pinecone-insert/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Pinecone documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/pinecone){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
