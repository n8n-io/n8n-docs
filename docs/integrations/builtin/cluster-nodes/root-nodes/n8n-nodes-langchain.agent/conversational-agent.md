---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Conversational AI Agent node documentation
description: Learn how to use the Conversational Agent of the AI Agent node in n8n. Follow technical documentation to integrate the Conversational Agent into your workflows.
priority: critical
---

# Conversational AI Agent node

The Conversational Agent has human-like conversations. It can maintain context, understand user intent, and provide relevant answers. This agent is typically used for building chatbots, virtual assistants and customer support systems.

The Conversational Agent describes tools in the system prompt and parses JSON responses for tool calls. If your preferred AI model doesn't support tool calling or you're handling simpler interactions, this agent is a good general option. It's more flexible but may be less reliable than the [Tools Agent](/integrations/builtin/root-nodes/n8n-nodes-langchain.agent/tools-agent/).

Refer to [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/) for more information on the AI Agent node itself and troubleshooting common errors.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

## Node parameters

Configure the Conversational Agent using the following parameters.

### Prompt

Select how you want the node to construct the prompt (also known as the user's query or input from the chat). Choose from:

* **Take from previous node automatically**: If you select this option, the node expects an input from a previous node called `chatInput`.
* **Define below**: If you select this option, enter the **Text** you want to use as the prompt. You can use expressions here for dynamic content.

### Require Specific Output Format

This parameter controls whether you want the node to require a specific output format. When turned on, n8n prompts you to connect one of these output parsers to the node:

* [Auto-fixing Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserautofixing/)
* [Item List Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparseritemlist/)
* [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/)

## Node options

Refine the Conversational Agent node's behavior using these options:

### Human Message

Tell the agent about the tools it can use and add context to the user's input.

You must include:

* `{tools}`: A LangChain expression. Provides a string of the tools you've connected to the Agent.
* `{format_instructions}`: A LangChain expression. Provides the schema or format from the output parser node you've connected.
* `{{input}}`: A LangChain variable. The user's prompt. Populated with the value of the **Prompt** parameter.

Example:

```
TOOLS
------
Assistant can ask the user to use tools to look up information that may be helpful in answering the user's original question. The tools the human can use are:

{tools}

{format_instructions}

USER'S INPUT
--------------------
Here is the user's input (remember to respond with a markdown code snippet of a JSON blob with a single action, and NOTHING else):

{{input}}
```

### System Message 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/system-message.md"

### Max Iterations

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/max-iterations.md"

### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

## Templates and examples

Refer to the main AI Agent node's [Templates and examples](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/#templates-and-examples) section.
