---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Information Extractor node documentation
description: Learn how to use the Information Extractor node in n8n. Follow technical documentation to integrate Information Extractor node into your workflows.
contentType: integration
---

# Information Extractor node

Use the Information Extractor node to extract structured information from incoming data.

On this page, you'll find the node parameters for the Information Extractor node,
and links to more resources.

## Node parameters

* **Text** defines the input text to extract information from. This is usually an expression that references a field from the input items. For example, this could be `{{ $json.chatInput }}` if the input is a chat trigger, or `{{ $json.text }}` if a previous node is Extract from PDF.
* Use **Schema Type** to choose how you want to describe the desired output data format. You can choose between:
    * **From Attribute Description**: This option allows you to define the schema by specifying the list of attributes and their descriptions.
    * **Generate From JSON Example**: Input an example JSON object to automatically generate the schema. The node uses the object property types and names. It ignores the actual values.
    * **Define Below**: Manually input the JSON schema. Read the JSON Schema [guides and examples](https://json-schema.org/learn/miscellaneous-examples){:target=_blank .external-link} for help creating a valid JSON schema.

## Node options

* **System Prompt Template**: Use this option to change the system prompt that's used for the information extraction. n8n automatically appends format specification instructions to the prompt.


## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
