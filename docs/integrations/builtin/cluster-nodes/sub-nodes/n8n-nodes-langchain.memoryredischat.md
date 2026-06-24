---
title: Redis Chat Memory node documentation
description: >-
  Learn how to use the Redis Chat Memory node in n8n. Follow technical
  documentation to integrate Redis Chat Memory node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Redis Chat Memory node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat
layout:
  description:
    visible: false
---

# Redis Chat Memory node <a href="#redis-chat-memory-node" id="redis-chat-memory-node"></a>

Use the Redis Chat Memory node to use Redis as a memory[^1] server.

On this page, you'll find a list of operations the Redis Chat Memory node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/redis.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Session Time To Live**: Use this parameter to make the session expire after a given number of seconds.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Redis Chat Memory node documentation integration templates](https://n8n.io/integrations/redis-chat-memory) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Redis Chat Memory documentation](https://js.langchain.com/docs/integrations/memory/redis) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Single memory instance <a href="#single-memory-instance" id="single-memory-instance"></a>

If you add more than one Redis Chat Memory node to your workflow, all nodes access the same memory instance by default. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](./n8n-nodes-langchain.memorymanager.md) node. If you want more than one memory instance in your workflow, set different session IDs in different memory nodes.

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
