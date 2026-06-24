---
title: Google Vertex Chat Model node documentation
description: >-
  Learn how to use the Google Vertex Chat Model node in n8n. Follow technical
  documentation to integrate Google Vertex Chat Model node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Google Vertex Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex
layout:
  description:
    visible: false
---

# Google Vertex Chat Model node <a href="#google-vertex-chat-model-node" id="google-vertex-chat-model-node"></a>

Use the Google Vertex AI Chat Model node to use Google's Vertex AI chat models with conversational agents[^1].

On this page, you'll find the node parameters for the Google Vertex AI Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/google/service-account.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Project ID**: Select the project ID from your Google Cloud account to use. n8n dynamically loads projects from the Google Cloud account, but you can also enter it manually.
* **Model Name**: Select the name of the model to use to generate the completion, for example `gemini-1.5-flash-001`, `gemini-1.5-pro-001`, etc. Refer to [Google models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) for a list of available models.

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Thinking Budget**: Controls reasoning tokens for thinking models. Set to `0` to disable automatic thinking. Set to `-1` for dynamic thinking. Leave empty for auto mode.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.
* **Safety Settings**: Gemini supports adjustable safety settings. Refer to Google's [Gemini API safety settings](https://ai.google.dev/docs/safety_setting_gemini) for information on the available filters and levels.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Google Vertex Chat Model node documentation integration templates](https://n8n.io/integrations/google-vertex-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>


Refer to [LangChain's Google Vertex AI documentation](https://js.langchain.com/docs/integrations/chat/google_vertex_ai/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
