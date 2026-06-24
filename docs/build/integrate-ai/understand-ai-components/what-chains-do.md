---
title: What's a chain in AI?
description: Understand chains in the context of AI. Learn about chains in n8n.
contentType: explanation
nodeTitle: What chains do
originalFilePath: advanced-ai/examples/understand-chains.md
originalUrl: 'https://docs.n8n.io/advanced-ai/examples/understand-chains'
url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components/what-chains-do'
layout:
  description:
    visible: false
---

# What's a chain in AI? <a href="#whats-a-chain-in-ai" id="whats-a-chain-in-ai"></a>

[Chains](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-chain) bring together different components of AI to create a cohesive system. They set up a sequence of calls between the components. These components can include models and [memory](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-memory) (though note that in n8n chains can't use memory).


## Chains in n8n <a href="#chains-in-n8n" id="chains-in-n8n"></a>

n8n provides three chain nodes:

* [Basic LLM Chain](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm): use to interact with an LLM, without any additional components.
* [Question and Answer Chain](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa): can connect to a [vector store](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-vector-store) using a retriever, or to an n8n workflow using the Workflow Retriever node. Use this if you want to create a workflow that supports asking questions about specific documents.
* [Summarization Chain](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization): takes an input and returns a summary.

There's an important difference between chains in n8n and in other tools such as LangChain: none of the chain nodes support memory. This means they can't remember previous user queries. If you use LangChain to code an AI application, you can give your application memory. In n8n, if you need your workflow to support memory, use an agent. This is essential if you want users to be able to have a natural ongoing conversation with your app.
