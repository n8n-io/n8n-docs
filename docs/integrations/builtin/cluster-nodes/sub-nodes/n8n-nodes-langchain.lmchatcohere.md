---
title: Cohere Chat Model node documentation
description: >-
  Learn how to use the Cohere Chat Model node in n8n. Follow technical
  documentation to integrate Cohere Chat Model node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Cohere Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcohere.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcohere
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcohere
layout:
  description:
    visible: false
---

# Cohere Chat Model node <a href="#cohere-chat-model-node" id="cohere-chat-model-node"></a>

Use the Cohere Chat Model node to access Cohere's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Cohere Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/cohere.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Model**: Select the model which will generate the completion. n8n dynamically loads available models from the Cohere API. Learn more in the [Cohere model documentation](https://docs.cohere.com/v2/docs/models#command).

## Node options <a href="#node-options" id="node-options"></a>

* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Max Retries**: Enter the maximum number of times to retry a request.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Cohere Chat Model node documentation integration templates](https://n8n.io/integrations/cohere-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Cohere's API documentation](https://docs.cohere.com/v2/reference/about) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

