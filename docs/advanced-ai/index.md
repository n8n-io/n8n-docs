---
contentType: overview
title: Advanced AI
description: Use n8n's LangChain integrations to build AI-powered functionality within your workflows. Connect your LangChain functionality to other data sources and services.
---

# Advanced AI

Build AI functionality using n8n: from creating your own chat bot, to using AI to process documents and data from other sources.

/// info | Feature availability
This feature is available on Cloud and self-hosted n8n, in version 1.19.4 and above.
///

## LangChain in n8n

n8n provides a collection of nodes that implement LangChain's functionality. The LangChain nodes are configurable, meaning you can choose your preferred agent, LLM, memory, and so on. Alongside the LangChain nodes, you can connect any n8n node as normal: this means you can integrate your LangChain logic with other data sources and services.

* [Tutorial: Build an AI workflow in n8n](/langchain/langchain-tutorial/): learn how to build AI workflows using n8n's LangChain implementation.
* [Learning resources](/langchain/learning-resources/): n8n's documentation for LangChain assumes you're familiar with AI and LangChain concepts. This page provides links to learning resources.
* [LangChain concepts and features in n8n](/langchain/langchain-n8n/): how n8n represents LangChain concepts and features.

## Related resources

Related documentation and tools.

### Node types

This feature uses [Cluster nodes](/integrations/builtin/cluster-nodes/): groups of [root](/integrations/builtin/cluster-nodes/root-nodes/) and [sub](/integrations/builtin/cluster-nodes/sub-nodes/) nodes that work together.

### Workflow templates

You can browse workflow templates in-app or on the n8n website [Workflows](https://n8n.io/workflows/?categories=25,26){:target=_blank .external-link} page.

Refer to [Templates](/workflows/templates/) for information on accessing templates in-app.

### Chat trigger

Use the [n8n Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) to trigger a workflow based on chat interactions.

### Chatbot widget

n8n provides a chatbot widget that you can use as a frontend for AI-powered chat workflows. Refer to the [@n8n/chat npm page](https://www.npmjs.com/package/@n8n/chat){:target=_blank .external-link} for usage information.
