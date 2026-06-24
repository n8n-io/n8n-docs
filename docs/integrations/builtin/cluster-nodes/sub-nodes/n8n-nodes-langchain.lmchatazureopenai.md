---
title: Azure OpenAI Chat Model node documentation
description: >-
  Learn how to use the Azure OpenAI Chat Model node in n8n. Follow technical
  documentation to integrate Azure OpenAI Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Azure OpenAI Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai
layout:
  description:
    visible: false
---

# Azure OpenAI Chat Model node <a href="#azure-openai-chat-model-node" id="azure-openai-chat-model-node"></a>

Use the Azure OpenAI Chat Model node to use OpenAI's chat models with conversational agents[^1].

On this page, you'll find the node parameters for the Azure OpenAI Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/azureopenai.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the completion.

## Node options <a href="#node-options" id="node-options"></a>

* **Frequency Penalty**: Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.
* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Response Format**: Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.
* **Presence Penalty**: Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 

## Proxy limitations <a href="#proxy-limitations" id="proxy-limitations"></a>

This node doesn't support the [`NO_PROXY` environment variable](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Azure OpenAI Chat Model node documentation integration templates](https://n8n.io/integrations/azure-openai-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Azure OpenAI documentation](https://js.langchain.com/docs/integrations/chat/azure) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
