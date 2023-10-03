---
contentType: overview
title: LangChain
description: Use n8n to build with LangChain
---

# LangChain

With n8n's LangChain nodes you can build AI-powered functionality within your workflows. The LangChain nodes are configurable, meaning you can choose your preferred agent, LLM, memory, and so on. Alongside the LangChain nodes, you can connect any n8n node as normal: this means you can integrate your LangChain logic with other data sources and services.

!!! info "Feature availability"
	This feature is available on Cloud and self-hosted n8n, at all pricing tiers. To access it, you need either a separate Cloud account, or the LangChain n8n Docker image. Refer to [Access LangChain in n8n](/langchain/access-langchain/) for more information.

* [Access LangChain in n8n](/langchain/access-langchain/): how to get the n8n version that includes LangChain.
* [Learning resources](/langchain/learning-resources/): n8n's documentation for LangChain assumes you're familiar with AI and LangChain concepts. This page provides links to learning resources.
* [LangChain concepts and features in n8n](/langchain/langchain-n8n/): how n8n represents LangChain concepts and features.

## Related resources

Related documentation and tools.

### Node types

This feature uses [Cluster nodes](/integrations/builtin/cluster-nodes/): groups of [root](/integrations/builtin/cluster-nodes/root-nodes/) and [sub](/integrations/builtin/cluster-nodes/sub-nodes/) nodes that work together.

### Workflow templates

You can browse workflow templates in-app or on the n8n website [Workflows](https://n8n.io/workflows/?categories=25,26){:target=_blank .external-link} page.

Refer to [Templates](/workflows/templates/) for information on accessing templates in-app.

### Chatbot widget

n8n provides a chatbot widget that you can use as a frontend for AI-powered chat workflows. Refer to the [@n8n/chat npm page](https://www.npmjs.com/package/@n8n/chat){:target=_blank .external-link} for usage information.

n8n provides code snippets for the chatbot, pre-populated with your settings:

1. Add the Manual Chat Trigger to your workflow.
1. Select **Chat**.
1. Select **More info** in the help text:
	> Add chat to external applications using the n8n chat package. More info
