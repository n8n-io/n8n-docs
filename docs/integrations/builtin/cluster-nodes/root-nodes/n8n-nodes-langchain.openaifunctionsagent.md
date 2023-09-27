---
title: OpenAI Functions Agent
description: Documentation for the OpenAI Functions Agent node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# OpenAI Functions Agent

The OpenAI Functions Agent node allows you to use an [OpenAI functions model](https://platform.openai.com/docs/guides/gpt/function-calling){:target=_blank .external-link}. These are models that detect when a function should be called and respond with the inputs that should be passed to the function. 

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

On this page, you'll find the node parameters for the OpenAI Functions Agent node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->

!!! note "Requires OpenAI functions"
	This chain depends on OpenAI functions. You must connect a supported OpenAI model.
	
## Node parameters

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Text

The input from the chat. This is the user's query, also known as the prompt.

## Related resources

<!--
View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.
-->

Refer to [LangChain's documentation on OpenAI functions](https://js.langchain.com/docs/modules/agents/agent_types/openai_functions_agent){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
