---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Custom n8n Workflow Tool node documentation
description: Learn how to use the Custom n8n Workflow Tool node in n8n. Follow technical documentation to integrate Custom n8n Workflow Tool node into your workflows.
contentType: integration
priority: high
---

# Custom n8n Workflow Tool node

The Workflow Tool node is a tool that allows an agent to run another n8n workflow and fetch its output data. 

On this page, you'll find the node parameters for the Workflow Tool node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Name

Enter a name for your custom code. It can't contain whitespace or special characters.

### Description

Enter a custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Source

Tell n8n which workflow to call. You can choose either:

* **Database** and enter a workflow ID.
* **Parameter** and copy in a complete [workflow JSON](/workflows/export-import/).

### Workflow Values

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/workflow-values.md"

### Specify input schema

/// note | Agent support
The structured input schema requires with a Tools Agent or OpenAI Functions Agent.
///

Enable this option to define the input schema for the workflow you're calling. This is useful when you want to make sure the input data the LLM provides is in the correct format.

**Schema Type**: Define the input structure and validation. You have two options to provide the schema:

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/schema-type-structuring.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'workflow-tool') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
