---
title: Lemonade Model node documentation
description: Learn how to use the Lemonade Model node in n8n. Follow technical documentation to integrate Lemonade Model node into your workflows.
contentType: [integration, reference]
---

# Lemonade Model node

Use the Lemonade Model node to generate text completions using language models hosted and managed by a Lemonade server. This node is a simple LangChain-compatible language model root node suitable for text completion tasks within n8n workflows.

On this page, you'll find a list of operations the Lemonade Model node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/lemonade.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

Configure the node with the following parameters.

### Model

The model which will generate the completion. Models are loaded and managed through the Lemonade server; select the model you want to use from the list provided by the node.

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

Controls which words the model can choose from when generating text. Lower values progressively remove the least likely options, so the model can only pick from a smaller, higher-confidence pool.

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

Comma-separated list of sequences where the model will stop generating text.

| Property | Value |
|----------|-------|
| Type | string |
| Required | no |
| Default | "" |

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'lemonade-model') ]]

## Related resources

Refer to [Lemonade Server's documentation](https://lemonade-server.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

