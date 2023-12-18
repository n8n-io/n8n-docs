---
title: In Memory Vector Store
description: Documentation for the In Memory Vector Store node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# In Memory Vector Store

Use the In Memory Vector Store node to store and retrieve embeddings in-memory.

On this page, you'll find the node parameters for the In Memory Vector Store node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [In Memory Vector Store integrations](https://n8n.io/integrations/in-memory-vector-store/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"


Parameters for **Get Many**:

* Memory Key: the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* Prompt: search query.
* Limit: how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.


Parameters for **Insert Documents**:

* Memory Key
* Clear Store: whether to wipe the vector store for the given memory key for this workflow before inserting data. [TODO: phrase this better]

Parameters for **Retrieve Documents (For Agent/Chain)**:

* Memory Key
	
## Related resources

View [example workflows and related content](https://n8n.io/integrations/in-memory-vector-store/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
