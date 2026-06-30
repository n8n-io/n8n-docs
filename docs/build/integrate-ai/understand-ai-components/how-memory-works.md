---
title: What's memory in AI?
description: >-
  Understand memory in the context of AI. Learn what's special about memory in
  n8n.
contentType: explanation
nodeTitle: How memory works
originalFilePath: advanced-ai/examples/understand-memory.md
originalUrl: 'https://docs.n8n.io/advanced-ai/examples/understand-memory'
url: >-
  https://docs.n8n.io/build/integrate-ai/understand-ai-components/how-memory-works
layout:
  description:
    visible: false
---

# What's memory in AI? <a href="#whats-memory-in-ai" id="whats-memory-in-ai"></a>

Memory is a key part of AI chat services. The memory[^1] keeps a history of previous messages, allowing for an ongoing conversation with the AI, rather than every interaction starting fresh.

## AI memory in n8n <a href="#ai-memory-in-n8n" id="ai-memory-in-n8n"></a>

To add memory to your AI workflow you can use either:

* [Simple Memory](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow): stores a customizable length of chat history for the current session. This is the easiest to get started with.
* One of the memory services that n8n provides nodes for. These include:
	* [Motorhead](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead)
	* [Redis Chat Memory](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat)
	* [Postgres Chat Memory](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat) 
	* [Xata](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata)
	* [Zep](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep)

If you need to do advanced AI memory management in your workflows, use the [Chat Memory Manager](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager) node. 

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ipTfg43EHN14P930L6JP/" %}

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
