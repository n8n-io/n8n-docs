---
title: Simple Memory node documentation
description: Learn how to use the Simple Memory node in n8n. Follow technical documentation to integrate Simple Memory node into your workflows.
contentType: [integration, reference]
priority: high
---

# Simple Memory node

Use the Simple Memory node to [persist](/glossary.md#ai-memory) chat history in your workflow.

On this page, you'll find a list of operations the Simple Memory node supports, and links to more resources.

/// warning | Don't use this node if running n8n in queue mode
If your n8n instance uses [queue mode](/hosting/scaling/queue-mode.md), this node doesn't work in an active production workflow. This is because n8n can't guarantee that every call to Simple Memory will go to the same worker.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

Configure these parameters to configure the node:

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'window-buffer-memory') ]]

## Related resources

Refer to [LangChain's Buffer Window Memory documentation](https://v03.api.js.langchain.com/classes/langchain.memory.BufferWindowMemory.html) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/common-issues.md).


