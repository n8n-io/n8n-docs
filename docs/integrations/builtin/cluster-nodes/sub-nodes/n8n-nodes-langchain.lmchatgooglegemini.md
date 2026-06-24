---
title: Google Gemini Chat Model node documentation
description: >-
  Learn how to use the Google Gemini Chat Model node in n8n. Follow technical
  documentation to integrate Google Gemini Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Google Gemini Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini
layout:
  description:
    visible: false
---

# Google Gemini Chat Model node <a href="#google-gemini-chat-model-node" id="google-gemini-chat-model-node"></a>

Use the Google Gemini Chat Model node to use Google's Gemini chat models with conversational agents.

On this page, you'll find the node parameters for the Google Gemini Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/googleai.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model to use to generate the completion.

n8n dynamically loads models from the Google Gemini API and you'll only see the models available to your account.

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Safety Settings**: Gemini supports adjustable safety settings. Refer to Google's [Gemini API safety settings](https://ai.google.dev/docs/safety_setting_gemini) for information on the available filters and levels.

## Limitations <a href="#limitations" id="limitations"></a>

### No proxy support <a href="#no-proxy-support" id="no-proxy-support"></a>

The Google Gemini Chat Model node uses Google's SDK, which doesn't support proxy configuration.

If you need to proxy your connection, as a work around, you can set up a dedicated reverse proxy for Gemini requests and change the **Host** parameter in your [Google Gemini credentials](../../credentials/googleai.md) to point to your proxy address:

![Google Gemini credentials proxy configuration](../../../.gitbook/assets/google-gemini-proxy-config.png)

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Google Gemini Chat Model node documentation integration templates](https://n8n.io/integrations/google-gemini-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Google Gemini documentation](https://js.langchain.com/docs/integrations/chat/google_generativeai) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

