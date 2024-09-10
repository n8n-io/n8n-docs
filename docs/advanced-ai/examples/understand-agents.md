---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's an agent in AI?
description: Understand agents in the context of AI. Learn how n8n provides agents.
contentType: explanation
---

# What's an agent in AI?

One way to think of an agent is as a [chain](/advanced-ai/examples/understand-chains/) that knows how to make decisions. Where a chain follows a predetermined sequence of calls to different AI components, an agent uses a language model to determine which actions to take.

Agents are the part of AI that act as decision-makers. They can interact with other agents and tools. When you send a query to an agent, it tries to choose the best tools to use to answer. Agents adapt to your specific queries, as well as the prompts that configure their behavior.

## Agents in n8n

n8n provides one Agent node, which can act as different types of agent depending on the settings you choose. Refer to the [Agent node documentation](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) for details on the available agent types.

When execute a workflow containing an agent, the agent runs multiple times. For example, it may do an initial setup, followed by a run to call a tool, then another run to evaluate the tool response and respond to the user.
