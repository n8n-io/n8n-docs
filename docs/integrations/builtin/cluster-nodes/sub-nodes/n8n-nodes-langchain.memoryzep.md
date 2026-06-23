---
title: Zep node documentation
description: >-
  Learn how to use the Zep node in n8n. Follow technical documentation to
  integrate Zep node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Zep node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep
layout:
  description:
    visible: false
---

# Zep node <a href="#zep-node" id="zep-node"></a>

{% hint style="warning" %}
**Deprecated**

This node is deprecated, and will be removed in a future version.
{% endhint %}

Use the Zep node to use Zep as a [memory](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-memory) server.

On this page, you'll find a list of operations the Zep node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/zep.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Session ID**: Enter the ID to use to store the memory in the workflow data.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Zep node documentation integration templates](https://n8n.io/integrations/zep) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Zep documentation](https://js.langchain.com/docs/integrations/memory/zep_memory) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Single memory instance <a href="#single-memory-instance" id="single-memory-instance"></a>

If you add more than one Zep node to your workflow, all nodes access the same memory instance by default. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](./n8n-nodes-langchain.memorymanager.md) node. If you want more than one memory instance in your workflow, set different session IDs in different memory nodes.


