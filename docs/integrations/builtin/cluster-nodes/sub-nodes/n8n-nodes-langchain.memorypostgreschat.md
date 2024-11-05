---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Postgres Chat Memory node documentation
description: Learn how to use the Postgres Chat Memory node in n8n. Follow technical documentation to integrate Postgres Chat Memory node into your workflows.
contentType: integration
---

# Postgres Chat Memory node

Use the Postgres Chat Memory node to use Postgres as a memory server for storing chat history.

On this page, you'll find a list of operations the Postgres Chat Memory node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/postgres/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Table Name**: Enter the name of the table to store the chat history in. The system will create the table if doesn't exist.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Related resources

Refer to [LangChain's Postgres Chat Message History documentation](https://js.langchain.com/docs/integrations/memory/postgres){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]

--8<-- "_glossary/ai-glossary.md"
