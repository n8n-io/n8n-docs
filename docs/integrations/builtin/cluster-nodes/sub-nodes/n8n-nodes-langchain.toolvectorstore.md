---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Vector Store Question Answer Tool node documentation
description: Learn how to use the Vector Store Question Answer Tool node in n8n. Follow technical documentation to integrate Vector Store Question Answer Tool node into your workflows.
contentType: integration
---

# Vector Store Question Answer Tool node

The Vector Store Question Answer node is a tool that allows an agent to summarize results and answer questions based on chunks from a vector store. 

On this page, you'll find the node parameters for the Vector Store Question Answer node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Vector Store Question Answer Tool integrations](https://n8n.io/integrations/vector-store-tool/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Data Name

Enter the name of the data in the vector store.

### Description of Data

Enter a description of the data in the vector store.

n8n uses the **Data Name** and **Description of Data** parameters to populate the tool description for AI agents using the following format:

> Useful for when you need to answer questions about [Data Name]. Whenever you need information about [Description of Data], you should ALWAYS use this. Input should be a fully formed question.

### Limit

The maximum number of results to return.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/vector-store-tool/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
