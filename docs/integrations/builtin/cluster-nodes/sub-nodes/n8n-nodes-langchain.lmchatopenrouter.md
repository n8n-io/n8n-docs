---
title: OpenRouter Chat Model
description: Documentation for the OpenRouter Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# OpenRouter Chat Model

The OpenRouter Chat Model node allows you use various models with conversational agents. OpenRouter's request and response schemas are very similar to the OpenAI Chat API. At a high level, OpenRouter normalizes the schema across models and providers so you only need to learn one.

On this page, you'll find the node parameters for the OpenRouter Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openrouter/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [OpenRouter Chat Model integrations](https://n8n.io/integrations/openrouter-chat-model/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: there are various models to choose from, including OpenAI's. For example:

* Llama3
* Mistral: Mixtral 8x22B Instruct
* WizardLM-2 8x22B

For more models, head over to [OpenRouter Models](https://openrouter.ai/models)

## Node options

* **Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/openrouter-model/){:target=_blank .external-link} on n8n's website.

Refer to [OpenRouter documentation](https://openrouter.ai/docs){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
