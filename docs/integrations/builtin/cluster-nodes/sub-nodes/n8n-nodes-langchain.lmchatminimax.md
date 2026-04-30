---
title: MiniMax Chat Model node documentation
description: Learn how to use the MiniMax Chat Model node in n8n. Follow technical documentation to integrate MiniMax Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# MiniMax Chat Model node

Use the MiniMax Chat Model node to use MiniMax's chat models with conversational [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the MiniMax Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/minimax.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model that generates the completion. Refer to [MiniMax's model documentation](https://platform.minimax.io/docs/guides/models-intro){:target="_blank" .external-link} for the available models.

## Node options

* **Hide Thinking**: When turned on (default), the node strips `<think>` tags from the model's response. Turn this off to include the model's reasoning in the output.
* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'minimax-chat-model') ]]

## Related resources

Refer to [MiniMax's documentation](https://platform.minimax.io/docs/guides/models-intro){:target="_blank" .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
