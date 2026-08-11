---
description: Understand how n8n implements LangChain concepts, and connect a self-hosted n8n instance to LangSmith for tracing.
layout:
  description:
    visible: false
---

# LangChain in n8n

n8n's AI nodes implement [LangChain](https://js.langchain.com/docs/get_started/introduction)'s JavaScript framework. Each node is configurable: choose your own agent, LLM, memory, and other components. You can connect any other n8n node to your LangChain nodes as normal, so you can combine LangChain logic with any other data source or service n8n supports.

This page is for readers who already know LangChain and want to see how its concepts map onto n8n. If you're new to AI concepts, start with [Understand AI components](understand-ai-components/README.md) instead.

## How LangChain concepts map to n8n nodes

n8n represents most LangChain concepts as [cluster nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes): a [root node](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#root-node-n8n) that defines the cluster's main functionality, with one or more [sub-nodes](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#sub-node-n8n) attached to extend it.

| LangChain concept | n8n node type | Learn more |
| --- | --- | --- |
| Chain | Root node: Basic LLM Chain, Question and Answer Chain, Summarization Chain, and others | [What's a chain in AI?](understand-ai-components/what-chains-do.md) |
| Agent | Root node: AI Agent | [What's an agent in AI?](understand-ai-components/what-agents-do.md) |
| Vector store | Root node: Pinecone Vector Store, Qdrant Vector Store, Simple Vector Store, and others | [Store and search data with vectors](understand-ai-components/store-and-search-data-with-vectors.md) |
| Memory | Sub-node: Postgres Chat Memory, Redis Chat Memory, Simple Memory, and others | [How memory works](understand-ai-components/how-memory-works.md) |
| Tool | Sub-node: Call n8n Workflow Tool, Custom Code Tool, Wikipedia, and others | [What's a tool in AI?](understand-ai-components/how-tools-work.md) |
| Retriever | Sub-node: Vector Store Retriever, Workflow Retriever, and others | [Retrieve relevant context](understand-ai-components/retrieve-relevant-context.md) |
| Embeddings | Sub-node: Embeddings OpenAI, Embeddings Cohere, and others | [Retrieve relevant context](understand-ai-components/retrieve-relevant-context.md) |
| Document loader | Sub-node: Default Data Loader, GitHub Document Loader | [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes) |
| Output parser | Sub-node: Structured Output Parser, Auto-fixing Output Parser, and others | [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes) |
| Text splitter | Sub-node: Recursive Character Text Splitter, Token Splitter, and others | [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes) |

For the full, up-to-date list of nodes in each category, browse the [root nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes) and [sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes) libraries. n8n also provides the [Chat Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-langchain.chattrigger) node to start a workflow from a chat message, and the [LangChain Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.code) node, which lets you write LangChain JavaScript code directly for functionality that doesn't have a dedicated n8n node yet.

Unlike LangChain, n8n's chain nodes don't support memory, only agents do. If you need your workflow to remember previous messages in a conversation, use an agent instead of a chain.

## Use LangSmith with a self-hosted n8n instance

[LangSmith](https://www.langchain.com/langsmith) is a developer platform from the LangChain team. Connect a self-hosted n8n instance to LangSmith to record and monitor n8n executions, the same way you'd trace a LangChain application.

{% hint style="info" %}
**Feature availability**

LangSmith tracing is available on:

- **Self-hosted:** All editions

It isn't available on n8n Cloud.
{% endhint %}

To connect n8n to LangSmith:

1. [Log in to LangSmith](https://smith.langchain.com/settings) and get your API key.
2. Set the following [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables) in the environment where you host n8n:

   | Variable | Value |
   | --- | --- |
   | `LANGCHAIN_ENDPOINT` | `https://api.smith.langchain.com` |
   | `LANGCHAIN_TRACING_V2` | `true` |
   | `LANGCHAIN_API_KEY` | Your LangSmith API key |
   | `LANGCHAIN_PROJECT` | Optional project name. Defaults to `default` |
   | `LANGCHAIN_CALLBACKS_BACKGROUND` | `true` to upload traces asynchronously |

3. Restart n8n.

LangSmith creates a project named **default** after n8n sends its first trace, unless you set `LANGCHAIN_PROJECT` to a different name. Every trace then goes to that project instead. Traces can arrive with a short delay, because `LANGCHAIN_CALLBACKS_BACKGROUND` uploads them asynchronously by default. Set it to `false` for synchronous uploads when you're debugging.

For information on using LangSmith itself, refer to [LangSmith's documentation](https://docs.smith.langchain.com/).

## Learn more about LangChain

You don't need to know LangChain to use n8n, but these resources can help if you want to go deeper:

* The [LangChain documentation](https://docs.langchain.com/docs/) covers key concepts and use cases. Choose [LangChain | Python](https://python.langchain.com/docs/get_started/introduction) or [LangChain | JavaScript](https://js.langchain.com/docs/get_started/introduction/) for quickstarts, code examples, and API documentation. LangChain also provides [code templates](https://github.com/langchain-ai/langchain/tree/master/cookbook) for Python, with ideas for common patterns and use cases.
* [What product people need to know about LangChain](https://www.commandbar.com/blog/langchain-guide) explains LangChain terminology using metaphors, for a general audience.
* This [YouTube series by Greg Kamradt](https://youtu.be/_v_fgW2SkkQ?si=8Z2tfAoXnN3lXU9s) works through the LangChain documentation with code examples.
* Join the n8n [Discord](https://discord.gg/bAt54txhHg) to discuss LangChain and share your projects with the n8n community.
