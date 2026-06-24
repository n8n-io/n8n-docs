---
title: What's a tool in AI?
description: >-
  Understand tools in the context of AI. Learn what's special about tools in
  n8n.
contentType: explanation
nodeTitle: How tools work
originalFilePath: advanced-ai/examples/understand-tools.md
originalUrl: 'https://docs.n8n.io/advanced-ai/examples/understand-tools'
url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components/how-tools-work'
layout:
  description:
    visible: false
---

# What's a tool in AI? <a href="#whats-a-tool-in-ai" id="whats-a-tool-in-ai"></a>

In AI, 'tools' has a specific meaning. Tools act like addons that your AI can use to access extra context or resources.

Here are a couple of other ways of expressing it:

> Tools are interfaces that an agent can use to interact with the world ([source](https://langchain-ai.github.io/langgraphjs/how-tos/tool-calling/))



> We can think of these tools as being almost like functions that your AI model can call ([source](https://www.udemy.com/course/chatgpt-and-langchain-the-complete-developers-masterclass/))

## AI tools in n8n <a href="#ai-tools-in-n8n" id="ai-tools-in-n8n"></a>

n8n provides tool sub-nodes[^1] that you can connect to your [AI agent](#user-content-fn-2)[^2]. As well as providing some popular tools, such as [Wikipedia](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia) and [SerpAPI](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi), n8n provides three especially powerful tools:

* [Call n8n Workflow Tool](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow): use this to load any n8n workflow as a tool.
* [Custom Code Tool](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode): write code that your agent can run.
* [HTTP Request Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest.md): make calls to fetch a website or data from an API.

The next three examples highlight the Call n8n Workflow Tool:

- [Chat with Google Sheets](../ai-examples/use-google-sheets-as-a-data-source.md)
- [Call an API to fetch data](../ai-examples/call-apis.md)
- [Set up a human fallback](../ai-examples/set-a-human-fallback-for-ai-workflows.md)

You can also learn how to [let AI dynamically specify parameters for tools with the `$fromAI()` function](../ai-examples/use-ai-for-parameters.md).

[^1]: n8n cluster nodes consist of one or more sub nodes connected to a root node. Sub nodes extend the functionality of the root node, providing access to specific services or resources or offering specific types of dedicated processing, like calculator functionality, for example.
[^2]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
