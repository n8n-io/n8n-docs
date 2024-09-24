---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Window Buffer Memory node documentation
description: Learn how to use the Window Buffer Memory node in n8n. Follow technical documentation to integrate Window Buffer Memory node into your workflows.
contentType: integration
priority: high
---

# Window Buffer Memory node

Use the Window Buffer Memory node to persist chat history in your workflow.

On this page, you'll find a list of operations the Window Buffer Memory node supports, and links to more resources.

/// warning | Don't use this node if running n8n in queue mode
If your n8n instance uses [queue mode](/hosting/scaling/queue-mode/), this node doesn't work in a production (active) workflow. This is because n8n can't guarantee that every call to Window Buffer Memory will go to the same worker.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

-   **Session Key**: Enter the key to use to store the memory in the workflow data.
-   **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'window-buffer-memory') ]]

## Related resources

Refer to [LangChain's Buffer Window Memory documentation](https://js.langchain.com/docs/modules/memory/types/buffer_window){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]


--8<-- "_glossary/ai-glossary.md"
