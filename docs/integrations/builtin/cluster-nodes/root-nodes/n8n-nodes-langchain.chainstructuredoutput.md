---
title: Structured Output Chain
description: Documentation for the Structured Output Chain node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Structured Output Chain

The Structured Output Chain node allows you to use OpenAI functions to output objects that match a given format for any given input.

On this page, you'll find the node parameters for the Structured Output Chain node, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.

!!! note "Requires OpenAI functions"
	This chain depends on OpenAI functions. You must connect the OpenAI model.
	
## Node parameters

### Prompt

The prompt the model uses. For example:

> List all food items mentioned in the following text


### Input Text

The incoming data that you want to format. For example:

> This is a paragraph about food. It describes apples, which are very good for you, and usually green. Then there are oranges. These are also healthy, and orange coloured. Then we have things like chocolate, which is delicious, but not healthy. Chocolate is usually brown.

### JSON Schema

The output format, described with [JSON Schema](https://json-schema.org/){:target=_blank .external-link}. 

For example: given the prompt and input text examples, using this schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "foods": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "healthy": {
            "type": "boolean"
          },
          "color": {
            "type": "string"
          }
        }
      }
    }
 },
 "required": ["foods"]
}
```

Gives this result:

```json
[
  {
    "response": {
      "foods": [
        {
          "name": "apples",
          "healthy": true,
          "color": "green"
        },
        {
          "name": "oranges",
          "healthy": true,
          "color": "orange"
        },
        {
          "name": "chocolate",
          "healthy": false,
          "color": "brown"
        }
      ]
    }
  }
]
```

## Related resources

View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's documentation on Structured Output with OpenAI functions](https://js.langchain.com/docs/modules/chains/popular/structured_output){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
