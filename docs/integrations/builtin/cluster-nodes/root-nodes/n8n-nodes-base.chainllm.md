---
title: LLM Chain
description: Documentation for the LLM Chain node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# LLM Chain

The LLM chain node allows you to set the prompt that the model will use along with setting an optional parser for the response.

On this page, you'll find a list of operations the LLM Chain node supports, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Langchain examples](/langchain/examples/) page.

## Prompt
This is the prompt that the model will use.

```
Tell me a joke about {{ $json.input }}
```
	
## Choose a mode

There are two modes:

* **Run Once for All Items**: this is the default. When your workflow runs, the chain will run once, regardless of how many input items there are.
* **Run Once for Each Item**: choose this if you want your chain to run for every input item.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/chainLlm/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
