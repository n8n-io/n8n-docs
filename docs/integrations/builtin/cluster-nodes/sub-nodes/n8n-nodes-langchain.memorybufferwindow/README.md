---
title: Simple Memory node documentation
description: >-
  Learn how to use the Simple Memory node in n8n. Follow technical documentation
  to integrate Simple Memory node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-langchain.memorybufferwindow
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow
layout:
  description:
    visible: false
---

# Simple Memory node <a href="#simple-memory-node" id="simple-memory-node"></a>

Use the Simple Memory node to persist[^1] chat history in your workflow.

On this page, you'll find a list of operations the Simple Memory node supports, and links to more resources.

{% hint style="warning" %}
**Don't use this node if running n8n in queue mode**

If your n8n instance uses [queue mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode), this node doesn't work in an active production workflow. This is because n8n can't guarantee that every call to Simple Memory will go to the same worker.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure these parameters to configure the node:

* **Session Key**: Enter the key to use to store the memory in the workflow data.
* **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-langchain.memorybufferwindow integration templates](https://n8n.io/integrations/window-buffer-memory) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Buffer Window Memory documentation](https://v03.api.js.langchain.com/classes/langchain.memory.BufferWindowMemory.html) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).

[^1]: In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.
