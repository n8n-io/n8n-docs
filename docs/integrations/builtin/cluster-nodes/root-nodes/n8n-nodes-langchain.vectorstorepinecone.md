---
title: 'Pinecone'
description: 'Documentation for the Pinecone node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.'
---

# Pinecone

Use the Pinecone node to interact with your Pinecone database as vector store. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Pinecone node, and links to more resources.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/pinecone/).

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/pinecone-insert/){:target=_blank .external-link} page.
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-moed.md"

**Insert Documents Mode**
* Pinecone Index

Configuration options:
* Pinecone Namespace
* Clear Namespace

**Get Many Mode**
* Pinecone Index
* Prompt
* Limit

Configuration options:
* Pinecone Namespace
* Metadata Filter

**Retrieve Documents Mode**
* Pinecone Index

Configuration options:
* Pinecone Namespace
* Metadata Filter

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/pinecone-insert/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Pinecone documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/pinecone){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
