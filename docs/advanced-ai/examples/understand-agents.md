---
title: What's an agent in AI?
description: Understand agents in the context of AI. Learn how n8n provides agents.
contentType: explanation
---

# What's an agent in AI?

One way to think of an [agent](/glossary.md#ai-agent) is as a [chain](/advanced-ai/examples/understand-chains.md) that knows how to make decisions. Where a chain follows a predetermined sequence of calls to different AI components, an agent uses a language model to determine which actions to take.

Agents are the part of AI that act as decision-makers. They can interact with other agents and [tools](/glossary.md#ai-tool). When you send a query to an agent, it tries to choose the best tools to use to answer. Agents adapt to your specific queries, as well as the prompts that configure their behavior.

## Agents in n8n

n8n provides one Agent node, which can act as different types of agent depending on the settings you choose. Refer to the [Agent node documentation](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) for details on the available agent types.

When you execute a workflow containing an agent, the agent runs multiple times. For example, it may do an initial setup, followed by a run to call a tool, then another run to evaluate the tool response and respond to the user.
