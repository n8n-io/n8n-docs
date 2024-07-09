---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Vertex Chat Model
description: Documentation for the Google Vertex Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Google Vertex Chat Model

Use the Google Vertex AI Chat Model node to use Google's Vertex AI chat models with conversational agents.

On this page, you'll find the node parameters for the Google Vertex AI Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/service-account/).
///

## Node parameters

**Project ID**: the project ID from your Google Cloud account to use. n8n dynamically loads projects from the Google Cloud account, but you can also specify it manually.

**Model Name**: the name of the model to use to generate the completion, for example `gemini-1.5-flash-001`, `gemini-1.5-pro-001`, etc. You can find the list of available models [here](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models){:target=_blank .external-link}.

## Node options

* **Maximum Number of Tokens**: change the maximum possible length of the completion.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options.
* **Safety Settings**: Gemini supports adjustable safety settings. Refer to Google's [Gemini API safety settings](https://ai.google.dev/docs/safety_setting_gemini){:target=_blank .external-link} for information on the available filters and levels.


## Related resources


Refer to [LangChain's Google Vertex AI documentation](https://js.langchain.com/v0.2/docs/integrations/chat/google_vertex_ai/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
