---
title: Zep node documentation
description: Learn how to use the Zep node in n8n. Follow technical documentation to integrate Zep node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Zep node

/// warning | Deprecated
This node is deprecated, and will be removed in a future version. 
///

Use the Zep node to use Zep as a [memory](/glossary.md#ai-memory) server.

On this page, you'll find a list of operations the Zep node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/zep.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Session ID**: Enter the ID to use to store the memory in the workflow data.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'zep') ]]

## Related resources

Refer to [LangChain's Zep documentation](https://js.langchain.com/docs/integrations/memory/zep_memory) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]


