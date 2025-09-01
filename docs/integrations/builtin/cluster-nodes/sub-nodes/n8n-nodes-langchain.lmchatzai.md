---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Z.AI Chat Model node documentation
description: Learn how to use the Z.AI Chat Model node in n8n. Follow technical documentation to integrate Z.AI Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Z.AI Chat Model node

Use the Z.AI Chat Model node to use Z.AI's GLM-4.5 series chat models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Z.AI Chat Model node and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/zai.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Select the model to use to generate the completion.

n8n dynamically loads models from Z.AI and you'll only see the models available to your account.

## Node options

Use these options to further refine the node's behavior.

### Base URL

Enter a URL here to override the default URL for the API.  
The Z.AI default url is `https://api.z.ai/api/paas/v4` and the ZhiPU AI url is `https://open.bigmodel.cn/api/paas/v4`.

### Maximum Number of Tokens

Enter the maximum number of tokens used, which sets the completion length. The GLM-4.5 series supports up to 128k tokens context length.

### Response Format

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.

### Sampling Temperature

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Top P

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

### Timeout

Enter the maximum request time in milliseconds.

### Max Retries

Enter the maximum number of times to retry a request.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'zai-chat-model') ]]

## Related resources

Refer to [Z.AI's API documentation](https://docs.z.ai/api-reference/introduction) and [GLM-4.5 models](https://docs.z.ai/guides/llm/glm-4.5) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"


