---
title: MongoDB Chat Memory node documentation
description: Learn how to use the MongoDB Chat Memory node in n8n. Follow technical documentation to integrate MongoDB Chat Memory node into your workflows.
contentType: [integration, reference]
---

# MongoDB Chat Memory node

Use the MongoDB Chat Memory node to use MongoDB as a [memory](/glossary.md#ai-memory) server for storing chat history.

On this page, you'll find a list of operations the MongoDB Chat Memory node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/mongodb.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Collection Name**: Enter the name of the collection to store the chat history in. The system will create the collection if it doesn't exist.
* **Database Name**: Enter the name of the database to store the chat history in. If not provided, the database from credentials will be used.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Related resources

Refer to [LangChain's MongoDB Chat Message History documentation](https://js.langchain.com/docs/integrations/memory/mongodb) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]


