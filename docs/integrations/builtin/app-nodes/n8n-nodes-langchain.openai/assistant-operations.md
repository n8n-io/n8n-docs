---
title: OpenAI Assistant operations 
description: Documentation for the Assistant operations in OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# OpenAI Assistant operations

Use this operation to create, delete, list, message, or update an assistant in OpenAI. Refer to [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) for more information on the OpenAI node itself.

/// note | Assistant operations deprecated in OpenAI node V2
n8n version 1.117.0 introduces V2 of the OpenAI node that supports the OpenAI Responses API and removes support for the [to-be-deprecated Assistants API](https://platform.openai.com/docs/assistants/migration).
///

## Create an Assistant

Use this operation to create a new assistant.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Create an Assistant**.
- **Model**: Select the model that the assistant will use. If you’re not sure which model to use, try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Name**: Enter the name of the assistant. The maximum length is 256 characters.
- **Description**: Enter the description of the assistant. The maximum length is 512 characters.
  ```
  A virtual assistant that helps users with daily tasks, including setting reminders, answering general questions, and providing quick information.
  ```
- **Instructions**: Enter the system instructions that the assistant uses. The maximum length is 32,768 characters. Use this to specify the persona used by the model in its replies. 
  ```
  Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
  ```
- **Code Interpreter**: Turn on to enable the code interpreter for the assistant, where it can write and execute code in a sandbox environment. Enable this tool for tasks that require computations, data analysis, or any logic-based processing.
- **Knowledge Retrieval**: Turn on to enable knowledge retrieval for the assistant, allowing it to access external sources or a connected knowledge base. Refer to [File Search | OpenAI Platform](https://platform.openai.com/docs/assistants/tools/file-search) for more information. 
  - **Files**: Select a file to upload for your external knowledge source. Use **Upload a File** operation to add more files. 

### Options

- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 
- **Fail if Assistant Already Exists**: If enabled, the operation will fail if an assistant with the same name already exists. 

Refer to [Create assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/createAssistant) documentation for more information. 

## Delete an Assistant

Use this operation to delete an existing assistant from your account.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Delete an Assistant**.
- **Assistant**: Select the assistant you want to delete **From list** or **By ID**.

Refer to [Delete assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/deleteAssistant) documentation for more information. 

## List Assistants

Use this operation to retrieve a list of assistants in your organization.

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Assistant**.
- **Operation**: Select **List Assistants**.

### Options

- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. This option is enabled by default. 

Refer to [List assistants | OpenAI](https://platform.openai.com/docs/api-reference/assistants/listAssistants) documentation for more information. 
  
## Message an Assistant

Use this operation to send a message to an assistant and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Message an Assistant**.
- **Assistant**: Select the assistant you want to message.
- **Prompt**: Enter the text prompt or message that you want to send to the assistant.
    - **Connected Chat Trigger Node**: Automatically use the input from a previous node's `chatInput` field.
    - **Define Below**: Manually define the prompt by entering static text or using an expression to reference data from previous nodes.

### Options

- **Base URL**: Enter the base URL that the assistant should use for making API requests. This option is useful for directing the assistant to use endpoints provided by other LLM providers that offer an OpenAI-compatible API.
- **Max Retries**: Specify the number of times the assistant should retry an operation in case of failure. 
- **Timeout**: Set the maximum amount of time in milliseconds, that the assistant should wait for a response before timing out. Use this option to prevent long waits during operations.
- **Preserve Original Tools**: Turn off to remove the original tools associated with the assistant. Use this if you want to temporarily remove tools for this specific operation.

Refer to [Assistants | OpenAI](https://platform.openai.com/docs/api-reference/assistants) documentation for more information. 

## Update an Assistant

Use this operation to update the details of an existing assistant.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Update an Assistant**.
- **Assistant**: Select the assistant you want to update.

### Options

- **Code Interpreter**: Turn on to enable the code interpreter for the assistant, where it can write and execute code in a sandbox environment. Enable this tool for tasks that require computations, data analysis, or any logic-based processing.
- **Description**: Enter the description of the assistant. The maximum length is 512 characters.
  ```
  A virtual assistant that helps users with daily tasks, including setting reminders, answering general questions, and providing quick information.
  ```
- **Instructions**: Enter the system instructions that the assistant uses. The maximum length is 32,768 characters. Use this to specify the persona used by the model in its replies. 
  ```
  Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
  ```
- **Knowledge Retrieval**: Turn on to enable knowledge retrieval for the assistant, allowing it to access external sources or a connected knowledge base. Refer to [File Search | OpenAI Platform](https://platform.openai.com/docs/assistants/tools/file-search) for more information. 
- **Files**: Select a file to upload for your external knowledge source. Use [**Upload a File**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations.md#upload-a-file) operation to add more files. Note that this only updates the [Code Interpreter](https://platform.openai.com/docs/assistants/tools/code-interpreter) tool, not the [File Search](https://platform.openai.com/docs/assistants/tools/file-search) tool.
- **Model**: Select the model that the assistant will use. If you’re not sure which model to use, try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Name**: Enter the name of the assistant. The maximum length is 256 characters.
- **Remove All Custom Tools (Functions)**: Turn on to remove all custom tools (functions) from the assistant. 
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 

Refer to [Modify assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/modifyAssistant) documentation for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
