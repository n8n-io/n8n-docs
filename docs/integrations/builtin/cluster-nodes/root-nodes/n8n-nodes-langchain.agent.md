---
title: Agent
description: Documentation for the Agent node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Agent

The Agent node allows you to set which agent type you want to use.

On this page, you'll find the node parameters for the Agent node, and links to more resources.

<!--
!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain/){:target=_blank .external-link} page.
-->

## Conversational Agent Parameters

This agent is optimised for conversation allowing it to chat with the user.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Text

The input from the chat. This is the user's query, also known as the prompt.

### System message

Send a message to the agent before the conversation starts. Use this to guide the agent's decision-making.

## OpenAI Functions Agent Parameters

The OpenAI Functions Agent node allows you to use an [OpenAI functions model](https://platform.openai.com/docs/guides/gpt/function-calling){:target=_blank .external-link}. These are models that detect when a function should be called and respond with the inputs that should be passed to the function.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

You must use the [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/) with this agent.

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Text

The input from the chat. This is the user's query, also known as the prompt.

## React Agent Parameters

The ReAct Agent node implements [ReAct](https://react-lm.github.io/){:target=_blank .external-link} logic. ReAct (reasoning and action) brings together the reasoning powers of chain-of-thought prompting and action plan generation.

!!! note "No memory"
	The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts, or simulate an ongoing conversation.

### Mode

Choose whether to run the chain once, or for every input item. Select either:

* Run Once for All Items
* Run Once for Each Item

### Text

The input from the chat. This is the user's query, also known as the prompt.

## SQL Agent Parameters

The SQL Agent uses a SQL database as a data source. The agent builds a SQL query based on the natural language query in the prompt.

!!! note "Postgres and MySQL Agents"
    If you are using Postgres or MySQL this doesn't support the tunnel options you can set in the credential.

### Data Source

Options:

* MySQL
* SQLite
* Postgres

!!! note "SQLite"
	To use SQLite you will need to use a [Read Binary Files](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfiles/) node before the Agent to read your SQLite file. 

### Prompt

The query to run on the data.

### Options

Use the options to refine the agent's behavior.

* Ignored Tables
* Include Sample Rows
* Included Tables
* Prefix Prompt
* Suffix Prompt
* Top K

## Related resources

<!--
View [example workflows and related content](https://n8n.io/integrations/langchain/){:target=_blank .external-link} on n8n's website.
-->

Refer to [LangChain's documentation on agents](https://js.langchain.com/docs/modules/agents/agent_types/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
