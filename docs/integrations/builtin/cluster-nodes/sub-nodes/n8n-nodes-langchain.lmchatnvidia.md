---
title: NVIDIA Nemotron Chat Model node documentation
description: Learn how to use the NVIDIA Nemotron Chat Model node in n8n. Follow technical documentation to integrate NVIDIA Nemotron Chat Model node into your workflows.
contentType: [integration, reference]
priority: high
---

# NVIDIA Nemotron Chat Model node

Use the NVIDIA Nemotron Chat Model node to access [NVIDIA Nemotron](https://build.nvidia.com/models){:target="_blank" .external-link} models with conversational [agents](/glossary.md#ai-agent). The node works with Nemotron models hosted on [build.nvidia.com](https://build.nvidia.com/){:target="_blank" .external-link} and with self-hosted NVIDIA Inference Microservices (NIM).

On this page, you'll find the node parameters for the NVIDIA Nemotron Chat Model node and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/nvidia.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Select the Nemotron model to use to generate the completion.

n8n dynamically loads Nemotron models from the endpoint configured in your credential. If n8n can't reach the endpoint, it falls back to a curated list of well-known Nemotron model IDs.

## Node options

Use these options to further refine the node's behavior.

### Frequency Penalty

Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens

Enter the maximum number of tokens used, which sets the completion length. Use `-1` for the model default.

### Response Format

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON. When you choose **JSON**, include the word `json` in your prompt in the chain or agent.

### Presence Penalty

Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Timeout

Enter the maximum request time in milliseconds.

### Max Retries

Enter the maximum number of times to retry a request.

### Top P

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'nvidia-nemotron-chat-model') ]]

## Related resources

Refer to [NVIDIA's build catalogue](https://build.nvidia.com/models){:target="_blank" .external-link} for the list of Nemotron models and to the [NIM documentation](https://docs.nvidia.com/nim/){:target="_blank" .external-link} for guidance on self-hosting. As the NVIDIA API is OpenAI-spec compatible, you can refer to [LangChain's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/){:target="_blank" .external-link} for more information about the underlying client.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
