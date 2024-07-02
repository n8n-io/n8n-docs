---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Custom n8n Workflow Tool
description: Documentation for the Custom n8n Workflow Tool node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Custom n8n Workflow Tool

The Workflow Tool node is a tool that allows an agent to run another n8n workflow and fetch its output data. 

On this page, you'll find the node parameters for the Workflow Tool node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Custom n8n Workflow Tool integrations](https://n8n.io/integrations/workflow-tool/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Name

Give your custom code a name. It can't contain whitespace or special characters.

### Description

Give your custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Source

Tell n8n which workflow to call. You can choose either:

* **Database**, then enter a workflow ID.
* **Parameter**, then copy in a complete [workflow JSON](/workflows/export-import/).

### Field to Return

This must match the name of the output property in the workflow you're calling.

### Workflow Values

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/workflow-values.md"

### Specify input schema

/// note | Agent support
The structured input schema requires with a Tools Agent or OpenAI Functions Agent.
///

Enable this option to define the input schema for the workflow you're calling. This is useful when you want to make sure the input data the LLM provides is in the correct format.

**Schema Type**: Define the input structure and validation. You have two options to provide the schema:

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/schema-type-structuring.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/workflow-tool/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
