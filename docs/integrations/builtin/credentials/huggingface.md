---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Hugging Face credentials
description: Documentation for the Hugging Face credentials. Use these credentials to authenticate Hugging Face in n8n, a workflow automation platform.
priority: medium
---

# Hugging Face credentials

You can use these credentials to authenticate the following nodes:

* [Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/)
* [Embeddings Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference/)

## Supported authentication methods

- API key

## Related resources

Refer to [Hugging Face's documentation](https://huggingface.co/docs/api-inference/quicktour){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Hugging Face](https://huggingface.co/){:target=_blank .external-link} account and:

- An **API Key**: Hugging Face calls these API tokens.

To get your API token:

1. Open your Hugging Face profile and go to the [**Tokens**](https://huggingface.co/settings/tokens){:target=_blank .external-link} section.
2. Copy the token listed there. It should begin with `hf_`.
3. Enter this API token as your n8n credential **API Key**.

Refer to [Get your API token](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token){:target=_blank .external-link} for more information.
