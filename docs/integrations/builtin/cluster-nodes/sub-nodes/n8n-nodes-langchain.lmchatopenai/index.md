---
title: OpenAI Chat Model node documentation
description: Learn how to use the OpenAI Chat Model node in n8n. Follow technical documentation to integrate OpenAI Chat Model node into your workflows.
contentType: [integration, reference]
priority: high
---

# OpenAI Chat Model node

Use the OpenAI Chat Model node to use OpenAI's chat models with conversational [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the OpenAI Chat Model node and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openai.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Model

Select the model to use to generate the completion.

n8n dynamically loads models from OpenAI, and you'll only see the models available to your account.

### Built-in Tools
The OpenAI Responses API provides a range of [built-in tools](https://platform.openai.com/docs/guides/tools) to enrich the model's response:

- **Web Search**: Allows models to search the web for the latest information before generating a response.
- **MCP Servers**: Allows models to connect to remote MCP servers. Find out more about using remote MCP servers as tools [here](https://platform.openai.com/docs/guides/tools-connectors-mcp).
- **File Search**: Allow models to search your knowledgebase from previously uploaded files for relevant information before generating a response. Refer to the [OpenAI documentation](https://platform.openai.com/docs/guides/tools-file-search) for more information.
- **Code Interpreter**: Allows models to write and run Python code in a sandboxed environment.

## Node options

Use these options to further refine the node's behavior.

### Base URL

Enter a URL here to override the default URL for the API.

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

### Conversation ID
The conversation that this response belongs to. Input items and output items from this response are automatically added to this conversation after this response completes.

###  Prompt Cache Key
Use this key for caching similar requests to optimize cache hit rates.

### Safety Identifier
Apply an identifier to track users who may violate usage policies.

### Service Tier
Select the service tier that fits your needs: Auto, Flex, Default, or Priority.

### Metadata
A set of key-value pairs for storing structured information. You can attach up to 16 pairs to an object, which is useful for adding custom data that can be used for searching by the API or in the dashboard.

### Top Logprobs
Define an integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability.

### Output Format
Choose a response format: Text, JSON Schema, or JSON Object. Use of JSON Schema is recommended, if you want to receive data in JSON format.

### Prompt
Configure the prompt filled with a unique ID, its version, and substitutable variables.

### Reasoning Effort
Control the reasoning level of AI results: Low, Medium, or High.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'openai-chat-model') ]]

## Related resources

Refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the service.

Refer to [OpenAI documentation](https://platform.openai.com/docs/api-reference/responses/create) for more information about the parameters.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/common-issues.md).


