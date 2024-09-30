---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Gemini(PaLM) credentials
description: Documentation for the Google Gemini(PaLM) credentials. Use these credentials to authenticate Google Gemini and Google PaLM AI nodes in n8n, a workflow automation platform.
priority: high
---

# Google Gemini(PaLM) credentials

You can use these credentials to authenticate the following nodes:

* [Embeddings Google Gemini](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglegemini/)
* [Google Gemini Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini/)
* [Embeddings Google PaLM](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm/)

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/){:target=_blank .external-link} account.
* Create a [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project){:target=_blank .external-link}.

## Supported authentication methods

- Gemini(PaLM) API key

## Related resources

Refer to [Google's Gemini API documentation](https://ai.google.dev/gemini-api/docs){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using Gemini(PaLM) API key

To configure this credential, you'll need:

- The API **Host** URL: Both PaLM and Gemini use the default `https://generativelanguage.googleapis.com`.
- An **API Key**: Create a key in [Google AI Studio](https://makersuite.google.com/app/apikey){:target=_blank .external-link}.

To create an API key:

1. Go to the API Key page in Google AI Studio: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey){:target=_blank .external-link}.
2. Select **Create API Key**.
3. You can choose whether to **Create API key in new project** or search for an existing Google Cloud project to **Create API key in existing project**.
4. Copy the generated API key and add it to your n8n credential.