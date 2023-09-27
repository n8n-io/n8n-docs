---
title: Vector Store QA
description: Documentation for the Vector Store QA node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Vector Store QA

The Vector Store QA node allows you to use a vector store as a retriever.

On this page, you'll find the node parameters for the Vector Store QA node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->
	
## Node parameters

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Query

The question you want to ask.

### Top K

Choose how many results to return. For example, enter `5` to return the top five results from the vector store.

## Related resources

<!--
View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.
-->

Refer to [LangChain's documentation on retrieval](https://js.langchain.com/docs/modules/chains/popular/vector_db_qa){:target=_blank .external-link} for examples of how LangChain can use a vector store as a retriever.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
