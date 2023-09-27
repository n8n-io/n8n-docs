---
title: Conversational Agent
description: Documentation for the Conversational Agent node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Conversational Agent

Use this agent with the [On new manual Chat Message](/integrations/builtin/trigger-nodes/n8n-nodes-langchain.manualchattrigger/) node to interact with chat models. Attach a memory sub-node so that users can have an ongoing conversation with multiple queries. Memory doesn't persist between sessions.

On this page, you'll find the node parameters for the Conversational Agent node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->
	
## Node parameters

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Text

The input from the chat. This is the user's query, also known as the prompt.

### System message

Send a message to the agent before the conversation starts. Use this to guide the agent's decision-making.

## Related resources

<!--
View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.
-->

Refer to [LangChain's documentation on conversational agents](https://js.langchain.com/docs/modules/agents/agent_types/chat_conversation_agent){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
