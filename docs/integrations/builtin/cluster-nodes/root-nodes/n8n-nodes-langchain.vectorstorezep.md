---
title: Zep Vector Store
description: Documentation for the Zep Vector Store node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Zep Vector Store

Use the Zep Vector Store to interact with Zep vector databases. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Zep Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/zep/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Zep Vector Store integrations](https://n8n.io/integrations/zep-vector-store/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Parameters for **Insert Documents**

* Collection Name: differentiates where the data is stored.

### Parameters for **Get Many**

* Collection Name
* Prompt
* Limit

### Parameters for **Retrieve Documents (For Agent/Chain)**

* Collection Name

## Node options

### Embedding Dimensions

Must be the same when embedding the data and when querying it.

This sets the size of the array of floats used to represent the semantic meaning of a text document. 

Read more about Zep embeddings in [Zep's embeddings documentation](https://docs.getzep.com/deployment/embeddings/){:target=_blank .external-link}

### Is Auto Embedded

Available in **Insert Documents** mode. This is enabled by default.

Disable this to configure your embeddings in Zep instead of in n8n.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"


## Related resources

View [example workflows and related content](https://n8n.io/integrations/zep-vector-store-load/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Zep documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/zep){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
