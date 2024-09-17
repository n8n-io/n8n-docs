---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's a chain in AI?
description: Understand chains in the context of AI. Learn about chains in n8n.
contentType: explanation
---

# What's a chain in AI?

Chains bring together different components of AI to create a cohesive system. They set up a sequence of calls between the components. These components can include models and memory (though note that in n8n chains can't use memory).


## Chains in n8n

n8n provides three chain nodes:

* [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/): use to interact with an LLM, without any additional components.
* [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/): can connect to a vector store using a retriever, or to an n8n workflow using the Workflow Retriever node. Use this if you want to create a workflow that supports asking questions about specific documents.
* [Summarization Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization/): takes an input and returns a summary.

There's an important difference between chains in n8n and in other tools such as LangChain: none of the chain nodes support memory. This means they can't remember previous user queries. If you use LangChain to code an AI application, you can give your application memory. In n8n, if you need your workflow to support memory, use an agent. This is essential if you want users to be able to have a natural ongoing conversation with your app.
