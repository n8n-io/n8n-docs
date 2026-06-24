---
title: Groq Chat Model node documentation
description: >-
  Learn how to use the Groq Chat Model node in n8n. Follow technical
  documentation to integrate Groq Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Groq Chat Model node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq
layout:
  description:
    visible: false
---

# Groq Chat Model node <a href="#groq-chat-model-node" id="groq-chat-model-node"></a>

Use the Groq Chat Model node to access Groq's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Groq Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/groq.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model which will generate the completion. n8n dynamically loads available models from the Groq API. Learn more in the [Groq model documentation](https://console.groq.com/docs/models).

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Groq Chat Model node documentation integration templates](https://n8n.io/integrations/groq-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Groq's API documentation](https://console.groq.com/docs/quickstart) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

