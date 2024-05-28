---
title: Hugging Face credentials
description: Documentation for the Hugging Face credentials. Use these credentials to authenticate Hugging Face in n8n, a workflow automation platform.
---

# Hugging Face credentials

You can use these credentials to authenticate the following nodes:

* [Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/)
* [Embeddings Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference/)


## Prerequisites

Create a [Hugging Face](https://huggingface.co/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [Hugging Face's documentation](https://huggingface.co/docs/api-inference/quicktour){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API Key

To configure this credential, you'll need:

- An **API Key**: Follow the Hugging Face instructions to [Get your API token](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token){:target=_blank .external-link}. Enter that API token as your n8n API Key.