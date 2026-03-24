---
title: Lemonade Chat Model node documentation
description: Learn how to use the Lemonade Chat Model node in n8n. Follow technical documentation to integrate Lemonade Chat Model node into your workflows.
contentType: [integration, reference]
---

# Lemonade Chat Model node

Use the Lemonade Chat Model node to run chat-capable language models managed by a Lemonade server from within n8n. This node functions as a LangChain-compatible chat model root node and is suitable for chat-style workloads. It lets you select a model hosted on your Lemonade server, and control generation behavior using common sampling and decoding options.

On this page, you'll find a list of the node parameters, and available options to refine generation.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/TODO.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model
The model which will generate the completion. Models are loaded and managed through the Lemonade server. This parameter is required. Select the model name made available by your Lemonade server (for example, a model alias like "gpt-4", or any custom model name exposed by Lemonade).

Models are provided by the Lemonade server; if you don't see the model you expect, verify your Lemonade server configuration and credentials.

## Node options

Use these options to further refine the node's behavior.

### Sampling Temperature

Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0.7 |

### Top P

Chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 1 |

### Frequency Penalty

Adjusts the penalty for tokens that have already appeared in the generated text. Positive values discourage repetition, negative values encourage it.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0 |

### Presence Penalty

Adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | 0 |

### Max Tokens to Generate

The maximum number of tokens to generate. Set to -1 for no limit. Be cautious when setting this to a large value, as it can lead to very long outputs.

| Property | Value |
|----------|-------|
| Type | number |
| Required | no |
| Default | -1 |

### Stop Sequences

Comma-separated list of sequences where the model will stop generating text. Use this to define explicit termination strings for responses.

| Property | Value |
|----------|-------|
| Type | string |
| Required | no |
| Default | "" |

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'lemonade-chat-model') ]]

## Related resources

Refer to [Lemonade Server's documentation](https://lemonade-server.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

