---
title: Anthropic Chat Model node documentation
description: >-
  Learn how to use the Anthropic Chat Model node in n8n. Follow technical
  documentation to integrate Anthropic Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Anthropic Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic
layout:
  description:
    visible: false
---

# Anthropic Chat Model node <a href="#anthropic-chat-model-node" id="anthropic-chat-model-node"></a>

{% hint style="info" %}
On n8n Cloud, you can use the Anthropic Chat Model node with [Gateway credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits) instead of your own Anthropic API key. Select **Use Gateway credits** in the node's credential field to run the node without an Anthropic account.
{% endhint %}

Use the Anthropic Chat Model node to use Anthropic's Claude family of chat models with conversational agents[^1].

On this page, you'll find the node parameters for the Anthropic Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/anthropic.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model that generates the completion. Choose from:
	* **Claude**
	* **Claude Instant**

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Prompt Caching**: Cache the system prompt, tool definitions, and conversation history between requests using [Anthropic prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching). Choose **Disabled** (the default), **5 Minutes**, or **1 Hour**. The value sets how long cached content stays valid before it has to be written again.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Anthropic Chat Model node documentation integration templates](https://n8n.io/integrations/anthropic-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Anthropic documentation](https://js.langchain.com/docs/integrations/chat/anthropic/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
