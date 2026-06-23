---
title: Hugging Face Inference Model node documentation
description: >-
  Learn how to use the Hugging Face Inference Model node in n8n. Follow
  technical documentation to integrate Hugging Face Inference Model node into
  your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Hugging Face Inference Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference
layout:
  description:
    visible: false
---

# Hugging Face Inference Model node <a href="#hugging-face-inference-model-node" id="hugging-face-inference-model-node"></a>

Use the Hugging Face Inference Model node to use Hugging Face's models.

On this page, you'll find the node parameters for the Hugging Face Inference Model node, and links to more resources.

This node lacks tools support, so it won't work with the [AI Agent](../root-nodes/n8n-nodes-langchain.agent/README.md) node. Instead, connect it with the [Basic LLM Chain](../root-nodes/n8n-nodes-langchain.chainllm.md) node.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/huggingface.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the completion.

## Node options <a href="#node-options" id="node-options"></a>

* **Custom Inference Endpoint**: Enter a custom inference endpoint URL.
* **Frequency Penalty**: Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.
* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Presence Penalty**: Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Hugging Face Inference Model node documentation integration templates](https://n8n.io/integrations/hugging-face-inference-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Hugging Face Inference Model documentation](https://js.langchain.com/docs/integrations/llms/huggingface_inference/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

