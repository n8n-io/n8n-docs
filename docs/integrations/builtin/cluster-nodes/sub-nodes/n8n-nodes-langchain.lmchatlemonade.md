---
title: Lemonade Chat Model node documentation
description: >-
  Learn how to use the Lemonade Chat Model node in n8n. Follow technical
  documentation to integrate Lemonade Chat Model node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Lemonade Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatlemonade.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatlemonade
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatlemonade
layout:
  description:
    visible: false
---

# Lemonade Chat Model node <a href="#lemonade-chat-model-node" id="lemonade-chat-model-node"></a>

Use the Lemonade Chat Model node to run chat-capable language models managed by a Lemonade server from within n8n. This node functions as a LangChain-compatible chat model root node and is suitable for chat-style workloads. It lets you select a model hosted on your Lemonade server, and control generation behavior using common sampling and decoding options.

On this page, you'll find a list of the node parameters, and available options to refine generation.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/lemonade.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Model <a href="#model" id="model"></a>
The model which will generate the completion. Models are loaded and managed through the Lemonade server. This parameter is required. Select the model name made available by your Lemonade server (for example, a model alias like "gpt-4", or any custom model name exposed by Lemonade).

Models are provided by the Lemonade server; if you don't see the model you expect, verify your Lemonade server configuration and credentials.

## Node options <a href="#node-options" id="node-options"></a>

Use these options to further refine the node's behavior.

### Sampling Temperature <a href="#sampling-temperature" id="sampling-temperature"></a>

Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0.7 |

### Top P <a href="#top-p" id="top-p"></a>

Controls which words the model can choose from when generating text. Lower values progressively remove the least likely options, so the model can only pick from a smaller, higher-confidence pool.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 1 |

### Frequency Penalty <a href="#frequency-penalty" id="frequency-penalty"></a>

Adjusts the penalty for tokens that have already appeared in the generated text. Positive values discourage repetition, negative values encourage it.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0 |

### Presence Penalty <a href="#presence-penalty" id="presence-penalty"></a>

Adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0 |

### Max Tokens to Generate <a href="#max-tokens-to-generate" id="max-tokens-to-generate"></a>

The maximum number of tokens to generate. Set to -1 for no limit. Be cautious when setting this to a large value, as it can lead to long outputs.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | -1 |

### Stop Sequences <a href="#stop-sequences" id="stop-sequences"></a>

Comma-separated list of sequences where the model will stop generating text. Use this to define explicit termination strings for responses.

| Property | Value |
|----------|-------|
| Type | string |
| Required | no |
| Default | "" |

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Lemonade Chat Model node documentation integration templates](https://n8n.io/integrations/lemonade-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Lemonade Server's documentation](https://lemonade-server.ai/docs/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

