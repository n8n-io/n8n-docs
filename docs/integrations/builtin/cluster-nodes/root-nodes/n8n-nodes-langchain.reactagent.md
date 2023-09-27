---
title: ReAct Agent
description: Documentation for the ReAct Agent node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# ReAct Agent

The ReAct Agent node implements [ReAct](https://react-lm.github.io/){:target=_blank .external-link} logic. ReAct (reasoning and action) brings together the reasoning powers of chain-of-thought prompting and action plan generation.

On this page, you'll find the node parameters for the ReAct Agent node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->

!!! note "No memory"
	The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts, or simulate an ongoing conversation.
	
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

Refer to [_Name_'s documentation](){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
