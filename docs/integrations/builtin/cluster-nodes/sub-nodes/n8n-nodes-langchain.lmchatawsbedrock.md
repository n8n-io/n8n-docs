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

If you route Bedrock through a [VPC interface endpoint (PrivateLink)](https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html) without private DNS, set the **Bedrock Endpoint** and **Bedrock Runtime Endpoint** custom endpoints in the credential.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}
	
## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Authentication**: Select the authentication method:
    * **AWS (IAM)**: Use an IAM access key. Select an **AWS** credential.
    * **AWS (Assume Role)**: Temporarily assume an IAM role. Select an **AWS (Assume Role)** credential.
* **Model**: Select the model that generates the completion.

Learn more about available models in the [Amazon Bedrock model documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).

## Node options <a href="#node-options" id="node-options"></a>

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top P**: Set the probability threshold for token selection. A lower value limits the pool to more probable tokens; a higher value allows more diverse options.
* **Max Retries**: Enter the maximum number of times to retry a request.
* **Timeout** (available from n8n 2.32.0): Enter the maximum time in milliseconds to wait for a request to complete. Increase this for long generations. Set it to `0` to disable the timeout.
* **Additional Model Request Fields**: Enter model-family-specific inference parameters as JSON, for example Claude's `top_k` or Nova's `inferenceConfig`. Refer to the [AWS model parameters documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html) for the parameters each model family supports.
* **Latency Optimization**: Choose whether requests use **Standard** or **Optimized** latency. Optimized mode can reduce response time for supported models and regions. Refer to the [AWS latency-optimized inference documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html) for availability.
* **Guardrail**: Apply an [Amazon Bedrock guardrail](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) to requests. Refer to [Using AWS Guardrails](#using-aws-guardrails) for details.

### Using AWS Guardrails <a href="#using-aws-guardrails" id="using-aws-guardrails"></a>

Guardrails let your organization enforce content and safety policies on model invocations. The guardrail must exist in the same AWS region as the model. The **Guardrail** option has these fields:

* **Guardrail Identifier**: The ID or full ARN of the guardrail to apply.
* **Guardrail Version**: The guardrail version to use: a numeric version string (for example `1`) or `DRAFT` for the working draft. Defaults to `DRAFT`.
* **Trace**: Whether AWS includes diagnostic trace information about the guardrail's evaluation in the response: **Disabled** (default), **Enabled**, or **Enabled (Full)**. Note: enabling trace makes AWS include guardrail assessment details (which can echo matched input content, e.g. PII findings) in responses; n8n doesn't currently surface these in the AI log.

When a guardrail intervenes, the node returns the guardrail's configured blocked message in place of the model output, as a normal response rather than an error. n8n doesn't expose the underlying stop reason: to detect an intervention downstream, match on your guardrail's blocked message text. An invalid guardrail identifier or version fails the node with the AWS validation error. Guardrails apply to both streaming and non-streaming requests.

{% hint style="info" %}
**IAM permissions**

The credential needs the `bedrock:ApplyGuardrail` permission on the guardrail resource in addition to the invoke permissions. Without it, requests fail with an `AccessDeniedException` once a guardrail is set. If your organization requires guardrails on every invocation, enforce the `bedrock:GuardrailIdentifier` condition key on invoke permissions in IAM rather than relying on this optional node field.
{% endhint %}

## Proxy limitations <a href="#proxy-limitations" id="proxy-limitations"></a>

This node doesn't support the [`NO_PROXY` environment variable](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse AWS Bedrock Chat Model node documentation integration templates](https://n8n.io/integrations/aws-bedrock-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's AWS Bedrock Chat Model documentation](https://js.langchain.com/docs/integrations/chat/bedrock/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

