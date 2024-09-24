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

## Common issues

Here are some common errors and issues and steps to resolve or troubleshoot them.

### Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]

### Managing the Session ID

In most cases, the `sessionId` is automatically retrieved from the **On Chat Message** trigger. But you may run into an error with the phrase `No sessionId`.

If you have this error, first check the output of your Chat trigger to ensure it includes a `sessionId`.

If you're not using the **On Chat Message** trigger, you'll need to manage sessions manually.

For testing purposes, you can use a static key like `my_test_session`. If you use this approach, be sure to set up proper session management before activating the workflow to avoid potential issues in a live environment.

--8<-- "_glossary/ai-glossary.md"
