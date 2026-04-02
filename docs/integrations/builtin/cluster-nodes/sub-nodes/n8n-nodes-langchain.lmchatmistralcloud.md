---
title: Mistral Cloud Chat Model node documentation
description: Learn how to use the Mistral Cloud Chat Model node in n8n. Follow technical documentation to integrate Mistral Cloud Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Mistral Cloud Chat Model node

Use the Mistral Cloud Chat Model node to combine Mistral Cloud's chat models with conversational [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the Mistral Cloud Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/mistral.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the completion. n8n dynamically loads models from Mistral Cloud and you'll only see the models available to your account.

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Enable Safe Mode**: Enable safe mode by injecting a safety prompt at the beginning of the completion. This helps prevent the model from generating offensive content.
* **Random Seed**: Enter a seed to use for random sampling. If set, different calls will generate deterministic results.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mistral-cloud-chat-model') ]]

## Related resources

Refer to [LangChains's Mistral documentation](https://js.langchain.com/docs/integrations/chat/mistral) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

