---
title: OpenAI Chat Model node documentation
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-langchain.lmchatopenai
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai
description: >-
  Learn how to use the OpenAI Chat Model node in n8n. Follow technical
  documentation to integrate OpenAI Chat Model node into your workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# OpenAI Chat Model

Use the OpenAI Chat Model node to use OpenAI's chat models with conversational [agents](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent).

On this page, you'll find the node parameters for the OpenAI Chat Model node and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../../credentials/openai.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Model <a href="#model" id="model"></a>

Select the model to use to generate the completion.

n8n dynamically loads models from OpenAI, and you'll only see the models available to your account.

### Use Responses API <a href="#use-responses-api" id="use-responses-api"></a>

OpenAI provides two endpoints for generating output from a model:

* **Chat Completions**: The Chat Completions API endpoint generates a model response from a list of messages that comprise a conversation. The API requires the user to handle conversation state manually, for example by adding a [Simple Memory](../n8n-nodes-langchain.memorybufferwindow/) subnode. For new projects, OpenAI recommends to use the Responses API.
* **Responses**: The Responses API is an agentic loop, allowing the model to call multiple built-in tools within the span of one API request. It also supports persistent conversations by passing a `conversation_id`.

Toggle to **Use Responses API** if you want the model to generate output using the Responses API. Otherwise, the OpenAI Chat Model node will default to using the Chat Completions API.

Refer to the OpenAI documentation for a [comparison of the Chat Completions and Responses APIs](https://platform.openai.com/docs/guides/migrate-to-responses).

### Built-in Tools <a href="#built-in-tools" id="built-in-tools"></a>

The OpenAI Responses API provides a range of [built-in tools](https://platform.openai.com/docs/guides/tools) to enrich the model's response. Toggle to **Use Responses API** if you want the model to have access to the following built-in tools:

* **Web Search**: Allows models to search the web for the latest information before generating a response.
* **File Search**: Allow models to search your knowledgebase from previously uploaded files for relevant information before generating a response. Refer to the [OpenAI documentation](https://platform.openai.com/docs/guides/tools-file-search) for more information.
* **Code Interpreter**: Allows models to write and run Python code in a sandboxed environment.

{% hint style="info" %}
**Use with AI Agent node**

Built-in tools are only supported when using the OpenAI Chat Model node in combination with the AI Agent node. Built-in tools aren't available when using the OpenAI Chat Model node in combination with a Basic LLM Chain node, for example.
{% endhint %}

## Node options <a href="#node-options" id="node-options"></a>

Use these options to further refine the node's behavior. The following options are available whether you use the Responses API to generate model output or not.

### Frequency Penalty <a href="#frequency-penalty" id="frequency-penalty"></a>

Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens <a href="#maximum-number-of-tokens" id="maximum-number-of-tokens"></a>

Enter the maximum number of tokens used, which sets the completion length.

### Presence Penalty <a href="#presence-penalty" id="presence-penalty"></a>

Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature <a href="#sampling-temperature" id="sampling-temperature"></a>

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Timeout <a href="#timeout" id="timeout"></a>

Enter the maximum request time in milliseconds.

### Max Retries <a href="#max-retries" id="max-retries"></a>

Enter the maximum number of times to retry a request.

### Top P <a href="#top-p" id="top-p"></a>

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Additional node options (Responses API only) <a href="#additional-node-options-responses-api-only" id="additional-node-options-responses-api-only"></a>

The following, additional options are available when toggling to **Use Responses API**.

### Conversation ID <a href="#conversation-id" id="conversation-id"></a>

The conversation that this response belongs to. Input items and output items from this response are automatically added to this conversation after this response completes.

### Prompt Cache Key <a href="#prompt-cache-key" id="prompt-cache-key"></a>

Use this key for caching similar requests to optimize cache hit rates.

### Safety Identifier <a href="#safety-identifier" id="safety-identifier"></a>

Apply an identifier to track users who may violate usage policies.

### Service Tier <a href="#service-tier" id="service-tier"></a>

Select the service tier that fits your needs: Auto, Flex, Default, or Priority.

### Metadata <a href="#metadata" id="metadata"></a>

A set of key-value pairs for storing structured information. You can attach up to 16 pairs to an object, which is useful for adding custom data that can be used for searching by the API or in the dashboard.

### Top Logprobs <a href="#top-logprobs" id="top-logprobs"></a>

Define an integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability.

### Output Format <a href="#output-format" id="output-format"></a>

Choose a response format: Text, JSON Schema, or JSON Object. Use of JSON Schema is recommended, if you want to receive data in JSON format.

### Prompt <a href="#prompt" id="prompt"></a>

Configure the prompt filled with a unique ID, its version, and substitutable variables. Prompts are configured through the OpenAI dashboard.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse n8n-nodes-langchain.lmchatopenai integration templates](https://n8n.io/integrations/openai-chat-model) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the service.

Refer to [OpenAI documentation](https://platform.openai.com/docs/api-reference/responses/create) for more information about the parameters.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).
