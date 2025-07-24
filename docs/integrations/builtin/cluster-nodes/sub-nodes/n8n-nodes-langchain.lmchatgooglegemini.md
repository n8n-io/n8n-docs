---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Gemini Chat Model node documentation
description: Learn how to use the Google Gemini Chat Model node in n8n. Follow technical documentation to integrate Google Gemini Chat Model node into your workflows.
contentType: [integration, reference]
priority: high
---

# Google Gemini Chat Model node

Use the Google Gemini Chat Model node to use Google's Gemini chat models with conversational agents.

On this page, you'll find the node parameters for the Google Gemini Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/googleai.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the completion.

n8n dynamically loads models from the Google Gemini API and you'll only see the models available to your account.

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Safety Settings**: Gemini supports adjustable safety settings. Refer to Google's [Gemini API safety settings](https://ai.google.dev/docs/safety_setting_gemini){:target=_blank .external-link} for information on the available filters and levels.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-gemini-chat-model') ]]

## Related resources

Refer to [LangChain's Google Gemini documentation](https://js.langchain.com/docs/integrations/chat/google_generativeai){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
