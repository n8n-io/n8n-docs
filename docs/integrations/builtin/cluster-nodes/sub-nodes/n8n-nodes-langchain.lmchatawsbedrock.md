---
title: AWS Bedrock Chat Model node documentation
description: >-
  Learn how to use the AWS Bedrock Chat Model node in n8n. Follow technical
  documentation to integrate AWS Bedrock Chat Model node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: AWS Bedrock Chat Model node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock
layout:
  description:
    visible: false
---

# AWS Bedrock Chat Model node <a href="#aws-bedrock-chat-model-node" id="aws-bedrock-chat-model-node"></a>

The AWS Bedrock Chat Model node allows you use LLM models utilising AWS Bedrock platform.

On this page, you'll find the node parameters for the AWS Bedrock Chat Model node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/aws.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}
	
## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Authentication**: Select the authentication method:
    * **AWS (IAM)**: Use an IAM access key. Select an **AWS** credential.
    * **AWS (Assume Role)**: Temporarily assume an IAM role. Select an **AWS (Assume Role)** credential.
* **Model**: Select the model that generates the completion.

Learn more about available models in the [Amazon Bedrock model documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

## Proxy limitations <a href="#proxy-limitations" id="proxy-limitations"></a>

This node doesn't support the [`NO_PROXY` environment variable](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse AWS Bedrock Chat Model node documentation integration templates](https://n8n.io/integrations/aws-bedrock-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's AWS Bedrock Chat Model documentation](https://js.langchain.com/docs/integrations/chat/bedrock/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

