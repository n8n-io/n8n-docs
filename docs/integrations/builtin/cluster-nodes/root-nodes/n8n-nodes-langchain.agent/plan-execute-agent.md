---
title: Plan and Execute AI Agent node documentation
description: >-
  Learn how to use the Plan and Execute Agent of the AI Agent node in n8n.
  Follow technical documentation to integrate the Plan and Execute Agent into
  your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Plan and Execute AI Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/plan-execute-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/plan-execute-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/plan-execute-agent
layout:
  description:
    visible: false
---

# Plan and Execute Agent node <a href="#plan-and-execute-agent-node" id="plan-and-execute-agent-node"></a>

The Plan and Execute Agent is like the [ReAct agent](react-agent.md) but with a focus on planning. It first creates a high-level plan to solve the given task and then executes the plan step by step. This agent is most useful for tasks that require a structured approach and careful planning.

Refer to [AI Agent](README.md) for more information on the AI Agent node itself.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the Plan and Execute Agent using the following parameters.

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ss9Y6clfLTwlXMx69w6E/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/IsHMhvgDA3Ok5qdqnHnJ/" %}

## Node options <a href="#node-options" id="node-options"></a>

Refine the Plan and Execute Agent node's behavior using these options:

### Human Message Template <a href="#human-message-template" id="human-message-template"></a>

Enter a message that n8n will send to the agent during each step execution.

Available LangChain expressions:

* `{previous_steps}`: Contains information about the previous steps the agent's already completed.
* `{current_step}`: Contains information about the current step.
* `{agent_scratchpad}`: Information to remember for the next iteration.

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/GAsqtB1RVGEDrT5PMMLl/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](README.md#templates-and-examples) section.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).


