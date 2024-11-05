---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Redis Chat Memory node documentation
description: Learn how to use the Redis Chat Memory node in n8n. Follow technical documentation to integrate Redis Chat Memory node into your workflows.
contentType: integration
priority: medium
---

# Redis Chat Memory node

Use the Redis Chat Memory node to use Redis as a memory server.

On this page, you'll find a list of operations the Redis Chat Memory node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/redis/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Session Time To Live**: Use this parameter to make the session expire after a given number of seconds.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'redis-chat-memory') ]]

## Related resources

Refer to [LangChain's Redis Chat Memory documentation](https://js.langchain.com/docs/integrations/memory/redis){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]

--8<-- "_glossary/ai-glossary.md"
