---
title: Hugging Face credentials
description: >-
  Documentation for the Hugging Face credentials. Use these credentials to
  authenticate Hugging Face in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Hugging Face credentials
originalFilePath: integrations/builtin/credentials/huggingface.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/huggingface'
url: 'https://docs.n8n.io/integrations/builtin/credentials/huggingface'
layout:
  description:
    visible: false
---

# Hugging Face credentials <a href="#hugging-face-credentials" id="hugging-face-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Hugging Face Inference](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference.md)
* [Embeddings Hugging Face Inference](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Hugging Face's documentation](https://huggingface.co/docs/api-inference/quicktour) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Hugging Face](https://huggingface.co/) account and:

- An **API Key**: Hugging Face calls these API tokens.

To get your API token:

1. Open your Hugging Face profile and go to the [**Tokens**](https://huggingface.co/settings/tokens) section.
2. Copy the token listed there. It should begin with `hf_`.
3. Enter this API token as your n8n credential **API Key**.

Refer to [Get your API token](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token) for more information.
