---
title: Ollama Chat Model node documentation
description: Learn how to use the Ollama Chat Model node in n8n. Follow technical documentation to integrate Ollama Chat Model node into your workflows.
contentType: [integration, reference]
priority: high
---

# Ollama Chat Model node

The Ollama Chat Model node allows you use local Llama 2 models with conversational [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the Ollama Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model that generates the completion. Choose from:
	* **Llama2**
	* **Llama2 13B**
	* **Llama2 70B**
	* **Llama2 Uncensored**

Refer to the Ollama [Models Library documentation](https://ollama.com/library) for more information about available models.

## Node options

* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'ollama-chat-model') ]]

## Related resources

Refer to [LangChains's Ollama Chat Model documentation](https://js.langchain.com/docs/integrations/chat/ollama/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/common-issues.md).



--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"
