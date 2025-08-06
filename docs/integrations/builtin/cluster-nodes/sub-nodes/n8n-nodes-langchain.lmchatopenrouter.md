---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenRouter Chat Model node documentation
description: Learn how to use the OpenRouter Chat Model node in n8n. Follow technical documentation to integrate OpenRouter Chat Model node into your workflows.
contentType: [integration, reference]
priority: high
---

# OpenRouter Chat Model node

Use the OpenRouter Chat Model node to use OpenRouter's chat models with conversational agents.

On this page, you'll find the node parameters for the OpenRouter Chat Model node and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openrouter.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Select the model to use to generate the completion.

n8n dynamically loads models from OpenRouter and you'll only see the models available to your account.

## Node options

Use these options to further refine the node's behavior.

### Frequency Penalty

Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens

Enter the maximum number of tokens used, which sets the completion length.

### Response Format

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.

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
[[ templatesWidget(page.title, 'openrouter-chat-model') ]]

## Related resources

As OpenRouter is API-compatible with OpenAI, you can refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
