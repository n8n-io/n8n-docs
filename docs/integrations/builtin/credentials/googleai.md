---
title: Google Gemini(PaLM) credentials
description: >-
  Documentation for the Google Gemini(PaLM) credentials. Use these credentials
  to authenticate Google Gemini and Google PaLM AI nodes in n8n, a workflow
  automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Google Gemini(PaLM) credentials
originalFilePath: integrations/builtin/credentials/googleai.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/googleai'
url: 'https://docs.n8n.io/integrations/builtin/credentials/googleai'
layout:
  description:
    visible: false
---

# Google Gemini(PaLM) credentials <a href="#google-geminipalm-credentials" id="google-geminipalm-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Embeddings Google Gemini](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglegemini.md)
* [Google Gemini](../app-nodes/n8n-nodes-langchain.googlegemini.md)
* [Google Gemini Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini.md)
* [Embeddings Google PaLM](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Create a [Google Cloud](https://cloud.google.com/) account.
* Create a [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Gemini(PaLM) API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Google's Gemini API documentation](https://ai.google.dev/gemini-api/docs) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using Gemini(PaLM) API key <a href="#using-geminipalm-api-key" id="using-geminipalm-api-key"></a>

To configure this credential, you'll need:

- The API **Host** URL: Both PaLM and Gemini use the default `https://generativelanguage.googleapis.com`.
- An **API Key**: Create a key in [Google AI Studio](https://aistudio.google.com/apikey).

{% hint style="warning" %}
**Custom hosts not supported**

The related nodes don't yet support custom hosts or proxies for the API host and must use `https://generativelanguage.googleapis.com`.
{% endhint %}

To create an API key:

1. Go to the API Key page in Google AI Studio: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Select **Create API Key**.
3. You can choose whether to **Create API key in new project** or search for an existing Google Cloud project to **Create API key in existing project**.
4. Copy the generated API key and add it to your n8n credential.
