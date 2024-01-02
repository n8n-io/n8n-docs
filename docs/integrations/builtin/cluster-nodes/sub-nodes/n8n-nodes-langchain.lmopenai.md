---
title: OpenAI Model
description: Documentation for the OpenAI Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# OpenAI Model

Use the OpenAI Model node to use OpenAI Model's models.

On this page, you'll find the node parameters for the OpenAI Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openai/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [OpenAI Model integrations](https://n8n.io/integrations/openai-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the completion. n8n dynamically loads models from OpenAI and you will only see the models available to your account.

## Node options

* **Base URL**: override the default URL for the API.
* **Frequency Penalty**: increase this to reduce the chance of the model repeating itself.
* **Maximum Number of Tokens**: the completion length, in characters.
* **Response Format**: choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.
* **Presence Penalty**: increase this to increase the chance of the model talking about new topics.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Timeout**: maximum request time in milliseconds.
* **Max Retries**: maximum number of times to retry a request.
* **Top P**: use a lower value to ignore less probable options. 

## Related resources

View [example workflows and related content](https://n8n.io/integrations/openai-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/openai){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
