---
title: Moonshot Kimi Chat Model node
description: Integrate the Moonshot Kimi Chat Model into n8n workflows to generate chat responses for AI chains. Common uses include generating conversational replies, integrating with LangChain-style workflows, and tuning response behavior via temperature/top-p and token limits.
contentType: [integration, reference]
---

# Moonshot Kimi Chat Model node

Use the Moonshot Kimi Chat Model node to send chat requests to the Kimi chat API and generate conversational responses. Use it when you need an AI chat model in a workflow. For example, you can power assistants, build multi-step AI chains, or produce model-driven content with tunable sampling and token settings.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/moonshot.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Operations

### Generate chat response

Sends a chat request to the selected Kimi model and returns the model's response.

**Parameters**

- **Model** (type: options, field: `model`): The model that generates the completion. Default: `kimi-k2.5`. Learn more at [Moonshot Kimi Chat API docs](https://platform.kimi.ai/docs/api/chat){:target="_blank" .external-link}.

**Options**

- **Frequency Penalty** (type: number, field: `frequencyPenalty`): Positive values penalize new tokens based on their existing frequency, so the model repeats less. Default: `0`.
- **Maximum number of tokens** (type: number, field: `maxTokens`): The maximum number of tokens to generate in the completion. A value of -1 uses the model default. The token limit depends on the selected model. Default: `-1`.
- **Response format** (type: options, field: `responseFormat`): Format of the model response. Default: `text`.
- **Presence penalty** (type: number, field: `presencePenalty`): Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. Default: `0`.
- **Sampling temperature** (type: number, field: `temperature`): Controls randomness. Lower values make outputs less random; near zero the model becomes more deterministic. Default: `0.7`.
- **Timeout** (type: number, field: `timeout`): Maximum time a request can take, in milliseconds. Default: 360000 (six minutes).
- **Max retries** (type: number, field: `maxRetries`): Maximum number of retries to attempt for failed requests. Default: two.
- **Top P** (type: number, field: `topP`): Nucleus sampling parameter controlling diversity. A value of zero point five means the model considers half of the likelihood-weighted options. We recommend changing either **Top P** or **Sampling Temperature**, don't change both. Default: `1`.

## Templates and examples

[[ templatesWidget(page.title, 'moonshot-kimi-chat-model') ]]

## Related resources

Refer to [Moonshot Kimi Chat Model's documentation](https://platform.kimi.ai/docs/api/chat){:target="_blank" .external-link} for more information about the service and available model options.