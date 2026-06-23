---
title: Ollama Model node documentation
description: >-
  Learn how to use the Ollama Model node in n8n. Follow technical documentation
  to integrate Ollama Model node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-langchain.lmollama
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama
layout:
  description:
    visible: false
---

# Ollama Model node <a href="#ollama-model-node" id="ollama-model-node"></a>

The Ollama Model node allows you use local Llama 2 models.

On this page, you'll find the node parameters for the Ollama Model node, and links to more resources.

This node lacks tools support, so it won't work with the [AI Agent](../../root-nodes/n8n-nodes-langchain.agent/README.md) node. Instead, connect it with the [Basic LLM Chain](../../root-nodes/n8n-nodes-langchain.chainllm.md) node.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../../credentials/ollama.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model that generates the completion. Choose from:
	* **Llama2**
	* **Llama2 13B**
	* **Llama2 70B**
	* **Llama2 Uncensored**

Refer to the Ollama [Models Library documentation](https://ollama.com/library) for more information about available models.

## Node options <a href="#node-options" id="node-options"></a>

* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-langchain.lmollama integration templates](https://n8n.io/integrations/ollama-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Ollama documentation](https://js.langchain.com/docs/integrations/llms/ollama/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).



{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ou1SzleSsYddnaSSV2H2/" %}
