---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
title: Agents vs chains
description: A workflow example that demonstrates key differences between agents and chains.
workflowFile: advanced-ai/examples/agents_vs_chains.json
---

# Demonstration of key differences between agents and chains

In this workflow you can choose whether your chat query goes to an agent or chain. It shows some of the ways that agents are more powerful than chains.


<figure markdown>
!["Screenshot of the workflow"](/_images/advanced-ai/examples/agents-vs-chains.png)
<figcaption markdown>[Download the example workflow](/_workflows/[[ page.meta.workflowFile ]])</figcaption>
</figure>

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/): directs your query to either the agent or chain, depending on which you specify in your query. If you say "agent" it sends it to the agent. If you say "chain" it sends it to the chain.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): the Agent node interacts with other components of the workflow and makes decisions about what tools to use.
* [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/): the Basic LLM Chain node supports chatting with a connected LLM, but doesn't support memory or tools.


## Using the example

[[% include "_includes/examples-color-key.html" %]]
