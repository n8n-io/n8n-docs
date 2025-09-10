---
title: Plan and Execute AI Agent node documentation
description: Learn how to use the Plan and Execute Agent of the AI Agent node in n8n. Follow technical documentation to integrate the Plan and Execute Agent into your workflows.
contentType: [integration, reference]
priority: critical
---

# Plan and Execute Agent node

The Plan and Execute Agent is like the [ReAct agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/react-agent.md) but with a focus on planning. It first creates a high-level plan to solve the given task and then executes the plan step by step. This agent is most useful for tasks that require a structured approach and careful planning.

Refer to [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) for more information on the AI Agent node itself.

## Node parameters

Configure the Plan and Execute Agent using the following parameters.

### Prompt

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/prompt.md"

### Require Specific Output Format

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/output-format.md"

## Node options

Refine the Plan and Execute Agent node's behavior using these options:

### Human Message Template

Enter a message that n8n will send to the agent during each step execution.

Available LangChain expressions:

* `{previous_steps}`: Contains information about the previous steps the agent's already completed.
* `{current_step}`: Contains information about the current step.
* `{agent_scratchpad}`: Information to remember for the next iteration.

## Templates and examples

Refer to the main AI Agent node's [Templates and examples](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md#templates-and-examples) section.

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues.md).


