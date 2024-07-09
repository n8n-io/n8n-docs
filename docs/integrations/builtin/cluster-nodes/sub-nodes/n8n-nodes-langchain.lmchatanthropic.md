---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Anthropic Chat Model
description: Documentation for the Anthropic Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Anthropic Chat Model

Use the Anthropic Chat Model node to use Anthropic's Claude family of chat models with conversational agents.

On this page, you'll find the node parameters for the Anthropic Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/anthropic/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: the model that generates the completion. Learn more in the [Anthropic model documentation](https://docs.anthropic.com/claude/reference/selecting-a-model){:target=_blank .external-link}. 
	Available models:
	* Claude
	* Claude Instant

## Node options

* **Maximum Number of Tokens**: the completion length.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options. 

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'anthropic-chat-model') ]]

## Related resources

Refer to [LangChains's Anthropic documentation](https://js.langchain.com/docs/modules/model_io/models/chat/integrations/anthropic){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
