---
title: Google Gemini(PaLM) credentials
description: Documentation for the Google Gemini(PaLM) credentials. Use these credentials to authenticate Google Gemini and Google PaLM AI nodes in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Google Gemini(PaLM) credentials

You can use these credentials to authenticate the following nodes:

* [Embeddings Google Gemini](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglegemini.md)
* [Google Gemini](/integrations/builtin/app-nodes/n8n-nodes-langchain.googlegemini.md)
* [Google Gemini Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini.md)
* [Embeddings Google PaLM](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm.md)

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/) account.
* Create a [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project).

## Supported authentication methods

- Gemini(PaLM) API key

## Related resources

Refer to [Google's Gemini API documentation](https://ai.google.dev/gemini-api/docs) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using Gemini(PaLM) API key

To configure this credential, you'll need:

- The API **Host** URL: Both PaLM and Gemini use the default `https://generativelanguage.googleapis.com`.
- An **API Key**: Create a key in [Google AI Studio](https://aistudio.google.com/apikey).

/// warning | Custom hosts not supported
The related nodes don't yet support custom hosts or proxies for the API host and must use `https://generativelanguage.googleapis.com`.
///

To create an API key:

1. Go to the API Key page in Google AI Studio: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Select **Create API Key**.
3. You can choose whether to **Create API key in new project** or search for an existing Google Cloud project to **Create API key in existing project**.
4. Copy the generated API key and add it to your n8n credential.
