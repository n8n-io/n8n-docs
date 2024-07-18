---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Azure OpenAI credentials
description: Documentation for Azure OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: integration
priority: medium
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

To configure this credential, you'll need:

- A **Resource Name**: the **Name** you give the resource
- An **API key**: **Key 1** works well. This can be accessed before deployment in **Keys and Endpoint**.
- The **API Version** the credentials should use. See the [Azure OpenAI API preview lifecycle documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation){:target=_blank .external-link} for more information about API versioning in Azure OpenAI.

To get the information above, [create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource){:target=_blank .external-link}.

/// note | Model name for Azure OpenAI nodes
Once you deploy the resource, use the **Deployment name** as the model name for the Azure OpenAI nodes where you're using this credential.
///
