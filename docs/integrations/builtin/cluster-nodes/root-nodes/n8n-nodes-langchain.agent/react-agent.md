---
title: ReAct AI Agent node documentation
description: >-
  Learn how to use the ReAct Agent of the AI Agent node in n8n. Follow technical
  documentation to integrate the ReAct Agent into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: ReAct AI Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/react-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/react-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/react-agent
layout:
  description:
    visible: false
---

# ReAct AI Agent node <a href="#react-ai-agent-node" id="react-ai-agent-node"></a>

{% hint style="info" %}
**Feature removed**

n8n removed this functionality in February 2025.
{% endhint %}

The ReAct Agent node implements [ReAct](https://react-lm.github.io/) logic. ReAct (reasoning and acting) brings together the reasoning powers of chain-of-thought prompting and action plan generation.

The ReAct Agent reasons about a given task, determines the necessary actions, and then executes them. It follows the cycle of reasoning and acting until it completes the task. The ReAct agent can break down complex tasks into smaller sub-tasks, prioritise them, and execute them one after the other.

Refer to [AI Agent](README.md) for more information on the AI Agent node itself.

{% hint style="info" %}
**No memory**

The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts or simulate an ongoing conversation.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the ReAct Agent using the following parameters.

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ss9Y6clfLTwlXMx69w6E/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/IsHMhvgDA3Ok5qdqnHnJ/" %}

## Node options <a href="#node-options" id="node-options"></a>

Use the options to create a message to send to the agent at the start of the conversation. The message type depends on the model you're using:

* **Chat models**: These models have the concept of three components interacting (AI, system, and human). They can receive system messages and human messages (prompts).
* **Instruct models**: These models don't have the concept of separate AI, system, and human components. They receive one body of text, the instruct message.

### Human Message Template <a href="#human-message-template" id="human-message-template"></a>

Use this option to extend the user prompt. This is a way for the agent to pass information from one iteration to the next.

Available LangChain expressions:

* `{input}`: Contains the user prompt.
* `{agent_scratchpad}`: Information to remember for the next iteration.

### Prefix Message <a href="#prefix-message" id="prefix-message"></a>

Enter text to prefix the tools list at the start of the conversation. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Suffix Message for Chat Model <a href="#suffix-message-for-chat-model" id="suffix-message-for-chat-model"></a>

Add text to append after the tools list at the start of the conversation when the agent uses a chat model. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Suffix Message for Regular Model <a href="#suffix-message-for-regular-model" id="suffix-message-for-regular-model"></a>

Add text to append after the tools list at the start of the conversation when the agent uses a regular/instruct model. You don't need to add the list of tools. LangChain automatically adds the tools list.

### Return Intermediate Steps <a href="#return-intermediate-steps" id="return-intermediate-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/skA96E8hAnMMKG7c4Lta/" %}

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/GAsqtB1RVGEDrT5PMMLl/" %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to LangChain's [ReAct Agents](https://js.langchain.com/docs/concepts/agents/) documentation for more information.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](README.md#templates-and-examples) section.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).


