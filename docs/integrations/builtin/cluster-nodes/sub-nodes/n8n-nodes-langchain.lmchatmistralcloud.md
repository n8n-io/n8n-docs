---
title: Mistral Cloud Chat Model
description: Documentation for the Mistral Cloud Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Mistral Cloud Chat Model

Use the Mistral Cloud Chat Model node to use Mistral Cloud's chat models with conversational agents.

On this page, you'll find the node parameters for the Mistral Cloud Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/mistral/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Mistral Cloud Chat Model integrations](https://n8n.io/integrations/mistral-chat-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the completion. n8n dynamically loads models from Mistral Cloud and you will only see the models available to your account.

## Node options

* **Maximum Number of Tokens**: the completion length, in characters.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: maximum request time in milliseconds.
* **Max Retries**: maximum number of times to retry a request.
* **Top P**: use a lower value to ignore less probable options. 
* **Enable Safe Mode**: enable safe mode by injecting a safety prompt at the beginning of the completion. This helps prevent the model from generating offensive content.
* **Random Seed**: seed to use for random sampling. If set, different calls will generate deterministic results.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/mistral-chat-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Mistral documentation](https://js.langchain.com/docs/integrations/chat/mistral){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
