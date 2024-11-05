---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Anthropic Chat Model node documentation
description: Learn how to use the Anthropic Chat Model node in n8n. Follow technical documentation to integrate Anthropic Chat Model node into your workflows.
contentType: integration
priority: medium
---

# Anthropic Chat Model node

Use the Anthropic Chat Model node to use Anthropic's Claude family of chat models with conversational agents.

On this page, you'll find the node parameters for the Anthropic Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/anthropic/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model that generates the completion. Choose from:
	* **Claude**
	* **Claude Instant**

Learn more in the [Anthropic model documentation](https://docs.anthropic.com/claude/reference/selecting-a-model){:target=_blank .external-link}.

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'anthropic-chat-model') ]]

## Related resources

Refer to [LangChains's Anthropic documentation](https://js.langchain.com/docs/integrations/chat/anthropic/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
