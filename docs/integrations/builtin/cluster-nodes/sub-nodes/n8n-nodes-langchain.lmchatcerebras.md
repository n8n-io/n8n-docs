---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Cerebras Chat Model node documentation
description: Learn how to use the Cerebras Chat Model node in n8n. Follow technical documentation to integrate Cerebras Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Cerebras Chat Model node

Use the Cerebras Chat Model node to access Cerebras's ultra-fast inference language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Cerebras Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/cerebras.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model which will generate the completion. Available models include:
  - **Qwen 3 235B**
  - **Qwen 3 32B**
  - **Llama 4 Scout 17B Instruct**
  - **Llama 4 Maverick 17B Instruct**
  - **Llama 3.3 70B**
  - **DeepSeek R1 Distill Llama 70B**

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Response Format**: Choose between text or JSON response format.
* **Timeout**: Set the request timeout in milliseconds.
* **Top P**: Use nucleus sampling to control diversity via probability mass.

## Related resources

Refer to [Cerebras's API documentation](https://inference-docs.cerebras.ai/introduction){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"