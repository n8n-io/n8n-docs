---
title: Azure OpenAI credentials
description: Documentation for Azure OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: integration
---

# Azure OpenAI credentials

You can use these credentials to authenticate the following nodes with OpenAI.

- [Chat Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai)
- [Embeddings Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai)


## Prerequisites

Log-in to [Azure](https://portal.azure.com/#home/) account.

## Using API Key
To get the API key, follow the steps below:

1. Open [Azure OpenAI service](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAIHome) in Azure portal
2. Click on **Create** button
3. Enter the name of the resource, region and select the pricing tier. Input the resource name into the **Resource name** field in the credentials in n8n
4. Click on **Next** button until you reach the **Review + create** step
5. Click on **Create** button
6. Once the resource is created, open it and click on **Keys and Endpoint** tab
7. Copy the **Key 1** value, this is your **API key**
8. Click on **Model deployments** tab followed by **Manage Deployments** button to get to Azure OpenAI Studio
9. Click on **Create new deployment** button, select the model, version and provide a name and click on **Create** button
10. Once the model is deployed, use the name as **Deployment name** as the model for the Azure OpenAI nodes
