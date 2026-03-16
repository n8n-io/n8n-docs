---
title: OpenAI Text operations 
description: Documentation for the Text operations in OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# OpenAI Text operations

Use this operation to message a model or classify text for violations in OpenAI. Refer to [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) for more information on the OpenAI node itself.

/// note | Previous node versions
n8n version 1.117.0 introduces the OpenAI node V2 that supports the OpenAI Responses API. It renames the 'Message a Model' operation to 'Generate a Chat Completion' to clarify its association with the Chat Completions API and introduces a separate 'Generate a Model Response' operation that uses the Responses API.
///

## Generate a Chat Completion

Use this operation to send a message or prompt to an OpenAI model - using the Chat Completions API - and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Text**.
- **Operation**: Select **Generate a Chat Completion**.
- **Model**: Select the model you want to use. If you’re not sure which model to use, try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Messages**: Enter a **Text** prompt and assign a **Role** that the model will use to generate responses. Refer to [Prompt engineering | OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) for more information on how to write a better prompt by using these roles. Choose from one of these roles: 
    - **User**: Sends a message as a user and gets a response from the model. 
    - **Assistant**: Tells the model to adopt a specific tone or personality. 
    - **System**: By default, there is no system message. You can define instructions in the user message, but the instructions set in the system message are more effective. You can set more than one system message per conversation. Use this to set the model's behavior or context for the next user message. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. 
- **Output Content as JSON**: Turn on to attempt to return the response in JSON format. Compatible with `GPT-4 Turbo` and all `GPT-3.5 Turbo` models newer than `gpt-3.5-turbo-1106`.

### Options

- **Frequency Penalty**: Apply a penalty to reduce the model's tendency to repeat similar lines. The range is between `0.0` and `2.0`.
- **Maximum Number of Tokens**: Set the maximum number of tokens for the response. One token is roughly four characters for standard English text. Use this to limit the length of the output. 
- **Number of Completions**: Defaults to 1. Set the number of completions you want to generate for each prompt. Use carefully since setting a high number will quickly consume your tokens. 
- **Presence Penalty**: Apply a penalty to influence the model to discuss new topics. The range is between `0.0` and `2.0`.
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around `0.7`) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 

Refer to [Chat Completions | OpenAI](https://platform.openai.com/docs/api-reference/chat) documentation for more information.

## Generate a Model Response

Use this operation to send a message or prompt to an OpenAI model - using the Responses API - and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Text**.
- **Operation**: Select **Generate a Model Response**.
- **Model**: Select the model you want to use. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for an overview. 
- **Messages**: Choose from one of these a **Message Types**:
    - **Text**: Enter a **Text** prompt and assign a **Role** that the model will use to generate responses. Refer to [Prompt engineering | OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) for more information on how to write a better prompt by using these roles. 
    - **Image**: Provide an **Image** either through an Image URL, a File ID (using the [OpenAI Files API](https://platform.openai.com/docs/api-reference/files)) or by passing binary data from an earlier node in your workflow.
    - **File**: Provide a **File** in a supported format (currently: PDF only), either through a File URL, a File ID (using the [OpenAI Files API](https://platform.openai.com/docs/api-reference/files)) or by passing binary data from an earlier node in your workflow.
    - For any message type, you can choose from one of these roles: 
        - **User**: Sends a message as a user and gets a response from the model. 
        - **Assistant**: Tells the model to adopt a specific tone or personality. 
        - **System**: By default, the system message is `"You are a helpful assistant"`. You can define instructions in the user message, but the instructions set in the system message are more effective. You can only set one system message per conversation. Use this to set the model's behavior or context for the next user message.
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. 

### Built-in Tools
The OpenAI Responses API provides a range of [built-in tools](https://platform.openai.com/docs/guides/tools) to enrich the model's response:

- **Web Search**: Allows models to search the web for the latest information before generating a response.
- **MCP Servers**: Allows models to connect to remote MCP servers. Find out more about using remote MCP servers as tools [here](https://platform.openai.com/docs/guides/tools-connectors-mcp).
- **File Search**: Allow models to search your knowledgebase from previously uploaded files for relevant information before generating a response. Refer to the [OpenAI documentation](https://platform.openai.com/docs/guides/tools-file-search) for more information.
- **Code Interpreter**: Allows models to write and run Python code in a sandboxed environment.

### Options

- **Maximum Number of Tokens**: Set the maximum number of tokens for the response. One token is roughly four characters for standard English text. Use this to limit the length of the output. 
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around `0.7`) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`.
- **Conversation ID**: The conversation that this response belongs to. Input items and output items from this response are automatically added to this conversation after this response completes.
- **Previous Response ID**: The ID of the previous response to continue from. Can't be used in conjunction with Conversation ID.
- **Reasoning**: The level of reasoning effort the model should spend to generate the response. Includes the ability to return a **Summary** of the reasoning performed by the model (for example, for debugging purposes).
- **Store**: Whether to store the generated model response for later retrieval via API. Defaults to `true`.
- **Output Format**: Whether to return the response as **Text**, in a specified **JSON Schema** or as a **JSON Object**.
- **Background**: Whether to run the model in [background mode](https://platform.openai.com/docs/guides/background). This allows executing long-running tasks more reliably.

Refer to [Responses | OpenAI](https://platform.openai.com/docs/api-reference/responses/create) documentation for more information.

## Classify Text for Violations

Use this operation to identify and flag content that might be harmful. OpenAI model will analyze the text and return a response containing:

- `flagged`: A boolean field indicating if the content is potentially harmful.
- `categories`: A list of category-specific violation flags.
- `category_scores`: Scores for each category.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Text**.
- **Operation**: Select **Classify Text for Violations**.
- **Text Input**: Enter text to classify if it violates the moderation policy. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.

### Options

- **Use Stable Model**: Turn on to use the stable version of the model instead of the latest version, accuracy may be slightly lower.

Refer to [Moderations | OpenAI](https://platform.openai.com/docs/api-reference/moderations) documentation for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
