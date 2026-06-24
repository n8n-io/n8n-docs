---
title: AI Agent node documentation
description: >-
  Learn how to use the AI Agent node in n8n. Follow technical documentation to
  integrate AI Agent node into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: n8n-nodes-langchain.agent
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent
layout:
  description:
    visible: false
---

# AI Agent node <a href="#ai-agent-node" id="ai-agent-node"></a>

An [AI agent](#user-content-fn-1)[^1] is an autonomous system that receives data, makes rational decisions, and acts within its environment to achieve specific goals. The AI agent's environment is everything the agent can access that isn't the agent itself. This agent uses external tools[^2] and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. 

{% hint style="info" %}
**Connect a tool**

You must connect at least one tool [sub-node](../../sub-nodes/README.md) to an AI Agent node.
{% endhint %}

{% hint style="info" %}
**Agent type**

Prior to version 1.82.0, the AI Agent had a setting for working as different agent types. This has now been removed and all AI Agent nodes work as a `Tools Agent` which was the recommended and most frequently used setting. If you're working with older versions of the AI Agent in workflows or templates, as long as they were set to 'Tools Agent', they should continue to behave as intended with the updated node.
{% endhint %}


## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse n8n-nodes-langchain.agent integration templates](https://n8n.io/integrations/agent) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's documentation on agents](https://js.langchain.com/docs/concepts/agents/) for more information about the service.

New to AI Agents? Read the [n8n blog introduction to AI agents](https://blog.n8n.io/ai-agents/).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^2]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
