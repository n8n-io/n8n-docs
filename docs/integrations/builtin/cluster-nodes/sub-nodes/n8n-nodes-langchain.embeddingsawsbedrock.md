---
title: Embeddings AWS Bedrock node documentation
description: >-
  Learn how to use the Embeddings AWS Bedrock node in n8n. Follow technical
  documentation to integrate Embeddings AWS Bedrock node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Embeddings AWS Bedrock node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock
layout:
  description:
    visible: false
---

# Embeddings AWS Bedrock node <a href="#embeddings-aws-bedrock-node" id="embeddings-aws-bedrock-node"></a>

Use the Embeddings AWS Bedrock node to generate embeddings[^1] for a given text.

On this page, you'll find the node parameters for the Embeddings AWS Bedrock node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/aws.md).

If you route Bedrock through a [VPC interface endpoint (PrivateLink)](https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html) without private DNS, set the **Bedrock Endpoint** and **Bedrock Runtime Endpoint** custom endpoints in the credential.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Authentication**: Select the authentication method:
    * **AWS (IAM)**: Use an IAM access key. Select an **AWS** credential.
    * **AWS (Assume Role)**: Temporarily assume an IAM role. Select an **AWS (Assume Role)** credential.
* **Model**: Select the model or [inference profile](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html) that generates the embedding. The dropdown lists on-demand embedding models and embedding inference profiles together. If the dropdown is empty or incomplete, your IAM role may lack the `bedrock:ListFoundationModels` or `bedrock:ListInferenceProfiles` permission. Switch the field to **Expression** mode and enter the model or inference profile ID directly.

Learn more about available models in the [Amazon Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).

## Node options

* **Additional Model Request Fields**: Enter model-specific request fields as JSON, for example Titan's `dimensions` and `normalize` or Cohere's `input_type` and `truncate`. Refer to the [AWS model parameters documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html) for the fields each model family supports.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Timeout**: Enter the maximum time in milliseconds to wait for a request to complete. Set it to `0` to disable the timeout.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Embeddings AWS Bedrock node documentation integration templates](https://n8n.io/integrations/embeddings-aws-bedrock) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/) for more information about AWS Bedrock.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
