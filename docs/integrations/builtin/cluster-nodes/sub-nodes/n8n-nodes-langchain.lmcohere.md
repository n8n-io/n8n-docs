---
title: Cohere Model node documentation
description: >-
  Learn how to use the Cohere Model node in n8n. Follow technical documentation
  to integrate Cohere Model node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Cohere Model node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmcohere.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmcohere
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmcohere
layout:
  description:
    visible: false
---

# Cohere Model node <a href="#cohere-model-node" id="cohere-model-node"></a>

Use the Cohere Model node to use Cohere's models.

On this page, you'll find the node parameters for the Cohere Model node, and links to more resources.

This node lacks tools support, so it won't work with the [AI Agent](../root-nodes/n8n-nodes-langchain.agent/README.md) node. Instead, connect it with the [Basic LLM Chain](../root-nodes/n8n-nodes-langchain.chainllm.md) node.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/cohere.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node Options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Cohere Model node documentation integration templates](https://n8n.io/integrations/cohere-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Cohere documentation](https://js.langchain.com/docs/integrations/llms/cohere/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

