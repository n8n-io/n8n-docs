---
title: AI Agent node documentation
description: Learn how to use the AI Agent node in n8n. Follow technical documentation to integrate AI Agent node into your workflows.
contentType: [integration, reference]
priority: critical
---

# AI Agent node

An [AI agent](/glossary.md#ai-agent) is an autonomous system that receives data, makes rational decisions, and acts within its environment to achieve specific goals. The AI agent's environment is everything the agent can access that isn't the agent itself. This agent uses external [tools](/glossary.md#ai-tool) and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. 

/// note | Connect a tool
You must connect at least one tool [sub-node](/integrations/builtin/cluster-nodes/sub-nodes/index.md) to an AI Agent node.
///

/// note | Agent type
Prior to version 1.82.0, the AI Agent had a setting for working as different agent types. This has now been removed and all AI Agent nodes work as a `Tools Agent` which was the recommended and most frequently used setting. If you're working with older versions of the AI Agent in workflows or templates, as long as they were set to 'Tools Agent', they should continue to behave as intended with the updated node.
///


## Templates and examples
<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'agent') ]]

## Related resources

Refer to [LangChain's documentation on agents](https://js.langchain.com/docs/concepts/agents/) for more information about the service.

New to AI Agents? Read the [n8n blog introduction to AI agents](https://blog.n8n.io/ai-agents/).

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues.md).


