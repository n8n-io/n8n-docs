---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Ollama Model
description: Documentation for the Ollama Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Ollama Model

The Ollama Model node allows you use local Llama 2 models.

On this page, you'll find the node parameters for the Ollama Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, page) ]]

## Related resources

Refer to [LangChains's Ollama documentation](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/ollama){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
