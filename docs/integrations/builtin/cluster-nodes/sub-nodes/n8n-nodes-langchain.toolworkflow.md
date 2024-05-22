---
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

### Specify Input Schema
/// note | Agent support
The structured input schema is **only supported for Tools & OpenAI Functions Agents**.
///
Enable this option to define the input schema for the workflow you're calling. This is useful when you want to make sure the input data LLM is providing is in the correct format.

**Schema Type**: Define how the input parameters should be structured and validated. You have two options to provide the schema:

1. **Generate from JSON Example**: Input an example JSON object to automatically generate the schema.
2. **Define Below**: Manually input the JSON schema.

**JSON Example**: a sample JSON object to generate the schema. Only the object property types and names are considered. The actual values are not used

**Input Schema**: a JSON schema to structure and validate the input parameters. Read the JSON Schema [guides and examples](https://json-schema.org/learn/miscellaneous-examples){:target=_blank .external-link} for help creating a valid JSON schema.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/workflow-tool/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
