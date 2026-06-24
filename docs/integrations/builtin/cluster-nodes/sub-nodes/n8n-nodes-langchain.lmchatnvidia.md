---
title: NVIDIA Nemotron Chat Model node documentation
description: >-
  Learn how to use the NVIDIA Nemotron Chat Model node in n8n. Follow technical
  documentation to integrate NVIDIA Nemotron Chat Model node into your
  workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: NVIDIA Nemotron Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatnvidia.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatnvidia
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatnvidia
layout:
  description:
    visible: false
---

# NVIDIA Nemotron Chat Model node <a href="#nvidia-nemotron-chat-model-node" id="nvidia-nemotron-chat-model-node"></a>

Use the NVIDIA Nemotron Chat Model node to access [NVIDIA Nemotron](https://build.nvidia.com/models) models with conversational [agents](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent). The node works with Nemotron models hosted on [build.nvidia.com](https://build.nvidia.com/) and with self-hosted NVIDIA Inference Microservices (NIM).

On this page, you'll find the node parameters for the NVIDIA Nemotron Chat Model node and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/nvidia.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Model <a href="#model" id="model"></a>

Select the Nemotron model to use to generate the completion.

n8n dynamically loads Nemotron models from the endpoint configured in your credential. If n8n can't reach the endpoint, it falls back to a curated list of well-known Nemotron model IDs.

## Node options <a href="#node-options" id="node-options"></a>

Use these options to further refine the node's behavior.

### Frequency Penalty <a href="#frequency-penalty" id="frequency-penalty"></a>

Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens <a href="#maximum-number-of-tokens" id="maximum-number-of-tokens"></a>

Enter the maximum number of tokens used, which sets the completion length. Use `-1` for the model default.

### Response Format <a href="#response-format" id="response-format"></a>

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON. When you choose **JSON**, include the word `json` in your prompt in the chain or agent.

### Presence Penalty <a href="#presence-penalty" id="presence-penalty"></a>

Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature <a href="#sampling-temperature" id="sampling-temperature"></a>

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Timeout <a href="#timeout" id="timeout"></a>

Enter the maximum request time in milliseconds.

### Max Retries <a href="#max-retries" id="max-retries"></a>

Enter the maximum number of times to retry a request.

### Top P <a href="#top-p" id="top-p"></a>

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse NVIDIA Nemotron Chat Model node documentation integration templates](https://n8n.io/integrations/nvidia-nemotron-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [NVIDIA's build catalogue](https://build.nvidia.com/models) for the list of Nemotron models and to the [NIM documentation](https://docs.nvidia.com/nim/) for guidance on self-hosting. As the NVIDIA API is OpenAI-spec compatible, you can refer to [LangChain's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the underlying client.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}
