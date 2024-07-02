---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Groq Chat Model 
description: Documentation for the Groq Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Groq Chat Model

Use the Groq Chat Model node to access Groq's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Groq Chat Model node, and links to more resources.

/// note | Credentials 
You can find authentication information for this node [here](/integrations/builtin/credentials/groq/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: The model which will generate the completion. Learn more in the [Groq model documentation](https://console.groq.com/docs/models){:target=_blank .external-link}. Available models are loaded dynamically from the Groq API.

## Node options

* **Maximum Number of Tokens**: the maximum number of tokens to generate in the completion.
* **Sampling Temperature**: controls randomness. Lowering the value results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Valid range is 0 to 1.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, slug) ]]

## Related resources

Refer to [Groq's API documentation](https://console.groq.com/docs/quickstart){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
