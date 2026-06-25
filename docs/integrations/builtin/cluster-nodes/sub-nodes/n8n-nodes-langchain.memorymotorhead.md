---
title: Motorhead node documentation
description: >-
  Learn how to use the Motorhead node in n8n. Follow technical documentation to
  integrate Motorhead node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Motorhead node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead
layout:
  description:
    visible: false
---

# Motorhead node <a href="#motorhead-node" id="motorhead-node"></a>

{% hint style="warning" %}
**Deprecated**

The Motorhead project is no longer maintained. This node is deprecated, and will be removed in a future version.
{% endhint %}

Use the Motorhead node to use Motorhead as a memory[^1] server.

On this page, you'll find a list of operations the Motorhead node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/motorhead.md).
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Session ID**: Enter the ID to use to store the memory in the workflow data.

## Node reference <a href="#node-reference" id="node-reference"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Motorhead node documentation integration templates](https://n8n.io/integrations/motorhead) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Motorhead documentation](https://js.langchain.com/docs/integrations/memory/motorhead_memory) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Single memory instance <a href="#single-memory-instance" id="single-memory-instance"></a>

If you add more than one Motorhead node to your workflow, all nodes access the same memory instance by default. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](./n8n-nodes-langchain.memorymanager.md) node. If you want more than one memory instance in your workflow, set different session IDs in different memory nodes.

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
