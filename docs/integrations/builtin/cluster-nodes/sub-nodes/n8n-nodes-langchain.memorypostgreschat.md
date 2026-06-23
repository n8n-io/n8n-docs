---
title: Postgres Chat Memory node documentation
description: >-
  Learn how to use the Postgres Chat Memory node in n8n. Follow technical
  documentation to integrate Postgres Chat Memory node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Postgres Chat Memory node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat
layout:
  description:
    visible: false
---

# Postgres Chat Memory node <a href="#postgres-chat-memory-node" id="postgres-chat-memory-node"></a>

Use the Postgres Chat Memory node to use Postgres as a [memory](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-memory) server for storing chat history.

On this page, you'll find a list of operations the Postgres Chat Memory node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/postgres.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Table Name**: Enter the name of the table to store the chat history in. The system will create the table if doesn't exist.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Postgres Chat Message History documentation](https://js.langchain.com/docs/integrations/memory/postgres) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Single memory instance <a href="#single-memory-instance" id="single-memory-instance"></a>

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]


