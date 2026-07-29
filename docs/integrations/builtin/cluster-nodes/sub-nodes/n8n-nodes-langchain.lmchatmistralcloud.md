---
title: Mistral Cloud Chat Model node documentation
description: >-
  Learn how to use the Mistral Cloud Chat Model node in n8n. Follow technical
  documentation to integrate Mistral Cloud Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Mistral Cloud Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud
layout:
  description:
    visible: false
---

# Mistral Cloud Chat Model node <a href="#mistral-cloud-chat-model-node" id="mistral-cloud-chat-model-node"></a>

Use the Mistral Cloud Chat Model node to combine Mistral Cloud's chat models with conversational agents[^1].

On this page, you'll find the node parameters for the Mistral Cloud Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/mistral.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the completion. n8n dynamically loads models from Mistral Cloud and you'll only see the models available to your account.

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Enable Safe Mode**: Enable safe mode by injecting a safety prompt at the beginning of the completion. This helps prevent the model from generating offensive content.
* **Random Seed**: Enter a seed to use for random sampling. If set, different calls will generate deterministic results.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Mistral Cloud Chat Model node documentation integration templates](https://n8n.io/integrations/mistral-cloud-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Mistral documentation](https://js.langchain.com/docs/integrations/chat/mistral) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
