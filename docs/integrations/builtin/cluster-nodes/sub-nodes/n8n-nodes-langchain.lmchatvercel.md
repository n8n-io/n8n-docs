---
title: Vercel AI Gateway Chat Model node documentation
description: >-
  Learn how to use the Vercel AI Gateway Chat Model node in n8n. Follow
  technical documentation to integrate Vercel AI Gateway Chat Model node into
  your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Vercel AI Gateway Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatvercel.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatvercel
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatvercel
layout:
  description:
    visible: false
---

# Vercel AI Gateway Chat Model node <a href="#vercel-ai-gateway-chat-model-node" id="vercel-ai-gateway-chat-model-node"></a>

Use the Vercel AI Gateway Chat Model node to use AI Gateway chat models with conversational agents.

On this page, you'll find the node parameters for the Vercel AI Gateway Chat Model node and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/vercel.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Model <a href="#model" id="model"></a>

Select the model to use to generate the completion.

n8n dynamically loads models from the AI Gateway and you'll only see the models available to your account.

## Node options <a href="#node-options" id="node-options"></a>

Use these options to further refine the node's behavior.

### Frequency Penalty <a href="#frequency-penalty" id="frequency-penalty"></a>

Use this option to control the chance of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens <a href="#maximum-number-of-tokens" id="maximum-number-of-tokens"></a>

Enter the maximum number of tokens used, which sets the completion length.

### Response Format <a href="#response-format" id="response-format"></a>

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.

### Presence Penalty <a href="#presence-penalty" id="presence-penalty"></a>

Use this option to control the chance of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature <a href="#sampling-temperature" id="sampling-temperature"></a>

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Timeout <a href="#timeout" id="timeout"></a>

Enter the maximum request time in milliseconds.

### Max Retries <a href="#max-retries" id="max-retries"></a>

Enter the maximum number of times to retry a request.

### Top P <a href="#top-p" id="top-p"></a>

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Vercel AI Gateway Chat Model node documentation integration templates](https://n8n.io/integrations/vercel-ai-gateway-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

As the Vercel AI Gateway is API-compatible with OpenAI, you can refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}


