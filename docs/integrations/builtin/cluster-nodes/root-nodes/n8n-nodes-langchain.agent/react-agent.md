---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ReAct AI Agent node documentation
description: Learn how to use the ReAct Agent of the AI Agent node in n8n. Follow technical documentation to integrate the ReAct Agent into your workflows.
contentType: integration
priority: critical
---

# ReAct AI Agent node

The ReAct Agent node implements [ReAct](https://react-lm.github.io/){:target=_blank .external-link} logic. ReAct (reasoning and acting) brings together the reasoning powers of chain-of-thought prompting and action plan generation.

The ReAct Agent reasons about a given task, determines the necessary actions, and then executes them. It follows the cycle of reasoning and acting until it completes the task. The ReAct agent can break down complex tasks into smaller sub-tasks, prioritise them, and execute them one after the other.

Refer to [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/) for more information on the AI Agent node itself.

/// note | No memory
The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts or simulate an ongoing conversation.
///

## Node parameters

Configure the ReAct Agent using the following parameters.

### Prompt

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/prompt.md"

### Require Specific Output Format

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/output-format.md"

## Node options

Use the options to create a message to send to the agent at the start of the conversation. The message type depends on the model you're using:

* **Chat models**: These models have the concept of three components interacting (AI, system, and human). They can receive system messages and human messages (prompts).
* **Instruct models**: These models don't have the concept of separate AI, system, and human components. They receive one body of text, the instruct message.

### Human Message Template

Use this option to extend the user prompt. This is a way for the agent to pass information from one iteration to the next.

Available LangChain expressions:

* `{input}`: Contains the user prompt.
* `{agent_scratchpad}`: Information to remember for the next iteration.

### Prefix Message

Enter text to prefix the tools list at the start of the conversation. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Suffix Message for Chat Model

Add text to append after the tools list at the start of the conversation when the agent uses a chat model. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Suffix Message for Regular Model

Add text to append after the tools list at the start of the conversation when the agent uses a regular/instruct model. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

## Related resources

Refer to LangChain's [ReAct Agents](https://js.langchain.com/docs/concepts/agents/){:target=_blank .external-link} documentation for more information.

## Templates and examples

Refer to the main AI Agent node's [Templates and examples](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index/#templates-and-examples) section.

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues/).

--8<-- "_glossary/ai-glossary.md"
