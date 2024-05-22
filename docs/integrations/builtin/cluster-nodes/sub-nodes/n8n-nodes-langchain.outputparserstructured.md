---
title: Structured Output Parser
description: Documentation for the Structured Output Parser node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Structured Output Parser

Use the Structured Output Parser node to return fields based on a JSON Schema.

On this page, you'll find the node parameters for the Structured Output Parser node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Structured Output Parser integrations](https://n8n.io/integrations/structured-output-parser/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Schema Type**: Define how the output should be structured and validated. You have two options to provide the schema:

1. **Generate from JSON Example**: Input an example JSON object to automatically generate the schema.
2. **Define Below**: Manually input the JSON schema.

**JSON Example**: a sample JSON object to generate the schema. Only the object property types and names are considered. The actual values are not used

**JSON Schema**: a JSON schema to structure and validate the output. Read the JSON Schema [guides and examples](https://json-schema.org/learn/miscellaneous-examples){:target=_blank .external-link} for help creating a valid JSON schema.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/structured-output-parser/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's structured output parser documentation](https://js.langchain.com/docs/modules/model_io/output_parsers/structured){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
