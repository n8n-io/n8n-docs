---
title: Ollama Chat Model
description: Documentation for the Ollama Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Ollama Chat Model

The Ollama Chat Model node allows you use local Llama 2 models with conversational agents.

On this page, you'll find the node parameters for the Ollama Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Ollama Chat Model integrations](https://n8n.io/integrations/ollama-chat-model/){:target=_blank .external-link} page.
///	

## Node parameters

* **Model**: the model that generates the completion. Choose from:
	* Llama2
	* Llama2 13B
	* Llama2 70B
	* Llama2 Uncensored

## Node options

* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options. 

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/openai-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Ollama Chat Model documentation](https://js.langchain.com/docs/modules/model_io/models/chat/integrations/ollama){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
