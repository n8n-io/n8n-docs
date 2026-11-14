---
title: Information Extractor node documentation
description: >-
  Learn how to use the Information Extractor node in n8n. Follow technical
  documentation to integrate Information Extractor node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Information Extractor node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor
layout:
  description:
    visible: false
---

# Information Extractor node <a href="#information-extractor-node" id="information-extractor-node"></a>

Use the Information Extractor node to extract structured information from incoming data.

On this page, you'll find the node parameters for the Information Extractor node,
and links to more resources.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Text** defines the input text to extract information from. This is usually an expression that references a field from the input items. For example, this could be `{{ $json.chatInput }}` if the input is a chat trigger, or `{{ $json.text }}` if a previous node is Extract from PDF.
* Use **Schema Type** to choose how you want to describe the desired output data format. You can choose between:
    * **From Attribute Descriptions**: This option allows you to define the schema by specifying the list of attributes and their descriptions.
    * **Generate From JSON Example**: Input an example JSON object to automatically generate the schema. The node uses the object property types and names. It ignores the actual values. n8n treats every field as mandatory when generating schemas from JSON examples.
    * **Define using JSON Schema**: Manually input the JSON schema. Read the JSON Schema [guides and examples](https://json-schema.org/learn/miscellaneous-examples) for help creating a valid JSON schema.

## Node options <a href="#node-options" id="node-options"></a>

* **System Prompt Template**: Use this option to change the system prompt that's used for the information extraction. n8n automatically appends format specification instructions to the prompt.


## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

