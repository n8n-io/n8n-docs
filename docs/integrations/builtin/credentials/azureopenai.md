---
title: Azure OpenAI credentials
description: Documentation for Azure OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: integration
---

# Azure OpenAI credentials

You can use these credentials to authenticate the following nodes:

- [Chat Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai)
- [Embeddings Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai)

## Prerequisites

- Create an [Azure](https://azure.microsoft.com){:target=_blank .external-link} subscription.
- Access to Azure OpenAI within that subscription. You may need to [request access](https://aka.ms/oai/access){:target=_blank .external-link} if your organization doesn't yet have it.

## Supported authentication methods

- API key

## Related resources

Refer to [Azure OpenAI's API documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference){:target=_blank .external-link} for more information about the service.

## Using API key

To get an API key, [create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource){:target=_blank .external-link}.

As you work through that process, pay attention for the following information and enter it into the n8n Azure OpenAI credentials:

- The **Resource Name**: the **Name** you gave the resource
- The **API key**: **Key 1** works well, can be accessed before deployment in **Keys and Endpoint**
- The **API Version** the credentials should use. See the [Azure OpenAI API preview lifecycle documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation){:target=_blank .external-link} for more information about API versioning in Azure OpenAI.
