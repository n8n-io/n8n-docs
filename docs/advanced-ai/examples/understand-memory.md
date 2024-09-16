---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's memory in AI?
description: Understand memory in the context of AI. Learn what's special about memory in n8n.
contentType: explanation
---

# What's memory in AI?

Memory is a key part of AI chat services. The memory keeps a history of previous messages, allowing for an ongoing conversation with the AI, rather than every interaction starting fresh.

## AI memory in n8n

To add memory to your AI workflow you can use either:

* [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/): stores a customizable length of chat history for the current session. This is the easiest to get started with.
* One of the memory services that n8n provides nodes for. These include:
	* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead/)
	* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat/)
	* [Postgres Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat/) 
	* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata/)
	* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep/)

If you need to do advanced AI memory management in your workflows, use the [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager/) node. 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"
