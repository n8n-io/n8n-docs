---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: In-Memory Vector Store
description: Documentation for the In-Memory Vector Store node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
priority: medium
---

# In-Memory Vector Store

Use the In Memory Vector Store node to store and retrieve embeddings in n8n's in-app memory. 

On this page, you'll find the node parameters for the In Memory Vector Store node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

/// note | This node is different to AI memory nodes
The in-memory storage described here is different to the AI memory nodes such as [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/).

This node creates a vector database in the app memory.
///

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"


Parameters for **Get Many**:

* Memory Key: the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* Prompt: search query.
* Limit: how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.


Parameters for **Insert Documents**:

* Memory Key
* Clear Store: whether to wipe the vector store for the given memory key for this workflow before inserting data.

Parameters for **Retrieve Documents (For Agent/Chain)**:

* Memory Key

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'in-memory-vector-store') ]]

## Related resources

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
