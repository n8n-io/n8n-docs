---
title: In Memory Vector Store
description: Documentation for the In Memory Vector Store node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# In Memory Vector Store

Use the In Memory Vector Store node to store and retrieve embeddings in-memory.

On this page, you'll find the node parameters for the In Memory Vector Store node, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/in-memory-vector-store/){:target=_blank .external-link} page.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-moed.md"

**Insert Documents Mode**
* Memory Key
* Clear Store

**Get Many Mode**
* Memory Key
* Prompt
* Limit

**Retrieve Documents Mode**
* Memory Key

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Related resources

View [example workflows and related content](https://n8n.io/integrations/in-memory-vector-store/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
