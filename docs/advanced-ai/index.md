---
title: n8n Advanced AI Documentation and Guides
description: Use n8n's LangChain integrations to build AI-powered functionality within your workflows. Connect your LangChain functionality to other data sources and services.
contentType: overview
hide:
  - feedback
  - kapaButton
---

# Advanced AI

Build AI functionality using n8n: from creating your own chat bot, to using AI to process documents and data from other sources.

/// info | Feature availability
This feature is available on Cloud and self-hosted n8n, in version 1.19.4 and above.
///

<div class="grid cards" markdown>

-   __Get started__

    Work through the short tutorial to learn the basics of building AI workflows in n8n.

    [:octicons-arrow-right-24: Tutorial](/advanced-ai/intro-tutorial.md)

-   __Use a Starter Kit__

    Try n8n's Self-hosted AI Starter Kit to quickly start building AI workflows.

    [:octicons-arrow-right-24: Self-hosted AI Starter Kit](/hosting/starter-kits/ai-starter-kit.md)

-   __Explore examples and concepts__

	Browse examples and workflow templates to help you build. Includes explanations of important AI concepts.

    [:octicons-arrow-right-24: Examples](/advanced-ai/examples/introduction.md)

-   __How n8n uses LangChain__

    Learn more about how n8n builds on LangChain.

    [:octicons-arrow-right-24: LangChain in n8n](/advanced-ai/langchain/overview.md)

-   __Browse AI templates__

    Explore a wide range of AI workflow templates on the n8n website.

    [:octicons-arrow-right-24: AI workflows on n8n.io](https://n8n.io/workflows/?categories=25)

</div>

## Related resources

Related documentation and tools.

### Node types

This feature uses [Cluster nodes](/integrations/builtin/cluster-nodes/index.md): groups of [root](/integrations/builtin/cluster-nodes/root-nodes/index.md) and [sub](/integrations/builtin/cluster-nodes/sub-nodes/index.md) nodes that work together.

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

### Workflow templates

You can browse [workflow templates](/glossary.md#template-n8n) in-app or on the n8n website [Workflows](https://n8n.io/workflows/?categories=25,26) page.

Refer to [Templates](/workflows/templates.md) for information on accessing templates in-app.

### Chat trigger

Use the [n8n Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) to trigger a workflow based on chat interactions.

### Chatbot widget

n8n provides a chatbot widget that you can use as a frontend for AI-powered chat workflows. Refer to the [@n8n/chat npm page](https://www.npmjs.com/package/@n8n/chat) for usage information.
