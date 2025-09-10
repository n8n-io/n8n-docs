---
title: What's memory in AI?
description: Understand memory in the context of AI. Learn what's special about memory in n8n.
contentType: explanation
---

# What's memory in AI?

Memory is a key part of AI chat services. The [memory](/glossary.md#ai-memory) keeps a history of previous messages, allowing for an ongoing conversation with the AI, rather than every interaction starting fresh.

## AI memory in n8n

To add memory to your AI workflow you can use either:

* [Simple Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md): stores a customizable length of chat history for the current session. This is the easiest to get started with.
* One of the memory services that n8n provides nodes for. These include:
	* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead.md)
	* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat.md)
	* [Postgres Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md) 
	* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata.md)
	* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md)

If you need to do advanced AI memory management in your workflows, use the [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager.md) node. 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"
