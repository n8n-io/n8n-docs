---
title: Microsoft Foundry Chat Model node documentation
description: >-
  Learn how to use the Microsoft Foundry Chat Model node in n8n. Follow technical
  documentation to integrate Microsoft Foundry Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft Foundry Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai
layout:
  description:
    visible: false
---

# Microsoft Foundry Chat Model node <a href="#azure-openai-chat-model-node" id="azure-openai-chat-model-node"></a>

Use the Microsoft Foundry Chat Model node to use the chat models available on your Microsoft Foundry or Azure OpenAI resource with conversational agents[^1].

On this page, you'll find the node parameters for the Microsoft Foundry Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Microsoft Foundry credentials documentation](../../credentials/azureopenai.md) for authentication information for this node.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Authentication**: Choose **API Key** or **Azure Entra ID (OAuth2)**. Each option uses its own credential. Refer to the [credentials documentation](../../credentials/azureopenai.md).
* **Project**: Enter the name of the Microsoft Foundry project that owns the deployment. Foundry resources need this. Leave it empty for a classic Azure OpenAI resource.
* **Model (Deployment)**: Select the deployment to use to generate the completion.
    * **From List**: Choose from the deployments in your project. The list shows chat deployments only. It needs a Microsoft Foundry credential and the **Project** field. Set **Project** first.
    * **By ID**: Enter the deployment name. Use this for a classic Azure OpenAI credential, or for a deployment that isn't in the list.
* **Model Family**: Choose the API family the deployment uses. Azure doesn't report this, so set it to match your deployment.
    * **OpenAI**: For GPT and other OpenAI-compatible models.
    * **Anthropic**: For Claude models. This needs a credential that uses the Microsoft Foundry endpoint type. The **Frequency Penalty**, **Presence Penalty**, and **Response Format** options aren't available for this family.
* **Use Responses API**: Choose which API the node calls for an OpenAI family deployment. This needs a credential that uses the Microsoft Foundry endpoint type.
    * **Off** (default): The node calls the Chat Completions API. Use this for most deployments.
    * **On**: The node calls the Responses API. Turn this on for a deployment that only supports the Responses API. Azure returns a `400 Model not supported` error if you call such a deployment with Chat Completions.

{% hint style="info" %}
**Existing workflows**

Workflows created before these changes keep the **Model (Deployment) Name** text field and use Chat Completions. Create a new node to use the deployment list and the **Use Responses API** setting.
{% endhint %}

## Node options <a href="#node-options" id="node-options"></a>

* **Frequency Penalty**: Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.
* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Response Format**: Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.
* **Presence Penalty**: Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations. The maximum is 2 for the **OpenAI** model family and 1 for the **Anthropic** model family.
* **Timeout**: Enter the maximum request time in milliseconds.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.
* **Extra Body**: Enter extra JSON properties to add to the request body. Use this for parameters that your deployment supports and the other options don't cover. The value must be a JSON object.

## Proxy limitations <a href="#proxy-limitations" id="proxy-limitations"></a>

This node doesn't support the [`NO_PROXY` environment variable](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Foundry Chat Model node documentation integration templates](https://n8n.io/integrations/azure-openai-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's Azure OpenAI documentation](https://js.langchain.com/docs/integrations/chat/azure) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
