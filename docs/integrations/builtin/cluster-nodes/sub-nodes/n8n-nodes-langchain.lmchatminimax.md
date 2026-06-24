---
title: MiniMax Chat Model node documentation
description: >-
  Learn how to use the MiniMax Chat Model node in n8n. Follow technical
  documentation to integrate MiniMax Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: MiniMax Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatminimax.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatminimax
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatminimax
layout:
  description:
    visible: false
---

# MiniMax Chat Model node <a href="#minimax-chat-model-node" id="minimax-chat-model-node"></a>

Use the MiniMax Chat Model node to use MiniMax's chat models with conversational [agents](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent).

On this page, you'll find the node parameters for the MiniMax Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/minimax.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model that generates the completion. Refer to [MiniMax's model documentation](https://platform.minimax.io/docs/guides/models-intro) for the available models.

## Node options <a href="#node-options" id="node-options"></a>

* **Hide Thinking**: When turned on (default), the node strips `<think>` tags from the model's response. Turn this off to include the model's reasoning in the output.
* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse MiniMax Chat Model node documentation integration templates](https://n8n.io/integrations/minimax-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [MiniMax's documentation](https://platform.minimax.io/docs/guides/models-intro) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}
