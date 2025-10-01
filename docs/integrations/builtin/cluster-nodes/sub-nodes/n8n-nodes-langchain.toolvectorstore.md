---
title: Vector Store Question Answer Tool node documentation
description: Learn how to use the Vector Store Question Answer Tool node in n8n. Follow technical documentation to integrate Vector Store Question Answer Tool node into your workflows.
contentType: [integration, reference]
---

# Vector Store Question Answer Tool node

The Vector Store Question Answer node is a [tool](/glossary.md#ai-tool) that allows an [agent](/glossary.md#ai-agent) to summarize results and answer questions based on chunks from a [vector store](/glossary.md#ai-vector-store). 

On this page, you'll find the node parameters for the Vector Store Question Answer node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Vector Store Question Answer Tool integrations](https://n8n.io/integrations/vector-store-tool/) page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Description of Data

Enter a description of the data in the vector store.

### Limit

The maximum number of results to return.

## How n8n populates the tool description

n8n uses the node name (select the name to edit) and **Description of Data** parameter to populate the tool description for AI agents using the following format:

> Useful for when you need to answer questions about [node name]. Whenever you need information about [Description of Data], you should ALWAYS use this. Input should be a fully formed question.

Spaces in the node name are converted to underscores in the tool description.

/// warning | Avoid special characters in node names
Using special characters in the node name will cause errors when the agent runs:

![model errors from special characters](/_images/integrations/builtin/cluster-nodes/toolvectorstore/name-characters-error.png)

Use only alphanumeric characters, spaces, dashes, and underscores in node names.
///

## Related resources

View [example workflows and related content](https://n8n.io/integrations/vector-store-tool/) on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

