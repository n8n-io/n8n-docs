---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: In-Memory Vector Store node documentation
description: Learn how to use the In-Memory Vector Store node in n8n. Follow technical documentation to integrate In-Memory Vector Store node into your workflows.
contentType: integration
priority: medium
---

# In-Memory Vector Store node

Use the In Memory Vector Store node to store and retrieve embeddings in n8n's in-app memory. 

On this page, you'll find the node parameters for the In Memory Vector Store node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

/// note | This node is different to AI memory nodes
The in-memory storage described here is different to the AI memory nodes such as [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/).

This node creates a vector database in the app memory.
///

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Get Many parameters

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.


### Insert Documents parameters

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* **Clear Store**: Use this parameter to control whether to wipe the vector store for the given memory key for this workflow before inserting data (turned on).

### Retrieve Documents (For Agent/Chain) parameters

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'in-memory-vector-store') ]]

## Related resources

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
