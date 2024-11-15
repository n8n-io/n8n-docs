---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's a tool in AI?
description: Understand tools in the context of AI. Learn what's special about tools in n8n.
contentType: explanation
---

# What's a tool in AI?

In AI, 'tools' has a specific meaning. Tools act like addons that your AI can use to access extra context or resources.

Here are a couple of other ways of expressing it:

> Tools are interfaces that an agent can use to interact with the world ([source](https://langchain-ai.github.io/langgraphjs/how-tos/tool-calling/){:target=_blank .external-link})

<!--  -->

> We can think of these tools as being almost like functions that your AI model can call ([source](https://www.udemy.com/course/chatgpt-and-langchain-the-complete-developers-masterclass/){:target=_blank .external-link})

## AI tools in n8n

n8n provides tool sub-nodes that you can connect to your AI agent. As well as providing some popular tools, such as [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia/) and [SerpAPI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi/), n8n provides three especially powerful tools:

* [Custom n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/): use this to load any n8n workflow as a tool.
* [Custom Code Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode/): write code that your agent can run.
* [HTTP Request Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest/): make calls to fetch a website or data from an API.

The next three examples highlight the Custom n8n Workflow Tool:

- [Chat with Google Sheets](/advanced-ai/examples/data-google-sheets/)
- [Call an API to fetch data](/advanced-ai/examples/api-workflow-tool/)
- [Set up a human fallback](/advanced-ai/examples/human-fallback/)

You can also learn how to [let AI dynamically specify parameters for tools with the `$fromAI()` function](/advanced-ai/examples/using-the-fromai-function/).
