---
title: Google Vertex Chat Model node documentation
description: Learn how to use the Google Vertex Chat Model node in n8n. Follow technical documentation to integrate Google Vertex Chat Model node into your workflows.
contentType: [integration, reference]
---

# Google Vertex Chat Model node

Use the Google Vertex AI Chat Model node to use Google's Vertex AI chat models with conversational [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the Google Vertex AI Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/service-account.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Project ID**: Select the project ID from your Google Cloud account to use. n8n dynamically loads projects from the Google Cloud account, but you can also enter it manually.
* **Model Name**: Select the name of the model to use to generate the completion, for example `gemini-1.5-flash-001`, `gemini-1.5-pro-001`, etc. Refer to [Google models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) for a list of available models.

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: Enter the number of token choices the model uses to generate the next token.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. 
* **Safety Settings**: Gemini supports adjustable safety settings. Refer to Google's [Gemini API safety settings](https://ai.google.dev/docs/safety_setting_gemini) for information on the available filters and levels.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-vertex-chat-model') ]]

## Related resources


Refer to [LangChain's Google Vertex AI documentation](https://js.langchain.com/docs/integrations/chat/google_vertex_ai/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

